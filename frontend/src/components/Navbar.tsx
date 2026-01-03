'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Search, LogOut, Upload, Hexagon, User, Menu, X, Home, LayoutGrid, Flame } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50 px-4 md:px-10 py-4 md:py-6">
        <nav className={`mx-auto max-w-7xl flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-[2rem] transition-all duration-500 ${isScrolled ? 'glass-card' : 'bg-transparent'}`}>
          <div className="flex items-center gap-4 md:gap-10">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Hexagon className="w-5 h-5 md:w-6 md:h-6 text-white fill-white/10" />
              </div>
              <span className="text-lg md:text-xl font-black tracking-tighter text-white block">STREAMHIVE</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-gray-400 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition">Explore</Link>
              <Link href="/library" className="hover:text-white transition">Library</Link>
              <Link href="/trending" className="hover:text-white transition">Hot</Link>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-3 focus-within:ring-2 ring-indigo-500/50 transition">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                  type="text" 
                  placeholder="Search Hive..." 
                  className="bg-transparent border-none outline-none text-xs text-white w-24 md:w-32 placeholder:text-gray-600"
              />
            </div>
            <button className="md:hidden text-white">
               <Search className="w-5 h-5" />
            </button>

            {user ? (
              <div className="flex items-center gap-4 md:gap-6">
                {user.role === 'admin' && (
                  <Link 
                    href="/upload" 
                    className="hidden md:block bg-gradient-to-r from-indigo-500 to-cyan-400 p-2.5 rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition"
                    title="Creator Studio"
                  >
                      <Upload className="w-5 h-5 text-white" />
                  </Link>
                )}
                
                <div className="group relative">
                  <button className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:bg-white/5 transition">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                          {user.username[0].toUpperCase()}
                      </div>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-4 w-56 glass-card rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                      <div className="p-5 bg-white/5 border-b border-white/5">
                          <p className="text-sm font-black text-white">{user.username}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{user.role} Member</p>
                      </div>
                      <div className="p-2">
                          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                              <User className="w-4 h-4" /> Account Settings
                          </Link>
                          <button 
                              onClick={logout}
                              className="w-full flex items-center gap-3 p-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
                          >
                              <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                      </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition">
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-2 rounded-xl">
                    <Hexagon className="w-5 h-5 text-white fill-white/10" />
                </div>
                <span className="text-lg font-black tracking-tighter text-white">STREAMHIVE</span>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
               <X className="w-6 h-6" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-4">
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Menu</p>
               <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                  <Home className="w-5 h-5" /> Home
               </Link>
               <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                  <Search className="w-5 h-5" /> Search
               </Link>
               <Link href="/trending" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                  <Flame className="w-5 h-5" /> Trending
               </Link>
               <Link href="/genres" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                  <LayoutGrid className="w-5 h-5" /> Genres
               </Link>
            </div>
            
            {user && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Account</p>
                 <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                    <User className="w-5 h-5" /> Profile
                 </Link>
                 {user.role === 'admin' && (
                    <Link href="/upload" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition">
                        <Upload className="w-5 h-5" /> Creator Studio
                    </Link>
                 )}
                 <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition text-left">
                    <LogOut className="w-5 h-5" /> Sign Out
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;