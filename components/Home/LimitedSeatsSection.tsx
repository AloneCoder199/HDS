// app/components/LimitedSeatsSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from 'next/link';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Flame,
  Calendar,
  Zap,
  BookOpen,
  ShieldCheck,
  Star,
  Timer
} from "lucide-react";

interface SeatCounterProps {
  totalSeats: number;
  filledSeats: number;
}

const SeatCounter = ({ totalSeats, filledSeats }: SeatCounterProps) => {
  const [animatedSeats, setAnimatedSeats] = useState(filledSeats);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedSeats(filledSeats);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, filledSeats]);

  const percentage = Math.round((animatedSeats / totalSeats) * 100);
  const remainingSeats = totalSeats - animatedSeats;

  return (
    <div ref={ref} className="w-full">
      {/* Progress Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Flame className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            Filling Fast!
          </span>
        </div>
        <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
          {remainingSeats} seats left
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-[#E5E7EB] dark:bg-[#1F2937]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full bg-[#3495EB]"
        />
        <div className="absolute inset-0 animate-pulse bg-white/20" />
      </div>
      {/* Stats Row */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-[#6B7280] dark:text-[#9CA3AF]">
          <Users className="h-4 w-4" />
          <span>{animatedSeats.toLocaleString()} enrolled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#111827] dark:text-white">{percentage}%</span>
          <span className="text-[#6B7280] dark:text-[#9CA3AF]">filled</span>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#111827] text-white shadow-lg dark:bg-white dark:text-[#111827] sm:h-16 sm:w-16">
        <span className="text-xl font-bold sm:text-2xl">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1 text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-[#3495EB]">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-[#3495EB]">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-[#3495EB]">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const BenefitItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-3 dark:border-[#1F2937] dark:bg-[#111827]">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3495EB]/10 dark:bg-[#3495EB]/20">
      <Icon className="h-4 w-4 text-[#3495EB]" />
    </div>
    <span className="text-sm font-medium text-[#111827] dark:text-white">{text}</span>
  </div>
);

const RecentEnrollment = ({ name, course, time }: { name: string; course: string; time: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white/80 p-3 backdrop-blur-sm dark:border-[#1F2937] dark:bg-[#111827]/80"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-sm font-bold text-[#8B5CF6] dark:bg-[#8B5CF6]/20">
      {name.split(' ').map(n => n[0]).join('')}
    </div>
    <div className="flex-1 min-w-0">
      <p className="truncate text-sm font-medium text-[#111827] dark:text-white">
        {name} enrolled in
      </p>
      <p className="truncate text-xs text-[#3495EB]">{course}</p>
    </div>
    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{time}</span>
  </motion.div>
);

export default function LimitedSeatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [recentEnrollments, setRecentEnrollments] = useState([
    { name: "Ali Khan", course: "Digital Marketing Pro", time: "2 min ago" },
    { name: "Sara Ahmed", course: "Web Development", time: "5 min ago" },
  ]);

  useEffect(() => {
    const names = ["Fatima Raza", "Usman Ali", "Ayesha Malik", "Bilal Hassan", "Zara Khan"];
    const courses = ["Digital Marketing Pro", "Web Development", "Graphic Design", "SEO Mastery"];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCourse = courses[Math.floor(Math.random() * courses.length)];
      
      setRecentEnrollments(prev => {
        const newEnrollment = { name: randomName, course: randomCourse, time: "Just now" };
        const updated = [newEnrollment, ...prev.slice(0, 2)];
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F9FAFB] py-20 dark:bg-[#0B1220] sm:py-28"
    >
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3495EB 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 dark:border-red-900/50 dark:bg-red-900/20"
          >
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Enrollment Closing Soon
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-4xl lg:text-5xl"
          >
            Limited Seats Available
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-[#6B7280] dark:text-[#9CA3AF] sm:text-lg"
          >
            Our batches fill up quickly. Secure your spot in Pakistan's most sought-after 
            digital skills training program before it's too late.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm dark:border-[#1F2937] dark:bg-[#111827] sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3495EB]/10 dark:bg-[#3495EB]/20">
                  <Users className="h-5 w-5 text-[#3495EB]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white">
                    Batch #47 - March 2026
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    Starting March 25, 2026
                  </p>
                </div>
              </div>

              <SeatCounter totalSeats={100} filledSeats={87} />

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  <Calendar className="h-4 w-4 text-[#3495EB]" />
                  <span>Duration: 12 Weeks (Online Live Classes)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  <Clock className="h-4 w-4 text-[#3495EB]" />
                  <span>Class Timing: 8:00 PM - 10:00 PM (PKT)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  <Star className="h-4 w-4 text-[#3495EB]" />
                  <span>Certificate + Internship Opportunity</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-900/10 sm:p-8">
              <div className="mb-4 text-center">
                <div className="inline-flex items-center gap-2">
                  <Timer className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
                    Enrollment Closes In
                  </h3>
                </div>
                <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Don't miss out on this opportunity
                </p>
              </div>
              <CountdownTimer />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#111827] p-6 text-white dark:bg-[#111827] sm:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3495EB]/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

              <div className="relative">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    Reserve Your Seat Now
                  </h3>
                  <p className="mt-2 text-white/70">
                    Join 15,000+ successful students. Next batch starts March 25, 2026.
                  </p>
                </div>

                <div className="mb-6 space-y-3">
                  <BenefitItem icon={BookOpen} text="Complete Course Materials" />
                  <BenefitItem icon={Zap} text="Live Interactive Sessions" />
                  <BenefitItem icon={ShieldCheck} text="Industry-Recognized Certificate" />
                  <BenefitItem icon={TrendingUp} text="Job Placement Assistance" />
                </div>

                <div className="mb-6 rounded-xl bg-white/10 p-4 border border-white/5">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-[#3495EB]">
        Limited Time Offer
      </p>
      <div className="mt-1 flex items-baseline gap-3">
        {/* New Price */}
        <span className="text-4xl font-extrabold text-white">
          PKR 100
        </span>
        {/* Old Price with Cut (Line-through) */}
        <span className="text-lg font-medium text-white/40 line-through decoration-red-500/50">
          PKR 25,000
        </span>
      </div>
    </div>
    
    {/* 99% OFF Badge */}
    <div className="animate-pulse rounded-lg bg-red-600 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-red-600/20">
      99% OFF
    </div>
  </div>
</div>


                <div className="space-y-3">
  {/* Enroll Now Button - Enrollment Page par le jaye ga */}
  <Link href="/enroll" className="block w-full">
    <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3495EB] py-4 text-base font-bold transition-all duration-200 hover:bg-[#347ce0] hover:shadow-lg hover:shadow-[#3495EB]/25 text-white">
      Enroll Now - Only 13 Seats Left
      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  </Link>

  {/* Consultation Button - Contact Page par le jaye ga */}
  <Link href="/contact" className="block w-full">
    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white/10 text-white">
      <Calendar className="h-4 w-4" />
      Contact Now
    </button>
  </Link>
</div>


                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>7-Day Money Back</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Lifetime Access</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-[#1F2937] dark:bg-[#111827]">
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <h4 className="font-semibold text-[#111827] dark:text-white">
                  Live Enrollments
                </h4>
              </div>
              <div className="space-y-3">
                {recentEnrollments.map((enrollment, index) => (
                  <RecentEnrollment key={`${enrollment.name}-${index}`} {...enrollment} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-[#1F2937] dark:bg-[#111827]"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "15,000+", label: "Students Trained" },
              { value: "98%", label: "Success Rate" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "100%", label: "Job Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#3495EB]">{stat.value}</p>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}