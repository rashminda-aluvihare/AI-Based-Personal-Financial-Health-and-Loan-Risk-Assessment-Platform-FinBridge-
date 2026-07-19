"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Shield, User, Briefcase, Key, Mail, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { language, role, setRole, user } = useAppStore();
  const t = translations[language];

  const [email, setEmail] = useState('rashminda@finbridge.lk');
  const [password, setPassword] = useState('********');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'lender') {
      router.push('/lender');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] px-4 py-12 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-[#6C63FF]/10 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-[#00D4AA]/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md glass-panel p-8 rounded-3xl glow-indigo space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] items-center justify-center font-bold text-white text-2xl tracking-tight shadow-md">
            FB
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white font-display">
            {t.login}
          </h2>
          <p className="text-xs text-slate-400">
            {t.authDescription}
          </p>
        </div>

        {/* Role Quick Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            {t.roleSelection}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole('borrower')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition text-center ${
                role === 'borrower'
                  ? 'border-[#6C63FF] bg-[#6C63FF]/15 text-white font-semibold'
                  : 'border-white/5 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-[10px]">{t.borrower}</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('lender')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition text-center ${
                role === 'lender'
                  ? 'border-[#00D4AA] bg-[#00D4AA]/15 text-white font-semibold'
                  : 'border-white/5 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#00D4AA]" />
              <span className="text-[10px]">{t.lender.split('/')[0]}</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition text-center ${
                role === 'admin'
                  ? 'border-[#FF6B6B] bg-[#FF6B6B]/15 text-white font-semibold'
                  : 'border-white/5 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-[10px]">Admin</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] hover:opacity-95 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg"
          >
            <span>{language === 'si' ? "ලොගින් වන්න" : language === 'ta' ? "உள்நுழைக" : "Sign In to FinBridge"}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          <span>{language === 'si' ? "ගිණුමක් නොමැතිද?" : language === 'ta' ? "கணக்கு இல்லையா?" : "Don't have an account?"} </span>
          <Link href="/auth/register" className="text-[#00D4AA] hover:underline font-semibold">
            {t.register}
          </Link>
        </div>
      </div>
    </div>
  );
}
