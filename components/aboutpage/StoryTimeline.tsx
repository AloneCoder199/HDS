"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Rocket, 
  Users, 
  Award, 
  Globe, 
  TrendingUp, 
  Zap,
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  Building2,
  GraduationCap
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const milestones = [
  {
    year: "2018",
    quarter: "Q1",
    title: "The Beginning",
    description: "HDS founded with a vision to bridge the digital skills gap in Pakistan. Started with 3 instructors and 50 students.",
    icon: Rocket,
    highlight: "50 Students",
    color: "from-blue-600 to-blue-500",
    darkColor: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/20"
  },
  {
    year: "2019",
    quarter: "Q3",
    title: "First Expansion",
    description: "Launched online courses reaching students nationwide. Introduced industry certification partnerships.",
    icon: TrendingUp,
    highlight: "1,000+ Students",
    color: "from-sky-500 to-cyan-500",
    darkColor: "from-cyan-400 to-blue-400",
    bgGlow: "bg-sky-500/20"
  },
  {
    year: "2020",
    quarter: "Q2",
    title: "Digital Pivot",
    description: "Transformed into a fully digital-first platform during global shift. Launched AI-powered learning paths.",
    icon: Zap,
    highlight: "5,000+ Students",
    color: "from-cyan-500 to-teal-500",
    darkColor: "from-cyan-400 to-teal-400",
    bgGlow: "bg-cyan-500/20"
  },
  {
    year: "2021",
    quarter: "Q4",
    title: "Global Reach",
    description: "Expanded internationally with students from 15+ countries. Established corporate training division.",
    icon: Globe,
    highlight: "25 Countries",
    color: "from-teal-500 to-emerald-500",
    darkColor: "from-teal-400 to-emerald-400",
    bgGlow: "bg-teal-500/20"
  },
  {
    year: "2023",
    quarter: "Q2",
    title: "Enterprise Era",
    description: "Partnered with Fortune 500 companies for workforce upskilling. Launched HDS Pro platform.",
    icon: Building2,
    highlight: "100+ Partners",
    color: "from-emerald-500 to-green-500",
    darkColor: "from-emerald-400 to-green-400",
    bgGlow: "bg-emerald-500/20"
  },
  {
    year: "2025",
    quarter: "Now",
    title: "Industry Leader",
    description: "Recognized as top digital skills platform in Asia. 10,000+ alumni network driving industry innovation.",
    icon: Award,
    highlight: "10K+ Alumni",
    color: "from-blue-600 via-blue-500 to-sky-500",
    darkColor: "from-blue-400 via-cyan-400 to-blue-500",
    bgGlow: "bg-blue-500/30"
  }
];

const stats = [
  { value: "7+", label: "Years of Excellence", icon: Calendar },
  { value: "98%", label: "Placement Rate", icon: Target },
  { value: "4.9", label: "Student Rating", icon: Sparkles },
];

export function StoryTimeline() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* 2026 Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/5 dark:bg-cyan-400/10 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 2026 Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            Our Journey
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            From Startup to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500">
              Industry Leader
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Seven years of transforming lives through digital education. 
            Every milestone marks a step toward our vision.
          </p>
        </motion.div>

        {/* 2026 Bento Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-sky-500/10 dark:from-blue-500/20 dark:to-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2026 Horizontal Scrolling Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line - Animated */}
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 rounded-full"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {milestones.map((milestone, index) => (
              <TimelineItem 
                key={milestone.year} 
                milestone={milestone} 
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* 2026 CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 relative"
        >
          <Card className="relative overflow-hidden p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-sky-600 dark:from-blue-500 dark:to-cyan-500 text-white border-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold mb-3">Be Part of Our Story</h3>
                <p className="text-blue-100 text-lg">Join 10,000+ students who transformed their careers with HDS.</p>
              </div>
              <Link href="/courses">
              <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-100 flex items-center gap-2 hover:cursor-pointer">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Timeline Item Component
function TimelineItem({ 
  milestone, 
  index, 
  isLeft 
}: { 
  milestone: typeof milestones[0]; 
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Timeline Node */}
      <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${milestone.color} dark:${milestone.darkColor} flex items-center justify-center shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 border-4 border-white dark:border-slate-950`}
        >
          <milestone.icon className="w-7 h-7 text-white" />
        </motion.div>
        
        {/* Year Badge */}
        <div className="absolute -top-2 -right-12 lg:-right-16 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg">
          {milestone.year}
        </div>
      </div>

      {/* Content Card - 2026 Glassmorphism */}
      <div className={`ml-24 lg:ml-0 lg:w-5/12 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="group relative p-6 lg:p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
        >
          {/* Glow Effect */}
          <div className={`absolute -inset-1 rounded-2xl ${milestone.bgGlow} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`} />
          
          {/* Quarter Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold mb-4">
            {milestone.quarter}
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {milestone.title}
          </h3>
          
          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {milestone.description}
          </p>
          
          {/* Highlight */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${milestone.color} dark:${milestone.darkColor} text-white text-sm font-semibold`}>
            <Sparkles className="w-4 h-4" />
            {milestone.highlight}
          </div>
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden lg:block lg:w-5/12" />
    </motion.div>
  );
}