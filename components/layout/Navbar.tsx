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
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0A0E1A]/85 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-sm transition-colors">
      {/* Brand logo */}
      <div className="flex items-center space-x-3">
        <img src="/logo_icon.png" alt="FinBridge Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm border border-slate-200 dark:border-white/10" />
        <div>
          <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
            {t.brand}
          </span>
          <div className="text-[10px] text-blue-600 dark:text-[#00D4AA] font-semibold tracking-wider">AI PLATFORM</div>
        </div>
      </div>

      {/* Center status for LKR context */}
      <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-medium">
        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00D4AA] animate-pulse"></span>
        <span>Sri Lanka Hub (LKR ₨)</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Theme Selector Toggle */}
        <button
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'dim' : theme === 'dim' ? 'light' : 'dark';
            setTheme(nextTheme);
          }}
          className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition text-slate-700 dark:text-slate-200"
          title="Toggle Theme Intensity (Dark / Dim / Light)"
        >
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-blue-500" />
          ) : theme === 'dim' ? (
            <Sparkles className="w-4 h-4 text-cyan-500" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setLangOpen(!langOpen); setRoleOpen(false); }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition text-xs text-slate-700 dark:text-slate-200 font-semibold"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-[#00D4AA]" />
            <span>{langNames[language]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          {langOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow-xl overflow-hidden z-50">
              <button 
                onClick={() => { setLanguage('en'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#6C63FF]/20 transition ${language === 'en' ? 'text-blue-600 dark:text-[#00D4AA] bg-blue-50 dark:bg-[#6C63FF]/10' : 'text-slate-700 dark:text-slate-300'}`}
              >
                English
              </button>
              <button 
                onClick={() => { setLanguage('si'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#6C63FF]/20 transition ${language === 'si' ? 'text-blue-600 dark:text-[#00D4AA] bg-blue-50 dark:bg-[#6C63FF]/10' : 'text-slate-700 dark:text-slate-300'}`}
              >
                සිංහල
              </button>
              <button 
                onClick={() => { setLanguage('ta'); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#6C63FF]/20 transition ${language === 'ta' ? 'text-blue-600 dark:text-[#00D4AA] bg-blue-50 dark:bg-[#6C63FF]/10' : 'text-slate-700 dark:text-slate-300'}`}
              >
                தமிழ்
              </button>
            </div>
          )}
        </div>

        {/* User Role Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-[#6C63FF]/10 border border-blue-100 dark:border-[#6C63FF]/20 text-xs font-semibold text-slate-700 dark:text-slate-200">
          {role === 'admin' ? (
            <>
              <Shield className="w-3.5 h-3.5 text-rose-500" />
              <span className="font-bold text-rose-600 dark:text-[#FF6B6B]">Admin</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-[#6C63FF]" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">User</span>
            </>
          )}
        </div>

        {/* User Profile avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-white/10">
          <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-gradient-to-tr dark:from-[#6C63FF] dark:to-[#00D4AA] p-[1px]">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#111827] flex items-center justify-center text-xs font-bold text-blue-600 dark:text-[#00D4AA]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="hidden lg:inline text-xs text-slate-700 dark:text-slate-400 font-semibold">{user.name}</span>
        </div>
      </div>
    </nav>
  );
}
