"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Stats data
const impactStats = [
  {
    icon: "👨‍🎓",
    value: 15000,
    suffix: "+",
    label: "Students Trained",
    description: "Across Pakistan and beyond",
    color: "#3495EB"
  },
  {
    icon: "🏪",
    value: 10,
    suffix: "+",
    label: "Franchise Partners",
    description: "Multiple cities covered",
    color: "#8B5CF6"
  },
  {
    icon: "🎓",
    value: 9,
    suffix: "+",
    label: "Batches Conducted",
    description: "Consistent learning cycles",
    color: "#10B981"
  },
  {
    icon: "📍",
    value: 25,
    suffix: "+",
    label: "Cities Reached",
    description: "Nationwide presence",
    color: "#F59E0B"
  }
];

// Timeline data
const timelineData = [
  {
    year: "2020",
    title: "The Reality Hit",
    description: "As digital skills gained popularity, one thing became clear: people were learning, but not earning. This gap sparked a mission — to turn learning into real income.",
    highlight: "Mission Born",
    icon: "💡"
  },
  {
    year: "2021",
    title: "Deep Learning & Ground Work",
    description: "Focused on mastering freelancing, social media marketing, and client handling. The priority was not just learning skills, but developing income-generating abilities.",
    highlight: "Skill Mastery",
    icon: "📚"
  },
  {
    year: "2022",
    title: "System Testing",
    description: "Multiple models were tested — courses, freelancing workflows, and client acquisition systems. Key insight: people don't just need courses, they need a complete earning system.",
    highlight: "System Design",
    icon: "⚙️"
  },
  {
    year: "2023",
    title: "Birth of HDS",
    description: "Officially launched with scholarship-based access, live mentorship, and practical learning. The mission was clear: help every student move from learning to earning.",
    highlight: "Official Launch",
    icon: "🚀"
  },
  {
    year: "2024",
    title: "Internship Ecosystem",
    description: "Evolved beyond training with real internship opportunities, hands-on project experience, and a clear path: Learning → Practice → Experience.",
    highlight: "Practical Exposure",
    icon: "💼"
  },
  {
    year: "2025",
    title: "Scaling Results",
    description: "HDS evolved into a complete income-focused ecosystem. Students started earning, systems refined, focus on scale, consistency, and real outcomes.",
    highlight: "Income Generation",
    icon: "💰"
  }
];

// Why HDS features
const differentiators = [
  {
    icon: "🆓",
    title: "Free Monthly Courses",
    description: "10,000 students trained every month without any cost. Quality education shouldn't have a price barrier.",
    stat: "10K/month"
  },
  {
    icon: "📜",
    title: "Govt-Verified Certificates",
    description: "Official certification that adds credibility to your profile and helps in job applications and freelancing.",
    stat: "Recognized"
  },
  {
    icon: "🎯",
    title: "1-Month Real Internship",
    description: "Convert theoretical skills into actual work experience with real projects and client exposure.",
    stat: "Hands-on"
  },
  {
    icon: "🌐",
    title: "Franchise Network",
    description: "Nationwide learning centers with consistent quality and local accessibility across Pakistan.",
    stat: "10+ Cities"
  },
  {
    icon: "💻",
    title: "Career-Ready Skills",
    description: "Curriculum designed for immediate income generation through freelancing or remote work.",
    stat: "Job-ready"
  },
  {
    icon: "👥",
    title: "Live Mentorship",
    description: "Direct access to industry experts, freelancers, and successful entrepreneurs for guidance.",
    stat: "Expert-led"
  }
];

// Core pillars
const pillars = [
  {
    title: "Our Purpose",
    subtitle: "Empowering Every Pakistani",
    description: "To equip individuals across Pakistan with the right skills, practical tools, and continuous support needed to earn online, advance their careers, and build a stable future.",
    icon: "🎯",
    color: "from-[#3495EB] to-[#347ce0]"
  },
  {
    title: "Our Mission",
    subtitle: "Free Education at Scale",
    description: "Educate 10,000 students every month through practical digital skills courses, completely free, followed by real 1-month internships to turn learning into real-world experience.",
    icon: "🚀",
    color: "from-[#8B5CF6] to-[#7c3aed]"
  },
  {
    title: "Our Vision",
    subtitle: "Digital Pakistan 2030",
    description: "Create a holistic ecosystem where every student learns for free, gains hands-on experience, and connects with a network of freelancers, entrepreneurs, and opportunities.",
    icon: "👁️",
    color: "from-[#10B981] to-[#059669]"
  }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1220] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#111827]">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Decorative Blob */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#3495EB]/5 rounded-full blur-3xl -mr-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl -ml-48" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 px-4 py-1.5 mb-6">
              About Hassan Digital Skills
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white leading-tight mb-6">
              Empowering Pakistan Through{" "}
              <span className="text-[#3495EB]">Digital Skills</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
              From a small initiative to a nationwide movement. We're building Pakistan's 
              largest free digital education ecosystem that turns learners into earners.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses">
                <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-[#3495EB]/20">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/founder-story">
                <Button variant="outline" className="border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white px-8 h-12 text-base font-semibold rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#111827]">
                  Meet the Founder
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {impactStats.map((stat, index) => (
              <Card key={index} className="bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-xl hover:border-[#3495EB]/20 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-semibold text-[#111827] dark:text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are & The Challenge */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            
            {/* Left: Who We Are */}
            <div className="space-y-6">
              <Badge className="bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 text-[#8B5CF6] border-0">
                Who We Are
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white leading-tight">
                Built to Solve a Real Challenge in Pakistan
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Hassan Digital Skills (HDS) was established with a single vision: to equip individuals 
                  across Pakistan with the right skills, practical tools, and continuous support needed 
                  to earn online, advance their careers, and build a stable future.
                </p>
                <p>
                  Starting with a scholarship-based model and live online sessions, HDS gradually 
                  evolved into a structured platform focused on skill development, practical exposure, 
                  and digital growth.
                </p>
                <p>
                  Today, HDS continues to expand with a growing network of students, training programs, 
                  and a supportive learning community that celebrates every success story.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {['👨‍💻', '👩‍💻', '🧑‍💻', '👩‍🎓'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#F9FAFB] dark:bg-[#111827] border-2 border-white dark:border-[#0B1220] flex items-center justify-center text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-[#111827] dark:text-white">15,000+</span> students joined already
                </div>
              </div>
            </div>

            {/* Right: The Problem Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-6">The Challenge We Address</h3>
              
              <Card className="border-l-4 border-l-red-400 bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
                <CardContent className="p-5 flex gap-4">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white mb-1">Traditional Education Gap</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">The system was not enough to prepare students for digital careers.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-400 bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
                <CardContent className="p-5 flex gap-4">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white mb-1">Unaffordable Courses</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">High-priced courses were out of reach for talented individuals.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#3495EB] bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]">
                <CardContent className="p-5 flex gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold text-[#111827] dark:text-white mb-1">The HDS Solution</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">A clear system guiding students from learning → earning, completely free.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-4">
              From Concept to <span className="text-[#3495EB]">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Six years of relentless dedication to transforming how Pakistan learns and earns digitally.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3495EB] via-[#8B5CF6] to-[#10B981] md:-translate-x-1/2" />

            <div className="space-y-12">
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className={`relative flex items-center md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content */}
                    <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className={`bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-lg transition-all duration-300 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'} max-w-md`}>
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                            <span className="text-2xl font-bold text-[#3495EB]">{item.year}</span>
                            <Badge className="bg-[#3495EB]/10 text-[#3495EB] border-0 text-xs">
                              {item.highlight}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#0B1220] border-2 border-[#3495EB] flex items-center justify-center text-lg shadow-lg z-10">
                      {item.icon}
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Purpose */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#10B981]/10 dark:bg-[#10B981]/20 text-[#10B981] border-0 mb-4">
              Our Foundation
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-4">
              What Drives Us <span className="text-[#3495EB]">Forward</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pillars.map((pillar, index) => (
              <Card key={index} className="group bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 transition-all duration-500 overflow-hidden relative">
                {/* Top Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.color}`} />
                
                <CardContent className="p-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3495EB]/10 to-[#8B5CF6]/10 dark:from-[#3495EB]/20 dark:to-[#8B5CF6]/20 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  
                  <div className="text-sm font-semibold text-[#3495EB] mb-2 uppercase tracking-wide">
                    {pillar.subtitle}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why HDS Section */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 text-[#F59E0B] border-0 mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-4">
              The HDS <span className="text-[#3495EB]">Advantage</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We don't just teach skills — we build complete earning systems for every student.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {differentiators.map((item, index) => (
              <Card key={index} className="group bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-xl hover:border-[#3495EB]/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="border-[#3495EB]/30 text-[#3495EB] text-xs">
                      {item.stat}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {['✓ SECP Registered', '✓ Google Partner', '✓ Meta Certified', '✓ Scholarship Based', '✓ 95% Success Rate'].map((badge, index) => (
              <div key={index} className="px-6 py-3 bg-white dark:bg-[#0B1220] rounded-full border border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-gray-300 font-medium text-sm shadow-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Visualization */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
                The HDS <span className="text-[#3495EB]">Ecosystem</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                A complete cycle from learning to earning
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#3495EB] via-[#8B5CF6] to-[#10B981] -translate-y-1/2 z-0" />
              
              <div className="grid lg:grid-cols-4 gap-6 relative z-10">
                {[
                  { step: "01", title: "Learn", desc: "Free digital skills training", icon: "📚", color: "#3495EB" },
                  { step: "02", title: "Practice", desc: "Hands-on project work", icon: "🔨", color: "#8B5CF6" },
                  { step: "03", title: "Intern", desc: "1-month real experience", icon: "💼", color: "#F59E0B" },
                  { step: "04", title: "Earn", desc: "Freelance or job ready", icon: "💰", color: "#10B981" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white dark:bg-[#0B1220] p-6 rounded-2xl border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style={{ backgroundColor: `${item.color}15` }}>
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold mb-1" style={{ color: item.color }}>Step {item.step}</div>
                      <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0B1220] to-[#111827] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3495EB 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-black dark:text-white">Ready to Start Your </span><span className="text-[#3495EB]">Digital Journey</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join 15,000+ students who transformed their careers with HDS. 
              Free education, real internships, and lifetime community support awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enroll">
                <Button className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-10 h-14 text-lg font-semibold rounded-lg shadow-lg shadow-[#3495EB]/25 w-full sm:w-auto">
                  Enroll Now - It's Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-600 text-black  px-10 h-14 text-lg font-semibold rounded-lg w-full sm:w-auto">
                  Contact Franchise
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span>✓</span> No Hidden Fees
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Govt Verified Certificate
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> 1-Month Internship Included
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}