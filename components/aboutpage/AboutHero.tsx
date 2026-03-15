"use client";

import Link from "next/link";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  ArrowRight, 
  Play,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, value: "10K+", label: "Students Trained" },
  { icon: Award, value: "500+", label: "Certifications" },
  { icon: Globe, value: "25+", label: "Countries" },
  { icon: GraduationCap, value: "50+", label: "Expert Instructors" },
];

const values = [
  { icon: Target, title: "Mission-Focused", desc: "Transforming careers through quality education" },
  { icon: Zap, title: "Industry-Ready", desc: "Practical skills that employers demand" },
  { icon: Award, title: "Recognized", desc: "ISO certified curriculum" },
];

export default function AboutHero() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-[#0B1220] overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3495EB]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bottom-25">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-white leading-[1.1] tracking-tight">
              Empowering the{" "}
              <span className="text-[#3495EB]">Next Generation</span>{" "}
              of Digital Professionals
            </h1>
            {/* Description */}
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed max-w-xl">
              HDS is a premier digital skills training agency dedicated to transforming 
              careers through cutting-edge education in technology, design, and digital marketing.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#3495EB]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#3495EB]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] dark:text-white">{item.title}</h3>
                    <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#1F2937] dark:hover:bg-[#F9FAFB] rounded-full px-8 font-semibold"
              >
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB] rounded-full px-8 font-semibold"
              >
                <Link href="/founder-story">
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Our Story
                </Link>
              </Button>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0B1220] bg-gradient-to-br from-[#3495EB] to-[#8B5CF6] flex items-center justify-center text-xs text-white font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[#9CA3AF]">
                Trusted by <strong className="text-[#111827] dark:text-white">10,000+</strong> students
              </span>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label}
                  className={cn(
                    "bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937]",
                    "hover:border-[#3495EB]/30 hover:shadow-lg hover:shadow-[#3495EB]/5 transition-all duration-300",
                    index === 0 && "col-span-2"
                  )}
                >
                  <CardContent className={cn(
                    "flex items-center gap-4",
                    index === 0 ? "p-8" : "p-6"
                  )}>
                    <div className={cn(
                      "rounded-xl bg-[#3495EB]/10 flex items-center justify-center",
                      index === 0 ? "w-16 h-16" : "w-12 h-12"
                    )}>
                      <stat.icon className={cn(
                        "text-[#3495EB]",
                        index === 0 ? "w-8 h-8" : "w-6 h-6"
                      )} />
                    </div>
                    <div>
                      <div className={cn(
                        "font-bold text-[#111827] dark:text-white",
                        index === 0 ? "text-4xl" : "text-2xl"
                      )}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#111827] rounded-xl p-4 shadow-xl border border-[#E5E7EB] dark:border-[#1F2937] hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111827] dark:text-white">Live Classes</div>
                  <div className="text-xs text-[#9CA3AF]">Happening now</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

















// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import Link from "next/link";
// import { 
//   GraduationCap, 
//   Users, 
//   Award, 
//   Globe, 
//   ArrowRight, 
//   Play,
//   Sparkles,
//   Zap
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// const stats = [
//   { icon: Users, value: "10K+", label: "Students Trained", suffix: "" },
//   { icon: Award, value: "500+", label: "Certifications", suffix: "" },
//   { icon: Globe, value: "25+", label: "Countries", suffix: "" },
//   { icon: GraduationCap, value: "50+", label: "Expert Instructors", suffix: "" },
// ];

// export function AboutHero() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <section 
//       ref={containerRef}
//       className="relative bottom-5 min-h-screen overflow-hidden bg-white dark:bg-slate-950"
//     >
//       {/* 2026 Animated Background Layer */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Primary Gradient Orb - Animated */}
//         <motion.div 
//           style={{ y }}
//           className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-sky-400/5 dark:from-blue-500/30 dark:via-blue-600/20 dark:to-cyan-400/10 rounded-full blur-[120px] animate-pulse"
//         />
        
//         {/* Secondary Orb - Counter movement */}
//         <motion.div 
//           style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
//           className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-blue-600/5 dark:from-cyan-400/20 dark:via-blue-500/10 dark:to-blue-600/5 rounded-full blur-[100px]"
//         />

//         {/* 2026 Grid Pattern Overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        
//         {/* Noise Texture for 2026 Grit */}
//         <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')] pointer-events-none" />
//       </div>
//       {/* Content Container */}
//       <motion.div 
//         style={{ opacity }}
//         className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-20  lg:pb-32 top-10"
//        >
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* Left Column - Text Content */}
//           <div className="order-2 lg:order-1 ">
//             {/* 2026 Floating Badge */}
            

//             {/* 2026 Hero Typography - Bold & Tight */}
//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//               className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
//             >
//               Empowering the{" "}
//               <span className="relative inline-block">
//                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-400">
//                   Next Gen
//                 </span>
//                 {/* Underline decoration */}
//                 <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-600/30 dark:text-blue-500/30" viewBox="0 0 200 9" fill="none">
//                   <path d="M2.00025 6.99997C18.4476 5.55539 55.9181 2.22206 107.556 2.22206C159.193 2.22206 196.111 4.44428 198.222 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                 </svg>
//               </span>
//               <br />
//               Digital Professionals
//             </motion.h1>

//             {/* Subtitle - 2026 Larger Body Text */}
//             <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//               className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl leading-relaxed font-light"
//             >
//               HDS is a premier digital skills training agency dedicated to transforming 
//               careers through cutting-edge education in technology, design, and digital marketing.
//             </motion.p>

//             {/* 2026 CTA Group - Glassmorphism Style */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//               className="flex flex-col sm:flex-row gap-4 mb-12"
//             >
//               <div className="flex flex-wrap gap-4">
//   {/* Courses Page Link */}
//   <Button 
//     asChild
//     size="lg" 
//     className="group relative bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-7 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/25 dark:hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
//   >
//     <Link href="/courses">
//       <span className="relative z-10 flex items-center gap-2">
//         Explore Our Courses
//         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//       </span>
//       {/* Shine effect */}
//       <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//     </Link>
//   </Button>
  
//   {/* Founder Story Link */}
//   <Button 
//     asChild
//     variant="outline" 
//     size="lg"
//     className="group border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-7 text-lg font-semibold rounded-2xl transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 backdrop-blur-sm"
//   >
//     <Link href="/founder-story" className="flex items-center">
//       <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
//       Watch Our Story
//     </Link>
//   </Button>
// </div>

//             </motion.div>

//             {/* Trust Indicators - 2026 Minimalist */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
//             >
//               <div className="flex -space-x-2">
//                 {[1,2,3,4].map((i) => (
//                   <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 border-2 border-white dark:border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
//                     {String.fromCharCode(64 + i)}
//                   </div>
//                 ))}
//               </div>
//               <span>Trusted by <strong className="text-slate-900 dark:text-white">10,000+</strong> students worldwide</span>
//             </motion.div>
//           </div>

//           {/* Right Column - 2026 Floating Stats Cards */}
//           <div className="order-1 lg:order-2 relative">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
//               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
//               transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//               className="relative"
//             >
//               {/* Main Stats Container - 2026 Glass Card */}
//               <div className="relative p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-blue-900/5 dark:shadow-blue-500/5">
//                 {/* Decorative Elements */}
//                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-sky-400/20 rounded-full blur-2xl" />
//                 <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl" />

//                 <div className="grid grid-cols-2 gap-4">
//                   {stats.map((stat, index) => (
//                     <motion.div
//                       key={stat.label}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ 
//                         duration: 0.5, 
//                         delay: 0.4 + index * 0.1,
//                         ease: [0.22, 1, 0.36, 1]
//                       }}
//                       whileHover={{ scale: 1.02, y: -2 }}
//                       className="group relative p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
//                     >
//                       {/* Icon */}
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-500 dark:to-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
//                         <stat.icon className="w-6 h-6 text-white" />
//                       </div>
                      
//                       {/* Value - 2026 Large Numbers */}
//                       <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
//                         {stat.value}
//                       </div>
                      
//                       {/* Label */}
//                       <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
//                         {stat.label}
//                       </div>

//                       {/* Hover Indicator */}
//                       <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-colors duration-300" />
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Bottom Accent Bar */}
//                 <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 opacity-50" />
//               </div>

//               {/* Floating Badge - 2026 Style */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.8 }}
//                 className="absolute -bottom-6 -left-6 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3"
//               >
//                 <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
//                   <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
//                 </div>
//                 <div>
//                   <div className="text-sm font-bold text-slate-900 dark:text-white">Live Classes</div>
//                   <div className="text-xs text-slate-500 dark:text-slate-400">Happening now</div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Bottom Scroll Indicator - 2026 Minimal */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
//       >
//         <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-2"
//         >
//           <div className="w-1 h-1.5 rounded-full bg-current" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }