"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

export function MentorshipFAQ({ mentorship }: { mentorship: Mentorship }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-eyebrow mb-2">Got Questions?</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {mentorship.shortName} Mentorship FAQs
          </h2>
        </div>

        <div className="space-y-2.5">
          {mentorship.faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${
                  isOpen
                    ? "border-primary/30 bg-card shadow-md"
                    : "border-border bg-background hover:border-primary/20"
                }`}
                style={{ animationDelay: `${i * 100}ms`, animationDuration: "600ms" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isOpen ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500 ${
                      isOpen ? "rotate-180 text-primary" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 pl-11 text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
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