"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronDown,
  Clock,
  Filter,
  GraduationCap,
  Lock,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { coursesData, categories } from "@/lib/CourseData"

const categoryOptions = categories

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const activeFiltersCount = selectedCategory !== "all" ? 1 : 0

  const clearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14">
        {/* ═══ HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <Badge className="mb-4 px-3 py-1 text-[11px] font-semibold bg-primary/10 text-primary-text border border-primary/20 rounded-full inline-flex items-center gap-1.5">
            <GraduationCap className="h-3 w-3" />
            {coursesData.length} Advanced Courses
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            Master In-Demand <span className="text-gradient">Skills</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Industry-aligned programs designed to take you from beginner to
            job-ready professional.
          </p>
        </motion.div>

        {/* ═══ SEARCH BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 text-sm rounded-xl bg-card border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ═══ MOBILE FILTER TOGGLE ═══ */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters((v) => !v)}
            className="rounded-full px-4 h-9 text-xs font-semibold border-border hover:bg-primary/5 hover:border-primary/40"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            Categories
            {activeFiltersCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 ml-1.5 transition-transform duration-300 ${
                showMobileFilters ? "rotate-180" : ""
              }`}
            />
          </Button>
          {(activeFiltersCount > 0 || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* ═══ MOBILE FILTER PANEL ═══ */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden mb-6"
            >
              <div className="rounded-xl border border-border bg-card p-4">
                <FilterGroup
                  label="Category"
                  items={[
                    { id: "all", label: "All", count: coursesData.length },
                    ...categoryOptions,
                  ]}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ MAIN GRID (Sidebar + Cards) ═══ */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* ─── DESKTOP STICKY SIDEBAR ─── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Filter className="h-3 w-3" />
                    Categories
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-[10px] font-semibold text-primary-text hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "All Courses", count: coursesData.length },
                    ...categoryOptions,
                  ].map((cat) => (
                    <FilterSidebarItem
                      key={cat.id}
                      id={cat.id}
                      label={cat.label}
                      count={cat.count}
                      selected={selectedCategory}
                      onSelect={setSelectedCategory}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-4">
                <Sparkles className="h-5 w-5 text-primary-text mb-2" />
                <p className="text-xs font-bold text-foreground mb-1">
                  Need help choosing?
                </p>
                <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                  Talk to our advisors for a free career consultation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-text hover:gap-2 transition-all"
                >
                  Contact Us
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* ─── COURSES AREA ─── */}
          <div>
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <strong className="text-foreground">{filteredCourses.length}</strong>{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </p>
              {selectedCategory !== "all" && (
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  <FilterPill
                    label={
                      categoryOptions.find((c) => c.id === selectedCategory)
                        ?.label || selectedCategory
                    }
                    onRemove={() => setSelectedCategory("all")}
                  />
                </div>
              )}
            </div>

            {/* Cards Grid */}
            <AnimatePresence mode="popLayout">
              {filteredCourses.length > 0 ? (
                <motion.div layout className="grid sm:grid-cols-2 gap-4">
                  {filteredCourses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    No courses found
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-primary-text hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══ BOTTOM CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white p-8 sm:p-10"
        >
          <Award className="mx-auto mb-3 h-8 w-8 opacity-90" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Not sure which course to pick?
          </h2>
          <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
            Book a free consultation with our advisors. We'll help you choose
            the perfect path.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-6 py-2.5 text-sm rounded-xl font-semibold border-0"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

/* ═══════════════════════════════════════ */
/*          FILTER SIDEBAR ITEM            */
/* ═══════════════════════════════════════ */
function FilterSidebarItem({
  id,
  label,
  count,
  selected,
  onSelect,
}: {
  id: string
  label: string
  count?: number
  selected: string
  onSelect: (id: string) => void
}) {
  const isActive = selected === id
  return (
    <button
      onClick={() => onSelect(id)}
      className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
        isActive
          ? "bg-primary/10 text-primary-text"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && count > 0 && (
        <span
          className={`ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            isActive
              ? "bg-primary/20 text-primary-text"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

/* ═══════════════════════════════════════ */
/*           FILTER PILL (chips)           */
/* ═══════════════════════════════════════ */
function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary-text">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  )
}

/* ═══════════════════════════════════════ */
/*          MOBILE FILTER GROUP            */
/* ═══════════════════════════════════════ */
function FilterGroup({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string
  items: { id: string; label: string; count?: number }[]
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const isActive = selected === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {item.label}
              {item.count !== undefined && item.count > 0 && (
                <span className={`ml-1 opacity-70 ${isActive ? "text-white" : ""}`}>
                  ({item.count})
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════ */
/*              COURSE CARD                */
/* ═══════════════════════════════════════ */
function CourseCard({
  course,
  index,
}: {
  course: (typeof coursesData)[0]
  index: number
}) {
  const Icon = course.icon
  const isAvailable = course.isAvailable
  const CardWrapper = (isAvailable ? Link : "div") as any
  const cardProps = isAvailable ? { href: `/courses/${course.slug}` } : {}

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <CardWrapper
        {...cardProps}
        className={`group block h-full ${
          isAvailable ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 ${
            isAvailable
              ? "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              : "opacity-70"
          }`}
        >
          {/* Shimmer on hover */}
          {isAvailable && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
            </div>
          )}

          {/* Coming Soon Badge */}
          {!isAvailable && (
            <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-foreground/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-background">
              <Lock className="h-2.5 w-2.5" />
              Soon
            </span>
          )}

          {/* Icon + Title */}
          <div className="relative flex items-start gap-3 mb-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${course.bgColor} transition-transform duration-300 ${
                isAvailable ? "group-hover:scale-110 group-hover:rotate-3" : ""
              }`}
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
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                {course.category} · Advanced
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="relative text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
            {course.shortDesc}
          </p>

          {/* Meta pills */}
          <div className="relative flex flex-wrap gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {course.hours}h
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Users className="h-2.5 w-2.5" />
              {course.students >= 1000
                ? `${Math.round(course.students / 1000)}k`
                : course.students}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-500">
              <Star className="h-2.5 w-2.5 fill-current" />
              {course.rating}
            </span>
          </div>

          {/* Footer: Price + Arrow */}
          <div className="relative mt-auto flex items-center justify-between border-t border-border pt-3">
            <div className="min-w-0">
              {isAvailable ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-foreground">
                    Rs. {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      Rs. {course.originalPrice}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[11px] font-medium text-muted-foreground italic">
                  Coming soon
                </span>
              )}
            </div>

            {isAvailable ? (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-text transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground/60">
                <Lock className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  )
}