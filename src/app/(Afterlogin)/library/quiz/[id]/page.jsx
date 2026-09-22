"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Bookmark, ArrowRight, CheckCircle2 } from "lucide-react";

export default function QuizPage() {
  const { id } = useParams(); // Retrieves dynamic book id from path router
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // FETCH QUESTIONS FROM THE DYNAMIC BACKEND API
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`/api/quiz/${id}`);
        const json = await res.json();
        if (json.success) {
          setQuestions(json.data);
        }
      } catch (err) {
        console.error("Could not load dynamic quiz stream:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null); // Clear selected state for the next question view
    } else {
      alert("Congratulations! You have completed the quiz.");
      handleBack();
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white text-sm">Loading Questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white text-sm">No questions found for this scripture yet.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion?.correct_option; // 'A', 'B', 'C', or 'D'

  // Map option texts dynamically from your database rows
  const quizOptions = [
    { id: "A", text: currentQuestion?.option_a },
    { id: "B", text: currentQuestion?.option_b },
    { id: "C", text: currentQuestion?.option_c },
    { id: "D", text: currentQuestion?.option_d },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pb-24 select-none md:bg-[radial-gradient(circle_at_top,#211b35_0%,#09090b_48%,#000_100%)]">
      
      {/* 1. TOP HEADER APP BAR PANEL */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 md:px-8 md:pt-8">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-zinc-900 rounded-full transition text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-300">Bodh Library</p>
          <h1 className="text-lg font-bold tracking-wide md:text-xl">QNA</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-2 hover:bg-zinc-900 rounded-full transition text-white"
        >
          {/* <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} /> */}
        </button>
      </div>

      <div className="mx-auto mt-4 max-w-6xl space-y-4 px-4 md:mt-8 md:px-8 lg:grid lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-8 lg:space-y-0">
        
        {/* 2. TOP PURPLE PROGRESS CARD */}
        <div className="bg-[#5F4A78] rounded-3xl p-4 shadow-md flex items-center gap-4 lg:sticky lg:top-8 lg:flex-col lg:items-stretch lg:p-6">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 border-2 border-amber-400 p-1">
            <img src="/lotus.png" alt="Quiz Icon" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 space-y-1 lg:space-y-3">
            <h3 className="text-sm font-black text-white tracking-wide lg:text-xl">{currentQuestion?.book_title || "Book Title"}</h3>
            {/* <p className="text-[11px] text-zinc-300 font-medium">{currentQuestion?.sub_title || "Sundar Kand"}</p> */}
            
            {/* Custom Horizontal Progress Bar */}
            <div className="pt-1.5 space-y-1">
              <div className="w-full h-2 bg-white rounded-full overflow-hidden lg:h-3">
                <div 
                  className="bg-[#0A1D87] h-full transition-all duration-300" 
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-300 pt-0.5">
                <span>{currentIndex + 1}/{questions.length} Questions</span>
                {selectedOption === correctAnswer && <span className="text-[#23C45E] flex items-center gap-0.5">✓ Correct</span>}
              </div>
            </div>
          </div>
        </div>

        {/* 3. CENTRAL MAIN QUESTION SHEET INTERFACE */}
        <div className="bg-[#D1D1D6] rounded-4xl p-5 text-black space-y-4 md:p-8 lg:p-10">
          
          {/* Question Text */}
          <h2 className="text-base font-bold text-slate-900 leading-snug tracking-tight md:text-xl lg:text-2xl">
            <span className="text-[#0A1D87] font-black">Q{currentIndex + 1}.</span> {currentQuestion?.question_text}
          </h2>

          {/* Interactive Multiple Choice Grid Matrix */}
          <div className="grid gap-3 md:grid-cols-2">
            {quizOptions.map((opt) => {
              const hasAnswered = selectedOption !== null;
              const isOptionSelected = selectedOption === opt.id;
              const isOptionCorrect = opt.id === correctAnswer; 

              // Highlight matching background based on answers state
              let buttonStyle = "bg-white border border-transparent hover:bg-slate-50 text-slate-800";
              let badgeStyle = "bg-transparent text-slate-800 border-slate-300";

              if (hasAnswered) {
                if (isOptionCorrect) {
                  // The correct option turns green regardless of what user clicked
                  buttonStyle = "bg-[#CBEAD4] border-2 border-[#27A753] text-[#14532D]";
                  badgeStyle = "bg-[#27A753] text-white border-transparent";
                } else if (isOptionSelected && !isOptionCorrect) {
                  // If chosen option was wrong, it turns red
                  buttonStyle = "bg-red-200 border-2 border-red-500 text-red-900";
                  badgeStyle = "bg-red-500 text-white border-transparent";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={hasAnswered} // Prevents changing selection once clicked
                  onClick={() => setSelectedOption(opt.id)}
                  className={`w-full min-h-16 p-3.5 rounded-[20px] flex items-center justify-between text-left transition-all font-bold text-xs md:min-h-20 md:p-4 md:text-sm ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border text-[11px] font-black shrink-0 ${badgeStyle}`}>
                      {opt.id}
                    </span>
                    <span className="leading-tight font-semibold">{opt.text}</span>
                  </div>
                  
                  {hasAnswered && isOptionCorrect && (
                    <CheckCircle2 size={16} className="text-[#27A753]" fill="currentColor" stroke="white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 4. EXPANDABLE PURPLE EXPLANATION BLOCK */}
          {/* {selectedOption !== null && (
            <div className="bg-[#D5CEE4] rounded-2xl p-4 border border-purple-300/30 text-slate-800 space-y-3 relative overflow-hidden animate-fadeIn">
              
           
              <div className="absolute top-3 right-3 w-6 h-6 opacity-40">
                <img src="/lotus.png" alt="Decorative" className="w-full h-full object-contain filter saturate-50 brightness-50" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-[#60399A] uppercase tracking-wider">Explanation</h4>
                <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                  {currentQuestion?.explanation || "Lord Rama accepted exile to uphold his father Dashratha's promise to Kaikeyi. For him, keeping one's word and following dharma was more important than personal comfort and power."}
                </p>
              </div>

             
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-[1px] bg-slate-400/40 w-16" />
                <img src="/lotus.png" alt="Lotus Separator" className="w-4 h-4 object-contain opacity-60" />
                <div className="h-[1px] bg-slate-400/40 w-16" />
              </div>

           
              <div className="text-center px-2">
                <p className="text-[11px] font-serif font-bold text-[#60399A] leading-normal italic">
                  “Dharma is that which upholds, even when the path is difficult.”
                </p>
              </div>
            </div>
          )
          } */}

        </div>

        {/* 5. BOTTOM NAVIGATION ACTION BUTTON */}
        <div className="pt-2 lg:col-start-2">
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 shadow-md transition-all tracking-wide md:py-5 md:text-base ${
              selectedOption 
                ? "bg-[#0A1D87] text-white hover:bg-[#061254] active:scale-[0.99]" 
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
          >
            <span>Next Question</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}