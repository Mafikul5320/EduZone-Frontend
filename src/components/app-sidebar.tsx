"use client"
import * as React from "react"
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
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Route } from "@/types/routeType"
import { userRole } from "@/constant/role.type"
import { AdminRoute } from "@/Router/admin.route"
import { StudentRoute } from "@/Router/Student.route"
import { TutorRoute } from "@/Router/tutor.route"
import { GraduationCap, LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export function AppSidebar({ user, ...props }: { user: { role: string, name?: string, email?: string } } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  let route: Route[] = [];

  switch (user?.role) {
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

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <Sidebar {...props} className="border-r border-border/50 bg-background/50 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
             <GraduationCap size={22} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground leading-tight">
              Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Zone</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold italic">
              {user?.role} Portal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 gap-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {route.map((item) => {
                const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`);
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className={`rounded-xl transition-all duration-200 h-11 px-4 ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-muted-foreground hover:bg-secondary/5 hover:text-foreground font-medium'}`}>
                      <Link href={item.url} className="flex items-center gap-3">
                        {Icon && <Icon size={18} className={isActive ? 'text-primary' : 'opacity-70'} />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-2 py-3">
           <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold border border-secondary/20">
              {user?.name?.charAt(0).toUpperCase() || user?.role?.charAt(0).toUpperCase() || 'U'}
           </div>
           <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-foreground">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || `${user?.role?.toLowerCase()}@eduZone.com`}</p>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full mt-2 flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl text-sm font-bold text-destructive bg-destructive/5 hover:bg-destructive/10 transition-colors border border-destructive/10"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
