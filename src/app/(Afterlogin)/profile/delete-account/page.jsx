"use client";

import React, { useState } from "react";
import { ChevronLeft, Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DeleteAccountPage() {

  const router = useRouter();
  const [understandDelete, setUnderstandDelete] = useState(false);

  const handleCancel = () => {
    // Navigates the user back to the previous profile view dashboard
    window.history.back();
  };

  // const handleDeleteConfirm = (e) => {
  //   e.preventDefault();
  //   if (!understandDelete) return;
    
  //   alert("Account permanently deleted.");
  //   // Redirect user to the register or landing page
  //   window.location.href = "/register";
  // };

  const handleDeleteConfirm = async (e) => {

  e.preventDefault();

  if (!understandDelete) return;

  try {

    const res = await fetch(
      "/api/profile/delete-account",
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {

      await signOut({
        redirect: false,
      });

      router.push("/register");
    }

  } catch (error) {

    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-[#D9D9D9] text-slate-800 font-sans pb-12 flex flex-col justify-center items-center px-4">
      
      {/* Outer Card Window Container matching Profile (1)_2.png layout */}
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-sm border border-slate-100/50">
        
        {/* Page Top Header Nav */}
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
            Delete Account
          </h1>
        </div>

        {/* Central Red Trash Graphic & Subtitles */}
        <div className="flex flex-col items-center text-center my-4">
          <div className="w-32 h-32 bg-[#FFF0F2] rounded-full flex items-center justify-center mb-4">
            <Trash2 className="w-14 h-14 text-[#CC1633]" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Delete your account?
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-[280px] leading-relaxed">
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </p>
        </div>

        {/* Information Warning Box detailing losses */}
        <div className="bg-[#FFF0F2]/70 border border-[#FFE2E6] rounded-[24px] p-5 flex items-start gap-4 mb-5">
          <div className="w-10 h-10 bg-white text-[#CC1633] rounded-full border border-red-100 flex items-center justify-center shadow-sm shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#CC1633] tracking-tight">
              What will be deleted?
            </h4>
            <ul className="mt-1.5 space-y-1 text-slate-500 text-xs font-semibold list-disc list-inside">
              <li>Your profile and account information</li>
              <li>Your journal entries and progress</li>
              <li>Your saved content and preferences</li>
              <li>All app data associated with your account</li>
            </ul>
          </div>
        </div>

        {/* Custom Rounded Checkbox Selector Agreement Toggle */}
        <label className="flex items-start gap-3 cursor-pointer select-none mb-6 text-left px-1">
          <div className="relative flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={understandDelete}
              onChange={(e) => setUnderstandDelete(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white peer-checked:bg-[#CC1633] peer-checked:border-[#CC1633] flex items-center justify-center transition-all shadow-sm">
              <svg 
                width="10" 
                height="10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform ${understandDelete ? "scale-100" : "scale-0"}`}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700 leading-tight">
            I understand that this action is permanent and cannot be undone.
          </span>
        </label>

        {/* Operational Form Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDeleteConfirm}
            disabled={!understandDelete}
            className={`w-full py-4 rounded-full font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition duration-150 ${
              understandDelete 
                ? "bg-[#CC1633] text-white hover:bg-[#A61028] active:scale-[0.99]" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Trash2 size={16} />
            <span>Delete Account</span>
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