"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Edit2, Check, Sparkles } from "lucide-react";
import StreakCard from "@/components/StreakCard";
import ComingSoon from "@/components/ComingSoon";

export default function NaamJaapPage() {
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0, streakCount: 0, weekHistory: [] });

  // Mantra Management States
  const [mantra, setMantra] = useState("राम");
  const [tempMantra, setTempMantra] = useState("राम");
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // 🌟 Throttling State: Prevents clicks faster than 500ms
  const [isThrottled, setIsThrottled] = useState(false);

  // 1. Fetch data profile on initialization mount
  useEffect(() => {
    const savedCount = localStorage.getItem("believa_jap_count");
    const savedMala = localStorage.getItem("believa_mala_count");
    const savedMantra = localStorage.getItem("believa_mantra_name");
    const savedtoday = localStorage.getItem("today_data");
    const savedweek = localStorage.getItem("weekly_data");
    const savedmonth = localStorage.getItem("monthly_data");

    if (savedCount !== null) setCount(parseInt(savedCount, 10));
    if (savedMala !== null) setMalaCount(parseInt(savedMala, 10));
    
    if (savedtoday !== null || savedweek !== null || savedmonth !== null) {
      setStats(prev => ({
        ...prev,
        today: savedtoday !== null ? parseInt(savedtoday, 10) : prev.today,
        week: savedweek !== null ? parseInt(savedweek, 10) : prev.week,
        month: savedmonth !== null ? parseInt(savedmonth, 10) : prev.month,
      }));
    }
    
    if (savedMantra !== null) {
      setMantra(savedMantra);
      setTempMantra(savedMantra);
    }

    async function loadStats() {
      try {
        const res = await fetch("/api/naam-jaap");
        const json = await res.json();
        if (json.success && json.data) {
          setStats({
            today: json.data.today || 0,
            week: json.data.week || 0,
            month: json.data.month || 0,
            streakCount: json.data.streakCount || 0,
            weekHistory: json.data.weekHistory || []
          });
          setCount(json.data.count || 0);
          setMalaCount(json.data.malaCount || 0);

          const dbMantra = json.data.jaap_naam || "राम";
          setMantra(dbMantra);
          setTempMantra(dbMantra);

          localStorage.setItem("believa_jap_count", json.data.count || 0);
          localStorage.setItem("believa_mala_count", json.data.malaCount || 0);
          localStorage.setItem("believa_mantra_name", dbMantra);
          localStorage.setItem("today_data", json.data.today || 0);
          localStorage.setItem("weekly_data", json.data.week || 0);
          localStorage.setItem("monthly_data", json.data.month || 0);
        }
      } catch (err) {
        console.error("Could not link initial data metrics profile:", err);
      }
    }
    loadStats();
  }, []);

  // 2. Transmit interactions directly down to database backend route
  const syncJapToDatabase = async (incrementValue, targetMalaCount, currentMantra) => {
    try {
      const res = await fetch("/api/naam-jaap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incrementBy: incrementValue,
          newMalaCount: targetMalaCount,
          jaap_naam: currentMantra
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setStats({
          today: json.data.today || 0,
          week: json.data.week || 0,
          month: json.data.month || 0,
          streakCount: json.data.streakCount || 0,
          weekHistory: json.data.weekHistory || []
        });
      }
    } catch (err) {
      console.error("Background sync dropped context framework:", err);
    }
  };

  // 3. Save modified Mantra handler
  const handleSaveMantra = () => {
    const finalizedMantra = tempMantra.trim() !== "" ? tempMantra : "राम";
    setMantra(finalizedMantra);
    localStorage.setItem("believa_mantra_name", finalizedMantra);
    setIsEditing(false);

    syncJapToDatabase(0, malaCount, finalizedMantra);
  };

  // 4. User Tap Chanting Core Trigger Handler
  const handleIncrement = () => {
    if (isThrottled) return;

    // Set throttle lock active
    setIsThrottled(true);

    // Release the throttle lock after exactly 500 milliseconds
    setTimeout(() => {
      setIsThrottled(false);
    }, 500);

    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(80); 
    }
    
    if (count >= 107) {
      const nextMala = malaCount + 1;
      setCount(108);
      localStorage.setItem("believa_jap_count", "108");
      localStorage.setItem("believa_mala_count", nextMala.toString());

      setStats(prev => {
        const nextToday = prev.today + 1;
        const nextWeek = prev.week + 1;
        const nextMonth = prev.month + 1;
        
        localStorage.setItem("today_data", nextToday.toString());
        localStorage.setItem("weekly_data", nextWeek.toString());
        localStorage.setItem("monthly_data", nextMonth.toString());
        
        return {
          ...prev,
          today: nextToday,
          week: nextWeek,
          month: nextMonth
        };
      });

      syncJapToDatabase(1, nextMala, mantra);

      setTimeout(() => {
        setCount(0);
        setMalaCount(nextMala);
        localStorage.setItem("believa_jap_count", "0");
      }, 200);
    } else {
      const nextCount = count + 1;
      setCount(nextCount);

      localStorage.setItem("believa_jap_count", nextCount.toString());
      localStorage.setItem("believa_mala_count", malaCount.toString());

      setStats(prev => {
        const nextToday = prev.today + 1;
        const nextWeek = prev.week + 1;
        const nextMonth = prev.month + 1;
        
        localStorage.setItem("today_data", nextToday.toString());
        localStorage.setItem("weekly_data", nextWeek.toString());
        localStorage.setItem("monthly_data", nextMonth.toString());
        
        return {
          ...prev,
          today: nextToday,
          week: nextWeek,
          month: nextMonth
        };
      });

      syncJapToDatabase(1, malaCount, mantra);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] dark:bg-[#0B0907] text-slate-800 dark:text-white pt-6 pb-28 font-sans antialiased transition-colors duration-300 overflow-hidden">
      
      {/* Decorative ambient lighting aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#B76E35]/10 via-[#7E52C0]/10 to-transparent blur-3xl dark:from-[#DDA66D]/10 dark:via-[#60399A]/15" />
      </div>

      <div className="relative max-w-md mx-auto px-4 space-y-6">

        {/* TOP HEADER NAVIGATION PANEL */}
        <div className="flex justify-between items-center bg-white/60 dark:bg-[#14100D]/60 backdrop-blur-md p-3.5 px-5 rounded-2xl border border-[#E8DCCB] dark:border-[#2E251E] shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <img src="/lotus.png" alt="Naam Jaap Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold dark:text-[#FFF7ED] text-slate-900 tracking-tight leading-none">
                Naam Jaap
              </h1>
              <p className="text-[10px] font-semibold text-[#B76E35] dark:text-[#DDA66D] tracking-wider uppercase mt-0.5">
                Daily Chanting
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setIsShow(true)}
            className="p-2.5 rounded-xl bg-[#60399A]/10 text-[#60399A] dark:bg-[#B78DFF]/15 dark:text-[#D4B5FF] hover:scale-105 active:scale-95 transition-all"
            aria-label="View Leaderboard"
          >
            <Trophy size={20} />
          </button>

          <ComingSoon
            isOpen={isShow}
            onClose={() => setIsShow(false)}
          />
        </div>

        {/* 1. INTERACTIVE CHANT ACTIONS MANTRA BANNER PANEL */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#60399A]/10 via-[#7E52C0]/5 to-transparent dark:from-[#60399A]/20 dark:via-[#4C2D7A]/10 dark:to-transparent p-4 rounded-2xl border border-[#60399A]/20 dark:border-[#7E52C0]/30 shadow-sm backdrop-blur-md transition-all">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2.5 bg-white dark:bg-[#60399A] text-[#60399A] dark:text-white rounded-xl shadow-sm shrink-0 border border-purple-100 dark:border-purple-800">
                <Edit2 size={16} />
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempMantra}
                    onChange={(e) => setTempMantra(e.target.value)}
                    className="text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-[#1A1410] border border-[#60399A] rounded-lg px-2.5 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#60399A]"
                    maxLength={50}
                    autoFocus
                  />
                ) : (
                  <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white truncate">
                    {mantra}
                  </h4>
                )}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  Set your focus mantra for today
                </p>
              </div>
            </div>

            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveMantra}
                className="bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 hover:bg-emerald-700 transition active:scale-95 shadow-sm shrink-0"
              >
                <Check size={14} /> Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setTempMantra(mantra);
                  setIsEditing(true);
                }}
                className="bg-[#60399A] text-white font-semibold text-xs px-3.5 py-2 rounded-xl hover:bg-[#4c2d7a] transition active:scale-95 shadow-sm shrink-0"
              >
                Change
              </button>
            )}
          </div>
        </div>

        {/* 2. INTERACTIVE VISUAL MALA WHEEL CANVAS */}
        <div className="relative bg-white/70 dark:bg-[#14100D]/80 backdrop-blur-xl rounded-[32px] border border-[#E8DCCB] dark:border-[#2E251E] shadow-[0_15px_40px_-15px_rgba(100,70,40,0.08)] flex flex-col items-center justify-center p-6 min-h-[440px] transition-all">
          
          <div 
            onClick={handleIncrement} 
            className="w-[340px] h-[400px] sm:w-[360px] sm:h-[420px] rounded-full bg-[length:100%_100%] bg-center bg-no-repeat flex flex-col items-center justify-center relative cursor-pointer active:scale-[0.98] transition-transform duration-150 select-none" 
            style={{ backgroundImage: "url('/naam-jap.png')" }}
          >
            <div className="text-center flex flex-col items-center max-w-[170px] -mt-10 select-none pointer-events-none">
              <div className="inline-flex items-center gap-1 text-[10px] text-[#B76E35] dark:text-[#DDA66D] font-bold tracking-widest uppercase mb-1">
                <Sparkles size={10} /> My Naam Jaap
              </div>
              
              <img src="/lotus.png" alt="Lotus" className="w-8 h-8 object-contain my-0.5 opacity-90 drop-shadow-sm" />

              <h2 className="text-2xl font-extrabold dark:text-[#FFF7ED] text-slate-900 font-serif line-clamp-2 leading-tight px-1 mb-1">
                {mantra}
              </h2>

              <div className="mt-1">
                <p className="text-4xl font-black dark:text-white text-slate-950 tracking-tight">{count}</p>
                <p className="text-xs font-bold dark:text-amber-200/60 text-amber-900/50">/108</p>
              </div>
              
              <div className="mt-2.5 bg-[#FAF7F2] dark:bg-[#201812] border border-[#E8DCCB]/60 dark:border-[#352B22] px-3.5 py-1 rounded-full shadow-2xl">
                <p className="text-[11px] font-bold text-[#B76E35] dark:text-[#DDA66D]">
                  {malaCount === 1 ? "1 Mala complete! 🙏" : `${malaCount} Malas complete! 🙏`}
                </p>
              </div>
            </div>
            
            {/* Tap Action Button */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleIncrement();
                }} 
                className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-[#F7EFE5] dark:to-[#E0D3C1] text-white dark:text-slate-950 font-bold text-xs px-9 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 tracking-wide"
              >
                +1 Jap
              </button>
            </div>
          </div>
        </div>

        {/* 3. METRICS ANALYTICS STATS PANEL */}
        <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md border border-[#E8DCCB] dark:border-[#2E251E] rounded-2xl grid grid-cols-3 divide-x divide-[#F0E4D5] dark:divide-[#2A211A] text-center p-4 shadow-sm transition-all">
          {["today", "week", "month"].map((key) => (
            <div key={key} className="px-2">
              <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">{key}</p>
              <p className="text-lg font-black text-slate-900 dark:text-[#FFF7ED] mt-0.5 tracking-tight">
                {(stats[key] ?? 0).toLocaleString()}
              </p>
              <p className="text-[10px] font-semibold text-[#B76E35] dark:text-[#DDA66D] mt-0.5">Japs</p>
            </div>
          ))}
        </div>

        {/* 4. STREAK MATRIX BOARD */}
        <div className="rounded-2xl overflow-hidden">
          <StreakCard
            streakCount={stats?.streakCount ?? 0}
            weekHistory={stats?.weekHistory ?? []}
          />
        </div>

      </div>
    </div>
  );
}