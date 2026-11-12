import { HowItWorksHero } from "@/components/how-it-works/how-it-works-hero"
import { ThreeSteps } from "@/components/how-it-works/three-steps"
import { JourneyTimeline } from "@/components/how-it-works/journey-timeline"
import { FinalCTA } from "@/components/Home/final-cta"

export const metadata = {
  title: "How It Works | Hassan Digital Skills",
  description:
    "Learn how HDS mentorship works: 3 clear phases (Learn, Practice, Build) that take you from beginner to earning real opportunities.",
}

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HowItWorksHero />
      <ThreeSteps />
      <JourneyTimeline />
      <FinalCTA />
    </div>
  )
}