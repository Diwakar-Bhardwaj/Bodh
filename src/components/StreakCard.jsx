

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";

export default function StreakCard() {
  const [streak, setStreak] = useState(0);
  const [weekProgress, setWeekProgress] = useState([
    { day: 'M', active: false },
    { day: 'T', active: false },
    { day: 'W', active: false },
    { day: 'T', active: false },
    { day: 'F', active: false },
    { day: 'S', active: false },
    { day: 'S', active: false },
  ]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchStreakData = async () => {
      try {
        const res = await fetch("/api/streak", { method: "POST" });
        const data = await res.json();
        
        if (data.success) {
          setStreak(data.streakCount);

          // Get the array list from the backend (e.g., [2] if they only logged in Tuesday)
          const backendHistory = data.weekHistory || [];

          const daysLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
          
          const updatedWeek = daysLabels.map((day, idx) => {
            const calendarDayIndex = idx + 1; // 1 = Monday, 7 = Sunday
            
            // ✅ FIXED: Check directly if this day index exists inside our saved DB history array
            const isActive = backendHistory.includes(calendarDayIndex);

            return { day, active: isActive };
          });

          setWeekProgress(updatedWeek);
        }
      } catch (error) {
        console.error("Error reading current user streak data profile:", error);
      }
    };

    fetchStreakData();
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 pl-1">
        Daily Streak <span className="text-orange-500">🔥</span>
      </h3>

      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-5 rounded-[28px] shadow-sm flex items-center justify-between gap-2">
        
        {/* Total Metric Count */}
        <div className="flex flex-col shrink-0">
          <span className="text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-none">
            {streak}
          </span>
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 mt-1">
            Days
          </span>
        </div>
        
        {/* Dynamic Dot Track Matrix Layout */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-1">
          {weekProgress.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                item.active ? 'bg-[#0A1D87] dark:bg-purple-500' : 'bg-slate-200 dark:bg-zinc-800'
              }`} />
              <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>

        {/* Visual Badge Icon */}
        <div className="flex flex-col items-center pl-2 shrink-0">
          <div className="w-10 h-10 bg-[#FFF5EF] dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-sm">
            <Flame size={20} className="text-orange-500 fill-orange-500" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 mt-1 whitespace-nowrap">
            {streak} Days
          </span>
        </div>

      </div>
    </div>
  );
}