import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function DashboardRouter() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Redirect based on role
  switch (session.user.role) {
    case 'ADMIN':
      redirect('/admin');
    case 'REGULAR_STUDENT':
      redirect('/dashboard/regular');
    case 'ONETOONE_STUDENT':
      redirect('/dashboard/onetoone');
    default:
      redirect('/login');
  }
}