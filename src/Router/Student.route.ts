import { Route } from "@/types/routeType";
import { LayoutDashboard, Bookmark, Star, User } from "lucide-react";

export const StudentRoute: Route[] = [
    {
        title: "Overview",
        url: "/student-dashboard",
        icon: LayoutDashboard
    },
    {
        title: "My Bookings",
        url: "/student-dashboard/bookings",
        icon: Bookmark
    },
    {
        title: "My Reviews",
        url: "/student-dashboard/reviews",
        icon: Star
    },
    {
        title: "Profile",
        url: "/student-dashboard/profile",
        icon: User
    }
]