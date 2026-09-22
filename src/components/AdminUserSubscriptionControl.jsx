"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, RefreshCw, XCircle, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUserSubscriptionControl({ activeUserContext, onOperationComplete }) {
  // Bind component context variables over input user properties instantly
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  // Fallback protection handler block if no user dataset row has been selected yet
  if (!activeUserContext) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
        Select a profile row from the master directory listing to toggle administrative override modifiers.
      </div>
    );
  }

  const handleUpdateSubscription = async (actionType) => {
    try {
      setLoadingAction(true);

      const res = await fetch("/api/admin/subscriptions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeUserContext.id,
          subscriptionId: activeUserContext.subscription_id,
          action: actionType, 
          targetPlanName: selectedPlan, 
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success(`Successfully ran target directive: ${actionType}`);
      setSelectedPlan("");

      // Trigger a silent structural data sync re-fetch on the parent page table state
      if (onOperationComplete) {
        onOperationComplete();
      }

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Operation rejected by backend engine.");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-5">
      
      {/* Target User Card Block Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-zinc-800/60 pb-3.5">
        <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-[#60399A] dark:text-purple-400">
          <User size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-black text-slate-950 dark:text-white truncate">{activeUserContext.name}</h2>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal truncate">{activeUserContext.email}</p>
        </div>
        <span className="text-[9px] font-mono font-black bg-slate-100 dark:bg-zinc-800 text-slate-500 px-1.5 py-0.5 rounded-sm">
          #{activeUserContext.id}
        </span>
      </div>

      {/* Synchronized Core Plan Context Readouts */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
        <div className="p-3 bg-slate-50/70 dark:bg-zinc-800/40 rounded-xl border border-slate-100/40 dark:border-zinc-800/20">
          <span className="text-slate-400 dark:text-zinc-500 block mb-0.5 text-[9px] uppercase font-black tracking-wider">Active Tier</span>
          <span className="text-slate-900 dark:text-zinc-200 truncate block">
            {activeUserContext.plan_name || "Free Standard Access"}
          </span>
        </div>
        <div className="p-3 bg-slate-50/70 dark:bg-zinc-800/40 rounded-xl border border-slate-100/40 dark:border-zinc-800/20">
          <span className="text-slate-400 dark:text-zinc-500 block mb-0.5 text-[9px] uppercase font-black tracking-wider">Status Record</span>
          <span className={`capitalize flex items-center gap-1 ${activeUserContext.subscription_status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`}>
            ● {activeUserContext.subscription_status || "Inactive"}
          </span>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-zinc-800/50" />

      {/* Framework Modification Block */}
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider block">Migrate Access Profile Tier</label>
        <div className="flex gap-2">
          <select 
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            disabled={loadingAction}
            className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-zinc-200 focus:outline-hidden"
          >
            <option value="">Choose New Target Level...</option>
            <option value="Believa Pro">Bodh Pro (₹199)</option>
            <option value="Believa Family">Bodh Family (₹499)</option>
            <option value="Believa Plus">Bodh Plus (₹799)</option>
          </select>
          <button
            type="button"
            disabled={!selectedPlan || loadingAction}
            onClick={() => handleUpdateSubscription("UPGRADE")}
            className="bg-[#60399A] dark:bg-purple-600 text-white font-black text-xs px-4 py-2 rounded-xl active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shrink-0 shadow-2xs"
          >
            {loadingAction ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={11} />} Apply
          </button>
        </div>
      </div>

      {/* Dangerous Administrative Override Controllers */}
      <div className="space-y-2 pt-1">
        <label className="text-[9px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider block">System Level Structural Modifiers</label>
        <div className="space-y-2">
          {activeUserContext.subscription_status === "active" && (
            <button
              type="button"
              disabled={loadingAction}
              onClick={() => handleUpdateSubscription("CANCEL")}
              className="w-full border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {loadingAction ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />} Revoke Active Subscription
            </button>
          )}

          <button
            type="button"
            disabled={loadingAction}
            onClick={() => handleUpdateSubscription("GRANT_FREE_ACCESS")}
            className="w-full bg-slate-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <ShieldAlert size={12} className="text-amber-400" /> Force Lifelong Comp Access
          </button>
        </div>
      </div>

    </div>
  );
}