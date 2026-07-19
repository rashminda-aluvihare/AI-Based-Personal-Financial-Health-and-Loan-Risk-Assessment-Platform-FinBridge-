"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  User, 
  Settings, 
  Globe, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  FileText,
  Save,
  CheckCircle2
} from 'lucide-react';

export default function ProfilePage() {
  const { language, setLanguage, user, role } = useAppStore();
  const t = translations[language];

  // Local form inputs
  const [userName, setUserName] = useState(user.name);
  const [userPhone, setUserPhone] = useState(user.phone);
  const [location, setLocation] = useState('Colombo, Sri Lanka');
  const [nic, setNic] = useState('199512345V');
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">Settings & Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure your personal details, language localization, and account parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Summary info */}
        <div className="glass-panel p-6 rounded-3xl text-center space-y-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] p-[2px] shadow-lg shadow-[#6C63FF]/20">
            <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center text-2xl font-bold text-[#00D4AA]">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-white text-base font-display">{userName}</h3>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D4AA]/25 text-[#00D4AA] border border-[#00D4AA]/20 uppercase">
              {role}
            </span>
          </div>

          <div className="w-full h-[1px] bg-white/5 my-2"></div>

          <div className="w-full space-y-2 text-xs text-slate-400 text-left">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{userPhone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
              <span>NIC: {nic}</span>
            </div>
          </div>
        </div>

        {/* Right Form settings */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Profile parameters</h2>

          {showSaved && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#00D4AA] text-xs rounded-xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Mobile Phone</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Location Region</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">National NIC ID</label>
                <input
                  type="text"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>
            </div>

            {/* Language settings */}
            <div className="space-y-1.5 pt-4 border-t border-white/5">
              <label className="text-[10px] font-mono text-slate-500 uppercase block">Preferred Localization language</label>
              <div className="flex gap-2">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'si', label: 'සිංහල' },
                  { code: 'ta', label: 'தமிழ்' }
                ].map(lang => (
                  <button
                    type="button"
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`px-4 py-2 rounded-xl border text-xs font-semibold transition ${
                      language === lang.code 
                        ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-white' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Parameters</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
