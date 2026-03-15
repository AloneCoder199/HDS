"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Quote,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Facebook,
  ExternalLink,
  TrendingUp,
  Users,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Sample testimonials data - replace with your actual data or fetch from API
const testimonialsData = [
  {
    id: '1',
    name: 'Ali Shah',
    role: 'Senior Software Engineer',
    company: 'Systems Limited',
    image: '/testimonials/ali-shah.jpg',
    quote: 'HDS completely transformed my career. The React & Next.js course gave me practical skills that I applied immediately. Within 3 months, I landed a senior role with a 150% salary increase.',
    rating: 5,
    course: 'React & Next.js Mastery',
    verified: true,
    featured: true,
    source: 'facebook'
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    role: 'UI/UX Designer',
    company: 'VentureDive',
    image: '/testimonials/fatima-zahra.jpg',
    quote: 'The UI/UX Design course exceeded all my expectations. The project-based approach helped me build a portfolio that actually got me hired.',
    rating: 5,
    course: 'UI/UX Design Professional',
    verified: true,
    source: 'facebook'
  },
  {
    id: '3',
    name: 'Bilal Ahmed',
    role: 'Digital Marketing Manager',
    company: 'Daraz Pakistan',
    image: '/testimonials/bilal-ahmed.jpg',
    quote: 'I switched careers from sales to digital marketing through HDS. The SEO and analytics modules were incredibly comprehensive.',
    rating: 5,
    course: 'Digital Marketing Essentials',
    verified: true,
    featured: true,
    source: 'facebook'
  }
];

const trustStats = [
  { label: 'Success Stories', value: '2,500+', icon: TrendingUp },
  { label: 'Average Rating', value: '4.9/5', icon: Star },
  { label: 'Active Students', value: '15K+', icon: Users },
];

// Facebook Page URL - replace with your actual Facebook page
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/HassanDigitalSkills';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section className="relative py-20 bg-[#F9FAFB] dark:bg-[#0B1220] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] mb-6">
            <ThumbsUp className="w-4 h-4 text-[#3495EB]" />
            <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Student Success</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white mb-4">
            Trusted by <span className="text-[#3495EB]">2,500+</span> Students
          </h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl mx-auto">
            Real stories from real students who transformed their careers with HDS.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {trustStats.map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#3495EB]/10 mb-3">
                  <stat.icon className="w-5 h-5 text-[#3495EB]" />
                </div>
                <div className="text-2xl font-bold text-[#111827] dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#9CA3AF]">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-center text-[#6B7280] hover:text-[#3495EB] hover:border-[#3495EB]/50 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-center text-[#6B7280] hover:text-[#3495EB] hover:border-[#3495EB]/50 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[350px] overflow-hidden">
            {testimonialsData.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                )}
              >
                <Card className="h-full bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="w-12 h-12 text-[#3495EB]" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating 
                              ? 'text-[#F59E0B] fill-[#F59E0B]' 
                              : 'text-[#E5E7EB] dark:text-[#1F2937]'
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-[#111827] dark:text-white">
                        {testimonial.rating}.0
                      </span>
                      {testimonial.verified && (
                        <BadgeCheck className="w-4 h-4 text-[#3495EB] ml-2" />
                      )}
                    </div>

                    {/* Quote */}
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6 flex-1 text-lg">
                      "{testimonial.quote}"
                    </p>

                    {/* Course Tag */}
                    <div className="mb-6">
                      <Badge variant="outline" className="bg-[#3495EB]/5 text-[#3495EB] border-[#3495EB]/20">
                        {testimonial.course}
                      </Badge>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                      <Avatar className="w-12 h-12 border-2 border-[#E5E7EB] dark:border-[#1F2937]">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-[#3495EB] text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-[#111827] dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-[#9CA3AF]">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex 
                  ? 'w-8 bg-[#3495EB]' 
                  : 'w-2 bg-[#E5E7EB] dark:bg-[#1F2937] hover:bg-[#9CA3AF]'
              )}
            />
          ))}
        </div>

        {/* Facebook Reviews CTA */}
        <div className="mt-12">
          <Card className="bg-[#1877F2] border-0">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl  flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">See More Reviews on Facebook</h3>
                  <p className="text-white/80 text-sm">Join 2,500+ students sharing their success stories</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={FACEBOOK_PAGE_URL} target='_blank'>
                <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600 
                         shadow-lg transition-all duration-300 hover:scale-105"
            >
              Visit FaceBook Page
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
                
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-[#10B981]" />
            <span>Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#10B981]" />
            <span>Real Student Feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <span>Proven Results</span>
          </div>
        </div>

      </div>
    </section>
  );
}