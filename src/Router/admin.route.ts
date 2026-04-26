import { Route } from "@/types/routeType";
import { LayoutDashboard, Users, Grid, Bookmark } from "lucide-react";

export const AdminRoute: Route[] = [
    {
        title: "Overview",
        url: "/admin-dashboard",
    },
    {
        title: "Users",
        url: "/admin-dashboard/users",
    },
    {
        title: "Categories",
        url: "/admin-dashboard/categories",
    },
    {
        title: "Bookings",
        url: "/admin-dashboard/bookings",
    }
]