import Link from "next/link"
import { ArrowRight, MessageSquare, Play, Star } from "lucide-react"
import { videoReviews, screenshotReviews } from "@/data/reviews"

export function ReviewsPreview() {
  // Show first 3 videos + first 8 screenshots for the preview
  const videosPreview = videoReviews.slice(0, 3)
  const screenshotsPreview = screenshotReviews.slice(0, 8)

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-600 dark:text-yellow-500 mb-4">
            <Star className="h-3.5 w-3.5 fill-current" />
            100% Real Student Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-sm text-muted-foreground mx-auto mt-3 max-w-lg">
            Don't just take our word for it. Hear directly from our students
            who have transformed their careers with HDS.
          </p>
        </div>

        {/* ─── Video Reviews (3 cards) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {videosPreview.map((video, i) => (
            <Link
              key={video.id}
              href="/reviews"
              className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent transition-colors" />

              {/* Mentorship Badge (top right) */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {video.mentorship}
                </span>
              </div>

              {/* Play Button with pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-bold text-white truncate drop-shadow-md">
                  {video.title}
                </p>
                <p className="text-[11px] text-white/70 mt-0.5">
                  — {video.studentName}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Screenshot Wall (8 real images) ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {screenshotsPreview.map((review, i) => (
            <Link
              key={review.id}
              href="/reviews"
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <img
                src={review.image}
                alt={`${review.mentorship} student review`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Always-visible small badge */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/75 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white border border-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  {review.mentorship}
                </span>
              </div>

              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white border border-white/20">
                  <MessageSquare className="h-2.5 w-2.5" />
                  {review.mentorship} · {review.batch}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="flex justify-center">
          <Link
            href="/reviews"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all duration-300 hover:bg-primary/5 hover:border-primary/40 hover:text-primary-text hover:scale-105"
          >
            Read All Reviews
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}