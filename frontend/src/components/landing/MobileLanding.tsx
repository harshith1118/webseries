'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Hexagon, Layers, Zap, ArrowRight, Globe, Film } from 'lucide-react';

export default function MobileLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden font-sans pb-24">
      
      {/* 1. APP BAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <Hexagon className="w-6 h-6 text-black fill-black" />
        </div>
        <Link href="/login" className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/5">
            Login
        </Link>
      </nav>

      {/* 2. HERO STORY (Snapchat/Reels Style) */}
      <section className="h-[85vh] relative rounded-b-[3rem] overflow-hidden bg-zinc-900 border-b border-white/5">
        <div className="absolute inset-0">
             <Image 
                src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" 
                fill
                className="object-cover opacity-60" 
                alt="Hero Background" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        
        <motion.div 
            style={{ y: textY, opacity: headerOpacity }}
            className="absolute bottom-12 left-0 w-full px-6 z-20"
        >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Live Now</span>
            </div>
            
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
                Stream <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Without Limits.</span>
            </h1>
            
            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-[80%] mb-8">
                The world&apos;s most advanced streaming engine. Now in your pocket.
            </p>

            <Link href="/login" className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
                <Play className="w-4 h-4 fill-black" /> Start Watching
            </Link>
        </motion.div>
      </section>

      {/* 3. HORIZONTAL SCROLL CARDS (App Store Style) */}
      <section className="mt-12 pl-6">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-yellow-500" /> Curated For You
          </h2>
          
          <div className="flex gap-4 overflow-x-auto pr-6 no-scrollbar pb-8">
              <MobileCard title="Cyberpunk" subtitle="Trending Now" img="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400" />
              <MobileCard title="Deep Space" subtitle="Sci-Fi" img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400" />
              <MobileCard title="Neon City" subtitle="Action" img="https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=400" />
          </div>
      </section>

      {/* 4. VERTICAL INFO STACK */}
      <section className="px-6 mt-4 space-y-4">
          <InfoBlock 
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Instant Play"
            desc="0.5s load times on 5G networks."
          />
          <InfoBlock 
            icon={<Globe className="w-6 h-6 text-blue-500" />}
            title="Global Access"
            desc="Watch from anywhere, anytime."
          />
          <InfoBlock 
            icon={<Film className="w-6 h-6 text-red-500" />}
            title="4K HDR"
            desc="Cinema quality in your hand."
          />
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="px-6 mt-20">
          <div className="bg-zinc-900 rounded-[2rem] p-8 text-center relative overflow-hidden border border-white/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent" />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Ready?</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Join 10M+ users today.</p>
              <Link href="/login" className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
      </section>

    </div>
  );
}

interface MobileCardProps {
  title: string;
  subtitle: string;
  img: string;
}

function MobileCard({ title, subtitle, img }: MobileCardProps) {
    return (
        <div className="min-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden relative group">
            <Image src={img} fill className="object-cover" alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">{subtitle}</p>
                <h4 className="text-xl font-black italic uppercase tracking-tighter">{title}</h4>
            </div>
        </div>
    )
}

interface InfoBlockProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function InfoBlock({ icon, title, desc }: InfoBlockProps) {
    return (
        <div className="bg-white/5 p-6 rounded-2xl flex items-center gap-6 border border-white/5">
            <div className="bg-black/40 p-3 rounded-xl">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-wide">{title}</h4>
                <p className="text-zinc-500 text-xs mt-1 font-medium">{desc}</p>
            </div>
        </div>
    )
}