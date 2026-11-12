import Link from "next/link"
import { ArrowRight, MessageSquare, Play, Star } from "lucide-react"

// 3 Video Reviews (YouTube IDs yahan dalein)
const videoReviews = [
  {
    id: "1",
    title: "Ali's AI Journey",
    // Yahan aap YouTube ka thumbnail URL ya video ID daal sakte hain
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    youtubeUrl: "#", // Replace with real YouTube video URL
  },
  {
    id: "2",
    title: "SMM Success Story",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop",
    youtubeUrl: "#",
  },
  {
    id: "3",
    title: "Crypto Trading Results",
    thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop",
    youtubeUrl: "#",
  },
]

// 4 Screenshot Reviews (Real screenshots ke placeholder URLs)
const screenshotReviews = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    label: "AI Batch 18",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    label: "SMM Batch 17",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    label: "Crypto Batch 18",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    label: "AI Batch 17",
  },
]

export function ReviewsPreview() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-600 dark:text-yellow-500 mb-4">
            <Star className="h-3.5 w-3.5 fill-current" />
            100% Real Student Feedback
          </div>
          <h2 className="heading-section text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-lead mx-auto mt-4 text-center">
            Don't just take our word for it. Hear directly from our students who have transformed their careers with HDS.
          </p>
        </div>

        {/* ─── Video Reviews ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {videoReviews.map((video) => (
            <Link 
              key={video.id} 
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/60 transition-colors" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold text-white truncate drop-shadow-md">
                  {video.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Screenshot Reviews Wall ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {screenshotReviews.map((review) => (
            <div 
              key={review.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <img 
                src={review.image} 
                alt="Student Review Screenshot" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay with Label */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white border border-white/20">
                  <MessageSquare className="h-3 w-3" />
                  {review.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="flex justify-center">
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:bg-muted hover:border-primary/40 group"
          >
            Read All Reviews
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}