"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookChaptersPage() {
  const { id } = useParams(); // Gets book ID from URL
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/library?bookId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.chapters || []);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return <div className="text-center py-[50%] text-sm font-medium text-slate-400">Loading chapters...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {/* Back to Library landing screen button */}
      <button onClick={() => router.push("/library")} className="flex items-center gap-2 text-xs font-bold text-[#0A1D87]">
        <ChevronLeft size={16} /> Back to Library
      </button>
      
      <div className="bg-white p-5 pb-15 rounded-[32px] border border-slate-100 shadow-xs space-y-4">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider pl-1">Available Study Units</h2>
        
        <div className="space-y-2">
          {chapters.length === 0 ? (
            <p className="text-xs text-center text-slate-400 py-8 font-medium">No chapters compiled yet.</p>
          ) : (
            chapters.map((chap) => (
              // ✅ LINK ADDS NESTED URL PATH: /library/book_id/chapter_id
              <Link 
                key={chap.id} 
                href={`/library/${id}/${chap.id}`}
                className="w-full border border-slate-100 bg-slate-50 hover:bg-blue-50/40 p-4 rounded-2xl flex items-center justify-between group transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-800 shadow-2xs">
                    {chap.chapter_number}
                  </span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-900">{chap.title}</span>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-900" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}