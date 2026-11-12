import { BookOpen, CalendarDays, Clock, FileText, Wallet } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

export function MentorshipInfoBox({ mentorship }: { mentorship: Mentorship }) {
  const info = [
    { icon: FileText, label: "Duration", value: mentorship.duration },
    { icon: BookOpen, label: "Lectures", value: mentorship.lectures },
    { icon: CalendarDays, label: "Start", value: mentorship.startDate },
    { icon: Clock, label: "Timing", value: mentorship.timing },
    { icon: Wallet, label: "Seat Fee", value: "Rs. 200" },
  ]

  return (
    <section className="pb-12 lg:pb-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {info.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-center transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 animate-in fade-in duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary-text" />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                  {item.value}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}