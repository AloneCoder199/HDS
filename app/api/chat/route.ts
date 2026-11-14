// app/api/chat/route.ts
import { NextRequest } from "next/server"
import Groq from "groq-sdk"
import { HDS_SYSTEM_PROMPT } from "@/lib/knowledge/hds-knowledge"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

const MAX_MESSAGES = 12
const MAX_CONTENT_LENGTH = 1500
const MAX_TOKENS_OUT = 600

// ⏱️ Timeouts
const FIRST_CHUNK_TIMEOUT = 15_000   // 15s — wait for first token
const IDLE_TIMEOUT = 20_000          // 20s — max gap between chunks
const TOTAL_TIMEOUT = 45_000         // 45s — hard cap on entire stream

// ─── Rate limiting ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 20

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  if (rateLimitMap.size > 2000) {
    for (const [k, v] of rateLimitMap) {
      if (now > v.resetAt) rateLimitMap.delete(k)
    }
  }
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { allowed: true }
}

// ─── Model aliases ───
const MODEL_ALIASES: Record<string, string> = {
  "gpt-oss-120b": "openai/gpt-oss-120b",
  "gpt-oss-20b": "openai/gpt-oss-20b",
  "llama-3.3-70b": "llama-3.3-70b-versatile",
  "llama-3.1-8b": "llama-3.1-8b-instant",
  "llama-3.1-70b": "llama-3.1-70b-versatile",
  "llama3-70b": "llama3-70b-8192",
  "llama3-8b": "llama3-8b-8192",
  "mixtral-8x7b": "mixtral-8x7b-32768",
}

function resolveModel(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return trimmed
  if (MODEL_ALIASES[trimmed]) return MODEL_ALIASES[trimmed]
  return trimmed
}

type IncomingMessage = { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  // ═══ RATE LIMIT ═══
  const ip = getClientIp(req)
  const rl = checkRateLimit(ip)
  if (!rl.allowed) {
    return new Response(
      `Too many messages. Please wait ${rl.retryAfter}s or WhatsApp 0327 1543140.`,
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } }
    )
  }

  try {
    const apiKey = process.env.GROQ_API_KEY
    const rawModel = process.env.GROQ_MODEL

    if (!apiKey || !rawModel) {
      console.error("[chat] Missing env vars")
      return new Response(
        "Chat service is not configured. Contact HDS on WhatsApp 0327 1543140.",
        { status: 500 }
      )
    }

    const model = resolveModel(rawModel)
    console.log(`[chat] Model: ${model} | IP: ${ip}`)

    const body = await req.json().catch(() => null)
    const rawMessages = Array.isArray(body?.messages) ? body.messages : []
    if (rawMessages.length === 0) {
      return new Response("No messages provided.", { status: 400 })
    }

    const messages: IncomingMessage[] = rawMessages
      .filter(
        (m: any) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-MAX_MESSAGES)
      .map((m: any) => ({
        role: m.role,
        content: String(m.content).slice(0, MAX_CONTENT_LENGTH),
      }))

    if (messages.length === 0) {
      return new Response("No valid messages provided.", { status: 400 })
    }

    // ═══ GROQ CLIENT ═══
    const groq = new Groq({
      apiKey,
      timeout: FIRST_CHUNK_TIMEOUT, // initial connection timeout
      maxRetries: 0,
    })

    // ═══ ABORT CONTROLLER — wired to BOTH client disconnect AND our timeouts ═══
    const abortController = new AbortController()

    // Abort when client disconnects
    req.signal.addEventListener("abort", () => {
      console.log("[chat] Client disconnected — aborting upstream")
      abortController.abort()
    })

    // ═══ CALL GROQ (with first-chunk timeout) ═══
    let stream: AsyncIterable<any>
    try {
      stream = await groq.chat.completions.create(
        {
          model,
          messages: [{ role: "system", content: HDS_SYSTEM_PROMPT }, ...messages],
          temperature: 0.4,
          max_tokens: MAX_TOKENS_OUT,
          top_p: 0.9,
          presence_penalty: 0.3,
          frequency_penalty: 0.3,
          stream: true,
        },
        { signal: abortController.signal }
      )
    } catch (err: any) {
      if (err?.name === "TimeoutError" || err?.name === "AbortError") {
        console.error("[chat] First-chunk timeout")
        return new Response(
          "Response is taking too long. Please try again or WhatsApp 0327 1543140.",
          { status: 504 }
        )
      }
      throw err
    }

    // ═══ STREAM RESPONSE ═══
    const encoder = new TextEncoder()
    const startTime = Date.now()
    let lastChunkTime = Date.now()
    let closed = false

    const readable = new ReadableStream({
      async start(controller) {
        const safeClose = () => {
          if (closed) return
          closed = true
          try { controller.close() } catch {}
        }

        const safeEnqueue = (text: string): boolean => {
          if (closed) return false
          try {
            controller.enqueue(encoder.encode(text))
            return true
          } catch {
            closed = true
            return false
          }
        }

        try {
          for await (const chunk of stream) {
            // ❌ Client aborted?
            if (req.signal.aborted || abortController.signal.aborted) {
              console.log("[chat] Aborted — stopping stream")
              break
            }

            // ⏱️ Total timeout?
            if (Date.now() - startTime > TOTAL_TIMEOUT) {
              console.warn("[chat] TOTAL_TIMEOUT exceeded")
              safeEnqueue(
                "\n\n⚠️ Response took too long. Please try a shorter question or WhatsApp 0327 1543140."
              )
              break
            }

            // ⏱️ Idle timeout? (no chunk for IDLE_TIMEOUT ms)
            if (Date.now() - lastChunkTime > IDLE_TIMEOUT) {
              console.warn("[chat] IDLE_TIMEOUT exceeded")
              safeEnqueue(
                "\n\n⚠️ Connection went silent. Please try again or WhatsApp 0327 1543140."
              )
              break
            }

            const delta = chunk.choices?.[0]?.delta?.content || ""
            if (delta) {
              lastChunkTime = Date.now()
              if (!safeEnqueue(delta)) break
            }

            if (chunk.choices?.[0]?.finish_reason) break
          }
        } catch (err: any) {
          if (err?.name !== "AbortError") {
            console.error("[chat] Stream error:", err?.message || err)
            safeEnqueue(
              "\n\n⚠️ Connection issue. Please try again or WhatsApp 0327 1543140."
            )
          }
        } finally {
          safeClose()
        }
      },

      cancel() {
        // ✅ Actually abort the upstream Groq stream — prevents leaked connections
        closed = true
        try { abortController.abort() } catch {}
        console.log("[chat] Stream cancelled by client")
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        "Connection": "keep-alive",
      },
    })
  } catch (err: any) {
    console.error("[chat] API error:", err?.message || err)
    const status = err?.status ?? err?.response?.status
    const detail = err?.error?.message || err?.message || "Unknown error"

    let userMessage = "Sorry, something went wrong. Please try again or WhatsApp 0327 1543140."
    if (status === 401 || /invalid api key/i.test(detail)) {
      userMessage = "Authentication failed. Contact HDS on WhatsApp 0327 1543140."
    } else if (status === 404 || /model.*not.*exist/i.test(detail)) {
      userMessage = "Chat model unavailable. Please try again later."
    } else if (status === 429) {
      userMessage = "Too many requests. Please wait a moment."
    }

    return new Response(userMessage, { status: 500 })
  }
}