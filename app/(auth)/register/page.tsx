"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { User, Mail, Phone, FileText, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { language, setRole } = useAppStore();
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setRole('borrower');
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
            {t.register}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'si' ? "ශ්‍රී ලංකා ස්මාර්ට් ක්ෂුද්‍ර ණය ජාලයට එකතු වන්න." : language === 'ta' ? "இலங்கையின் ஸ்மார்ட் நுண்கடன் நெட்வொர்க்கில் சேருங்கள்." : "Join Sri Lanka's smart micro-credit network."}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Sunil Perera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">National ID / NIC</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. 199512345V"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-[#6C63FF] dark:to-[#00D4AA] text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{language === 'si' ? "ලියාපදිංචි වන්න" : language === 'ta' ? "பதிவு செய்க" : "Create FinBridge Account"}</span>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>{language === 'si' ? "දැනටමත් ගිණුමක් තිබේද?" : language === 'ta' ? "ஏற்கனவே கணக்கு உள்ளதா?" : "Already have an account?"} </span>
          <Link href="/login" className="text-blue-600 dark:text-[#00D4AA] hover:underline font-semibold">
            {t.login}
          </Link>
        </div>
      </div>
    </div>
  );
}
