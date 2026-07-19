"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, FileText, Banknote, Sparkles, X, Activity } from 'lucide-react';

export default function LoansPage() {
  const { language, loanRecords, addLoan, deleteLoan } = useAppStore();
  const t = translations[language];

  const [modalOpen, setModalOpen] = useState(false);
  const [loanName, setLoanName] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [monthlyEmi, setMonthlyEmi] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]
  );

  // EMI Simulator States
  const [calcPrincipal, setCalcPrincipal] = useState(100000);
  const [calcRate, setCalcRate] = useState(15);
  const [calcTenure, setCalcTenure] = useState(24);

  const totalRemaining = loanRecords.reduce((sum, r) => sum + r.remainingAmount, 0);
  const totalEmi = loanRecords.reduce((sum, r) => sum + r.monthlyEmi, 0);

  const calculateSimulatorEmi = (p: number, r: number, n: number) => {
    const monthlyRate = r / 12 / 100;
    const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(emi) || 0;
  };

  const simEmi = calculateSimulatorEmi(calcPrincipal, calcRate, calcTenure);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rem = parseFloat(remainingAmount);
    const emiVal = parseFloat(monthlyEmi);
    const rate = parseFloat(interestRate);

    if (isNaN(rem) || rem <= 0 || isNaN(emiVal) || emiVal <= 0) return;

    addLoan({
      loanName,
      remainingAmount: rem,
      monthlyEmi: emiVal,
      interestRate: rate || 0,
      startDate,
      endDate
    });

    setModalOpen(false);
    setLoanName('');
    setRemainingAmount('');
    setMonthlyEmi('');
    setInterestRate('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.loanTracker}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manually log and verify your active liabilities to determine loan risk thresholds.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-amber-500 text-white font-semibold text-xs rounded-xl shadow-md hover:scale-102 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addLoan.split(' ')[0] + ' ' + t.addLoan.split(' ')[1]}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glass-panel p-4 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 uppercase">Remaining Balance</span>
          <p className="text-sm font-bold text-white">₨ {totalRemaining.toLocaleString()}</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 uppercase">Total Monthly EMI</span>
          <p className="text-sm font-bold text-[#FF6B6B]">₨ {totalEmi.toLocaleString()}</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 uppercase">Active Debts</span>
          <p className="text-sm font-bold text-white">{loanRecords.length} Loans</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 uppercase">Next Due Date</span>
          <p className="text-sm font-bold text-amber-400">August 05, 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main List */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Logged Liabilities</h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {loanRecords.map((loan) => {
              const monthsLeft = Math.ceil(loan.remainingAmount / loan.monthlyEmi);
              return (
                <div key={loan.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all duration-200 space-y-4 relative overflow-hidden group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-200">{loan.loanName}</h4>
                        <p className="text-[9px] text-slate-500 font-mono">Interest Rate: {loan.interestRate}% APR</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteLoan(loan.id)}
                      className="text-slate-500 hover:text-[#FF6B6B] transition p-1"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono leading-relaxed">
                    <div>
                      <span className="text-slate-500">Remaining</span>
                      <p className="font-bold text-slate-300">₨ {loan.remainingAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">EMI</span>
                      <p className="font-bold text-[#FF6B6B]">₨ {loan.monthlyEmi.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Est. Months Left</span>
                      <p className="font-bold text-amber-400">{monthsLeft} Months</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {loanRecords.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-10">No active debts logged. Clean record!</p>
            )}
          </div>
        </div>

        {/* EMI Simulator Calculator */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4 glow-amber">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>EMI Simulator</span>
          </h2>
          <p className="text-[10px] text-slate-400">Evaluate monthly impact of new credit purchases before committing.</p>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 block uppercase">Principal (₨)</label>
              <input
                type="number"
                value={calcPrincipal}
                onChange={(e) => setCalcPrincipal(parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-1.5 px-3 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 block uppercase">Interest Rate (% APR)</label>
              <input
                type="number"
                value={calcRate}
                onChange={(e) => setCalcRate(parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-1.5 px-3 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 block uppercase">Tenure (Months)</label>
              <input
                type="number"
                value={calcTenure}
                onChange={(e) => setCalcTenure(parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-1.5 px-3 text-white focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center font-mono">
              <span className="text-[9px] text-slate-400 uppercase">Estimated Monthly Payment</span>
              <p className="text-base font-black text-amber-400 mt-1">₨ {simEmi.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Loan Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-amber space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">{t.addLoan}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.loanName}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank of Ceylon Cash Loan"
                  value={loanName}
                  onChange={(e) => setLoanName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.remainingAmount}</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 250000"
                  value={remainingAmount}
                  onChange={(e) => setRemainingAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.emi}</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={monthlyEmi}
                  onChange={(e) => setMonthlyEmi(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.interestRate}</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 14"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-amber-500 text-white font-semibold rounded-xl shadow-md transition"
              >
                Log Liability
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
