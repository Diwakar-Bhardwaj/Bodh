

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bookmark, ChevronRight, Inbox, Trash2, CheckCircle2, AlertTriangle, X } from "lucide-react";

export default function SavedChaptersPage() {
  const router = useRouter();
  const [savedChapters, setSavedChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🍞 Toast Notifications State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", 
  });

  // ⚠️ Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    chapterId: null,
    chapterTitle: ""
  });

  const userId = 1;

  // Helper function for Toast notifications
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    fetch(`/api/library/saved?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.savedChapters) setSavedChapters(data.savedChapters);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks:", err);
        setLoading(false);
      });
  }, []);

  // 1. Triggers the confirmation modal when the trash button is clicked
  const triggerUnsaveConfirmation = (e, chapterId, chapterTitle) => {
    e.stopPropagation(); // Stop routing to the reading screen
    setConfirmModal({
      show: true,
      chapterId,
      chapterTitle
    });
  };

  // 2. Executes the actual deletion once the user confirms inside the custom modal
  const handleConfirmUnsave = async () => {
    const targetId = confirmModal.chapterId;
    
    // Instantly close the modal view overlay
    setConfirmModal({ show: false, chapterId: null, chapterTitle: "" });

    try {
      const response = await fetch("/api/library/saved", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          chapterId: parseInt(targetId, 10),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSavedChapters((prev) => prev.filter((item) => item.chapter_id !== targetId));
        showToast("Chapter successfully removed from bookmarks.", "success");
      } else {
        showToast("Failed to remove bookmark: " + result.message, "error");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      showToast("Network sync failure. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
        <div className="text-center text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest animate-pulse">
          Loading Bookmarks...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5 px-5 pb-24 pt-4 min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 relative overflow-x-hidden">
      
      {/* 📥 1. THE FLOATING TOAST COMPONENT */}
      <div 
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-xs bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 transform ${
          toast.show 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 
            size={16} 
            className={`shrink-0 ${toast.type === "error" ? "text-red-500" : "text-emerald-500"}`} 
          />
          <p className="text-[11px] font-bold text-slate-800 dark:text-zinc-200 leading-snug truncate">
            {toast.message}
          </p>
        </div>
        <button 
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          className="p-1 text-slate-300 hover:text-slate-500 dark:text-zinc-600 dark:hover:text-zinc-400 rounded-lg transition-colors cursor-pointer"
        >
          <X size={12} strokeWidth={3} />
        </button>
      </div>

      {/* ⚠️ 2. THE PROFESSIONAL CUSTOM CONFIRMATION MODAL OVERLAY */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          {/* Dark Backdrop Shadow */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setConfirmModal({ show: false, chapterId: null, chapterTitle: "" })}
          />
          
          {/* Modal Content Frame Container */}
          <div className="relative bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 w-full max-w-xs p-5 rounded-3xl shadow-xl transform transition-all scale-100 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/30 border border-amber-100/40 dark:border-amber-900/30 rounded-full flex items-center justify-center mx-auto text-amber-500">
              <AlertTriangle size={18} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Remove Bookmark?</h3>
              <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-slate-800 dark:text-zinc-200">"{confirmModal.chapterTitle}"</span> from your profile?
              </p>
            </div>

            {/* Action buttons grid wrapper */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setConfirmModal({ show: false, chapterId: null, chapterTitle: "" })}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 border border-slate-200/40 dark:border-zinc-700/30 text-slate-700 dark:text-zinc-300 text-[11px] font-black rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUnsave}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Application Bar Nav */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <button 
          onClick={() => router.push("/library")} 
          className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full shadow-2xs text-slate-800 dark:text-zinc-200 cursor-pointer active:scale-95 transition-transform"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">
            Your Profile
          </span>
          <h1 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            Saved Chapters
          </h1>
        </div>
      </div>

      {/* Main Container List Stack */}
      <div className="space-y-3">
        {savedChapters.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 rounded-3xl p-8 text-center space-y-2">
            <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Inbox size={18} />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">No Bookmarks Found</p>
            <p className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">
              Chapters you bookmark while reading will show up here.
            </p>
          </div>
        ) : (
          savedChapters.map((item) => (
            <div
              key={item.chapter_id}
              onClick={() => router.push(`/library/${item.book_id}/${item.chapter_id}`)}
              className="w-full text-left bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 p-4 rounded-2xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-slate-200 dark:hover:border-zinc-800 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 bg-blue-50 dark:bg-amber-950/20 border border-blue-100/30 dark:border-amber-900/30 rounded-xl flex items-center justify-center shrink-0 text-[#0A1D87] dark:text-amber-400">
                  <Bookmark size={14} className="fill-current" />
                </div>
                
                <div className="min-w-0 space-y-0.5 flex-1">
                  <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-wide block truncate">
                    {item.book_title} — Chapter {item.chapter_number}
                  </span>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-900 dark:group-hover:text-amber-400 transition-colors">
                    {item.chapter_title}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={(e) => triggerUnsaveConfirmation(e, item.chapter_id, item.chapter_title)}
                  className="p-2 text-slate-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                  title="Remove Bookmark"
                >
                  <Trash2 size={14} />
                </button>
                <ChevronRight size={14} className="text-slate-300 dark:text-zinc-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}