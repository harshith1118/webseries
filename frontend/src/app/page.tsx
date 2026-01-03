'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoCard from '@/components/VideoCard';
import { videoService } from '@/services/video.service';
import { Video } from '@/types';
import { LayoutGrid, Languages, Film, PlayCircle, Loader2 } from 'lucide-react';
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

  if (authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
    </div>
  );
  if (!user) return <LandingPage />;

  const featuredVideo = videos.length > 0 ? videos[0] : undefined;

  return (
    <div className="flex bg-black min-h-screen text-white relative">
      {/* Mobile Navbar */}
      <div className="md:hidden contents">
        <Navbar />
      </div>
      
      <Sidebar />
      
      <main className="flex-1 ml-0 md:ml-[70px] mt-20 md:mt-0 transition-all duration-300 pb-32 md:pb-20">
        <Hero video={featuredVideo} />

        <div className="px-4 md:px-12 py-8 md:py-16 space-y-12 md:space-y-24 relative z-10 -mt-12 md:-mt-24">
            {/* Trending Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <PlayCircle className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-sm md:text-lg font-black uppercase tracking-[0.2em]">Trending Now</h2>
                    </div>
                    <Link href="/trending" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition">View All</Link>
                </div>
                <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                    {videos.map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                    {loading && [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="min-w-[280px] md:min-w-[350px] aspect-video bg-zinc-900 rounded-2xl animate-pulse border border-white/5" />
                    ))}
                </div>
            </section>

            {/* Genres Section */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <LayoutGrid className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-sm md:text-lg font-black uppercase tracking-[0.2em]">Top Categories</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
                    {['Action', 'Sci-Fi', 'Drama', 'Thriller', 'Horror', 'Comedy'].map((genre) => (
                        <div key={genre} className="h-28 md:h-40 bg-zinc-900/50 rounded-[1.5rem] md:rounded-3xl border border-white/5 flex flex-col items-center justify-center group hover:bg-zinc-800 transition-all cursor-pointer gap-2">
                            <span className="text-zinc-500 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] group-hover:text-yellow-500 transition-colors">{genre}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Language Section */}
            <section className="bg-zinc-900/20 -mx-4 px-4 py-10 md:mx-0 md:px-12 md:py-16 md:rounded-[3rem] border-y md:border border-white/5">
                <div className="flex items-center gap-3 mb-10">
                    <Languages className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-sm md:text-lg font-black uppercase tracking-[0.2em]">Global Stories</h2>
                </div>
                <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-4">
                    {videos.slice().reverse().map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </section>

            {/* Discover More Section */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Film className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-sm md:text-lg font-black uppercase tracking-[0.2em]">The Archive</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
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
