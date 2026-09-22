import React from "react";

export default function UniversalLoading() {
  return (
    <div className="min-h-screen bg-[#F7F1F3] flex flex-col items-center justify-center gap-4">
      
      {/* Modern Circular Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer tracking ring */}
        <div className="absolute inset-0 border-4 border-slate-200/60 rounded-full" />
        {/* Active spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-[#7B61FF] rounded-full animate-spin" />
      </div>

      {/* Pulsing Text */}
      <div className="flex flex-col items-center text-center gap-1">
        <p className="text-sm font-bold text-slate-700 tracking-tight animate-pulse">
          Loading...
        </p>
        <p className="text-xs text-slate-400 font-medium">
          Please wait a moment
        </p>
      </div>

    </div>
  );
}