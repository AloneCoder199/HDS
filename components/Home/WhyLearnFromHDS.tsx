// app/components/WhyChooseHDS.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from 'next/link'; // Default import hai, {} nahi lagani
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  PlayCircle,
  Star,
  TrendingUp,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
  highlighted?: boolean;
}

const BenefitCard = ({ icon, title, description, features, delay, highlighted = false }: BenefitCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
        highlighted 
          ? "border-[#3495EB] bg-[#3495EB]/5 dark:border-[#3495EB] dark:bg-[#3495EB]/10" 
          : "border-[#E5E7EB] bg-white hover:border-[#3495EB] dark:border-[#1F2937] dark:bg-[#111827] dark:hover:border-[#3495EB]"
      }`}
    >
      {/* Highlighted badge */}
      {highlighted && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-[#3495EB] px-2.5 py-0.5 text-xs font-medium text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`mb-5 inline-flex rounded-xl p-3 ${
        highlighted 
          ? "bg-[#3495EB] text-white" 
          : "bg-[#3495EB]/10 text-[#3495EB] dark:bg-[#3495EB]/20"
      }`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[#111827] dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
        {description}
      </p>

      {/* Feature list */}
      <ul className="mt-5 space-y-2.5">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
              highlighted ? "text-[#3495EB]" : "text-emerald-500"
            }`} />
            <span className="text-[#374151] dark:text-[#D1D5DB]">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const StatItem = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20">
      <Icon className="h-6 w-6 text-[#8B5CF6]" />
    </div>
    <div>
      <p className="text-2xl font-bold text-[#111827] dark:text-white">{value}</p>
      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">{label}</p>
    </div>
  </div>
);

const TrustBadge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 dark:border-[#1F2937] dark:bg-[#111827]">
    <CheckCircle2 className="h-4 w-4 text-[#3495EB]" />
    <span className="text-sm font-medium text-[#111827] dark:text-white">{text}</span>
  </div>
);

export default function WhyChooseHDS() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Expert-Led Training",
      description: "Learn directly from industry professionals with years of real-world experience in digital marketing and tech.",
      features: [
        "Live interactive sessions with Hassan",
        "Real case studies from actual projects",
        "Personal feedback on your work",
        "Industry-best practices shared"
      ],
      highlighted: true,
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access to all course materials, recorded sessions, and resources.",
      features: [
        "24/7 access to all course content",
        "Self-paced learning modules",
        "Downloadable resources & templates",
        "Mobile-friendly platform"
      ],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Support",
      description: "Join a thriving community of learners. Network, collaborate, and grow together with peer support.",
      features: [
        "Private Discord community",
        "Weekly Q&A sessions",
        "Peer networking opportunities",
        "Job referral network"
      ],
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Recognized Certification",
      description: "Earn industry-recognized certificates that boost your resume and LinkedIn profile credibility.",
      features: [
        "Verified digital certificates",
        "LinkedIn integration",
        "Portfolio building guidance",
        "Interview preparation support"
      ],
    },
  ];

  const stats = [
    { value: "15K+", label: "Students Trained", icon: Users },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
    { value: "4.9/5", label: "Student Rating", icon: Star },
    { value: "24/7", label: "Support Available", icon: Headphones },
  ];

  const trustBadges = [
    "Lifetime Access",
    "Money-Back Guarantee",
    "Certificate Included",
    "Beginner Friendly",
    "Practical Projects",
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 dark:bg-[#0B1220] sm:py-28"
    >
      {/* Background Elements */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#3495EB]/5 blur-3xl dark:bg-[#3495EB]/10" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#8B5CF6]/5 blur-3xl dark:bg-[#8B5CF6]/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-[#8B5CF6]/10 px-4 py-1.5 text-sm font-medium text-[#8B5CF6] dark:bg-[#8B5CF6]/20">
              <Award className="mr-2 h-4 w-4" />
              Pakistan's #1 Digital Skills Platform
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-4xl lg:text-5xl"
          >
            Why Choose{" "}
            <span className="text-[#3495EB]">HDS</span>
            <span className="block text-2xl font-semibold text-[#6B7280] dark:text-[#9CA3AF] sm:text-3xl lg:text-4xl">
              (Hassan Digital Skills)
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-[#6B7280] dark:text-[#9CA3AF] sm:text-lg"
          >
            Transform your career with Pakistan's most trusted digital skills training platform. 
            We don't just teach skills — we build careers with practical, industry-ready education 
            that employers actually demand.
          </motion.p>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {trustBadges.map((badge) => (
            <TrustBadge key={badge} text={badge} />
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 dark:border-[#1F2937] dark:bg-[#111827] sm:p-8"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center sm:text-left"
              >
                <StatItem {...stat} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              {...benefit}
              delay={0.6 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] to-[#1F2937] p-8 dark:from-[#111827] dark:to-[#0B1220] sm:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to Start Your Journey?
              </h3>
              <p className="mt-4 text-[#9CA3AF]">
                Join 15,000+ students who have transformed their careers with HDS. 
                Start learning today with our beginner-friendly courses.
              </p>
              
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
  {/* Enroll Now Button - Redirect to /enroll */}
  <Link href="/enroll" className="w-full sm:w-auto">
    <button className="group inline-flex w-full items-center justify-center rounded-xl bg-[#3495EB] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#347ce0] hover:shadow-lg hover:shadow-[#3495EB]/25">
      Enroll Now
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  </Link>

  {/* Contact/Demo Button - Redirect to /contact */}
  <Link href="/contact" className="w-full sm:w-auto">
    <button className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10">
      <PlayCircle className="mr-2 h-4 w-4" />
      Watch Free Demo
    </button>
  </Link>
</div>


              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[#9CA3AF] lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>7-Day Refund</span>
                </div>
              </div>
            </div>

            {/* Right - Testimonial Preview */}
            <div className="relative">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-white/90 italic">
                  "HDS completely changed my career trajectory. Within 3 months of completing 
                  the course, I landed my first client and now earn 3x my previous salary."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#3495EB] flex items-center justify-center text-white font-bold">
                    AK
                  </div>
                  <div>
                    <p className="font-semibold text-white">Ahmed Khan</p>
                    <p className="text-sm text-[#9CA3AF]">Freelance Digital Marketer</p>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#3495EB] p-3 shadow-xl sm:-right-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">3x</p>
                  <p className="text-xs text-white/80">Salary Growth</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Trust Signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]"
        >
          Join students from{" "}
          <span className="font-semibold text-[#111827] dark:text-white">Karachi, Lahore, Islamabad</span>{" "}
          and across Pakistan • Next batch starts{" "}
          <span className="font-semibold text-[#3495EB]">March 25, 2026</span>
        </motion.p>
      </div>
    </section>
  );
}