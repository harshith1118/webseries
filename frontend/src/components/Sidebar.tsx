'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, Search, PlayCircle, Plus, 
  User, Settings, LogOut, Upload,
  LayoutGrid, Languages
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  if (!user) return null;

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', href: '/search' },
    { icon: <LayoutGrid className="w-5 h-5" />, label: 'Genres', href: '/genres' },
    { icon: <Languages className="w-5 h-5" />, label: 'Languages', href: '/languages' },
    { icon: <Plus className="w-5 h-5" />, label: 'My List', href: '/my-list' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[70px] hover:w-[240px] bg-black border-r border-white/5 z-[100] transition-all duration-300 group flex flex-col items-center py-10 overflow-hidden">
      {/* Mini Logo */}
      <div className="mb-12">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 w-full space-y-2 px-3">
        {menuItems.map((item) => (
          <Link 
            key={item.label}
            href={item.href}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group/item whitespace-nowrap
              ${pathname === item.href ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            <div className="min-w-[20px]">{item.icon}</div>
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
            </span>
          </Link>
        ))}

        {user.role === 'admin' && (
          <Link 
            href="/upload"
            className="flex items-center gap-4 p-3 rounded-lg text-zinc-500 hover:text-accent hover:bg-white/5 whitespace-nowrap transition-all duration-200"
          >
            <div className="min-w-[20px]"><Upload className="w-5 h-5" /></div>
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Creator Studio
            </span>
          </Link>
        )}
      </div>

      {/* Profile/Logout */}
      <div className="w-full px-3 mt-auto space-y-2">
        <div className="flex items-center gap-4 p-3 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 whitespace-nowrap transition-all cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                {user.username[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user.username}
            </span>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-4 p-3 w-full rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-500/5 whitespace-nowrap transition-all"
        >
          <div className="min-w-[20px]"><LogOut className="w-5 h-5" /></div>
          <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;