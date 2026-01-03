'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { LayoutGrid, PlayCircle, ArrowLeft } from 'lucide-react';

export default function GenresPage() {
  const genres = [
    { name: 'Action', color: 'bg-red-600', count: '120+ Titles' },
    { name: 'Sci-Fi', color: 'bg-indigo-600', count: '85+ Titles' },
    { name: 'Drama', color: 'bg-purple-600', count: '200+ Titles' },
    { name: 'Thriller', color: 'bg-orange-600', count: '90+ Titles' },
    { name: 'Horror', color: 'bg-zinc-800', count: '60+ Titles' },
    { name: 'Comedy', color: 'bg-yellow-500', count: '150+ Titles' },
    { name: 'Romance', color: 'bg-pink-500', count: '110+ Titles' },
    { name: 'Documentary', color: 'bg-blue-500', count: '45+ Titles' },
    { name: 'Adventure', color: 'bg-green-600', count: '70+ Titles' },
    { name: 'Animation', color: 'bg-sky-500', count: '130+ Titles' },
    { name: 'Mystery', color: 'bg-slate-600', count: '55+ Titles' },
    { name: 'Fantasy', color: 'bg-violet-600', count: '95+ Titles' },
  ];

  return (
    <div className="flex bg-black min-h-screen text-white relative">
      <div className="md:hidden contents">
        <Navbar />
      </div>
      <Sidebar />
      
      <main className="flex-1 ml-0 md:ml-[70px] mt-20 md:mt-0 transition-all duration-300 pb-32 md:pb-20">
        <div className="px-4 md:px-12 py-8 md:py-16 max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
                <Link href="/" className="md:hidden bg-white/5 border border-white/10 p-3 rounded-2xl">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <div>
                    <div className="flex items-center gap-3 text-yellow-500 mb-3">
                        <LayoutGrid className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Library</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Explore <br className="md:hidden" /> Genres</h1>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {genres.map((genre) => (
                    <div 
                        key={genre.name} 
                        className="group relative h-44 md:h-64 rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer border border-white/5 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                    >
                        {/* Background with Color */}
                        <div className={`absolute inset-0 ${genre.color} opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                            <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2 group-hover:text-yellow-500 transition-colors">{genre.count}</span>
                            <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter mb-4 group-hover:scale-105 transition-transform origin-left">
                                {genre.name}
                            </h3>
                            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">View Archive</span>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <PlayCircle className="w-5 h-5 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </main>
    </div>
  );
}
