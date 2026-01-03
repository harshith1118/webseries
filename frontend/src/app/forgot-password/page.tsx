'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(''); // Dev only: to show the token since we don't have email service

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/forgotpassword', { email });
      setSuccess(true);
      // In Dev, we capture the token from response because we can't send emails
      if (res.data.resetToken) {
        setToken(res.data.resetToken);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <Link href="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-gray-400 mb-8">Enter your email and we'll help you get back into your account.</p>

        {success ? (
          <div className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
                <CheckCircle className="text-yellow-500 w-12 h-12" />
                <div>
                    <h3 className="text-white font-bold text-lg mb-2">Request Verified</h3>
                    <p className="text-zinc-400 text-sm">We've authorized a secure password reset for your account. Please follow the secure link below to update your credentials.</p>
                </div>
                <Link 
                    href={`/reset-password/${token}`}
                    className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_10px_30px_rgba(234,179,8,0.2)]"
                >
                    Secure Reset Portal
                </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="email"
                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600 outline-none transition"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-600/20 transition disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
