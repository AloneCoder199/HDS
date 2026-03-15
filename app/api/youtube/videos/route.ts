import { NextResponse } from 'next/server';
import { google, youtube_v3 } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function GET() {
  try {
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID missing' }, { status: 400 });
    }
    
    // 1. Fetch playlists
    const playlistsResponse = await youtube.playlists.list({
      part: ['snippet', 'contentDetails'],
      channelId: channelId,
      maxResults: 50
    });

    const playlists = playlistsResponse.data.items?.map(item => ({
      id: item.id,
      title: item.snippet?.title,
      itemCount: item.contentDetails?.itemCount
    })) || [];

    // 2. Fetch recent videos (Search)
    const searchResponse = await youtube.search.list({
      part: ['snippet'],
      channelId: channelId,
      maxResults: 50,
      order: 'date',
      type: ['video']
    });

    // Panga fix: Filter out undefined/null and ensure it's a string array
    const videoIds: string[] = (searchResponse.data.items || [])
      .map(item => item.id?.videoId)
      .filter((id): id is string => typeof id === 'string');
    
    // Agar koi video nahi mili toh khali return kar dein taakay next call crash na ho
    if (videoIds.length === 0) {
      return NextResponse.json({ videos: [], playlists });
    }

    // 3. Get detailed video info
    // Panga fix: Type casting 'id' as string[] and ensuring 'part' is correct
    const videosResponse = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: videoIds 
    });

    const videos = (videosResponse.data.items || []).map(item => ({
      id: item.id,
      title: item.snippet?.title,
      description: item.snippet?.description,
      thumbnail: item.snippet?.thumbnails?.maxres?.url || 
                 item.snippet?.thumbnails?.high?.url || 
                 item.snippet?.thumbnails?.default?.url,
      publishedAt: item.snippet?.publishedAt,
      duration: item.contentDetails?.duration,
      viewCount: item.statistics?.viewCount || '0',
      likeCount: item.statistics?.likeCount || '0',
      tags: item.snippet?.tags || []
    }));

    return NextResponse.json({ videos, playlists });
  } catch (error: any) {
    console.error('YouTube API Error:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
