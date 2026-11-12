import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock,
  FileText,
  LineChart,
  Megaphone,
} from "lucide-react"

const mentorships = [
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    tagline: "Build the future with AI-powered skills.",
    timing: "9:15 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    icon: BrainCircuit,
    colors: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      gradient: "from-blue-500/10 via-blue-500/5",
      hoverBorder: "hover:border-blue-500/40",
    },
    keyModules: [
      "Advanced Prompt Engineering",
      "AI Content & Video Creation",
      "AI Programming & Vibe Coding",
      "AI Agents & Automation",
    ],
    isCrypto: false,
  },
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    tagline: "Master Meta Ads & grow businesses online.",
    timing: "8:00 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    icon: Megaphone,
    colors: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
      gradient: "from-purple-500/10 via-purple-500/5",
      hoverBorder: "hover:border-purple-500/40",
    },
    keyModules: [
      "Meta Ads Setup & Scaling",
      "Instagram & Threads Growth",
      "WhatsApp Business & Clients",
      "Freelancing & Client Acquisition",
    ],
    isCrypto: false,
  },
  {
    id: "crypto-trading",
    name: "Crypto Trading",
    tagline: "Learn technical analysis & risk management.",
    timing: "10:15 PM (PKT)",
    duration: "1–1.5 Months",
    lectures: "14 Live Lectures",
    icon: LineChart,
    colors: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      gradient: "from-amber-500/10 via-amber-500/5",
      hoverBorder: "hover:border-amber-500/40",
    },
    keyModules: [
      "Technical Analysis & Price Action",
      "Smart Money Concepts (SMC)",
      "Risk Management & Psychology",
      "Live Trading & Strategy Building",
    ],
    isCrypto: true,
  },
]

export function MentorshipCards() {
  return (
    <section className="py-12 lg:py-16 bg-muted/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {mentorships.map((m, index) => {
            const Icon = m.icon
            return (
              <div
                key={m.id}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl ${m.colors.hoverBorder} animate-in fade-in slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
                  {/* Left: Icon Visual */}
                  <div
                    className={`relative flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br ${m.colors.gradient} to-transparent border-b md:border-b-0 md:border-r border-border`}
                  >
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${m.colors.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className={`h-8 w-8 ${m.colors.text}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Mentorship {index + 1}
                      </p>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 sm:p-8">
                    {/* Title + Timing */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary-text transition-colors">
                          {m.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{m.tagline}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] font-semibold text-foreground">
                          <Clock className="h-3 w-3" /> {m.timing}
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-5 mt-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        <FileText className="h-3 w-3" /> {m.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3" /> {m.lectures}
                      </span>
                    </div>

                    {/* Key Modules */}
                    <div className="mb-5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Modules
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {m.keyModules.map((mod, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2
                              className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${m.colors.text}`}
                            />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Crypto Risk Disclaimer */}
                    {m.isCrypto && (
                      <div className="mb-5 flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-2.5">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                        <p className="text-[11px] text-destructive/90 leading-relaxed">
                          Crypto trading involves risk of loss. This is purely educational; no profit is guaranteed.
                        </p>
                      </div>
                    )}

                    {/* Price + CTAs */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-border">
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm text-muted-foreground line-through decoration-destructive/50">
                          Rs. 25,000
                        </span>
                        <span className="text-2xl font-bold text-foreground">
                          Rs. 200
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                          Seat Fee
                        </span>
                      </div>

                      <div className="flex gap-2 sm:gap-3">
                        <Link
                          href={`/mentorships/${m.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/enroll"
                          className="inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 group/btn"
                        >
                          Enroll Now
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}