"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserSnapshotCard from "@/components/profile/UserSnapshotCard";
import DarkModeToggle from "@/components/profile/DarkModeToggle";
import { MenuSectionTitle, NavigationRow } from "@/components/profile/MenuSection";
import {
  User, Lock, Globe, Headset, MessageSquare,
  Star, ShieldCheck, FileText, LogOut, Trash2, ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  // Initial state placeholder configuration
  const [users, setUsers] = useState({ name: "...", email: "...", image: null });
  const { language, t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching user metrics context profile:", error);
      }
    };

    fetchUsers();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] dark:bg-[#0B0907] pb-24 text-slate-800 dark:text-[#F7EFE5] font-sans transition-colors duration-300 overflow-hidden antialiased">
      
      {/* Decorative ambient lighting aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#B76E35]/10 via-[#7E52C0]/5 to-transparent blur-3xl dark:from-[#DDA66D]/10 dark:via-[#60399A]/10" />
      </div>

      <ProfileHeader title={t.profile.title} />

      <div className="relative mx-auto mt-6 max-w-4xl space-y-6 px-4 pb-12 md:px-8">

        {/* USER SNAPSHOT CONTAINER */}
        <UserSnapshotCard user={users} />

        {/* ACCOUNT SECTION */}
        <div className="space-y-2">
          <MenuSectionTitle title="Account" />
          <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md rounded-3xl border border-[#E8DCCB] dark:border-[#2E251E] overflow-hidden shadow-[0_10px_30px_rgba(100,70,40,0.04)] space-y-1 p-2 transition-all">
            <NavigationRow 
              href="/profile/edit-profile" 
              title={t.profile.editProfile} 
              description={t.profile.updateInfo} 
              icon={<User className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
            <NavigationRow 
              href="/profile/change-password" 
              title={t.profile.changePassword} 
              description={t.profile.updatePassword} 
              icon={<Lock className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
          </div>
        </div>

        {/* APP PREFERENCES SECTION */}
        <div className="space-y-2">
          <MenuSectionTitle title="App Preferences" />
          <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md rounded-3xl border border-[#E8DCCB] dark:border-[#2E251E] overflow-hidden shadow-[0_10px_30px_rgba(100,70,40,0.04)] space-y-1 p-2 transition-all">
            
            {/* Language Selector Row */}
            <Link 
              href="/profile/language" 
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#B76E35]/5 dark:hover:bg-[#DDA66D]/5 rounded-2xl transition text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-[#B76E35]/10 text-[#B76E35] dark:bg-[#DDA66D]/15 dark:text-[#DDA66D] rounded-xl transition-transform group-hover:scale-105">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-[#FFF7ED] text-sm">
                    {t.profile.language}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.profile.chooseLanguage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#B76E35] dark:text-[#DDA66D] capitalize">
                <span>{language === "hindi" ? t.profile.hindi : t.profile.english}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            <DarkModeToggle t={t} />
          </div>
        </div>

        {/* SUPPORT SECTION */}
        <div className="space-y-2">
          <MenuSectionTitle title="Support" />
          <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md rounded-3xl border border-[#E8DCCB] dark:border-[#2E251E] overflow-hidden shadow-[0_10px_30px_rgba(100,70,40,0.04)] space-y-1 p-2 transition-all">
            <NavigationRow 
              href="/profile/contact-us" 
              title={t.profile.contactUs} 
              description="We're here to help you" 
              icon={<Headset className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
            <NavigationRow 
              href="/profile/feedback" 
              title={t.profile.feedback} 
              description="Share your thoughts with us" 
              icon={<MessageSquare className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
            <NavigationRow 
              href="/profile/rate-app" 
              title={t.profile.rateApp} 
              description="Support us by rating the app" 
              icon={<Star className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
          </div>
        </div>

        {/* LEGAL SECTION */}
        <div className="space-y-2">
          <MenuSectionTitle title="Legal" />
          <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md rounded-3xl border border-[#E8DCCB] dark:border-[#2E251E] overflow-hidden shadow-[0_10px_30px_rgba(100,70,40,0.04)] space-y-1 p-2 transition-all">
            <NavigationRow 
              href="/profile/privacy" 
              title={t.profile.privacy} 
              description="Read our privacy policy" 
              icon={<ShieldCheck className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
            <NavigationRow 
              href="/profile/terms" 
              title={t.profile.terms} 
              description="Read our terms and conditions" 
              icon={<FileText className="w-5 h-5 text-[#B76E35] dark:text-[#DDA66D]" />} 
            />
          </div>
        </div>

        {/* ACCOUNT ACTIONS SECTION */}
        <div className="space-y-2">
          <MenuSectionTitle title="Account Actions" />
          <div className="bg-white/80 dark:bg-[#14100D]/80 backdrop-blur-md rounded-3xl border border-[#E8DCCB] dark:border-[#2E251E] overflow-hidden shadow-[0_10px_30px_rgba(100,70,40,0.04)] space-y-1 p-2 transition-all">
            <NavigationRow 
              href="/profile/logout" 
              title={t.profile.logout} 
              description="Sign out from your account" 
              icon={<LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />} 
              customBg="bg-red-500/10 dark:bg-red-500/15" 
            />
            <NavigationRow 
              href="/profile/delete-account" 
              title={t.profile.deleteAccount} 
              description="Permanently delete your account" 
              icon={<Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />} 
              customBg="bg-red-500/10 dark:bg-red-500/15" 
            />
          </div>
        </div>

        {/* FOOTER APP VERSION */}
        <div className="text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase pt-4">
          App Version 1.0.0
        </div>

      </div>
    </div>
  );
}