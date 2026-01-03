'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Hexagon, ArrowRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000] flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* Background Aesthetic: Blurred Infinity Wall */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale blur-md scale-110">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {[...Array(32)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-lg border border-white/5" />
            ))}
        </div>
      </div>

      {/* Golden Ambient Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-yellow-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-600/10 blur-[150px] rounded-full" />

      {/* Simple Top Logo */}
      <Link href="/" className="absolute top-16 flex items-center gap-4 group z-20">
          <div className="bg-yellow-500 p-2.5 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.4)] group-hover:rotate-12 transition-transform duration-500">
             <Hexagon className="w-8 h-8 text-black fill-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">STREAMHIVE</span>
      </Link>

      {/* Login Portal: High-Standard UX */}
      <div className="w-full max-w-[460px] relative z-10 mt-20">
          <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                    {isLogin ? 'Welcome Back' : 'Join the Hive'}
                </h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    {isLogin ? 'Authentication Required' : 'Account Registration'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="USERNAME"
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white focus:border-yellow-500 outline-none transition uppercase tracking-widest"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white focus:border-yellow-500 outline-none transition uppercase tracking-widest"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white focus:border-yellow-500 outline-none transition uppercase tracking-widest"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isLogin && (
                    <div className="flex justify-end px-1">
                        <Link href="/forgot-password" size="sm" className="text-[10px] font-black text-zinc-500 hover:text-yellow-500 transition uppercase tracking-widest underline underline-offset-4">
                            Need help?
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl text-center">
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-3 group mt-4"
                >
                    {loading ? 'INITIALIZING...' : (isLogin ? 'Enter Hive' : 'Create Portal')}
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />}
                </button>
            </form>

            <div className="mt-12 text-center">
                {isLogin ? (
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                        New content awaits?{' '}
                        <button 
                            onClick={() => setIsLogin(false)}
                            className="text-white hover:text-yellow-500 transition"
                        >
                            Create an Account
                        </button>
                    </p>
                ) : (
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                        Already a creator?{' '}
                        <button 
                            onClick={() => setIsLogin(true)}
                            className="text-white hover:text-yellow-500 transition"
                        >
                            Sign In
                        </button>
                    </p>
                )}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3 h-3 text-yellow-500" /> Secure Protocol
              </div>
          </div>
      </div>
    </div>
  );
}