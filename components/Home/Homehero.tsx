'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  BookOpen, 
  Award,
  Zap,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  ChevronRight,
  Target,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const features = [
  { icon: CheckCircle2, text: 'Industry Expert Mentors' },
  { icon: Clock, text: 'Lifetime Access' },
  { icon: Award, text: 'Certified Courses' },
  { icon: Shield, text: 'Money Back Guarantee' },
];

const stats = [
  { value: '10K+', label: 'Students', icon: Users },
  { value: '50+', label: 'Courses', icon: BookOpen },
  { value: '95%', label: 'Success', icon: TrendingUp },
  { value: '4.9', label: 'Rating', icon: Star },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#FFFFFF] dark:bg-[#0B1220]">
        <div className="w-full max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="h-8 w-64 bg-[#F9FAFB] dark:bg-[#111827] rounded-full mx-auto animate-pulse" />
          <div className="h-24 max-w-3xl mx-auto bg-[#F9FAFB] dark:bg-[#111827] rounded-2xl animate-pulse" />
          <div className="h-12 w-48 bg-[#F9FAFB] dark:bg-[#111827] rounded-full mx-auto animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] dark:bg-[#0B1220] overflow-hidden">
      
      {/* ✅ PROFESSIONAL SaaS BACKGROUND - Multi-layered */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Primary Gradient Orb - Top Right */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-[#3495EB]/8 rounded-full blur-[120px]" />
        
        {/* Secondary Gradient Orb - Bottom Left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#8B5CF6]/8 rounded-full blur-[100px]" />
        
        {/* Accent Orb - Center */}
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#3495EB]/5 rounded-full blur-[80px]" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1F2937_1px,transparent_1px),linear-gradient(to_bottom,#1F2937_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFFFF]/50 to-[#FFFFFF] dark:from-transparent dark:via-[#0B1220]/50 dark:to-[#0B1220]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        
        {/* ✅ ENHANCED: Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50 hover:shadow-lg hover:shadow-[#3495EB]/10 transition-all group"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#3495EB]/10">
              <Sparkles className="w-3 h-3 text-[#3495EB]" />
            </span>
            <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#3495EB] transition-colors">
              New courses available for 2026
            </span>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#3495EB] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </motion.div>

        {/* ✅ ENHANCED: Main Headline with Better Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111827] dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6"
        >
          Master Digital Skills &{' '}
          <span className="text-[#3495EB]">
            Transform
          </span>{' '}
          Your Career
        </motion.h1>

        {/* ✅ ENHANCED: Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join thousands of students learning web development, digital marketing, and design from industry experts. Start your journey today with hands-on projects.
        </motion.p>

        {/* ✅ ENHANCED: CTA Buttons with Better Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-8 rounded-xl bg-[#3495EB] hover:bg-[#347ce0] text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-[#3495EB]/25 border-0"
          >
            <Link href="/courses" className="flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-xl border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] hover:text-[#3495EB] bg-transparent font-semibold text-base transition-all hover:bg-[#3495EB]/5"
          >
            <Link href="/services" className="flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              Explore Services
            </Link>
          </Button>
        </motion.div>

        {/* ✅ ENHANCED: Feature Pills with Better Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {features.map((feature, index) => (
            <div 
              key={feature.text}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:border-[#3495EB]/30 hover:shadow-sm transition-all"
            >
              <feature.icon className="w-4 h-4 text-[#3495EB]" />
              {feature.text}
            </div>
          ))}
        </motion.div>

        {/* ✅ PROFESSIONAL: Dashboard Preview with Enhanced Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Enhanced Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#3495EB]/10 via-[#8B5CF6]/10 to-[#3495EB]/10 rounded-3xl blur-2xl opacity-60" />
          <div className="absolute -inset-2 bg-gradient-to-b from-[#3495EB]/5 to-transparent rounded-2xl blur-xl opacity-40" />
          
          {/* Main Card */}
          <div className="relative bg-[#FFFFFF] dark:bg-[#111827] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2937] shadow-2xl shadow-[#3495EB]/5 overflow-hidden">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5E7EB] dark:border-[#1F2937] bg-[#F9FAFB] dark:bg-[#0B1220]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-md mx-auto h-7 rounded-md bg-[#FFFFFF] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] flex items-center px-3">
                  <span className="text-xs text-[#9CA3AF]">hassandigitalskills.com/dashboard</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stats Cards */}
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#3495EB]/10 flex items-center justify-center group-hover:bg-[#3495EB]/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-[#3495EB]" />
                    </div>
                    <span className="text-2xl font-bold text-[#111827] dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Course Progress Preview */}
            <div className="px-6 pb-6">
              <div className="p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827] dark:text-white text-sm">Full Stack Development</h4>
                      <p className="text-xs text-[#9CA3AF]">Continue where you left off</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#3495EB]">75%</span>
                </div>
                <div className="h-2 bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#3495EB] to-[#8B5CF6] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ✅ ENHANCED: Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-[#E5E7EB] dark:border-[#1F2937]"
        >
          <p className="text-sm text-[#9CA3AF] mb-6 uppercase tracking-wider font-medium">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {['Tech Sense', 'Buildify', 'Wink', 'Comfert Net', 'Next Gen'].map((company) => (
              <span key={company} className="text-lg md:text-xl font-bold text-[#6B7280] dark:text-[#4B5563]">
                {company}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}