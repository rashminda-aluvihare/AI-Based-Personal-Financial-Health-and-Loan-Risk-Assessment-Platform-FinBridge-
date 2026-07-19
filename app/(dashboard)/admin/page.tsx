"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { mockHeatmapData } from '@/lib/mock-data';
import { 
  ShieldCheck, 
  UserCheck, 
  AlertOctagon, 
  HelpCircle, 
  Check, 
  X, 
  TrendingUp, 
  Activity,
  Sparkles
} from 'lucide-react';

export default function AdminConsolePage() {
  const { language, adminApprovalQueue, approveLoanInQueue, rejectLoanInQueue } = useAppStore();
  const t = translations[language];

  // Fraud feed mock notifications
  const [fraudAlerts, setFraudAlerts] = useState([
    { id: 1, type: "device", msg: "Simultaneous logins from Jaffna and Colombo within 5 mins.", severity: "Critical" },
    { id: 2, type: "score", msg: "Bandara Rambukwella DTI ratio spiked 12% via utility review.", severity: "Warning" },
    { id: 3, type: "kyc", msg: "NIC matches existing archived verification record #4029.", severity: "Info" },
  ]);

  const removeAlert = (id: number) => {
    setFraudAlerts(prev => prev.filter(item => item.id !== id));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-500/10 border-emerald-500/20 text-[#00D4AA]';
      case 'Medium': return 'bg-indigo-500/10 border-indigo-500/20 text-[#6C63FF]';
      case 'High': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'Very High': return 'bg-rose-500/10 border-rose-500/20 text-[#FF6B6B]';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-300';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical': return 'bg-rose-500/20 border-rose-500/30 text-[#FF6B6B]';
      case 'Warning': return 'bg-amber-500/20 border-amber-500/30 text-amber-400';
      default: return 'bg-sky-500/20 border-sky-500/30 text-sky-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.adminConsole}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'si' 
            ? "AI ණය අනුමැති පෝලිම පාලනය කරන්න, වංචා අනතුරු ඇඟවීම් පරීක්ෂා කරන්න හෝ ආකෘති දත්ත බලන්න." 
            : language === 'ta' 
            ? "கடன் அனுமதி வரிசையை நிர்வகிக்கவும், மோசடி எச்சரிக்கைகளை ஆராயவும் அல்லது அளவீடுகளை பார்க்கவும்." 
            : "Review dynamic AI loan approval queues, investigate fraud flags, and monitor credit precision matrices."}
        </p>
      </div>

      {/* platform performance summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Liquidity Pool */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">LKR Liquidity Pool</span>
          <div className="text-2xl font-extrabold font-display text-white">₨ 85,250,000</div>
          <span className="text-[10px] text-[#00D4AA] font-mono">100% solvency capacity</span>
        </div>

        {/* AI precision accuracy */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.modelAccuracy}</span>
          <div className="text-2xl font-extrabold font-display text-[#00D4AA]">96.8%</div>
          <span className="text-[10px] text-slate-400 font-mono">Tested on 5,000 cases</span>
        </div>

        {/* F1 Score */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Model F1 Score</span>
          <div className="text-2xl font-extrabold font-display text-white">0.942</div>
          <span className="text-[10px] text-[#6C63FF] font-mono">XGBoost & Random Forest</span>
        </div>

        {/* Pending approvals */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Approvals In Queue</span>
          <div className="text-2xl font-extrabold font-display text-amber-400">{adminApprovalQueue.length}</div>
          <span className="text-[10px] text-slate-400 font-mono">Awaiting manual veto</span>
        </div>
      </div>

      {/* Main split dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Approval Queue */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <UserCheck className="w-5 h-5 text-[#00D4AA]" />
              <h2 className="font-bold text-sm tracking-tight font-mono uppercase">{t.approvalQueue}</h2>
            </div>
            <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 px-2 py-0.5 rounded-full">
              {adminApprovalQueue.length} Pending Approval
            </span>
          </div>

          {adminApprovalQueue.length > 0 ? (
            <div className="space-y-4">
              {adminApprovalQueue.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in slide-in-from-right-2 duration-300">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{item.borrowerName}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono border ${getRiskColor(item.risk)}`}>
                        {item.risk} Risk
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">{item.loanProduct}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      <span>Requested: <strong>₨ {item.amount.toLocaleString()}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Precheck Score: <strong className="text-white">{item.score}</strong></span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => approveLoanInQueue(item.id)}
                      className="flex-1 sm:flex-none p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-[#00D4AA] flex items-center justify-center space-x-1.5 transition text-xs font-semibold"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t.approve}</span>
                    </button>
                    <button
                      onClick={() => rejectLoanInQueue(item.id)}
                      className="flex-1 sm:flex-none p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-[#FF6B6B] flex items-center justify-center space-x-1.5 transition text-xs font-semibold"
                    >
                      <X className="w-4 h-4" />
                      <span>{t.reject}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-12">All applications have been successfully processed.</p>
          )}
        </div>

        {/* Right Fraud Alerts Feed */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <AlertOctagon className="w-5 h-5 text-[#FF6B6B]" />
                <h2 className="font-bold text-sm tracking-tight font-mono uppercase">{t.fraudAlerts}</h2>
              </div>
              <span className="text-[10px] text-[#FF6B6B] font-mono">{fraudAlerts.length} Alerts</span>
            </div>

            <div className="space-y-3">
              {fraudAlerts.map(alert => (
                <div key={alert.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-start justify-between space-x-2">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[8px] font-mono uppercase px-1.5 rounded border ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-mono">{alert.msg}</p>
                  </div>
                  <button onClick={() => removeAlert(alert.id)} className="text-slate-500 hover:text-white transition shrink-0 mt-0.5">
                    ✕
                  </button>
                </div>
              ))}
              
              {fraudAlerts.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">No pending security anomaly alerts.</p>
              )}
            </div>
          </div>

          {/* Repayment Heatmap calendar panel */}
          <div className="glass-panel p-5 rounded-3xl space-y-4">
            <h3 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.heatmap}</h3>
            <div className="flex justify-between items-end gap-1.5 h-16 pt-2">
              {mockHeatmapData.map((item, idx) => {
                const heightPercent = Math.min(100, (item.count / 25) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative">
                    <div 
                      className="w-full bg-[#00D4AA] rounded-t-sm transition-all duration-300 group-hover:bg-[#6C63FF]"
                      style={{ height: `${heightPercent}%`, opacity: 0.3 + (heightPercent / 100) * 0.7 }}
                    ></div>
                    <span className="text-[9px] text-slate-500 font-mono mt-1">{item.day}</span>
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
