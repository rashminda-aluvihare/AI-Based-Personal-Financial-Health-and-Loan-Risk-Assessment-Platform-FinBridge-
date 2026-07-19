"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { mockLoanProducts, LoanProduct } from '@/lib/mock-data';
import { 
  Plus, 
  HelpCircle, 
  TrendingUp, 
  Check, 
  Users, 
  ArrowRight,
  Shield,
  FileSpreadsheet
} from 'lucide-react';

export default function LoansPage() {
  const { language, walletBalance, activeLoans, applyForLoan, repayLoanInstallment } = useAppStore();
  const t = translations[language];

  // Active tab inside Loan hub: 'marketplace' | 'active' | 'calculator' | 'group'
  const [activeTab, setActiveTab] = useState<'marketplace' | 'active' | 'calculator' | 'group'>('marketplace');

  // Apply loan modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);
  const [applyAmount, setApplyAmount] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // EMI calculator states
  const [calcAmount, setCalcAmount] = useState(50000);
  const [calcRate, setCalcRate] = useState(12);
  const [calcTenure, setCalcTenure] = useState(12);

  // Compare loans states
  const [compareItems, setCompareItems] = useState<string[]>([]);

  // EMI calculation helper
  const calculateEMI = (p: number, r: number, n: number) => {
    const monthlyRate = r / 12 / 100;
    const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(emi) || 0;
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !applyAmount) return;
    const amt = parseFloat(applyAmount);
    if (isNaN(amt) || amt <= 0) return;

    applyForLoan(
      amt, 
      selectedProduct.name, 
      selectedProduct.nameSi, 
      selectedProduct.nameTa, 
      selectedProduct.defaultRate, 
      selectedProduct.tenureMonths
    );
    setApplySuccess(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      setApplySuccess(false);
      setApplyAmount('');
      setSelectedProduct(null);
    }, 2000);
  };

  const toggleCompare = (id: string) => {
    if (compareItems.includes(id)) {
      setCompareItems(prev => prev.filter(item => item !== id));
    } else {
      if (compareItems.length < 3) {
        setCompareItems(prev => [...prev, id]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.loans}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'si' 
              ? "ක්ෂුද්‍ර ණය වෙළඳපොළ ගවේෂණය කරන්න, ඔබේ වාරික කළමනාකරණය කරන්න හෝ EMI ගණනය කරන්න." 
              : language === 'ta' 
              ? "நுண்கடன் சந்தையை ஆராயுங்கள், தவணைகளை நிர்வகிக்கவும் அல்லது கணக்கிடுங்கள்." 
              : "Browse localized microfinance products, simulate EMI schedules, and repay your active balances."}
          </p>
        </div>

        {/* Tab switcher navigation */}
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 self-start md:self-auto text-xs">
          <button 
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${activeTab === 'marketplace' ? 'bg-[#6C63FF] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {t.loanMarketplace.split(' ')[0]}
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${activeTab === 'active' ? 'bg-[#6C63FF] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {t.activeLoans}
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${activeTab === 'calculator' ? 'bg-[#6C63FF] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Calculator
          </button>
          <button 
            onClick={() => setActiveTab('group')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${activeTab === 'group' ? 'bg-[#6C63FF] text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Group Loan
          </button>
        </div>
      </div>

      {/* Main content conditional rendering */}
      {activeTab === 'marketplace' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLoanProducts.map((prod) => {
              const nameStr = language === 'si' ? prod.nameSi : language === 'ta' ? prod.nameTa : prod.name;
              const descStr = language === 'si' ? prod.descriptionSi : language === 'ta' ? prod.descriptionTa : prod.description;
              const isComparing = compareItems.includes(prod.id);

              return (
                <div key={prod.id} className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between hover:border-white/20 transition glow-indigo relative">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-[#00D4AA] uppercase tracking-wider">{prod.category}</span>
                      <button 
                        onClick={() => toggleCompare(prod.id)}
                        className={`text-[10px] px-2 py-0.5 rounded font-medium border transition ${
                          isComparing 
                            ? 'bg-[#00D4AA]/20 border-[#00D4AA] text-[#00D4AA]' 
                            : 'bg-white/5 border-white/15 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isComparing ? 'Selected' : '+ Compare'}
                      </button>
                    </div>

                    <h3 className="font-extrabold text-white text-base font-display">{nameStr}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{descStr}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block">Amount Limit</span>
                      <span className="font-semibold text-slate-200">₨ {prod.minAmount / 1000}k - ₨ {prod.maxAmount / 1000}k</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Base Rate</span>
                      <span className="font-semibold text-[#00D4AA]">{prod.defaultRate}% APR</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Duration</span>
                      <span className="font-semibold text-slate-200">{prod.tenureMonths} Months</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setSelectedProduct(prod); setApplyModalOpen(true); }}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition"
                  >
                    <span>Apply via AI Precheck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Comparison tool display */}
          {compareItems.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Compare Loan Products ({compareItems.length})</h3>
                <button onClick={() => setCompareItems([])} className="text-xs text-slate-400 hover:text-white">Clear</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareItems.map(itemId => {
                  const prod = mockLoanProducts.find(p => p.id === itemId)!;
                  const nameStr = language === 'si' ? prod.nameSi : language === 'ta' ? prod.nameTa : prod.name;
                  return (
                    <div key={prod.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                      <div className="font-bold text-white line-clamp-1">{nameStr}</div>
                      <div className="space-y-1 text-[11px] text-slate-400 font-mono">
                        <div className="flex justify-between">
                          <span>Limits:</span>
                          <span className="text-slate-200">₨ {prod.minAmount.toLocaleString()} - ₨ {prod.maxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest:</span>
                          <span className="text-[#00D4AA]">{prod.defaultRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tenure:</span>
                          <span className="text-slate-200">{prod.tenureMonths} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. EMI:</span>
                          <span className="text-slate-200">₨ {calculateEMI(prod.maxAmount, prod.defaultRate, prod.tenureMonths).toLocaleString()}/mo</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'active' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {activeLoans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeLoans.map((loan) => {
                const percent = Math.round(((loan.amount - loan.remainingAmount) / loan.amount) * 100);
                const nameStr = language === 'si' ? loan.productNameSi : language === 'ta' ? loan.productNameTa : loan.productName;
                
                return (
                  <div key={loan.id} className="glass-panel p-6 rounded-3xl space-y-4 glow-indigo">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#00D4AA] uppercase tracking-wider">Active Micro-loan</span>
                        <h3 className="font-extrabold text-white text-base font-display">{nameStr}</h3>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {loan.interestRate}% APR
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Repayment progress:</span>
                        <span className="text-[#00D4AA] font-bold">{Math.max(0, percent)}%</span>
                      </div>
                      {/* Repayment Progress bar */}
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-[#00D4AA] to-[#6C63FF]" style={{ width: `${Math.max(0, percent)}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Original: ₨ {loan.amount.toLocaleString()}</span>
                        <span>Remaining: ₨ {Math.round(loan.remainingAmount).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-t border-white/5 text-xs text-slate-400">
                      <div>
                        <span className="text-[9px] block">Next Due Date</span>
                        <span className="font-semibold text-slate-200">{loan.nextPaymentDate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] block">Due Amount</span>
                        <span className="font-semibold text-slate-200">₨ {loan.nextPaymentAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const success = repayLoanInstallment(loan.id);
                        if (!success) {
                          alert("Repayment failed. Make sure you have enough wallet balance!");
                        }
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md transition"
                    >
                      Pay EMI (₨ {loan.nextPaymentAmount.toLocaleString()})
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-12">You have no active loans on this account.</p>
          )}
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {/* Inputs */}
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Calculator Inputs</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Amount (LKR)</span>
                  <span className="text-white font-bold">₨ {calcAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#6C63FF]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Interest Rate (% APR)</span>
                  <span className="text-[#00D4AA] font-bold">{calcRate}%</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="0.5"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#00D4AA]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Tenure (Months)</span>
                  <span className="text-white font-bold">{calcTenure} Months</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="24"
                  step="1"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between glow-indigo">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Calculated Schedule</h2>
            <div className="space-y-6 my-auto py-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.monthlyEMI}</span>
                <div className="text-4xl font-black font-display text-[#00D4AA]">
                  ₨ {calculateEMI(calcAmount, calcRate, calcTenure).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-t border-white/5 text-center text-xs text-slate-400">
                <div>
                  <span className="text-[9px] block">Principal Amount</span>
                  <span className="font-semibold text-slate-200">₨ {calcAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] block">Total Repayment</span>
                  <span className="font-semibold text-slate-200">
                    ₨ {(calculateEMI(calcAmount, calcRate, calcTenure) * calcTenure).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-amber-300 shrink-0" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rates are estimated. Apply using the AI Risk Assessment to unlock custom-tailored rates from verified micro-finance institutions.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'group' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 glow-indigo animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base font-display">{t.groupLending}</h2>
              <span className="text-[10px] text-[#00D4AA] font-mono tracking-wider">Joint Liability Framework</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The Grameen Joint Liability framework allows community members (e.g. self-help farmer groups in Anuradhapura or Kandy) to guarantee each other's loans. Under this model, if one group member faces difficulty, others assist in repayment, thereby securing a 99% repayment index and lowering rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-white">1. Group Creation</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">Form a group of 3-5 peer members. Peer ratings act as credit trust endorsements.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-[#00D4AA]">2. Lower Interest Rates</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">By pooling liability, the AI credit scoring algorithm grants a 3.5% APR discount.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-white">3. Shared Repayment</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">Shared updates ensure transparency. Timely payments increase collective scores.</p>
            </div>
          </div>
        </div>
      )}

      {/* Apply Loan Modal overlay form */}
      {applyModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-indigo space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-white">Apply: {selectedProduct.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono">Interest Rate: {selectedProduct.defaultRate}% APR</span>
              </div>
              <button onClick={() => setApplyModalOpen(false)} className="text-slate-400 hover:text-white transition">
                ✕
              </button>
            </div>

            {applySuccess ? (
              <div className="p-6 text-center space-y-2 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Your application has been routed to the AI Queue. Admin review will take a few seconds.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block">Requested Amount (LKR)</label>
                  <input
                    type="number"
                    required
                    min={selectedProduct.minAmount}
                    max={selectedProduct.maxAmount}
                    placeholder={`e.g. ${selectedProduct.minAmount.toLocaleString()}`}
                    value={applyAmount}
                    onChange={(e) => setApplyAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                  />
                  <span className="text-[9px] text-slate-500 font-mono">Limit: ₨ {selectedProduct.minAmount.toLocaleString()} to ₨ {selectedProduct.maxAmount.toLocaleString()}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed">
                  <strong>AI Note:</strong> Undergoing immediate profile vetting. You will need to check the <strong>Lender</strong> or <strong>Admin</strong> dashboard to approve this loan for mock-demo walkthroughs.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md transition"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
