// components/enrollment/scholarship-selection.tsx
'use client';

import { motion } from 'framer-motion';
import { Award, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ✅ FIXED: Interface matches scholarshipData.ts exactly
interface Scholarship {
  id: string;
  isAvailable: boolean;
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  currency: string;
  duration: string;
  level: string;
  mode: string;
  description: string;
  discount: string;
  eligibility: string;
}

interface ScholarshipSelectionProps {
  onSelect: (scholarshipId: string | null) => void;
  onBack: () => void;
  scholarships: Scholarship[];
}

export function ScholarshipSelection({ onSelect, onBack, scholarships }: ScholarshipSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">
          Apply for Scholarship
        </h2>
        <p className="text-[#111827]/70 dark:text-white/70">
          Select a scholarship to get exclusive discounts on your course
        </p>
      </div>

      {/* Skip Option */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => onSelect(null)}
          className="w-full py-6 border-[#E5E7EB] dark:border-[#1F2937] text-[#111827] dark:text-white hover:bg-[#F9FAFB] dark:hover:bg-[#111827] rounded-xl"
        >
          Continue without scholarship
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {scholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            whileHover={scholarship.isAvailable ? { scale: 1.02 } : {}}
            whileTap={scholarship.isAvailable ? { scale: 0.98 } : {}}
          >
            <button
              onClick={() => scholarship.isAvailable && onSelect(scholarship.id)}
              disabled={!scholarship.isAvailable}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                scholarship.isAvailable
                  ? 'bg-[#F9FAFB] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1F2937] hover:border-[#3495EB]/50 hover:shadow-lg cursor-pointer'
                  : 'bg-[#F9FAFB]/50 dark:bg-[#111827]/50 border-[#E5E7EB]/50 dark:border-[#1F2937]/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#3495EB]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#3495EB]" />
                </div>
                {!scholarship.isAvailable && (
                  <Badge className="bg-[#111827]/10 dark:bg-white/10 text-[#111827]/60 dark:text-white/60 border-0 px-3 py-1 text-xs font-medium">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Closed
                  </Badge>
                )}
              </div>

              <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">
                {scholarship.title}
              </h3>
              
              <p className="text-sm text-[#111827]/60 dark:text-white/60 mb-4 line-clamp-2">
                {scholarship.description}
              </p>

              {/* ✅ FIXED: Better layout with eligibility */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                <div>
                  <div className="text-2xl font-bold text-[#3495EB]">
                    {scholarship.discount}
                  </div>
                  <div className="text-xs text-[#111827]/40 dark:text-white/40 mt-1">
                    Save {scholarship.originalPrice} {scholarship.currency}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#111827]/50 dark:text-white/50 mb-1">
                    Eligibility
                  </div>
                  <div className="text-xs font-medium text-[#111827]/70 dark:text-white/70 max-w-[120px]">
                    {scholarship.eligibility}
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-start">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#111827]/60 dark:text-white/60 hover:text-[#111827] dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
}