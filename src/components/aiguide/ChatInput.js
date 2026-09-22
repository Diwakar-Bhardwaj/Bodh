import React from "react";
import { Send } from "lucide-react";

export default function ChatInput({ value, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-2 pl-5 shadow-[0_10px_30px_rgba(15,23,42,0.10)] flex items-center justify-between gap-2 w-full mx-auto focus-within:border-[#19349d] focus-within:ring-4 focus-within:ring-[#19349d]/10 transition-all md:max-w-4xl">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything...."
        className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-400 font-medium text-slate-800 py-2.5"
      />
      <button
        type="button"
        onClick={onSend}
        className="bg-[#0A1D87] hover:bg-blue-900 active:scale-95 text-white p-3 rounded-xl shadow-md transition-all shrink-0"
        aria-label="Send Query"
      >
        <Send size={15} fill="currentColor" className="transform rotate-[-15deg] translate-x-[1px]" />
      </button>
    </div>
  );
}