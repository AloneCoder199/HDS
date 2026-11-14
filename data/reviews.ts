// data/reviews.ts

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════
export type VideoReview = {
  id: string
  title: string
  studentName: string
  mentorship: "AI" | "SMM" | "Crypto"
  videoUrl: string
  thumbnail: string
}

export type ScreenshotReview = {
  id: string
  image: string
  mentorship: "AI" | "SMM" | "Crypto"
  batch: string
}

// ═══════════════════════════════════════════════════════════════════
// PATH HELPER — Encodes spaces, parens, brackets for URL safety
// Example: "WhatsApp Image at 11.52.25 AM (1).jpeg"
//       → "WhatsApp%20Image%20at%2011.52.25%20AM%20(1).jpeg"
// ═══════════════════════════════════════════════════════════════════
const reviewImg = (file: string) =>
  encodeURI(`/HDS Student Reviews/${file}`)

// ═══════════════════════════════════════════════════════════════════
// 4 VIDEO REVIEWS — Real MP4 from /public/Video Feedback/
// Thumbnails from /public/st1-4.jpg
// ═══════════════════════════════════════════════════════════════════
export const videoReviews: VideoReview[] = [
  {
    id: "v1",
    title: "How I started freelancing with AI",
    studentName: "HDS Student",
    mentorship: "AI",
    videoUrl:
      "/Video Feedback/WhatsApp Video 2025-08-13 at 02.51.55_8e9aef3e.mp4",
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
// SCREENSHOT FILES — 32 real images from /public/HDS Student Reviews/
// ═══════════════════════════════════════════════════════════════════

// ─── AI (10) — 11:52:25 → 11:52:36 (1) ───
const aiReviewFiles = [
  "WhatsApp Image 2026-11-14 at 11.52.25 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.27 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.27 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.27 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.28 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.34 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.34 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.35 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.35 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.36 AM (1).jpeg",
]

// ─── SMM (11) — 11:52:36 (2) → 11:52:40 (1) ───
const smmReviewFiles = [
  "WhatsApp Image 2026-11-14 at 11.52.36 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.36 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.37 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.37 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.37 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.38 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.38 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.39 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.39 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.39 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.40 AM (1).jpeg",
]

// ─── Crypto (11) — 11:52:40 (2) → 11:52:44 ───
const cryptoReviewFiles = [
  "WhatsApp Image 2026-11-14 at 11.52.40 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.40 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.41 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.41 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.42 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.42 AM (2).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.42 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.43 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.43 AM.jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.44 AM (1).jpeg",
  "WhatsApp Image 2026-11-14 at 11.52.44 AM.jpeg",
]

// ═══════════════════════════════════════════════════════════════════
// FINAL EXPORT — 32 screenshots
// ═══════════════════════════════════════════════════════════════════
export const screenshotReviews: ScreenshotReview[] = [
  ...aiReviewFiles.map((file, i) => ({
    id: `s-ai-${i + 1}`,
    image: reviewImg(file),
    mentorship: "AI" as const,
    batch: "Batch 18",
  })),
  ...smmReviewFiles.map((file, i) => ({
    id: `s-smm-${i + 1}`,
    image: reviewImg(file),
    mentorship: "SMM" as const,
    batch: "Batch 17",
  })),
  ...cryptoReviewFiles.map((file, i) => ({
    id: `s-crypto-${i + 1}`,
    image: reviewImg(file),
    mentorship: "Crypto" as const,
    batch: "Batch 18",
  })),
]