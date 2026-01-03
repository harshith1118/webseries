'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '@/components/video/VideoPlayer';
import { videoService } from '@/services/video.service';
import { Video } from '@/types';
import api from '@/services/api';

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await videoService.getVideoById(resolvedParams.id);
        setVideo(data);
      } catch {
        console.error('Failed to fetch video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [resolvedParams.id]);

  const handleTimeUpdate = async (currentTime: number) => {
    // Only update progress every 10 seconds or so to avoid spamming the server
    if (Math.floor(currentTime) % 10 === 0) {
        try {
            await api.post('/users/history', {
                videoId: resolvedParams.id,
                progress: Math.floor(currentTime)
            });
        } catch {
            // Silently fail progress tracking
        }
    }
  };

  if (loading) return <div className="h-screen w-screen bg-[#141414] flex items-center justify-center text-white">Loading...</div>;
  if (!video) return <div className="h-screen w-screen bg-[#141414] flex items-center justify-center text-white">Video not found.</div>;

  const API_BASE_URL = 'http://localhost:5000';
  const videoUrl = video.videoUrl.startsWith('http') 
    ? video.videoUrl 
    : `${API_BASE_URL}${video.videoUrl}`;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoUrl,
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed top-0 w-full p-4 z-50 flex items-center gap-8 bg-gradient-to-b from-black/70 to-transparent">
        <ArrowLeft 
            className="w-6 h-6 md:w-8 md:h-8 text-white cursor-pointer hover:scale-110 transition" 
            onClick={() => router.back()}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span> {video.title}
        </p>
      </nav>

      <div className="h-full w-full flex items-center justify-center">
        <VideoPlayer 
            options={videoJsOptions} 
            onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
}
