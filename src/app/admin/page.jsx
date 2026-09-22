

"use client";

import React from "react";
import { 
  MessageSquare, 
  Star, 
  Mail, 
  BookOpen, 
  FilePlus2, 
  ChevronRight,
  ShieldCheck,
  User,
  SubscriptIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BiMoney, BiPurchaseTag } from "react-icons/bi";

export default function AdminMobileDashboard() {

  const router = useRouter();
  
  // High-level analytics stats matching your requested items
  const stats = [
    { label: "Contacts", icon: Mail, color: "text-blue-600 bg-blue-50", path: "/admin/contact-us" },
    { label: "Rating", icon: Star, color: "text-amber-500 bg-amber-50", isFilled: true, path: "/admin/rating" },
    { label: "Feedback", icon: MessageSquare, color: "text-emerald-600 bg-emerald-50", path: "/admin/feedback" },
  ];

  // Core administrative action menu rows
  const adminActions = [
    {
      title: "Users information",
      subtitle: "You able to show all users information",
      icon: User,
      onClick: () => router.push("/admin/users"),
      badge: "user",
      accent: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      title: "Subscription Details",
      subtitle: "subscription details and also you can modify",
      icon: BiMoney,
      onClick: () => router.push("/admin/subscriptions"),
      badge: "Subscription",
      accent: "bg-sky-50 text-sky-600 border-sky-100"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 px-4 pt-6 pb-24 font-sans select-none">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Mobile Header Block */}
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-4 rounded-3xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm">
              AD
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Admin Console
              </h1>
              <span className="text-[11px] font-bold text-slate-400 mt-1 block">
                Production Environment
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Secure</span>
          </div>
        </div>

        {/* 1. Quick Stats Grid (3 columns on phone screen width) */}
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <button 
                key={idx} 
                onClick={() => router.push(stat.path)}
                className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 p-3 rounded-2xl shadow-xs flex flex-col items-center text-center justify-center gap-1 cursor-pointer hover:bg-gray-100"
              >
                <div className={`p-2 rounded-xl shrink-0 ${stat.color} dark:bg-zinc-800`}>
                  <StatIcon size={16} className={stat.isFilled ? "fill-amber-500" : ""} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-lg font-black text-slate-950 dark:text-white tracking-tight leading-none">
                  {stat.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Management Operational List Actions */}
        <div className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">
            System Directives
          </h2>
          
          <div className="space-y-3">
            {adminActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={action.onClick}
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-left p-4 rounded-3xl shadow-xs flex items-center justify-between gap-4 active:scale-[0.98] active:bg-slate-50 dark:active:bg-zinc-800 transition-all duration-150 group min-h-[72px]"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon Base */}
                    <div className={`p-3 rounded-2xl border ${action.accent} dark:bg-zinc-800 dark:border-zinc-700 shrink-0`}>
                      <ActionIcon size={22} />
                    </div>
                    
                    {/* Text node metadata */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                          {action.title}
                        </h3>
                        <span className="text-[9px] px-1.5 py-0.5 font-extrabold tracking-wide uppercase rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                          {action.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium line-clamp-1">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Navigation indicator arrowhead chevrons */}
                  <ChevronRight 
                    size={18} 
                    className="text-slate-300 dark:text-zinc-600 group-hover:text-slate-500 transition-colors shrink-0" 
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}