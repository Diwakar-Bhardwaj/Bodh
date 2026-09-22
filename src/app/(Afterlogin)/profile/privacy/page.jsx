"use client";

import React from "react";
import { ChevronLeft, ShieldCheck, Eye, Clock } from "lucide-react";

export default function PrivacyPolicyPage() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const sections = [
    { title: "1. Information We Collect", content: ["We collect information you provide when creating an account, such as your name, email address, profile image, and authentication details.", "We also collect activity information needed to provide the service, including saved content, reading progress, streaks, subscription status, and device or browser details.", "When you use AI features, we process your questions and conversation context to generate responses and improve the experience."] },
    { title: "2. How We Use Information", content: ["Bodh uses information to create and secure your account, provide spiritual content, remember your progress, respond to support requests, and process subscriptions.", "We use only the information reasonably needed to operate, maintain, and improve the app."] },
    { title: "3. Sign-In and Verification", content: ["You may sign in with email and password or supported providers such as Google and Apple.", "If verification is required, Bodh may send a one-time password to confirm account ownership. We do not use OTPs for marketing."] },
    { title: "4. AI Features", content: ["Bodh uses Sarvam AI to provide spiritual guidance, verse explanations, and question-and-answer features.", "AI responses are for education and personal reflection only. They are not medical, legal, financial, or professional advice. Do not submit sensitive personal information in an AI conversation."] },
    { title: "5. Payments and Subscriptions", content: ["Paid plans, renewals, and refunds are processed through Razorpay. Bodh does not store your complete card number or banking credentials.", "Your plan, payment status, and transaction references may be retained to manage billing, support requests, and legal obligations."] },
    { title: "6. Data Sharing", content: ["We share information only with service providers that help us operate Bodh, such as authentication, hosting, payment, email, database, and AI providers.", "We do not sell your personal information. Providers receive only the information needed for their specific service and must handle it according to their own policies."] },
    { title: "7. Security", content: ["We use reasonable technical and organizational safeguards to protect your information. No internet service can guarantee absolute security, so please use a strong password and keep your account details private."] },
    { title: "8. Children", content: ["Bodh is intended for users aged 13 and above. Users under 13 may use the app only with verified parental or guardian supervision. If we learn that we collected information from a child without appropriate consent, we will take reasonable steps to delete it."] },
    { title: "9. Retention and Deletion", content: ["We retain information while your account is active or as needed to provide the service, resolve disputes, prevent abuse, process payments, and meet legal requirements.", "You may request account deletion from Profile settings or by contacting us. Some billing or security records may need to be retained for legal reasons."] },
    { title: "10. Your Choices", content: ["You can update profile details, manage saved content, change language and theme preferences, and request account deletion through the app.", "You may contact us to ask what personal information we hold or to request correction of inaccurate information."] },
    { title: "11. Third-Party Services", content: ["Google, Apple, Razorpay, Sarvam AI, hosting providers, and other integrated services operate under their own terms and privacy policies. Please review those policies when using their features."] },
    { title: "12. Policy Changes", content: ["We may update this Privacy Policy when the app, our services, or applicable requirements change. The latest version will be posted in the app with its update date."] }
  ];

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 dark:text-zinc-200 font-sans antialiased pb-24 transition-colors duration-200">
      
      {/* STICKY TOP APP BAR HEADER */}
      <div className="bg-[#F7F1F3]/90 dark:bg-black/90 backdrop-blur-md sticky top-0 z-50 pt-4 pb-3 px-4 flex items-center max-w-md mx-auto border-b border-slate-200/40 dark:border-zinc-900 transition-colors">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-slate-200/60 dark:hover:bg-zinc-800 rounded-full transition absolute left-2 text-slate-800 dark:text-zinc-100"
          aria-label="Navigate Back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-center w-full text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
      </div>

      {/* TEXT CONTENT CONTAINER */}
      <div className="max-w-md mx-auto px-5 mt-4 space-y-6">
        
        {/* TOP BRANDING CARD SUMMARY */}
        <div className="bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 rounded-[28px] p-5 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F0EDFF] dark:bg-zinc-800 text-[#60399A] dark:text-purple-400 rounded-2xl transition-colors">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#60399A] dark:text-purple-400 tracking-wide uppercase">Data Security</p>
              <h2 className="text-base font-black text-slate-950 dark:text-white leading-tight mt-0.5">Your Privacy Safeguard</h2>
            </div>
          </div>
          
          <div className="h-px bg-slate-100 dark:bg-zinc-800/80 w-full" />
          
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#23C45E]" /> Encrypted Database
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Updated June 19, 2026
            </span>
          </div>
        </div>

        {/* INTRODUCTION BLOCK */}
        <div className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed pl-1 space-y-2">
          <p>
            Welcome to <span className="font-bold text-slate-900 dark:text-zinc-200">Bodh</span>, a spiritual and AI-powered platform owned and operated by <span className="font-semibold text-slate-800 dark:text-zinc-300">Fixacity Private Limited</span>.
          </p>
          <p>
            Bodh provides spiritual content, AI-powered guidance, daily verses, personalized learning experiences, and subscription-based premium features.
          </p>
          <p>
            By using Bodh, you agree to this Privacy Policy and consent to the collection and use of information as described extensively below.
          </p>
        </div>

        {/* DYNAMIC PRIVACY SECTIONS */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-white border border-slate-100 dark:border-zinc-800/60 rounded-2xl p-5 shadow-sm space-y-2.5 transition-colors"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-black tracking-tight transition-colors">
                {section.title}
              </h3>
              <div className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed space-y-1.5">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          {/* FINAL SECTION 15: CONTACT FOOTER MODULE */}
          <div className="bg-white dark:from-[#60399A]/10 dark:to-transparent border border-[#60399A]/20 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-black tracking-tight">
              14. Contact Us
            </h3>
            <div className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed space-y-1 font-medium">
                  <p className="font-bold text-slate-400 dark:text-zinc-500">Bodh Privacy Desk</p>
              <p className="text-slate-400 dark:text-zinc-500">Owned by Fixacity Private Limited</p>
              <p className="pt-1">
                Email:{" "}
                <a 
                  href="mailto:support@bodh.app" 
                  className="text-black dark:text-black font-bold underline hover:text-[#4C2D7B] transition-colors"
                >
                  support@bodh.app
                </a>
              </p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal pt-2">
                We will make reasonable efforts to respond to your queries in a timely manner.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}