
// CallToAction.tsx - Professional SaaS CTA Section with Dark/Light Mode
// Hassan Digital Skills (HDS) - Modern Design, Fully Responsive
// Unique diagonal split layout with proper theme support
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  PlayCircle,
  Users,
  TrendingUp,
  Shield,
  Star,
  ChevronRight,
  Rocket,
  Clock,
  Gift,
  BadgeCheck,
  MessageCircle,
  Phone,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Feature highlights
const features = [
  { icon: <CheckCircle2 className="w-5 h-5" />, text: '50+ Expert-Led Courses' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Industry-Recognized Certificates' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: '1-on-1 Career Mentorship' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Job Placement Support' },
];

// Stats for trust bar
const trustStats = [
  { value: '15K+', label: 'Active Learners', icon: <Users className="w-4 h-4" /> },
  { value: '4.9', label: 'Student Rating', icon: <Star className="w-4 h-4" /> },
  { value: '90%', label: 'Job Placement', icon: <TrendingUp className="w-4 h-4" /> },
  { value: '30-Day', label: 'Money Back', icon: <Shield className="w-4 h-5" /> },
];

// Recent students
const recentStudents = [
  { name: 'Ahmed', initials: 'A', color: 'bg-blue-500' },
  { name: 'Sara', initials: 'S', color: 'bg-pink-500' },
  { name: 'Bilal', initials: 'B', color: 'bg-emerald-500' },
  { name: 'Ayesha', initials: 'A', color: 'bg-violet-500' },
  { name: 'Usman', initials: 'U', color: 'bg-amber-500' },
];

export default function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);
  

  // Countdown timer
  

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* 
        BACKGROUND - Works in BOTH light and dark mode
        Uses CSS variables that change with theme
      */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
        {/* Diagonal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-sky-500/5 
                        dark:from-blue-500/10 dark:via-transparent dark:to-sky-400/10" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating orbs - subtle in both modes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 
                        rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 
                        rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Content Container */}
        <div className="relative">

          {/* 
            TOP BADGE - Centered, works in both themes
          */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-blue-100 dark:bg-blue-500/20 
                            border border-blue-200 dark:border-blue-500/30">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Limited Time Offer
              </span>
              <Badge className="bg-amber-500 text-white border-0 text-xs ml-2">
                40% OFF
              </Badge>
            </div>
          </div>

          {/* 
            MAIN HEADLINE - Large, centered, theme adaptive
          */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white 
                          mb-6 leading-tight tracking-tight">
              Start Your Journey to{' '}
              <span className="relative inline-block">
                <span className="text-blue-600 dark:text-blue-400">Success</span>
                {/* Underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-400/30 dark:text-blue-400/50" 
                     viewBox="0 0 200 9" fill="none">
                  <path d="M2.00025 6.99997C25.7509 3.49998 121.25 -2.50003 198 6.99997" 
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Join 15,000+ students who transformed their careers with HDS. 
              Get unlimited access to all courses, mentorship, and job support.
            </p>
          </div>

          {/* 
            TWO COLUMN LAYOUT - Features left, CTA Card right
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* LEFT COLUMN - Features List */}
            <div className="space-y-8">
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl 
                               bg-white dark:bg-slate-900 
                               border border-slate-200 dark:border-slate-800
                               shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-emerald-500 dark:text-emerald-400">
                      {feature.icon}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Student Avatars */}
              <div className="flex items-center gap-4 p-4 rounded-xl 
                              bg-white dark:bg-slate-900 
                              border border-slate-200 dark:border-slate-800">
                <div className="flex -space-x-3">
                  {recentStudents.map((student, idx) => (
                    <Avatar key={idx} className={`w-10 h-10 border-2 border-white dark:border-slate-800 ${student.color}`}>
                      <AvatarFallback className="text-white text-sm font-bold">
                        {student.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    2,847 students joined this month
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Enrolling now
                  </p>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>30-Day Money Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - CTA Card */}
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-500 
                              rounded-2xl blur opacity-20 dark:opacity-30" />

              <Card className="relative overflow-hidden 
                               bg-white dark:bg-slate-900 
                               border border-slate-200 dark:border-slate-800 
                               shadow-xl">
                <CardContent className="p-8">
                  {/* Pricing Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <Gift className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        Special Launch Price
                      </span>
                    </div>

                   <div className="flex flex-col items-center justify-center mb-6">
  {/* Limited Offer Tag */}
  <p className="text-xs font-bold uppercase tracking-widest text-[#3495EB] mb-2">
    Limited Time Offer
  </p>

  <div className="flex items-baseline justify-center gap-4">
    {/* New Price: PKR 100 */}
    <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">
      PKR 100
    </span>

    {/* Old Price: PKR 25,000 with Red Cut */}
    <div className="relative">
      <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 line-through decoration-red-500 decoration-2">
        PKR 25,000
      </span>
      {/* Discount Badge */}
      <span className="absolute -top-6 -right-12 animate-bounce rounded-full bg-red-600 px-2 py-1 text-[10px] font-black text-white shadow-lg">
        99% OFF
      </span>
    </div>
  </div>
</div>


                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      per month • Cancel anytime
                    </p>
                  </div>

                  

                  {/* CTA Button */}
                  
         <Link href="/courses">
         <Button 
                    size="lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-full mb-4 bg-blue-600 hover:bg-blue-700 
                               dark:bg-blue-500 dark:hover:bg-blue-600
                               text-white font-semibold py-6 text-lg
                               shadow-lg shadow-blue-500/25 dark:shadow-blue-500/30
                               transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Rocket className={`w-5 h-5 mr-2 transition-transform duration-300 
                                       ${isHovered ? '-translate-y-1 translate-x-1' : ''}`} />
                    Get Instant Access
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 
                                           ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
         
         </Link>
                  {/* Secondary CTA */}
                  

                  <Link href="/services">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full border-slate-300 dark:border-slate-700 
                               text-slate-700 dark:text-slate-300 
                               hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Explore Services
                  </Button>
                  </Link>

                  {/* Contact row */}
                  
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 
            BOTTOM TRUST BAR - Full width
          */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl 
                                  bg-blue-100 dark:bg-blue-500/20 
                                  text-blue-600 dark:text-blue-400 mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}