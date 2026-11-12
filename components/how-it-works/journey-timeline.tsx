import {
  Award,
  Briefcase,
  CreditCard,
  Layers,
  Rocket,
  Video,
} from "lucide-react"

const timeline = [
  {
    title: "Seat Confirm",
    description: "Pay Rs. 200 and secure your seat in Batch 18.",
    icon: CreditCard,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Live Classes",
    description: "Attend 14 live sessions on Zoom with recordings available.",
    icon: Video,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Certificate",
    description: "Receive your verifiable HDS e-Certificate.",
    icon: Award,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Internship",
    description: "Complete a 1-month internship for real experience.",
    icon: Briefcase,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    title: "Portfolio",
    description: "Build a strong portfolio of real client projects.",
    icon: Layers,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "Opportunities",
    description: "Find freelancing gigs, agency clients, or remote jobs.",
    icon: Rocket,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
]

export function JourneyTimeline() {
  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-eyebrow mb-2">Detailed Timeline</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Your Complete Journey
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            From seat confirmation to landing real opportunities — here's exactly what happens.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="relative animate-in fade-in slide-in-from-bottom-6"
                  style={{
                    animationDelay: `${i * 120}ms`,
                    animationDuration: "600ms",
                  }}
                >
                  {/* Node + Card */}
                  <div className="group flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div className="relative mb-4">
                      {/* Outer pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />

                      {/* Icon box */}
                      <div
                        className={`relative flex h-14 w-14 items-center justify-center rounded-full ${item.bgColor} border-2 border-background shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                      >
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>

                      {/* Step number badge */}
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background shadow-sm">
                        {i + 1}
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="w-full rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-primary/30">
                      <h3 className="text-sm font-bold text-foreground mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}