'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Calendar,
  X,
  ChevronDown,
  BookOpen,
  LogOut,
  Youtube,
  Loader2
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Types
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  tags: string[];
  playlistId?: string;
}

interface Playlist {
  id: string;
  title: string;
  itemCount: number;
}

export default function YouTubeVideoLibrary() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        setLoading(true);
        
        // Fetch channel videos
        const response = await fetch('/api/youtube/videos');
        if (!response.ok) throw new Error('Failed to fetch videos');
        
        const data = await response.json();
        setVideos(data.videos || []);
        setPlaylists(data.playlists || []);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        toast.error('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let result = [...videos];

    // Filter by playlist
    if (selectedPlaylist !== 'all') {
      result = result.filter(video => video.playlistId === selectedPlaylist);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return parseInt(b.viewCount.replace(/[^0-9]/g, '')) - parseInt(a.viewCount.replace(/[^0-9]/g, ''));
        default:
          return 0;
      }
    });

    return result;
  }, [videos, selectedPlaylist, searchQuery, sortBy]);

  // Format numbers (e.g., 1000 -> 1K)
  const formatNumber = (num: string) => {
    const n = parseInt(num.replace(/[^0-9]/g, ''));
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  // Format duration from ISO 8601
  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '') || '0';
    const seconds = (match[3] || '').replace('S', '') || '0';
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                HDS Video Library
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hassan Digital Skills
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {filteredVideos.length} Videos Available
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    {session?.user?.name?.[0] || 'S'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Videos', value: videos.length, icon: Play, color: 'blue' },
            { label: 'Playlists', value: playlists.length, icon: BookOpen, color: 'sky' },
            { label: 'This Week', value: videos.filter(v => 
              new Date(v.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length, icon: Calendar, color: 'cyan' },
            { label: 'Watch Time', value: '∞', icon: Clock, color: 'indigo' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
  <Skeleton className="w-12 h-8" />
</div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search videos, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
              <SelectTrigger className="w-[180px] h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <Filter className="w-4 h-4 mr-2 text-slate-500" />
                <SelectValue placeholder="All Playlists" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Playlists</SelectItem>
                {playlists.map(playlist => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.title} ({playlist.itemCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-[160px] h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-10"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-10"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Videos Grid/List */}
        {loading ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-slate-200 dark:border-slate-800 overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Youtube className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No videos found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  <CardContent className={viewMode === 'list' ? 'p-4 flex gap-4' : 'p-4'}>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {formatNumber(video.viewCount)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {formatNumber(video.likeCount)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(video.publishedAt), 'MMM d, yyyy')}
                        </span>
                      </div>

                      {video.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {video.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-slate-950 border-slate-800">
          <DialogHeader className="p-4 border-b border-slate-800">
            <DialogTitle className="text-white line-clamp-1">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedVideo?.viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {selectedVideo?.likeCount} likes
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedVideo && format(new Date(selectedVideo.publishedAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://youtube.com/watch?v=${selectedVideo?.id}`, '_blank')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Youtube className="w-4 h-4 mr-2" />
                Open in YouTube
              </Button>
            </div>
            <p className="text-slate-300 text-sm line-clamp-4">
              {selectedVideo?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}