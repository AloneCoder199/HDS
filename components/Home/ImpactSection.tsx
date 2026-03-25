// app/components/ImpactSection.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  Shield, 
  ArrowUpRight,
  BarChart3,
  Users,
  Globe,
  BookOpen,
  Award,
  Target,
  Video
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  trend?: string;
  delay: number;
}

const StatCard = ({ icon, value, label, description, trend, delay }: StatCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 transition-all duration-300 hover:border-[#3495EB] hover:shadow-lg dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#3495EB]">
        {/* Top accent line */}
        <div className="absolute left-0 top-0 h-1 w-full bg-[#3495EB] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Icon container */}
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-[#3495EB]/10 p-3 transition-transform duration-300 group-hover:scale-110 dark:bg-[#3495EB]/20">
          <div className="text-[#3495EB]">
            {icon}
          </div>
        </div>

        {/* Value with trend */}
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-[#111827] dark:text-white">
            {value}
          </h3>
          {trend && (
            <span className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-0.5 h-4 w-4" />
              {trend}
            </span>
          )}
        </div>

        {/* Label */}
        <p className="mt-1 text-lg font-semibold text-[#111827] dark:text-white">
          {label}
        </p>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
          {description}
        </p>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3495EB] text-white">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureHighlight = ({ 
  title, 
  description, 
  icon: Icon, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: delay }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 rounded-lg bg-[#8B5CF6]/10 p-2.5 dark:bg-[#8B5CF6]/20">
        <Icon className="h-5 w-5 text-[#8B5CF6]" />
      </div>
      <div>
        <h4 className="font-semibold text-[#111827] dark:text-white">
          {title}
        </h4>
        <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "15K+",
      label: "Students Trained",
      description: "Successfully trained over 15,000 students in digital marketing and social media skills across Pakistan.",
      trend: "+2K this year",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "98%",
      label: "Success Rate",
      description: "Our graduates land jobs or start freelancing within 3 months of course completion with industry-ready skills.",
      trend: "Top Rated",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      value: "50+",
      label: "Professional Courses",
      description: "Comprehensive curriculum covering SMM, SEO, Meta Ads, Google Ads, Content Marketing, and Email Marketing.",
      trend: "Updated 2026",
    },
    {
      icon: <Target className="h-6 w-6" />,
      value: "500+",
      label: "Hiring Partners",
      description: "Strong network of companies and agencies actively recruiting our certified digital marketing professionals.",
      trend: "Growing daily",
    },
  ];

  const features = [
    {
      icon: Video,
      title: "Live Interactive Classes",
      description: "Daily live sessions with industry experts. Real-time Q&A, screen sharing, and hands-on campaign management practice.",
    },
    {
      icon: Shield,
      title: "Lifetime Access & Support",
      description: "Get lifetime access to course materials, recorded sessions, and our exclusive alumni community for continuous growth.",
    },
    {
      icon: BarChart3,
      title: "Real Client Projects",
      description: "Work on actual business campaigns during training. Build a professional portfolio that impresses employers immediately.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-[#0B1220] sm:py-32"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full bg-[#3495EB]/10 px-3 py-1 text-sm font-medium text-[#3495EB] dark:bg-[#3495EB]/20">
              <Zap className="mr-2 h-4 w-4" />
              HDS - Hassan Digital Skills
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-5xl"
          >
            Master Digital Marketing
            <br />
            <span className="text-[#3495EB]">Build Your Future</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-[#6B7280] dark:text-[#9CA3AF]"
          >
            Pakistan's leading online learning platform for Social Media Marketing, 
            Digital Marketing, SEO, and Paid Advertising. Learn from industry experts 
            who have managed campaigns for top brands.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom Section - Features + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-8 dark:border-[#1F2937] dark:bg-[#111827] lg:p-12"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Features */}
            <div>
              <h3 className="text-2xl font-bold text-[#111827] dark:text-white">
                Why Students Choose HDS
              </h3>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">
                We combine practical training with industry expertise to deliver 
                unmatched digital marketing education that gets you hired.
              </p>
              
              <div className="mt-8 space-y-6">
                {features.map((feature, index) => (
                  <FeatureHighlight
                    key={feature.title}
                    {...feature}
                    delay={0.8 + index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Right - CTA Card */}
            <div className="flex flex-col justify-center">
              <div className="relative overflow-hidden rounded-xl bg-[#3495EB] p-8 text-white">
                {/* Decorative circles */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />
                
                <div className="relative">
                  <h4 className="text-2xl font-bold">
                    Ready to Start Learning?
                  </h4>
                  <p className="mt-3 text-white/90">
                    Join our next batch starting March 25, 2026. 
                    Transform your career with in-demand digital skills.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link  href="/enroll">
                    <button className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#3495EB] transition-all duration-200 hover:bg-white/90 hover:shadow-lg">
                      Enroll Now - 40% Off
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </button>
                    </Link>
                    <Link href="/contact">
                    <button className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20">
                      Free Demo Class
                    </button>
                    </Link>
                    
                  </div>

                  <p className="mt-4 text-xs text-white/70">
                    • 7-Day Money Back Guarantee • Certificate Included • Job Placement Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
            Our students work at leading companies
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-30 dark:hover:opacity-70">
            {['Careem', 'Foodpanda', 'Daraz', 'Jazz', 'Telenor'].map((company) => (
              <span 
                key={company} 
                className="text-lg font-bold text-[#111827] dark:text-white"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}