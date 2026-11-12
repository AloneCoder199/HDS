"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  MessageCircle,
  PlayCircle,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/lib/CourseData"

export default function CourseDetailPage() {
  const params = useParams()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })

  const course = coursesData.find((c) => c.slug === params.slug)

  if (!course) {
    notFound()
  }

  const Icon = course.icon

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-40 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${course.gradient} opacity-[0.07] rounded-full blur-[140px] animate-pulse duration-[7000ms]`}
        />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pt-10"
      >
        {/* ═══ BACK NAV ═══ */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/courses"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary-text transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Courses
          </Link>
        </motion.div>

        {/* ═══ HERO GRID ═══ */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 mb-14">
          {/* ── LEFT: Main Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category badge */}
            <Badge
              className={`mb-4 px-2.5 py-1 text-[11px] font-semibold ${course.bgColor} ${course.color} border ${course.borderColor} rounded-full inline-flex items-center gap-1.5`}
            >
              <Zap className="h-3 w-3" />
              {course.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 leading-[1.15]">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
              {course.fullDescription}
            </p>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              <StatBox
                icon={Clock}
                label="Duration"
                value={course.duration}
                bg={course.bgColor}
                color={course.color}
                delay={0.1}
              />
              <StatBox
                icon={BookOpen}
                label="Content"
                value={`${course.hours}+ Hours`}
                bg={course.bgColor}
                color={course.color}
                delay={0.15}
              />
              <StatBox
                icon={Users}
                label="Students"
                value={course.students.toLocaleString()}
                bg={course.bgColor}
                color={course.color}
                delay={0.2}
              />
              <StatBox
                icon={Star}
                label="Rating"
                value={`${course.rating}/5.0`}
                bg={course.bgColor}
                color={course.color}
                delay={0.25}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <Link href="/enroll" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto bg-gradient-to-r ${course.gradient} text-white border-0 hover:opacity-90 px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all`}
                >
                  Enroll Now — {course.price}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  Talk to Advisor
                </Button>
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Shield className="h-3 w-3 text-green-500" />
              Learn from industry professionals · Certificate included
            </div>
          </motion.div>

          {/* ── RIGHT: Sticky "What You'll Learn" Card ── */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${course.gradient} text-white p-5 sm:p-6 shadow-2xl`}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">
                      What You'll Learn
                    </h3>
                    <p className="text-[10px] text-white/75">
                      {course.outcomes.length} key skills
                    </p>
                  </div>
                </div>

                {/* Outcomes */}
                <ul className="space-y-2 mb-4">
                  {course.outcomes.slice(0, 6).map((outcome, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                      className="flex items-start gap-2 text-[12px] leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-white/85" />
                      <span className="text-white/90">{outcome}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Certificate */}
                <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-white/85" />
                    <span className="text-xs font-bold">
                      Certificate Included
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed">
                    {course.certification}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment note (below card, outside gradient) */}
            <div className="mt-3 rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Payment Info:</strong> Only to{" "}
                <span className="font-bold text-foreground">0327 1543140</span>{" "}
                (Ali Hassan) via JazzCash / Easypaisa.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* ═══ CURRICULUM ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-14"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-eyebrow mb-1">Course Content</p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Curriculum
              </h2>
            </div>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              {course.modules.length} modules
            </Badge>
          </div>

          <div className="space-y-2.5">
            {course.modules.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.06 }}
                className="group rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${course.bgColor} text-[11px] font-bold ${course.color}`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {module.topics.length} topics
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground text-[10px] shrink-0"
                  >
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    {module.duration}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-1.5 pl-9">
                  {module.topics.map((topic, tidx) => (
                    <div
                      key={tidx}
                      className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2
                        className={`h-3 w-3 mt-0.5 shrink-0 ${course.color}`}
                      />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ INSTRUCTORS ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-14"
        >
          <div className="mb-5">
            <p className="text-eyebrow mb-1">Mentors</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Learn from Industry Experts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {course.instructors.map((instructor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${course.bgColor} text-base font-bold ${course.color} ring-2 ring-background transition-transform duration-300 group-hover:scale-110`}
                >
                  {instructor.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-foreground truncate">
                    {instructor.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {instructor.role}
                  </p>
                  <p className={`text-[10px] font-semibold ${course.color} truncate`}>
                    {instructor.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FEATURES ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-14"
        >
          <div className="text-center mb-5">
            <p className="text-eyebrow mb-1">Included</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Everything You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {course.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${course.bgColor}`}
                >
                  <CheckCircle2 className={`h-3.5 w-3.5 ${course.color}`} />
                </div>
                <span className="text-xs font-medium text-foreground">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FINAL CTA ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-8 sm:p-10 text-center text-white"
        >
          {/* Decorative */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="relative">
            <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-90" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto mb-6">
              Join {course.students.toLocaleString()} students who have transformed
              their careers with {course.title}.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link href="/enroll">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-6 py-2.5 text-sm font-bold rounded-xl border-0 shadow-lg"
                >
                  Enroll Now — {course.price}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 px-6 py-2.5 text-sm font-semibold rounded-xl backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

/* ═══════════════════════════════════════ */
/*            Stat Box Component           */
/* ═══════════════════════════════════════ */
function StatBox({
  icon: Icon,
  label,
  value,
  bg,
  color,
  delay,
}: {
  icon: React.ElementType
  label: string
  value: string
  bg: string
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group flex items-center gap-2 rounded-lg border border-border bg-card p-2.5 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg} transition-transform group-hover:scale-110`}
      >
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground leading-tight">
          {label}
        </p>
        <p className="text-[11px] font-bold text-foreground truncate">
          {value}
        </p>
      </div>
    </motion.div>
  )
}