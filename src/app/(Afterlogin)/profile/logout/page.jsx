"use client";

import React from "react";
import { ChevronLeft, LogOut, Info } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleLogoutConfirm = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] text-slate-800 font-sans pb-12 flex flex-col justify-center items-center px-4">
      {/* Outer Card Wrapper */}
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-sm border border-slate-100/50">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 hover:bg-slate-100 rounded-full transition absolute left-0"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>

          <h1 className="text-xl font-bold text-center w-full text-slate-900 tracking-tight">
            Logout
          </h1>
        </div>

        {/* Illustration */}
        <div className="flex flex-col items-center text-center my-6">
          <div className="w-32 h-32 bg-[#F1EFFC] rounded-full flex items-center justify-center relative mb-6">
            <LogOut
              className="w-14 h-14 text-[#60399A] transform translate-x-1"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-lg font-bold text-slate-900 tracking-tight px-2">
            Are you sure you want to log out?
          </h2>

          <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] leading-relaxed">
            You will be signed out from your account on this device
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-[#F0EDFF]/60 border border-[#F0EDFF] rounded-[24px] p-4 flex items-start gap-4 mb-8">
          <div className="w-10 h-10 bg-white text-[#7B61FF] rounded-full border border-slate-100/50 flex items-center justify-center shadow-sm shrink-0 mt-0.5">
            <Info size={20} strokeWidth={2} />
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Good to know
            </h4>

            <p className="text-[11px] font-medium text-slate-400 mt-0.5 leading-relaxed">
              You can log back in anytime by using your email and password.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleLogoutConfirm}
            className="w-full bg-[#0A1D87] text-white py-4 rounded-full font-semibold text-sm shadow-md hover:bg-[#071563] active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-white text-[#0A1D87] border border-[#0A1D87] py-4 rounded-full font-semibold text-sm hover:bg-slate-50 active:scale-[0.99] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}