import { UserCheck } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

export function MentorshipAudience({ mentorship }: { mentorship: Mentorship }) {
  return (
    <section className="py-12 lg:py-16 bg-muted/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-eyebrow mb-2">Who Is This For</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Is this mentorship right for you?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {mentorship.targetAudience.map((audience, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationDuration: "600ms" }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                <UserCheck className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-foreground leading-relaxed pt-1">{audience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}