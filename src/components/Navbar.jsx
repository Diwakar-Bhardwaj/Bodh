
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

import { Menu, X } from "lucide-react";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // SESSION
  const { data: session } = useSession();
  const { t } = useLanguage();

  const linkClass = (path) =>
    `transition px-4 py-2 rounded-lg text-sm font-medium block md:inline-block ${
      pathname === path
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-200 hover:text-blue-400 hover:bg-slate-800 md:hover:bg-transparent"
    }`;



  // LINKS FOR ALL USERS
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/aiguide", label: t.nav.aiGuide },
  ];



  return (
    <nav className="
      sticky
      top-0
      left-0
      right-0
      z-50
      bg-[#02167E]
      text-white
      shadow-md
      border-b
      border-slate-800
      h-10
      w-full
      select-none
    ">

      <div className="
        mx-auto
        flex
        max-w-7xl
        h-full
        items-center
        justify-between
        px-6
      ">

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">

          {/* COMMON LINKS */}
          {
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))
          }



          {/* NOT LOGGED IN */}
          {
            !session ? (
              <>
                <Link href="/login" className={linkClass("/login")}> {t.nav.login} </Link>

                <Link href="/register" className={linkClass("/register")}> {t.nav.register} </Link>
              </>
            ) : (
              <>
                {/* PROFILE */}
                <Link href="/profile" className={linkClass("/profile")}> {t.nav.profile} </Link>

                {/* USER NAME */}
                {/* <p className="text-sm text-slate-300 px-2">
                  {session.user?.name}
                </p> */}

                {/* LOGOUT */}
                <button
                  onClick={() => signOut()}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition
                  "
                >
                  {t.nav.logout}
                </button>
              </>
            )
          }

        </div>



        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              p-2
              rounded-lg
              text-slate-400
              hover:text-white
              hover:bg-slate-800
              focus:outline-none
              transition-colors
            "
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </div>



      {/* MOBILE DRAWER */}
      {
        isOpen && (
          <div className="
            md:hidden
            bg-slate-900
            border-t
            border-slate-800
            px-4
            py-3
            space-y-2
            absolute
            top-16
            left-0
            right-0
            shadow-xl
            z-50
          ">

            {/* COMMON LINKS */}
            {
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))
            }



            {/* NOT LOGGED IN */}
            {
              !session ? (
                <>
                  <Link
                    href="/login"
                    className={linkClass("/login")}
                    onClick={() => setIsOpen(false)}
                  >
                    {t.nav.login}
                  </Link>

                  <Link
                    href="/register"
                    className={linkClass("/register")}
                    onClick={() => setIsOpen(false)}
                  >
                    {t.nav.register}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className={linkClass("/profile")}
                    onClick={() => setIsOpen(false)}
                  >
                    {t.nav.profile}
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="
                      w-full
                      bg-red-500
                      hover:bg-red-600
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-medium
                      transition
                    "
                  >
                    {t.nav.logout}
                  </button>
                </>
              )
            }

          </div>
        )
      }

    </nav>
  );
}
