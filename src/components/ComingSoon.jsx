

"use client";

import React from "react";
import { X } from "lucide-react";

export default function ComingSoon({ isOpen, onClose }) {
  // ⚠️ CRITICAL: If isOpen is false, this stops the component from rendering entirely
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
      
      <div className="relative bg-white rounded-3xl p-2 max-w-[380px] w-full shadow-2xl flex flex-col items-center">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose} // This sets isShow back to false in Header.jsx
          className="absolute -top-3 -right-3 bg-[#0A1D87] text-white p-2 rounded-full shadow-lg"
        >
          <X size={18} strokeWidth={3} />
        </button>

        {/* Image Box */}
        <div className="w-full h-auto overflow-hidden rounded-2xl bg-white">
          <img
            src="/comming-soon.png" 
            alt="Coming Soon"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}