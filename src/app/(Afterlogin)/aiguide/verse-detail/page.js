'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';

export default function VerseDetailPage() {
  return (
    <div className="p-4 sm:p-6 md:p-10 pb-28 md:pb-10 max-w-4xl mx-auto flex flex-col justify-between min-h-[calc(100vh-60px)] gap-8">
      
      {/* Header controls back to dashboard home */}
      <div className="flex justify-between items-center">
        <Link href="/aiguide" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gray-600">
          <ArrowLeft size={18} />
        </Link>
        <h2 className="text-xs font-bold text-gray-900 uppercase">Bhagavad Gita</h2>
        <button className="p-2 text-gray-600"><Settings size={18} /></button>
      </div>

      {/* Sacred Text display block remains same */}

      {/* Action Selector card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-xl mx-auto w-full space-y-4">
        {/* CHANGED TO LINK ELEMENT */}
        <Link 
          href="/aiguide/short-explanation"
          className="block text-center w-full bg-blue-900 text-white rounded-xl py-3 text-sm font-semibold shadow-md transition-all hover:bg-blue-950"
        >
          Understand Now
        </Link>
      </div>
    </div>
  );
}