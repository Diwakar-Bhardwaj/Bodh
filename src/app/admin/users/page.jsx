"use client";

import React, { useState, useEffect } from "react";
import { Search, ShieldAlert, CheckCircle2, UserCheck, CreditCard, RefreshCw, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsersData = async (filterText = "") => {
    try {
      setIsLoading(true);
      const endpoint = filterText 
        ? `/api/admin/users?query=${encodeURIComponent(filterText)}` 
        : "/api/admin/users";

      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (!data.success) throw new Error(data.message);
      setUsers(data.users);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed gathering records ledger.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsersData(searchQuery);
  };

  return (
    <div className="pb-24 max-w-md mx-auto p-4 space-y-5 bg-[#F7F1F3] dark:bg-black min-h-screen text-slate-800 dark:text-zinc-200 transition-colors duration-200">
      
      {/* HEADER BLOCK */}
      <div className="space-y-4 border-b border-slate-200/60 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#60399A] dark:text-purple-400" /> User Directory
          </h1>
          <p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 mt-0.5">
            Monitor accounts, membership tier levels, and billing state history.
          </p>
        </div>

        {/* COMPACT SEARCH FILTER BAR */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl font-bold focus:outline-hidden focus:border-[#60399A] dark:focus:border-purple-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-[#60399A] hover:bg-[#4C2D7B] dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-xs font-black px-4 py-2 rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Filter
          </button>
        </form>
      </div>

      {/* RENDER RUNTIME BLOCK */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-2 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-[#60399A] dark:text-purple-400" />
          <span className="text-[10px] font-black tracking-wider uppercase">Syncing Profiles...</span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4">
          <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-black text-xs text-slate-900 dark:text-white">No Records Found</h3>
        </div>
      ) : (
        /* STACKED LIST PATTERN */
        <div className="space-y-3">
          {users.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white dark:bg-zinc-900 border border-slate-200/70 dark:border-zinc-800/80 rounded-xl p-4 shadow-2xs space-y-3.5"
            >
              {/* Profile Meta Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-black text-xs text-slate-950 dark:text-white truncate">
                    {profile.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-normal truncate">
                    {profile.email}
                  </p>
                </div>
                <span className="text-[9px] font-mono font-bold bg-slate-100 dark:bg-zinc-800 text-slate-500 px-1.5 py-0.5 rounded-sm shrink-0">
                  #{profile.id}
                </span>
              </div>

              {/* Status Operational Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800/50">
                {profile.plan_name ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black bg-purple-50 dark:bg-purple-950/30 text-[#60399A] dark:text-purple-400">
                    <CheckCircle2 size={9} fill="currentColor" className="text-white dark:text-zinc-900" />
                    {profile.plan_name}
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100/60 dark:bg-zinc-800/40 px-1.5 py-0.5 rounded-sm">
                    Free Tier
                  </span>
                )}

                <div className="inline-flex items-center text-[10px] font-bold">
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                    profile.subscription_status === "active" ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                  }`} />
                  <span className="text-[9px] capitalize text-slate-500 dark:text-zinc-400">
                    {profile.subscription_status || "Inactive"}
                  </span>
                </div>
              </div>

              {/* Transaction Metrics Ledger Footer */}
              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-slate-100 dark:border-zinc-800 text-[10px]">
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase font-black text-slate-400 tracking-wider">Total Invested</span>
                  <span className="flex items-center gap-0.5 font-mono font-black text-slate-900 dark:text-zinc-100">
                    <CreditCard size={10} className="text-slate-400" />
                    ₹{parseFloat(profile.total_spent).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-0.5 text-right">
                  <span className="block text-[8px] uppercase font-black text-slate-400 tracking-wider">Joined On</span>
                  <span className="flex items-center justify-end gap-1 font-bold text-slate-500 dark:text-zinc-400">
                    <Calendar size={10} className="text-slate-400" />
                    {new Date(profile.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}