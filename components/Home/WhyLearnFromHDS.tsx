"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  Users, 
  Clock, 
  Zap, 
  Shield, 
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Star,
  Target,
  Globe,
  BookOpen,
  Briefcase,
  MessageCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'expert-instructors',
    icon: Award,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with 10+ years of experience at Google, Microsoft, and Amazon.',
    stats: '50+ Experts',
    color: '#3495EB',
    bgColor: 'bg-[#3495EB]',
    lightBg: 'bg-[#3495EB]/10'
  },
  {
    id: 'hands-on',
    icon: Zap,
    title: 'Hands-on Learning',
    description: 'Build real-world projects for your portfolio. Practical assignments in every course.',
    stats: '100+ Projects',
    color: '#8B5CF6',
    bgColor: 'bg-[#8B5CF6]',
    lightBg: 'bg-[#8B5CF6]/10'
  },
  {
    id: 'flexible',
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Study at your own pace with lifetime access. Available 24/7 on any device.',
    stats: 'Lifetime',
    color: '#10B981',
    bgColor: 'bg-[#10B981]',
    lightBg: 'bg-[#10B981]/10'
  },
  {
    id: 'community',
    icon: Users,
    title: 'Active Community',
    description: 'Join 15,000+ learners. Get help, share ideas, and network with peers.',
    stats: '15K+ Members',
    color: '#F59E0B',
    bgColor: 'bg-[#F59E0B]',
    lightBg: 'bg-[#F59E0B]/10'
  },
  {
    id: 'career',
    icon: Briefcase,
    title: 'Career Support',
    description: 'Resume reviews, interview prep, and job placement assistance included.',
    stats: '90% Placement',
    color: '#EF4444',
    bgColor: 'bg-[#EF4444]',
    lightBg: 'bg-[#EF4444]/10'
  },
  {
    id: 'certified',
    icon: Shield,
    title: 'Industry Recognized',
    description: 'Earn certificates recognized by top employers. ISO certified curriculum.',
    stats: 'ISO Certified',
    color: '#06B6D4',
    bgColor: 'bg-[#06B6D4]',
    lightBg: 'bg-[#06B6D4]/10'
  }
];

const trustBadges = [
  'Money-back Guarantee',
  '24/7 Support',
  'Free Trial',
  'Corporate Training'
];

export default function WhyLearn() {
  return (
    <section className="relative py-24 bg-[#F9FAFB] dark:bg-[#0B1220]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] mb-6">
            <HeartHandshake className="w-4 h-4 text-[#3495EB]" />
            <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] dark:text-white mb-4 tracking-tight">
            Why Learn From <span className="text-[#3495EB]">HDS</span>?
          </h2>
          <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl mx-auto">
            We don't just teach skills — we transform careers with proven methodology and dedicated support.
          </p>
        </div>

        {/* Simple Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 hover:shadow-lg hover:shadow-[#3495EB]/5 transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105",
                  feature.lightBg
                )}>
                  <feature.icon 
                    className="w-6 h-6" 
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Stats Badge */}
                <Badge 
                  variant="outline" 
                  className="mb-3 bg-[#F9FAFB] dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] text-[#6B7280] dark:text-[#9CA3AF] text-xs font-medium"
                >
                  {feature.stats}
                </Badge>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3 group-hover:text-[#3495EB] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <Card className="bg-[#111827] dark:bg-white border-0">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#3495EB] flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-[#111827] mb-1">Ready to Start Your Journey?</h3>
                  <p className="text-[#9CA3AF] dark:text-[#6B7280] text-sm">Join 15,000+ students learning with HDS today</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/enroll"><Button 
                  className="bg-[#5080e8] dark:bg-[#5080e8] text-[#111827] dark:text-white hover:bg-[#208cf7] dark:hover:bg-[#4078ea] rounded-full font-semibold px-6 hover:cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button></Link>
                
                <Link href="/courses"><Button 
                  className="bg-[#ffff] dark:bg-[#ffff] text-[#111827] dark:text-black hover:bg-[#ffffff] dark:hover:bg-[#ffffff] rounded-full font-semibold px-6 hover:cursor-pointer"
                >
                  View Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>{badge}</span>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-[#E5E7EB] dark:border-[#1F2937]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-[#3495EB]" />
                <span className="text-3xl font-bold text-[#111827] dark:text-white">15K+</span>
              </div>
              <p className="text-sm text-[#9CA3AF]">Active Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-[#3495EB]" />
                <span className="text-3xl font-bold text-[#111827] dark:text-white">25+</span>
              </div>
              <p className="text-sm text-[#9CA3AF]">Countries</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#3495EB]" />
                <span className="text-3xl font-bold text-[#111827] dark:text-white">4.9</span>
              </div>
              <p className="text-sm text-[#9CA3AF]">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#3495EB]" />
                <span className="text-3xl font-bold text-[#111827] dark:text-white">95%</span>
              </div>
              <p className="text-sm text-[#9CA3AF]">Success Rate</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}