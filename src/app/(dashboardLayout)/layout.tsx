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
import React from "react"

export default async function Page({

    children,
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
    const userInfo = data?.user
    console.log(data?.user)
    const role = data?.user.role
    const renderDashboard = () => {
        if (role === userRole.ADMIN) return admin
        if (role === userRole.TUTOR) return tutor
        if (role === userRole.STUDENT) return student
        return null
    }
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
    )
}
