"use client"

import { useState } from "react"
import { ChevronDown, ListTree } from "lucide-react"
import type { Mentorship } from "@/data/mentorship"

export function MentorshipModules({ mentorship }: { mentorship: Mentorship }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-eyebrow mb-2">Course Curriculum</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {mentorship.modules.length} Comprehensive Modules
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3">
            Click on any module to see the topics covered.
          </p>
        </div>

        <div className="space-y-2.5">
          {mentorship.modules.map((module, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`group rounded-xl border transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${
                  isOpen
                    ? "border-primary/30 bg-card shadow-md"
                    : "border-border bg-background hover:border-primary/20"
                }`}
                style={{ animationDelay: `${i * 60}ms`, animationDuration: "500ms" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors duration-300 ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String(module.number).padStart(2, "0")}
                    </div>
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isOpen ? "text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {module.title}
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
                    <div className="px-4 pb-4 pt-0 pl-15">
                      <ul className="space-y-1.5 pl-11">
                        {module.topics.map((topic, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
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