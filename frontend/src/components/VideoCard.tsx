'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, ChevronDown } from 'lucide-react';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const API_BASE_URL = 'http://127.0.0.1:5000';
  const thumbnailUrl = video.thumbnailUrl.startsWith('http') 
    ? video.thumbnailUrl 
    : `${API_BASE_URL}${video.thumbnailUrl}`;

  return (
    <div className="group relative min-w-[250px] md:min-w-[300px] h-[140px] md:h-[170px] transition-all duration-300">
      <Link href={`/watch/${video._id}`} className="block w-full h-full relative rounded-md overflow-hidden bg-zinc-900 border border-white/5">
        <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-5 h-5 text-black fill-black ml-1" />
            </div>
        </div>
      </Link>
      
      <div className="mt-3">
          <h4 className="text-zinc-200 text-sm font-semibold truncate group-hover:text-white transition-colors">
            {video.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-green-500 uppercase">98% Match</span>
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{video.views} Views</span>
          </div>
      </div>
    </div>
  );
};

export default VideoCard;
