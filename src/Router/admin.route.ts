import { Route } from "@/types/routeType";
import { LayoutDashboard, Users, Grid, Bookmark } from "lucide-react";

export const AdminRoute: Route[] = [
    {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users
    },
    {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: Grid
    },
    {
        title: "Bookings",
        url: "/admin-dashboard/bookings",
        icon: Bookmark
    }
]