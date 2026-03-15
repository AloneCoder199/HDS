'use client';

import { motion } from 'framer-motion';
import { Users, User, ArrowRight } from 'lucide-react';

interface Props {
  onSelect: (type: 'REGULAR' | 'ONE_TO_ONE') => void;
}

export function EnrollmentTypeSelection({ onSelect }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Regular Class Option */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('REGULAR')}
        className="group relative p-8 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-left"
      >
        <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Regular Class
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Group learning environment with scheduled classes, peer interaction, and collaborative projects.
        </p>
        
        <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Group discussions & networking
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Fixed class schedule
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Affordable pricing
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Team projects
          </li>
        </ul>
        
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
          Select Regular <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </motion.button>

      {/* One-to-One Option */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('ONE_TO_ONE')}
        className="group relative p-8 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all text-left"
      >
        <div className="absolute top-4 right-4 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
          PREMIUM
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 mt-6">
          One-to-One Session
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Personalized learning with dedicated mentor, flexible scheduling, and custom curriculum.
        </p>
        
        <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
            Personal mentor assignment
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
            Flexible timing
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
            Custom learning pace
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
            Direct doubt clearing
          </li>
        </ul>
        
        <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
          Select One-to-One <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </motion.button>
    </div>
  );
}