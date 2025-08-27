// @/components/common/sidebar/site-header.tsx

"use client";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

function getPageName(pathname: string) {
  if (!pathname) return "";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  const last = segments[segments.length - 1];
  return last.charAt(0).toUpperCase() + last.slice(1);
}

export function SiteHeader() {
  const pathname = usePathname();
  const pageName = getPageName(pathname || "");
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
