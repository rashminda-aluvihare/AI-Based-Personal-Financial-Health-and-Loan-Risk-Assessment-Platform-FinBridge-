"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Transaction } from '@/lib/mock-data';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Send, 
  CreditCard,
  Phone,
  HelpCircle,
  TrendingUp,
  X,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function WalletPage() {
  const { language, walletBalance, transactions, topUpWallet, sendMoney } = useAppStore();
  const t = translations[language];

  const [sendOpen, setSendOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  
  // Send money states
  const [phone, setPhone] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendNote, setSendNote] = useState('');
  const [sendError, setSendError] = useState('');

  // Top up states
  const [topUpAmount, setTopUpAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Spending analytics parsing
  const categorySummary: { [key: string]: number } = {};
  transactions
    .filter(tx => tx.type === 'transfer_out' || tx.type === 'utility' || tx.type === 'repayment')
    .forEach(tx => {
      categorySummary[tx.category] = (categorySummary[tx.category] || 0) + tx.amount;
    });

  const chartData = Object.keys(categorySummary).map(cat => ({
    name: cat,
    value: categorySummary[cat]
  }));

  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ['#6C63FF', '#00D4AA', '#FBBF24', '#FF6B6B', '#22D3EE', '#EC4899'];

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0) {
      setSendError('Please enter a valid amount');
      return;
    }
    if (walletBalance < amt) {
      setSendError('Insufficient wallet balance');
      return;
    }
    if (!phone.trim()) {
      setSendError('Please enter recipient phone number');
      return;
    }

    const success = sendMoney(
      amt, 
      phone, 
      sendNote || "Peer transfer", 
      sendNote || "මිතුරෙකුට යවන ලදී", 
      sendNote || "நண்பருக்கு அனுப்பப்பட்டது", 
      'Personal'
    );

    if (success) {
      setSendOpen(false);
      setPhone('');
      setSendAmount('');
      setSendNote('');
    } else {
      setSendError('Transaction failed');
    }
  };

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    
    topUpWallet(amt);
    setTopUpOpen(false);
    setTopUpAmount('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
  };

  return (
    <div className="space-y-6 relative">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.wallet}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'si' 
            ? "ඔබේ ශේෂය පාලනය කරන්න, ක්ෂණික ගෙවීම් කරන්න, සහ ඔබේ වියදම් විශ්ලේෂණය කරන්න." 
            : language === 'ta' 
            ? "உங்கள் இருப்பை நிர்வகிக்கவும், பணம் அனுப்பவும் மற்றும் செலவுகளை பகுப்பாய்வு செய்யவும்." 
            : "Manage your balance, make instant LKR transfers, and analyze monthly transaction categories."}
        </p>
      </div>

      {/* Top Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Wallet card & actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Virtual LKR Debit Card */}
          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-tr from-[#6C63FF] via-[#5046e5] to-[#00D4AA] text-white shadow-xl flex flex-col justify-between h-56 glow-indigo">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">{t.brand} Digital Card</span>
                <div className="text-2xl font-extrabold tracking-tight font-display text-white">
                  ₨ {walletBalance.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold tracking-widest text-[10px] border border-white/20">
                LKR
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-mono tracking-widest text-slate-200">
                **** **** **** 4290
              </div>
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-white/60 block uppercase font-mono">Card Holder</span>
                  <span className="font-semibold">Rashminda Aluvihare</span>
                </div>
                <div>
                  <span className="text-[9px] text-white/60 block uppercase font-mono">Expires</span>
                  <span className="font-semibold">08/29</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Transaction action triggers */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSendOpen(true)}
              className="flex items-center justify-center space-x-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6C63FF] rounded-2xl font-semibold text-xs text-white transition-all shadow-md"
            >
              <Send className="w-4 h-4 text-[#6C63FF]" />
              <span>{t.sendMoneyTitle.split(' ')[0] + ' ' + t.sendMoneyTitle.split(' ')[1]}</span>
            </button>

            <button
              onClick={() => setTopUpOpen(true)}
              className="flex items-center justify-center space-x-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D4AA] rounded-2xl font-semibold text-xs text-white transition-all shadow-md"
            >
              <Plus className="w-4 h-4 text-[#00D4AA]" />
              <span>{t.topUp}</span>
            </button>
          </div>

          {/* History */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.transactions}</h2>
            <div className="space-y-3">
              {transactions.map((tx) => {
                const isOut = tx.type === 'transfer_out' || tx.type === 'utility' || tx.type === 'repayment';
                const txRef = language === 'si' ? tx.referenceSi : language === 'ta' ? tx.referenceTa : tx.reference;
                return (
                  <div key={tx.id} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isOut ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {isOut ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-slate-200">{txRef}</div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span className="px-1.5 py-0.2 rounded bg-white/5 text-slate-400">{tx.category}</span>
                        </div>
                      </div>
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

        {/* Right analytics Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.spendingAnalytics}</h2>
            
            {chartData.length > 0 ? (
              <div className="h-64 flex flex-col justify-between items-center relative">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Legend list */}
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {chartData.map((entry, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                      <span>{entry.name}: {Math.round((entry.value / totalSpent) * 100) || 0}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-10">No analytical data for this month.</p>
            )}
          </div>

          {/* Sri Lanka Utility Quickpay guide */}
          <div className="glass-panel p-5 rounded-3xl space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#00D4AA]">
              <HelpCircle className="w-4 h-4" />
              <span>Utility Providers Support</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Paying utility accounts regularly (CEB, Water Board, SLT Mobitel) automatically indexes score points into the FinBridge AI credit verification systems.
            </p>
          </div>
        </div>
      </div>

      {/* Send money overlay Form modal */}
      {sendOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-indigo space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">{t.sendMoneyTitle}</h3>
              <button onClick={() => { setSendOpen(false); setSendError(''); }} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sendError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
                {sendError}
              </div>
            )}

            <form onSubmit={handleSendSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.recipientPhone}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="+94 77 999 8888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.amount}</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.note}</label>
                <input
                  type="text"
                  placeholder="e.g. Loan return or Veggie business setup"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#6C63FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md transition"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Top Up overlay Form modal */}
      {topUpOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-teal space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">{t.topUp}</h3>
              <button onClick={() => setTopUpOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Top Up Amount (LKR)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 25000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00D4AA]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#00D4AA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00D4AA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block">CVC</label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00D4AA]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md transition"
              >
                Top Up Instantly
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
