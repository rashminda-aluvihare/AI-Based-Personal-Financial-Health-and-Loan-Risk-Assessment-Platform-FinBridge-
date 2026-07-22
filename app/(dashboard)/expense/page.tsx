"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, ShoppingBag, ArrowUpRight, X, Download } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { exportToCSV } from '@/lib/export';

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.expenseTracker}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Log and categorize your daily and monthly payments to analyze expenditure leaks.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-rose-600 text-white font-semibold text-xs rounded-xl shadow-md hover:bg-rose-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addExpense}</span>
        </button>
      </div>

      {/* Analytics Breakdown & Records List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie Category Chart */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">{t.categoryBreakdown}</h2>
          
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
                  <Tooltip formatter={(value) => value ? `₨ ${Number(value).toLocaleString()}` : ''} contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div className="flex flex-wrap justify-center gap-3 text-[11px] px-2 font-semibold">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-10">Add expense records to compile breakdowns.</p>
          )}
        </div>

        {/* Expenses Table */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">Transaction History</h2>
            {expenseRecords.length > 0 && (
              <button
                onClick={() => exportToCSV(expenseRecords, 'finbridge-expense-report.csv')}
                className="flex items-center space-x-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {expenseRecords.map((rec) => (
              <div key={rec.id} className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rec.category}</div>
                    <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">₨ {rec.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteExpense(rec.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
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

      {/* Add Expense Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.addExpense}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.category}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition font-medium"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat} className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.amount}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs font-semibold">₨</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition font-medium"
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
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl shadow-md transition text-xs mt-2"
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
