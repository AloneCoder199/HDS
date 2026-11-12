import Link from "next/link"
import { ArrowRight, Award, CheckCircle2, Quote, TrendingUp, UserCheck } from "lucide-react"

export function FounderVision() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-background">
      {/* Soft Background Decor */}
      <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── FOUNDER SECTION ─── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">
          
          {/* LEFT: Image with Floating Badges */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Image Frame */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
                alt="Ali Hassan - Founder & Mentor"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Name Tag */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xl font-bold text-white mb-0.5">Ali Hassan</p>
                <p className="text-xs text-slate-300">Founder & Mentor, HDS</p>
              </div>
            </div>

            {/* Floating Cert Badges — animated */}
            <div className="absolute -right-3 lg:-right-5 top-8 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background/90 backdrop-blur-md px-2 py-1.5 shadow-lg animate-in fade-in slide-in-from-right-4 duration-700 delay-300 animate-[float_3s_ease-in-out_infinite]">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
                  <span className="text-[8px] font-bold">Meta</span>
                </div>
                <span className="text-[10px] font-bold text-foreground pr-1">Certified</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background/90 backdrop-blur-md px-2 py-1.5 shadow-lg animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500 text-white">
                  <span className="text-[8px] font-bold">Google</span>
                </div>
                <span className="text-[10px] font-bold text-foreground pr-1">Certified</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary-text mb-4">
              <UserCheck className="h-3 w-3" />
              Meet The Founder
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              Empowering Pakistan's Youth <br className="hidden sm:block" />
              <span className="text-gradient">Since 2023</span>
            </h2>

            {/* Description */}
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <p>
                Ali Hassan is a certified digital educator from <strong className="text-foreground">Meta & Google</strong>. Since 2023, he's on a mission to bridge Pakistan's skill gap through practical, high-quality digital education.
              </p>
              <p>
                Through HDS, he's trained over <strong className="text-foreground">15,000+ students</strong> in AI, Social Media Marketing, and Crypto Trading — making world-class skills accessible to every common person.
              </p>
            </div>

            {/* Compact Quote Box */}
            <div className="relative rounded-xl border border-border bg-card p-4 shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
              <Quote className="absolute top-3 right-3 h-6 w-6 text-primary/10" />
              <p className="text-xs sm:text-sm font-medium text-foreground italic leading-relaxed pr-6">
                "I don't just teach theory. My mission is to equip you with real, practical skills so you can earn and grow."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-0.5 w-6 bg-primary rounded-full" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Ali Hassan
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-300 hover:gap-3 hover:opacity-90"
            >
              Read Full Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* ─── VISION X 2030 BANNER ─── */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary px-6 py-10 sm:px-10 sm:py-12 text-center text-white shadow-xl animate-in fade-in zoom-in-95 duration-1000">
          
          {/* Animated Decorative Blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse duration-[4000ms]" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse duration-[5000ms]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Heading */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Our Vision <span className="text-yellow-300">X 2030</span>
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mb-8 max-w-md mx-auto">
              Education & digital skills paving the way for financial independence.
            </p>

            {/* Journey Steps — with animated arrows */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
              <div className="group flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                <CheckCircle2 className="h-4 w-4 text-yellow-300" />
                <span className="text-sm sm:text-base font-semibold">Learner</span>
              </div>
              
              <ArrowRight className="hidden sm:block h-4 w-4 text-white/50 animate-pulse" />
              <div className="h-3 w-0.5 bg-white/30 sm:hidden" />
              
              <div className="group flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                <TrendingUp className="h-4 w-4 text-yellow-300" />
                <span className="text-sm sm:text-base font-semibold">Leader</span>
              </div>
              
              <ArrowRight className="hidden sm:block h-4 w-4 text-white/50 animate-pulse" />
              <div className="h-3 w-0.5 bg-white/30 sm:hidden" />
              
              <div className="group flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                <Award className="h-4 w-4 text-yellow-300" />
                <span className="text-sm sm:text-base font-semibold">Investor</span>
              </div>
            </div>

            <p className="text-[10px] text-white/60 uppercase tracking-wider">
              From acquiring skills → creating opportunities → investing back
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}