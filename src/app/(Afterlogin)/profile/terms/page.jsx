"use client";
import React from "react";
import { ChevronLeft, Scale, ShieldCheck, Clock } from "lucide-react";

export default function TermsAndConditionsPage() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const sections = [
    { title: "1. Acceptance of Terms", content: ["By creating an account or using Bodh, you agree to these Terms and Conditions and our Privacy Policy.", "If you do not agree with these terms, please do not use the app."] },
    { title: "2. Eligibility", content: ["Bodh is intended for users aged 13 and above. Users under 13 may use the app only with appropriate parental or guardian supervision."] },
    { title: "3. Your Account", content: ["You are responsible for providing accurate information and keeping your password and verification details private.", "You must tell us promptly if you believe your account has been accessed without permission."] },
    { title: "4. AI and Spiritual Guidance", content: ["Bodh provides AI-assisted spiritual guidance, verse explanations, and reflective content through Sarvam AI.", "Responses may be incomplete or inaccurate and are provided for education and personal reflection only. They are not medical, legal, financial, or professional advice."] },
    { title: "5. Content and Acceptable Use", content: ["You may use Bodh content for personal, non-commercial learning and reflection.", "You must not misuse the service, attempt unauthorized access, create abusive or fraudulent accounts, copy protected content for commercial use, or use AI features for illegal or harmful activity."] },
    { title: "6. Subscriptions", content: ["Bodh may offer free and paid subscription plans. Features, limits, and prices may change, and important changes will be communicated when reasonably possible.", "Subscriptions may renew according to the selected plan. You can cancel future renewal through the available account or payment settings."] },
    { title: "7. Payments and Refunds", content: ["Payments are processed by Razorpay under its payment terms and security practices.", "Refund requests should be submitted within 7 days of purchase. Requests may be reviewed for eligibility and may be declined in cases of abuse, fraud, or repeated misuse."] },
    { title: "8. Intellectual Property", content: ["Bodh branding, software, interface design, original summaries, and curated content are owned by Fixacity Private Limited or its licensors.", "You may not copy, sell, publish, modify, or redistribute protected Bodh material without written permission."] },
    { title: "9. Third-Party Services", content: ["Bodh may rely on third-party services for authentication, payments, hosting, email, and AI responses. Those services are governed by their own terms and privacy policies."] },
    { title: "10. Suspension and Termination", content: ["We may limit, suspend, or close an account if it violates these terms, threatens service security, involves fraud, or causes harm to other users.", "You may stop using the service and request account deletion at any time."] },
    { title: "11. Disclaimers and Liability", content: ["Bodh is provided on an as-available basis. We do not guarantee uninterrupted service, error-free content, or that AI responses will meet every need.", "To the extent allowed by law, Bodh and Fixacity Private Limited are not responsible for indirect losses arising from use of the service."] },
    { title: "12. Changes and Governing Law", content: ["We may update these terms as the service changes. The latest version will be posted in the app.", "These terms are governed by the laws of India, subject to the rights available under applicable law."] }
  ];

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black text-slate-800 dark:text-zinc-200 font-sans antialiased pb-16 transition-colors duration-200">
      
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
          Terms & Conditions
        </h1>
      </div>

      {/* CORE FRAMEWORK TEXT CONTENT WRAPPER CONTAINER */}
      <div className="max-w-md mx-auto px-5 mt-4 space-y-6">
        
        {/* TOP COMPACT BRANDING CARD SUMMARY */}
        <div className="bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 rounded-[28px] p-5 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F0EDFF] dark:bg-zinc-800 text-[#60399A] dark:text-purple-400 rounded-2xl transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#60399A] dark:text-purple-400 tracking-wide uppercase">Legal Framework</p>
              <h2 className="text-base font-black text-slate-950 dark:text-white leading-tight mt-0.5">Bodh User Agreement</h2>
            </div>
          </div>
          
          <div className="h-px bg-slate-100 dark:bg-zinc-800/80 w-full" />
          
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#23C45E]" /> Verified by Fixacity
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
            By accessing or using Bodh, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please do not use the application infrastructure.
          </p>
        </div>

        {/* DYNAMIC TERM SECTION MATRIX GENERATOR */}
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

          {/* FINAL STATIC SECTION 17: CONTACT FOOTER MODULE */}
           <div className="bg-white dark:from-[#60399A]/10 dark:to-transparent border border-[#60399A]/20 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-black tracking-tight">
              17. Contact Us
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