"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Globe, User, Shield, Briefcase, ChevronDown, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, role, setRole, user, theme, setTheme } = useAppStore();
  const t = translations[language];
  const [langOpen, setLangOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const langNames = {
    en: "English",
    si: "සිංහල",
    ta: "தமிழ்"
  };

  const roleLabels = {
    borrower: t.borrower,
    lender: t.lender,
    admin: t.admin
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0E1A]/85 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Brand logo */}
      <div className="flex items-center space-x-3">
        <img src="/logo_icon.png" alt="FinBridge Logo" className="w-10 h-10 rounded-xl object-cover shadow-md border border-white/10" />
        <div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {t.brand}
          </span>
          <div className="text-[10px] text-[#00D4AA] font-mono tracking-wider">AI PLATFORM</div>
        </div>
      </div>

      {/* Center status for LKR context */}
      <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse"></span>
        <span>Sri Lanka Hub (LKR ₨)</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Theme Selector Toggle */}
        <button
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'dim' : theme === 'dim' ? 'light' : 'dark';
            setTheme(nextTheme);
          }}
          className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-slate-200"
          title="Toggle Theme Intensity (Dark / Dim / Light)"
        >
          {theme === 'dark' ? (
            <Moon className="w-4.5 h-4.5 text-[#6C63FF]" />
          ) : theme === 'dim' ? (
            <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
          ) : (
            <Sun className="w-4.5 h-4.5 text-amber-400" />
          )}
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setLangOpen(!langOpen); setRoleOpen(false); }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm text-slate-200 font-medium"
          >
            <Globe className="w-4 h-4 text-[#00D4AA]" />
            <span>{langNames[language]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          {langOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl border border-white/10 bg-[#111827] shadow-xl overflow-hidden z-50">
              <button 
                onClick={() => { setLanguage('en'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#6C63FF]/20 transition ${language === 'en' ? 'text-[#00D4AA] font-semibold bg-[#6C63FF]/10' : 'text-slate-300'}`}
              >
                English
              </button>
              <button 
                onClick={() => { setLanguage('si'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#6C63FF]/20 transition ${language === 'si' ? 'text-[#00D4AA] font-semibold bg-[#6C63FF]/10' : 'text-slate-300'}`}
              >
                සිංහල
              </button>
              <button 
                onClick={() => { setLanguage('ta'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#6C63FF]/20 transition ${language === 'ta' ? 'text-[#00D4AA] font-semibold bg-[#6C63FF]/10' : 'text-slate-300'}`}
              >
                தமிழ்
              </button>
            </div>
          )}
        </div>

        {/* User Role Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6C63FF]/10 to-[#00D4AA]/10 border border-[#6C63FF]/20 text-xs font-mono text-slate-200">
          {role === 'admin' ? (
            <>
              <Shield className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span className="font-bold text-[#FF6B6B]">Admin</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span className="font-semibold text-slate-300">User</span>
            </>
          )}
        </div>

        {/* User Profile avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] p-[1px]">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center text-xs font-bold text-[#00D4AA]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="hidden lg:inline text-xs text-slate-400 font-medium">{user.name}</span>
        </div>
      </div>
    </nav>
  );
}
