"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Info,
  UserCheck,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

const STORAGE_KEY = "hds-admission-notice-seen"

export function AdmissionNoticePopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY)
      if (!seen) {
        // Small delay so page loads first — better UX
        const timer = setTimeout(() => setOpen(true), 700)
        return () => clearTimeout(timer)
      }
    } catch {}
  }, [])

  const handleClose = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ═══ Backdrop ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* ═══ Modal ═══ */}
          <div className="fixed inset-0 z-[81] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient strip */}
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-primary to-accent" />

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-5 sm:p-6">
                {/* ─── Icon ─── */}
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/20">
                  <Info className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>

                {/* ─── Title ─── */}
                <h2 className="text-center text-lg sm:text-xl font-bold text-foreground mb-1.5">
                  Important Enrollment Notice
                </h2>
                <p className="text-center text-xs text-muted-foreground mb-4 leading-relaxed">
                  Please read this before you proceed with your enrollment.
                </p>

                {/* ─── Main message ─── */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 mb-3">
                  <p className="text-xs text-foreground leading-relaxed text-center">
                    To avail the <strong>Rs. 200 scholarship seat fee</strong>,
                    please complete your enrollment through your referring{" "}
                    <strong>Admission Manager</strong>.
                  </p>
                </div>

                {/* ─── Price comparison ─── */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* With Manager */}
                  <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-2.5 text-center">
                    <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15">
                      <UserCheck className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-green-700 dark:text-green-500 mb-0.5">
                      With Manager
                    </p>
                    <p className="text-base font-bold text-foreground">Rs. 200</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Scholarship
                    </p>
                  </div>

                  {/* Without Manager */}
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-2.5 text-center">
                    <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15">
                      <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-destructive mb-0.5">
                      Direct
                    </p>
                    <p className="text-base font-bold text-foreground line-through decoration-destructive decoration-2">
                      Rs. 25,000
                    </p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Standard fee
                    </p>
                  </div>
                </div>

                {/* ─── Warning note ─── */}
                <div className="flex items-start gap-1.5 rounded-lg bg-muted/60 p-2.5 mb-4">
                  <ShieldCheck className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Enrollments made <strong className="text-foreground">without an Admission Manager</strong> will be charged the standard fee of{" "}
                    <strong className="text-foreground">Rs. 25,000</strong>.
                  </p>
                </div>

                {/* ─── Primary CTA ─── */}
                <button
                  onClick={handleClose}
                  className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl gradient-primary px-4 py-2.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
                >
                  I Understand, Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* ─── Help line ─── */}
                <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <MessageCircle className="h-3 w-3" />
                  Need help? Contact your Admission Manager
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}