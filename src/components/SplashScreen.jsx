
"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="splash-shell relative h-screen w-full overflow-hidden bg-[#08189B]">
      <div className="splash-glow splash-glow-one" />
      <div className="splash-glow splash-glow-two" />

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">

        {/* CSS brand mark avoids image requests during the first paint. */}
        <div className="splash-mark animate-logo" aria-label="Bodh">
          <span>B</span>
        </div>

        {/* App Name */}
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-white animate-fade-up">
          {t.splash.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-center text-white/80 text-lg animate-fade-up-delay">
          {t.splash.subtitle}
        </p>

        {/* Bottom Content */}
        <div className="absolute bottom-24 text-center px-6">

          <p className="text-white font-semibold text-lg animate-fade-up-delay">
            {t.splash.tagline1}
          </p>

          <p className="mt-2 text-white/80 text-sm animate-fade-up-delay">
            {t.splash.tagline2}
          </p>

          {/* Loader */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20">
              <div className="loader-bar h-full rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}