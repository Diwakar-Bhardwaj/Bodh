

"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";

import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RegisterPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [checked, setChecked] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(t.auth.passwordMismatch);
      return;
    }

    // checkbox validation
    if (!checked) {
      toast.error(t.auth.agreeTermsError);
      return;
    }

    try {

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      let data = { message: "Unexpected server response" };
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON response", err);
      }

      if (res.ok) {
        toast.success(data.message);
        window.location.href = "/";
      }
      else toast.error(data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-4 text-black">

      <div className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-[#f8f5f7]">

        {/* TOP BAR */}
        {/* <div className="h-14 bg-[#08189B]" /> */}

        {/* TEMPLE IMAGE */}
        <Image
          src="/temple.png"
          alt="temple"
          width={100}
          height={100}
          className="absolute right-0 top-15 w-40 opacity-10"
        />

        <div className="px-8 pb-10 pt-2">

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
          <h1 className=" text-center text-5xl font-serif text-black">
            Bodh
          </h1>

          <p className="mt-1 text-center text-sm text-gray-400">
            {t.splash.subtitle}
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >

            {/* NAME */}
            <div className="flex items-center rounded-xl border bg-white px-3">

              <div className="rounded-lg bg-[#EEE8F7] p-3 text-[#08189B]">

                <FaUser size={15} />

              </div>

              <input
                type="text"
                value={formData.name}
                placeholder={t.auth.fullName}
                className="w-full bg-transparent p-3 outline-none"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

            </div>

            {/* EMAIL */}
            <div className="flex items-center rounded-xl border bg-white px-3">

              <div className="rounded-lg bg-[#EEE8F7] p-3 text-[#08189B]">

                <MdEmail size={15} />

              </div>

              <input
                type="email"
                value={formData.email}
                placeholder={t.auth.emailAddress}
                className="w-full bg-transparent p-3 outline-none"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
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
                value={formData.password}
                placeholder={t.auth.password}
                className="w-full bg-transparent p-3 outline-none"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex items-center rounded-xl border bg-white px-3">

              <div className="rounded-lg bg-[#EEE8F7] p-3 text-[#08189B]">

                <RiLockPasswordLine size={15} />

              </div>

              <input
                type="password"
                value={formData.confirmPassword}
                placeholder={t.auth.confirmPassword}
                className="w-full bg-transparent p-3 outline-none"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />

            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3">

              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mt-1 h-5 w-5 accent-[#08189B]"
              />

              <p className="text-sm text-gray-700">
                {t.auth.agreeTermsPrefix}
                <span className="text-[#08189B]">{t.auth.terms}</span>
                {t.auth.agreeTermsMiddle}
                <span className="text-[#08189B]">{t.auth.privacy}</span>
              </p>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#08189B] py-3 mt-2 text-lg font-semibold text-white"
            >
              {t.auth.createAccount}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">

            <div className="h-[1px] flex-1 bg-gray-300" />

            <p className="text-gray-500">
              {t.auth.orContinueWith}
            </p>

            <div className="h-[1px] flex-1 bg-gray-300" />

          </div>

          {/* SOCIAL BUTTONS */}
          <div className="flex justify-center gap-6">

            {/* GOOGLE */}
            <button
              type="button"
              onClick={() => signIn("google", {
                callbackUrl: "/",
              })}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <FaGoogle size={30} />
            </button>

            {/* APPLE */}
            {/* <button
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >

              <FaApple size={30} />

            </button> */}

          </div>

          {/* LOGIN */}
          <p className="mt-7 text-center font-medium">
            {t.auth.haveAccount} {" "}
            <Link href="/login" className="text-[#08189B]">
              {t.auth.loginHere}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}