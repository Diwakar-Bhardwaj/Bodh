"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bookmark, ChevronRight, Inbox } from "lucide-react";

export default function SavedChaptersPage() {
  const router = useRouter();
  const [savedChapters, setSavedChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookmarks targeting current active user
    fetch("/api/library/saved?userId=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.savedChapters) setSavedChapters(data.savedChapters);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
        <div className="text-center text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest animate-pulse">
          Loading Bookmarks...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5 px-5 pb-24 pt-4 min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      
      {/* Top Application Bar Nav */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <button 
          onClick={() => router.push("/library")} 
          className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full shadow-2xs text-slate-800 dark:text-zinc-200 cursor-pointer active:scale-95 transition-transform"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">
            Your Profile
          </span>
          <h1 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            Saved Chapters
          </h1>
        </div>
      </div>

      {/* Main Container Stack */}
      <div className="space-y-3">
        {savedChapters.length === 0 ? (
          /* Empty State Illustration View */
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 rounded-3xl p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Inbox size={18} />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">No Bookmarks Found</p>
            <p className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">
              Chapters you bookmark while reading will show up here.
            </p>
          </div>
        ) : (
          /* Bookmarks Dynamic Render Array */
          savedChapters.map((item) => (
            <button
              key={item.chapter_id}
              onClick={() => router.push(`/library/${item.book_id}/${item.chapter_id}`)}
              className="w-full text-left bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 p-4 rounded-2xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-slate-200 dark:hover:border-zinc-800 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Fixed Bookmark Indicator Aspect Frame */}
                <div className="w-9 h-9 bg-blue-50 dark:bg-amber-950/20 border border-blue-100/30 dark:border-amber-900/30 rounded-xl flex items-center justify-center shrink-0 text-[#0A1D87] dark:text-amber-400">
                  <Bookmark size={14} className="fill-current" />
                </div>
                
                {/* Meta textual information block */}
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-wide block truncate">
                    {item.book_title} — Chapter {item.chapter_number}
                  </span>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-900 dark:group-hover:text-amber-400 transition-colors">
                    {item.chapter_title}
                  </h3>
                </div>
              </div>
              
              <ChevronRight size={14} className="text-slate-300 dark:text-zinc-600 shrink-0 ml-2" />
            </button>
          ))
        )}
      </div>

    </div>
  );
}