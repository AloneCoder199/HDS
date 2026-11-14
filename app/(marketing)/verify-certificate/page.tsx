"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle,
  Clock,
  Construction,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function VerifyStudentPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* ═══ Animated Background Orbs ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14">
        {/* ═══ Back Link ═══ */}
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary-text transition-colors mb-8 animate-in fade-in slide-in-from-left-4 duration-500"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>

        {/* ═══ Main Card ═══ */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Card className="relative overflow-hidden border-border bg-card shadow-xl">
            {/* Inner Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-amber-500" />

            <CardContent className="p-8 sm:p-10 lg:p-14">
              {/* ─── Icon + Badge ─── */}
              <div className="flex flex-col items-center text-center">
                {/* Animated Icon Wrapper */}
                <div className="relative mb-6">
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-xl animate-pulse" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 shadow-lg">
                    <Construction className="h-10 w-10 text-amber-500 animate-in zoom-in duration-700" />
                  </div>

                  {/* Small floating badge */}
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-amber-500/40">
                    <Wrench className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                </div>

                {/* Badge */}
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20 px-3 py-1 text-[11px] font-bold mb-4 inline-flex items-center gap-1.5 animate-in fade-in duration-700 delay-200">
                  <Clock className="h-3 w-3" />
                  Coming Soon
                </Badge>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
                  Student Verification is{" "}
                  <span className="text-gradient">Coming Soon</span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8 animate-in fade-in duration-700 delay-400">
                  We're building a secure, fast verification system so you can
                  check your enrollment status, course details, and student ID
                  in seconds — anytime, anywhere.
                </p>

                {/* Preview of what's coming */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                  {[
                    {
                      icon: Search,
                      title: "Enter Your ID",
                      description: "Search by student ID",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Verify Status",
                      description: "Check if active or suspended",
                    },
                    {
                      icon: BookOpen,
                      title: "View Details",
                      description: "Course, dates, and more",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="group flex flex-col items-center text-center p-3.5 rounded-xl border border-border bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 mb-2 transition-transform group-hover:scale-110">
                          <Icon className="h-4 w-4 text-primary-text" />
                        </div>
                        <p className="text-[11px] font-bold text-foreground leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mb-8 animate-in fade-in duration-700 delay-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Development Progress
                    </span>
                    <span className="text-[10px] font-bold text-primary-text">
                      70%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent animate-in fade-in slide-in-from-left-full duration-1000 delay-700"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                {/* ─── What You Can Do Now ─── */}
                <div className="w-full max-w-2xl mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Meanwhile, you can:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        icon: Users,
                        label: "Explore Mentorships",
                        href: "/mentorships",
                      },
                      {
                        icon: MessageCircle,
                        label: "Chat with HDS Assistant",
                        href: "/hds-agent",
                      },
                      {
                        icon: BookOpen,
                        label: "How It Works",
                        href: "/how-it-works",
                      },
                      {
                        icon: Bell,
                        label: "Contact Our Team",
                        href: "/contact",
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3 text-left transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                              <Icon className="h-3.5 w-3.5 text-primary-text" />
                            </div>
                            <span className="text-xs font-semibold text-foreground truncate">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary-text" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* ─── Primary CTA ─── */}
                <div className="w-full max-w-md space-y-3">
                  <Link href="/enroll" className="block">
                    <Button className="w-full h-11 text-sm font-bold gradient-primary text-white rounded-xl shadow-glow hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Enroll in Batch 18
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <a
                    href="https://wa.me/923271543140"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary-text transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                    Need verification now? WhatsApp us at{" "}
                    <strong className="text-foreground">0327 1543140</strong>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ═══ Trust Line Below Card ═══ */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground animate-in fade-in duration-700 delay-800">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Secure verification
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-primary-text" />
            Privacy protected
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-amber-500" />
            Launching soon
          </div>
        </div>
      </div>
    </main>
  );
}