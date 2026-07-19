"use client";

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { calculateCreditScore, ScoreInput, ScoreOutput } from '@/lib/ai-engine';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle,
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

export default function RiskAssessmentPage() {
  const { language } = useAppStore();
  const t = translations[language];

  // Form input states
  const [income, setIncome] = useState(75000);
  const [dependents, setDependents] = useState(2);
  const [existingDebt, setExistingDebt] = useState(15000);
  const [savings, setSavings] = useState(18000);
  const [utilityRatio, setUtilityRatio] = useState(92);
  const [communityRating, setCommunityRating] = useState(4.5);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);

  // Result output states
  const [result, setResult] = useState<ScoreOutput | null>(null);
  const [radarData, setRadarData] = useState<any[]>([]);

  const runAssessment = () => {
    const input: ScoreInput = {
      income,
      dependents,
      existingDebt,
      savings,
      utilityPaymentRatio: utilityRatio,
      communityRating,
      loanAmount,
      tenureMonths: tenure
    };

    const output = calculateCreditScore(input);
    setResult(output);

    // Parse data for Radar Chart
    // Normalize factors to 100-based scale for visualization
    const dtiRatio = income > 0 ? Math.min(100, (existingDebt / income) * 100) : 100;
    const stabilityVal = Math.max(0, 100 - dtiRatio);
    const savingsVal = income > 0 ? Math.min(100, (savings / (income * 0.3)) * 100) : 0;
    const utilityVal = utilityRatio;
    const communityVal = (communityRating / 5) * 100;
    const burdenVal = income > 0 ? Math.max(0, 100 - (loanAmount / (income * 12)) * 100) : 0;

    setRadarData([
      { subject: language === 'si' ? 'ස්ථාවරත්වය' : language === 'ta' ? 'ஸ்திரத்தன்மை' : 'Stability (DTI)', A: Math.round(stabilityVal), fullMark: 100 },
      { subject: language === 'si' ? 'ඉතුරුම්' : language === 'ta' ? 'சேமிப்பு' : 'Savings Buffer', A: Math.round(savingsVal), fullMark: 100 },
      { subject: language === 'si' ? 'බිල්පත්' : language === 'ta' ? 'பில் செலுத்துதல்' : 'Utility Payment', A: Math.round(utilityVal), fullMark: 100 },
      { subject: language === 'si' ? 'ප්‍රජා ලකුණු' : language === 'ta' ? 'சமூக மதிப்பு' : 'Community Score', A: Math.round(communityVal), fullMark: 100 },
      { subject: language === 'si' ? 'ණය බර' : language === 'ta' ? 'கடன் அளவு' : 'Loan Proportion', A: Math.round(burdenVal), fullMark: 100 },
    ]);
  };

  // Run initial calculation once on mount or when sliders change in simulation
  useEffect(() => {
    runAssessment();
  }, [income, dependents, existingDebt, savings, utilityRatio, communityRating, loanAmount, tenure, language]);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-500/10 border-emerald-500/20 text-[#00D4AA]';
      case 'Medium': return 'bg-indigo-500/10 border-indigo-500/20 text-[#6C63FF]';
      case 'High': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'Very High': return 'bg-rose-500/10 border-rose-500/20 text-[#FF6B6B]';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.aiRiskEngine}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'si' 
            ? "ශ්‍රී ලංකා සාම්ප්‍රදායික නොවන දත්ත ඇතුලත් කර තත්කාලීන අවදානම් සහ ණය ලකුණු ගණනය කරන්න." 
            : language === 'ta' 
            ? "வழக்கத்திற்கு மாறான தரவுகளைப் பயன்படுத்தி கடன் அபாயம் மற்றும் வட்டி விகிதத்தை கணக்கிடுங்கள்." 
            : "Use non-traditional socio-financial inputs to evaluate creditworthiness, approval probability, and rates."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Assessment Input Sliders</h2>
          
          <div className="space-y-4">
            {/* Income Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.incomeLabel}</span>
                <span className="text-[#00D4AA] font-semibold">₨ {income.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#00D4AA]"
              />
            </div>

            {/* Existing Debt Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.existingDebtLabel}</span>
                <span className="text-[#FF6B6B] font-semibold">₨ {existingDebt.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="2500"
                value={existingDebt}
                onChange={(e) => setExistingDebt(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#FF6B6B]"
              />
            </div>

            {/* Savings Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.savingsLabel}</span>
                <span className="text-[#6C63FF] font-semibold">₨ {savings.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="2000"
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#6C63FF]"
              />
            </div>

            {/* Utility billing ratio */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.utilityLabel}</span>
                <span className="text-cyan-400 font-semibold">{utilityRatio}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="1"
                value={utilityRatio}
                onChange={(e) => setUtilityRatio(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Community Rating */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.communityRatingLabel}</span>
                <span className="text-amber-400 font-semibold">★ {communityRating.toFixed(1)} / 5.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={communityRating}
                onChange={(e) => setCommunityRating(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Loan amount request */}
            <div className="space-y-1.5 pt-4 border-t border-white/5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{t.loanAmount}</span>
                <span className="text-white font-semibold">₨ {loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs / Charts */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Gauge Dashboard */}
              <div className="glass-panel p-6 rounded-3xl space-y-6 flex flex-col justify-between glow-indigo">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.creditScore}</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-5xl font-black font-display text-white">{result.score}</span>
                    <span className="text-xs text-slate-500 font-mono">/ 850</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">{t.riskCategory}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${getRiskBadgeColor(result.riskCategory)}`}>
                      {result.riskCategory}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">{t.approvalProb}</span>
                    <span className="text-sm font-bold text-white">{result.approvalProbability}%</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#6C63FF]/10 to-[#00D4AA]/10 border border-[#6C63FF]/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{t.recommendedRate}</span>
                    <span className="text-sm font-extrabold text-[#00D4AA]">{result.interestRate}% APR</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
              </div>

              {/* Radar Chart */}
              <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between h-64 md:h-auto">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Socio-Financial Vector Dimensions</span>
                <div className="flex-1 min-h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" radius="80%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={9} />
                      <Radar name="Borrower Profiler" dataKey="A" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* AI Decision reasoning */}
          {result && (
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.aiReasoning}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Positive factors */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Positive Indicators</span>
                  <ul className="space-y-2">
                    {result.reasons.positive.map((reason, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-300 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-[#00D4AA] shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Negative factors */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#FF6B6B] uppercase tracking-wider block">Areas of Caution</span>
                  <ul className="space-y-2">
                    {result.reasons.negative.map((reason, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-300 leading-relaxed">
                        <AlertTriangle className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* What-If Realtime Simulator notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <Info className="w-5 h-5 text-[#00D4AA] shrink-0" />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>{t.whatIfSim}:</strong> Draging sliders on the left immediately recalculates risk parameters. Lenders use these exact dimensions to auto-approve loans in Sri Lanka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
