import React from 'react';
import { Search } from 'lucide-react';

export default function LibraryHeader() {
  return (
    <div className="flex justify-between items-center bg-transparent pt-2">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Library</h1>
      <button className="p-2 hover:bg-slate-200/60 rounded-full transition-colors dark:text-white text-slate-700">
        <Search size={20} />
      </button>
    </div>
  );
}