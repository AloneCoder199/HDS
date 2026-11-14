// data/reviews.ts

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════
export type VideoReview = {
  id: string
  title: string
  studentName: string
  mentorship: "AI" | "SMM" | "Crypto"
  videoUrl: string     // local .mp4 file
  thumbnail: string    // poster image
}

export type ScreenshotReview = {
  id: string
  image: string
  mentorship: "AI" | "SMM" | "Crypto"
  batch: string
}

// ═══════════════════════════════════════════════════════════════════
// 4 VIDEO REVIEWS — Real MP4 files from /public/Video Feedback/
// Thumbnails use /public/st1-4.jpg (student photos)
// ═══════════════════════════════════════════════════════════════════
export const videoReviews: VideoReview[] = [
  {
    id: "v1",
    title: "How I started freelancing with AI",
    studentName: "HDS Student",
    mentorship: "AI",
    videoUrl: "/Video Feedback/WhatsApp Video 2025-08-13 at 02.51.55_8e9aef3e.mp4",
    thumbnail: "/st1.jpg",
  },
  {
    id: "v2",
    title: "Meta Ads transformed my business",
    studentName: "HDS Student",
    mentorship: "SMM",
    videoUrl: "/Video Feedback/WhatsApp Video 2026-03-14 at 5.51.46 PM.mp4",
    thumbnail: "/st2.jpg",
  },
  {
    id: "v3",
    title: "From beginner to disciplined trader",
    studentName: "HDS Student",
    mentorship: "Crypto",
    videoUrl: "/Video Feedback/WhatsApp Video 2026-04-23 at 5.53.36 PM.mp4",
    thumbnail: "/st3.jpg",
  },
  {
    id: "v4",
    title: "AI automation saved me hours",
    studentName: "HDS Student",
    mentorship: "AI",
    videoUrl: "/Video Feedback/WhatsApp Video 2026-07-15 at 5.18.35 PM.mp4",
    thumbnail: "/st4.jpg",
  },
]

// ═══════════════════════════════════════════════════════════════════
// 30 SCREENSHOT REVIEWS — Real images from /public/reviews/
// Distributed: 10 AI · 10 SMM · 10 Crypto
// ═══════════════════════════════════════════════════════════════════
const aiImages: ScreenshotReview[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (n) => ({
    id: `s-ai-${n}`,
    image: `/reviews/review (${n}).jpeg`,
    mentorship: "AI",
    batch: "Batch 18",
  })
)

const smmImages: ScreenshotReview[] = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
  (n) => ({
    id: `s-smm-${n}`,
    image: `/reviews/review (${n}).jpeg`,
    mentorship: "SMM",
    batch: "Batch 17",
  })
)

const cryptoImages: ScreenshotReview[] = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(
  (n) => ({
    id: `s-crypto-${n}`,
    image: `/reviews/review (${n}).jpeg`,
    mentorship: "Crypto",
    batch: "Batch 18",
  })
)

export const screenshotReviews: ScreenshotReview[] = [
  ...aiImages,
  ...smmImages,
  ...cryptoImages,
]