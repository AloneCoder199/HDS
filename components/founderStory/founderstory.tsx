"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Timeline data based on Ali Hassan's journey
const journeyTimeline = [
  {
    year: "2018-2019",
    title: "The Village Struggle",
    description: "Born in a small village near Samundri with limited internet access. Started learning digital skills at age 21 with no resources, facing isolation and financial constraints.",
    milestone: "First Steps"
  },
  {
    year: "2020",
    title: "Birth of HDS",
    description: "Founded Hassan Digital Skills with a vision to provide free digital education. Started training students completely free of cost from a small room.",
    milestone: "Foundation Laid"
  },
  {
    year: "2020-2021",
    title: "HDS Software House",
    description: "Established HDS Software in Samundri to serve real clients. Created a practical learning ecosystem where students work on live projects.",
    milestone: "Industry Entry"
  },
  {
    year: "2022-2023",
    title: "Franchise Expansion",
    description: "Expanded to 20+ active franchise partners across Pakistan. Verified by Google and Meta as a certified training partner.",
    milestone: "20+ Franchises"
  },
  {
    year: "2024-Present",
    title: "National Impact",
    description: "Training 10,000+ students monthly on scholarship basis. SECP registered entity with global reach and worldwide learners.",
    milestone: "10K Monthly"
  }
];

// Stats data
const impactStats = [
  {
    icon: "👨‍🎓",
    value: 10000,
    suffix: "+",
    label: "Students Trained",
    description: "Monthly scholarship-based training",
    color: "#3495EB"
  },
  {
    icon: "🏪",
    value: 20,
    suffix: "+",
    label: "Franchise Partners",
    description: "Active across Pakistan",
    color: "#8B5CF6"
  },
  {
    icon: "🌍",
    value: 5,
    suffix: "+",
    label: "Countries Reach",
    description: "Global student community",
    color: "#10B981"
  },
  {
    icon: "📅",
    value: 5,
    suffix: " Years",
    label: "Of Excellence",
    description: "Since 2020",
    color: "#F59E0B"
  }
];

// Core values based on Ali Hassan's philosophy
const coreValues = [
  {
    title: "Accessibility",
    description: "Free digital education for every Pakistani regardless of background, location, or financial status.",
    icon: "🎯"
  },
  {
    title: "Practical Learning",
    description: "Hands-on training through HDS Software House with real client projects and industry experience.",
    icon: "⚡"
  },
  {
    title: "Community Building",
    description: "Creating a network of learners, freelancers, entrepreneurs, and mentors supporting each other.",
    icon: "🤝"
  },
  {
    title: "Income Generation",
    description: "Transforming skills into sustainable income sources through freelancing and entrepreneurship.",
    icon: "💰"
  }
];

// Achievement badges
const achievements = [
  "✓ Google Verified Partner",
  "✓ Meta Certified Trainer", 
  "✓ SECP Registered",
  "✓ 95% Success Rate",
  "✓ Village to National Impact"
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2500;
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
  }, [value]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function FounderStoryPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1220]">
      
      {/* Hero Section - Village to Vision */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#111827] opacity-50" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Content */}
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 px-4 py-1.5">
                  Founder & CEO
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white leading-tight">
                  From <span className="text-[#3495EB]">Village Beginnings</span> to Building Pakistan's Digital Future
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ali Hassan's journey from a small village near Samundri to creating Pakistan's most impactful digital education platform—training 10,000+ students monthly completely free.
                </p>
              </div>

              {/* Achievement Pills */}
              <div className="flex flex-wrap gap-3">
                {achievements.map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] rounded-full text-sm font-medium text-[#111827] dark:text-gray-200 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
  {/* Enroll Page Link */}
  <Link href="/enroll" className="w-full sm:w-auto">
    <Button 
      className="w-full bg-[#3495EB] hover:bg-[#347ce0] text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-[#3495EB]/20"
    >
      Start Your Journey
    </Button>
  </Link>

  {/* Contact Page Link */}
  <Link href="/contact" className="w-full sm:w-auto">
    <Button 
      variant="outline"
      className="w-full border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white px-8 h-12 text-base font-semibold rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#111827]"
    >
      View Franchise Network
    </Button>
  </Link>
</div>
</div>
            {/* Founder Image Card */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-2xl shadow-[#3495EB]/10 border border-[#E5E7EB] dark:border-[#1F2937]">
                <Image
                  src="/founder.jpeg"
                  alt="Ali Hassan - Founder of Hassan Digital Skills"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <h3 className="text-3xl font-bold text-white mb-1">Ali Hassan</h3>
                  <p className="text-[#3495EB] font-semibold text-lg">Digital Mentor & Entrepreneur</p>
                  <p className="text-gray-300 mt-2 text-sm">"Every Pakistani deserves free access to digital skills"</p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#0B1220] rounded-2xl p-5 shadow-xl border border-[#E5E7EB] dark:border-[#1F2937]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#111827] dark:text-white">Verified</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Google & Meta Partner</div>
                  </div>
                </div>
              </div>

              {/* Second Floating Card */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-[#0B1220] rounded-2xl p-4 shadow-xl border border-[#E5E7EB] dark:border-[#1F2937] hidden sm:block">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#3495EB]">10K+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Monthly Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Struggle Section */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-0 mb-4">
                The Journey
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
                The Early Struggle
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Every success story has a beginning. This is where it all started.
              </p>
            </div>

            <Card className="bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">📍</span>
                      <span className="text-lg font-semibold text-[#111827] dark:text-white">Samundri, Punjab</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#111827] dark:text-white">
                      Limited Resources, Unlimited Dreams
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Born in a village near Samundri, Ali Hassan had limited access to the internet and digital resources. Like many beginners, he faced confusion, isolation, and financial constraints.
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      But he had a vision: to master digital skills and help others achieve what he dreamed of. At age 21, he started from scratch, experimenting with online marketing, ads, and freelance work.
                    </p>

                    <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        "Every small success, every first campaign, and every challenge taught me how the digital world works—and that anyone can succeed with the right guidance."
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] p-8 flex items-center justify-center text-white text-center">
                      <div>
                        <div className="text-6xl mb-4">💡</div>
                        <h4 className="text-2xl font-bold mb-2">The Turning Point</h4>
                        <p className="text-white/90">Realizing that education, not just skills, was the key to transforming Pakistan's digital landscape.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section - The Rise */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
              Timeline
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-4">
              The Rise: Beginner to <span className="text-[#3495EB]">Digital Entrepreneur</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a single laptop to a nationwide network. Every milestone represents thousands of transformed lives.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E5E7EB] dark:bg-[#1F2937] md:-translate-x-1/2" />

            <div className="space-y-12">
              {journeyTimeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className={`relative flex items-center md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Card */}
                    <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className={`bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 transition-all duration-300 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                            <span className="text-2xl font-bold text-[#3495EB]">{item.year}</span>
                            <Badge variant="outline" className="border-[#3495EB]/30 text-[#3495EB] text-xs">
                              {item.milestone}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#3495EB] border-4 border-white dark:border-[#0B1220] shadow-lg z-10" />

                    {/* Empty Space */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Mission Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
                  Our Mission
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-6">
                  Free Digital Education for <span className="text-[#3495EB]">Every Pakistani</span>
                </h2>
                <blockquote className="text-xl text-gray-600 dark:text-gray-300 italic border-l-4 border-[#3495EB] pl-6 py-2 mb-6">
                  "Every Pakistani deserves free access to digital skills, practical experience, and income opportunities."
                </blockquote>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Ali Hassan's mission is simple yet powerful. Through HDS, he has created a complete learning ecosystem that transforms beginners into professionals, and professionals into entrepreneurs.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#111827] dark:text-white text-lg">What We Provide:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3495EB] mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Free monthly courses for 10,000 students on scholarship basis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3495EB] mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Hands-on training through HDS Software House with real clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3495EB] mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">20+ franchise partners across Pakistan for local accessibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3495EB] mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Global reach connecting students, freelancers, and investors</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vision 2030 Card */}
            <div className="relative">
              <Card className="bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3495EB]/5 rounded-full -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-3xl mb-6">
                    🚀
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">
                    Vision 2030
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Building Pakistan's most comprehensive digital education and entrepreneurship ecosystem by 2030. A future where:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937]">
                      <span className="text-2xl">🎓</span>
                      <div>
                        <div className="font-semibold text-[#111827] dark:text-white">Students</div>
                        <div className="text-sm text-gray-500">Learn in-demand skills free</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937]">
                      <span className="text-2xl">💼</span>
                      <div>
                        <div className="font-semibold text-[#111827] dark:text-white">Freelancers</div>
                        <div className="text-sm text-gray-500">Earn through global platforms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937]">
                      <span className="text-2xl">🏢</span>
                      <div>
                        <div className="font-semibold text-[#111827] dark:text-white">Entrepreneurs</div>
                        <div className="text-sm text-gray-500">Build scalable businesses</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#0B1220] rounded-xl border border-[#E5E7EB] dark:border-[#1F2937]">
                      <span className="text-2xl">💰</span>
                      <div>
                        <div className="font-semibold text-[#111827] dark:text-white">Investors</div>
                        <div className="text-sm text-gray-500">Fund digital startups</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-4">
              Our Philosophy
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white mb-4">
              Core Values That Drive <span className="text-[#3495EB]">HDS</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card 
                key={index}
                className="bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-24 bg-[#3495EB] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Impact That Speaks
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Numbers that reflect trust, growth, and transformed lives across Pakistan and beyond.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-blue-100 text-sm">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-xl">📋</span>
              <span className="text-white font-semibold">SECP Registered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-xl">🌐</span>
              <span className="text-white font-semibold">Global Certification</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-xl">🎓</span>
              <span className="text-white font-semibold">Scholarship Based</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#3495EB]/10 dark:bg-[#3495EB]/20 text-[#3495EB] border-0 mb-6">
              The Promise
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-8">
              From Village to <span className="text-[#3495EB]">Victory</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
              Ali Hassan believes no student should be denied opportunity because of background, location, or resources. From village beginnings to running a nationwide institute, his journey proves:
            </p>

            <div className="grid sm:grid-cols-5 gap-4 mb-12">
              {['Beginner', 'Learner', 'Freelancer', 'Entrepreneur', 'Mentor'].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-4 text-center hover:border-[#3495EB]/30 transition-colors">
                    <div className="text-2xl mb-2">
                      {index === 0 && '👶'}
                      {index === 1 && '📖'}
                      {index === 2 && '💻'}
                      {index === 3 && '🚀'}
                      {index === 4 && '👨‍🏫'}
                    </div>
                    <div className="font-bold text-[#111827] dark:text-white text-sm">{step}</div>
                  </div>
                  {index < 4 && (
                    <div className="hidden sm:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-[#3495EB]">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F9FAFB] dark:bg-[#111827] rounded-2xl p-8 lg:p-12 border border-[#E5E7EB] dark:border-[#1F2937]">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic">
                "Challenges are stepping stones, not barriers. Free, accessible education is the key to a thriving digital future."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* Join HDS Today -> Enroll Page */}
  <Button 
    asChild
    className="bg-[#3495EB] hover:bg-[#347ce0] text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-[#3495EB]/20"
  >
    <Link href="/enroll">
      Join HDS Today
    </Link>
  </Button>

  {/* Become a Franchise Partner -> Contact Page */}
  <Button 
    asChild
    variant="outline"
    className="border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white px-8 h-12 text-base font-semibold rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#111827]"
  >
    <Link href="/contact">
      Become a Franchise Partner
    </Link>
  </Button>
</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}