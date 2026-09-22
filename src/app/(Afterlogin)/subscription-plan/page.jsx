// "use client";

// import React from "react";
// import { ChevronLeft, CheckCircle2, ShieldCheck, Lock, RefreshCw, Headphones, X } from "lucide-react";
// import Image from "next/image";

// export default function SubscriptionPage() {
//   const handleBack = () => {
//     if (typeof window !== "undefined") {
//       window.history.back();
//     }
//   };

//   const handleSelectPlan = (planName) => {
//     alert(`Redirecting to payment portal for: ${planName}`);
//   };

//   return (
//     <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 dark:text-zinc-200 font-sans antialiased pb-23 transition-colors duration-200">

//       {/* HEADER SECTION */}
//       <div className="max-w-md mx-auto pt-12 pb-4 px-7 relative flex items-center">
//         <button
//           type="button"
//           onClick={handleBack}
//           className="hover:bg-slate-200/60 dark:hover:bg-white rounded-full transition text-slate-900 dark:text-zinc-200 z-10"
//         >
//           <ChevronLeft className="w-7 h-7" strokeWidth={3} />
//         </button>

//         <div className="text-center space-y-2 max-w-[310px] mx-auto">
//           <h1 className="text-2xl font-black text-slate-900  dark:text-zinc-200 tracking-tight leading-tight">
//             Choose Your Believa Plan
//           </h1>
//         </div>

//       </div>

//       <div className="max-w-md mx-auto px-3 space-y-6">


//         <p className="text-sm px-20 text-center text-[#737373] dark:text-zinc-500 leading-relaxed">
//           Unlock the power of scriptures, AI wisdom and daily spiritual growth
//         </p>

//         {/* TOGGLE BAR */}
//         <div className="flex items-center justify-center gap-3">
//           <div className="bg-black dark:bg-zinc-900 text-white px-8 py-2.5 rounded-full text-xs font-bold shadow-md tracking-wide">
//             Monthly
//           </div>
//           <div className="bg-[#EBE4E7] dark:bg-zinc-800/60 text-[#27A753] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1">
//             <span className="w-1.5 h-1.5 bg-[#27A753] rounded-full animate-pulse" />
//             Save up to 20%
//           </div>
//         </div>

//         {/* PLANS CONTAINER */}
//         <div className="flex flex-col items-center gap-5">

//           {/* PLAN 1: FREE SECTION (Custom Dimensional Spec Layout) */}
//           <div
//             style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
//             className="w-[366px] min-h-[209px] bg-white rounded-2xl border border-slate-100/70 dark:border-zinc-900 p-4 flex items-center justify-between transition-all opacity-100 rotate-0"
//           >
//             <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-slate-100 dark:border-zinc-900 pr-3 min-h-[175px]">
//               <div>
//                 <h3 className="text-base font-black text-slate-950 dark:text-black tracking-tight">FREE</h3>
//                 <p className="text-[9px] text-slate-400 dark:text-black font-bold tracking-wide mt-0.5">Start your journey</p>
//                 <div className="mt-1 text-center">
//                   <span className="text-2xl font-black text-slate-950 dark:text-black">₹0</span>
//                   <span className="text-[10px] font-bold text-slate-400 dark:text-black block -mt-1">/ month</span>
//                 </div>
//               </div>
//               <img src="/subs-free.png" alt="Free Lotus" className="w-30 h-20 object-cover opacity-70" />
//               <button
//                 onClick={() => handleSelectPlan("Free")}
//                 className="w-full border border-[#60399A] text-[#60399A] dark:border-purple-400 dark:text-purple-400 font-bold text-[10px] py-1.5 rounded-xl hover:bg-[#60399A]/5 transition-colors"
//               >
//                 Get Started
//               </button>
//             </div>

//             <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-black">
//               <div className="flex items-center gap-2">⚙️ <span>1-2 AI explains / day</span></div>
//               <div className="flex items-center gap-2">💬 <span>Limited AI chat</span></div>
//               <div className="flex items-center gap-2">🔊 <span>Basic audio</span></div>
//               <div className="flex items-center gap-2">📿 <span>Naam Jap counter</span></div>
//               <div className="flex items-center gap-2">🔥 <span>Daily streak</span></div>
//               <div className="flex items-center gap-2">💡 <span>1 Quiz / day</span></div>
//               <div className="flex items-center gap-2">🏆 <span>Basic leaderboard</span></div>
//             </div>
//           </div>

//           {/* PLAN 2: BELIEVA PRO */}
//           <div
//             style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
//             className="w-[366px] bg-gradient-to-br from-[#F5F2FE] to-[#FAF8FF] dark:bg-none dark:bg-[#553788]/31 rounded-2xl p-4 flex items-center justify-between relative transition-all pt-6"
//           >
//             <div className="absolute -top-3 left-6 bg-[#7B61FF] text-white text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
//               ⭐ Most Popular
//             </div>

//             <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-white pr-3 min-h-[225px]">
//               <div>
//                 <h3 className="text-base font-black text-[#60399A] dark:text-[#553788] tracking-tight">Believa Pro</h3>
//                 <p className="text-[9px] text-slate-400 font-bold dark:text-white tracking-wide mt-0.5">For daily learners</p>
//                 <div className="mt-1 text-center">
//                   <span className="text-2xl font-black text-slate-950 dark:text-[#553788]">₹199</span>
//                   <span className="text-[10px] font-bold text-slate-400 dark:text-[#553788] block -mt-1">/ month</span>
//                 </div>
//               </div>
//               <img src="/subs-free.png" alt="Pro Lotus" className="w-30 h-20 object-cover" />
//               <button
//                 onClick={() => handleSelectPlan("Believa Pro")}
//                 className="w-full bg-[#60399A] hover:bg-[#4C2D7B] text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm"
//               >
//                 Choose Pro
//               </button>
//             </div>

//             <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
//               {["Unlimited AI explains", "Short & deep explains", "Full audio access", "Personalized AI guide", "Unlimited Q&A", "PDF summary /notes", "Advanced progress tracking", "Advanced streak rewards", "All quizzes unlimited", "Better leaderboard"].map((f, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <CheckCircle2 size={13} className="text-[#60399A] dark:text-purple-400 shrink-0" fill="currentColor" stroke="white" />
//                   <span className="leading-tight">{f}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* PLAN 3: BELIEVA FAMILY */}
//           <div
//             style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
//             className="w-[366px] min-h-[209px] bg-gradient-to-br from-[#FFF8F2] to-[#FFFCFA] dark:bg-none dark:bg-[#E18400]/30 border-orange-200 dark:border-amber-900 rounded-2xl p-4 flex items-center justify-between transition-all"
//           >
//             <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-orange-100 dark:border-white pr-3 min-h-[175px]">
//               <div>
//                 <h3 className="text-base font-black text-[#D97706] dark:text-amber-600 tracking-tight">Believa Pro</h3>
//                 <p className="text-[9px] text-slate-400 font-bold tracking-wide  dark:text-white mt-0.5">For the whole family</p>
//                 <div className="mt-1 text-center">
//                   <span className="text-2xl font-black text-slate-950 dark:text-amber-600">₹499</span>
//                   <span className="text-[10px] font-bold text-slate-400 dark:text-amber-600 block -mt-1">/ month</span>
//                 </div>
//               </div>
//               <img src="/subs-plan2.png" alt="Pro Lotus" className="w-30 h-20 object-cover" />
//               <button
//                 onClick={() => handleSelectPlan("Believa Family")}
//                 className="w-full bg-[#D97706] hover:bg-amber-700 text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm"
//               >
//                 Choose Family
//               </button>
//             </div>

//             <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
//               {["Everything in pro", "4-5 family members", "Kids mode", "Family leaderboard", "Shared learning challenges", "Multi-device support", "Parental controls"].map((f, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <CheckCircle2 size={13} className="text-[#D97706] dark:text-amber-500 shrink-0" fill="currentColor" stroke="white" />
//                   <span className="leading-tight">{f}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* PLAN 4: BELIEVA PLUS */}
//           <div
//             style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
//             className="w-[366px] min-h-[209px] bg-gradient-to-br from-[#F4FBF7] to-[#FAFEFC] dark:bg-none dark:bg-[#34A853]/31  border border-emerald-200 dark:border-emerald-900 rounded-2xl p-4 flex items-center justify-between transition-all"
//           >
//             <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-emerald-100 dark:border-white pr-3 min-h-[175px]">
//               <div>
//                 <h3 className="text-base font-black text-[#27A753] dark:text-emerald-400 tracking-tight">Believa Plus</h3>
//                 <p className="text-[9px] text-slate-400 font-bold tracking-wide mt-0.5 dark:text-white">For deep seekers</p>
//                 <div className="mt-1 text-center">
//                   <span className="text-2xl font-black text-slate-950 dark:text-emerald-400">₹799</span>
//                   <span className="text-[10px] font-bold text-slate-400 block dark:text-emerald-400 -mt-1">/ month</span>
//                 </div>
//               </div>
//               <img src="/subs-plan3.png" alt="Pro Lotus" className="w-30 h-20 object-cover" />
//               <button
//                 onClick={() => handleSelectPlan("Believa Plus")}
//                 className="w-full bg-[#27A753] hover:bg-emerald-700 text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm"
//               >
//                 Choose Plus
//               </button>
//             </div>

//             <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
//               {["Everything in pro", "Advanced AI guide", "Exclusive Deep Explanations", "Priority New Features", "Premium Audio Experience", "Spiritual Journals", "Early Access Content"].map((f, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <CheckCircle2 size={13} className="text-[#27A753] dark:text-emerald-400 shrink-0" fill="currentColor" stroke="white" />
//                   <span className="leading-tight">{f}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* GLOBAL EMBEDDED INCLUSIONS MATRIX PANEL */}
//         <div className="w-[366px] mx-auto bg-white dark:bg-white dark:text-black border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm text-center">
//           <div className=" font-extrabold flex items-center justify-center gap-2 text-[11px] font-black text-slate-950 dark:text-black mb-4 uppercase tracking-wide">
//             <div className="h-[1px] bg-slate-200/80  dark:bg-zinc-800 w-10" />
//             All Plans Include
//             <div className="h-[1px] bg-slate-200/80 dark:bg-zinc-800 w-10" />
//           </div>

//           <div className="grid grid-cols-5 gap-1 text-[9px] font-black text-slate-800 ddark:text-black leading-tight">
//             <div className="flex flex-col items-center gap-2">
//               <ShieldCheck size={22} className="text-slate-800 dark:text-black" />
//               <span>Ad-free Experience</span>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <Lock size={22} className="text-slate-800 dark:text-black" />
//               <span>Secure & Private Your Data</span>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <RefreshCw size={22} className="text-slate-800 dark:text-black" />
//               <span>Sync Across Devices</span>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <Headphones size={22} className="text-slate-800 dark:text-black" />
//               <span>24 x 7</span>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <X size={22} className="text-slate-800 ddark:text-black" />
//               <span>Cancel Anytime No Hidden Fees</span>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM METRIC DISCLAIMER NOTATION */}
//         <p className="text-center text-[9px] font-bold text-slate-400 dark:text-zinc-400">
//           🔒 Your subscription is protected. Cancel anytime from your account settings
//         </p>

//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { ChevronLeft, CheckCircle2, ShieldCheck, Lock, RefreshCw, Headphones, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function SubscriptionPage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [fakeCheckoutPlan, setFakeCheckoutPlan] = useState(null);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleSelectPlan = (planName) => {
    if (planName === "Free") {
      toast.success("Free Tier Activated!");
      return;
    }

    setLoadingPlan(planName);
    setFakeCheckoutPlan(planName);
  };

  const handleFakePayment = () => {
    toast.success(`${fakeCheckoutPlan} activated for demo purposes.`);
    setFakeCheckoutPlan(null);
    setLoadingPlan(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 dark:text-zinc-200 font-sans antialiased pb-10 transition-colors duration-200">

      {/* HEADER SECTION */}
      <div className="mx-auto flex max-w-7xl items-center px-5 pb-6 pt-8 md:px-10 md:pb-8 md:pt-12 lg:px-14">
        <button
          type="button"
          onClick={handleBack}
          className="hover:bg-slate-200/60 dark:hover:bg-white rounded-full transition text-slate-900 dark:text-zinc-200 z-10 cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={3} />
        </button>

        <div className="mx-auto space-y-2 text-center">
          <h1 className="text-2xl font-black text-slate-900 dark:text-zinc-200 tracking-tight leading-tight md:text-4xl">
            Choose Your Bodh Plan
          </h1>
          <p className="hidden text-sm text-slate-500 dark:text-zinc-400 md:block">Simple plans for a deeper daily practice.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-10 lg:px-14">
        <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-[#737373] dark:text-zinc-500 md:text-base">
          Unlock the power of scriptures, AI wisdom and daily spiritual growth
        </p>

        {/* TOGGLE BAR */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-black dark:bg-zinc-900 text-white px-8 py-2.5 rounded-full text-xs font-bold shadow-md tracking-wide">
            Monthly
          </div>
          <div className="bg-[#EBE4E7] dark:bg-zinc-800/60 text-[#27A753] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#27A753] rounded-full animate-pulse" />
            Save up to 20%
          </div>
        </div>

        {/* PLANS CONTAINER */}
        <div className="grid items-stretch gap-5 lg:grid-cols-2 2xl:grid-cols-4">

          {/* PLAN 1: FREE SECTION */}
          <div
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="flex min-h-[209px] w-full items-center justify-between rounded-2xl border border-slate-100/70 bg-white p-4 transition-all opacity-100 rotate-0 dark:border-zinc-900"
          >
            <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-slate-100 dark:border-zinc-900 pr-3 min-h-[175px]">
              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-black tracking-tight">FREE</h3>
                <p className="text-[9px] text-slate-400 dark:text-black font-bold tracking-wide mt-0.5">Start your journey</p>
                <div className="mt-1 text-center">
                  <span className="text-2xl font-black text-slate-950 dark:text-black">₹0</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-black block -mt-1">/ month</span>
                </div>
              </div>
              <Image src="/subs-free.png" alt="Free Lotus" width={120} height={80} className="h-20 w-30 object-cover opacity-70" />
              <button
                type="button"
                onClick={() => handleSelectPlan("Free")}
                className="w-full border border-[#60399A] text-[#60399A] dark:border-purple-400 dark:text-purple-400 font-bold text-[10px] py-1.5 rounded-xl hover:bg-[#60399A]/5 transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>

            <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-black">
              <div className="flex items-center gap-2">⚙️ <span>1-2 AI explains / day</span></div>
              <div className="flex items-center gap-2">💬 <span>Limited AI chat</span></div>
              <div className="flex items-center gap-2">🔊 <span>Basic audio</span></div>
              <div className="flex items-center gap-2">📿 <span>Naam Jap counter</span></div>
              <div className="flex items-center gap-2">🔥 <span>Daily streak</span></div>
              <div className="flex items-center gap-2">💡 <span>1 Quiz / day</span></div>
              <div className="flex items-center gap-2">🏆 <span>Basic leaderboard</span></div>
            </div>
          </div>

          {/* PLAN 2: BELIEVA PRO */}
          <div
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="relative flex min-h-[235px] w-full items-center justify-between rounded-2xl bg-gradient-to-br from-[#F5F2FE] to-[#FAF8FF] p-4 pt-6 transition-all dark:bg-[#553788]/31 dark:bg-none"
          >
            <div className="absolute -top-3 left-6 bg-[#7B61FF] text-white text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              ⭐ Most Popular
            </div>

            <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-white pr-3 min-h-[225px]">
              <div>
                <h3 className="text-base font-black text-[#60399A] dark:text-[#553788] tracking-tight">Bodh Pro</h3>
                <p className="text-[9px] text-slate-400 font-bold dark:text-white tracking-wide mt-0.5">For daily learners</p>
                <div className="mt-1 text-center">
                  <span className="text-2xl font-black text-slate-950 dark:text-[#553788]">₹199</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-[#553788] block -mt-1">/ month</span>
                </div>
              </div>
              <Image src="/subs-free.png" alt="Pro Lotus" width={120} height={80} className="h-20 w-30 object-cover" />
              <button
                type="button"
                disabled={loadingPlan !== null}
                onClick={() => handleSelectPlan("Believa Pro")}
                className="w-full bg-[#60399A] hover:bg-[#4C2D7B] text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loadingPlan === "Believa Pro" ? "Processing..." : "Choose Pro"}
              </button>
            </div>

            <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
              {["Unlimited AI explains", "Short & deep explains", "Full audio access", "Personalized AI guide", "Unlimited Q&A", "PDF summary /notes", "Advanced progress tracking", "Advanced streak rewards", "All quizzes unlimited", "Better leaderboard"].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#60399A] dark:text-purple-400 shrink-0" fill="currentColor" stroke="white" />
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN 3: BELIEVA FAMILY */}
          <div
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="flex min-h-[209px] w-full items-center justify-between rounded-2xl border border-orange-200 bg-gradient-to-br from-[#FFF8F2] to-[#FFFCFA] p-4 transition-all dark:border-amber-900 dark:bg-[#E18400]/30 dark:bg-none"
          >
            <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-orange-100 dark:border-white pr-3 min-h-[175px]">
              <div>
                <h3 className="text-base font-black text-[#D97706] dark:text-amber-600 tracking-tight">Bodh Family</h3>
                <p className="text-[9px] text-slate-400 font-bold tracking-wide  dark:text-white mt-0.5">For the whole family</p>
                <div className="mt-1 text-center">
                  <span className="text-2xl font-black text-slate-950 dark:text-amber-600">₹499</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-amber-600 block -mt-1">/ month</span>
                </div>
              </div>
              <Image src="/subs-plan2.png" alt="Family Lotus" width={120} height={80} className="h-20 w-30 object-cover" />
              <button
                type="button"
                disabled={loadingPlan !== null}
                onClick={() => handleSelectPlan("Believa Family")}
                className="w-full bg-[#D97706] hover:bg-amber-700 text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loadingPlan === "Believa Family" ? "Processing..." : "Choose Family"}
              </button>
            </div>

            <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
              {["Everything in pro", "4-5 family members", "Kids mode", "Family leaderboard", "Shared learning challenges", "Multi-device support", "Parental controls"].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#D97706] dark:text-amber-500 shrink-0" fill="currentColor" stroke="white" />
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN 4: BELIEVA PLUS */}
          <div
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="flex min-h-[209px] w-full items-center justify-between rounded-2xl border border-emerald-200 bg-gradient-to-br from-[#F4FBF7] to-[#FAFEFC] p-4 transition-all dark:border-emerald-900 dark:bg-[#34A853]/31 dark:bg-none"
          >
            <div className="flex flex-col items-center text-center justify-between w-2/5 border-r border-emerald-100 dark:border-white pr-3 min-h-[175px]">
              <div>
                <h3 className="text-base font-black text-[#27A753] dark:text-emerald-400 tracking-tight">Bodh Plus</h3>
                <p className="text-[9px] text-slate-400 font-bold tracking-wide mt-0.5 dark:text-white">For deep seekers</p>
                <div className="mt-1 text-center">
                  <span className="text-2xl font-black text-slate-950 dark:text-emerald-400">₹799</span>
                  <span className="text-[10px] font-bold text-slate-400 block dark:text-emerald-400 -mt-1">/ month</span>
                </div>
              </div>
              <Image src="/subs-plan3.png" alt="Plus Lotus" width={120} height={80} className="h-20 w-30 object-cover" />
              <button
                type="button"
                disabled={loadingPlan !== null}
                onClick={() => handleSelectPlan("Believa Plus")}
                className="w-full bg-[#27A753] hover:bg-emerald-700 text-white font-bold text-[10px] py-1.5 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loadingPlan === "Believa Plus" ? "Processing..." : "Choose Plus"}
              </button>
            </div>

            <div className="w-3/5 pl-4 space-y-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
              {["Everything in pro", "Advanced AI guide", "Exclusive Deep Explanations", "Priority New Features", "Premium Audio Experience", "Spiritual Journals", "Early Access Content"].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#27A753] dark:text-emerald-400 shrink-0" fill="currentColor" stroke="white" />
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* GLOBAL EMBEDDED INCLUSIONS MATRIX PANEL */}
        <div className="mx-auto w-full rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm dark:border-zinc-800 dark:bg-white dark:text-black md:p-7">
          <div className="font-extrabold flex items-center justify-center gap-2 text-[11px] font-black text-slate-950 dark:text-black mb-4 uppercase tracking-wide">
            <div className="h-[1px] bg-slate-200/80  dark:bg-zinc-800 w-10" />
            All Plans Include
            <div className="h-[1px] bg-slate-200/80 dark:bg-zinc-800 w-10" />
          </div>

          <div className="grid grid-cols-2 gap-5 text-[10px] font-black leading-tight text-slate-800 dark:text-black md:grid-cols-5 md:gap-4">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={22} className="text-slate-800 dark:text-black" />
              <span>Ad-free Experience</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock size={22} className="text-slate-800 dark:text-black" />
              <span>Secure & Private Your Data</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={22} className="text-slate-800 dark:text-black" />
              <span>Sync Across Devices</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Headphones size={22} className="text-slate-800 dark:text-black" />
              <span>24 x 7</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <X size={22} className="text-slate-800 dark:text-black" />
              <span>Cancel Anytime No Hidden Fees</span>
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC DISCLAIMER NOTATION */}
        <p className="text-center text-[9px] font-bold text-slate-400 dark:text-zinc-400">
          🔒 Your subscription is protected. Cancel anytime from your account settings
        </p>

      </div>

      {fakeCheckoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-zinc-900 dark:text-white">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#60399A]">Demo checkout</p>
                <h2 className="mt-1 text-xl font-black">Complete your {fakeCheckoutPlan} plan</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFakeCheckoutPlan(null);
                  setLoadingPlan(null);
                }}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800"
                aria-label="Close demo checkout"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-xl border border-dashed border-[#60399A]/40 bg-[#60399A]/5 p-4 text-sm text-slate-600 dark:text-zinc-300">
              This is a fake payment screen. No Razorpay window will open and no payment will be charged.
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFakeCheckoutPlan(null);
                  setLoadingPlan(null);
                }}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold dark:border-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFakePayment}
                className="flex-1 rounded-xl bg-[#60399A] px-4 py-3 text-sm font-bold text-white hover:bg-[#4C2D7B]"
              >
                Simulate payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}