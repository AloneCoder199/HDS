import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { RegularStudentDashboard } from '@/components/dashboard/regular-student-dashboard';

export default async function RegularDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'REGULAR_STUDENT') {
    redirect('/login');
  }

  return <RegularStudentDashboard session={session} />;
}