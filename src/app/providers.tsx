// @/app/providers.tsx

"use client";
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LanguageProvider } from "@/components/context/LanguageContext";
import { Toaster as SonnerToaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <LanguageProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="jireh-theme"
        themes={["light", "dark", "system"]}
      >
        {children}
        {mounted && (
          <SonnerToaster
            position="bottom-right"
            expand={false}
            richColors
            closeButton
          />
        )}
      </NextThemesProvider>
    </LanguageProvider>
  );
}
