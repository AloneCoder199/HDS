"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Building2, 
  Star, 
  TrendingUp, 
  Rocket, 
  User, 
  CheckCircle, 
  ArrowRight,
  MapPin
} from 'lucide-react';

const heroStats = [
  { icon: GraduationCap, value: "10K+", label: "Students" },
  { icon: Building2, value: "20+", label: "Franchises" },
  { icon: Star, value: "4.8", label: "Rating" },
  { icon: TrendingUp, value: "95%", label: "Success" }
];

const keyBenefits = [
  "100% Scholarship (PKR 100 Only)",
  "1-Month Real Internship",
  "Govt Verified Certificate",
  "Live + Recorded Access"
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[85vh] bg-white dark:bg-[#0B1220] overflow-hidden flex items-center">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3495EB]/3 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* LEFT SIDE - Compact Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3495EB]/10 text-[#3495EB] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3495EB] animate-pulse"></span>
              Admissions Open 2026
            </div>

            {/* Headline - Tight */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white leading-[1.15] tracking-tight">
                Learn Digital Skills & <span className="text-[#3495EB]">Start Earning</span> in 30 Days
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                Pakistan's largest scholarship-based platform. Master Social Media Marketing, 
                Web Development, and Freelancing with hands-on training.
              </p>
            </div>

            {/* Compact Benefits */}
            <div className="flex flex-wrap gap-2">
              {keyBenefits.map((benefit, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#3495EB]" />
                  {benefit}
                </span>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/enroll">
                <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white h-10 px-6 text-sm font-semibold rounded-lg shadow-md">
                  Apply Now
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white h-10 px-6 text-sm font-medium rounded-lg hover:bg-[#F9FAFB]">
                  View Courses
                </Button>
              </Link>
            </div>

            {/* Trust Text - Compact */}
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
              <span>SECP Registered</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Google Partner</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>No Hidden Charges</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Compact Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-2xl p-5 border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
              
              {/* Top Banner - Small */}
              <div className="relative h-32 bg-gradient-to-br from-[#3495EB] to-[#347ce0] rounded-xl mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                  <div>
                    <GraduationCap className="w-10 h-10 text-white mx-auto mb-1" />
                    <h3 className="text-white font-bold text-sm">HDS Scholarship 2026</h3>
                    <p className="text-blue-100 text-xs mt-0.5">Only PKR 100 Registration</p>
                  </div>
                </div>
              </div>

              {/* Compact Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center p-2 bg-white dark:bg-[#0B1220] rounded-lg border border-[#E5E7EB] dark:border-[#1F2937]">
                    <stat.icon className="w-5 h-5 mx-auto mb-1 text-[#3495EB]" />
                    <div className="text-sm font-bold text-[#111827] dark:text-white leading-none">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Featured Course - Compact */}
              <div className="bg-white dark:bg-[#0B1220] rounded-lg p-3 border border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-[#3495EB]/10 flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-[#3495EB]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827] dark:text-white text-xs">AI Social Media Marketing</h4>
                      <p className="text-[10px] text-gray-500">Most Popular • 4 Weeks</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-600 border-0 text-[10px] px-2 py-0.5 h-5">
                    Open
                  </Badge>
                </div>
              </div>

              {/* Small Testimonial */}
              <div className="mt-3 flex items-center gap-2 p-2 bg-white dark:bg-[#0B1220] rounded-lg border border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="w-6 h-6 rounded-full bg-[#3495EB]/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-[#3495EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-600 dark:text-gray-300 truncate">
                    "Got my first client in 2 weeks!"
                  </p>
                  <p className="text-[9px] text-gray-400 flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    Ali Raza, Lahore
                  </p>
                </div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Minimal */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-[#E5E7EB] dark:border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto"
        >
          <p className="text-xs text-gray-500">
            Trusted by 10,000+ students from 50+ cities
          </p>
          <div className="flex items-center gap-6 text-xs font-semibold text-gray-400">
            <span>Google Partner</span>
            <span>Meta Certified</span>
            <span>SECP Registered</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}