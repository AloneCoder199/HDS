"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: "👥",
    value: 5000,
    suffix: "+",
    label: "Total Students",
    description: "Active learners transforming their careers with HDS",
    subtext: "From 25+ cities across Pakistan",
    color: "#3495EB",
    trend: "+23% this month"
  },
  {
    icon: "📚",
    value: 20,
    suffix: "+",
    label: "Expert Courses",
    description: "Industry-aligned curriculum designed by professionals",
    subtext: "SSM, Digital Marketing, SEO & more",
    color: "#8B5CF6",
    trend: "4 new this quarter"
  },
  {
    icon: "🏆",
    value: 500,
    suffix: "+",
    label: "Success Stories",
    description: "Students landed jobs & started freelancing careers",
    subtext: "Average salary increase: 65%",
    color: "#10B981",
    trend: "92% placement rate"
  },
  {
    icon: "🎧",
    value: 24,
    suffix: "/7",
    label: "Expert Support",
    description: "Round-the-clock guidance from industry mentors",
    subtext: "Avg. response time: 15 minutes",
    color: "#F59E0B",
    trend: "99.9% satisfaction"
  }
];

const additionalMetrics = [
  {
    icon: "🎓",
    label: "Course Completion Rate",
    value: "87%"
  },
  {
    icon: "⭐",
    label: "Student Satisfaction",
    value: "4.9/5"
  },
  {
    icon: "📈",
    label: "Career Growth",
    value: "65%"
  },
  {
    icon: "⏱️",
    label: "Avg. Learning Time",
    value: "6 months"
  }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [value]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function PlatformStats() {
  return (
    <section className="py-24 bg-[#F9FAFB] dark:bg-[#111827] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3495EB 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-1.5 text-sm font-medium border-[#E5E7EB] dark:border-[#1F2937] text-[#3495EB] bg-[#3495EB]/10 dark:bg-[#3495EB]/20"
          >
            Trusted by Thousands
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] dark:text-white mb-6">
            Numbers That Speak <span className="text-[#3495EB]">Success</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join Pakistan's fastest-growing community of digital professionals. 
            Our platform stats reflect the trust and success of our learning ecosystem.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-xl hover:shadow-[#3495EB]/5 hover:border-[#3495EB]/30 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-transform duration-500 group-hover:scale-x-100 scale-x-0 origin-left"
                style={{ backgroundColor: stat.color }}
              />
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    {stat.icon}
                  </div>
                  
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${stat.color}15`,
                      color: stat.color 
                    }}
                  >
                    {stat.trend}
                  </div>
                </div>

                <div className="mb-4">
                  <div 
                    className="text-4xl sm:text-5xl font-bold mb-2 transition-colors duration-300"
                    style={{ color: stat.color }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {stat.description}
                  </p>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {stat.subtext}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Metrics Bar */}
        <Card className="bg-white dark:bg-[#0B1220] border-[#E5E7EB] dark:border-[#1F2937]">
          <CardContent className="p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827] dark:text-white">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Live Platform Stats</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#E5E7EB] dark:bg-[#1F2937]" />
            <span className="text-sm">Updated in real-time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
