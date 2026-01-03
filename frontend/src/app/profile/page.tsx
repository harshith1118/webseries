'use client';

import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { LogOut, User, Mail, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex bg-black min-h-screen text-white relative">
      <div className="md:hidden contents">
        <Navbar />
      </div>
      <Sidebar />
      
      <main className="flex-1 ml-0 md:ml-[70px] mt-24 md:mt-0 p-6 md:p-12 pb-32">
        <div className="flex items-center gap-4 mb-8">
             <Link href="/" className="md:hidden bg-zinc-900 p-2 rounded-full">
                <ArrowLeft className="w-5 h-5" />
             </Link>
             <h1 className="text-3xl font-black uppercase tracking-tighter text-yellow-500">My Profile</h1>
        </div>
        
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 md:p-10 max-w-2xl mx-auto md:mx-0">
           <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-indigo-500/20">
                  {user.username[0].toUpperCase()}
              </div>
              <div>
                  <h2 className="text-3xl font-bold">{user.username}</h2>
                  <p className="text-zinc-500 text-sm font-medium mt-1 uppercase tracking-widest">{user.role} Account</p>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email Address</p>
                      <p className="font-medium text-sm md:text-base break-all">{user.email}</p>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
                  <div className="bg-zinc-800 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                       <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Member Status</p>
                       <p className="font-medium text-sm md:text-base">Active • Member since Jan 2026</p>
                  </div>
              </div>
           </div>

           <div className="mt-12 pt-10 border-t border-white/5">
               <button 
                  onClick={logout}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all"
               >
                   <LogOut className="w-5 h-5" /> Sign Out
               </button>
           </div>
        </div>
      </main>
    </div>
  )
}
