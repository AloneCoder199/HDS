// data/reviews.ts

export type VideoReview = {
  id: string
  title: string
  studentName: string
  mentorship: "AI" | "SMM" | "Crypto"
  youtubeId: string // ⚠️ Replace with real video IDs
  thumbnail: string // ⚠️ Replace with real thumbnails
}

export type ScreenshotReview = {
  id: string
  image: string // ⚠️ Replace with real screenshot paths
  mentorship: "AI" | "SMM" | "Crypto"
  batch: string
  aspect?: "portrait" | "square" // for masonry variety
}

// ─── 6 VIDEO REVIEWS (Brief ke mutabiq) ───
export const videoReviews: VideoReview[] = [
  {
    id: "v1",
    title: "How I started freelancing with AI",
    studentName: "Ahmed Khan",
    mentorship: "AI",
    youtubeId: "dQw4w9WgXcQ", // ⚠️ Replace
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "v2",
    title: "Meta Ads ne meri business badal di",
    studentName: "Fatima Sheikh",
    mentorship: "SMM",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "v3",
    title: "From beginner to profitable trader",
    studentName: "Bilal Hussain",
    mentorship: "Crypto",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "v4",
    title: "AI automation ne mera time bacha liya",
    studentName: "Sara Malik",
    mentorship: "AI",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "v5",
    title: "First client mila Rs. 40,000 ka",
    studentName: "Usman Ali",
    mentorship: "SMM",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "v6",
    title: "Risk management kaise seekhi",
    studentName: "Hassan Raza",
    mentorship: "Crypto",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
  },
]

// ─── 24 SCREENSHOT REVIEWS (20–30 ke darmiyan) ───
export const screenshotReviews: ScreenshotReview[] = [
  { id: "s1", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 18", aspect: "portrait" },
  { id: "s2", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 17", aspect: "square" },
  { id: "s3", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 18", aspect: "portrait" },
  { id: "s4", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 17", aspect: "square" },
  { id: "s5", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 18", aspect: "portrait" },
  { id: "s6", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 18", aspect: "square" },
  { id: "s7", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 17", aspect: "portrait" },
  { id: "s8", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 16", aspect: "square" },
  { id: "s9", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 18", aspect: "portrait" },
  { id: "s10", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 18", aspect: "square" },
  { id: "s11", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 17", aspect: "portrait" },
  { id: "s12", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 17", aspect: "square" },
  { id: "s13", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 18", aspect: "portrait" },
  { id: "s14", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 17", aspect: "square" },
  { id: "s15", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 18", aspect: "portrait" },
  { id: "s16", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 16", aspect: "square" },
  { id: "s17", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 18", aspect: "portrait" },
  { id: "s18", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 17", aspect: "square" },
  { id: "s19", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 18", aspect: "portrait" },
  { id: "s20", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 17", aspect: "square" },
  { id: "s21", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 17", aspect: "portrait" },
  { id: "s22", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "SMM", batch: "Batch 18", aspect: "square" },
  { id: "s23", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "Crypto", batch: "Batch 18", aspect: "portrait" },
  { id: "s24", image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop", mentorship: "AI", batch: "Batch 16", aspect: "square" },
]