import Link from "next/link"
import { ArrowRight, BookOpen, Clock, Lock, Star, Users } from "lucide-react"
import { coursesData } from "@/lib/CourseData"

export function CoursesSection() {
  // Show first 6 courses (compact for home page)
  const featured = coursesData.slice(0, 6)

  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-background">
      {/* Animated Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse duration-[7000ms]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            {coursesData.length} Professional Courses
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Explore Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Industry-aligned programs to take you from beginner to job-ready professional.
          </p>
        </div>

        {/* ─── Featured Courses Grid ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((course, i) => {
            const Icon = course.icon
            const isAvailable = course.isAvailable
            const CardWrapper = (isAvailable ? Link : "div") as any
            const cardProps = isAvailable ? { href: `/courses/${course.slug}` } : {}

            return (
              <div
                key={course.id}
                className="animate-in fade-in slide-in-from-bottom-6"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationDuration: "600ms",
                }}
              >
                <CardWrapper
                  {...cardProps}
                  className={`group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 ${
                    isAvailable
                      ? "hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      : "opacity-70 cursor-not-allowed"
                  }`}
                >
                  {/* Coming Soon Badge */}
                  {!isAvailable && (
                    <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-foreground/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-background">
                      <Lock className="h-2.5 w-2.5" />
                      Soon
                    </span>
                  )}

                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
                  </div>

                  {/* Icon + Title */}
                  <div className="relative flex items-start gap-3 mb-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${course.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className={`h-5 w-5 ${course.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-sm font-bold text-foreground line-clamp-1 transition-colors ${
                          isAvailable ? "group-hover:text-primary-text" : ""
                        }`}
                      >
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {course.category} · {course.level}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* Stats Row */}
                  <div className="relative flex items-center gap-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {course.hours}h
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {course.students >= 1000
                        ? `${Math.round(course.students / 1000)}k`
                        : course.students}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-foreground font-semibold ml-auto">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {course.rating}
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  {isAvailable && (
                    <div className="absolute top-5 right-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                      <ArrowRight className="h-3 w-3 text-primary-text" />
                    </div>
                  )}
                </CardWrapper>
              </div>
            )
          })}
        </div>

        {/* ─── CTA: View All ─── */}
        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary-text hover:scale-105"
          >
            View All {coursesData.length} Courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}