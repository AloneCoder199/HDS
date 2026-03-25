"use client"

import React, { useRef , useState , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  Clock, 
  Users, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { coursesData, Course } from '@/lib/CourseData';

// ✅ FIXED: Filter only available courses
const availableCourses = coursesData.filter(course => course.isAvailable);

// ✅ FIXED: Get some unavailable courses for "Coming Soon" section
const comingSoonCourses = coursesData.filter(course => !course.isAvailable).slice(0, 3);

const levelStyles = {
  Beginner: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  Intermediate: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  Advanced: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
  'All Levels': 'bg-[#3495EB]/10 text-[#3495EB] border-[#3495EB]/20'
};

export default function FeaturedCourses() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
 const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// Return mein check karein
if (!isMounted) return null;
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newPosition = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-24 bg-[#F9FAFB] dark:bg-[#0B1220] overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3495EB]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3495EB]/10 border border-[#3495EB]/20 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#3495EB]" />
              <span className="text-xs font-semibold text-[#3495EB] uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white mb-3 tracking-tight">
              Explore Our Courses
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF]">
              Master in-demand skills with expert-led courses designed for real-world success.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] flex items-center justify-center text-[#6B7280] hover:text-[#3495EB] hover:border-[#3495EB]/50 transition-all"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] flex items-center justify-center text-[#6B7280] hover:text-[#3495EB] hover:border-[#3495EB]/50 transition-all"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ✅ FIXED: Only Available Courses */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {availableCourses.map((course, index) => (
            <Card 
              key={course.id}
              className={cn(
                "flex-shrink-0 w-[340px] snap-start",
                "bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]",
                "hover:shadow-xl hover:shadow-[#3495EB]/5 transition-all duration-300",
                "group cursor-pointer overflow-hidden"
              )}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  
                  {/* Dynamic Gradient Background */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br", course.gradient)} />
                  
                  {/* Course Icon */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-white/90 dark:bg-[#0B1220]/90",
                      levelStyles[course.level]
                    )}>
                      {course.level}
                    </span>
                  </div>

                  {/* Category & Duration */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-white/20 text-white border-0 text-xs backdrop-blur-sm"
                    >
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-white/90">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Rating & Students */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-sm font-semibold text-[#111827] dark:text-white">{course.rating}</span>
                      <span className="text-xs text-[#9CA3AF]">({course.students.toLocaleString()}+)</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[#111827] dark:text-white text-lg leading-tight group-hover:text-[#3495EB] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2">
                    {course.shortDesc}
                  </p>

                  {/* Features Preview */}
                  <div className="flex flex-wrap gap-2">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Instructor Avatars */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {course.instructors.slice(0, 2).map((instructor, idx) => (
                          <div 
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111827] bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] flex items-center justify-center text-xs font-bold text-white"
                          >
                            {instructor.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-[#9CA3AF]">
                        {course.instructors.length} instructors
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-right flex flex-col items-end justify-center">
  <div className="flex items-baseline gap-1.5">
    {/* Main Price */}
    <span className="text-xl font-extrabold text-[#111827] dark:text-white tracking-tight">
      {course.price}
    </span>
    
    {/* Original Price (Line-through) */}
    {course.originalPrice && (
      <span className="text-sm text-gray-400 dark:text-gray-500 line-through decoration-gray-400/50">
        {course.originalPrice}
      </span>
    )}
  </div>
  
  {/* Optional: Agar koi "Save %" badge dikhana ho toh yahan add kar sakte hain */}
</div>

                  </div>

                  {/* Enroll Button */}
                  <Link 
                    href={`/courses/${course.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#F9FAFB] dark:bg-[#0B1220] hover:bg-[#3495EB] hover:text-white text-[#3495EB] dark:text-[#3495EB] hover:dark:text-white font-medium text-sm transition-all duration-300 group/btn"
                  >
                    <span>View Course</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* ✅ ADDED: Coming Soon Cards for Unavailable Courses */}
          {comingSoonCourses.length > 0 && comingSoonCourses.map((course, index) => (
            <Card 
              key={`coming-soon-${course.id}`}
              className="flex-shrink-0 w-[340px] snap-start bg-[#F9FAFB]/50 dark:bg-[#111827]/50 border-[#E5E7EB]/50 dark:border-[#1F2937]/50 opacity-75"
            >
              <CardContent className="p-0">
                <div className="relative h-44 overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", course.gradient)} />
                  
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-[#111827]/80 text-white border-0 backdrop-blur-sm">
                      <Lock className="w-3 h-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <course.icon className="w-8 h-8 text-white/60" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="font-bold text-[#111827]/60 dark:text-white/60 text-lg line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#6B7280]/60 dark:text-[#9CA3AF]/60 line-clamp-2">
                    {course.shortDesc}
                  </p>
                  
                  <div className="pt-3 border-t border-[#E5E7EB]/50 dark:border-[#1F2937]/50">
                    <Button 
                      disabled
                      className="w-full bg-[#E5E7EB] dark:bg-[#1F2937] text-[#111827]/40 dark:text-white/40 cursor-not-allowed"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* View All Card */}
          <Card className="flex-shrink-0 w-[340px] snap-start bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] border-0">
            <CardContent className="p-0 h-full flex flex-col items-center justify-center text-center p-8 text-white min-h-[480px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">View All Courses</h3>
              <p className="text-white/80 text-sm mb-6">
                Explore our complete catalog of {coursesData.length}+ expert-led courses
              </p>
              <Button 
                asChild
                variant="secondary" 
                className="bg-white text-[#3495EB] hover:bg-white/90 rounded-full font-semibold"
              >
                <Link href="/courses">Browse All</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex md:hidden justify-center gap-1.5 mt-4">
          {[...Array(availableCourses.length + comingSoonCourses.length + 1)].map((_, index) => (
            <div 
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === 0 ? "bg-[#3495EB] w-6" : "bg-[#E5E7EB] dark:bg-[#1F2937] w-1.5"
              )}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-[#E5E7EB] dark:border-[#1F2937]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3495EB]/10 mb-3">
                <BookOpen className="w-6 h-6 text-[#3495EB]" />
              </div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white mb-1">{availableCourses.length}+</div>
              <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Available Courses</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#8B5CF6]/10 mb-3">
                <Users className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white mb-1">15K+</div>
              <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Active Students</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F59E0B]/10 mb-3">
                <Star className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white mb-1">4.9</div>
              <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#10B981]/10 mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-bold text-[#111827] dark:text-white mb-1">{comingSoonCourses.length}+</div>
              <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Coming Soon</div>
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Industry Expert Instructors</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Hands-on Project Based Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Recognized Certification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Lifetime Course Access</span>
          </div>
        </div>

      </div>
    </section>
  );
}