import { Metadata } from 'next';
import { Shield, Sparkles, Users, Award } from 'lucide-react';
import { EnrollmentWizard } from '@/components/enrollment/enrollment-wizard';
import { AdmissionNoticePopup } from '@/components/enrollment/admission-notice-popup';

export const metadata: Metadata = {
  title: 'Enroll Now — Hassan Digital Skills',
  description:
    'Enroll in HDS mentorships. Choose Regular (Rs. 200) or One-to-One (Rs. 25,000).',
};

export default function EnrollPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* ✅ Admission notice popup — page open hote hi show hogi */}
      <AdmissionNoticePopup />

      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary-text mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Batch 18 · Registration Open
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            Start Your <span className="text-gradient">Learning Journey</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Choose your learning style, select a mentorship, and secure your
            seat in <strong className="text-foreground">Batch 18</strong>.
          </p>

          {/* Trust */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/10">
                <Shield className="h-3 w-3 text-green-500" />
              </div>
              <span>Secure enrollment</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10">
                <Users className="h-3 w-3 text-blue-500" />
              </div>
              <span>15,000+ students</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10">
                <Award className="h-3 w-3 text-amber-500" />
              </div>
              <span>HDS Certified</span>
            </div>
          </div>
        </div>

        {/* Wizard */}
        <EnrollmentWizard />

        {/* Help */}
        <div className="mt-10 text-center">
          <p className="text-[11px] text-muted-foreground">
            Need help? WhatsApp us at{' '}
            <a
              href="https://wa.me/923271543140"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-text hover:underline"
            >
              0327 1543140
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}