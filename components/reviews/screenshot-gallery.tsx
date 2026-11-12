"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
  X,
  ImageIcon,
} from "lucide-react"
import { screenshotReviews } from "@/data/reviews"

const filters = ["All", "AI", "SMM", "Crypto"] as const
type Filter = (typeof filters)[number]

export function ScreenshotGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [filterKey, setFilterKey] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const filtered =
    activeFilter === "All"
      ? screenshotReviews
      : screenshotReviews.filter((r) => r.mentorship === activeFilter)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length))
  }, [filtered.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length
    )
  }, [filtered.length])

  const handleFilterChange = (f: Filter) => {
    setActiveFilter(f)
    setFilterKey((k) => k + 1) // triggers re-animation
  }

  // ─── Keyboard + scroll lock ───
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, nextImage, prevImage])

  // ─── Swipe handlers (mobile) ───
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (diff > minSwipe) nextImage()
    else if (diff < -minSwipe) prevImage()
    touchStartX.current = null
    touchEndX.current = null
  }

  const activeReview = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <>
      <section className="py-16 lg:py-20 bg-muted/20 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse duration-[7000ms]" />
          <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-3">
              <ImageIcon className="h-3 w-3" />
              Real WhatsApp Screenshots
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              What Students <span className="text-gradient">Are Saying</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Real conversations, real results. Tap any screenshot to view it larger.
            </p>
          </div>

          {/* ─── Filter Tabs ─── */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {filters.map((f) => {
              const isActive = activeFilter === f
              const count =
                f === "All"
                  ? screenshotReviews.length
                  : screenshotReviews.filter((r) => r.mentorship === f).length
              return (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-primary text-white shadow-glow scale-105"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:scale-105"
                  }`}
                >
                  {/* Shimmer on active */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && <Sparkles className="h-3.5 w-3.5 animate-pulse" />}
                    {f === "All" ? "All Reviews" : f}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                        isActive
                          ? "bg-white/25"
                          : "bg-muted group-hover:bg-primary/10 group-hover:text-primary-text"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* ─── Masonry Grid ─── */}
          <div
            key={filterKey}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:break-inside-avoid [&>*]:mb-3 sm:[&>*]:mb-4"
          >
            {filtered.map((review, i) => (
              <button
                key={review.id}
                onClick={() => openLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-6"
                style={{
                  animationDelay: `${i * 50}ms`,
                  animationDuration: "600ms",
                }}
              >
                {/* Image with zoom */}
                <img
                  src={review.image}
                  alt={`${review.mentorship} review`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
                </div>

                {/* Hover overlay with label */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white border border-white/20">
                    <MessageSquare className="h-2.5 w-2.5" />
                    {review.mentorship} · {review.batch}
                  </span>
                </div>

                {/* Always-visible badge */}
                <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 transition-transform duration-300 group-hover:scale-110">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/75 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    {review.mentorship}
                  </span>
                </div>

                {/* Zoom icon on hover (top right) */}
                <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* ─── Empty State ─── */}
          {filtered.length === 0 && (
            <div className="text-center py-16 animate-in fade-in duration-500">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                No reviews yet
              </p>
              <p className="text-xs text-muted-foreground">
                Reviews for this category will appear soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ LIGHTBOX MODAL ═══════════════ */}
      {activeReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white border border-white/10 animate-in fade-in slide-in-from-top-2 duration-500">
            <ImageIcon className="h-3 w-3" />
            {lightboxIndex! + 1} / {filtered.length}
          </div>

          {/* Prev button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image Container */}
          <div
            key={lightboxIndex}
            className="relative max-h-[85vh] max-w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeReview.image}
              alt={`${activeReview.mentorship} review`}
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            />

            {/* Bottom Label */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/20 shadow-lg">
                <MessageSquare className="h-3 w-3" />
                {activeReview.mentorship} · {activeReview.batch}
              </span>
            </div>
          </div>

          {/* Swipe hint (mobile only, bottom) */}
          {filtered.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-[10px] text-white/50 font-medium sm:hidden">
              <ChevronLeft className="h-3 w-3" />
              Swipe to navigate
              <ChevronRight className="h-3 w-3" />
            </div>
          )}
        </div>
      )}

      {/* Shimmer keyframe animation (global) */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  )
}