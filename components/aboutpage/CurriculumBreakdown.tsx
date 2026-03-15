"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  Target, 
  Zap,
  ChevronDown,
  CheckCircle2,
  PlayCircle,
  Award,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const curriculumData = [
  {
    phase: "Phase 1",
    weeks: "Weeks 1-4",
    title: "Foundation & Fundamentals",
    description: "Master the core concepts and build your digital mindset",
    progress: 25,
    icon: BookOpen,
    color: "from-blue-600 to-blue-500",
    darkColor: "from-blue-500 to-cyan-400",
    modules: [
      { title: "Digital Landscape Overview", duration: "3h", type: "video" },
      { title: "Design Thinking Basics", duration: "4h", type: "interactive" },
      { title: "Tools & Software Setup", duration: "2h", type: "lab" },
      { title: "Project Management 101", duration: "3h", type: "video" }
    ],
    outcome: "Build your first digital portfolio piece",
    unlocked: true
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5-8",
    title: "Skill Development",
    description: "Deep dive into specialized tools and techniques",
    progress: 50,
    icon: Zap,
    color: "from-sky-500 to-cyan-500",
    darkColor: "from-cyan-400 to-blue-400",
    modules: [
      { title: "Advanced Design Systems", duration: "5h", type: "workshop" },
      { title: "Data Analytics Basics", duration: "4h", type: "interactive" },
      { title: "Content Strategy", duration: "3h", type: "video" },
      { title: "UX Research Methods", duration: "4h", type: "lab" }
    ],
    outcome: "Complete 3 real-world case studies",
    unlocked: true
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 9-12",
    title: "Specialization Track",
    description: "Choose your path: Marketing, Design, or Development",
    progress: 75,
    icon: Target,
    color: "from-cyan-500 to-teal-500",
    darkColor: "from-cyan-400 to-teal-400",
    modules: [
      { title: "Track Selection & Onboarding", duration: "2h", type: "mentorship" },
      { title: "Specialized Deep Dive", duration: "8h", type: "intensive" },
      { title: "Industry Tools Mastery", duration: "6h", type: "lab" },
      { title: "Portfolio Development", duration: "5h", type: "project" }
    ],
    outcome: "Industry-ready specialization certificate",
    unlocked: false
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 13-16",
    title: "Mastery & Career Launch",
    description: "Real projects, mentorship, and job placement support",
    progress: 100,
    icon: Award,
    color: "from-teal-500 to-emerald-500",
    darkColor: "from-teal-400 to-emerald-400",
    modules: [
      { title: "Capstone Project", duration: "20h", type: "project" },
      { title: "Client Simulation", duration: "8h", type: "workshop" },
      { title: "Interview Preparation", duration: "4h", type: "mentorship" },
      { title: "Career Launch Strategy", duration: "3h", type: "video" }
    ],
    outcome: "Job placement guarantee & alumni network access",
    unlocked: false
  }
];

const stats = [
  { value: "240+", label: "Learning Hours", icon: Clock },
  { value: "50+", label: "Hands-on Projects", icon: BarChart3 },
  { value: "1:1", label: "Mentorship", icon: Users },
  { value: "100%", label: "Job Support", icon: Target }
];

export function CurriculumBreakdown() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(0);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* 2026 Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-blue-600/5 via-sky-500/5 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 2026 Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 text-sm font-semibold bg-blue-600/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm rounded-full inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Structured Learning Path
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            16-Week{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500">
              Curriculum
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A meticulously designed program that transforms beginners into industry-ready professionals through hands-on learning.
          </p>
        </motion.div>

        {/* 2026 Bento Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/10 to-sky-500/10 dark:from-blue-500/20 dark:to-cyan-400/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2026 Interactive Accordion Timeline */}
        <div className="space-y-4">
          {curriculumData.map((phase, index) => (
            <PhaseCard
              key={phase.phase}
              phase={phase}
              index={index}
              isActive={activePhase === index}
              onClick={() => setActivePhase(activePhase === index ? null : index)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* 2026 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">Watch Curriculum Walkthrough</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">5 min overview video</div>
              </div>
            </div>
            <Link href="/enroll">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 flex items-center gap-2 group hover:cursor-pointer">
              Download Syllabus
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Phase Card Component
function PhaseCard({ 
  phase, 
  index, 
  isActive, 
  onClick,
  isInView 
}: { 
  phase: typeof curriculumData[0]; 
  index: number;
  isActive: boolean;
  onClick: () => void;
  isInView: boolean;
}) {
  const Icon = phase.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="relative"
    >
      <Card 
        onClick={onClick}
        className={`relative overflow-hidden cursor-pointer transition-all duration-500 border-0 ${
          isActive 
            ? 'bg-slate-50 dark:bg-slate-900 shadow-xl shadow-blue-500/5' 
            : 'bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50'
        }`}
      >
        {/* Progress Bar Background */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${phase.progress}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            className={`h-full bg-gradient-to-r ${phase.color} dark:${phase.darkColor}`}
          />
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex items-start gap-6">
            {/* Icon & Phase Info */}
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} dark:${phase.darkColor} flex items-center justify-center shadow-lg ${
                phase.unlocked ? 'shadow-blue-600/20' : 'shadow-slate-400/20 grayscale'
              }`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {phase.phase}
                    </span>
                    <Badge variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {phase.weeks}
                    </Badge>
                    {!phase.unlocked && (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {phase.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base">
                    {phase.description}
                  </p>
                </div>

                {/* Expand Indicator */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'border-blue-600 bg-blue-600 text-white rotate-180' 
                    : 'border-slate-300 dark:border-slate-700 text-slate-400'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Outcome Badge */}
              <div className="mt-4 flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${phase.unlocked ? 'text-amber-500' : 'text-slate-400'}`} />
                <span className={`text-sm font-medium ${phase.unlocked ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
                  {phase.outcome}
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                    Module Breakdown
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {phase.modules.map((module, idx) => (
                      <motion.div
                        key={module.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          phase.unlocked 
                            ? 'bg-gradient-to-br from-blue-600/10 to-sky-500/10 dark:from-blue-500/20 dark:to-cyan-400/20' 
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {phase.unlocked ? (
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {module.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                              {module.type}
                            </span>
                            <span className="text-xs text-slate-300 dark:text-slate-700">•</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {module.duration}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Phase CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>Total: 16 hours this phase</span>
                    </div>
                    
                    
                    <Link href="/courses">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:cursor-pointer font-medium transition-all duration-300 ${
                      phase.unlocked
                        ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}>
                      {phase.unlocked ? (
                        <>
                          Start Learning
                          <ArrowRight className="w-4 h-4 " />
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Locked
                        </>
                      )}
                    </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}