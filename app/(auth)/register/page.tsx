"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Shield, User, Briefcase, Key, Mail, Sparkles, Phone, FileText } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { language, role, setRole } = useAppStore();
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('borrower');
    router.push('/dashboard');
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
            {t.register}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'si' ? "ශ්‍රී ලංකා ස්මාර්ට් ක්ෂුද්‍ර ණය ජාලයට එකතු වන්න." : language === 'ta' ? "இலங்கையின் ஸ்மார்ட் நுண்கடன் நெட்வொர்க்கில் சேருங்கள்." : "Join Sri Lanka's smart micro-credit network."}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="e.g. Sunil Perera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">National ID / NIC</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. 199512345V"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] hover:opacity-95 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg"
          >
            <span>{language === 'si' ? "ලියාපදිංචි වන්න" : language === 'ta' ? "பதிவு செய்க" : "Create FinBridge Account"}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          <span>{language === 'si' ? "දැනටමත් ගිණුමක් තිබේද?" : language === 'ta' ? "ஏற்கனவே கணக்கு உள்ளதா?" : "Already have an account?"} </span>
          <Link href="/login" className="text-[#00D4AA] hover:underline font-semibold">
            {t.login}
          </Link>
        </div>
      </div>
    </div>
  );
}
