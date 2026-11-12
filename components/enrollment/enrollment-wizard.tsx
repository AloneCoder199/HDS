'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { EnrollmentTypeSelection } from './enrollment-type-selection';
import { MentorshipSelection } from './mentorship-selection';
import { EnrollmentForm } from './enrollment-form';
import { SubmitSuccess } from './submit-success';
import { mentorships } from '@/data/mentorship';

export type EnrollmentStep = 'type' | 'mentorship' | 'form' | 'success';

export interface EnrollmentData {
  type: 'REGULAR' | 'ONE_TO_ONE' | null;
  mentorshipSlug: string | null;
}

export function EnrollmentWizard() {
  const [step, setStep] = useState<EnrollmentStep>('type');
  const [data, setData] = useState<EnrollmentData>({
    type: null,
    mentorshipSlug: null,
  });

  const availableMentorships = mentorships;

  const handleTypeSelect = (type: 'REGULAR' | 'ONE_TO_ONE') => {
    setData((prev) => ({ ...prev, type }));
    setStep('mentorship');
  };

  const handleMentorshipSelect = (slug: string) => {
    setData((prev) => ({ ...prev, mentorshipSlug: slug }));
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'mentorship') setStep('type');
    if (step === 'form') setStep('mentorship');
  };

  const handleSuccess = () => setStep('success');

  const getStepNumber = () => {
    switch (step) {
      case 'type':
        return 1;
      case 'mentorship':
        return 2;
      case 'form':
        return 3;
      case 'success':
        return 4;
    }
  };

  const totalSteps = 3;

  const stepLabels = [
    { key: 'type', label: 'Learning Type' },
    { key: 'mentorship', label: 'Select Mentorship' },
    { key: 'form', label: 'Your Details' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`
                  flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-semibold
                  transition-all duration-300
                  ${
                    getStepNumber() >= num
                      ? 'bg-primary text-white shadow-glow scale-100'
                      : 'bg-muted text-muted-foreground scale-90'
                  }
                `}
              >
                {getStepNumber() > num ? (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  num
                )}
              </div>
              {num < totalSteps && (
                <div
                  className={`
                    mx-1 sm:mx-2 h-1 w-8 sm:w-16 rounded transition-colors duration-300
                    ${getStepNumber() > num ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step Labels */}
      {step !== 'success' && (
        <div className="flex justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-muted-foreground mb-8">
          {stepLabels.map((s) => (
            <span
              key={s.key}
              className={
                step === s.key ? 'text-primary-text font-semibold' : ''
              }
            >
              {s.label}
            </span>
          ))}
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
            transition={{ duration: 0.3 }}
          >
            <EnrollmentTypeSelection onSelect={handleTypeSelect} />
          </motion.div>
        )}

        {step === 'mentorship' && data.type && (
          <motion.div
            key="mentorship"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MentorshipSelection
              onSelect={handleMentorshipSelect}
              onBack={handleBack}
              mentorships={availableMentorships}
              type={data.type} // 🆕 Pass type
            />
          </motion.div>
        )}

        {step === 'form' && data.type && data.mentorshipSlug && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EnrollmentForm
              type={data.type}
              mentorshipSlug={data.mentorshipSlug}
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
            transition={{ duration: 0.4 }}
          >
            <SubmitSuccess />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}