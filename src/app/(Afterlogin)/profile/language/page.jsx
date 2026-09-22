"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { supportedLanguages } from "@/lib/translations";

export default function SelectLanguagePage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [selected, setSelected] = useState(language);

  useEffect(() => {
    setSelected(language);
  }, [language]);

  const handleSave = () => {
    setLanguage(selected);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black pb-20 text-slate-800 font-sans">
      <div className="flex items-center gap-4 px-4 py-4 bg-[#F7F1F3] dark:bg-black">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[#7B61FF] font-semibold"
        >
          ← {t.profile.back}
        </button>
        <h1 className="text-xl font-bold dark:text-white">{t.profile.language}</h1>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 space-y-4">
        <p className="text-sm text-slate-500">{t.profile.chooseLanguage}</p>

        <div className="bg-white rounded-3xl shadow-sm p-4 space-y-3">
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelected(lang)}
              className={`w-full text-left p-4 rounded-3xl border ${
                selected === lang
                  ? "border-[#7B61FF] bg-[#F0EDFF]"
                  : "border-slate-200 bg-white"
              } transition`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900 capitalize">
                    {t.profile[lang] || lang}
                  </div>
                </div>
                {selected === lang ? (
                  <span className="text-[#7B61FF] text-sm">{t.profile.selected}</span>
                ) : null}
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full rounded-3xl bg-[#7B61FF] text-white py-4 font-semibold"
        >
          {t.profile.save}
        </button>
      </div>
    </div>
  );
}
