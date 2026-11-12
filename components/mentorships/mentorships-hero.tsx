import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function MentorshipsHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 lg:pt-16 lg:pb-20 bg-background">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="absolute -top-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-text mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-3.5 w-3.5" />
          Batch 18 · Registration Open
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          3 Top-Demand <br className="sm:hidden" />
          <span className="text-gradient">Mentorships</span>
        </h1>
        
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-7 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Market value of each mentorship is <strong className="text-foreground">Rs. 25,000</strong>. Under our scholarship program, secure your seat for just <strong className="text-primary-text">Rs. 200</strong>.
        </p>

        <Link
          href="/enroll"
          className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          Confirm Your Seat
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}