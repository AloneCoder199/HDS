'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, ArrowRight, CheckCircle, GraduationCap, Award } from 'lucide-react';
import { EnrollmentTypeSelection } from './enrollment-type-selection';
import { CourseSelection } from './course-selection';
import { ScholarshipSelection } from './scholarship-selection';
import { EnrollmentForm } from './enrollment-form';
import { SubmitSuccess } from './submit-success';
import { coursesData } from '@/lib/CourseData';
import { scholarshipsData } from '@/lib/scholarshipData';

export type EnrollmentStep = 'type' | 'course' | 'scholarship' | 'form' | 'success';

export interface EnrollmentData {
  type: 'REGULAR' | 'ONE_TO_ONE' | null;
  courseId: string | null;
  scholarshipId: string | null;
}

export function EnrollmentWizard() {
  const [step, setStep] = useState<EnrollmentStep>('type');
  const [data, setData] = useState<EnrollmentData>({
    type: null,
    courseId: null,
    scholarshipId: null,
  });

  // Filter only available courses
  const availableCourses = coursesData.filter(course => course.isAvailable);

  // Filter only available scholarships
  const availableScholarships = scholarshipsData.filter(scholarship => scholarship.isAvailable);

  const handleTypeSelect = (type: 'REGULAR' | 'ONE_TO_ONE') => {
    setData(prev => ({ ...prev, type }));
    setStep('course');
  };

  const handleCourseSelect = (courseId: string) => {
    setData(prev => ({ ...prev, courseId }));
    // If scholarships available, go to scholarship step, else go to form
    if (availableScholarships.length > 0) {
      setStep('scholarship');
    } else {
      setStep('form');
    }
  };

  const handleScholarshipSelect = (scholarshipId: string | null) => {
    setData(prev => ({ ...prev, scholarshipId }));
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'course') setStep('type');
    if (step === 'scholarship') setStep('course');
    if (step === 'form') {
      if (availableScholarships.length > 0) {
        setStep('scholarship');
      } else {
        setStep('course');
      }
    }
  };

  const handleSuccess = () => {
    setStep('success');
  };

  const getStepNumber = () => {
    switch (step) {
      case 'type': return 1;
      case 'course': return 2;
      case 'scholarship': return 3;
      case 'form': return availableScholarships.length > 0 ? 4 : 3;
      case 'success': return availableScholarships.length > 0 ? 5 : 4;
    }
  };

  const totalSteps = availableScholarships.length > 0 ? 4 : 3;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="flex items-center justify-center space-x-4 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
            <div key={num} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${getStepNumber() >= num 
                  ? 'bg-[#3495EB] text-white' 
                  : 'bg-[#E5E7EB] dark:bg-[#1F2937] text-[#111827]/50 dark:text-white/50'}
              `}>
                {getStepNumber() > num ? <CheckCircle className="w-5 h-5" /> : num}
              </div>
              {num < totalSteps && (
                <div className={`
                  w-16 h-1 mx-2 rounded
                  ${getStepNumber() > num 
                    ? 'bg-[#3495EB]' 
                    : 'bg-[#E5E7EB] dark:bg-[#1F2937]'}
                `} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step Labels */}
      {step !== 'success' && (
        <div className="flex justify-center space-x-8 text-sm text-[#111827]/70 dark:text-white/70 mb-8">
          <span className={step === 'type' ? 'text-[#3495EB] font-semibold' : ''}>Learning Type</span>
          <span className={step === 'course' ? 'text-[#3495EB] font-semibold' : ''}>Select Course</span>
          {availableScholarships.length > 0 && (
            <span className={step === 'scholarship' ? 'text-[#3495EB] font-semibold' : ''}>Scholarship</span>
          )}
          <span className={step === 'form' ? 'text-[#3495EB] font-semibold' : ''}>Your Details</span>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === 'type' && (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EnrollmentTypeSelection onSelect={handleTypeSelect} />
          </motion.div>
        )}

        {step === 'course' && (
          <motion.div
            key="course"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CourseSelection 
              onSelect={handleCourseSelect} 
              onBack={handleBack}
              courses={availableCourses} // Only available courses
            />
          </motion.div>
        )}

        {step === 'scholarship' && availableScholarships.length > 0 && (
          <motion.div
            key="scholarship"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ScholarshipSelection 
              onSelect={handleScholarshipSelect}
              onBack={handleBack}
              scholarships={availableScholarships}
            />
          </motion.div>
        )}

        {step === 'form' && data.type && data.courseId && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EnrollmentForm
              type={data.type}
              courseId={data.courseId}
              scholarshipId={data.scholarshipId}
              onBack={handleBack}
              onSuccess={handleSuccess}
            />
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <SubmitSuccess />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}