import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full ">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search for books, chapters, topics..."
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border dark:bg-black border-slate-100 focus:border-blue-500 focus:bg-white text-xs sm:text-sm pl-11 pr-4 py-4 rounded-full outline-none transition-all shadow-inner text-slate-800 placeholder-slate-400"
      />
    </div>
  );
}