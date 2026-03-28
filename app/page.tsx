import CallToAction from "@/components/Home/CallToAction"
import HDSWelcomePopup from "@/components/Home/HDSWelcomePopup"
import FeaturedCourses from "@/components/Home/HomefeaturedCourses"
import Hero from "@/components/Home/Homehero"
import ImpactSection from "@/components/Home/ImpactSection"
import LearningProcess from "@/components/Home/LearningProcess"
import LimitedSeatsSection from "@/components/Home/LimitedSeatsSection"
import ReviewsSection from "@/components/Home/Testimonials"
import WhyLearnFromHDS from "@/components/Home/WhyLearnFromHDS"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
    <HDSWelcomePopup/>
    <Hero/>
    <ImpactSection/>
    <FeaturedCourses/>
    <WhyLearnFromHDS/>
    <LimitedSeatsSection/>
    <LearningProcess/>
    <ReviewsSection/>
    <CallToAction/>
    </>
  )
}