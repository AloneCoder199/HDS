
// LearningProcess.tsx - Unique Professional "Learning Process" Section
// Hassan Digital Skills (HDS) - SaaS Level Design, Speed Optimized
// Innovative step-by-step visualization with modern interactions
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search,
  BookOpen,
  PlayCircle,
  Code2,
  Award,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
  Users,
  Trophy,
  ChevronRight,
  GraduationCap,
  Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Step data structure
interface LearningStep {
  id: number;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  outcome: string;
  color: string;
  features: string[];
}

// Learning process steps
const learningSteps: LearningStep[] = [
  {
    id: 1,
    icon: <Search className="w-6 h-6" />,
    activeIcon: <Lightbulb className="w-6 h-6" />,
    title: 'Discover',
    subtitle: 'Find Your Path',
    description: 'Take our AI-powered assessment to identify your current skills and career goals. Get personalized course recommendations tailored to your learning style.',
    duration: '5-10 mins',
    outcome: 'Personalized Learning Path',
    color: 'from-violet-500 to-purple-600',
    features: ['Skill Assessment', 'Career Mapping', 'Goal Setting']
  },
  {
    id: 2,
    icon: <BookOpen className="w-6 h-6" />,
    activeIcon: <Layers className="w-6 h-6" />,
    title: 'Learn',
    subtitle: 'Master the Skills',
    description: 'Engage with interactive video lessons, coding exercises, and real-world projects. Learn at your own pace with lifetime access to all course materials.',
    duration: '4-12 weeks',
    outcome: 'In-Demand Skills',
    color: 'from-blue-500 to-blue-600',
    features: ['Video Lessons', 'Hands-on Labs', 'Quizzes & Assessments']
  },
  {
    id: 3,
    icon: <Code2 className="w-6 h-6" />,
    activeIcon: <Zap className="w-6 h-6" />,
    title: 'Practice',
    subtitle: 'Build Real Projects',
    description: 'Apply your knowledge by building portfolio-worthy projects. Get feedback from mentors and collaborate with peers in our coding community.',
    duration: 'Ongoing',
    outcome: 'Portfolio Projects',
    color: 'from-sky-500 to-cyan-500',
    features: ['Real Projects', 'Code Reviews', 'Peer Collaboration']
  },
  {
    id: 4,
    icon: <Users className="w-6 h-6" />,
    activeIcon: <Target className="w-6 h-6" />,
    title: 'Mentorship',
    subtitle: 'Expert Guidance',
    description: 'Connect with industry mentors for 1-on-1 guidance. Get your questions answered and receive career advice from professionals working at top companies.',
    duration: 'Weekly Sessions',
    outcome: 'Professional Network',
    color: 'from-teal-500 to-emerald-500',
    features: ['1-on-1 Mentoring', 'Career Advice', 'Interview Prep']
  },
  {
    id: 5,
    icon: <Award className="w-6 h-6" />,
    activeIcon: <Trophy className="w-6 h-6" />,
    title: 'Certify',
    subtitle: 'Get Recognized',
    description: 'Earn industry-recognized certificates upon completion. Validate your skills with credentials that employers trust and value.',
    duration: 'On Completion',
    outcome: 'Official Certificate',
    color: 'from-amber-500 to-orange-500',
    features: ['Digital Certificate', 'LinkedIn Integration', 'Badge System']
  },
  {
    id: 6,
    icon: <Briefcase className="w-6 h-6" />,
    activeIcon: <GraduationCap className="w-6 h-6" />,
    title: 'Launch',
    subtitle: 'Start Your Career',
    description: 'Access our job placement support, resume reviews, and interview preparation. Join our alumni network and land your dream job.',
    duration: 'Lifetime Support',
    outcome: 'Dream Job',
    color: 'from-rose-500 to-pink-600',
    features: ['Job Placement', 'Resume Review', 'Interview Support']
  }
];

// Progress Connector Component
const ProgressConnector: React.FC<{ active: boolean; completed: boolean }> = ({ active, completed }) => (
  <div className="hidden lg:flex flex-col items-center py-4">
    <div className={`w-1 h-16 rounded-full transition-all duration-500 ${
      completed 
        ? 'bg-gradient-to-b from-blue-500 to-blue-600' 
        : active 
          ? 'bg-gradient-to-b from-blue-500/50 to-blue-600/50' 
          : 'bg-slate-200 dark:bg-slate-800'
    }`} />
  </div>
);

// Step Card Component
const StepCard: React.FC<{ 
  step: LearningStep; 
  isActive: boolean; 
  isCompleted: boolean;
  onClick: () => void;
}> = ({ step, isActive, isCompleted, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative cursor-pointer transition-all duration-300 ${
        isActive ? 'lg:scale-105' : 'hover:lg:scale-102'
      }`}
    >
      <Card className={`relative overflow-hidden border-2 transition-all duration-300
        ${isActive 
          ? 'border-blue-500 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/20' 
          : isCompleted
            ? 'border-blue-300 dark:border-blue-700'
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }
        ${isActive || isCompleted ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'}
      `}>
        {/* Step Number Badge */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center
                        text-white font-bold text-lg shadow-lg transition-all duration-300
                        ${isActive || isCompleted 
                          ? 'bg-gradient-to-br ' + step.color 
                          : 'bg-slate-300 dark:bg-slate-700'
                        } ${isActive ? 'scale-110' : ''}`}>
          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <Badge className="absolute top-4 right-4 bg-emerald-500 text-white border-0">
            Completed
          </Badge>
        )}

        <CardContent className="p-6 pt-8">
          {/* Icon & Title Row */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                            transition-all duration-300
                            ${isActive 
                              ? 'bg-gradient-to-br ' + step.color + ' text-white shadow-lg' 
                              : isCompleted
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500'
                            }`}>
              {isActive ? step.activeIcon : step.icon}
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-1 transition-colors duration-300
                             ${isActive 
                               ? 'text-blue-600 dark:text-blue-400' 
                               : 'text-slate-900 dark:text-slate-100'
                             }`}>
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-4 transition-all duration-300
                        ${isActive 
                          ? 'text-slate-700 dark:text-slate-300' 
                          : 'text-slate-600 dark:text-slate-400'
                        }`}>
            {step.description}
          </p>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {step.features.map((feature, idx) => (
              <span 
                key={idx}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors duration-300
                           ${isActive || isCompleted
                             ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                             : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500'
                           }`}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Duration & Outcome */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{step.duration}</span>
            </div>
            <div className={`text-xs font-semibold transition-colors duration-300
                           ${isActive || isCompleted
                             ? 'text-emerald-600 dark:text-emerald-400'
                             : 'text-slate-400 dark:text-slate-600'
                           }`}>
              → {step.outcome}
            </div>
          </div>
        </CardContent>

        {/* Active Indicator Bar */}
        {isActive && (
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
        )}
      </Card>
    </div>
  );
};

// Timeline View Component (Alternative Layout)
const TimelineView: React.FC<{ 
  steps: LearningStep[]; 
  activeStep: number;
  completedSteps: number[];
  onStepClick: (id: number) => void;
}> = ({ steps, activeStep, completedSteps, onStepClick }) => {
  return (
    <div className="hidden lg:block">
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 
                        bg-gradient-to-b from-violet-500 via-blue-500 to-rose-500 
                        rounded-full opacity-20" />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isCompleted = completedSteps.includes(step.id);
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={step.id}
                className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${isLeft ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div 
                    onClick={() => onStepClick(step.id)}
                    className={`inline-block cursor-pointer transition-all duration-300 ${
                      isActive ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    <div className={`p-6 rounded-2xl border-2 transition-all duration-300
                                    ${isActive 
                                      ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10' 
                                      : isCompleted
                                        ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-700'
                                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                                    }`}>
                      <h3 className={`text-lg font-bold mb-2 ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {step.subtitle}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {step.duration} • {step.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center
                                  transition-all duration-300 shadow-lg
                                  ${isActive 
                                    ? 'bg-gradient-to-br ' + step.color + ' text-white scale-110' 
                                    : isCompleted
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700'
                                  }`}>
                    {isCompleted && !isActive ? <CheckCircle2 className="w-7 h-7" /> : step.icon}
                  </div>

                  {/* Pulse Effect for Active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
                  )}
                </div>

                {/* Empty Space for Alignment */}
                <div className="flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Section Component
const LearningProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Auto-progress demo effect (can be removed in production)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleStepClick = (id: number) => {
    setActiveStep(id);
    if (!completedSteps.includes(id)) {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <Badge className="mb-6 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 
                           border-blue-500/20 dark:border-blue-500/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            How It Works
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 
                         tracking-tight">
            Your Learning <span className="text-blue-600 dark:text-blue-400">Journey</span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A proven 6-step methodology designed to take you from beginner to job-ready professional. 
            Follow the path that thousands of successful students have taken.
          </p>
        </div>

        {/* Mobile & Tablet: Grid View */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningSteps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={step.id === activeStep}
                isCompleted={completedSteps.includes(step.id)}
                onClick={() => handleStepClick(step.id)}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Timeline View */}
        <div className="hidden lg:block">
          <TimelineView 
            steps={learningSteps}
            activeStep={activeStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-2 p-2 rounded-full 
                          bg-white dark:bg-slate-900 
                          border border-slate-200 dark:border-slate-800 shadow-lg">
            {learningSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step.id === activeStep
                    ? 'w-8 bg-gradient-to-r ' + step.color
                    : completedSteps.includes(step.id)
                      ? 'bg-blue-500'
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 
                          bg-gradient-to-r from-blue-600 to-sky-500 
                          dark:from-blue-500 dark:to-sky-400
                          rounded-2xl p-8 shadow-xl shadow-blue-500/20">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-blue-100 text-sm">
                Join 15,000+ students already learning with HDS
              </p>
            </div>
            <Link href="/courses">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-600 
                         shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Start Learning Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button></Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 
                        text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Step-by-Step Guidance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Progress Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Community Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add Clock icon component since it's used but not imported
const Clock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default LearningProcess;