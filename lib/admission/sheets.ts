import type { AdmissionInput } from "./validation"

export async function sendToGoogleSheets(
  record: AdmissionInput,
  ipAddress: string
): Promise<{ success: boolean; error?: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!url) {
    return { success: false, error: "Google Sheets webhook not configured" }
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, ipAddress }),
      redirect: "follow",
    })

    if (!response.ok) {
      return { success: false, error: `Sheets responded ${response.status}` }
    }

    const data = await response.json().catch(() => ({ success: true }))
    if (data.success === false) {
      return { success: false, error: data.error || "Sheets rejected data" }
    }

    return { success: true }
  } catch (err) {
    console.error("[admission] Sheets error:", err)
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    }
  }
}