import { AnnouncementPopup } from "@/components/Home/announcement-popup"
import { BatchOffer } from "@/components/Home/batch-offer"
import { CertificatePreview } from "@/components/Home/certificate-preview"
import { CoursesSection } from "@/components/Home/courses-section"
import { FAQSection } from "@/components/Home/faq-section"
import { FinalCTA } from "@/components/Home/final-cta"
import { FounderVision } from "@/components/Home/founder-vision"
import { Hero } from "@/components/Home/Homehero"
import { ReviewsPreview } from "@/components/Home/reviews-preview"
import { StatsBar } from "@/components/Home/stats-bar"
import { StudentJourney } from "@/components/Home/student-journey"
import { TrainingFeatures } from "@/components/Home/training-features"

export default function Page() {
  return (
    <>
      {/* ✅ Announcement popup — site open hote hi show hoga */}
      <AnnouncementPopup />

      <Hero />
      <StatsBar />
      <BatchOffer />
      <CoursesSection />
      <TrainingFeatures />
      <StudentJourney />
      <CertificatePreview />
      <ReviewsPreview />
      <FounderVision />
      <FAQSection />
      <FinalCTA />
    </>
  )
}