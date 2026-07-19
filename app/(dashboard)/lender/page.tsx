"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { mockBorrowerProfiles, BorrowerProfile } from '@/lib/mock-data';
import { 
  TrendingUp, 
  ShieldAlert, 
  HelpCircle, 
  ArrowUpRight, 
  Settings2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

export default function LenderPage() {
  const { language, walletBalance } = useAppStore();
  const t = translations[language];

  // Auto-invest settings states
  const [autoInvestActive, setAutoInvestActive] = useState(false);
  const [minScore, setMinScore] = useState(650);
  const [maxRisk, setMaxRisk] = useState<'Low' | 'Medium' | 'High'>('Medium');

  // Funding simulation states
  const [fundedLoans, setFundedLoans] = useState<string[]>([]);
  const [portfolioBalance, setPortfolioBalance] = useState(1250000);

  // Return projections mock data
  const data = [
    { month: 'Jan', return: 22000 },
    { month: 'Feb', return: 45000 },
    { month: 'Mar', return: 68000 },
    { month: 'Apr', return: 91000 },
    { month: 'May', return: 115000 },
    { month: 'Jun', return: 145000 },
  ];

  const handleFund = (id: string, amt: number) => {
    if (fundedLoans.includes(id)) return;
    if (walletBalance < amt) {
      alert("Insufficient wallet balance to fund this micro-loan!");
      return;
    }
    
    // Simulate funding
    setFundedLoans(prev => [...prev, id]);
    setPortfolioBalance(prev => prev + amt);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-[#00D4AA]';
      case 'Medium': return 'text-[#6C63FF]';
      case 'High': return 'text-amber-400';
      case 'Very High': return 'text-[#FF6B6B]';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.lenderPanel}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'si' 
            ? "ප්‍රජා ණය කළඹ කළමනාකරණය කරන්න, අවදානම් තක්සේරු පිරික්සන්න හෝ ස්වයංක්‍රීය ආයෝජන සකසන්න." 
            : language === 'ta' 
            ? "கடன் தொகுப்பை நிர்வகிக்கவும், ஆபத்து சுயவிவரங்களை ஆராயவும் அல்லது முதலீட்டை அமைக்கவும்." 
            : "Deploy capital into micro-loans, analyze yields, and configure AI-driven auto-investment limits."}
        </p>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl glow-indigo space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.deployedCapital}</span>
          <div className="text-3xl font-extrabold font-display text-white">
            ₨ {portfolioBalance.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#00D4AA] font-mono">+12.4% Annual Yield Avg</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl glow-teal space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.netReturns}</span>
          <div className="text-3xl font-extrabold font-display text-white">
            ₨ {data[5].return.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#6C63FF] font-mono">Paid Monthly payouts</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.nplRatio}</span>
          <div className="text-3xl font-extrabold font-display text-[#FF6B6B]">
            1.22%
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Well below 5% threshold</span>
        </div>
      </div>

      {/* Main split row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Portfolio yield graph & auto invest */}
        <div className="lg:col-span-5 space-y-6">
          {/* Yield Chart */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Cumulative Yield Performance</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }} />
                  <Area type="monotone" dataKey="return" stroke="#00D4AA" fillOpacity={1} fill="url(#colorReturn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Auto-invest form */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-white">
                <Settings2 className="w-5 h-5 text-[#6C63FF]" />
                <h2 className="font-bold text-sm tracking-tight font-mono uppercase">{t.autoInvest}</h2>
              </div>
              
              {/* Toggle switch */}
              <button 
                onClick={() => setAutoInvestActive(!autoInvestActive)}
                className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                  autoInvestActive ? 'bg-[#00D4AA]' : 'bg-white/10'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  autoInvestActive ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min Borrower Credit Score:</span>
                  <span className="text-white font-bold">{minScore}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="800"
                  step="10"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  disabled={!autoInvestActive}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#6C63FF] disabled:opacity-30"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 block">Max Risk Appetite Cap:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map(risk => (
                    <button
                      key={risk}
                      onClick={() => setMaxRisk(risk)}
                      disabled={!autoInvestActive}
                      className={`py-1.5 rounded-lg border text-[10px] font-mono uppercase transition ${
                        maxRisk === risk 
                          ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-[#6C63FF] font-bold' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white disabled:opacity-30'
                      }`}
                    >
                      {risk}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right active portfolios listing */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.borrowerProfiles}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockBorrowerProfiles.map((borrower) => {
              const isFunded = fundedLoans.includes(borrower.id);
              return (
                <div key={borrower.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">{borrower.location}</span>
                      <span className={`font-bold uppercase ${getRiskColor(borrower.riskCategory)}`}>
                        {borrower.riskCategory} Risk
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white text-sm">{borrower.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{borrower.purpose}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono py-2 border-t border-white/5 text-slate-400">
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="text-white font-bold">{borrower.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span className="text-[#00D4AA] font-bold">{borrower.interestRate}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFund(borrower.id, borrower.amount)}
                    disabled={isFunded}
                    className={`w-full py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider font-semibold transition ${
                      isFunded 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-[#00D4AA] cursor-default flex items-center justify-center space-x-1' 
                        : 'bg-white/5 hover:bg-[#00D4AA]/10 border border-white/10 hover:border-[#00D4AA] text-white'
                    }`}
                  >
                    {isFunded ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Funded (₨ {borrower.amount / 1000}k)</span>
                      </>
                    ) : (
                      <span>Fund ₨ {borrower.amount.toLocaleString()}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
