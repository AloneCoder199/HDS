"use client"

import { useRef, useState, useCallback } from "react"
import { Loader2, Play, Sparkles, X } from "lucide-react"
import { videoReviews } from "@/data/reviews"

export function VideoReviews() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [featured, ...rest] = videoReviews

  const handlePlay = useCallback((id: string) => {
    setActiveVideo(id)
  }, [])

  const handleClose = useCallback(() => {
    setActiveVideo(null)
  }, [])

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
            Hover to preview · Click to play with sound
          </p>
        </div>

        {/* ─── Bento Grid Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-5">
          {/* ═══ FEATURED (Large) ═══ */}
          <div className="lg:col-span-2 lg:row-span-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <VideoCard
              video={featured}
              activeVideo={activeVideo}
              onPlay={handlePlay}
              onClose={handleClose}
              isFeatured
            />
          </div>

          {/* ═══ Rest (Small) ═══ */}
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
                onPlay={handlePlay}
                onClose={handleClose}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-6">
          Hover over any video to preview · Click to play with full controls
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// VideoCard — Real video thumbnails + hover preview + fast preload
// ═══════════════════════════════════════════════════════════════════════
function VideoCard({
  video,
  activeVideo,
  onPlay,
  onClose,
  isFeatured = false,
}: {
  video: (typeof videoReviews)[number]
  activeVideo: string | null
  onPlay: (id: string) => void
  onClose: () => void
  isFeatured?: boolean
}) {
  const previewRef = useRef<HTMLVideoElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const isPlaying = activeVideo === video.id

  // ─── Hover handlers ───
  const handleMouseEnter = () => {
    if (isPlaying) return
    setIsHovering(true)
    const vid = previewRef.current
    if (vid && isLoaded) {
      vid.currentTime = 0
      vid.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    const vid = previewRef.current
    if (vid) {
      vid.pause()
      try {
        vid.currentTime = 0.5 // back to good thumbnail frame
      } catch {}
    }
  }

  // ─── On metadata load → seek to a good first frame ───
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget
    try {
      // Seek to 0.5s — skips black intro frame
      vid.currentTime = 0.5
    } catch {}
    setIsLoaded(true)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 ${
        isFeatured ? "aspect-video h-full min-h-[280px]" : "aspect-video"
      }`}
    >
      {isPlaying ? (
        // ═══ Full Player (with sound + controls) ═══
        <>
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full bg-black object-contain animate-in fade-in duration-300"
          >
            Your browser does not support the video tag.
          </video>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 hover:rotate-90"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        // ═══ Preview (thumbnail + hover autoplay) ═══
        <>
          {/* Fallback poster — loads instantly while video metadata loads */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isLoaded && !hasError ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Real video thumbnail — first frame, loads via preload="metadata" */}
          {!hasError && (
            <video
              ref={previewRef}
              src={video.videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onError={() => setHasError(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } ${isHovering ? "scale-105" : "scale-100"}`}
            />
          )}

          {/* Loading spinner while metadata loads */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Loader2 className="h-6 w-6 text-white/70 animate-spin" />
            </div>
          )}

          {/* Dark overlay — lighter on hover to reveal preview */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 transition-opacity duration-500 pointer-events-none ${
              isHovering ? "opacity-50" : "opacity-100"
            }`}
          />

          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms]" />
          </div>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-lg">
                <Sparkles className="h-3 w-3 animate-pulse" />
                FEATURED
              </span>
            </div>
          )}

          {/* Mentorship badge (non-featured) */}
          {!isFeatured && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                {video.mentorship}
              </span>
            </div>
          )}

          {/* Play button — shrinks when hovering (preview is playing) */}
          <button
            onClick={() => onPlay(video.id)}
            className="absolute inset-0 flex items-center justify-center z-10"
            aria-label={`Play ${video.title} with sound`}
          >
            <div
              className={`relative transition-all duration-500 ${
                isHovering ? "scale-75 opacity-70" : "scale-100 opacity-100"
              }`}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />

              {/* Play circle */}
              <div
                className={`relative flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 transition-all duration-500 group-hover:bg-primary group-hover:border-primary ${
                  isFeatured ? "h-20 w-20" : "h-14 w-14"
                }`}
              >
                <Play
                  className={`text-white fill-white ml-1 ${
                    isFeatured ? "h-8 w-8" : "h-6 w-6"
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4 pointer-events-none">
            {isFeatured && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {video.mentorship}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white border border-white/20">
                  {isHovering ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Preview Playing
                    </>
                  ) : (
                    <>
                      <Play className="h-2.5 w-2.5 fill-current" />
                      Hover to Preview
                    </>
                  )}
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