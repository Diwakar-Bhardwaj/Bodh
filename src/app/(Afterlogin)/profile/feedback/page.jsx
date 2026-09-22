"use client";

import React, { useState } from "react";
import FormActionButtons from "@/components/FormActionButtons";
import { 
  ChevronLeft, 
  MessageCircle, 
  Edit2, 
  Frown,
  Meh,
  Smile,
  Laugh
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState("");
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  // Ratings mapped cleanly to Lucide components with proper color values matching design files
  const ratings = [
    {
      label: "Very Bad",
      value: "very_bad",
      icon: <Frown size={32} className="text-[#C10230]" strokeWidth={2.5} />
    },
    {
      label: "Bad",
      value: "bad",
      icon: <Frown size={32} className="text-[#FFA12F]" strokeWidth={2.5} />
    },
    {
      label: "Okay",
      value: "okay",
      icon: <Meh size={32} className="text-[#FFDE00]" strokeWidth={2.5} />
    },
    {
      label: "Good",
      value: "good",
      icon: <Smile size={32} className="text-[#27A753]" strokeWidth={2.5} />
    },
    {
      label: "Excellent",
      value: "excellent",
      icon: <Laugh size={32} className="text-[#23C45E]" strokeWidth={2.5} />
    },
  ];

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 500) {
      setComment(e.target.value);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation Checks
    if (!selectedRating) {
      toast.error("Please select a rating option before submitting!");
      return;
    }

    if (!agreed) {
      toast.error("Please check the agreement box to share your feedback.");
      return;
    }

    try {
      // 2. Turn on processing spinner state immediately
      setLoading(true);

      // 3. Execute database API call to store feedback
      const res = await fetch("/api/profile/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: selectedRating,
          comment: comment
        }),
      });

      const data = await res.json();

      // 4. Handle response state outcome
      if (data.success) {
        toast.success(data.message || "Thank you for your feedback!");
        
        // 5. Reset layout values on clean completion
        setSelectedRating("");
        setComment("");
        setAgreed(false); 
        router.push("/profile");
      } else {
        toast.error(data.message || "Failed to submit feedback.");
      }

    } catch (error) {
      console.log("Error in feedback page : ", error);
      toast.error("Network error. Please check your internet connection.");
    } finally {
      // 6. Always turn off the spinner when completed
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 dark:text-zinc-100 font-sans pb-24 transition-colors duration-200">
      
      {/* Sticky App Header */}
      <div className="bg-[#F7F1F3] dark:bg-black pt-3 px-4 flex items-center max-w-md mx-auto relative transition-colors duration-200">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-slate-200/60 dark:hover:bg-zinc-800 rounded-full transition absolute left-2"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-center w-full text-slate-900 dark:text-white tracking-tight">
          Feedback
        </h1>
      </div>

      <div className="max-w-md mx-auto px-5 mt-2">

        {/* Central Illustrative Header Feature */}
        <div className="flex flex-col items-center text-center my-6">
          <div className="w-32 h-32 bg-[#F1EFFC] dark:bg-zinc-900 rounded-full flex items-center justify-center relative mb-4 transition-colors">
            <MessageCircle className="w-14 h-14 text-[#60399A] dark:text-purple-400" fill="currentColor" />
            <div className="absolute bottom-4 right-4 w-7 h-7 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-md border border-slate-100 dark:border-zinc-700 text-slate-400 dark:text-zinc-300 transition-colors">
              <Edit2 size={12} strokeWidth={2.5} />
            </div>
          </div>
          
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Share your thoughts</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[270px] leading-relaxed transition-colors">
            Your feedback helps us improve Bodh and serve you better
          </p>
        </div>

        {/* Input Interactive Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Rating Choice Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
              How was your experience?
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {ratings.map((rating) => {
                const isSelected = selectedRating === rating.value;
                return (
                  <button
                    key={rating.value}
                    type="button"
                    onClick={() => setSelectedRating(rating.value)}
                    className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-200 shadow-sm ${
                      isSelected
                        ? "border-[#7B61FF] bg-[#F1EFFC]/40 dark:bg-purple-950/30 ring-1 ring-[#7B61FF]"
                        : "bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="mb-2 hover:scale-105 transition-transform">
                      {rating.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 tracking-tight whitespace-nowrap transition-colors">
                      {rating.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Text Field Input */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
              Tell us more (optional)
            </h3>

            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-2xl p-3 shadow-sm focus-within:border-[#7B61FF] dark:focus-within:border-purple-500 transition-colors relative">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="What did you like or what we can improve?"
                rows={5}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-300 dark:placeholder-zinc-600 text-slate-800 dark:text-zinc-100 font-medium resize-none pb-1.5 transition-colors"
              />
              <span className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-400 dark:text-zinc-600 select-none transition-colors">
                {comment.length}/500
              </span>
            </div>
          </div>

          {/* Legal Acknowledgement Toggle Checkbox Row */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 peer-checked:bg-[#0A1D87] dark:peer-checked:bg-purple-600 peer-checked:border-[#0A1D87] dark:peer-checked:border-purple-600 flex items-center justify-center transition-all shadow-sm">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${agreed ? "scale-100" : "scale-0"}`}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 leading-normal transition-colors">
              I agree to share my feedback with Bodh team
            </span>
          </label>

          {/* Form Reusable Button Core Module */}
          <FormActionButtons 
            submitText="Submit Feedback" 
            loading={loading} 
          />

        </form>
      </div>
    </div>
  );
}