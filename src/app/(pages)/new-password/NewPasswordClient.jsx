"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function NewPasswordClient() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (!email) {
        alert(t.auth.invalidResetLink);
        return;
      }

      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      alert(t.auth.somethingWentWrong || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 text-black">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          {t.auth.newPasswordTitle}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          {t.auth.newPasswordSubtitle}
        </p>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            {t.auth.newPasswordLabel}
          </label>

          <input
            type="password"
            placeholder={t.auth.newPasswordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? t.auth.updating : t.auth.updatePasswordButton}
        </button>
      </div>
    </div>
  );
}