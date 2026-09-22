"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import BottomNavWrapper from "./BottomNavWrapper";

export default function StructuralLayoutWrapper({ children }) {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen antialiased transition-colors duration-200 ${
      darkMode ? "bg-zinc-950 text-slate-100" : "bg-[#F7F4F5] text-slate-800"
    }`}>
      <main className={`min-h-screen w-full flex flex-col relative transition-colors duration-200 md:pl-64 ${
        darkMode ? "bg-zinc-900" : "bg-white"
      }`}>
        {children}
        <BottomNavWrapper />
      </main>
    </div>
  );
}