"use client";

import { Trophy } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComingSoon from "./ComingSoon";

export default function Header() {
  const [isShow, setIsShow] = useState(false);
  const { t } = useLanguage();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setUsers(res.ok ? data : { name: "there" });
    } catch (error) {
      console.error("Unable to load profile header:", error);
      setUsers({ name: "there" });
    }
  };

  if (!users) return (
    <div className="flex min-h-48 items-center justify-center gap-3">
      {/* Spinning Indicator */}
      <div className="w-8 h-8 border-4 border-slate-300 border-t-[#7B61FF] rounded-full animate-spin" />
      {/* Text Message */}
      <p className="text-sm font-bold text-slate-500 tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  )

  

  const handleClick = () => {
    setIsShow(true);
  };

  return (
    <div>

      <div className="flex items-center justify-between">

        {/* Left Side: Logo and Title */}
        <div className="flex items-center gap-1">
          <img
            src="/logo.png"
            alt="logo"
            className="w-18"
          />
          <h1 className="text-3xl font-serif">
            Bodh
          </h1>
        </div>

        {/* Right Side Actions: Upgrade Button + Trophy Icon */}
        {/* ✅ FIXED: Added items-center and gap spacing to align components beautifully */}
        <div className="flex items-center">
          <Link href="/subscription-plan">
          <Image
              src="/upgradeplann.png"
              alt="upgrade plan"
              width={145} // Adjusted width matching mobile/header safety proportions
              height={50}
              priority
              className="object-contain pointer-events-none select-none"
            />
            </Link>
          
          {/* Upgrade Banner Button Wrapper */}
          <button
            type="button"
            onClick={handleClick}
            className="relative outline-none active:scale-[0.98] transition-transform duration-150 rounded-full overflow-hidden shrink-0"
          >
            
          </button>

          {/* Feature Trophy Activation Icon */}
          <Trophy 
            onClick={handleClick}
            className="text-[#08189B] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            size={24}
          />

          {/* Modal Control Layer Injection */}
          <ComingSoon
            isOpen={isShow} 
            onClose={() => setIsShow(false)} 
          />

        </div>

      </div>

      {/* Hero Welcome Typography Block */}
      <div className="mt-">
        <h2 className="text-3xl font-semibold">
          {t.home.greeting}
          <span>{users.name} ☀️</span>

        </h2>

        

        <p className="mt-2 dark:text-white text-gray-500 text-xl">
          {t.home.subtitle}
        </p>
      </div>

    </div>
  );
}