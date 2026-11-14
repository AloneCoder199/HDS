"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Zap,
  ShieldCheck,
  MessageCircle,
} from "lucide-react"

const STORAGE_KEY = "hds-announcement-seen-v1"

export function AnnouncementPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY)
      if (!seen) {
        // Small delay so page paints first — better UX
        const timer = setTimeout(() => setOpen(true), 1500)
        return () => clearTimeout(timer)
      }
    } catch {
      // Fallback if sessionStorage blocked
      const timer = setTimeout(() => setOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Body scroll lock while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (open) {
      window.addEventListener("keydown", handleKey)
      return () => window.removeEventListener("keydown", handleKey)
    }
  }, [open])

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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* ═══ Modal ═══ */}
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ═══ Animated Gradient Bar (top) ═══ */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-primary to-accent"
              />

              {/* ═══ Glow Decor ═══ */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

              {/* ═══ Close Button ═══ */}
              <button
                onClick={handleClose}
                aria-label="Close announcement"
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 border border-border text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative p-6 sm:p-7">
                {/* ═══ Header Icon + Badge ═══ */}
                <div className="flex flex-col items-center text-center mb-5">
                  {/* Animated Icon with pulse rings */}
                  <div className="relative mb-4">
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl bg-primary/30"
                    />
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      className="absolute inset-0 rounded-2xl bg-primary/20"
                    />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <Sparkles className="h-7 w-7 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Live Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-bold text-green-600 dark:text-green-500 mb-3"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                    </span>
                    LIVE · Registration Open
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2"
                  >
                    Batch 18 is Now{" "}
                    <span className="text-gradient">Live!</span>
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed"
                  >
                    New batch started — seats filling fast. Secure your spot
                    today at just <strong className="text-foreground">Rs. 200</strong>{" "}
                    (market value Rs. 25,000).
                  </motion.p>
                </div>

                {/* ═══ Quick Info Grid ═══ */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="grid grid-cols-3 gap-2 mb-4"
                >
                  <div className="rounded-xl border border-border bg-card p-2.5 text-center">
                    <Calendar className="h-4 w-4 text-primary-text mx-auto mb-1" />
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                      Starts
                    </p>
                    <p className="text-[11px] font-bold text-foreground">
                      6 Dec 2026
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-2.5 text-center">
                    <Clock className="h-4 w-4 text-accent mx-auto mb-1" />
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                      Classes
                    </p>
                    <p className="text-[11px] font-bold text-foreground">
                      8 PM PKT
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-2.5 text-center">
                    <Users className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                      Seats
                    </p>
                    <p className="text-[11px] font-bold text-foreground">
                      10,000
                    </p>
                  </div>
                </motion.div>

                {/* ═══ Special Offer Strip ═══ */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-3 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-text mb-0.5">
                        Scholarship Seat Fee
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-extrabold text-foreground">
                          Rs. 200
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          Rs. 25,000
                        </span>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 animate-pulse">
                      <Zap className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                  </div>
                </motion.div>

                {/* ═══ Feature Chips ═══ */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center justify-center gap-1.5 mb-5"
                >
                  {[
                    "Live Classes",
                    "Recordings",
                    "Certificate",
                    "Internship",
                  ].map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground"
                    >
                      <ShieldCheck className="h-2.5 w-2.5 text-green-500" />
                      {feature}
                    </span>
                  ))}
                </motion.div>

                {/* ═══ Primary CTA ═══ */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Link
                    href="/enroll"
                    onClick={handleClose}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
                  >
                    <Zap className="h-4 w-4" />
                    Enroll Now — Rs. 200
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href="https://wa.me/923271543140?text=Hello%20HDS%20Team!%20I%20want%20to%20know%20more%20about%20Batch%2018."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-[#25D366]/40"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                    Talk to our team on WhatsApp
                  </a>
                </motion.div>

                {/* ═══ Small note ═══ */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 text-center text-[10px] text-muted-foreground"
                >
                  ⚡ Limited seats · Payment only to{" "}
                  <strong className="text-foreground">0327 1543140</strong>{" "}
                  (Ali Hassan)
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}