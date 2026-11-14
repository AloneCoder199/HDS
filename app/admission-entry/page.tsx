"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { PasswordGate } from "@/components/admission/password-gate"
import { AdmissionForm } from "@/components/admission/admission-form"
import { SuccessState } from "@/components/admission/success-state"

type State = "loading" | "auth" | "form" | "success"

export default function AdmissionEntryPage() {
  const [state, setState] = useState<State>("loading")

  useEffect(() => {
    fetch("/api/admission/status")
      .then((r) => r.json())
      .then((d) => setState(d.authenticated ? "form" : "auth"))
      .catch(() => setState("auth"))
  }, [])

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (state === "auth") {
    return <PasswordGate onSuccess={() => setState("form")} />
  }

  if (state === "form") {
    return (
      <AdmissionForm
        onSuccess={() => setState("success")}
      />
    )
  }

  return <SuccessState onAnother={() => setState("form")} />
}