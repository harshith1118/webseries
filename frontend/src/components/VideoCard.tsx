'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
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
    <div className="group relative min-w-[250px] md:min-w-[300px] h-[140px] md:h-[170px] transition-all duration-500">
      <Link href={`/watch/${video._id}`} className="block w-full h-full relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-xl">
        <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Modern Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 mb-2">
                <Play className="w-5 h-5 text-black fill-black ml-1" />
            </div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest truncate">{video.title}</h4>
        </div>
      </Link>
      
      <div className="mt-3 px-1">
          <h4 className="text-zinc-200 text-[11px] md:text-sm font-black uppercase tracking-widest truncate group-hover:text-yellow-500 transition-colors">
            {video.title}
          </h4>
          <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase tracking-widest">98% Match</span>
              <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em]">{video.views} Views</span>
          </div>
      </div>
    </div>
  );
};

export default VideoCard;
