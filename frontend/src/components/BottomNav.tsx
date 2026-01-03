'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutGrid, Plus, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const BottomNav = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', href: '/' },
    { icon: <Search className="w-6 h-6" />, label: 'Search', href: '/search' },
    { icon: <LayoutGrid className="w-6 h-6" />, label: 'Genres', href: '/genres' },
    { icon: <Plus className="w-6 h-6" />, label: 'My List', href: '/my-list' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', href: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/5 z-[100] px-6 py-3 pb-8">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-yellow-500 scale-110' : 'text-zinc-500'}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;