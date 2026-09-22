
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle, FaApple } from "react-icons/fa";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        // NextAuth wraps custom credential errors inside standard strings
        toast.error(res.error === "CredentialsSignin" ? "Invalid email or password." : res.error);
        return;
      }

      // 🔥 THE CRITICAL FIX: Fetch the newly initialized token session properties
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      toast.success("Welcome back!");

      // 🔥 DYNAMIC ROUTING MATRIX
      if (session?.user?.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      console.error("Login component execution fault:", error);
      toast.error("A network communication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-4 text-black">
      <div className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-[#f8f5f7]">

        {/* TEMPLE IMAGE */}
        <Image
          src="/temple.png"
          alt="temple"
          width={100}
          height={100}
          className="absolute right-0 top-20 w-40 opacity-30"
        />

        <div className="px-8 pb-10 pt-5">
          {/* LOGO */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          {/* TITLE */}
          <h1 className="text-center font-serif text-5xl text-[#08189B]">
            {t.auth.welcomeBack}
          </h1>

          {/* SUBTITLE */}
          <p className="text-center text-l leading-9 text-gray-400">
            {t.auth.signInContinue}
          </p>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-7 flex w-full items-center justify-center gap-4 rounded-2xl border bg-white py-3 text-lg font-semibold shadow-sm transition hover:scale-[1.01] disabled:opacity-50"
          >
            <FaGoogle size={24} />
            {t.auth.continueWithGoogle}
          </button>

          {/* APPLE BUTTON */}
          {/* <button
            className="mt-4 flex w-full items-center justify-center gap-4 rounded-2xl border bg-white py-3 text-lg font-semibold shadow-sm transition hover:scale-[1.01]"
          >
            <FaApple size={24} />
            {t.auth.continueWithApple}

          </button> */}

          {/* CONTINUE AS GUEST */}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              localStorage.setItem("guest", "true");
              window.location.href = "/";
            }}
            className="mt-4 flex w-full items-center justify-center gap-4 rounded-2xl border bg-white py-3 text-lg font-semibold shadow-sm transition hover:scale-[1.01] disabled:opacity-50"
          >
            <User size={24} />
            {t.auth.continueAsGuest}
          </button>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gray-300" />
            <p className="text-sm text-gray-500">{t.auth.orContinueWith}</p>
            <div className="h-[1px] flex-1 bg-gray-300" />
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* EMAIL */}
            <div className="flex items-center rounded-xl border bg-white px-3">
              <div className="rounded-lg bg-[#EEE8F7] p-3 text-[#08189B]">
                <MdEmail size={15} />
              </div>
              <input
                type="email"
                required
                disabled={loading}
                placeholder={t.auth.emailAddress}
                className="w-full bg-transparent p-3 outline-none disabled:opacity-50"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center rounded-xl border bg-white px-3">
              <div className="rounded-lg bg-[#EEE8F7] p-3 text-[#08189B]">
                <RiLockPasswordLine size={15} />
              </div>
              <input
                type="password"
                required
                disabled={loading}
                placeholder={t.auth.password}
                className="w-full bg-transparent p-3 outline-none disabled:opacity-50"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#08189B]"
              >
                {t.auth.forgotPassword}
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#08189B] py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : t.auth.login}
            </button>
          </form>

          {/* REGISTER */}
          <p className="mt-8 text-center font-medium">
            {t.auth.haveAccount}{" "}
            <Link href="/register" className="text-[#08189B]">
              {t.auth.register}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}