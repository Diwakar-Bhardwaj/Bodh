

"use client";

import React, { useState, useEffect } from 'react';
import LibraryHeader from '@/components/library/LibraryHeader';
import SearchBar from '@/components/library/SearchBar';
import CategoryChips from '@/components/library/CategoryChips';
import ScriptureCard from '@/components/library/ScriptureCard';
import QuizCard from '@/components/library/QuizCard';
import { Trophy } from 'lucide-react';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scriptures, setScriptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hinduism'); // ✅ Fixed: Track active state branch

  // FETCHING FROM DATABASE API
  useEffect(() => {
    async function fetchLibraryData() {
      try {
        const res = await fetch('/api/library');
        
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();
        setScriptures(Array.isArray(data.books) ? data.books : []);
      } catch (error) {
        console.log("Safely caught library loading failure:", error.message);
        setScriptures([]); 
      } finally {
        setLoading(false);
      }
    }
    fetchLibraryData();
  }, []);

  const filteredScriptures = Array.isArray(scriptures) 
  ? scriptures.filter(item => item?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  : [];

  if (loading) {
    return <div className="text-center py-24 text-sm font-medium text-slate-400">Loading library...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 pb-24 pt-5 dark:bg-black dark:text-white md:px-10 md:pb-8 lg:px-14">
      
      <LibraryHeader />

      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      {/* Passed active states down as customizable attributes */}
      <CategoryChips activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* SCRIPTURES GRID / LIST CONTAINER */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 dark:text-white uppercase tracking-widest pl-1">
          {activeTab === 'hinduism' ? 'Hindu Scriptures' : 'Available Quizzes'}
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredScriptures.map((book) => (
            activeTab === 'hinduism'
              ? <ScriptureCard key={book.id} book={book} />
              : <QuizCard key={book.id} book={book} /> // ✅ Switches to Quiz UI components on toggle
          ))}
          
          {filteredScriptures.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              No matching scriptures found. Try another search query.
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Purple Promo Banner module from QNA.png */}
      {activeTab === 'qna' && (
        <div className="bg-[#60399A] text-white p-4 mb-18 rounded-2xl flex items-center gap-3 shadow-sm max-w-sm mx-auto">
          <div className="p-2 bg-white/10 rounded-xl">
            <Trophy size={18} className="text-yellow-300" fill="currentColor" />
          </div>
          <p className="text-[11px] font-bold tracking-wide">
            Test your Knowledge and grow spiritually!
          </p>
        </div>
      )}

    </div>
  );
}