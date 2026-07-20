"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, ShoppingBag, ArrowUpRight, X } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function ExpensePage() {
  const { language, expenseRecords, addExpense, deleteExpense } = useAppStore();
  const t = translations[language];

  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Categories defined in Spec
  const categoriesList = [
    'Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Education', 'Healthcare', 'Investment', 'Other'
  ];

  // Aggregate Category Breakdown Data for Pie Chart
  const categoryDataMap: Record<string, number> = {};
  expenseRecords.forEach(rec => {
    categoryDataMap[rec.category] = (categoryDataMap[rec.category] || 0) + rec.amount;
  });

  const pieColors = [
    '#6C63FF', '#00D4AA', '#FF6B6B', '#F59E0B', '#3B82F6', '#EC4899', '#10B981', '#8B5CF6', '#64748B'
  ];

  const pieData = Object.keys(categoryDataMap).map((cat, idx) => ({
    name: cat,
    value: categoryDataMap[cat],
    color: pieColors[idx % pieColors.length]
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    addExpense({
      category,
      amount: amt,
      date
    });

    setModalOpen(false);
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.expenseTracker}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Log and categorize your daily and monthly payments to analyze expenditure leaks.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] text-white font-semibold text-xs rounded-xl shadow-md hover:scale-102 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addExpense.split(' ')[0] + ' ' + t.addExpense.split(' ')[1]}</span>
        </button>
      </div>

      {/* Analytics Breakdown & Records List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie Category Chart */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4 glow-rose">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">{t.categoryBreakdown}</h2>
          
          {pieData.length > 0 ? (
            <div className="h-64 flex flex-col justify-center items-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value ? `₨ ${Number(value).toLocaleString()}` : ''} contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div className="flex flex-wrap justify-center gap-3 text-[10px] px-2 font-mono">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-10">Add expense records to compile breakdowns.</p>
          )}
        </div>

        {/* Expenses Table */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="font-bold text-sm tracking-tight text-white font-mono uppercase">Transaction History</h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {expenseRecords.map((rec) => (
              <div key={rec.id} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-200">{rec.category}</div>
                    <div className="flex items-center space-x-1.5 text-[9px] text-slate-500 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold font-mono text-white">₨ {rec.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteExpense(rec.id)}
                    className="text-slate-500 hover:text-[#FF6B6B] transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {expenseRecords.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-10">No expenses recorded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Expense Overlay Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl glow-rose space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">{t.addExpense}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.category}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-rose-400"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">{t.amount}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-[10px]">₨</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-white focus:outline-none focus:border-rose-400"
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
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] text-white font-semibold rounded-xl shadow-md transition"
              >
                Log Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
