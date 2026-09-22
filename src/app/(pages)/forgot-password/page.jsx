

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/LanguageProvider";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [timer, setTimer] = useState(0);



  // COUNTDOWN TIMER
  useEffect(() => {

    let interval;

    if (timer > 0) {

      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(interval);

  }, [timer]);



  // SEND OTP
  const handleSendOtp = async () => {

    if (!email) {
      toast.error(t.auth.enterEmail);
      return;
    }

    try {

      setLoading(true);

      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {

        setOtpSent(true);

        // start timer
        setTimer(60);

        alert(data.message);

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  // VERIFY OTP
  const handleVerifyOtp = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {

        alert("OTP verified successfully");

        // navigate to new password page
        router.push(`/new-password?email=${email}`);

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-blue-100 to-indigo-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔐</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            {t.auth.forgotPassword}
          </h1>

          <p className="text-gray-500 mt-2">
            {t.auth.enterEmail}
          </p>

        </div>



        {/* EMAIL INPUT */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.auth.emailAddress}
          </label>

          <input
            type="email"
            placeholder={t.auth.emailAddress}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          />

        </div>



        {/* SEND OTP BUTTON */}
        <button
          onClick={handleSendOtp}
          disabled={loading || timer > 0}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
            disabled:bg-gray-400
          "
        >

          {
            loading
              ? t.auth.updating
              : timer > 0
              ? `${t.auth.resendOtpIn} ${timer}s`
              : otpSent
              ? t.auth.resendOtp
              : t.auth.sendOtp
          }

        </button>



        {/* OTP SECTION */}
        {
          otpSent && (
            <div className="mt-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.auth.enterOtp}
              </label>

              <input
                type="text"
                placeholder={t.auth.otpPlaceholder}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                  tracking-[5px]
                  text-center
                  text-lg
                "
              />



              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="
                  w-full
                  mt-4
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  py-3
                  rounded-xl
                  transition
                "
              >
                {t.auth.verifyOtp}
              </button>

            </div>
          )
        }



        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Secure password recovery system
        </p>

      </div>

    </div>
  );
}
