import { notFound } from "next/navigation"
import { getMentorshipBySlug, mentorships } from "@/data/mentorship"
import { MentorshipDetailHero } from "@/components/mentorships/mentorship-detail-hero"
import { MentorshipInfoBox } from "@/components/mentorships/mentor-info-box"
import { MentorshipAudience } from "@/components/mentorships/mentorship-audience"
import { MentorshipModules } from "@/components/mentorships/mentorship-modules"
import { MentorshipPriceCTA } from "@/components/mentorships/mentorship-price-cta"
import { MentorshipFAQ } from "@/components/mentorships/mentorship-faq"
import { TrainingFeatures } from "@/components/Home/training-features"
import { FinalCTA } from "@/components/Home/final-cta"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mentorships.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const mentorship = getMentorshipBySlug(slug)

  if (!mentorship) return { title: "Mentorship Not Found" }

  return {
    title: `${mentorship.name} | Hassan Digital Skills`,
    description: mentorship.tagline,
  }
}

export default async function MentorshipDetailPage({ params }: Props) {
  const { slug } = await params
  const mentorship = getMentorshipBySlug(slug)

  if (!mentorship) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MentorshipDetailHero mentorship={mentorship} />
      <MentorshipInfoBox mentorship={mentorship} />
      <MentorshipAudience mentorship={mentorship} />
      <MentorshipModules mentorship={mentorship} />
      <TrainingFeatures />
      <MentorshipPriceCTA mentorship={mentorship} />
      <MentorshipFAQ mentorship={mentorship} />
      <FinalCTA />
    </div>
  )
}