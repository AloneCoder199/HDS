"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CalendarDays, CheckCircle2, CreditCard, MessageCircle, Upload, Users, Zap } from "lucide-react"

// Target Date: 6th December 2026 (Assuming 8:00 PM start time)
const TARGET_DATE = new Date("2026-12-06T20:00:00").getTime()

export function BatchOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = TARGET_DATE - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          
          <div className="grid lg:grid-cols-2">
            {/* Left Side: Countdown & Info */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-text w-fit mb-6">
                <Zap className="h-3.5 w-3.5" />
                Batch 18 Admission Open
              </div>

              <h2 className="heading-section text-foreground mb-4">
                Classes Start <br className="hidden sm:block" />
                <span className="text-primary-text">6th December 2026</span>
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Limited seats available for the upcoming batch. Secure your spot now and get direct access to live sessions, recordings, and our private community.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" /> Time Remaining to Register:
                </p>
                <div className="flex gap-3 sm:gap-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="flex h-16 w-14 sm:h-20 sm:w-16 items-center justify-center rounded-xl bg-muted border border-border text-2xl sm:text-3xl font-bold text-foreground">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <span className="mt-2 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Enrolled Counter */}
              <div className="flex items-center gap-3 rounded-2xl bg-primary/5 border border-primary/10 p-4 w-fit">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <Users className="h-5 w-5 text-primary-text" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Registration Status</p>
                  <p className="text-sm font-bold text-foreground">Open • 1,240+ Enrolled</p>
                </div>
              </div>
            </div>

            {/* Right Side: Fee & Steps */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-muted/20">
              
              {/* Fee Comparison */}
              <div className="mb-10 text-center lg:text-left">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Scholarship Offer</p>
                <div className="flex items-baseline justify-center lg:justify-start gap-4">
                  <span className="text-2xl text-muted-foreground line-through decoration-destructive/50 decoration-2">
                    Rs. 25,000
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-foreground">
                    Rs. 200
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  One-time seat confirmation fee.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="space-y-6 mb-10">
                <h4 className="text-sm font-bold text-foreground mb-4">How to Confirm Your Seat:</h4>
                
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-text font-bold text-sm">1</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Pay Rs. 200</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" /> JazzCash / Easypaisa: <strong className="text-foreground">0327 1543140</strong>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-text font-bold text-sm">2</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Upload Screenshot</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Upload className="h-3.5 w-3.5" /> Fill the enrollment form.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-text font-bold text-sm">3</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Get Confirmation</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5" /> Join private WhatsApp group & get schedule.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/enroll"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-8 py-4 text-base font-bold text-white shadow-glow transition-smooth hover:scale-[1.02] hover:opacity-95"
              >
                Confirm Your Seat Now
                <ArrowRight className="h-5 w-5" />
              </Link>

              <p className="mt-4 text-center text-xs text-destructive/80 font-medium">
                ⚠️ Payment only to official number: 0327 1543140 (Ali Hassan).
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}