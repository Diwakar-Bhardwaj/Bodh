"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function FormActionButtons({ 
  submitText = "Save Changes", 
  loading = false, 
  onCancel // Optional property
}) {
  return (
    <div className="space-y-3 pt-6">
      
      {/* PRIMARY SUBMIT ACTION BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0A1D87] text-white py-4 rounded-full font-semibold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          submitText
        )}
      </button>

      {/* SECONDARY CANCEL ACTION BUTTON - ONLY RENDERS IF ONCANCEL IS PASSED */}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-white text-[#02167E] border border-[#0A1D87] py-4 rounded-full font-semibold text-sm hover:bg-slate-50 active:scale-[0.99] transition   dark:border-blue-500/30 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      )}

    </div>
  );
}