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
    
    // If no session, redirect to login
    if (!data || !data.user) {
        redirect("/login");
    }

    const userInfo = data.user;
    const role = data.user?.role;

    // If no role, redirect to unauthorized
    if (!role) {
        redirect("/unauthorized");
    }

    console.log("User Info:", userInfo);
    console.log("User Role:", role);

    const renderDashboard = () => {
        if (role === userRole.ADMIN) return admin;
        if (role === userRole.TUTOR) return tutor;
        if (role === userRole.STUDENT) return student;
        return <div className="p-6">Access Denied</div>;
    };

    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="italic">EduZone</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-bold italic">Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="py-4">{renderDashboard()}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
