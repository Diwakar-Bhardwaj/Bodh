import React from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "../components/providers";
import BottomNavWrapper from "../components/BottomNavWrapper";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "../components/ThemeProvider"; 
import StructuralLayoutWrapper from "../components/StructuralLayoutWrapper"; // Separate client layout wrapper

// 1. STATICS CAN REMAIN HERE SAFELY AS A PURE SERVER LAYOUT COMPONENT
export const metadata = {
  title: "Bodh App",
  description: "Mobile App Experience",
  icons: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LanguageProvider>
            <ThemeProvider>
              {/* 2. Pass control to an external client wrapper */}
              <StructuralLayoutWrapper>
                {children}
              </StructuralLayoutWrapper>
            </ThemeProvider>
          </LanguageProvider>
        </Providers>
        
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}