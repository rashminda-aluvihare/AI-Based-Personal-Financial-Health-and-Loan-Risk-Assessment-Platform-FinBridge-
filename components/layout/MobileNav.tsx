"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { 
  LayoutDashboard, 
  Wallet, 
  Banknote, 
  ShieldAlert, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const { language, role } = useAppStore();
  const t = translations[language];

  const menuItems = [
    {
      name: t.dashboard,
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ['borrower', 'lender', 'admin']
    },
    {
      name: t.wallet,
      path: "/wallet",
      icon: Wallet,
      roles: ['borrower', 'lender', 'admin']
    },
    {
      name: t.loans,
      path: "/loans",
      icon: Banknote,
      roles: ['borrower', 'lender', 'admin']
    },
    {
      name: t.riskAssessment,
      path: "/risk-assessment",
      icon: ShieldAlert,
      roles: ['borrower', 'lender', 'admin']
    },
    {
      name: t.lenderPanel,
      path: "/lender",
      icon: TrendingUp,
      roles: ['lender', 'admin']
    },
    {
      name: t.adminConsole,
      path: "/admin",
      icon: Settings,
      roles: ['admin']
    }
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0A0E1A]/95 backdrop-blur-md flex items-center justify-around py-2 md:hidden">
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex flex-col items-center justify-center space-y-0.5 px-2 py-1 rounded-lg transition-colors ${
              isActive ? 'text-[#00D4AA]' : 'text-slate-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight truncate max-w-[60px]">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
