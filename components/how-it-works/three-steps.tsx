import { BookOpen, Briefcase, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Learn",
    tagline: "Master the fundamentals",
    description:
      "Attend live interactive mentorship sessions with Ali Hassan. Get access to class recordings, private community, and scholarship-based training.",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderHover: "hover:border-blue-500/40",
    points: [
      "Live Zoom classes",
      "Class recordings",
      "Private WhatsApp community",
      "Scholarship-based fee",
    ],
  },
  {
    number: "02",
    title: "Practice",
    tagline: "Build real skills",
    description:
      "Apply what you learn through daily assignments and live client-based projects. Complete a 1-month internship and earn your certificate.",
    icon: Briefcase,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderHover: "hover:border-purple-500/40",
    points: [
      "Daily practical assignments",
      "Live client-based projects",
      "1-month internship",
      "E-certificate on completion",
    ],
  },
  {
    number: "03",
    title: "Build",
    tagline: "Launch your career",
    description:
      "Create your portfolio, start freelancing, build your agency, or join a startup. Get startup support and mentorship at the Burion Center space.",
    icon: Rocket,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderHover: "hover:border-amber-500/40",
    points: [
      "Portfolio building",
      "Freelancing guidance",
      "Agency building",
      "Startup support & mentorship",
    ],
  },
]

export function ThreeSteps() {
  return (
    <section className="py-16 lg:py-20 bg-muted/20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-eyebrow mb-2">The 3-Step Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Learn · Practice · Build
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Each phase builds on the last one, taking you from beginner to professional.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 ${step.borderHover} animate-in fade-in slide-in-from-bottom-8`}
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationDuration: "700ms",
                }}
              >
                {/* Big background number */}
                <div className="absolute -top-4 -right-2 text-[100px] font-black text-muted/40 select-none leading-none tracking-tighter">
                  {step.number}
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className={`h-7 w-7 ${step.color}`} />
                  </div>

                  {/* Number badge */}
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${step.bgColor} text-[10px] font-bold ${step.color}`}
                    >
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {step.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-text transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2 pt-4 border-t border-border">
                    {step.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs text-foreground/80"
                      >
                        <span
                          className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${step.color.replace("text-", "bg-")}`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}