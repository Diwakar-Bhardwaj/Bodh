"use client";
import React from "react";
import { Bell } from "lucide-react";

export default function ProfileHeader({ title }) {
  return (
    <div className="flex justify-between items-center bg-[#F7F1F3] dark:bg-black">
      {/* Left Side: Logo Asset and Brand Text */}
      <div className="flex items-center gap-1">
        <div className="relative w-25 h-20 flex items-center justify-center">
          <img 
            src="/lotus.png" 
            alt="Naam Jaap Logo" 
            className="w-full h-full object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
      </div>

     
    </div>
  );
}