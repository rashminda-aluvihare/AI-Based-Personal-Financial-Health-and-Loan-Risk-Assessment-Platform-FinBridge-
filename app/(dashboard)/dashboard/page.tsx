"use client";

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  TrendingDown, 
  AlertCircle, 
  Sparkles,
  Target,
  Plus,
  Moon,
  Sun
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid, LineChart, Line, Legend } from 'recharts';

export default function DashboardPage() {
  const { 
    language, 
    incomeRecords, 
    expenseRecords, 
    loanRecords, 
    goals, 
    financialScore, 
    loanRisk, 
    recommendations,
    theme,
    setTheme
  } = useAppStore();
  const t = translations[language];

  // 1. Calculate values from stores
  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalEmi = loanRecords.reduce((sum, r) => sum + r.monthlyEmi, 0);
  const totalDebts = loanRecords.reduce((sum, r) => sum + r.remainingAmount, 0);
  
  const totalSavings = goals.reduce((sum, r) => sum + r.currentAmount, 0);
  const totalTargetGoals = goals.reduce((sum, r) => sum + r.targetAmount, 0);
  const avgGoalProgress = totalTargetGoals > 0 ? Math.round((totalSavings / totalTargetGoals) * 100) : 0;

  const dti = totalIncome > 0 ? Math.round((totalEmi / totalIncome) * 100) : 0;

  // 2. Mock historical trends representing spec module 11
  const trendData = [
    { month: 'Feb', Income: 85000, Expenses: 50000, Savings: 15000, Debt: 120000 },
    { month: 'Mar', Income: 90000, Expenses: 62000, Savings: 12000, Debt: 100000 },
    { month: 'Apr', Income: 110000, Expenses: 75000, Savings: 20000, Debt: 80000 },
    { month: 'May', Income: 125000, Expenses: 72000, Savings: 32000, Debt: 60000 },
    { month: 'Jun', Income: 135000, Expenses: 68000, Savings: 40000, Debt: 290000 },
    { month: 'Jul', Income: totalIncome, Expenses: totalExpenses, Savings: totalSavings, Debt: totalDebts }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#1E1B4B]/80 via-[#311042]/50 to-[#0F172A]/80 border border-white/10 glow-indigo">
        {/* Decorative dynamic circles */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-[#6C63FF]/10 blur-3xl"></div>
        <div className="absolute right-20 bottom-0 -mb-10 w-24 h-24 rounded-full bg-[#00D4AA]/10 blur-2xl"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#00D4AA] uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Engine Active</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white font-display tracking-tight">
              Hello, Rashminda Aluvihare
            </h1>
            <p className="text-xs text-slate-400">
              Welcome back to your financial cockpit. Here is your AI health appraisal for today.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Custom Theme cycler toggle */}
            <button
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'dim' : theme === 'dim' ? 'light' : 'dark';
                setTheme(nextTheme);
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span>Dark Mode</span>
                </>
              ) : theme === 'dim' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dim Gray</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.income}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-sm md:text-base font-bold font-mono text-white">₨ {totalIncome.toLocaleString()}</span>
            <span className="text-[9px] text-[#00D4AA] flex items-center space-x-0.5">
              <ArrowDownLeft className="w-3 h-3" />
              <span>Log</span>
            </span>
          </div>
        </div>

        {/* Expense Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.expenses}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-sm md:text-base font-bold font-mono text-white">₨ {totalExpenses.toLocaleString()}</span>
            <span className="text-[9px] text-rose-400 flex items-center space-x-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>Log</span>
            </span>
          </div>
        </div>

        {/* Savings Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.savings}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-sm md:text-base font-bold font-mono text-white">₨ {totalSavings.toLocaleString()}</span>
            <span className="text-[9px] text-cyan-400 flex items-center space-x-0.5">
              <Target className="w-3 h-3" />
              <span>Goals</span>
            </span>
          </div>
        </div>

        {/* DTI Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.debtRatio}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-sm md:text-base font-bold font-mono text-white">{dti}%</span>
            <span className="text-[9px] text-amber-400 font-bold">{dti > 40 ? 'Risk Alert' : 'Healthy'}</span>
          </div>
        </div>
      </div>

      {/* Main AI Core Scores Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core AI Gauge Assessment */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-col justify-center items-center text-center space-y-4 glow-indigo">
          <h3 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-widest">{t.financialScore}</h3>
          
          <div className="relative flex items-center justify-center">
            {/* Radial glow background */}
            <div className="absolute w-28 h-28 rounded-full bg-[#6C63FF]/10 blur-xl"></div>
            
            {/* Gauge Circle */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="64" 
                cy="64" 
                r="56" 
                stroke="url(#gradScore)" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="351.8" 
                strokeDashoffset={351.8 - (351.8 * financialScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradScore" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C63FF" />
                  <stop offset="100%" stopColor="#00D4AA" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white font-mono tracking-tighter">{financialScore}</span>
              <span className="text-[9px] text-slate-400 font-mono">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-white">Risk Rating: 
              <span className={`ml-1 font-bold ${
                loanRisk === 'Low' ? 'text-emerald-400' : loanRisk === 'Medium' ? 'text-amber-400' : 'text-rose-400'
              }`}>{loanRisk}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
              Based on {incomeRecords.length} income sources, {expenseRecords.length} expenses, and {loanRecords.length} active loans.
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-widest">{t.recommendations}</h3>
          
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all duration-200">
                <div className="w-5 h-5 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Income vs Expense Area Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-widest">Income vs Expense Trend</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#475569" fontSize={9} tickLine={false} />
                <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="Income" stroke="#00D4AA" fill="rgba(0, 212, 170, 0.05)" />
                <Area type="monotone" dataKey="Expenses" stroke="#FF6B6B" fill="rgba(255, 107, 107, 0.05)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Progress quick status */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-widest">Savings Progress</h3>
          
          <div className="space-y-4">
            {goals.map((g) => {
              const prog = Math.round((g.currentAmount / g.targetAmount) * 100);
              return (
                <div key={g.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300 font-semibold truncate max-w-[150px]">{g.name}</span>
                    <span className="text-cyan-400 font-bold">{prog}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, prog)}%` }}></div>
                  </div>
                </div>
              );
            })}

            {goals.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-10">No goals currently setup.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
