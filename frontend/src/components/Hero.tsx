'use client';

import { Play, Info, Clock, Plus } from 'lucide-react';
import { Video } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  video?: Video;
}

const Hero = ({ video }: HeroProps) => {
  if (!video) return <div className="h-[60vh] bg-black" />;

  const API_BASE_URL = 'http://127.0.0.1:5000';
  const thumbnailUrl = video.thumbnailUrl.startsWith('http') 
    ? video.thumbnailUrl 
    : `${API_BASE_URL}${video.thumbnailUrl}`;

  return (
    <div className="relative h-[85vh] w-full bg-black group">
      {/* Background with layered vignettes */}
      <Image
        src={thumbnailUrl}
        alt={video.title}
        fill
        className="object-cover brightness-[65%] transition-transform duration-[15s] group-hover:scale-110"
        priority
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-20 left-12 md:left-24 max-w-2xl z-10">
        <div className="flex items-center gap-3 mb-6">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/5">
                Featured
            </span>
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> 2h 45m
            </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          {video.title}
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-base mb-10 line-clamp-2 max-w-xl font-medium leading-relaxed">
          {video.description}
        </p>

        <div className="flex items-center gap-3">
          <Link 
            href={`/watch/${video._id}`}
            className="bg-white text-black px-8 py-3.5 rounded-md flex items-center gap-3 hover:bg-zinc-200 transition-all font-semibold text-sm"
          >
            <Play className="w-4 h-4 fill-black" />
            Play
          </Link>
          <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-md flex items-center gap-3 hover:bg-white/20 transition-all font-semibold text-sm border border-white/5">
            <Info className="w-4 h-4" />
            More Info
          </button>
          <button className="w-12 h-12 rounded-md bg-white/10 backdrop-blur-md border border-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;