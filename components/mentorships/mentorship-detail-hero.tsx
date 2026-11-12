import Link from "next/link"
import { ArrowRight, BrainCircuit, Clock, LineChart, Megaphone, Sparkles } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

const iconMap = {
  brain: BrainCircuit,
  megaphone: Megaphone,
  chart: LineChart,
}

export function MentorshipDetailHero({ mentorship }: { mentorship: Mentorship }) {
  const Icon = iconMap[mentorship.icon]

  return (
    <section className="relative overflow-hidden pt-10 pb-12 lg:pt-14 lg:pb-16 bg-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${mentorship.colors.bg} rounded-full blur-[120px] opacity-70`} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Batch Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-3.5 w-3.5" />
          Batch 18 · Registration Open
        </div>

        {/* Icon */}
        <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${mentorship.colors.bg} animate-in fade-in zoom-in-50 duration-700 delay-100`}>
          <Icon className={`h-8 w-8 ${mentorship.colors.text}`} />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {mentorship.name}
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {mentorship.tagline}
        </p>

        {/* Timing Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
            <Clock className="h-3.5 w-3.5" /> {mentorship.timing}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
            📅 Starts {mentorship.startDate}
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/enroll"
          className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
        >
          Enroll for Rs. 200
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Crypto Risk Disclaimer */}
        {mentorship.isCrypto && (
          <div className="mx-auto mt-6 max-w-lg rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-left animate-in fade-in duration-700 delay-700">
            <p className="text-[11px] sm:text-xs text-destructive/90 font-medium leading-relaxed">
              ⚠️ <strong>Crypto trading mein nuqsan ka khatra hai.</strong> Yeh mentorship sirf taleem hai, munafa ki guarantee nahi.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}