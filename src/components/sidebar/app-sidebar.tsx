"use client"
import * as React from "react"
import {
  IconToolsKitchen2,
  IconBuilding,
  IconUser,
  IconListCheck,
  IconCash,
  IconReport,
  IconSquareLetterS,
} from "@tabler/icons-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useT } from "@/lib/translate"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useT();

  const data = {
    navMain: [
      { title: t.overview, url: "/dashboard/overview", icon: IconToolsKitchen2 },
      { title: t.menuItems, url: "/dashboard/menu-items", icon: IconBuilding },
      { title: t.waiters, url: "/dashboard/waiters", icon: IconUser },
      { title: t.orders, url: "/dashboard/orders", icon: IconListCheck },
      { title: t.rolledOver, url: "/dashboard/rolled-over", icon: IconCash },
      { title: t.reports, url: "/dashboard/reports", icon: IconReport },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconSquareLetterS className="!size-5" />
                <span className="text-base font-semibold">{t.sofiBeso}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
