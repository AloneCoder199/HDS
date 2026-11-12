import { ReviewsHero } from "@/components/reviews/reviews-hero"
import { VideoReviews } from "@/components/reviews/video-reviews"
import { ScreenshotGallery } from "@/components/reviews/screenshot-gallery"
import { FinalCTA } from "@/components/Home/final-cta"

export const metadata = {
  title: "Student Reviews | Hassan Digital Skills",
  description:
    "Real reviews from 15,000+ HDS students. Watch video testimonials and browse WhatsApp screenshots.",
}

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ReviewsHero />
      <VideoReviews />
      <ScreenshotGallery />
      <FinalCTA />
    </div>
  )
}