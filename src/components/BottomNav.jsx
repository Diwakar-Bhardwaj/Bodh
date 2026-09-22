"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { PiFlowerLotusLight } from "react-icons/pi";
import {
  Home,
  BookOpen,
  Flame,
  Sparkles,
  User,
} from "lucide-react";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      name: t.nav.home,
      icon: Home,
      path: "/",
    },
    {
      name: t.nav.library,
      icon: BookOpen,
      path: "/library",
    },
    {
      name: t.nav.naamJaap,
      icon: Flame,
      path: "/namjap",
    },
    {
      name: t.nav.aiGuide,
      icon:PiFlowerLotusLight,
      path: "/aiguide",
    },
    {
      name: t.nav.profile,
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-zinc-800 dark:bg-black/95 md:bottom-0 md:left-0 md:right-auto md:top-0 md:w-64 md:border-r md:border-t-0 md:shadow-[8px_0_24px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex max-w-md justify-around py-3 dark:text-white md:h-full md:max-w-none md:flex-col md:justify-center md:gap-3 md:px-4">

        {navItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-900 md:w-full md:flex-row md:justify-start md:gap-3 md:px-4"
            >
              <Icon
                size={24}
                className={
                  active
                    ? "text-[#08189B] fill-[#08189B]"
                    : "text-gray-400 dark:text-white"
                }
              />

              <span
                className={`text-xs ${
                  active
                    ? "text-[#08189B] font-semibold"
                    : "text-gray-500 dark:text-white"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}

