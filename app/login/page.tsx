import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react'; // 1. Suspense import karein

export const metadata: Metadata = {
  title: 'Login - Hassan Digital Skills',
  description: 'Login to your HDS student dashboard',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* 2. LoginForm ko Suspense mein wrap kar dein */}
      <Suspense fallback={<div className="text-slate-500 italic">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
