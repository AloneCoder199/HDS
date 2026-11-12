import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

export function MentorshipPriceCTA({ mentorship }: { mentorship: Mentorship }) {
  return (
    <section className="py-12 lg:py-16 bg-muted/20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 text-center shadow-sm animate-in fade-in zoom-in-95 duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Scholarship Offer
            </p>

            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span className="text-lg text-muted-foreground line-through decoration-destructive/50">
                Rs. 25,000
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-foreground">
                Rs. 200
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              One-time seat confirmation fee
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                14 Live Lectures
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                Recordings Included
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                E-Certificate
              </span>
            </div>

            <Link
              href="/enroll"
              className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              Confirm Your Seat Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {mentorship.isCrypto && (
              <p className="mt-4 text-[10px] text-destructive/80 font-medium max-w-md mx-auto">
                ⚠️ Crypto trading involves risk of loss. This is purely educational; no profit is guaranteed.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}