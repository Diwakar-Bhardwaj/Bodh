"use client";
import React from 'react';
import { MessageSquareText } from 'lucide-react'; // Elegant icon for QNA

export default function CategoryChips({ activeTab = 'hinduism', setActiveTab }) {
  return (
    <div className="flex items-center w-full bg-white p-1 rounded-full border border-slate-100/80 shadow-[0_2px_6px_rgba(0,0,0,0.02)] max-w-sm mx-auto">
      
      {/* 1. ACTIVE STATE TAB: HINDUISM */}
      <button 
        type="button"
        onClick={() => setActiveTab('hinduism')}
        className={`flex-1 text-xs sm:text-sm font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] ${
          activeTab === 'hinduism'
            ? 'bg-[#0A1D87] text-white shadow-sm shadow-[#0A1D87]/20'
            : 'bg-transparent text-[#0A1D87] hover:bg-slate-50'
        }`}
      >
        <span className="text-base leading-none">🕉️</span>
        <span className="tracking-wide">Hinduism</span>
      </button>

      {/* 2. INACTIVE STATE TAB: QNA */}
      <button 
        type="button"
        onClick={() => setActiveTab('qna')}
        className={`flex-1 text-xs sm:text-sm font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] ${
          activeTab === 'qna'
            ? 'bg-[#0A1D87] text-white shadow-sm shadow-[#0A1D87]/20'
            : 'bg-transparent text-[#0A1D87] hover:bg-slate-50'
        }`}
      >
        <MessageSquareText size={18} className={activeTab === 'qna' ? 'text-white' : 'text-[#0A1D87] stroke-[2.5]'} />
        <span className="tracking-wide uppercase">Qna</span>
      </button>

    </div>
  );
}