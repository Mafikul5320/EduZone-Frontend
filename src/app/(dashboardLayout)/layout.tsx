export const dynamic = "force-dynamic";
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { userRole } from "@/constant/role.type"
import { UserService } from "@/service/user.service"
import { redirect } from "next/navigation"
import React from "react"
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function Page({
    admin,
    student,
    tutor
}: {
    children: React.ReactNode
    admin: React.ReactNode
    student: React.ReactNode
    tutor: React.ReactNode
}) {
    const data = await UserService.getSession();
    
    if (!data || !data.user) {
        redirect("/login");
    }

    const userInfo = data.user;
    const role = data.user?.role;

    if (!role) {
        redirect("/unauthorized");
    }

    const renderDashboard = () => {
        if (role === userRole.ADMIN) return admin;
        if (role === userRole.TUTOR) return tutor;
        if (role === userRole.STUDENT) return student;
        return <div className="p-6">Access Denied</div>;
    };

    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset className="bg-transparent">
                <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border/50 px-6 glass sticky top-0 z-10">
                    <SidebarTrigger className="-ml-2 text-primary hover:text-secondary hover:bg-primary/10 transition-colors" />
                    <Separator orientation="vertical" className="mr-2 h-6 bg-border/50" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                   <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                                      <GraduationCap size={16} />
                                      EduZone
                                   </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-bold text-foreground">Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
                   {renderDashboard()}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
