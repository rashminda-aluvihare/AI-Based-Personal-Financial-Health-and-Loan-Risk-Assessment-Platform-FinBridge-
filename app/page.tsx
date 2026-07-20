"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  ShieldCheck, 
  ArrowRight, 
  Wallet, 
  LineChart, 
  Users, 
  Globe, 
  Sparkles,
  BookOpen,
  Sun,
  Moon
} from 'lucide-react';

export default function LandingPage() {
  const { language, setLanguage, theme, setTheme } = useAppStore();
  const t = translations[language];

  // Live stats mock
  const stats = [
    { value: "₨ 450M+", label: language === 'si' ? "මුළු ණය බෙදා හැරීම" : language === 'ta' ? "மொத்த கடன் வழங்கல்" : "Total Loans Disbursed" },
    { value: "98.4%", label: language === 'si' ? "නියමිත වේලාවට ගෙවීම්" : language === 'ta' ? "சரியான நேர திருப்பிச் செலுத்தல்" : "On-Time Repayment Rate" },
    { value: "18,200+", label: language === 'si' ? "සක්‍රීය ගොවීන් සහ ව්‍යවසායකයින්" : language === 'ta' ? "செயலில் உள்ள பயனர்கள்" : "Active Borrowers & Lenders" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0E1A] flex flex-col justify-between">
      {/* Dynamic Animated Gradient Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#6C63FF]/15 to-transparent blur-[120px] mesh-glow-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#00D4AA]/10 to-transparent blur-[120px] mesh-glow-2"></div>
      </div>

      {/* Header bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] flex items-center justify-center font-bold text-white text-xl tracking-tight shadow-lg shadow-[#6C63FF]/20">
            FB
          </div>
          <div>
            <span className="font-extrabold text-xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {t.brand}
            </span>
            <div className="text-[10px] text-[#00D4AA] font-mono tracking-wider">AI PLATFORM</div>
          </div>
        </div>

        {/* Header selectors */}
        <div className="flex items-center space-x-3">
          {/* Theme Selector Toggle */}
          <button
            onClick={() => {
              const nextTheme = theme === 'dark' ? 'dim' : theme === 'dim' ? 'light' : 'dark';
              setTheme(nextTheme);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-slate-200"
            title="Toggle Theme Intensity (Dark / Dim / Light)"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-[#6C63FF]" />
            ) : theme === 'dim' ? (
              <Sparkles className="w-4 h-4 text-cyan-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            {['en', 'si', 'ta'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`px-3 py-1 rounded-md text-xs font-semibold border transition ${
                  language === lang 
                    ? 'bg-gradient-to-r from-[#6C63FF]/25 to-[#00D4AA]/25 border-[#6C63FF]/50 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'si' ? 'සිං' : 'தமிழ்'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex-grow flex flex-col justify-center items-center text-center">
        {/* Animated Banner */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-[#00D4AA] mb-8 hover:bg-white/10 transition-colors cursor-pointer">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'si' ? "ශ්‍රී ලංකාවේ ප්‍රථම AI ක්ෂුද්‍ර මූල්‍ය පසුම්බිය" : language === 'ta' ? "இலங்கையின் முதல் AI நுண்கடன் வாலட்" : "Sri Lanka's 1st AI Micro-Credit Wallet"}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight max-w-4xl leading-tight">
          {t.tagline}
        </h1>
        
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          {t.taglineSub}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link 
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] hover:opacity-95 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-[#6C63FF]/25 group"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl flex items-center justify-center transition"
          >
            <span>{t.register}</span>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl glow-indigo text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-cyan-400 font-display">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-24 w-full text-left space-y-8">
          <h2 className="text-2xl font-bold font-display text-white text-center">
            {language === 'si' ? "ප්‍රධාන සේවාවන්" : language === 'ta' ? "முக்கிய அம்சங்கள்" : "Engineered for FinTech Inclusion"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white">{t.riskAssessment}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'si' 
                  ? "බිල්පත් ගෙවීම්, ගොවිතැන් ඉතුරුම් සහ ප්‍රජා සහභාගීත්වය මත පදනම් වූ විනිවිද පෙනෙන AI ණය තක්සේරුව."
                  : language === 'ta'
                  ? "கட்டண கொடுப்பனவுகள் மற்றும் சமூக மதிப்பு அடிப்படையிலான வெளிப்படையான AI கடன் மதிப்பீடு."
                  : "Transparent, real-time risk assessment utilizing utility patterns, savings habits, and peer reviews."}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center text-[#00D4AA]">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white">{t.wallet}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'si' 
                  ? "ක්ෂණිකව ශ්‍රී ලංකා රුපියල් (LKR) යවන්න, ලබාගන්න, සහ බිල්පත් ගෙවන්න. ආරක්ෂිත ඩිජිටල් පසුම්බිය."
                  : language === 'ta'
                  ? "இலங்கை ரூபாயில் பணம் அனுப்ப, பெற மற்றும் பில் செலுத்த பாதுகாப்பான டிஜிட்டல் வாலட்."
                  : "Send, receive, and top-up LKR instantly. Make utility payments directly from your secure mobile wallet."}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white">{t.loans}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'si' 
                  ? "ප්‍රාදේශීය ගොවීන්ට සහ කාන්තාවන්ට වෙන්වූ ක්ෂුද්‍ර ණය නිෂ්පාදන. සාධාරණ පොලී අනුපාත."
                  : language === 'ta'
                  ? "விவசாயிகள் மற்றும் பெண்களுக்கு ஏற்ற பிரத்தியேக நுண்கடன்கள். நியாயமான வட்டி விகிதங்கள்."
                  : "Tailored micro-credit products for local agriculture, small businesses, and community vocational growth."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-[#0A0E1A]/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span>Powered by Next.js 14 & Tailwind CSS</span>
          </div>
          <span>© 2026 FinBridge Microfinance Platform (Sri Lanka)</span>
        </div>
      </footer>
    </div>
  );
}
