import { createHmac, timingSafeEqual } from "crypto"

export const SESSION_COOKIE_NAME = "hds_admission_session"
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000 // 8 hours

function getPassword(): string {
  const pwd = process.env.ADMISSION_FORM_PASSWORD
  if (!pwd) throw new Error("ADMISSION_FORM_PASSWORD not configured")
  return pwd
}

function getSecret(): string {
  const s = process.env.ADMISSION_SESSION_SECRET
  if (!s) throw new Error("ADMISSION_SESSION_SECRET not configured")
  return s
}

export function verifyPassword(input: string): boolean {
  try {
    const expected = getPassword()
    if (input.length !== expected.length) return false
    return timingSafeEqual(Buffer.from(input), Buffer.from(expected))
  } catch {
    return false
  }
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const signature = createHmac("sha256", getSecret())
    .update(timestamp)
    .digest("hex")
  return `${timestamp}.${signature}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const [timestamp, signature] = token.split(".")
    if (!timestamp || !signature) return false

    const expected = createHmac("sha256", getSecret())
      .update(timestamp)
      .digest("hex")

    if (signature.length !== expected.length) return false
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return false
    }

    const age = Date.now() - parseInt(timestamp, 10)
    return age >= 0 && age < SESSION_DURATION_MS
  } catch {
    return false
  }
}