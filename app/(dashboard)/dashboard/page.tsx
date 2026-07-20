"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Activity, 
  Sparkles, 
  Target, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Search, 
  ShieldCheck,
  TrendingDown,
  BarChart as BarChartIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell, 
  Legend 
} from 'recharts';

export default function DynamicDashboard() {
  const { 
    language, 
    role,
    incomeRecords, 
    expenseRecords, 
    loanRecords, 
    goals, 
    financialScore, 
    loanRisk, 
    recommendations
  } = useAppStore();
  const t = translations[language];

  // ==========================================
  // CLIENT / USER DASHBOARD VIEW
  // ==========================================
  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalEmi = loanRecords.reduce((sum, r) => sum + r.monthlyEmi, 0);
  const totalDebts = loanRecords.reduce((sum, r) => sum + r.remainingAmount, 0);
  
  const totalSavings = goals.reduce((sum, r) => sum + r.currentAmount, 0);
  const totalTargetGoals = goals.reduce((sum, r) => sum + r.targetAmount, 0);
  const avgGoalProgress = totalTargetGoals > 0 ? Math.round((totalSavings / totalTargetGoals) * 100) : 0;
  const dti = totalIncome > 0 ? Math.round((totalEmi / totalIncome) * 100) : 0;

  const clientTrendData = [
    { month: 'Feb', Income: 85000, Expenses: 50000, Savings: 15000, Debt: 120000 },
    { month: 'Mar', Income: 90000, Expenses: 62000, Savings: 12000, Debt: 100000 },
    { month: 'Apr', Income: 110000, Expenses: 75000, Savings: 20000, Debt: 80000 },
    { month: 'May', Income: 125000, Expenses: 72000, Savings: 32000, Debt: 60000 },
    { month: 'Jun', Income: 135000, Expenses: 68000, Savings: 40000, Debt: 290000 },
    { month: 'Jul', Income: totalIncome, Expenses: totalExpenses, Savings: totalSavings, Debt: totalDebts }
  ];

  // ==========================================
  // ADMIN DASHBOARD VIEW
  // ==========================================
  const [searchQuery, setSearchQuery] = useState('');
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

  const adminScoreDistribution = [
    { range: '300-500 (High Risk)', count: 120, fill: '#FF6B6B' },
    { range: '550-700 (Medium Risk)', count: 480, fill: '#6C63FF' },
    { range: '710-850 (Low Risk)', count: 648, fill: '#00D4AA' }
  ];

  // ==========================================
  // LENDER DASHBOARD VIEW
  // ==========================================
  const lenderPortfolioYield = [
    { month: 'Jan', ActiveInvestments: 2000000, YieldPaid: 24000 },
    { month: 'Feb', ActiveInvestments: 2400000, YieldPaid: 28800 },
    { month: 'Mar', ActiveInvestments: 3000000, YieldPaid: 36000 },
    { month: 'Apr', ActiveInvestments: 3200000, YieldPaid: 38400 },
    { month: 'May', ActiveInvestments: 4500000, YieldPaid: 54000 },
    { month: 'Jun', ActiveInvestments: 5200000, YieldPaid: 62400 }
  ];

  // Render Lender Dashboard View
  if (role === 'lender') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex justify-between items-center relative">
            <div>
              <span className="text-[10px] tracking-wider uppercase font-bold text-blue-100">Lender Console</span>
              <h1 className="text-xl md:text-2xl font-bold mt-0.5">Investment Portfolio Overview</h1>
              <p className="text-xs text-blue-100 mt-1">Evaluate overall solvency, average borrower risk levels, and portfolio yields.</p>
            </div>
            <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-semibold rounded-lg backdrop-blur-md">AUDITOR ACTIVE</span>
          </div>
        </div>

        {/* Portfolio Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Portfolio Size</span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-1">₨ 5,200,000</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Average Yield Rate</span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">14.4% APR</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Active Allocations</span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-1">42 Borrowers</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Default Exposure</span>
            <p className="text-base font-bold text-rose-500 mt-1">0.82% Low</p>
          </div>
        </div>

        {/* Yield Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase">Active Portfolio Growth & Yields</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lenderPortfolioYield}>
                  <XAxis dataKey="month" stroke="#64748B" fontSize={9} />
                  <YAxis stroke="#64748B" fontSize={9} />
                  <Tooltip contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="ActiveInvestments" stroke="#2563EB" fill="rgba(37, 99, 235, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard View
  if (role === 'admin') {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex justify-between items-center relative">
            <div>
              <span className="text-[10px] tracking-wider text-blue-400 uppercase font-bold">Admin Console</span>
              <h1 className="text-xl md:text-2xl font-bold mt-0.5">{t.adminConsole}</h1>
              <p className="text-xs text-slate-400 mt-1">Track registered platform users, monitor database schemas, and view score trends.</p>
            </div>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold rounded-lg border border-indigo-500/30">ADMIN MASTER</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="glass-panel p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Users</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">1,248</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Active Quizzes</span>
            <p className="text-base font-bold text-blue-600 dark:text-blue-400">3 Active</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Articles Feed</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">3 Published</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Avg Score</span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">74 / 100</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* User list */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <h3 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">Registered Users</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs rounded-xl pl-9 pr-4 py-1.5 text-slate-900 dark:text-white focus:outline-none w-full sm:w-56"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 font-semibold">Name</th>
                    <th className="py-2.5 font-semibold">City</th>
                    <th className="py-2.5 font-semibold text-right">Income</th>
                    <th className="py-2.5 font-semibold text-right">Score</th>
                    <th className="py-2.5 font-semibold text-center">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-slate-900 dark:text-slate-200">{user.name}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-400">{user.city}</td>
                      <td className="py-3 text-right font-medium text-slate-800 dark:text-slate-300">₨ {user.income.toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-slate-900 dark:text-white">{user.score}</td>
                      <td className="py-3 text-center">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          user.risk === 'Low' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-[#00D4AA]' : user.risk === 'Medium' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-[#FF6B6B]'
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

          {/* score distribution bar chart */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">{t.scoresDistribution}</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminScoreDistribution}>
                  <XAxis dataKey="range" stroke="#64748B" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {adminScoreDistribution.map((entry, index) => (
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

  // ==========================================
  // CLIENT / USER DASHBOARD VIEW (DEFAULT)
  // ==========================================
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-sm">
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] tracking-wider text-blue-100 uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Engine Active</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Hello, Rashminda Aluvihare
            </h1>
            <p className="text-xs text-blue-100">
              Welcome back to your financial health workspace. Here is your AI appraisal for today.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.income}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900 dark:text-white">₨ {totalIncome.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-600 dark:text-[#00D4AA] font-semibold flex items-center space-x-0.5">
              <ArrowDownLeft className="w-3 h-3" />
              <span>Log</span>
            </span>
          </div>
        </div>

        {/* Expense Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.expenses}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900 dark:text-white">₨ {totalExpenses.toLocaleString()}</span>
            <span className="text-[10px] text-rose-500 font-semibold flex items-center space-x-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>Log</span>
            </span>
          </div>
        </div>

        {/* Savings Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.savings}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900 dark:text-white">₨ {totalSavings.toLocaleString()}</span>
            <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-semibold flex items-center space-x-0.5">
              <Target className="w-3 h-3" />
              <span>Goals</span>
            </span>
          </div>
        </div>

        {/* DTI Card */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.debtRatio}</span>
          <div className="flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900 dark:text-white">{dti}%</span>
            <span className={`text-[10px] font-bold ${dti > 40 ? 'text-amber-500' : 'text-emerald-600'}`}>{dti > 40 ? 'Risk Alert' : 'Healthy'}</span>
          </div>
        </div>
      </div>

      {/* Main AI Core Scores Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core AI Gauge Assessment */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-col justify-center items-center text-center space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.financialScore}</h3>
          
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="rgba(0,0,0,0.06)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="64" 
                cy="64" 
                r="56" 
                stroke="#2563EB" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="351.8" 
                strokeDashoffset={351.8 - (351.8 * financialScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{financialScore}</span>
              <span className="text-[10px] text-slate-400 font-semibold">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-800 dark:text-white">Risk Rating: 
              <span className={`ml-1 font-bold ${
                loanRisk === 'Low' ? 'text-emerald-600 dark:text-emerald-400' : loanRisk === 'Medium' ? 'text-amber-500' : 'text-rose-500'
              }`}>{loanRisk}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Based on {incomeRecords.length} income sources, {expenseRecords.length} expenses, and {loanRecords.length} active loans.
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.recommendations}</h3>
          
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 hover:border-blue-300 dark:hover:border-indigo-500/20 transition-all duration-200">
                <div className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-[#6C63FF]/10 flex items-center justify-center text-blue-600 dark:text-[#6C63FF] shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Income vs Expense Area Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Income vs Expense Trend</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clientTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={9} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: 8, color: '#0F172A' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="Income" stroke="#16A34A" fill="rgba(22, 163, 74, 0.08)" />
                <Area type="monotone" dataKey="Expenses" stroke="#DC2626" fill="rgba(220, 38, 38, 0.08)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Progress quick status */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Savings Progress</h3>
          
          <div className="space-y-4">
            {goals.map((g) => {
              const prog = Math.round((g.currentAmount / g.targetAmount) * 100);
              return (
                <div key={g.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-800 dark:text-slate-300 font-semibold truncate max-w-[150px]">{g.name}</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-bold">{prog}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <div className="h-full bg-blue-600 dark:bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, prog)}%` }}></div>
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
