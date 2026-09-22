import React from "react";
import Link from "next/link";

{/* SECTION HEADER BLOCK */}
export function MenuSectionTitle({ title }) {
  return (
    <h3 className="px-2 py-1 text-xs font-bold text-[#7B61FF] dark:text-white uppercase tracking-wider mb-2">
      {title}
    </h3>
  );
}

{/* REUSABLE STANDARD NAVIGATION ITEM */}
export function NavigationRow({ href, title, description, icon, customBg, onClick }) {
  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${customBg ? customBg : "bg-[#F0EDFF] text-[#7B61FF]"}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <span className="text-slate-400 font-bold group-hover:translate-x-1 transition-transform">
        &gt;
      </span>
    </>
  );

  const classes = "w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition group text-left block";

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}