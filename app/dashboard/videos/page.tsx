import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import  VideoLibrary  from '@/components/videos/video-library';
import { getChannelVideos } from '@/lib/youtube';

export const metadata: Metadata = {
  title: 'Video Library - Hassan Digital Skills',
  description: 'Access premium learning videos from HDS YouTube channel',
};

export default async function VideosPage() {
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login?callbackUrl=/videos');
  }

  // Fetch videos from YouTube
  const videos = await getChannelVideos();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <VideoLibrary  />
    </main>
  );
}