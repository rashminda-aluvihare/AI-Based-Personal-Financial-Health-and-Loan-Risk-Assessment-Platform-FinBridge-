"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, DollarSign, ArrowDownLeft, X } from 'lucide-react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

export default function IncomePage() {
  const { language, incomeRecords, addIncome, deleteIncome } = useAppStore();
  const t = translations[language];

  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState('Salary');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Aggregate data for Trend Chart
  const trendData = [...incomeRecords]
    .reverse()
    .map(rec => ({
      date: rec.date.split('-').slice(1).join('/'),
      amount: rec.amount
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    addIncome({
      source,
      amount: amt,
      date
    });

    setModalOpen(false);
    setAmount('');
    setSource('Salary');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.incomeManager}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and log your various monthly cash flows and monitor stability indexes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md hover:scale-102 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addIncome.split(' ')[0] + ' ' + t.addIncome.split(' ')[1]}</span>
        </button>
      </div>

      {/* Analytics Chart & Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4 glow-teal">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.incomeTrend}</h2>
          
          {trendData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#475569" fontSize={9} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }} />
                  <Area type="monotone" dataKey="amount" stroke="#00D4AA" fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-10">Add income logs to generate trends.</p>
          )}
        </div>

        {/* Records Listing */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Logged Cash Flows</h2>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {incomeRecords.map((rec) => (
              <div key={rec.id} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00D4AA]/10 flex items-center justify-center text-[#00D4AA]">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-200">{rec.source}</div>
                    <div className="flex items-center space-x-1.5 text-[9px] text-slate-500 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold font-mono text-white">₨ {rec.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteIncome(rec.id)}
                    className="text-slate-500 hover:text-[#FF6B6B] transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {incomeRecords.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-10">No income records available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Income Overlay Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-teal space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">{t.addIncome}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.source}</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#00D4AA]"
                >
                  <option value="Salary">Salary</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Business Income">Business Income</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Other Income">Other Income</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.amount}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-[10px]">₨</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-white focus:outline-none focus:border-[#00D4AA]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.date}</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold rounded-xl shadow-md transition"
              >
                Log Income
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
