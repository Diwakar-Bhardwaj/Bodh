"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // 🔥 FIX: We pass email and password directly into the credentials block
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password,
      });

      if (res?.error) {
        // If NextAuth returns a standard error string (like "CredentialsSignin")
        throw new Error("Invalid admin email or password verification.");
      }

      toast.success("Identity verified! Loading admin core...");
      router.push("/admin/subscriptions"); 
      router.refresh();

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Authentication process failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black flex flex-col justify-center p-4 max-w-md mx-auto transition-colors duration-200">
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800/80 rounded-3xl p-6 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/30 text-[#60399A] dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto border border-purple-100/50 dark:border-zinc-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">Administrative Access</h1>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Clearance Node Terminal
            </p>
          </div>
        </div>

        <form onSubmit={handleAdminSignIn} className="space-y-4">
          
          {/* EMAIL INPUT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider block">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email" // 👈 CRITICAL: NextAuth relies on this mapping key
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl font-bold focus:outline-hidden text-slate-900 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider block">
              Passphrase Key
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                name="password" // 👈 CRITICAL: NextAuth relies on this mapping key
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl font-bold focus:outline-hidden text-slate-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#60399A] hover:bg-[#4C2D7B] dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-black text-xs py-3 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Verifying Credentials...
              </>
            ) : (
              "Initialize Secure Login"
            )}
          </button>
        </form>

        <p className="text-[9px] font-medium text-center text-slate-400/80 dark:text-zinc-600 max-w-[240px] mx-auto">
          Sessions are fully monitored and cryptographically encrypted under standard JWT strategy parameters.
        </p>

      </div>
    </div>
  );
}