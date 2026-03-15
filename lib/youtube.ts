const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID; // HDS Channel ID

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
}

export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    // Step 1: Get uploads playlist ID from channel
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Get all videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosRes.json();

    // Step 3: Get video details (duration, views, likes)
    const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
    
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const detailsData = await detailsRes.json();

    // Merge data
    const videos: YouTubeVideo[] = videosData.items.map((item: any, index: number) => {
      const details = detailsData.items[index];
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        duration: formatDuration(details?.contentDetails?.duration || 'PT0M0S'),
        viewCount: details?.statistics?.viewCount || '0',
        likeCount: details?.statistics?.likeCount || '0',
      };
    });

    return videos;
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
}

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0') || '00'}:${seconds.padStart(2, '0') || '00'}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0') || '00'}`;
}