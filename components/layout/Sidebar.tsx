"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  LayoutDashboard, 
  PlusCircle, 
  MinusCircle, 
  Banknote, 
  Target, 
  GraduationCap, 
  Settings, 
  HelpCircle
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { language, role } = useAppStore();
  const t = translations[language];

  const menuItems = [
    {
      name: t.dashboard,
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-[#6C63FF]"
    },
    {
      name: t.incomeManager,
      path: "/income",
      icon: PlusCircle,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-[#00D4AA]"
    },
    {
      name: t.expenseTracker,
      path: "/expense",
      icon: MinusCircle,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-rose-400"
    },
    {
      name: t.loanTracker,
      path: "/loans",
      icon: Banknote,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-amber-400"
    },
    {
      name: t.goalPlanner,
      path: "/goals",
      icon: Target,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-cyan-400"
    },
    {
      name: t.literacyHub,
      path: "/literacy",
      icon: GraduationCap,
      roles: ['borrower', 'lender', 'admin'],
      color: "text-emerald-400"
    },
    {
      name: t.adminConsole,
      path: "/admin",
      icon: Settings,
      roles: ['admin'],
      color: "text-[#FF6B6B]",
      badge: "Admin"
    }
  ];

  // Filter based on active role
  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 h-[calc(100vh-73px)] border-r border-black/5 dark:border-white/10 bg-[var(--sidebar-bg)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Main Menu ({role.toUpperCase()})
          </div>
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#6C63FF]/15 to-[#00D4AA]/15 border border-[#6C63FF]/30 text-white font-medium shadow-[0_4px_12px_rgba(108,99,255,0.08)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#00D4AA]' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono bg-[#FF6B6B]/20 text-[#FF6B6B]`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Informative Microfinance Sri Lanka Box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#00D4AA]">
            <HelpCircle className="w-4 h-4" />
            <span>Financial Wellness</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            FinBridge monitors your DTI, monthly expenses, savings trends, and credit parameters dynamically to generate personalized AI recommendation reports.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="space-y-4">
        <div className="h-[1px] bg-white/10"></div>
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>v1.1.0</span>
          <span>© FinBridge SL</span>
        </div>
      </div>
    </aside>
  );
}
