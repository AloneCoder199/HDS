import { Metadata } from 'next';
import { EnrollmentWizard } from '@/components/enrollment/enrollment-wizard';

export const metadata: Metadata = {
  title: 'Enroll Now - Hassan Digital Skills',
  description: 'Enroll in our professional courses. Choose between Regular Group Classes or One-to-One Private Sessions.',
};

export default function EnrollPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Start Your Learning Journey
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Choose your learning style and enroll in your desired course
            </p>
          </div>
          
          <EnrollmentWizard />
        </div>
      </div>
    </main>
  );
}