"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  PlayCircle,
  Award,
  Calendar,
  BookOpen,
  ArrowRight,
  Download,
  Shield,
  TrendingUp,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { coursesData } from "@/lib/CourseData";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const course = coursesData.find(c => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  const Icon = course.icon;

  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl ${course.gradient} opacity-5 dark:opacity-10 rounded-full blur-[150px]`} />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Left Content - 3 cols */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge className={`mb-6 px-4 py-2 ${course.bgColor} ${course.color} border ${course.borderColor} rounded-full`}>
                <Zap className="w-4 h-4 mr-2" />
                {course.category}
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                {course.title}
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {course.fullDescription}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center`}>
                    <Clock className={`w-6 h-6 ${course.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">Duration</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{course.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center`}>
                    <BookOpen className={`w-6 h-6 ${course.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">Content</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{course.hours}+ Hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center`}>
                    <Users className={`w-6 h-6 ${course.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">Students</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{course.students.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center`}>
                    <Star className={`w-6 h-6 ${course.color} fill-current`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">Rating</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{course.rating}/5.0</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/enroll">
                
                <Button 
                  size="lg"
                  className={`bg-linear-to-r ${course.gradient} text-white border-0 hover:cursor-pointer hover:opacity-90 px-8 py-6 text-lg rounded-xl`}
                >
                  Enroll Now - {course.price}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                </Link>
                <Link href="/contact">
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-slate-300 dark:border-slate-700 px-8 py-6 text-lg rounded-xl hover:cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Lets Contact
                </Button>
                </Link>
                
                
                
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
                <Shield className="w-4 h-4 inline mr-1" />
                Learn from Industry Perfessionals
              </p>
            </motion.div>
          </div>

          {/* Right Card - 2 cols */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${course.gradient} text-white overflow-hidden`}>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">What You'll Learn</h3>
                      <p className="text-white/80">{course.outcomes.length} key skills</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {course.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-white/80" />
                      <span className="font-semibold">Certificate Included</span>
                    </div>
                    <p className="text-sm text-white/70">{course.certification}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Curriculum Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">
            Course Curriculum
          </h2>

          <div className="space-y-4">
            {course.modules.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`text-sm font-bold ${course.color} mb-1`}>Module {idx + 1}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{module.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {module.duration}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  {module.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className={`w-4 h-4 ${course.color} flex-shrink-0`} />
                      {topic}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instructors */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">
            Learn from Industry Experts
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {course.instructors.map((instructor, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className={`w-16 h-16 rounded-full ${course.bgColor} flex items-center justify-center text-xl font-bold ${course.color}`}>
                  {instructor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{instructor.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{instructor.role}</p>
                  <p className={`text-sm font-medium ${course.color}`}>{instructor.company}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
            What's Included
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className={`w-10 h-10 rounded-lg ${course.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle2 className={`w-5 h-5 ${course.color}`} />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-10"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Join {course.students.toLocaleString()} students who have transformed their careers with {course.title}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enroll">
                
                <Button 
                  size="lg"
                  className={`bg-linear-to-r ${course.gradient} text-white border-0 hover:cursor-pointer hover:opacity-90 px-8 py-6 text-lg rounded-xl`}
                >
                  Enroll Now - {course.price}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                </Link>
            <Link href="/login">
                
                <Button 
              variant="outline" 
              size="lg"
              className="border-slate-300 dark:border-slate-700 px-8 py-6 text-lg rounded-xl hover:cursor-pointer"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Syllabus
            </Button>
                </Link>
            
          </div>
        </motion.div>
      </div>
    </main>
  );
}