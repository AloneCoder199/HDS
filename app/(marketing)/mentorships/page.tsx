import { MentorshipsHero } from "@/components/mentorships/mentorships-hero"
import { MentorshipCards } from "@/components/mentorships/mentorship-cards"
import { BatchInfoBlock } from "@/components/mentorships/batch-info-block"
import { TrainingFeatures } from "@/components/Home/training-features"
import { FinalCTA } from "@/components/Home/final-cta"

export const metadata = {
  title: "Mentorships | Hassan Digital Skills",
  description:
    "Explore our 3 top-demand mentorships: AI, Social Media Marketing, and Crypto Trading. Scholarship seats for just Rs. 200.",
}

export default function MentorshipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MentorshipsHero />
      <MentorshipCards />
      <BatchInfoBlock />
      <TrainingFeatures />
      <FinalCTA />
    </div>
  )
}