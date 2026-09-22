"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormActionButtons from "@/components/FormActionButtons";

export default function ChangePasswordPage() {
  const router = useRouter();
  
  // States for hiding/showing password text
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); // Controlled cleanly below

  // Form field inputs state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // 1. Validation Rules
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      alert("Password must include at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      alert("Password must include at least one lowercase letter!");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      alert("Password must include at least one number!");
      return;
    }
    if (!/[@$!%*#?&]/.test(newPassword)) {
      alert("Password must include at least one special character (@, $, !, etc.)!");
      return;
    }

    try {
      // 🛠️ FIX: TURN ON LOADING SPINNER STATE IMMEDIATELY WHEN SUBMITTING
      setLoading(true);

      const res = await fetch("/api/profile/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update password");
        return;
      }

      toast.success("Password updated successfully!");

      // Clear form inputs
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      router.push("/profile");
    } catch (error) {
      console.log("Error in password change page : ", error);
      toast.error("Server Error");
    } finally {
      // 🛠️ FIX: ALWAYS TURN OFF SPINNER STATE REGARDLESS OF API OUTCOME
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black dark:text-white text-slate-800 font-sans pb-26">
      
      {/* Sticky App Header */}
      <div className="bg-[#F7F1F3] dark:bg-black pt-3 px-4 flex items-center max-w-md mx-auto relative">
        <button 
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-slate-200/60 rounded-full transition absolute left-2"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-center w-full dark:text-white text-slate-900 tracking-tight">
          Change Password
        </h1>
      </div>

      <div className="max-w-md mx-auto px-5 mt-4">
        
        {/* Decorative Secure Shield Graphic banner */}
<div className="flex flex-col items-center text-center my-6">
  <div className="w-36 h-36 bg-[#F1EFFC] dark:bg-black rounded-full flex items-center justify-center relative mb-4 shadow-inner border border-transparent dark:border-white transition-colors">
      {/* Image Container Block */}
      <div className=" w-full h-full flex items-center justify-center">
        <img 
          src="/lock.png" // Loads from public/lock.png
          alt="Secure Lock"
          className="w-full h-full object-contain scale-130"
          onError={(e) => {
            // Fallback to prevent layout breaking if the asset is missing
            e.target.style.display = 'none';
          }}
        />
    </div>
  </div>
  
  <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
    Keep your account secure
  </h2>
  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[260px] transition-colors">
    Choose a strong password and keep it private
  </p>
</div>

        {/* Input Fields Form Wrapper */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Current Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold dark:text-white text-slate-700 tracking-wide block">
              Current Password
            </label>
            <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm focus-within:border-[#7B61FF] transition">
              <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
                className="w-full bg-transparent py-4 px-3 dark:text-black text-sm focus:outline-none placeholder-slate-400 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="p-3 text-slate-400 hover:text-slate-600 transition absolute right-2"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold dark:text-white text-slate-700 tracking-wide block">
              New Password
            </label>
            <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm focus-within:border-[#7B61FF] transition">
              <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                className="w-full bg-transparent py-4 px-3 text-sm dark:text-black focus:outline-none placeholder-slate-400 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="p-3 text-slate-400 hover:text-slate-600 transition absolute right-2"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Visual Password Strength Indicator */}
            <div className="pt-1 flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-400">
                Password strength : <span className="text-red-500 font-semibold">Weak</span>
              </span>
              <div className="flex-1 flex gap-1 h-[6px]">
                <div className="flex-1 bg-red-500 rounded-full" />
                <div className="flex-1 bg-slate-200 rounded-full" />
                <div className="flex-1 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold dark:text-white text-slate-700 tracking-wide block">
              Confirm New Password
            </label>
            <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm focus-within:border-[#7B61FF] transition">
              <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className="w-full bg-transparent py-4 px-3 text-sm dark:text-black focus:outline-none placeholder-slate-400 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="p-3 text-slate-400 hover:text-slate-600 transition absolute right-2"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Security Banner Message */}
          <div className="bg-[#F0EDFF]/60  dark:bg-black rounded-3xl p-5 flex items-start gap-4 border border-[#F0EDFF]">
            <div className="p-2  text-[#7B61FF] rounded-full shadow-sm mt-0.5">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white tracking-tight">Password tips</h4>
              <ul className="mt-2 space-y-1 text-slate-500 text-xs font-medium list-disc list-inside">
                <li>Use at least 8 characters</li>
                <li>Include both uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Avoid using personal information</li>
              </ul>
            </div>
          </div>

          {/* Form Reusable Button Core Module */}
          <FormActionButtons 
            submitText="Update Password" 
            loading={loading} 
            onCancel={handleBack} 
          />

        </form>
      </div>
    </div>
  );
}