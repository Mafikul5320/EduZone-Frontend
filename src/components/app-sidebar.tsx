import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Route } from "@/types/routeType"
import { userRole } from "@/constant/role.type"
import { AdminRoute } from "@/Router/admin.route"
import { StudentRoute } from "@/Router/Student.route"
import { TutorRoute } from "@/Router/tutor.route"

export function AppSidebar({ user, ...props }: { user: { role: string } } & React.ComponentProps<typeof Sidebar>) {


  let route: Route[] = [];

  switch (user.role) {
    case userRole.ADMIN:
      route = AdminRoute
      break;
    case userRole.STUDENT:
      route = StudentRoute
      break;
    case userRole.TUTOR:
      route = TutorRoute
      break;

    default:
      route = []
      break;
  }


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div>
          EduZone
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {route.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
