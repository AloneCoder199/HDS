import CallToAction from "@/components/Home/CallToAction"
import FeaturedCourses from "@/components/Home/HomefeaturedCourses"
import Hero from "@/components/Home/Homehero"
import LearningProcess from "@/components/Home/LearningProcess"
import Testimonials from "@/components/Home/Testimonials"
import WhyLearnFromHDS from "@/components/Home/WhyLearnFromHDS"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
    <Hero/>
    <FeaturedCourses/>
    <WhyLearnFromHDS/>
    <LearningProcess/>
    <Testimonials/>
    <CallToAction/>
    </>
  )
}