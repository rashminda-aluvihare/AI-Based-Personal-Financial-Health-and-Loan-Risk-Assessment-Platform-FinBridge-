"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { Plus, Trash2, Calendar, Target, PiggyBank, X, TrendingUp } from 'lucide-react';

export default function GoalsPage() {
  const { language, goals, addGoal, deleteGoal, updateGoalAmount } = useAppStore();
  const t = translations[language];

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('Emergency Fund');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const goalsOptions = ['Emergency Fund', 'House Purchase', 'Vehicle Purchase', 'Travel', 'Wedding Fund', 'Education Fund'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount);
    const curr = parseFloat(currentAmount) || 0;
    if (isNaN(target) || target <= 0) return;

    addGoal({
      name,
      targetAmount: target,
      currentAmount: curr,
      targetDate
    });

    setModalOpen(false);
    setTargetAmount('');
    setCurrentAmount('');
    setName('Emergency Fund');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.goalPlanner}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Plan, monitor progress, and schedule budgets to achieve your dreams.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs rounded-xl shadow-md hover:scale-102 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addGoal.split(' ')[0] + ' ' + t.addGoal.split(' ')[1]}</span>
        </button>
      </div>

      {/* Goals Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          return (
            <div key={goal.id} className="glass-panel p-6 rounded-3xl space-y-5 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-200">
              {/* Background Glow */}
              <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full bg-cyan-400/5 blur-2xl group-hover:bg-cyan-400/10 transition-all duration-300"></div>

              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-cyan-400/10 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200">{goal.name}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Until {goal.targetDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-slate-400 hover:text-rose-500 transition p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Targets detail */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Target Amount</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">₨ {goal.targetAmount.toLocaleString()}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Saved Balance</span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-[#00D4AA]">₨ {goal.currentAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Completion</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-gradient-to-r dark:from-[#6C63FF] dark:to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => updateGoalAmount(goal.id, 5000)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center space-x-1.5 transition-colors bg-slate-50 dark:bg-white/5"
                >
                  <PiggyBank className="w-3.5 h-3.5" />
                  <span>Deposit Rs 5,000</span>
                </button>
                <button
                  onClick={() => updateGoalAmount(goal.id, 25000)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center space-x-1.5 transition-colors bg-slate-50 dark:bg-white/5"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Deposit Rs 25,000</span>
                </button>
              </div>
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="md:col-span-2 text-center py-20 text-slate-500 text-xs font-medium">
            No active savings goals found. Create one now to begin tracking.
          </div>
        )}
      </div>

      {/* Add Goal Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 p-6 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.addGoal}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.goalName}</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition font-medium"
                >
                  {goalsOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-white text-slate-900 dark:bg-[#1E293B] dark:text-white">{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.target}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs font-semibold">₨</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.current}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs font-semibold">₨</span>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-600 dark:text-slate-300 uppercase font-medium block tracking-wider">{t.targetDate}</label>
                <input
                  type="date"
                  required
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl py-2.5 px-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 text-white font-medium rounded-xl shadow-md transition text-xs mt-2"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
