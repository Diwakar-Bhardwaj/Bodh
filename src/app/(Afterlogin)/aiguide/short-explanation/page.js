import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark } from 'lucide-react';

export default function ShortExplanationPage() {
  return (
    <div className="p-4 sm:p-6 md:p-10 pb-28 md:pb-10 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        {/* CHANGED TO LINK ELEMENT */}
        <Link href="/aiguide/verse-detail" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gray-600">
          <ArrowLeft size={18} />
        </Link>
        <h2 className="text-sm font-bold text-gray-900">Short Explanation</h2>
        <button className="p-2 text-gray-600"><Bookmark size={18} /></button>
      </div>
      
      {/* Core explanation layout details follow matching the mockup design layout exactly */}
    </div>
  );
}