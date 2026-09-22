"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import VerseCard from "@/components/VerseCard";
import JourneyCard from "@/components/JourneyCard";
import StreakCard from "@/components/StreakCard";

export default function Page() {
  const router = useRouter();
  const { status } = useSession();

  const [isGuest, setIsGuest] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const guestMode = localStorage.getItem("guest") === "true";
    setIsGuest(guestMode);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" && !isGuest) {
      router.replace("/login");
    }
  }, [status, isGuest, router]);

  if (!mounted || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] dark:bg-[#0B0907]">
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#B76E35]/20" />
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#E8DCCB] border-t-[#B76E35] dark:border-[#2A231D] dark:border-t-[#DDA66D]" />
            <div className="absolute inset-0 flex items-center justify-center text-xl select-none">
              🪷
            </div>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#B76E35]/80 dark:text-[#DDA66D]/80">
            Entering Sanctuary...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF7F2] text-[#29231E] antialiased selection:bg-[#B76E35]/20 selection:text-[#B76E35] dark:bg-[#0B0907] dark:text-[#F7EFE5]">
      
      {/* Decorative ambient lighting & background graphics */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft radial aura top-right */}
        <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#E7B875]/20 via-[#B76E35]/10 to-transparent blur-3xl dark:from-[#E7B875]/10 dark:via-[#B76E35]/5" />
        
        {/* Soft radial aura bottom-left */}
        <div className="absolute -bottom-32 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#C77A3A]/15 via-[#8C4A1B]/10 to-transparent blur-3xl dark:from-[#C77A3A]/10 dark:via-[#8C4A1B]/5" />
        
        {/* Subtle center warm glow */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#F3E5D5]/30 blur-3xl dark:bg-[#1A1410]/20" />

        {/* Subtle spiritual watermark symbol */}
        <div className="absolute right-[5%] top-[18%] select-none font-serif text-[240px] leading-none opacity-[0.02] dark:opacity-[0.03]">
          ॐ
        </div>
      </div>

      {/* Main container */}
      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-4 sm:px-6 md:px-10 md:pb-16 lg:px-12">
        
        {/* Header */}
        <Header />

        {/* Hero Banner / Greeting */}
        <section className="mt-8 md:mt-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B76E35]/20 bg-[#B76E35]/5 px-3 py-1 backdrop-blur-md dark:border-[#DDA66D]/20 dark:bg-[#DDA66D]/10">
                <span className="text-xs">🪷</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B76E35] dark:text-[#DDA66D]">
                  Your Spiritual Space
                </span>
              </div>

              <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#29231E] sm:text-4xl md:text-5xl lg:text-6xl dark:text-[#FFF7ED]">
                Find a moment of{" "}
                <span className="bg-gradient-to-r from-[#B76E35] via-[#C77A3A] to-[#9F5D2D] bg-clip-text text-transparent dark:from-[#DDA66D] dark:to-[#E7B875]">
                  inner peace.
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-[#776F66] sm:text-base dark:text-[#AAA098]">
                Begin your day with wisdom, devotion, and a quiet moment dedicated entirely to yourself.
              </p>
            </div>

            {/* Lotus Badge */}
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E7D8C6] bg-white/60 text-3xl shadow-lg backdrop-blur-md transition-all hover:scale-105 sm:flex dark:border-[#352C25] dark:bg-[#171310]/60">
              🪷
            </div>
          </div>
        </section>

        {/* Hero / Daily Verse Section */}
        <section className="mt-8 md:mt-10">
          <div className="group relative overflow-hidden rounded-3xl border border-[#E8DCCB] bg-white/70 shadow-[0_20px_60px_-15px_rgba(100,70,40,0.07)] backdrop-blur-xl dark:border-[#2E251E] dark:bg-[#14100D]/80">
            
            {/* Background Texture */}
            <div
              className="absolute inset-0 opacity-[0.08] transition-opacity duration-700 group-hover:opacity-[0.12] dark:opacity-[0.06] dark:group-hover:opacity-[0.09]"
              style={{
                backgroundImage: "url('/temple1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFC] via-[#FFFDFC]/90 to-[#F8EFE4]/60 dark:from-[#14100D] dark:via-[#14100D]/90 dark:to-[#221A13]/70" />

            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr]">
              
              {/* Text / Quote Side */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#E5CEB2] bg-[#FDF8F2] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#A85E28] shadow-sm dark:border-[#4A3828] dark:bg-[#251A12] dark:text-[#DDA66D]">
                  <span className="text-[#B76E35] dark:text-[#DDA66D]">✦</span>
                  Verse of the Day
                </div>

                <h2 className="max-w-2xl font-serif text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
                  A little wisdom can{" "}
                  <span className="bg-gradient-to-r from-[#B76E35] to-[#C77A3A] bg-clip-text text-transparent dark:from-[#DDA66D] dark:to-[#E7B875]">
                    change your entire day.
                  </span>
                </h2>

                <p className="mt-3 max-w-lg text-sm text-[#776F66] sm:text-base dark:text-[#AAA098]">
                  Pause, reflect, and center yourself with timeless spiritual principles.
                </p>

                {/* Verse Card Inner Container */}
                <div className="mt-6 rounded-2xl border border-[#EBDCCB] bg-white/80 p-5 shadow-sm backdrop-blur-md sm:p-6 dark:border-[#352B22] dark:bg-[#1C1612]/70">
                  <span className="block font-serif text-4xl leading-none text-[#C08A4B]/40 dark:text-[#C08A4B]/30">
                    “
                  </span>

                  <p className="-mt-2 font-serif text-lg leading-relaxed text-[#3C332C] sm:text-xl dark:text-[#F4E9DC]">
                    You have the right to perform your duty, but not to the fruits of your actions.
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#F0E4D5] pt-4 dark:border-[#2A211A]">
                    <div>
                      <p className="text-sm font-semibold text-[#B76E35] dark:text-[#DDA66D]">
                        Bhagavad Gita
                      </p>
                      <p className="text-xs text-[#8C8177] dark:text-[#8E8378]">
                        Chapter 2 • Verse 47
                      </p>
                    </div>

                    <button
                      type="button"
                      className="group/btn flex h-11 w-11 items-center justify-center rounded-full bg-[#B76E35] text-white shadow-md shadow-[#B76E35]/20 transition-all hover:scale-105 hover:bg-[#9F5D2D] active:scale-95"
                      aria-label="Listen to verse"
                    >
                      <span className="transition-transform duration-300 group-hover/btn:scale-110">
                        🔊
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative hidden min-h-[440px] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/temple1.png')",
                  }}
                />

                {/* Ambient Blends */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFC] via-transparent to-transparent dark:from-[#14100D]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100D]/50 via-transparent to-transparent" />

                {/* Floating Glassmorphic Badge */}
                <div className="absolute bottom-8 right-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-4xl shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 dark:border-white/10 dark:bg-black/30">
                  🪷
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Existing VerseCard for Mobile */}
        <section className="mt-6 lg:hidden">
          <VerseCard />
        </section>

        {/* Journey + Streak Section */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B76E35] dark:text-[#DDA66D]">
                Your Path
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Continue your journey
              </h2>
            </div>

            <span className="hidden text-2xl sm:block" aria-hidden="true">
              ✨
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            {/* Journey Card Wrapper */}
            <div className="group relative rounded-3xl border border-[#E8DCCB] bg-white/70 p-1 shadow-[0_10px_30px_rgba(100,70,40,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(100,70,40,0.08)] dark:border-[#2E251E] dark:bg-[#14100D]/70">
              <div className="h-full rounded-[20px] bg-gradient-to-br from-white/90 to-[#FDF8F3] p-1 dark:from-[#171310] dark:to-[#1E1712]">
                <JourneyCard />
              </div>
            </div>

            {/* Streak Card Wrapper */}
            <div className="group relative rounded-3xl border border-[#E8DCCB] bg-white/70 p-1 shadow-[0_10px_30px_rgba(100,70,40,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(100,70,40,0.08)] dark:border-[#2E251E] dark:bg-[#14100D]/70">
              <div className="h-full rounded-[20px] bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE5] p-1 dark:from-[#1D1712] dark:to-[#14100D]">
                <StreakCard />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Spiritual Quote Banner */}
        <section className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-[#E3D1BC] bg-gradient-to-b from-[#F6EBDD] to-[#EFE0CE] px-6 py-10 text-center shadow-inner dark:border-[#33271F] dark:from-[#1C1611] dark:to-[#15100C] sm:px-10">
            
            {/* Watermark Symbols */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 select-none text-7xl text-[#B76E35]/10 dark:text-[#DDA66D]/5">
              ॐ
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 select-none text-7xl text-[#B76E35]/10 dark:text-[#DDA66D]/5">
              ॐ
            </div>

            <div className="relative z-10">
              <span className="inline-block text-3xl">🪷</span>

              <p className="mx-auto mt-2 max-w-xl font-serif text-xl italic leading-relaxed text-[#4A3E34] sm:text-2xl dark:text-[#EAE0D5]">
                “Peace comes from within. Do not seek it without.”
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-[#B76E35]/30 dark:bg-[#DDA66D]/30" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#A66A38] dark:text-[#C99A6B]">
                  Inner Mindfulness
                </p>
                <span className="h-px w-8 bg-[#B76E35]/30 dark:bg-[#DDA66D]/30" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}