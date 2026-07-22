"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, ArrowDownLeft, X, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { exportToCSV } from '@/lib/export';

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.incomeManager}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track and log your various monthly cash flows and monitor stability indexes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 dark:bg-gradient-to-r dark:from-[#6C63FF] dark:to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addIncome}</span>
        </button>
      </div>

      {/* Analytics Chart & Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">{t.incomeTrend}</h2>
          
          {trendData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748B" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: 8, color: '#0F172A' }} />
                  <Area type="monotone" dataKey="amount" stroke="#16A34A" fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-10">Add income logs to generate trends.</p>
          )}
        </div>

        {/* Records Listing */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">Logged Cash Flows</h2>
            {incomeRecords.length > 0 && (
              <button
                onClick={() => exportToCSV(incomeRecords, 'finbridge-income-report.csv')}
                className="flex items-center space-x-1 text-[11px] font-semibold text-blue-600 dark:text-[#00D4AA] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {incomeRecords.map((rec) => (
              <div key={rec.id} className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-[#00D4AA]/10 flex items-center justify-center text-emerald-600 dark:text-[#00D4AA]">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rec.source}</div>
                    <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">₨ {rec.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteIncome(rec.id)}
                    className="text-slate-400 hover:text-rose-500 transition"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.addIncome}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.source}</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition font-medium"
                >
                  <option value="Salary" className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">Salary</option>
                  <option value="Freelancing" className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">Freelancing</option>
                  <option value="Business Income" className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">Business Income</option>
                  <option value="Rental Income" className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">Rental Income</option>
                  <option value="Other Income" className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">Other Income</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.amount}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs font-semibold">₨</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.date}</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium rounded-xl shadow-md transition text-xs mt-2"
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
