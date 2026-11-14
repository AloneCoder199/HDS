// app/api/chat/route.ts
import { NextRequest } from "next/server"
import Groq from "groq-sdk"
import { HDS_SYSTEM_PROMPT } from "@/lib/knowledge/hds-knowledge"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

const MAX_MESSAGES = 8
const MAX_CONTENT_LENGTH = 1500
const MAX_TOKENS_OUT = 300          // ⬇️ was 600 — shorter, faster responses

const FIRST_CHUNK_TIMEOUT = 15_000
const IDLE_TIMEOUT = 15_000          // ⬇️ was 20s
const TOTAL_TIMEOUT = 40_000         // ⬇️ was 45s

// ─── Rate limiting ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 20

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string) {
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

const MODEL_ALIASES: Record<string, string> = {
  "gpt-oss-120b": "openai/gpt-oss-120b",
  "gpt-oss-20b": "openai/gpt-oss-20b",
  "llama-3.3-70b": "llama-3.3-70b-versatile",
  "llama-3.1-8b": "llama-3.1-8b-instant",
}

function resolveModel(raw: string): string {
  const t = raw.trim()
  if (!t) return t
  return MODEL_ALIASES[t] ?? t
}

type IncomingMessage = { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
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

    const groq = new Groq({
      apiKey,
      timeout: FIRST_CHUNK_TIMEOUT,
      maxRetries: 0,
    })

    // ═══ ABORT CONTROLLER ═══
    const abortController = new AbortController()

    req.signal.addEventListener("abort", () => {
      console.log("[chat] Client disconnected — aborting upstream")
      try { abortController.abort() } catch {}
    })

    // ═══ CALL GROQ ═══
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
        return new Response(
          "Response is taking too long. Please try again or WhatsApp 0327 1543140.",
          { status: 504 }
        )
      }
      throw err
    }

    // ═══ STREAM RESPONSE ═══
    const encoder = new TextEncoder()
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

        // ═══ WATCHDOG TIMERS — the real fix ═══
        let idleTimer: NodeJS.Timeout | null = null
        let totalTimer: NodeJS.Timeout | null = null

        const clearTimers = () => {
          if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
          if (totalTimer) { clearTimeout(totalTimer); totalTimer = null }
        }

        const resetIdleTimer = () => {
          if (idleTimer) clearTimeout(idleTimer)
          idleTimer = setTimeout(() => {
            console.warn("[chat] IDLE_TIMEOUT — no chunk for 15s, aborting")
            safeEnqueue(
              "\n\n⚠️ Connection went silent. Please try again or WhatsApp 0327 1543140."
            )
            try { abortController.abort() } catch {}
          }, IDLE_TIMEOUT)
        }

        // Hard cap
        totalTimer = setTimeout(() => {
          console.warn("[chat] TOTAL_TIMEOUT — 40s exceeded, aborting")
          safeEnqueue(
            "\n\n⚠️ Response took too long. Please try a shorter question."
          )
          try { abortController.abort() } catch {}
        }, TOTAL_TIMEOUT)

        // Start idle watchdog immediately (waiting for first chunk)
        resetIdleTimer()

        try {
          for await (const chunk of stream) {
            resetIdleTimer() // ✅ reset every chunk

            if (req.signal.aborted || abortController.signal.aborted) {
              console.log("[chat] Aborted — stopping stream")
              break
            }

            const delta = chunk.choices?.[0]?.delta?.content || ""
            if (delta) {
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
          // AbortError — timer already handled the user message
        } finally {
          clearTimers()
          safeClose()
        }
      },

      cancel() {
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