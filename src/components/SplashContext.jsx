"use client";

import { createContext, useContext, useState } from "react";

const SplashContext = createContext(null);

export function SplashProvider({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
}
