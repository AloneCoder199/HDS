import  AboutHero  from "@/components/aboutpage/AboutHero";
import { CurriculumBreakdown } from "@/components/aboutpage/CurriculumBreakdown";
import { TheDifference } from "@/components/aboutpage/diffrence";
import { MissionVision } from "@/components/aboutpage/MissionVision";
import { StoryTimeline } from "@/components/aboutpage/StoryTimeline";
// import {PlatformStats} from "@/components/aboutpage/PlatformStats"

export default function about(){
    return(
        <>
       <AboutHero/>
       <MissionVision/>
       {/* <PlatformStats/> */}
       <StoryTimeline/>
       <CurriculumBreakdown/>
       <TheDifference/>
        </>
    )
}