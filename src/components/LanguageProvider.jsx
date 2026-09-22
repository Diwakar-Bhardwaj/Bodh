"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { supportedLanguages, translations } from "@/lib/translations";

const LanguageContext = createContext({
  language: "english",
  setLanguage: () => {},
  t: translations.english,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const saved = window.localStorage.getItem("language");
    if (saved && supportedLanguages.includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    document.documentElement.lang = language === "hindi" ? "hi" : "en";
  }, [language]);

  const messages = translations[language] || translations.english;

  const value = useMemo(
    () => ({ language, setLanguage, t: messages }),
    [language, messages]
  );

  return (
    <LanguageContext.Provider value={value}>
      <NextIntlClientProvider locale={language === "hindi" ? "hi" : "en"} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
