"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  GraduationCap,
  X,
  ChevronDown,
  TrendingUp,
  Award,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { coursesData, categories, levels, CourseCategory,Course,CourseLevel } from "@/lib/CourseData";
import Link from "next/link";

export default function CoursesPage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const activeFiltersCount = (selectedCategory !== "all" ? 1 : 0) + (selectedLevel !== "all" ? 1 : 0);

  return (
    <main className="relative min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] overflow-hidden pt-10">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#3495EB]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-[#3495EB]/10 dark:bg-[#3495EB]/15 text-[#347ce0] dark:text-[#3495EB] border border-[#3495EB]/20 dark:border-[#3495EB]/30 backdrop-blur-sm rounded-full inline-flex items-center gap-2 ">
            <GraduationCap className="w-4 h-4" />
            12 Professional Courses
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] dark:text-white mb-6">
            Master In-Demand{" "}
            <span className="text-[#3495EB]">
              Skills
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[#111827]/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            Industry-aligned programs designed to take you from beginner to job-ready professional.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 dark:text-white/40" />
            <Input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] focus:border-[#3495EB] focus:ring-[#3495EB] text-[#111827] dark:text-white placeholder:text-[#111827]/40 dark:placeholder:text-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E5E7EB] dark:bg-[#1F2937] flex items-center justify-center text-[#111827]/60 dark:text-white/60 hover:text-[#111827] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full px-6 py-5 border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white hover:bg-[#F9FAFB] dark:hover:bg-[#111827]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-[#3495EB] text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
                className="text-[#111827]/60 dark:text-white/60 hover:text-[#111827] dark:hover:text-white"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#111827] dark:text-white mb-3 uppercase tracking-wider">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedCategory === cat.id
                              ? 'bg-[#3495EB] text-white shadow-lg shadow-[#3495EB]/20'
                              : 'bg-white dark:bg-[#0B1220] text-[#111827]/70 dark:text-white/70 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50'
                          }`}
                        >
                          {cat.label}
                          <span className="ml-2 opacity-60">({cat.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#111827] dark:text-white mb-3 uppercase tracking-wider">Level</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedLevel("all")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedLevel === "all"
                            ? 'bg-[#3495EB] text-white shadow-lg shadow-[#3495EB]/20'
                            : 'bg-white dark:bg-[#0B1220] text-[#111827]/70 dark:text-white/70 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50'
                        }`}
                      >
                        All Levels
                      </button>
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedLevel === level
                              ? 'bg-[#3495EB] text-white shadow-lg shadow-[#3495EB]/20'
                              : 'bg-white dark:bg-[#0B1220] text-[#111827]/70 dark:text-white/70 border border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <span className="text-[#111827]/70 dark:text-white/70">
            Showing <strong className="text-[#111827] dark:text-white">{filteredCourses.length}</strong> courses
          </span>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#F9FAFB] dark:bg-[#111827] flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-[#111827]/40 dark:text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] dark:text-white mb-2">No courses found</h3>
            <p className="text-[#111827]/70 dark:text-white/70">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center p-12 rounded-3xl bg-[#3495EB] text-white"
        >
          <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Not sure which course to pick?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Book a free consultation with our career advisors. We'll help you choose the perfect path based on your goals.
          </p>
          <Link href="/contact">
          <Button 
            size="lg"
            className="bg-white text-[#3495EB] hover:bg-[#F9FAFB] px-8 py-6 text-lg rounded-xl font-semibold hover:cursor-pointer border-0"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          </Link>
          
        </motion.div>
      </div>
    </main>
  );
}

// Course Card Component
function CourseCard({ 
  course, 
  index 
}: { 
  course: typeof coursesData[0]; 
  index: number;
}) {
  const Icon = course.icon;
  const isAvailable = course.isAvailable;
  
  const CardWrapper = (isAvailable ? Link : 'div') as any;
  const cardProps = isAvailable ? { href: `/courses/${course.slug}` } : {};
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <CardWrapper {...cardProps} className="block h-full">
        <div className={`group relative h-full bg-[#F9FAFB] dark:bg-[#111827] rounded-3xl border border-[#E5E7EB] dark:border-[#1F2937] overflow-hidden transition-all duration-500 ${
          isAvailable 
            ? 'hover:border-[#3495EB]/50 hover:shadow-xl hover:shadow-[#3495EB]/5 cursor-pointer' 
            : 'opacity-75 cursor-not-allowed'
        }`}>
          
          {/* Top Accent Line - Only for available courses */}
          {isAvailable && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#3495EB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          )}

          {/* Coming Soon Badge */}
          {!isAvailable && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-[#111827]/80 dark:bg-black/80 text-white border-0 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Lock className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </div>
          )}

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center ${isAvailable ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${course.color}`} />
              </div>
              
              {/* Price badge only for available courses */}
              {isAvailable && course.originalPrice && (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-[#111827]/40 dark:text-white/40 line-through">${course.originalPrice}</span>
                  <Badge className={`${course.bgColor} ${course.color} border-0`}>
                    Save ${course.originalPrice - course.price}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className={`text-lg font-bold text-[#111827] dark:text-white mb-2 transition-all duration-300 line-clamp-1 ${
              isAvailable ? 'group-hover:text-[#3495EB]' : ''
            }`}>
              {course.title}
            </h3>
            
            <p className="text-sm text-[#111827]/60 dark:text-white/60 mb-4 line-clamp-2">
              {course.shortDesc}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 rounded-md bg-white dark:bg-[#0B1220] text-xs font-medium text-[#111827]/70 dark:text-white/70 border border-[#E5E7EB] dark:border-[#1F2937]">
                {course.level}
              </span>
              <span className="px-2 py-1 rounded-md bg-white dark:bg-[#0B1220] text-xs font-medium text-[#111827]/70 dark:text-white/70 border border-[#E5E7EB] dark:border-[#1F2937]">
                {course.duration}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 py-4 border-t border-[#E5E7EB] dark:border-[#1F2937]">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#111827]/40 dark:text-white/40" />
                <span className="text-sm text-[#111827]/60 dark:text-white/60">{course.hours}h</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#111827]/40 dark:text-white/40" />
                <span className="text-sm text-[#111827]/60 dark:text-white/60">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-medium text-[#111827] dark:text-white">{course.rating}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                {isAvailable ? (
                  <span className="text-2xl font-bold text-[#111827] dark:text-white">${course.price}</span>
                ) : (
                  <span className="text-sm font-medium text-[#111827]/50 dark:text-white/50 italic">Not available</span>
                )}
              </div>
              
              {isAvailable ? (
                <div className="w-10 h-10 rounded-xl bg-[#3495EB]/10 flex items-center justify-center group-hover:bg-[#3495EB] transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-[#3495EB] group-hover:text-white transition-colors" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#E5E7EB] dark:bg-[#1F2937] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#111827]/30 dark:text-white/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}