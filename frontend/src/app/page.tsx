'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import VideoCard from '@/components/VideoCard';
import { videoService } from '@/services/video.service';
import { Video } from '@/types';
import { LayoutGrid, Languages, Film, PlayCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from './landing/page';
import Link from 'next/link';

export default function RootPage() {
  const { user, loading: authLoading } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchVideos = async () => {
      try {
        const data = await videoService.getAllVideos();
        setVideos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [user]);

  if (authLoading) return <div className="min-h-screen bg-black" />;
  if (!user) return <LandingPage />;

  const featuredVideo = videos.length > 0 ? videos[0] : undefined;

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      
      <main className="flex-1 ml-0 md:ml-[70px] transition-all duration-300">
        <Hero video={featuredVideo} />

        <div className="px-4 md:px-12 py-8 md:py-16 space-y-10 md:space-y-20 relative z-10 -mt-10 md:-mt-20">
            {/* Trending Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <PlayCircle className="w-4 h-4 text-zinc-500" />
                    <h2 className="section-title mb-0">Trending Content</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                    {videos.map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                    {loading && [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="min-w-[300px] h-[170px] bg-zinc-900 rounded-md animate-pulse" />
                    ))}
                </div>
            </section>

            {/* Genres Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <LayoutGrid className="w-4 h-4 text-zinc-500" />
                    <h2 className="section-title mb-0">Browse by Genres</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {['Action', 'Sci-Fi', 'Drama', 'Thriller', 'Horror', 'Comedy'].map((genre) => (
                        <div key={genre} className="h-32 bg-zinc-900/50 rounded-lg border border-white/5 flex items-center justify-center group hover:bg-zinc-800 transition-all cursor-pointer">
                            <span className="text-zinc-500 font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">{genre}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Language Section */}
            <section className="bg-zinc-900/20 p-6 md:p-12 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                    <Languages className="w-4 h-4 text-zinc-500" />
                    <h2 className="section-title mb-0">Stories in Your Language</h2>
                </div>
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    {videos.slice().reverse().map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </section>

            {/* Discover More Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <Film className="w-4 h-4 text-zinc-500" />
                    <h2 className="section-title mb-0">Deep Dive into Library</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {videos.map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </section>
        </div>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-10 md:py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
            <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">StreamHive Global</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Service</Link>
                <Link href="#">Cookie Settings</Link>
                <Link href="#">Support</Link>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">© 2026 Studio Hive</span>
        </footer>
      </main>
    </div>
  );
}
