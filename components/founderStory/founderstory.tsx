"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Users,
  GraduationCap,
  Rocket,
  TrendingUp,
  Target,
  Eye,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
  Video,
  MessageSquare,
  FileCheck,
  Layers,
  PlayCircle,
  UserCheck,
  Briefcase,
  CheckCircle,
  Quote,
  BookOpen,
  MapPin,
  Phone,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// REAL JOURNEY TIMELINE (only brief-backed milestones)
// ═══════════════════════════════════════════════════════════
const journeyTimeline = [
  {
    year: "2023",
    title: "The Foundation",
    description:
      "Ali Hassan (Meta & Google Certified) founded Hassan Digital Skills with a mission to make practical digital skills accessible to every common person in Pakistan. Started with live online mentorship.",
    milestone: "HDS Born",
    icon: Rocket,
  },
  {
    year: "2024–2025",
    title: "Building the Ecosystem",
    description:
      "Refined the complete learning model — 100% live Zoom classes, class recordings, daily assignments, real client-based projects, private WhatsApp community, and 1-month internships. Result: 15,000+ students trained.",
    milestone: "15,000+ Students",
    icon: TrendingUp,
  },
  {
    year: "2026",
    title: "Batch 18 Launch",
    description:
      "Launching Batch 18 with three top-demand mentorships — Artificial Intelligence (9:15 PM), Social Media Marketing (8:00 PM), and Crypto Trading (10:15 PM). 10,000 total seats available.",
    milestone: "Batch 18 · 6 Dec",
    icon: GraduationCap,
  },
  {
    year: "2030",
    title: "Vision X 2030",
    description:
      "From Learner, to Leader, to Investor. A focused roadmap to build a future where every learner can transform digital skills into real, lasting opportunity.",
    milestone: "The Vision",
    icon: Award,
  },
];

// ═══════════════════════════════════════════════════════════
// REAL IMPACT STATS
// ═══════════════════════════════════════════════════════════
const impactStats = [
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Students Trained",
    description: "Since 2023",
    color: "#3495EB",
    isYear: false,
  },
  {
    icon: GraduationCap,
    value: 3,
    suffix: "",
    label: "Top Mentorships",
    description: "AI · SMM · Crypto",
    color: "#8B5CF6",
    isYear: false,
  },
  {
    icon: Layers,
    value: 18,
    suffix: "",
    label: "Batch 18",
    description: "Registration open",
    color: "#10B981",
    isYear: false,
    prefix: "Batch ",
  },
  {
    icon: Clock,
    value: 2023,
    suffix: "",
    label: "Founded",
    description: "Empowering youth",
    color: "#F59E0B",
    isYear: true,
  },
];

// ═══════════════════════════════════════════════════════════
// FOUNDER'S REAL PHILOSOPHY
// ═══════════════════════════════════════════════════════════
const coreValues = [
  {
    title: "Practical Skills",
    description:
      "No theoretical fluff. Every module focuses on real-world implementation — building tools, running campaigns, analyzing markets — so you can actually earn.",
    icon: Zap,
    color: "#3495EB",
  },
  {
    title: "Live Mentorship",
    description:
      "Direct access to Ali Hassan in every session. Ask questions, get feedback, and learn from someone who is actively running the same skills being taught.",
    icon: MessageSquare,
    color: "#8B5CF6",
  },
  {
    title: "Real Experience",
    description:
      "Live client-based projects, portfolio building, and a 1-month internship path. Learning is just the start — practice is where the real change happens.",
    icon: Briefcase,
    color: "#10B981",
  },
  {
    title: "Accessible Pricing",
    description:
      "Rs. 25,000 market value mentorship — offered through our scholarship program for a Rs. 200 seat confirmation fee. Quality education for every common person.",
    icon: ShieldCheck,
    color: "#F59E0B",
  },
];

// ═══════════════════════════════════════════════════════════
// REAL CREDENTIALS (only what's confirmed)
// ═══════════════════════════════════════════════════════════
const credentials = [
  { icon: Award, text: "Meta & Google Certified" },
  { icon: Users, text: "15,000+ Students Trained" },
  { icon: Clock, text: "Since 2023" },
  { icon: FileCheck, text: "HDS Certified e-Certificate" },
  { icon: Phone, text: "0327 1543140" },
];

// ═══════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════
function AnimatedCounter({
  value,
  suffix,
  prefix = "",
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

// React import fix
import * as React from "react";

// ═══════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════
export default function FounderStoryPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        {/* Background Orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* ─── Left: Content ─── */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <Badge className="bg-primary/10 text-primary-text border border-primary/20 px-3 py-1 mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Founder & Mentor
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                Building Pakistan's{" "}
                <span className="text-gradient">Digital Future</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                Ali Hassan (Meta & Google Certified) founded{" "}
                <strong className="text-foreground">Hassan Digital Skills</strong> in
                2023 with one mission — to make practical, income-focused
                digital skills accessible to every common person in Pakistan.
                Since then,{" "}
                <strong className="text-foreground">15,000+ students</strong>{" "}
                have been trained through live mentorship.
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-2 mb-6">
                {credentials.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-card border border-border rounded-full text-[11px] font-medium text-foreground shadow-sm inline-flex items-center gap-1.5 hover:border-primary/30 transition-colors animate-in fade-in"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <Icon className="w-3 h-3 text-primary-text" />
                      {item.text}
                    </span>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/enroll">
                  <Button className="gradient-primary text-white px-6 h-11 text-sm font-bold rounded-xl shadow-glow hover:scale-105 transition-all inline-flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/mentorships">
                  <Button
                    variant="outline"
                    className="border-border text-foreground px-6 h-11 text-sm font-semibold rounded-xl hover:bg-muted transition-all"
                  >
                    Explore Mentorships
                  </Button>
                </Link>
              </div>
            </div>

            {/* ─── Right: Founder Image ─── */}
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
              {/* Main Image Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border">
                <Image
                  src="/founder.jpeg"
                  alt="Ali Hassan — Founder of Hassan Digital Skills"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Name Tag */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Ali Hassan
                  </h3>
                  <p className="text-primary text-sm font-semibold">
                    Founder & Mentor · HDS
                  </p>
                  <p className="text-slate-300 mt-2 text-xs italic leading-relaxed">
                    "Empowering Youth With Digital Skills"
                  </p>
                </div>
              </div>

              {/* Floating Badge: Certified */}
              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl p-3 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary-text" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground leading-tight">
                      Meta & Google
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Certified
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Since 2023 */}
              <div className="absolute -top-3 -right-3 bg-background border border-border rounded-xl p-3 shadow-xl hidden sm:block animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
                <div className="text-center">
                  <p className="text-xl font-bold text-primary-text leading-none">
                    2023
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Founded
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ IMPACT STATS ═══════════════════════ */}
      <section className="py-12 bg-muted/20 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-border hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-5 text-center">
                    <div
                      className="w-11 h-11 mx-auto mb-2.5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div
                      className="text-xl sm:text-2xl font-bold mb-0.5"
                      style={{ color: stat.color }}
                    >
                      {stat.isYear ? (
                        <span>{stat.value}</span>
                      ) : (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                        />
                      )}
                    </div>
                    <div className="text-[11px] font-semibold text-foreground mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ THE STORY ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: The Story */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <Badge className="bg-accent/10 text-accent border border-accent/20 mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold">
                <Quote className="w-3.5 h-3.5" />
                The Story
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                From Learning to Teaching
              </h2>

              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Ali Hassan started his own digital skills journey as a
                  self-taught learner — mastering AI, social media marketing,
                  and trading through hands-on practice and real client work.
                </p>
                <p>
                  In <strong className="text-foreground">2023</strong>, he
                  turned that experience into{" "}
                  <strong className="text-foreground">Hassan Digital Skills</strong>{" "}
                  — a platform built specifically for Pakistani students who
                  want practical skills, not just theory.
                </p>
                <p>
                  Since then, HDS has trained{" "}
                  <strong className="text-foreground">15,000+ students</strong>{" "}
                  through live Zoom mentorship, class recordings, and real
                  project work. The focus has always been the same: real
                  skills, real support, real outcomes.
                </p>
              </div>

              {/* Quote from founder */}
              <div className="mt-6 p-4 rounded-xl border border-border bg-card relative">
                <Quote className="absolute top-3 right-3 w-6 h-6 text-primary/10" />
                <p className="text-xs italic text-foreground leading-relaxed pr-8">
                  "I don't teach theory. My mission is to equip every student
                  with the practical skills they need to earn, grow, and become
                  self-reliant."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-primary rounded-full" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Ali Hassan
                  </span>
                </div>
              </div>
            </div>

            {/* Right: What HDS Provides */}
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                What HDS Provides
              </h3>

              <div className="space-y-2.5">
                {[
                  {
                    title: "100% Live Interactive Classes",
                    description:
                      "Zoom sessions with Ali Hassan + class recordings",
                    icon: Video,
                  },
                  {
                    title: "Daily Practical Assignments",
                    description:
                      "Real client-based projects to build your portfolio",
                    icon: PlayCircle,
                  },
                  {
                    title: "Private WhatsApp Community",
                    description:
                      "Direct mentor support and peer networking",
                    icon: MessageSquare,
                  },
                  {
                    title: "HDS Certified e-Certificate",
                    description:
                      "Verifiable online with unique ID and QR code",
                    icon: FileCheck,
                  },
                  {
                    title: "Internship Opportunities",
                    description:
                      "1-month internship for students who complete training",
                    icon: Briefcase,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={i}
                      className="bg-card border-border hover:shadow-sm hover:border-primary/30 transition-all animate-in fade-in"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <CardContent className="p-3 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary-text" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-foreground">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TIMELINE ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-muted/20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary-text border border-primary/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5" />
              The Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              From 2023 to <span className="text-gradient">Vision 2030</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Real milestones, real progress — building Pakistan's digital
              workforce one batch at a time.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-[#10B981] md:-translate-x-1/2" />

            <div className="space-y-6 lg:space-y-8">
              {journeyTimeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center md:gap-6 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-in fade-in slide-in-from-bottom-4`}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 md:w-1/2 pl-12 md:pl-0 ${
                        isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                      }`}
                    >
                      <Card className="bg-card border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-4 sm:p-5">
                          <div
                            className={`flex items-center gap-2 mb-2 flex-wrap ${
                              isLeft ? "md:justify-end" : ""
                            }`}
                          >
                            <span className="text-sm font-bold text-primary-text">
                              {item.year}
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary-text border-primary/20 text-[9px] inline-flex items-center gap-1"
                            >
                              <Zap className="w-2.5 h-2.5" />
                              {item.milestone}
                            </Badge>
                          </div>
                          <h3 className="text-sm font-bold text-foreground mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md z-10">
                      <Icon className="w-4 h-4 text-primary-text" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PHILOSOPHY ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Target className="w-3.5 h-3.5" />
              Our Philosophy
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              The HDS <span className="text-gradient">Approach</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${value.color}15` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: value.color }}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">
                      {value.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ VISION 2030 ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-card border-border overflow-hidden relative animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute inset-0 gradient-primary opacity-[0.05]" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <CardContent className="relative p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary-text px-3 py-1 text-[11px] font-bold mb-3">
                  <Eye className="w-3.5 h-3.5" />
                  Vision X 2030
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  From Learner, to Leader, to Investor
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  A focused pathway where digital skills education leads to
                  real, lasting opportunity.
                </p>
              </div>

              {/* 3-step journey */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
                <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 w-full sm:w-auto justify-center">
                  <CheckCircle className="w-4 h-4 text-primary-text" />
                  <span className="text-sm font-semibold text-foreground">
                    Learner
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 w-full sm:w-auto justify-center">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">
                    Leader
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 w-full sm:w-auto justify-center">
                  <Award className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-semibold text-foreground">
                    Investor
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center text-[11px] text-muted-foreground">
                Focused purely on education and skills — a real path from
                learning to giving back.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm sm:text-base text-white/85 mb-6 max-w-xl mx-auto leading-relaxed">
              Join Batch 18 — starting{" "}
              <strong className="text-white">6 December 2026</strong>. Market
              value Rs. 25,000, scholarship seat fee just Rs. 200.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link href="/enroll">
                <Button className="bg-white text-primary hover:bg-white/90 px-6 h-11 text-sm font-bold rounded-xl shadow-lg w-full sm:w-auto inline-flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Enroll in Batch 18
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white/40 text-black hover:bg-white/10 px-6 h-11 text-sm font-semibold rounded-xl w-full sm:w-auto inline-flex items-center gap-2 backdrop-blur-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-white/70 text-[11px]">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                Rs. 200 seat fee
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-white" />
                HDS Certified e-Certificate
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-white" />
                Internship opportunities
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}