"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const pathname = usePathname();

  // Hide BottomNav on login and register pages
  const hideOnRoutes = ["/login", "/register", "/forgot-password", "/new-password"];
  const shouldHideByRoute = hideOnRoutes.some((route) => pathname.startsWith(route));

  if (shouldHideByRoute) {
    return null;
  }

  return <BottomNav />;
}
