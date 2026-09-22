

"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Bookmark, Share2, Timer, BookOpen, Star, Component, Library } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ChapterReadingPage() {
  const { id, chapterId } = useParams();
  const router = useRouter();
  
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/library?chapterId=${chapterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.chapter) setChapterData(data.chapter);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [chapterId]);

  // 💾 फीचर 1: टॉप-राइट बुकमार्क बटन (Save Chapter)
  // const handleSaveChapter = () => {
  //   setIsSaved(!isSaved);
  //   alert(!isSaved ? "अध्याय सुरक्षित कर दिया गया है!" : "अध्याय सुरक्षित सूची से हटा दिया गया है।");
  // };

  // यह सुनिश्चित करने के लिए कि पेज लोड होते ही डेटाबेस से सही सेव्ड स्टेटस (Saved Status) मिले
useEffect(() => {
    if (!chapterId || !id) return;

    setLoading(true);

    // 1. Dispatch safe metrics containing the specific unique current chapterId
    const recordReadingProgress = async () => {
      try {
        await fetch("/api/library/update-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            bookId: parseInt(id, 10),
            chapterId: parseInt(chapterId, 10) // ✅ Now sending unique chapter id key context
          }),
        });
      } catch (err) {
        console.error("Failed executing background metric synchronization:", err);
      }
    };

    recordReadingProgress();

    // 2. मुख्य चैप्टर कंटेंट फ़ेच करें
    fetch(`/api/library?chapterId=${chapterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.chapter) setChapterData(data.chapter);
      })
      .catch((err) => console.error("Error fetching chapter:", err));

    // 3. चेक करें कि क्या यह चैप्टर इस यूज़र द्वारा पहले से सेव है
    fetch(`/api/library/saved?userId=1&chapterId=${chapterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isBookmarked) setIsSaved(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error checking bookmark status:", err);
        setLoading(false);
      });

  }, [id, chapterId]);
// 💾 मुख्य सेव/हटाने वाला फंक्शन जो डेटाबेस से कनेक्टेड है
const handleSaveChapter = async () => {
  if (!chapterData) return;

  const payload = {
    userId: 1, // वास्तविक प्रोडक्शन ऐप में इसे अपने Auth (जैसे NextAuth) से बदलें
    chapterId: parseInt(chapterId, 10),
  };

  // यदि पहले से सुरक्षित है, तो DELETE कॉल करें; अन्यथा POST (Save) कॉल करें
  const methodType = isSaved ? "DELETE" : "POST";

  try {
    const response = await fetch("/api/library/saved", {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      // डेटाबेस में सफल बदलाव के बाद ही फ्रंटएंड UI स्टेट बदलें
      setIsSaved(!isSaved);
      toast.success(!isSaved ? "Chapter saved successfully!" : "Chapter removed from bookmarks.");
    } else {
      alert("कुछ त्रुटि हुई: " + result.message);
    }
  } catch (error) {
    console.error("Database sync failed:", error);
    alert("सर्वर से कनेक्ट करने में असमर्थ।");
  }
};


  // 📢 फीचर 2: शेयर बटन (Native Mobile Share)
  const handleShareText = async () => {
    if (!chapterData) return;
    const shareData = {
      title: chapterData.title,
      text: `📖 ${chapterData.title}\n\n${chapterData.content}\n\nपढ़ें और साझा करें 🙏`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert("टेक्स्ट को क्लिपबोर्ड पर कॉपी कर दिया गया है!");
      }
    } catch (err) {
      console.log("Sharing failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
        <div className="text-center text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest animate-pulse">
          Opening Text...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5 px-5 pb-24 pt-6 min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. शीर्ष हेडर (Top Header with Save Button) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push(`/library/${id}`)} 
            className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full shadow-2xs text-slate-800 dark:text-zinc-200 cursor-pointer active:scale-95 transition-transform"
          >
            <ChevronLeft size={16} />
          </button>
          <div>
            <span className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">
              Chapter {chapterData?.chapter_number || "0"}
            </span>
            <h1 className="text-l font-black tracking-tight text-slate-900 dark:text-white max-w-[200px] truncate">
              {chapterData?.title}
            </h1>
          </div>
        </div>
        
        {/* ऊपरी दाएं कोने का सेव बटन */}
        <Link href="/library/saved">
        <button 
          className={`p-2 border rounded-full shadow-2xs active:scale-95 transition-all cursor-pointer`}
        >
          <Bookmark size={15} />
        </button>
        </Link>
      </div>

        {/* save and share button */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* बॉटम सेव बटन */}
        <button 
          onClick={handleSaveChapter}
          className={`border rounded-2xl py-3 flex items-center justify-center gap-2 text-xs font-black shadow-2xs cursor-pointer transition-all ${
            isSaved
              ? "bg-blue-50 border-blue-200 text-blue-900 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-400"
              : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 active:bg-slate-50"
          }`}
        >
          <Bookmark size={14} className={isSaved ? "fill-current text-blue-900 dark:text-amber-400" : "text-slate-400 dark:text-zinc-500"} /> 
          {isSaved ? "Saved" : "Save"}
        </button>

        {/* शेयर बटन */}
        <button 
          onClick={handleShareText}
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3 flex items-center justify-center gap-2 text-xs font-black text-slate-700 dark:text-zinc-300 shadow-2xs active:bg-slate-50 dark:active:bg-zinc-800 cursor-pointer transition-colors"
        >
          <Share2 size={14} className="text-slate-400 dark:text-zinc-500" /> Share Text
        </button>
      </div>

      {/* 2. मुख्य रीडिंग सरफेस शीट */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 p-5 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
        
        {/* कार्ड सब-हेडर */}
        <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-800/40 pb-3">
          <span className="text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1.5">
            <BookOpen size={14} className="text-[#0A1D87] dark:text-amber-500" /> 
            पवित्र पाठ / Scriptural Content
          </span>
          <span className="bg-purple-50 border border-purple-100/30 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900/40 dark:text-purple-400 font-bold text-[9px] px-2 py-0.5 rounded-md flex items-center gap-0.5">
            <Timer size={10} /> Continuous Read
          </span>
        </div>
        
        {/* 3. कोर पाठ्य सामग्री (✅ फिक्सड text-xl और हमेशा text-center) */}
        <div className="space-y-4">
          <p className="text-xl font-bold text-slate-800 dark:text-zinc-200 text-center leading-[1.8] whitespace-pre-wrap tracking-wide antialiased">
            {chapterData?.content || "No structural text content compiled inside this node."}
          </p>
        </div>

      </div>

      {/* 5. निवेदन फ़ुटर */}
      <div className="bg-[#0A1D87] text-white dark:bg-amber-950/20 dark:border dark:border-amber-900/40 p-5 rounded-3xl space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <h3 className="text-xs font-black uppercase tracking-wider">निवेदन (Disclaimer)</h3>
        </div>
        <p className="text-[11px] text-blue-100 dark:text-zinc-400 font-medium leading-relaxed text-justify">
          यह प्रस्तुति श्रद्धा, भक्ति और अध्ययन के उद्देश्य से सरल भाषा में तैयार की गई है। यदि इसमें कोई अनजानी भूल या त्रुटि रह गई हो, तो कृपया क्षमा करें।
        </p>
        <div className="text-center pt-2 border-t border-blue-800/60 dark:border-zinc-800 text-[11px] font-black text-amber-300 tracking-wide">
          ॥ श्री सीतारामचन्द्रार्पणमस्तु ॥
        </div>
      </div>

    </div>
  );
}