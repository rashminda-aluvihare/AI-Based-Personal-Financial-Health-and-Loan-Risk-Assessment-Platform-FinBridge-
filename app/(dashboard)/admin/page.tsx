"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  Search, 
  UserCheck 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';

export default function AdminConsolePage() {
  const { language } = useAppStore();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');

  // Mock registered users list mapping to spec database entities
  const mockUsersList = [
    { id: "usr-101", name: "Bandara Rambukwella", city: "Kandy", income: 145000, score: 82, risk: "Low", job: "Tea Factory Manager" },
    { id: "usr-102", name: "Fathima Rizna", city: "Colombo", income: 110000, score: 74, risk: "Medium", job: "Software QA Engineer" },
    { id: "usr-103", name: "Sivalingam Kugan", city: "Jaffna", income: 85000, score: 48, risk: "High", job: "Retail Business Owner" },
    { id: "usr-104", name: "Priyantha Kumara", city: "Galle", income: 95000, score: 79, risk: "Low", job: "Tourism Operator" },
    { id: "usr-105", name: "Dilani Perera", city: "Negombo", income: 55000, score: 38, risk: "High", job: "Freelance Designer" }
  ];

  const filteredUsers = mockUsersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Distribution chart data
  const scoreDistribution = [
    { range: '300-500 (High Risk)', count: 120, fill: '#FF6B6B' },
    { range: '550-700 (Medium Risk)', count: 480, fill: '#6C63FF' },
    { range: '710-850 (Low Risk)', count: 648, fill: '#00D4AA' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.adminConsole}</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review overall platform metrics, inspect user scores, manage literacy materials, and check AI health parameters.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="uppercase tracking-widest text-[9px]">Total Users</span>
            <Users className="w-4 h-4 text-[#00D4AA]" />
          </div>
          <p className="text-xl font-bold text-white">1,248</p>
          <span className="text-[9px] text-[#00D4AA]">+14% monthly growth</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="uppercase tracking-widest text-[9px]">Active Quizzes</span>
            <GraduationCap className="w-4 h-4 text-[#6C63FF]" />
          </div>
          <p className="text-xl font-bold text-white">3 Quizzes</p>
          <span className="text-[9px] text-slate-400">100% completion rate</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="uppercase tracking-widest text-[9px]">Articles Feed</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-bold text-white">3 Published</p>
          <span className="text-[9px] text-slate-400">2 pending drafts</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="uppercase tracking-widest text-[9px]">Avg Health Score</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-xl font-bold text-white">74 / 100</p>
          <span className="text-[9px] text-emerald-400 font-bold">Stable profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Users Statistics Listing */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h3 className="font-bold text-sm tracking-tight text-white font-mono uppercase">User Registry</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name/city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 text-xs rounded-xl pl-9 pr-4 py-2 text-white focus:outline-none w-full sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-500 uppercase tracking-widest text-[9px]">
                  <th className="py-2.5 font-normal">Name</th>
                  <th className="py-2.5 font-normal">City</th>
                  <th className="py-2.5 font-normal">Occupation</th>
                  <th className="py-2.5 font-normal text-right">Income</th>
                  <th className="py-2.5 font-normal text-right">Score</th>
                  <th className="py-2.5 font-normal text-center">Risk</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-slate-200">{user.name}</td>
                    <td className="py-3 text-slate-400">{user.city}</td>
                    <td className="py-3 text-slate-400 truncate max-w-[120px]">{user.job}</td>
                    <td className="py-3 text-right text-slate-300">₨ {user.income.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-white">{user.score}</td>
                    <td className="py-3 text-center">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        user.risk === 'Low' ? 'bg-emerald-500/10 text-[#00D4AA]' : 'bg-rose-500/10 text-[#FF6B6B]'
                      }`}>
                        {user.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recharts Score distribution bar chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4 glow-indigo">
          <h3 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.scoresDistribution.split(' ')[0] + ' ' + t.scoresDistribution.split(' ')[1]}</h3>
          
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <XAxis dataKey="range" stroke="#475569" fontSize={8} tickLine={false} />
                <YAxis stroke="#475569" fontSize={8} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
