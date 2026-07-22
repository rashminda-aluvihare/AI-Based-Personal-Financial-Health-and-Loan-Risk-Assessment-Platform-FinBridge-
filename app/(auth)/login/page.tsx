"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Key, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { language, role, setRole } = useAppStore();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Auto-detect admin credentials or active role selection
      if (email.trim().toLowerCase() === 'rashmindaaluvihare447@gmail.com' || role === 'admin') {
        setRole('admin');
      } else if (role !== 'lender') {
        setRole('borrower');
      }
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0A0E1A] px-4 py-12 relative overflow-hidden transition-colors">
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-white/10 p-8 rounded-3xl shadow-xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center">
            <img src="/logo_icon.png" alt="FinBridge Logo" className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-200 dark:border-white/10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.login}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.authDescription}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 dark:border-white/10 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember Me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-[#6C63FF] dark:to-[#00D4AA] text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{language === 'si' ? "ලොගින් වන්න" : language === 'ta' ? "உள்நுழைக" : "Sign In to FinBridge"}</span>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>{language === 'si' ? "ගිණුමක් නොමැතිද?" : language === 'ta' ? "கணக்கு இல்லையா?" : "Don't have an account?"} </span>
          <Link href="/register" className="text-blue-600 dark:text-[#00D4AA] hover:underline font-semibold">
            {t.register}
          </Link>
        </div>
      </div>
    </div>
  );
}
