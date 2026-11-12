// app/api/chat/route.ts
import { NextRequest } from "next/server"
import Groq from "groq-sdk"
import { HDS_SYSTEM_PROMPT } from "@/lib/knowledge/hds-knowledge"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

// ─── Limits (token-saving + performance) ───
const MAX_MESSAGES = 12          // reduced from 20 → smaller context = fewer tokens
const MAX_CONTENT_LENGTH = 1500  // reduced from 2000
const MAX_TOKENS_OUT = 600       // reduced from 1024 → short answers
const FIRST_TOKEN_TIMEOUT = 12_000
const TOTAL_TIMEOUT = 45_000

// ─── Rate limiting (in-memory, per-instance) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 20        // 20 messages per minute per IP

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()

  // Periodic cleanup to avoid memory leak
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
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count++
  return { allowed: true }
}

// ─── Model aliases (auto-fix .env mistakes) ───
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
  if (trimmed.includes("/")) return trimmed
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
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfter ?? 60),
          "Content-Type": "text/plain; charset=utf-8",
        },
      }
    )
  }

  try {
    // ═══ ENV VALIDATION ═══
    const apiKey = process.env.GROQ_API_KEY
    const rawModel = process.env.GROQ_MODEL

    if (!apiKey) {
      console.error("[chat] Missing GROQ_API_KEY")
      return new Response(
        "Chat service is not configured. Please contact HDS on WhatsApp 0327 1543140.",
        { status: 500 }
      )
    }

    if (!rawModel) {
      console.error("[chat] Missing GROQ_MODEL")
      return new Response(
        "Chat service is not configured. Please contact HDS on WhatsApp 0327 1543140.",
        { status: 500 }
      )
    }

    const model = resolveModel(rawModel)
    console.log(`[chat] Model: ${model} | IP: ${ip}`)

    // ═══ PARSE & SANITIZE ═══
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
      timeout: TOTAL_TIMEOUT, // SDK-level timeout
      maxRetries: 1,          // no infinite retries (token-safe)
    })

    // ═══ CALL WITH FIRST-TOKEN TIMEOUT ═══
    let stream: AsyncIterable<any>
    try {
      stream = await groq.chat.completions.create(
        {
          model,
          messages: [
            { role: "system", content: HDS_SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.4,       // ↓ focused (was 0.6)
          max_tokens: MAX_TOKENS_OUT,
          top_p: 0.9,
          presence_penalty: 0.3,  // ↓ avoid repeating info
          frequency_penalty: 0.3, // ↓ avoid rambling
          stream: true,
        },
        {
          signal: AbortSignal.timeout(FIRST_TOKEN_TIMEOUT),
        }
      )
    } catch (err: any) {
      if (err?.name === "TimeoutError" || err?.name === "AbortError") {
        console.error("[chat] First-token timeout")
        return new Response(
          "Response is taking too long. Please try again or WhatsApp 0327 1543140.",
          { status: 504 }
        )
      }
      throw err
    }

    // ═══ STREAM RESPONSE (with disconnect + timeout detection) ═══
    const encoder = new TextEncoder()
    const startTime = Date.now()
    let closed = false

    const readable = new ReadableStream({
      async start(controller) {
        const safeClose = () => {
          if (closed) return
          closed = true
          try {
            controller.close()
          } catch {}
        }

        const safeEnqueue = (text: string): boolean => {
          if (closed) return false
          try {
            controller.enqueue(encoder.encode(text))
            return true
          } catch {
            // client disconnected — stop trying
            closed = true
            return false
          }
        }

        try {
          for await (const chunk of stream) {
            // Client aborted?
            if (req.signal.aborted) {
              console.log("[chat] Client disconnected")
              break
            }

            // Total timeout?
            if (Date.now() - startTime > TOTAL_TIMEOUT) {
              safeEnqueue(
                "\n\n⚠️ Response took too long. Please try a shorter question or WhatsApp 0327 1543140."
              )
              break
            }

            const delta = chunk.choices?.[0]?.delta?.content || ""
            if (delta) {
              if (!safeEnqueue(delta)) break
            }

            // Groq sometimes signals finish
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
        // Client cancelled — mark closed
        closed = true
        console.log("[chat] Stream cancelled by client")
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        Connection: "keep-alive",
      },
    })
  } catch (err: any) {
    console.error("[chat] API error:", err?.message || err)

    const status = err?.status ?? err?.response?.status
    const detail =
      err?.error?.message || err?.message || "Unknown error"

    let userMessage =
      "Sorry, something went wrong. Please try again or WhatsApp 0327 1543140."

    if (status === 401 || /invalid api key/i.test(detail)) {
      userMessage =
        "Authentication failed. Please contact HDS on WhatsApp 0327 1543140."
    } else if (status === 404 || /model.*not.*exist/i.test(detail)) {
      userMessage =
        "Chat model is currently unavailable. Please try again later."
      console.error(
        "[chat] MODEL NOT FOUND — Check GROQ_MODEL in .env.local. " +
          "Valid: openai/gpt-oss-120b, openai/gpt-oss-20b"
      )
    } else if (status === 429) {
      userMessage =
        "Too many requests. Please wait a moment and try again."
    } else if (status === 500 || status === 503) {
      userMessage =
        "Chat service is temporarily down. Please try again shortly."
    }

    return new Response(userMessage, { status: 500 })
  }
}