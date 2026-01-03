'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, Hexagon, Star, Monitor, Zap, ArrowRight, Volume2, Sparkles } from 'lucide-react';

export default function DesktopLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax values for the content wall
  const wallY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#000] text-white selection:bg-yellow-500/30 overflow-x-hidden">
      
      {/* PROFESSIONAL CINEMA NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-10 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                <Hexagon className="w-7 h-7 text-black fill-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">StreamHive</span>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto bg-white/5 backdrop-blur-2xl px-2 py-2 rounded-full border border-white/10">
            <Link href="/login" className="px-6 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition">Sign In</Link>
            <Link href="/login" className="bg-yellow-500 text-black px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                Access Now
            </Link>
        </div>
      </nav>

      {/* SECTION 1: THE INFINITY WALL (HERO) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* MOVING POSTER WALL */}
        <motion.div 
            style={{ y: wallY }}
            className="absolute inset-0 z-0 opacity-30 scale-110"
        >
            <div className="grid grid-cols-6 gap-4 p-4">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
                        <img 
                            src={`https://images.unsplash.com/photo-${1500000000000 + (i * 100000)}?q=80&w=400&auto=format&fit=crop`} 
                            className="w-full h-full object-cover" 
                            alt="cinema"
                        />
                    </div>
                ))}
            </div>
        </motion.div>

        {/* GRADIENT OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-1" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black z-1" />

        <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="relative z-10 text-center px-6"
        >
            <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold text-[10px] uppercase tracking-[0.6em] mb-4">
                <Sparkles className="w-3 h-3" /> The Gold Standard of Streaming
            </div>
            
            <h1 className="text-[11vw] font-black leading-[0.8] tracking-tighter uppercase italic mb-12">
                Pure <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-white to-orange-600">Emotion.</span>
            </h1>

            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
                Step beyond the interface. Experience a master-class in digital distribution. 
                Your archive, perfectly preserved in the Hive.
            </p>

            <div className="flex items-center justify-center gap-6 mt-12">
                <Link href="/login" className="group bg-white text-black h-20 px-12 rounded-3xl flex items-center gap-4 hover:bg-yellow-500 transition-all duration-500 font-black text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                    <Play className="w-6 h-6 fill-black" />
                    Open Portal
                </Link>
                <button className="h-20 px-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl flex items-center gap-3 font-bold hover:bg-white/10 transition-all text-zinc-400">
                    <Volume2 className="w-5 h-5" /> Audio Engine v2
                </button>
            </div>
        </motion.div>
      </section>

      {/* SECTION 2: GENRE SPOTLIGHT (SCROLL-TRIGGERED) */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                  <h2 className="text-8xl font-black italic tracking-tighter uppercase leading-none">
                    Choose <br /> Your <br /> <span className="text-yellow-500">Vibe.</span>
                  </h2>
                  <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-md">
                    From heart-pounding action to soul-stirring drama. The Hive curates the best of global entertainment for your unique taste.
                  </p>
                  <div className="flex flex-wrap gap-4">
                      {['Action', 'Sci-Fi', 'Horror', 'Documentary', 'Anime'].map(genre => (
                          <div key={genre} className="px-6 py-2 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:border-yellow-500 hover:text-yellow-500 cursor-pointer transition">
                              {genre}
                          </div>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-20">
                    <GenreCard label="Thriller" color="bg-red-600" i={1} />
                    <GenreCard label="Adventure" color="bg-blue-600" i={2} />
                  </div>
                  <div className="space-y-4">
                    <GenreCard label="Space" color="bg-indigo-600" i={3} />
                    <GenreCard label="Retro" color="bg-orange-600" i={4} />
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 3: THE EXPERIENCE (ICONIC LAYOUT) */}
      <section className="py-40 bg-zinc-950/50">
          <div className="px-8 text-center mb-24">
              <h2 className="text-7xl font-black uppercase tracking-tighter mb-6">Built for <span className="italic underline decoration-yellow-500 underline-offset-8">Screen-Time.</span></h2>
              <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Unmatched Fidelity. Unparalleled Speed.</p>
          </div>

          <div className="grid grid-cols-3">
              <FeatureBox 
                icon={<Monitor className="w-10 h-10" />} 
                title="8K Ultra Adaptive" 
                desc="HLS segments that scale with your network, ensuring zero buffering."
              />
              <FeatureBox 
                icon={<Zap className="w-10 h-10" />} 
                title="Instant Playback" 
                desc="Proprietary cache-first technology starts your show in under 0.5s."
              />
              <FeatureBox 
                icon={<Star className="w-10 h-10" />} 
                title="Curated Lists" 
                desc="No more scrolling forever. We find the content you actually want to watch."
              />
          </div>
      </section>

      {/* SECTION 4: THE BIG CTA */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden px-8">
          <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600" className="w-full h-full object-cover" alt="Background Cinematic" />
          </div>
          <div className="relative z-10 text-center space-y-12 px-4">
              <h2 className="text-8xl lg:text-[10vw] font-black uppercase italic tracking-tighter leading-[0.9]">
                Stop Browsing. <br /> <span className="text-yellow-500">Start Watching.</span>
              </h2>
              <Link href="/login" className="inline-flex items-center gap-6 bg-yellow-500 text-black px-16 py-8 rounded-full font-black text-3xl hover:scale-110 transition-transform shadow-[0_30px_100px_rgba(234,179,8,0.2)]">
                  ENTER THE HIVE <ArrowRight className="w-10 h-10" />
              </Link>
          </div>
      </section>

      {/* FOOTER: THE STUDIO SIGNATURE */}
      <footer className="py-20 px-8 border-t border-white/5 flex justify-between items-center gap-12">
          <div className="flex items-center gap-4">
              <Hexagon className="w-8 h-8 text-yellow-500" />
              <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-[0.3em]">StreamHive Studio</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Global Media Distribution</p>
              </div>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <Link href="#" className="hover:text-white transition">Privacy</Link>
              <Link href="#" className="hover:text-white transition">Terms</Link>
              <Link href="#" className="hover:text-white transition">Legal</Link>
              <Link href="#" className="hover:text-white transition">Archives</Link>
          </div>
          <p className="text-[10px] font-black text-zinc-800">© 2026 THE HIVE CORPORATION</p>
      </footer>
    </div>
  );
}

interface GenreCardProps {
  label: string;
  color: string;
  i: number;
}

function GenreCard({ label, color, i }: GenreCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className={`aspect-square ${color} rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-pointer`}
        >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-6xl font-black text-white/20">0{i}</span>
            <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{label}</h4>
        </motion.div>
    );
}

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureBox({ icon, title, desc }: FeatureBoxProps) {
    return (
        <div className="p-16 border-r border-white/5 last:border-none flex flex-col items-center text-center gap-8 group hover:bg-white/[0.02] transition-colors">
            <div className="text-yellow-500 group-hover:scale-110 transition-transform duration-500">{icon}</div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}