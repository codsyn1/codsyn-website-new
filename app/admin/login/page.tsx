'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/authService';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await loginAdmin(email, password);

    if (result.success) {
      router.push('/admin/blogs');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-[#00F5FF]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#00F5FF]/20">
            <Lock className="text-[#00F5FF] w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 italic">Admin Panel</h1>
          <p className="text-slate-400">Please sign in to manage your blogs</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
                placeholder="admin@stagchemist.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00F5FF] hover:bg-[#00D8E0] text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 group shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-slate-500 italic">
            CODSYN Administrative Control
          </p>
        </div>
      </div>
    </div>
  );
}
