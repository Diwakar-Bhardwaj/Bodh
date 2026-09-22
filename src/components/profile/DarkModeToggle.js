"use client";
import React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

export default function DarkModeToggle({ t }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl text-left">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-2xl">
          <Moon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">{t.profile.darkMode}</h4>
          <p className="text-xs text-slate-400">{t.profile.switchTheme}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={toggleDarkMode} 
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7B61FF]"></div>
      </label>
    </div>
  );
}