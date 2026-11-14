import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/admission/auth"
import { validateAdmission } from "@/lib/admission/validation"
import { sendToGoogleSheets } from "@/lib/admission/sheets"

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

export async function POST(req: NextRequest) {
  // 1. Verify session
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { error: "Unauthorized. Please re-enter the password." },
      { status: 401 }
    )
  }

  // 2. Parse body
  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // 3. Validate
  const result = validateAdmission(body)
  if (!result.valid || !result.data) {
    return NextResponse.json(
      { error: "Validation failed", details: result.errors },
      { status: 400 }
    )
  }

  // 4. Send to Google Sheets
  const ip = getIp(req)
  const sheets = await sendToGoogleSheets(result.data, ip)
  if (!sheets.success) {
    return NextResponse.json(
      {
        error: "Failed to save to Google Sheets. Please try again.",
        details: sheets.error,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}