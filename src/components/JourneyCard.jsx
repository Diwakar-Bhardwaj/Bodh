"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { ChevronRight } from "lucide-react";

export default function JourneyCard() {
  const { t } = useLanguage();

  return (
    <>
      <h3 className="mt-8 text-xl font-semibold">
        {t.home.continueJourney}
      </h3>

      <Link href="/library/1">
        <div className="mt-4 bg-[#F3E3EE] dark:bg-black rounded-3xl p-2 px-4 flex items-center cursor-pointer">
          <img
            src="/temple1.png"
            className="w-30 h-24 rounded-2xl object-cover"
            alt="Ramayan"
          />

          <div className="ml-4 flex-1">
            <h4 className="text-xl font-semibold">
              Ramayan
            </h4>

            <p className="text-gray-500">
              {t.home.chapterInfo}
            </p>

            {/* <div className="h-2 bg-white rounded-full mt-3">
              <div className="h-2 bg-[#08189B] rounded-full w-[60%]" />
            </div> */}
          </div>

          <ChevronRight />
        </div>
      </Link>
    </>
  );
}