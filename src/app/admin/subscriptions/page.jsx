
"use client";

import React, { useState, useEffect } from "react";
import { Search, ShieldAlert, CheckCircle2, CreditCard, RefreshCw, Settings2, X } from "lucide-react";
import toast from "react-hot-toast";
import AdminUserSubscriptionControl from "@/components/AdminUserSubscriptionControl";

export default function AdminSubscriptionsDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // Re-uses your compliant user fetch logic tailored for membership sets
  const fetchSubscriptionLedger = async (filterText = "") => {
    try {
      setIsLoading(true);
      const endpoint = filterText 
        ? `/api/admin/users?query=${encodeURIComponent(filterText)}` 
        : "/api/admin/users";

      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (!data.success) throw new Error(data.message);
      setSubscriptions(data.users);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed gathering membership records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionLedger();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSubscriptionLedger(searchQuery);
  };

  return (
    <div className="pb-24 max-w-md mx-auto p-4 space-y-5 bg-[#F7F1F3] dark:bg-black min-h-screen text-slate-800 dark:text-zinc-200 transition-colors duration-200">
      
      {/* HEADER SECTION */}
      <div className="space-y-4 border-b border-slate-200/60 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#60399A] dark:text-purple-400" /> Plan Adjustments
          </h1>
          <p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 mt-0.5">
            Modify live customer tiers, revoke licenses, or override gateways.
          </p>
        </div>

        {/* SEARCH INPUT */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search subscriber name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl font-bold focus:outline-hidden focus:border-[#60399A] dark:focus:border-purple-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-[#60399A] dark:bg-purple-600 text-white text-xs font-black px-4 py-2 rounded-xl active:scale-95 transition-all"
          >
            Filter
          </button>
        </form>
      </div>

      {/* CORE CARDS LIST */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-2 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-[#60399A] dark:text-purple-400" />
          <span className="text-[10px] font-black tracking-wider uppercase">Loading Gateways...</span>
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4">
          <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-black text-xs text-slate-900 dark:text-white">No Subscribers Matched</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {subscriptions.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white dark:bg-zinc-900 border border-slate-200/70 dark:border-zinc-800/80 rounded-xl p-4 shadow-2xs flex items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-black text-xs text-slate-950 dark:text-white truncate max-w-[120px]">
                    {profile.name}
                  </span>
                  {profile.plan_name ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-50 dark:bg-purple-950/30 text-[#60399A] dark:text-purple-400">
                      {profile.plan_name}
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100/60 dark:bg-zinc-800/40 px-1.5 py-0.5 rounded-sm">
                      Free Tier
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    profile.subscription_status === "active" ? "bg-emerald-500" : "bg-slate-300 dark:bg-zinc-700"
                  }`} />
                  <span className="capitalize">{profile.subscription_status || "Inactive"}</span>
                  <span>•</span>
                  <span className="font-mono flex items-center gap-0.5">
                    <CreditCard size={10} /> ₹{parseFloat(profile.total_spent).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* ACTION TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setSelectedUser(profile)}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-[11px] font-black px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0"
              >
                Modify
              </button>
            </div>
          ))}
        </div>
      )}

      {/* OVERLAY ADMINISTRATIVE CONSOLE DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-t-3xl md:rounded-3xl p-1 relative shadow-xl border border-slate-200/50 dark:border-zinc-800 animate-in slide-in-from-bottom duration-200">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-50 dark:bg-zinc-800 cursor-pointer"
            >
              <X size={14} />
            </button>
            <div className="p-2 pt-6">
              <AdminUserSubscriptionControl 
                activeUserContext={selectedUser}
                onOperationComplete={() => {
                  setSelectedUser(null);
                  fetchSubscriptionLedger(searchQuery); // Seamless instant refresh
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}