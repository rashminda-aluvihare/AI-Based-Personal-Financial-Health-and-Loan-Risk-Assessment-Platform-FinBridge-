"use client";

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Activity, 
  Sparkles, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { language, walletBalance, activeLoans, transactions, savingsGoals, user } = useAppStore();
  const t = translations[language];

  // Calculate stats
  const activeLoansSum = activeLoans.reduce((sum, item) => sum + item.remainingAmount, 0);
  const totalSpent = transactions
    .filter(tx => tx.type === 'transfer_out' || tx.type === 'utility')
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Credit health indicator value (e.g. 745)
  const creditScore = 745; 
  
  const getScoreColor = (score: number) => {
    if (score >= 750) return '#00D4AA';
    if (score >= 650) return '#6C63FF';
    if (score >= 500) return '#FBBF24';
    return '#FF6B6B';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return language === 'si' ? "විශිෂ්ටයි" : language === 'ta' ? "சிறந்தது" : "Excellent";
    if (score >= 650) return language === 'si' ? "හොඳයි" : language === 'ta' ? "நன்று" : "Good";
    if (score >= 500) return language === 'si' ? "සාමාන්‍යයි" : language === 'ta' ? "திருப்திகரம்" : "Fair";
    return language === 'si' ? "අවමයි" : language === 'ta' ? "மோசம்" : "Poor";
  };

  const pieData = [
    { name: 'Score', value: creditScore },
    { name: 'Remaining', value: 850 - creditScore }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white font-display">
            {t.welcome}, {user.name} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'si' 
              ? "මෙන්න ඔබේ වත්මන් මූල්‍ය දළ විශ්ලේෂණය සහ AI අවදානම් වාර්තාව." 
              : language === 'ta' 
              ? "உங்கள் தற்போதைய நிதி நிலவரம் மற்றும் AI அபாய அறிக்கை இதோ." 
              : "Here is your current financial summary and credit safety health report."}
          </p>
        </div>
        
        {/* Active time banner */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start md:self-auto">
          <Calendar className="w-4 h-4 text-[#00D4AA]" />
          <span>July 2026</span>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wallet balance */}
        <div className="glass-panel p-5 rounded-2xl glow-teal flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.walletBalance}</span>
            <div className="w-8 h-8 rounded-lg bg-[#00D4AA]/10 flex items-center justify-center text-[#00D4AA]">
              <Wallet className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-display text-white">
              ₨ {walletBalance.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#00D4AA] font-mono">LKR currency active</span>
          </div>
        </div>

        {/* Active Loan total */}
        <div className="glass-panel p-5 rounded-2xl glow-indigo flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.activeLoans}</span>
            <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-display text-white">
              ₨ {activeLoansSum.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#6C63FF] font-mono">
              {activeLoans.length} active micro-loans
            </span>
          </div>
        </div>

        {/* Total Spent */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.totalSpent}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Activity className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-display text-white">
              ₨ {totalSpent.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">CEB, mobile transfers</span>
          </div>
        </div>

        {/* AI Score Radial Preview */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between space-x-2">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              {t.financialHealth}
            </span>
            <div className="text-2xl font-black font-display" style={{ color: getScoreColor(creditScore) }}>
              {creditScore}
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10" style={{ color: getScoreColor(creditScore) }}>
              {getScoreLabel(creditScore)}
            </span>
          </div>

          <div className="w-16 h-16 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={26}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                >
                  <Cell fill={getScoreColor(creditScore)} />
                  <Cell fill="rgba(255,255,255,0.05)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI insights panel */}
          <div className="glass-panel p-6 rounded-3xl glow-indigo space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <Sparkles className="w-5 h-5 text-[#00D4AA]" />
              <h2 className="font-bold text-sm tracking-tight uppercase font-mono">{t.aiInsights}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">
                    {language === 'si' ? "බිල්පත් ක්‍රමවත් ගෙවීම්" : language === 'ta' ? "சரியான நேரத்தில் பில் செலுத்துதல்" : "On-Time Utility Payments"}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {language === 'si' 
                      ? "ඔබේ CEB සහ Dialog බිල්පත් ගෙවීමේ දත්ත 94%ක නිරවද්‍යතාවයක් පෙන්නුම් කරයි." 
                      : language === 'ta'
                      ? "உங்களின் CEB மற்றும் Dialog கட்டண கொடுப்பனவுகள் 94% சரியாக உள்ளது."
                      : "Your CEB and Dialog payment consistency is at 94%, boosting your AI credit score."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">
                    {language === 'si' ? "ණය-සිට-ආදායම් අනුපාතය" : language === 'ta' ? "கடன்-வருமான விகிதம்" : "Debt-to-Income Advice"}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {language === 'si' 
                      ? "පවතින ණය වාරික ඔබේ මාසික ආදායමෙන් 35%ක් ඉක්මවයි. නව ණය සීමා කරන්න." 
                      : language === 'ta'
                      ? "கடன் தவணைகள் உங்களின் வருமானத்தில் 35%ஐ எட்டியுள்ளது. புதிய கடன்களை தவிர்க்கவும்."
                      : "Active repayments consume 35% of monthly income. We recommend postponing new applications."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.quickActions}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/loans/apply" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#6C63FF] hover:bg-[#6C63FF]/5 transition text-center space-y-2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-200">{t.applyLoan}</span>
              </Link>

              <Link href="/wallet" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00D4AA] hover:bg-[#00D4AA]/5 transition text-center space-y-2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-[#00D4AA]/20 flex items-center justify-center text-[#00D4AA]">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-200">{t.sendMoney}</span>
              </Link>

              <Link href="/wallet" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-amber-400/5 transition text-center space-y-2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-200">{t.topUp}</span>
              </Link>

              <Link href="/risk-assessment" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/5 transition text-center space-y-2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-200">{t.riskAssessment}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right col: Savings Goal & Recent Activity */}
        <div className="space-y-6">
          {/* Savings Goals progress */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.savingsGoal}</h2>
              <span className="text-[10px] text-[#00D4AA] font-mono">2 Goals</span>
            </div>
            
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const percent = Math.round((goal.current / goal.target) * 100);
                const displayName = language === 'si' ? goal.nameSi : language === 'ta' ? goal.nameTa : goal.name;
                return (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium line-clamp-1">{displayName}</span>
                      <span className="text-[#00D4AA] font-semibold">{percent}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-[#00D4AA] to-cyan-400" style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>₨ {goal.current.toLocaleString()}</span>
                      <span>Target: ₨ {goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.recentActivity}</h2>
              <Link href="/wallet" className="text-[10px] text-[#6C63FF] hover:underline flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {transactions.slice(0, 4).map((tx) => {
                const isOut = tx.type === 'transfer_out' || tx.type === 'utility' || tx.type === 'repayment';
                const txRef = language === 'si' ? tx.referenceSi : language === 'ta' ? tx.referenceTa : tx.reference;
                return (
                  <div key={tx.id} className="flex justify-between items-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-slate-200 line-clamp-1">{txRef}</div>
                      <div className="text-[9px] text-slate-500 font-mono">{tx.date}</div>
                    </div>
                    <div className={`text-xs font-bold font-mono ${isOut ? 'text-[#FF6B6B]' : 'text-[#00D4AA]'}`}>
                      {isOut ? '-' : '+'} ₨ {tx.amount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
