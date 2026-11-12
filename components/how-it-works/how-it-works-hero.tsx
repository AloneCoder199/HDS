import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-12 lg:pt-16 lg:pb-16 bg-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-3.5 w-3.5" />
          Your Learning Journey
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          How It <span className="text-gradient">Works</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-7 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          A clear, structured 3-phase process that takes you from learning the basics to building real income and opportunities.
        </p>

        <Link
          href="/enroll"
          className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          Start Your Journey
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}