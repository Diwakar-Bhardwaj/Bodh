"use client";
import React from 'react';
import Link from 'next/link';

export default function QuizCard({ book }) {
  const totalQuestions = book?.total_questions ?? "0";
  // const difficulty = book?.difficulty ?? "Easy";
  const progress = book?.progress ?? 10;

  // const badgeColors = {
  //   Easy: "bg-green-100 text-green-700",
  //   Medium: "bg-amber-100 text-amber-700",
  //   Hard: "bg-blue-100 text-blue-700" 
  // };

  return (
    <div className="w-full bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
          <img 
            src={book?.image_url || '/images/default-scripture.png'} 
            alt={book?.title} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = "/lotus.png"; }}
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-900 tracking-tight">
            {book?.title ? `${book.title} Quiz` : "Scripture Quiz"}
          </h4>
          <p className="text-[11px] font-bold text-slate-400">
            {totalQuestions} Questions
          </p>
          {/* <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider ${badgeColors[difficulty] || badgeColors.Easy}`}>
            {difficulty}
          </span> */}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
          {/* <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-green-500" strokeWidth="3.5" strokeDasharray={`${progress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-[7px] font-black text-slate-800">{progress}%</span>
          </div> */}
          {/* <span className="text-[9px] font-black uppercase text-slate-500">Completed</span> */}
        </div>

        <Link 
          href={`/library/quiz/${book?.id || 1}`}
          className="bg-[#0A1D87] hover:bg-[#061254] text-white font-bold text-xs px-5 py-2 rounded-xl transition shadow-sm active:scale-95"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}