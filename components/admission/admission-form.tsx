"use client"

import { useState } from "react"
import {
  User,
  Users,
  Calendar,
  MapPin,
  GraduationCap,
  Phone,
  BookOpen,
  CreditCard,
  Layers,
  UserCheck,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VALID_COURSES } from "@/lib/admission/validation"

interface Props {
  onSuccess: () => void
}

const initialForm = {
  studentFullName: "",
  fatherName: "",
  studentAge: "",
  city: "",
  qualification: "",
  whatsappNumber: "",
  enrolledCourse: "",
  feePaid: "",
  batchNumber: "",
  managerName: "",
}

export function AdmissionForm({ onSuccess }: Props) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })
    }
  }

  const validateLocal = (): boolean => {
    const errs: Record<string, string> = {}
    if (form.studentFullName.trim().length < 3)
      errs.studentFullName = "Required (min 3 chars)"
    if (form.fatherName.trim().length < 3)
      errs.fatherName = "Required (min 3 chars)"
    if (!form.studentAge || Number(form.studentAge) < 5 || Number(form.studentAge) > 80)
      errs.studentAge = "Must be 5-80"
    if (form.city.trim().length < 2) errs.city = "Required"
    if (form.qualification.trim().length < 2) errs.qualification = "Required"
    if (!/^03\d{9}$/.test(form.whatsappNumber.replace(/\s/g, "")))
      errs.whatsappNumber = "Format: 03XXXXXXXXX"
    if (!form.enrolledCourse) errs.enrolledCourse = "Select course"
    if (!form.feePaid || Number(form.feePaid) < 0)
      errs.feePaid = "Enter valid amount"
    if (form.batchNumber.trim().length < 1) errs.batchNumber = "Required"
    if (form.managerName.trim().length < 2) errs.managerName = "Required"

    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateLocal()) {
      setError("Please fix the highlighted fields.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/admission/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentFullName: form.studentFullName.trim(),
          fatherName: form.fatherName.trim(),
          studentAge: Number(form.studentAge),
          city: form.city.trim(),
          qualification: form.qualification.trim(),
          whatsappNumber: form.whatsappNumber.replace(/\s/g, ""),
          enrolledCourse: form.enrolledCourse,
          feePaid: Number(form.feePaid),
          batchNumber: form.batchNumber.trim(),
          managerName: form.managerName.trim(),
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        onSuccess()
      } else if (res.status === 401) {
        setError("Session expired. Please refresh the page and re-enter password.")
      } else {
        setError(data.error || "Submission failed. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            HDS Admission Entry
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter student enrollment details. All fields required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {/* 1. Student Full Name */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <User className="h-3 w-3" /> Student Full Name *
              </Label>
              <Input
                value={form.studentFullName}
                onChange={(e) => update("studentFullName", e.target.value)}
                placeholder="e.g. Ahmed Ali"
                className="h-10 text-sm"
              />
              {fieldErrors.studentFullName && (
                <p className="text-[10px] text-destructive">{fieldErrors.studentFullName}</p>
              )}
            </div>

            {/* 2. Father's Name */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <Users className="h-3 w-3" /> Father's Name *
              </Label>
              <Input
                value={form.fatherName}
                onChange={(e) => update("fatherName", e.target.value)}
                placeholder="e.g. Muhammad Ali"
                className="h-10 text-sm"
              />
              {fieldErrors.fatherName && (
                <p className="text-[10px] text-destructive">{fieldErrors.fatherName}</p>
              )}
            </div>

            {/* 3. Age */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Student Age *
              </Label>
              <Input
                type="number"
                value={form.studentAge}
                onChange={(e) => update("studentAge", e.target.value)}
                placeholder="e.g. 20"
                min={5}
                max={80}
                className="h-10 text-sm"
              />
              {fieldErrors.studentAge && (
                <p className="text-[10px] text-destructive">{fieldErrors.studentAge}</p>
              )}
            </div>

            {/* 4. City */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <MapPin className="h-3 w-3" /> City *
              </Label>
              <Input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="e.g. Lahore"
                className="h-10 text-sm"
              />
              {fieldErrors.city && (
                <p className="text-[10px] text-destructive">{fieldErrors.city}</p>
              )}
            </div>

            {/* 5. Qualification */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <GraduationCap className="h-3 w-3" /> Qualification *
              </Label>
              <Input
                value={form.qualification}
                onChange={(e) => update("qualification", e.target.value)}
                placeholder="e.g. FSc, BBA, Matric"
                className="h-10 text-sm"
              />
              {fieldErrors.qualification && (
                <p className="text-[10px] text-destructive">{fieldErrors.qualification}</p>
              )}
            </div>

            {/* 6. WhatsApp */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <Phone className="h-3 w-3" /> WhatsApp Number *
              </Label>
              <Input
                value={form.whatsappNumber}
                onChange={(e) => update("whatsappNumber", e.target.value)}
                placeholder="03271543140"
                className="h-10 text-sm"
              />
              {fieldErrors.whatsappNumber && (
                <p className="text-[10px] text-destructive">{fieldErrors.whatsappNumber}</p>
              )}
            </div>

            {/* 7. Course */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> Enrolled Course *
              </Label>
              <Select
                value={form.enrolledCourse}
                onValueChange={(v) => update("enrolledCourse", v)}
              >
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Select mentorship" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_COURSES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldErrors.enrolledCourse && (
                <p className="text-[10px] text-destructive">{fieldErrors.enrolledCourse}</p>
              )}
            </div>

            {/* 8. Fee */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <CreditCard className="h-3 w-3" /> Fee Paid (PKR) *
              </Label>
              <Input
                type="number"
                value={form.feePaid}
                onChange={(e) => update("feePaid", e.target.value)}
                placeholder="e.g. 200"
                min={0}
                className="h-10 text-sm"
              />
              {fieldErrors.feePaid && (
                <p className="text-[10px] text-destructive">{fieldErrors.feePaid}</p>
              )}
            </div>

            {/* 9. Batch Number */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <Layers className="h-3 w-3" /> Batch Number *
              </Label>
              <Input
                value={form.batchNumber}
                onChange={(e) => update("batchNumber", e.target.value)}
                placeholder="e.g. Batch 18"
                className="h-10 text-sm"
              />
              {fieldErrors.batchNumber && (
                <p className="text-[10px] text-destructive">{fieldErrors.batchNumber}</p>
              )}
            </div>

            {/* 10. Manager Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-[11px] font-semibold flex items-center gap-1">
                <UserCheck className="h-3 w-3" /> Franchise / Management Member Name *
              </Label>
              <Input
                value={form.managerName}
                onChange={(e) => update("managerName", e.target.value)}
                placeholder="Your name (who enrolled this student)"
                className="h-10 text-sm"
              />
              {fieldErrors.managerName && (
                <p className="text-[10px] text-destructive">{fieldErrors.managerName}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 gradient-primary text-white font-bold rounded-xl shadow-glow"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting to HDS...
                </>
              ) : (
                <>
                  Submit Enrollment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 inline mr-1 text-green-500" />
            Data will be saved to HDS master Google Sheet
          </p>
        </form>
      </div>
    </div>
  )
}