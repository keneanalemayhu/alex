// @/components/sidebar/nav-user.tsx

"use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Alemayehu Tilahun</span>
            <span className="text-muted-foreground truncate text-xs">
              Owner
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
