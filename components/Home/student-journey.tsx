"use client"

import { useEffect, useRef, useState } from "react"
import {
  CreditCard,
  Video,
  Laptop,
  Award,
  Briefcase,
  Layers,
  Rocket,
} from "lucide-react"

const steps = [
  {
    title: "Seat Confirmation",
    description:
      "Pay the Rs. 200 scholarship fee and secure your spot in Batch 18.",
    icon: CreditCard,
    color: "text-blue-500",
    image: "/Seat Confirmation/Seat Confirmation Roadmap.png",
  },
  {
    title: "Live Classes",
    description:
      "Attend 14 interactive live sessions on Zoom with Ali Hassan.",
    icon: Video,
    color: "text-purple-500",
    image: "/Live Class/Screenshot 2026-11-06 213730.png",
  },
  {
    title: "Practical Work",
    description:
      "Complete daily assignments and work on real client-based projects.",
    icon: Laptop,
    color: "text-amber-500",
    image: "/Practical Work/Screenshot 2026-11-14 123702.png",
  },
  {
    title: "Certification",
    description:
      "Receive your verifiable HDS e-Certificate after completing the training.",
    icon: Award,
    color: "text-green-500",
    image: "/Certificate/Fatima Bibi.png",
  },
  {
    title: "Internship",
    description:
      "Apply for a 1-month internship to gain real-world industry experience.",
    icon: Briefcase,
    color: "text-teal-500",
    image:
      "/Certificate & Internship Letter/internshp.png",
  },
  {
    title: "Portfolio Building",
    description:
      "Build a strong portfolio showcasing the projects you completed.",
    icon: Layers,
    color: "text-indigo-500",
    image: "/Portfolio/Screenshot 2026-11-14 131955.png",
  },
  {
    title: "Freelancing & Jobs",
    description:
      "Use your skills and portfolio to find freelancing gigs and remote jobs.",
    icon: Rocket,
    color: "text-rose-500",
    image: "/Freelancing & Jobs/Screenshot 2026-11-14 132223.png",
  },
]

export function StudentJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const scrollDistance = rect.height - windowHeight
      const scrolled = -rect.top

      if (scrolled >= 0 && scrolled <= scrollDistance) {
        const progress = scrolled / scrollDistance
        const index = Math.min(
          Math.floor(progress * steps.length),
          steps.length - 1
        )
        setActiveIndex(index)
      } else if (scrolled < 0) {
        setActiveIndex(0)
      } else {
        setActiveIndex(steps.length - 1)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* 📱 MOBILE VIEW: Compact Timeline             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="block lg:hidden py-16 bg-background">
        <div className="mx-auto max-w-md px-4">
          <div className="text-center mb-10">
            <p className="text-eyebrow mb-2">Your Roadmap</p>
            <h2 className="text-2xl font-bold text-foreground">
              From Beginner to Professional
            </h2>
          </div>

          <div className="relative border-l-2 border-border/60 ml-3 pl-5 space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative">
                  {/* Timeline Node */}
                  <div className="absolute -left-[30px] top-2 flex h-7 w-7 items-center justify-center rounded-full bg-card border-2 border-primary/30 shadow-sm z-10">
                    <Icon className={`h-3.5 w-3.5 ${step.color}`} />
                  </div>

                  {/* Compact Card */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/85" />
                    </div>

                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 💻 DESKTOP VIEW: Sticky Scroll               */}
      {/* ═══════════════════════════════════════════ */}
      <section
        ref={containerRef}
        className="hidden lg:block relative bg-background"
        style={{ height: `${steps.length * 40}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center py-10">
          <div className="mx-auto max-w-6xl px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* ─── Left: Heading & Timeline ─── */}
              <div className="flex flex-col justify-center">
                <p className="text-eyebrow mb-3">Your Roadmap</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  From Beginner to <br /> Professional
                </h2>

                <div className="flex flex-col gap-3 border-l-2 border-border/50 pl-5 relative">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`relative flex items-center gap-3 transition-all duration-500 ${
                        activeIndex === i
                          ? "opacity-100 translate-x-0"
                          : "opacity-30 -translate-x-1"
                      }`}
                    >
                      {activeIndex === i && (
                        <div className="absolute -left-[26px] h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
                      )}

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                          activeIndex === i
                            ? "bg-primary text-white shadow-glow scale-105"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-base font-semibold transition-colors duration-500 ${
                          activeIndex === i
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Right: Animated Cards with Real Images ─── */}
              <div className="relative h-[340px] w-full">
                {steps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        activeIndex === i
                          ? "opacity-100 translate-y-0 scale-100 z-10"
                          : "opacity-0 translate-y-12 scale-95 z-0 pointer-events-none"
                      }`}
                    >
                      <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-border shadow-xl flex flex-col justify-end p-6">
                        {/* Real Background Image */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={step.image}
                            alt={step.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                        </div>

                        {/* Big Background Number */}
                        <div className="absolute top-2 right-4 z-10 text-[80px] font-black text-white/10 select-none leading-none tracking-tighter">
                          0{i + 1}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
                            <Icon className={`h-5 w-5 ${step.color}`} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-slate-200 leading-relaxed max-w-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}