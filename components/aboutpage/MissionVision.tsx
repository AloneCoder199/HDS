"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Target, Eye, Sparkles, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative py-24 lg:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* 2026 Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Glow Orb */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-sky-500/5 dark:bg-cyan-400/10 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 2026 Bold Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4" />
            Our Purpose
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Why We Exist
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Building the bridge between ambition and expertise in the digital age
          </p>
        </motion.div>

        {/* Split Layout - 2026 Trend */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="group relative h-full p-8 lg:p-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 overflow-hidden">
              {/* Glassmorphism Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-sky-500/5 dark:from-blue-500/10 dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-600/20 to-transparent dark:from-blue-500/20 rounded-bl-full" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>

                {/* Label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                    Our Mission
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title - 2026 Heroic Typography */}
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  Democratizing Digital Excellence
                </h3>

                {/* Description */}
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  To empower individuals and organizations worldwide with accessible, 
                  industry-leading digital education that transforms careers and drives 
                  economic growth in the technology sector.
                </p>

                {/* Key Points - Minimalist 2026 Style */}
                <ul className="space-y-3">
                  {[
                    "Accessible education for all skill levels",
                    "Industry-aligned curriculum",
                    "Practical, hands-on learning approach"
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span className="text-sm font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="group relative h-full p-8 lg:p-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-cyan-700 transition-all duration-500 overflow-hidden">
              {/* Glassmorphism Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-cyan-400/5 dark:from-cyan-400/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/20 to-transparent dark:from-cyan-400/20 rounded-bl-full" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-sky-500 dark:bg-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20 dark:shadow-cyan-400/20 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>

                {/* Label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold tracking-wider text-sky-600 dark:text-cyan-400 uppercase">
                    Our Vision
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-sky-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  A World of Digital Leaders
                </h3>

                {/* Description */}
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  To become the global catalyst for digital transformation, creating 
                  a future where every professional has the skills to thrive in a 
                  technology-driven economy.
                </p>

                {/* Key Points */}
                <ul className="space-y-3">
                  {[
                    "Global network of 1M+ skilled professionals",
                    "Leading tech education platform worldwide",
                    "Driving innovation through human capital"
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400" />
                      <span className="text-sm font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA - 2026 Minimalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Ready to be part of our mission?
            </span>
            <Link href="/enroll">
            
            <button className="text-blue-600 hover:cursor-pointer dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 group">
              Join HDS
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            </Link>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}