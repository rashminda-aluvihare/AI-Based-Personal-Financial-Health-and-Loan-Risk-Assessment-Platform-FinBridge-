"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { BookOpen, HelpCircle, CheckCircle, AlertCircle, ArrowRight, Award } from 'lucide-react';

export default function LiteracyPage() {
  const { language, financialScore, setFinancialScore } = useAppStore();
  const t = translations[language];

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const articles = [
    {
      id: 1,
      title: "Understanding Debt-to-Income (DTI) Ratios",
      category: "Loans & Debt",
      duration: "4 min read",
      summary: "Your DTI is the percentage of your monthly gross income that goes toward paying debts. Keeping it below 36% ensures healthy borrow parameters."
    },
    {
      id: 2,
      title: "The Power of Compound Interest in Sri Lanka",
      category: "Savings & Investment",
      duration: "6 min read",
      summary: "Discover how reinvesting interest payments can exponentially scale your financial profile over time, leveraging LKR interest rate structures."
    },
    {
      id: 3,
      title: "Avoiding Online Financial Scams",
      category: "Security",
      duration: "5 min read",
      summary: "Learn to identify phishing pages, fraudulent OTP verification requests, and malicious third-party digital loan schemes."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the recommended maximum percentage of income to allocate to debt payments (DTI)?",
      options: ["20% - 35%", "50% - 60%", "70% - 80%", "None of the above"],
      correct: "20% - 35%",
      explanation: "A Debt-to-Income ratio below 36% indicates manageable debt levels and lower financial stress."
    },
    {
      question: "Which type of asset is considered most liquid for emergencies?",
      options: ["Real Estate", "Emergency cash & savings accounts", "Long-term treasury bonds", "Cryptocurrency investments"],
      correct: "Emergency cash & savings accounts",
      explanation: "Emergency cash can be withdrawn instantly without penalties or market risks, making it the supreme choice for unexpected incidents."
    },
    {
      question: "If your monthly interest rate compounds, what does that imply for your savings yield?",
      options: ["Yield remains flat", "Interest is calculated solely on original principle", "Interest is calculated on both principal and accumulated interest", "Savings decrease"],
      correct: "Interest is calculated on both principal and accumulated interest",
      explanation: "Compounding recalculates interest yields dynamically based on growing sums, resulting in a compound growth curve."
    }
  ];

  const currentQuiz = quizQuestions[activeQuestion];

  const handleOptionClick = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption || isAnswered) return;

    if (selectedOption === currentQuiz.correct) {
      setScore(prev => prev + 1);
      // Award +10 points to platform Financial Score (max 100)
      setFinancialScore(Math.min(100, financialScore + 10));
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setActiveQuestion((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.literacyHub}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Expand your budgeting literacy, read curated local guides, and test your financial knowledge to boost your AI Score (+10 pts per quiz).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quiz Game Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-5">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-[#00D4AA]" />
              <span>{t.quizTitle}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Score: {score} / {quizQuestions.length}</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] text-blue-600 dark:text-[#00D4AA] uppercase font-bold tracking-wider">Question {activeQuestion + 1} of {quizQuestions.length}</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{currentQuiz.question}</h3>
          </div>

          {/* Option list */}
          <div className="space-y-2.5">
            {currentQuiz.options.map((opt) => {
              let btnClass = "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-blue-500 dark:hover:border-[#6C63FF]/50";

              if (selectedOption === opt) {
                btnClass = "bg-blue-50 dark:bg-[#6C63FF]/20 border-blue-500 dark:border-[#6C63FF] text-blue-700 dark:text-white font-semibold";
              }

              if (isAnswered) {
                if (opt === currentQuiz.correct) {
                  btnClass = "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                } else if (selectedOption === opt) {
                  btnClass = "bg-rose-50 dark:bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-semibold";
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Submit/Next Trigger */}
          <div className="pt-2">
            {!isAnswered ? (
              <button
                disabled={!selectedOption}
                onClick={handleAnswerSubmit}
                className="w-full py-3 rounded-xl bg-blue-600 dark:bg-gradient-to-r dark:from-[#6C63FF] dark:to-[#00D4AA] text-white font-semibold text-xs disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-700 transition"
              >
                Submit Answer (+10 Score Points)
              </button>
            ) : (
              <div className="space-y-4">
                {/* Explanation Card */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
                  selectedOption === currentQuiz.correct 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
                }`}>
                  <div className="flex items-center space-x-1.5 font-bold mb-1">
                    {selectedOption === currentQuiz.correct ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{t.correct} (+10 AI Score Bonus)</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>{t.incorrect}</span>
                      </>
                    )}
                  </div>
                  <p>{currentQuiz.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center space-x-2 border border-slate-200 dark:border-white/10 transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Articles Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-[#6C63FF]" />
            <span>{t.articles}</span>
          </div>

          <div className="space-y-4">
            {articles.map((art) => (
              <div key={art.id} className="glass-panel p-5 rounded-3xl space-y-2 border border-slate-200/80 dark:border-white/5 hover:border-blue-400 dark:hover:border-[#6C63FF]/30 transition-all duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-[#6C63FF]/10 text-blue-600 dark:text-[#6C63FF]">
                    {art.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">{art.duration}</span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-200 hover:text-blue-600 transition-colors cursor-pointer">
                  {art.title}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {art.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
