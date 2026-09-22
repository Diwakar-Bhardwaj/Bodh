"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Star, 
  Heart 
} from "lucide-react";
import toast from "react-hot-toast";

export default function RateBodhPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleTextChange = (e) => {
    if (e.target.value.length <= 500) {
      setReviewText(e.target.value);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(rating === 0) {
      toast.error("Please select a star rating before submitting your review.")
      return;
    }

    try {
      const res = await fetch("/api/profile/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          rating: rating,
          reviewText: reviewText
        }),
      });

      const data = await res.json();


      if(data.success) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      else toast.error(data.message);

    } catch (error) {
      console.log("Error in rating page : ", error);
      toast.error("Network error. Check your internet connection.");
    }

  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 font-sans pb-24">
      
      {/* Sticky App Header Bar */}
      <div className="bg-[#F7F1F3] dark:bg-black pt-3 px-4 flex items-center max-w-md mx-auto relative">
        <button 
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-slate-200/60 rounded-full transition absolute left-2"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-center w-full dark:text-white text-slate-900 tracking-tight">
          Rate Bodh
        </h1>
      </div>

      <div className="max-w-md mx-auto px-5 mt-2">
        
        {/* Top Decorative Star Branding Illustration Banner */}
        <div className="flex flex-col items-center text-center my-6">
          <div className="w-32 h-32 bg-[#F1EFFC] rounded-full flex items-center justify-center relative mb-4 shadow-sm">
            <Star className="w-16 h-16 text-[#60399A]" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Enjoying Bodh?</h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] leading-relaxed">
            Your rating encourages us to keep building something meaningful.
          </p>
        </div>

        {/* Interactive Form Components */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Interactive Star Row Block Container */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900  dark:text-white tracking-tight">
              Rate us
            </h3>
            
            <div className="bg-white border dark:bg-[#737373] border-slate-50 rounded-[24px] py-3 px-6 shadow-sm flex flex-col items-center justify-center">
              <div className="flex items-center gap-3" >
                {[1, 2, 3, 4, 5].map((starIdx) => {
                  // Determine star rendering color styles dynamically
                  const isFilled = hoverRating ? starIdx <= hoverRating : starIdx <= rating;
                  return (
                    <button
                      key={starIdx} 
                      type="button"
                      onClick={() => setRating(starIdx)}
                      onMouseEnter={() => setHoverRating(starIdx)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform active:scale-90 hover:scale-110 p-1 duration-150"
                      aria-label={`Rate ${starIdx} stars out of 5`}
                    >
                      <Star 
                        size={28} 
                        className={`transition-colors duration-150 ${
                          isFilled 
                            ? "text-[#FFDE00] fill-[#FFDE00]" 
                            : "text-[#FFDE00] stroke-[2]"
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>
                <div className="text-center text-sm text-slate-400 "> 
                Tap a star to rate
              </div>
          </div>

          {/* Optional Review Text Field Input Block */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold dark:text-white text-slate-900 tracking-tight">
              Write a review (optional)
            </h3>
            
            <div className="bg-white border border-slate-200/60 rounded-2xl p-3 shadow-sm focus-within:border-[#7B61FF] transition relative">
              <textarea
                value={reviewText}
                onChange={handleTextChange}
                placeholder="What did you like or what we can improve?"
                rows={5}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-300 text-slate-800 font-medium resize-none pb-1.5"
              />
              <span className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-400 select-none">
                {reviewText.length}/500
              </span>
            </div>
          </div>

          {/* Inline Purple Appreciation Callout Card */}
          <div className="bg-[#5E00FF0F]/60 dark:bg-black  rounded-[24px] p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-[#5E00FF0F] dark:bg-white text-[#7B61FF] rounded-full border border-slate-100/50 flex items-center justify-center shadow-sm shrink-0 mt-0.5">
              <Heart size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-sm font-bold dark:text-white text-slate-900 tracking-tight">
                Thank you!
              </h4>
              <p className="text-[11px] font-medium text-slate-400 mt-1 leading-relaxed">
                Your support helps us reach more people and spread divine knowledge
              </p>
            </div>
          </div>

          {/* Core Action Submit Button Block */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0A1D87] text-white py-4 rounded-full font-semibold text-sm shadow-md hover:bg-[#071563] active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              <Star size={16} fill="currentColor" />
              <span>Submit Rating</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}