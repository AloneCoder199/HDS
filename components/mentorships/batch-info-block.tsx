import { CalendarDays, Users, Clock, BookOpen } from "lucide-react"

const batchStats = [
  { icon: CalendarDays, label: "Start Date", value: "6 Dec 2026" },
  { icon: Users, label: "Total Seats", value: "10,000" },
  { icon: Clock, label: "Duration", value: "1–1.5 Months" },
  { icon: BookOpen, label: "Lectures", value: "14 Live" },
]

const timings = [
  { name: "Social Media Marketing", time: "8:00 PM", color: "bg-purple-500" },
  { name: "Artificial Intelligence", time: "9:15 PM", color: "bg-blue-500" },
  { name: "Crypto Trading", time: "10:15 PM", color: "bg-amber-500" },
]

export function BatchInfoBlock() {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-eyebrow mb-1">Batch Details</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Batch 18 Overview
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {batchStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-background p-4 text-center transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 animate-in fade-in duration-500"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary-text" />
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    {stat.value}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Class Timings */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center">
              Class Timings (PKT)
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {timings.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-3 transition-all duration-300 hover:shadow-sm animate-in fade-in duration-500"
                  style={{ animationDelay: `${(i + 4) * 100}ms` }}
                >
                  <div className={`h-2 w-2 rounded-full ${t.color} animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground leading-tight">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}