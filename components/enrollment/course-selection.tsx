'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BarChart3, ChevronRight } from 'lucide-react';
import { Course } from '@/lib/CourseData';
import Image from 'next/image';

interface Props {
  onSelect: (courseId: string) => void;
  onBack: () => void;
  courses: Course[];
}

export function CourseSelection({ onSelect, onBack, courses }: Props) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learning Type
      </button>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Select Your Course
      </h2>

      <div className="grid gap-4">
        {courses.map((course, index) => (
          <motion.button
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(course.id)}
            className="group flex items-start p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-left"
          >
            <div className={`
              w-16 h-16 rounded-xl flex items-center justify-center mr-6 flex-shrink-0
              ${course.bgColor}
            `}>
              <course.icon className={`w-8 h-8 ${course.color}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                {course.shortDesc}
              </p>

              <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  {course.level}
                </span>
                <span className={`
                  px-2 py-0.5 rounded-full font-medium
                  ${course.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  ${course.level === 'Advanced' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                `}>
                  {course.level}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}