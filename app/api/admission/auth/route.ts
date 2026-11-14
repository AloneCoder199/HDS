import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
  createSessionToken,
  verifyPassword,
} from "@/lib/admission/auth"

// ─── Simple in-memory rate limit ───
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const now = Date.now()

  // Rate limit
  const entry = attempts.get(ip)
  if (entry && now < entry.resetAt && entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    )
  }

  const body = await req.json().catch(() => null)
  const password = String(body?.password || "")

  if (!password || !verifyPassword(password)) {
    // Increment attempt
    if (!entry || now >= entry.resetAt) {
      attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    } else {
      entry.count++
    }
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  }

  // Clear attempts on success
  attempts.delete(ip)

  // Set session cookie
  const token = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
  })

  return NextResponse.json({ success: true })
}