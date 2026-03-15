import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { OneToOneDashboard } from '@/components/dashboard/onetoone-dashboard';

export default async function OneToOneDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ONETOONE_STUDENT') {
    redirect('/login');
  }

  return <OneToOneDashboard session={session} />;
}