"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { BookOpen, HelpCircle, CheckCircle, AlertCircle, ArrowRight, Award } from 'lucide-react';

export default function LiteracyHub() {
  const { language } = useAppStore();
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
      explanation: "Lenders look for a Debt-to-Income ratio between 20% and 35% as a benchmark. Ratios above 45% represent extreme financial stress."
    },
    {
      question: "Which type of asset buffer represents the most liquid safety net for families?",
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
      setScore(score + 1);
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
        <h1 className="text-2xl font-black text-white font-display tracking-tight">{t.literacyHub}</h1>
        <p className="text-xs text-slate-400 mt-1">
          Expand your budgeting literacy, read curated local guides, and test your financial knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quiz Game Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-5 glow-teal">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <HelpCircle className="w-5 h-5 text-[#00D4AA]" />
              <span>{t.quizTitle}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Score: {score} / {quizQuestions.length}</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#00D4AA] font-mono uppercase font-bold">Question {activeQuestion + 1} of {quizQuestions.length}</span>
            <p className="text-sm font-semibold text-slate-200 leading-relaxed">{currentQuiz.question}</p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            {currentQuiz.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQuiz.correct;
              
              let btnClass = "border-white/10 text-slate-300 hover:bg-white/5";
              if (isSelected) btnClass = "border-[#6C63FF]/50 bg-[#6C63FF]/10 text-white";
              
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                } else if (isSelected) {
                  btnClass = "border-rose-500/50 bg-rose-500/10 text-rose-400";
                } else {
                  btnClass = "border-white/5 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${btnClass}`}
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
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white font-semibold text-xs disabled:opacity-50 disabled:pointer-events-none hover:scale-101 transition-transform"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4">
                {/* Explanation Card */}
                <div className={`p-4 rounded-2xl border text-[11px] leading-relaxed font-mono ${
                  selectedOption === currentQuiz.correct 
                    ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300' 
                    : 'bg-rose-500/5 border-rose-500/10 text-rose-300'
                }`}>
                  <div className="flex items-center space-x-1.5 font-bold mb-1">
                    {selectedOption === currentQuiz.correct ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>{t.correct}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>{t.incorrect}</span>
                      </>
                    )}
                  </div>
                  <p>{currentQuiz.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center space-x-2 border border-white/10 transition"
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
          <div className="flex items-center space-x-2 text-white font-semibold text-sm">
            <BookOpen className="w-5 h-5 text-[#6C63FF]" />
            <span>{t.articles}</span>
          </div>

          <div className="space-y-4">
            {articles.map((art) => (
              <div key={art.id} className="glass-panel p-5 rounded-3xl space-y-2 border border-white/5 hover:border-[#6C63FF]/30 transition-all duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20">
                    {art.category}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">{art.duration}</span>
                </div>
                <h3 className="font-bold text-xs text-slate-200 hover:text-white transition-colors cursor-pointer">
                  {art.title}
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
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
