"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  X, 
  Check, 
  Zap, 
  Users, 
  Award, 
  Clock, 
  Target,
  Sparkles,
  TrendingUp,
  Shield,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const comparisonData = {
  traditional: {
    title: "Traditional Learning",
    icon: Clock,
    color: "slate",
    features: [
      { label: "Fixed Schedule", value: false, desc: "Rigid class times" },
      { label: "Theoretical Focus", value: false, desc: "Mostly textbook learning" },
      { label: "Limited Support", value: false, desc: "Office hours only" },
      { label: "Generic Curriculum", value: false, desc: "One-size-fits-all" },
      { label: "No Job Guarantee", value: false, desc: "Career support extra" },
      { label: "Outdated Content", value: false, desc: "Static course material" }
    ]
  },
  hds: {
    title: "HDS Experience",
    icon: Zap,
    color: "blue",
    features: [
      { label: "Learn Anytime", value: true, desc: "24/7 flexible access" },
      { label: "Project-Based", value: true, desc: "Real-world portfolios" },
      { label: "1:1 Mentorship", value: true, desc: "Dedicated career coach" },
      { label: "Personalized Path", value: true, desc: "AI-driven curriculum" },
      { label: "Job Guarantee", value: true, desc: "Money-back promise" },
      { label: "Live Updates", value: true, desc: "Industry-synced content" }
    ]
  }
};

const differentiators = [
  {
    icon: Users,
    title: "Expert-Led",
    stat: "50+",
    label: "Industry Instructors",
    description: "Learn directly from professionals at Google, Meta, and top tech companies"
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    stat: "98%",
    label: "Placement Rate",
    description: "Our graduates land jobs within 6 months of program completion"
  },
  {
    icon: Shield,
    title: "Risk-Free",
    stat: "100%",
    label: "Job Guarantee",
    description: "Full refund if you don't secure a job in your field within 180 days"
  },
  {
    icon: TrendingUp,
    title: "Future-Ready",
    stat: "240+",
    label: "Hours of Content",
    description: "Constantly updated curriculum matching industry demands"
  }
];

export function TheDifference() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* 2026 Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-blue-600/5 via-sky-500/5 to-cyan-400/5 dark:from-blue-500/10 dark:via-cyan-400/10 dark:to-blue-500/10 rounded-full blur-[150px]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 2026 Dramatic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <Badge 
            className="mb-6 px-4 py-2 text-sm font-semibold bg-blue-600/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm rounded-full inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Why Choose HDS
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Not Your Average{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500">
              Bootcamp
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See how HDS stacks up against traditional education and why thousands choose our approach.
          </p>
        </motion.div>

        {/* 2026 Comparison Cards - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {/* Traditional Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="relative h-full p-8 lg:p-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {comparisonData.traditional.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500">Old school approach</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {comparisonData.traditional.features.map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        {feature.label}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-500">
                        {feature.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* HDS Card - Highlighted */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            
            <Card className="relative h-full p-8 lg:p-10 bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-bold">
                RECOMMENDED
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-blue-100 dark:border-blue-900/30">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {comparisonData.hds.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">The future of learning</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {comparisonData.hds.features.map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                    onMouseEnter={() => setHoveredFeature(idx)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-default ${
                      hoveredFeature === idx
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800/50'
                    } border`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      hoveredFeature === idx
                        ? 'bg-blue-600 scale-110'
                        : 'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      <Check className={`w-4 h-4 transition-colors ${
                        hoveredFeature === idx ? 'text-white' : 'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div>
                      <div className={`font-semibold transition-colors ${
                        hoveredFeature === idx 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-slate-900 dark:text-white'
                      }`}>
                        {feature.label}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {feature.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* 2026 Differentiators Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-10">
            The HDS Advantage
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <Card className="relative h-full p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-sky-500/5 dark:from-blue-500/10 dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-sky-500/10 dark:from-blue-500/20 dark:to-cyan-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    {/* Stat */}
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {item.stat}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {item.label}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 2026 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5">
            <div className="px-6 py-3">
              <span className="text-slate-600 dark:text-slate-400">Ready to experience the difference?</span>
            </div>
            <Link href="/enroll">
            
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 flex items-center gap-2 hover:cursor-pointer">
              Start You Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            
          </div>
          
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Master Top Damanding skills • No credit card required • Left anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}