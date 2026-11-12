"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react"

// Brief ke mutabiq Top 6 Sawal (English mein)
const faqs = [
  {
    question: "What is the actual fee of the mentorship, and what is the Rs. 200 for?",
    answer: "The market value of each mentorship is Rs. 25,000. However, under our scholarship program, you only pay a one-time seat confirmation fee of Rs. 200 to secure your spot in Batch 18."
  },
  {
    question: "Which mentorships are available?",
    answer: "We are currently offering three top-demand mentorships: Artificial Intelligence (9:15 PM), Social Media Marketing (8:00 PM), and Crypto Trading (10:15 PM)."
  },
  {
    question: "When do the classes start and what are the timings?",
    answer: "Batch 18 starts on 6th December 2026. Classes will be held live on Zoom every evening as per the mentorship timings."
  },
  {
    question: "What is the duration and how many lectures will be conducted?",
    answer: "The duration of each mentorship is 1 to 1.5 months, which includes 14 live interactive lectures."
  },
  {
    question: "Where will the classes be held?",
    answer: "All classes will be conducted live on Zoom. If you miss a session, you will have access to the class recordings in your student portal."
  },
  {
    question: "Can a complete beginner join this?",
    answer: "Absolutely! Our mentorships are designed from scratch. Whether you have zero experience or some basic knowledge, we will guide you step-by-step."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 lg:py-24 bg-muted/20 relative overflow-hidden">
      {/* Animated Background Blob */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-eyebrow mb-2">Got Questions?</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? "border-primary/30 bg-card shadow-md" 
                    : "border-border bg-background hover:border-primary/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className={`text-sm font-semibold transition-colors duration-300 ${
                      isOpen ? "text-foreground" : "text-foreground/80"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isOpen ? "rotate-180 text-primary" : "rotate-0"
                    }`} 
                  />
                </button>

                {/* Smooth Expand Animation using Grid */}
                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed pl-14">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-text hover:text-primary transition-colors group"
          >
            View All FAQs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}