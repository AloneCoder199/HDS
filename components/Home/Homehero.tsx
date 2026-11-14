import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Star,
  Sparkles,
  Video,
  Award,
  Briefcase,
  Zap,
} from "lucide-react"

const WHATSAPP_NUMBER = "923271543140"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello HDS Team! I want to apply for the Batch 18 mentorship. Please guide me."
)

// ═══════════════════════════════════════════════════════════════════
// REAL STUDENT PHOTOS — from /public/Hero Page Students Pics/
// ═══════════════════════════════════════════════════════════════════
const studentAvatars = [
  {
    src: encodeURI("/Hero Page Students Pics/WhatsApp Image 2026-11-14 at 1.03.24 PM.jpeg"),
    name: "HDS Student",
    tag: "AI Mentorship",
  },
  {
    src: encodeURI("/Hero Page Students Pics/WhatsApp Image 2026-11-14 at 1.03.25 PM.jpeg"),
    name: "HDS Student",
    tag: "SMM Mentorship",
  },
  {
    src: encodeURI("/Hero Page Students Pics/WhatsApp Image 2026-11-14 at 1.03.28 PM.jpeg"),
    name: "HDS Student",
    tag: "Crypto Trading",
  },
  {
    src: encodeURI("/Hero Page Students Pics/WhatsApp Image 2026-11-14 at 1.03.34 PM.jpeg"),
    name: "HDS Student",
    tag: "AI Mentorship",
  },
]

// ═══════════════════════════════════════════════════════════════════
// FEATURE PILLS — 4 key benefits
// ═══════════════════════════════════════════════════════════════════
const featurePills = [
  { icon: Video, label: "Live Mentorship" },
  { icon: Zap, label: "Practical Training" },
  { icon: Award, label: "Certificate" },
  { icon: Briefcase, label: "1-Month Internship" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Gradients/Glows */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="absolute -top-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 items-center">
          {/* ═══ LEFT: Text Content ═══ */}
          <div className="flex flex-col justify-center text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-700">
            {/* Brand + Batch Badge */}
            <div className="mx-auto lg:mx-0 mb-4 inline-flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                Hassan Digital Skills
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[10px] font-bold text-green-600 dark:text-green-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Batch 18 · Open
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="heading-display text-foreground sm:text-5xl md:text-6xl text-balance leading-[1.1]">
              Learn High-Income
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">Digital Skills</span>.
              <br className="hidden sm:block" />{" "}
              Build Your Future.
            </h1>

            {/* Offer Line — Bold Price Contrast */}
            <div className="mt-6 mx-auto lg:mx-0 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-2">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Worth{" "}
                <span className="line-through decoration-destructive/50">
                  Rs. 25,000
                </span>
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="text-sm sm:text-base font-bold text-foreground">
                Yours for just{" "}
                <span className="text-gradient">Rs. 200</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground mt-5 mx-auto lg:mx-0 max-w-lg leading-relaxed">
              Get expert-led mentorship in{" "}
              <strong className="text-foreground">AI</strong>,{" "}
              <strong className="text-foreground">Social Media Marketing</strong> and{" "}
              <strong className="text-foreground">Crypto Trading</strong> — with
              practical training, live classes and career-building opportunities.
            </p>

            {/* ═══ Feature Pills ═══ */}
            <div className="mt-5 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              {featurePills.map((pill, i) => {
                const Icon = pill.icon
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <Icon className="h-3 w-3 text-primary-text" />
                    {pill.label}
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                href="/enroll"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Start Your Digital Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-background/50 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                Chat on WhatsApp
              </Link>
            </div>

            {/* CTA Sub-line */}
            <p className="text-[11px] text-muted-foreground mt-3 mx-auto lg:mx-0">
              Only <strong className="text-foreground">Rs. 200</strong> seat
              confirmation fee · No hidden charges
            </p>

            {/* ═══ Trust Indicators — Hover Bubbles ═══ */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              {/* Avatar Stack with Bubbles */}
              <div className="flex items-center -space-x-3">
                {studentAvatars.map((student, i) => (
                  <div
                    key={i}
                    className="group/avatar relative inline-flex transition-all duration-300 hover:z-30 hover:-translate-y-1"
                  >
                    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted overflow-hidden shadow-sm ring-2 ring-primary/0 transition-all duration-300 group-hover/avatar:ring-primary/40 cursor-pointer">
                      <Image
                        src={student.src}
                        alt={`${student.name} — ${student.tag}`}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                      />
                    </div>

                    {/* Hover Bubble */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 opacity-0 scale-90 translate-y-1 transition-all duration-300 group-hover/avatar:opacity-100 group-hover/avatar:scale-100 group-hover/avatar:translate-y-0">
                      <div className="relative w-[140px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <Image
                            src={student.src}
                            alt={`${student.name} — ${student.tag}`}
                            width={140}
                            height={140}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-bold text-white border border-white/20">
                              <CheckCircle2 className="h-2 w-2 text-green-400" />
                              Verified
                            </span>
                          </div>
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-[11px] font-bold text-foreground leading-tight truncate">
                            {student.name}
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight truncate">
                            {student.tag}
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
                    </div>
                  </div>
                ))}

                {/* +15k badge */}
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-bold text-primary-text shadow-sm ring-2 ring-primary/0 transition-all duration-300 hover:ring-primary/40 hover:-translate-y-1 hover:z-30 cursor-pointer">
                  15k+
                </div>
              </div>

              {/* Trust Text */}
              <div className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                Trusted by 15,000+ students across Pakistan
              </div>
            </div>
          </div>

          {/* ═══ RIGHT: Founder Image & Floating Badges ═══ */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10" />

              <Image
                src="/founder.jpeg"
                alt="Ali Hassan — Founder & Mentor, HDS"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />

              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-bold text-xl">Ali Hassan</p>
                <p className="text-white/80 text-sm">Founder & Mentor</p>
              </div>
            </div>

            {/* Floating Badge 1: Certified */}
            <div className="absolute -right-4 sm:-right-8 top-10 z-20 flex items-center gap-3 rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Meta & Google</p>
                <p className="text-[10px] text-muted-foreground">Certified Mentor</p>
              </div>
            </div>

            {/* Floating Badge 2: Live Classes */}
            <div className="absolute -left-4 sm:-left-8 bottom-20 z-20 flex items-center gap-3 rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10">
                <CheckCircle2 className="h-5 w-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">100% Live</p>
                <p className="text-[10px] text-muted-foreground">Interactive Classes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}