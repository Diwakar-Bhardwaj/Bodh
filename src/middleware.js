import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = req.nextUrl;

  // 1. Identify path segments (🔥 FIXED: Explicitly isolate admin login)
  const isAdminLoginPage = pathname === "/admin/login"; 
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register") || isAdminLoginPage;
  const isAdminPage = pathname.startsWith("/admin") && !isAdminLoginPage; // Admin pages EXCEPT login

  // 2. Handling Authenticated Users
  if (token) {
    if (isAuthPage) {
      if (token.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Role Enforcement Shield
    if (isAdminPage && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  // 3. Handling Unauthenticated Guests
  if (!token) {
    if (!isAuthPage) {
      // If trying to access protected admin pages, send to admin login
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      // If trying to access regular protected pages, send to standard login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/aiguide/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};