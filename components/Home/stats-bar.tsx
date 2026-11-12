import { Calendar, Users, Layers, BookOpen } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: "Since 2023",
    label: "Empowering Youth",
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Students Trained",
  },
  {
    icon: Layers,
    value: "Batch 18",
    label: "Currently Enrolling",
  },
  {
    icon: BookOpen,
    value: "3 Top",
    label: "Mentorships",
  },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 divide-x-0 md:divide-x divide-border">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-text">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </h3>
                <p className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}