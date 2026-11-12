"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Users,
  GraduationCap,
  MapPin,
  Lightbulb,
  BookOpen,
  Rocket,
  Briefcase,
  TrendingUp,
  Target,
  Eye,
  Award,
  Globe,
  Monitor,
  UserCheck,
  CheckCircle,
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
  Mail,
  Phone,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// REAL STATS (from brief)
// ═══════════════════════════════════════════════════════════════
const impactStats = [
  {
    icon: Rocket,
    value: 2023,
    suffix: "",
    label: "Founded",
    description: "Empowering youth since",
    color: "#3495EB",
    isYear: true,
  },
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Students Trained",
    description: "Across Pakistan",
    color: "#8B5CF6",
    isYear: false,
  },
  {
    icon: GraduationCap,
    value: 3,
    suffix: "",
    label: "Top Mentorships",
    description: "AI · SMM · Crypto",
    color: "#10B981",
    isYear: false,
  },
  {
    icon: Layers,
    value: 18,
    suffix: "",
    label: "Current Batch",
    description: "Registration open",
    color: "#F59E0B",
    isYear: false,
    prefix: "Batch ",
  },
];

// ═══════════════════════════════════════════════════════════════
// REAL TIMELINE (only brief-backed milestones)
// ═══════════════════════════════════════════════════════════════
const timelineData = [
  {
    year: "2023",
    title: "HDS Founded",
    description:
      "Hassan Digital Skills was established by Ali Hassan (Meta & Google Certified) with a mission to make practical digital skills accessible to every Pakistani student.",
    highlight: "The Beginning",
    icon: Lightbulb,
  },
  {
    year: "2024–2025",
    title: "Growth & Refinement",
    description:
      "Refined the mentorship model with 100% live Zoom classes, class recordings, hands-on projects, and real internship opportunities — resulting in 15,000+ students trained.",
    highlight: "15,000+ Students",
    icon: TrendingUp,
  },
  {
    year: "2026",
    title: "Batch 18 Launching",
    description:
      "Batch 18 begins on 6 December 2026. Three top-demand mentorships — AI, Social Media Marketing, and Crypto Trading — with 10,000 total seats available.",
    highlight: "Batch 18 · 6 Dec 2026",
    icon: Rocket,
  },
  {
    year: "2030",
    title: "Vision X 2030",
    description:
      "From Learner, to Leader, to Investor — building a future where education and digital skills create real, lasting opportunity for every common person.",
    highlight: "The Future",
    icon: Award,
  },
];

// ═══════════════════════════════════════════════════════════════
// REAL FEATURES (from brief — "Why HDS")
// ═══════════════════════════════════════════════════════════════
const differentiators = [
  {
    icon: Video,
    title: "100% Live Interactive Classes",
    description:
      "Attend live sessions on Zoom with Ali Hassan. Ask questions in real-time, get feedback, and learn interactively — not from pre-recorded videos.",
    stat: "Live Zoom",
  },
  {
    icon: PlayCircle,
    title: "Class Recordings",
    description:
      "Missed a session? Every lecture is recorded and available to watch anytime. Revise at your own pace without missing anything.",
    stat: "On-Demand",
  },
  {
    icon: Briefcase,
    title: "Live Client-Based Projects",
    description:
      "Work on real-world projects to build a portfolio that actually gets you hired. Complete daily practical assignments alongside the theory.",
    stat: "Real Work",
  },
  {
    icon: MessageSquare,
    title: "Private WhatsApp Community",
    description:
      "Join an exclusive community of fellow students. Network, ask questions, and stay updated on new opportunities — directly from your phone.",
    stat: "Direct Access",
  },
  {
    icon: UserCheck,
    title: "Direct Mentor Support",
    description:
      "Get your questions answered directly by Ali Hassan — not by bots or moderators. Personal guidance throughout your learning journey.",
    stat: "Mentor-Led",
  },
  {
    icon: FileCheck,
    title: "HDS Certified e-Certificate",
    description:
      "Receive a verifiable HDS Certified e-Certificate after completing your training. Unique ID, QR verification, and industry-recognized for your portfolio.",
    stat: "Verifiable",
  },
];

// ═══════════════════════════════════════════════════════════════
// MISSION / VISION / PURPOSE (from brief)
// ═══════════════════════════════════════════════════════════════
const pillars = [
  {
    title: "Our Mission",
    subtitle: "Skills for Every Pakistani",
    description:
      "To make practical, income-focused digital skills accessible to every common person in Pakistan — regardless of background or prior experience. Quality education, real mentorship, and genuine support.",
    icon: Target,
    gradient: "from-[#3495EB] to-[#347ce0]",
  },
  {
    title: "Our Vision",
    subtitle: "Success for Every Common Person",
    description:
      "A future where every learner can transform digital skills into real opportunities. A complete ecosystem: from learning to practical experience to freelancing or job readiness.",
    icon: Eye,
    gradient: "from-[#8B5CF6] to-[#7c3aed]",
  },
  {
    title: "Vision X 2030",
    subtitle: "From Learner, to Leader, to Investor",
    description:
      "Building a pathway where skills education leads to real outcomes — learning, building a career, and giving back to the community. Focused purely on education and growth.",
    icon: Award,
    gradient: "from-[#10B981] to-[#059669]",
  },
];

// ═══════════════════════════════════════════════════════════════
// ECOSYSTEM STEPS (real from brief)
// ═══════════════════════════════════════════════════════════════
const ecosystemSteps = [
  {
    step: "01",
    title: "Learn",
    desc: "Live classes, recordings, and daily practical work",
    icon: BookOpen,
    color: "#3495EB",
  },
  {
    step: "02",
    title: "Practice",
    desc: "Real client-based projects and assignments",
    icon: Briefcase,
    color: "#8B5CF6",
  },
  {
    step: "03",
    title: "Certify",
    desc: "HDS Certified e-Certificate, verifiable online",
    icon: Award,
    color: "#F59E0B",
  },
  {
    step: "04",
    title: "Grow",
    desc: "Internship, freelancing & job opportunities",
    icon: TrendingUp,
    color: "#10B981",
  },
];

// ═══════════════════════════════════════════════════════════════
// TRUST BADGES (real & verified only)
// ═══════════════════════════════════════════════════════════════
const trustBadges = [
  { icon: ShieldCheck, text: "Meta & Google Certified Mentor" },
  { icon: Award, text: "HDS Certified e-Certificate" },
  { icon: Clock, text: "Since 2023" },
  { icon: Users, text: "15,000+ Students Trained" },
  { icon: Phone, text: "0327 1543140" },
];

// ═══════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
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

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary-text border border-primary/20 px-3 py-1 mb-5 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              About Hassan Digital Skills
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Empowering Pakistan Through{" "}
              <span className="text-gradient">Digital Skills</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Since 2023, HDS has trained <strong className="text-foreground">15,000+ students</strong> in
              practical, income-focused digital skills through live mentorship,
              real projects, and verifiable certification.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/mentorships">
                <Button className="gradient-primary text-white px-6 h-11 text-sm font-bold rounded-xl shadow-glow hover:scale-105 transition-all inline-flex items-center gap-2">
                  Explore Mentorships
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/founder-story">
                <Button
                  variant="outline"
                  className="border-border text-foreground px-6 h-11 text-sm font-semibold rounded-xl hover:bg-muted transition-all"
                >
                  Meet the Founder
                </Button>
              </Link>
            </div>
          </div>

          {/* ═══ Stats ═══ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-border hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-5 text-center">
                    <div
                      className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <IconComponent
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
                    <div className="text-[11px] sm:text-xs font-semibold text-foreground mb-0.5">
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

      {/* ═══════════════════════ WHO WE ARE ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <Badge className="bg-accent/10 text-accent border border-accent/20 mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold">
                <Target className="w-3.5 h-3.5" />
                Who We Are
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                Built to Solve a Real Challenge in Pakistan
              </h2>

              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Hassan Digital Skills (HDS)</strong> was
                  established in 2023 by{" "}
                  <strong className="text-foreground">Ali Hassan</strong> (Meta & Google
                  Certified) with a clear vision: to equip individuals across
                  Pakistan with the practical skills, tools, and support needed
                  to earn online and build a stable future.
                </p>
                <p>
                  Starting with live online mentorship, HDS gradually evolved
                  into a structured platform focused on skill development,
                  practical exposure, and real growth. We identified the gap
                  between traditional education and industry needs — and built
                  a solution around it.
                </p>
                <p>
                  Today, HDS continues to grow with a network of{" "}
                  <strong className="text-foreground">15,000+ students</strong>,
                  live mentorships, real client projects, and a supportive
                  learning community.
                </p>
              </div>

              {/* Founder credit */}
              <div className="mt-6 flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary-text" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Ali Hassan</p>
                  <p className="text-[10px] text-muted-foreground">
                    Founder & Mentor · Meta & Google Certified
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Real Challenges Solved */}
            <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-700">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                The Gap We Fill
              </h3>

              {[
                {
                  title: "Theory Without Practice",
                  description:
                    "Traditional courses teach concepts but leave students without real-world experience. HDS adds live projects, assignments, and internships.",
                },
                {
                  title: "High-Cost Barriers",
                  description:
                    "Quality digital skills training was expensive. Our scholarship model makes mentorship accessible for just Rs. 200 seat confirmation fee.",
                },
                {
                  title: "No Guidance After Learning",
                  description:
                    "Most students learn alone and get stuck. HDS provides direct mentor support, private community, and internship pathways.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-l-4 border-l-primary bg-card border-border hover:shadow-md transition-all"
                >
                  <CardContent className="p-4 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary-text" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TIMELINE ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary/10 text-primary-text border border-primary/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5" />
              Our Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              From 2023 to <span className="text-gradient">Vision X 2030</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Real milestones, real progress — building Pakistan's digital
              workforce one batch at a time.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-[#10B981] md:-translate-x-1/2" />

            <div className="space-y-8">
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center md:gap-6 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-in fade-in slide-in-from-bottom-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
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
                            <span className="text-base font-bold text-primary-text">
                              {item.year}
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary-text border-primary/20 text-[9px] inline-flex items-center gap-1"
                            >
                              <Zap className="w-2.5 h-2.5" />
                              {item.highlight}
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
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md z-10">
                      <IconComponent className="w-3.5 h-3.5 text-primary-text" />
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

      {/* ═══════════════════════ PILLARS ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Target className="w-3.5 h-3.5" />
              Our Foundation
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              What Drives Us <span className="text-gradient">Forward</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <Card
                  key={index}
                  className="group relative bg-card border-border hover:border-primary/30 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradient}`}
                  />
                  <CardContent className="p-5 sm:p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-primary-text" />
                    </div>

                    <div className="text-[10px] font-bold text-primary-text uppercase tracking-wider mb-1">
                      {pillar.subtitle}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY HDS ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold">
              <Award className="w-3.5 h-3.5" />
              Why Choose HDS
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              The HDS <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Real features included in every mentorship — no add-ons, no
              hidden costs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card border-border hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-primary-text" />
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/20 text-primary-text text-[10px]"
                      >
                        {item.stat}
                      </Badge>
                    </div>

                    <h3 className="text-sm font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={index}
                  className="px-3 py-1.5 bg-card rounded-full border border-border text-foreground font-medium text-[11px] inline-flex items-center gap-1.5 hover:border-primary/30 transition-all animate-in fade-in duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className="w-3 h-3 text-primary-text" />
                  {badge.text}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ECOSYSTEM ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              The HDS <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              A complete cycle from learning to real opportunity
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-[#10B981] -translate-y-1/2 z-0" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {ecosystemSteps.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="text-center animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: item.color }}
                        />
                      </div>
                      <div
                        className="text-[10px] font-bold mb-0.5"
                        style={{ color: item.color }}
                      >
                        Step {item.step}
                      </div>
                      <h3 className="text-sm font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-sm sm:text-base text-white/85 mb-8 max-w-xl mx-auto leading-relaxed">
              Join Batch 18 — three top mentorships starting{" "}
              <strong className="text-white">6 December 2026</strong>. Market
              value Rs. 25,000, scholarship seat fee just Rs. 200.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
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