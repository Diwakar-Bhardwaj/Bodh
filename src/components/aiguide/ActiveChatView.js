"use client";
import ReactMarkdown from 'react-markdown';
import React, { useState } from "react";
import { ChevronLeft, Bookmark, MessageSquare, Leaf, User2, Copy, ThumbsUp, ThumbsDown, Check } from "lucide-react";

export default function ActiveChatView({ messages, loading, onSelectPrompt, onBack }) {
  // Local state to show a temporary visual "Copied!" indicator for a specific message index
  const [copiedIndex, setCopiedIndex] = useState(null);

  const relatedVerses = [
    { code: "2.48", deval: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।", trans: "yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya" },
    { code: "3.19", deval: "तस्मादसक्तः सततं कार्यं कर्म समाचर ।", trans: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara" }
  ];

  const exploreMoreChips = [
    { text: "Explain this verse in simple words", icon: <MessageSquare size={16} className="text-slate-700" /> },
    { text: "How can I apply this in daily life?", icon: <Leaf size={16} className="text-green-600" /> },
    { text: "Tell me a real life example", icon: <User2 size={16} className="text-slate-700" /> },
  ];

  const [feedback, setFeedback] = useState({});
  const handleCopyText = async (text, index) => {
    if (!text) return;
    try{
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    }
    catch(error){
      console.log("failed to copy text:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-24 md:space-y-8">
      {/* Top Navigation Row */}
      <div className="relative flex items-center py-2">
  <button onClick={onBack} className="z-10 p-2 hover:bg-slate-200/50 rounded-full dark:text-white text-slate-800">
    <ChevronLeft size={22} />
  </button>
  
  <h1 className="absolute inset-x-0 text-center text-xl font-black text-slate-900 dark:text-white tracking-tight">
    Conversation
  </h1>
</div>

      {/* Scrollable Dialogue Bubble Canvas Stack */}
      <div className="space-y-5">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#E1E1E1] flex items-center justify-center border border-purple-100 shrink-0 select-none text-xs">
                 <img src="/profile-side-img.png" alt="Lotus" className="h-[1.6em] w-auto object-contain" />
              </div>
            )}

            <div className={`p-4 rounded-2xl max-w-[85%] text-xs font-medium leading-relaxed relative ${
              msg.role === "user" 
                ? "bg-[#EFE4FF] text-slate-900 rounded-tr-none" 
                : "bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
            }`}>
              {/* add markdown to text */}
              <div className="prose prose-slate max-w-none text-sm font-medium leading-relaxed">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              
              <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 font-semibold select-none">
                <span>{msg.time}</span>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2.5 text-slate-400 pl-4">
                    <button 
                      type="button" 
                      onClick={() => handleCopyText(msg.text, idx)}
                      className="hover:text-slate-600 active:scale-90 transition-transform"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? (
                        <Check size={13} className="text-green-600" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                    <button
  type="button"
  onClick={() => setFeedback(prev => ({ ...prev, [idx]: prev[idx] === "like" ? null : "like" }))}
  className={`hover:text-slate-600 transition-colors ${
    feedback[idx] === "like" ? "text-green-500" : "text-gray-500"
  }`}
  title="Like response"
>
  <ThumbsUp size={13} fill={feedback[idx] === "like" ? "currentColor" : "none"} />
</button>

<button
  type="button"
  onClick={() => setFeedback(prev => ({ ...prev, [idx]: prev[idx] === "dislike" ? null : "dislike" }))}
  className={`hover:text-slate-600 transition-colors ${
    feedback[idx] === "dislike" ? "text-red-500" : "text-gray-500"
  }`}
  title="Dislike response"
>
  <ThumbsDown
    size={13}
    fill={feedback[idx] === "dislike" ? "currentColor" : "none"}
  />
</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading View Component Block */}
        {loading && (
          <div className="flex gap-3 items-start">
            {/* Replaced standard emoji with your dynamic profile-side-img asset */}
            <div className="w-8 h-8 rounded-full bg-white border border-purple-100 flex items-center justify-center shrink-0 select-none text-xs animate-pulse">
              <img src="/profile-side-img.png" alt="Lotus Loading" className="h-[1.6em] w-auto object-contain opacity-60" />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl text-sm text-slate-400 font-bold animate-pulse shadow-sm rounded-tl-none">
              Reflecting on wisdom...
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Related Scriptural References Panel */}
      {!loading && messages.length > 0 && (
        <>
          {/* <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-ms font-bold dark:text-white text-slate-900 flex items-center gap-1.5">
                📚 Related Verses
              </h4>
              <button className="text-sm font-bold text-[#60399A]">View All</button>
            </div>
            <div className="space-y-2">
              {relatedVerses.map((v, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex justify-between items-start gap-4">
                  <div className="space-y-1 text-left">
                    <span className="text-xs font-black text-slate-900 tracking-tight block">{v.code}</span>
                    <p className="text-xs font-extrabold text-slate-800 tracking-normal leading-normal">{v.deval}</p>
                    <p className="text-[10px] font-medium text-slate-400 italic tracking-tight">{v.trans}</p>
                  </div>
                  <button className="p-1.5 text-slate-800 hover:bg-slate-50 rounded-lg"><Bookmark size={16} /></button>
                </div>
              ))}
            </div>
          </div> */}

          {/* Context Explanatory Action Cards Row */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-ms font-bold dark:text-white text-slate-900">Explore more</h4>
              {/* <button className="text-sm font-bold text-[#60399A]">View All</button> */}
            </div>
            <div className="grid grid-cols-3 gap-2 ">
              {exploreMoreChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPrompt(chip.text)}
                  className="bg-white dark:bg-black border border-slate-100 p-3 rounded-2xl flex flex-col items-start justify-between text-left hover:border-slate-300 transition shadow-sm h-24"
                >
                  <div className="p-1.5 bg-[#F4F6F9] rounded-lg mb-2">{chip.icon}</div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight tracking-tight">{chip.text}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}