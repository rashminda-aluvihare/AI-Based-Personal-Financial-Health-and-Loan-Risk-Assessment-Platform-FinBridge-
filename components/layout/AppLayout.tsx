"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ChatBubble from '../chatbot/ChatBubble';

import { useAppStore } from '@/lib/store';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useAppStore();
  
  const themeClass = theme === 'light' ? 'theme-light text-[#0F172A]' : theme === 'dim' ? 'theme-dim text-[#F1F5F9]' : 'theme-dark text-slate-100';

  // Public pages without dashboard shell
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname.startsWith('/auth');

  if (isPublicPage) {
    return (
      <div className={`min-h-screen ${themeClass} bg-[var(--background)] flex flex-col justify-between selection:bg-[#6C63FF]/30 selection:text-white`}>
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClass} bg-[var(--background)] flex flex-col selection:bg-[#6C63FF]/30 selection:text-white`}>
      {/* Platform Header */}
      <Navbar />

      {/* Main Workspace */}
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto h-[calc(100vh-73px)] pb-24 md:pb-6 px-4 md:px-8 py-6">
          {children}
        </main>
      </div>

      {/* Mobile navigation bottom bar */}
      <MobileNav />

      {/* AI Assistant Chatbot */}
      <ChatBubble />
    </div>
  );
}
