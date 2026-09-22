"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Trophy, BookOpen, Landmark, HelpCircle, Heart, Flower, ShieldAlert, ChevronRight, Sparkles } from "lucide-react";

export default function GuideDashboard({ onSelectPrompt, onTrophyClick }) {
   const { data: session } = useSession();

  const userName = session?.user?.name || "User Name";
  
  const helpCategories = [
    { label: "Meaning of a verse", icon: <BookOpen size={20} />, bg: "bg-amber-100 text-amber-700" },
    { label: "Apply wisdom in life", icon: <Landmark size={20} />, bg: "bg-sky-100 text-sky-700" },
    { label: "Krishna's teachings", icon: <Flower size={20} />, bg: "bg-rose-100 text-rose-700" },
    { label: "Doubts & clarification", icon: <HelpCircle size={20} />, bg: "bg-violet-100 text-violet-700" },
    { label: "Meditation & mindset", icon: <ShieldAlert size={20} />, bg: "bg-emerald-100 text-emerald-700" },
    { label: "Life problems", icon: <Heart size={20} />, bg: "bg-orange-100 text-orange-700" },
  ];

  const sampleQuestions = [
    "What is the main message of Chapter 2, Verse 47?",
    "How can I focus on my duty without worrying about results?",
    "How to deal with fear of failure as per Bhagavad Gita?",
    "How can I stay calm and balanced in difficult situations?",
  ];

  return (
    <div className="space-y-6 pb-28 md:space-y-8 md:pb-32">
      {/* Header Panel Layout */}
      <div className="flex justify-between items-center py-2">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d18b39]">Bodh Wisdom</p>
          <h1 className="text-2xl font-black dark:text-white text-slate-900 tracking-tight">AI Guide</h1>
        </div>
        
        {/* Updated Trophy Button Action click target handler */}
        <button 
          type="button"
          onClick={onTrophyClick}
          className="p-3 hover:bg-white rounded-xl text-slate-700 shadow-sm border border-slate-200/70 active:scale-95 transition-transform dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
          aria-label="View Milestones"
        >
          <Trophy size={22} strokeWidth={2} />
        </button>
      </div>

      {/* Welcome Banner Row */}
      <div className="relative overflow-hidden flex items-center justify-between gap-6 bg-[#102477] dark:bg-[#08154e] p-6 md:p-10 rounded-[2rem] shadow-[0_18px_40px_rgba(16,36,119,0.20)] text-white">
        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-300"><Sparkles size={14} /> A quiet place for big questions</div>
          <h2 className="text-2xl md:text-4xl font-black leading-tight flex items-center gap-1.5">
            Hello {userName} 
            <img src="/profile-side-img.png" alt="Lotus" className="h-[1.2em] w-auto object-contain" />
         </h2>

         <p className="text-sm md:text-base font-medium text-blue-100 leading-relaxed max-w-lg">
        {"I'm here to understand Bhagavad Gita deeper, find clarity, and grow in wisdom."}
        </p>

        </div>
        <div className="w-28 h-28 md:w-44 md:h-44 shrink-0 bg-[#f4c875] rounded-full flex items-center justify-center overflow-hidden shadow-inner">
          <img src="/ai-guide-book.png" alt="Sacred Guidance Book" className="w-full h-full " />
        </div>
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
      </div>

      {/* Help Categories Block */}
      <div className="space-y-4">
        <div className="flex items-end justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Choose a direction</p><h3 className="mt-1 text-lg font-black text-slate-900 dark:text-white">What is on your mind?</h3></div><span className="hidden text-xs font-semibold text-slate-400 md:block">Tap a topic to begin</span></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {helpCategories.map((cat, idx) => (
            <button key={idx} type="button" onClick={() => onSelectPrompt(cat.label)} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3 text-left hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800">
              <div className={`p-2.5 rounded-xl ${cat.bg} shrink-0`}>{cat.icon}</div>
              <span className="text-xs font-bold text-slate-800 leading-tight tracking-tight dark:text-white">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Prompt Cards Stack */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black dark:text-white text-slate-900">Start with a question</h3>
          {/* <button className="text-xs font-bold text-[#60399A] flex items-center gap-1 hover:opacity-80">
            <RotateCw size={20} /> Refresh
          </button> */}
        </div>
        
        <div className="grid gap-3 md:grid-cols-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(q)}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200/80 p-4 rounded-2xl flex items-center justify-between text-left hover:border-[#19349d]/50 hover:shadow-md transition shadow-sm group"
            >
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-tight pr-4 leading-normal">{q}</span>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}