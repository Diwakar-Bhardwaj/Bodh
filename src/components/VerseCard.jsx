"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export default function VerseCard() {
  const { t } = useLanguage();
  return (
    <div
      className="mt-8 rounded-[32px] overflow-hidden
      bg-cover bg-center h-[380px]
      relative"
      style={{
        backgroundImage:
          "url('/temple1.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">

        <div>
          <h3 className="text-xl font-semibold text-black">
            {t.home.verseOfTheDay}
          </h3>
        </div>

        <div>
          <p className="text-white text-2xl font-medium">
            कर्मण्येवाधिकारस्ते
          </p>

          <p className="text-white mt-2 text-lg">
            Bhagavad Gita
          </p>

          <p className="text-white/90 mt-4">
            You have the right to perform
            your duty, but not to the fruits
            of your actions.
          </p>

         <Link
  href="/library/4"
  className="mt-5 block w-full bg-white/20 backdrop-blur py-3 rounded-xl text-white text-center"
>
  {t.home.reflectOnThis}
</Link>
        </div>

      </div>
    </div>
  );
}