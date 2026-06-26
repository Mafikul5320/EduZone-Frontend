import { Route } from "@/types/routeType";
import { LayoutDashboard, Calendar, Video, Star, UserPlus } from "lucide-react";

export const TutorRoute: Route[] = [
    {
        title: "Overview",
        url: "/tutor-dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Create Profile",
        url: "/tutor-dashboard/create-profile",
        icon: UserPlus
    },
    {
        title: "Availability",
        url: "/tutor-dashboard/availability",
        icon: Calendar
    },
    {
        title: "Sessions",
        url: "/tutor-dashboard/sessions",
        icon: Video
    },
    {
        title: "Reviews",
        url: "/tutor-dashboard/reviews",
        icon: Star
    }
]