"use client"

import { useState } from "react"
import { Play, Sparkles, X } from "lucide-react"
import { videoReviews } from "@/data/reviews"

export function VideoReviews() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  // First video = featured (large), rest = small
  const [featured, ...rest] = videoReviews

  return (
    <section className="py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Animated Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] animate-pulse duration-[8000ms]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-3">
            <Sparkles className="h-3 w-3" />
            Real Student Testimonials
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Video <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Watch real students share their journey with HDS.
          </p>
        </div>

        {/* ─── Bento Grid Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-5">

          {/* ═══ FEATURED VIDEO (Large — Left side, spans 2 cols & 2 rows) ═══ */}
          <div className="lg:col-span-2 lg:row-span-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <VideoCard
              video={featured}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              isFeatured
            />
          </div>

          {/* ═══ Rest of Videos (Smaller) ═══ */}
          {rest.map((video, i) => (
            <div
              key={video.id}
              className="lg:col-span-1 lg:row-span-1 animate-in fade-in slide-in-from-bottom-6"
              style={{
                animationDelay: `${100 + i * 80}ms`,
                animationDuration: "600ms",
              }}
            >
              <VideoCard
                video={video}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reusable Video Card Component ───
function VideoCard({
  video,
  activeVideo,
  setActiveVideo,
  isFeatured = false,
}: {
  video: (typeof import("@/data/reviews").videoReviews)[number]
  activeVideo: string | null
  setActiveVideo: (id: string | null) => void
  isFeatured?: boolean
}) {
  const isPlaying = activeVideo === video.id

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 ${
        isFeatured ? "aspect-video h-full min-h-[280px]" : "aspect-video"
      }`}
    >
      {isPlaying ? (
        // ═══ Playing State ═══
        <>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full animate-in fade-in duration-500"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 hover:rotate-90"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        // ═══ Thumbnail State ═══
        <>
          {/* Thumbnail Image with zoom */}
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

          {/* Shimmer Sweep Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3 z-10 animate-in fade-in slide-in-from-top-2 duration-700 delay-300">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-lg">
                <Sparkles className="h-3 w-3 animate-pulse" />
                FEATURED
              </span>
            </div>
          )}

          {/* Mentorship Badge (Top Right for non-featured) */}
          {!isFeatured && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                {video.mentorship}
              </span>
            </div>
          )}

          {/* Play Button with Pulse Ring */}
          <button
            onClick={() => setActiveVideo(video.id)}
            className="absolute inset-0 flex items-center justify-center z-10"
            aria-label={`Play ${video.title}`}
          >
            <div className="relative">
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
              
              {/* Play button */}
              <div
                className={`relative flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary ${
                  isFeatured ? "h-20 w-20" : "h-14 w-14"
                }`}
              >
                <Play
                  className={`text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-110 ${
                    isFeatured ? "h-8 w-8" : "h-6 w-6"
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4">
            {/* Featured: Mentorship badge inline */}
            {isFeatured && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {video.mentorship}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white border border-white/20">
                  <Play className="h-2.5 w-2.5 fill-current" />
                  Watch Now
                </span>
              </div>
            )}

            <p
              className={`font-bold text-white leading-tight drop-shadow-md line-clamp-2 transition-all duration-300 ${
                isFeatured ? "text-base sm:text-lg" : "text-xs sm:text-sm"
              }`}
            >
              {video.title}
            </p>
            <p
              className={`text-white/75 mt-0.5 font-medium ${
                isFeatured ? "text-xs sm:text-sm" : "text-[10px] sm:text-[11px]"
              }`}
            >
              — {video.studentName}
            </p>
          </div>
        </>
      )}
    </div>
  )
}