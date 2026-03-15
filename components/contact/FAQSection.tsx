// components/contact/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What courses does HDS offer?',
    answer: 'We offer comprehensive courses in Full Stack Development (MERN, Next.js), UI/UX Design, Digital Marketing, Data Analytics, Mobile App Development, and AI/ML Fundamentals. All courses are designed for beginners to advanced learners.',
  },
  {
    question: 'How long are the courses?',
    answer: 'Course duration varies: Short courses run 4-8 weeks, professional certifications take 3-6 months, and our complete diploma programs span 12-18 months. We offer both part-time and full-time options.',
  },
  {
    question: 'Do you provide certificates after completion?',
    answer: 'Yes! All students receive industry-recognized certificates upon successful course completion. Our certificates are valued by employers across Pakistan and internationally.',
  },
  {
    question: 'Is there any job placement assistance?',
    answer: 'Absolutely. We have dedicated career services including resume building, interview preparation, and direct connections with our 100+ hiring partners. 85% of our graduates find employment within 3 months.',
  },
  {
    question: 'Can I pay in installments?',
    answer: 'Yes, we offer flexible payment plans. You can pay in up to 6 monthly installments for most courses. We also offer scholarships for deserving students based on merit and need.',
  },
  {
    question: 'Do you offer online classes?',
    answer: 'Yes! We offer both in-person classes at our Lahore campus and live online classes with interactive sessions. All sessions are recorded for later review.',
  },
  {
    question: 'What is the class schedule?',
    answer: 'We have flexible timings: Morning (9AM-12PM), Afternoon (2PM-5PM), and Evening (6PM-9PM) batches. Weekend classes are also available for working professionals.',
  },
  {
    question: 'Do you provide corporate training?',
    answer: 'Yes, we specialize in corporate training programs for companies looking to upskill their teams. We customize curriculum based on your organization needs.',
  },
  {
    question: 'What are the prerequisites for joining?',
    answer: 'Most beginner courses require only basic computer literacy. For advanced technical courses, we conduct a free assessment to recommend the right starting point for you.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach us via this contact form, email at info@hassandigitalskills.com, phone at +92-300-1234567, or visit our Lahore campus. We typically respond within 24 hours.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium border border-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20 mb-4">
              <HelpCircle className="inline h-4 w-4 mr-2" />
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Find answers to common questions about HDS courses and services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}