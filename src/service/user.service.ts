import { env } from "@/env";
import { cookies } from "next/headers"
import { getSessionFromCookie } from "@/lib/session";


const AUTH_URL = env.AUTH_URL;
const API_URL = `${env.BACKEND_URL}/api/v1`;

export const UserService = {
    getSession: async function () {
        // Use the helper function to get session from cookie
        return await getSessionFromCookie();
    },
    updateStudentProfile: async function (data: { name?: string; image?: string }) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/student/profile/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString()
                },
                body: JSON.stringify(data)
            })
            return res.json()
        } catch (error) {
            console.log(error)
        }
    },
    getStudentDashboardStats: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/student/dashboard`, {
                method: "GET",
                headers: {
                    cookie: cookieStore.toString()
                },
                cache: "no-store"
            })
            return res.json()
        } catch (error) {
            console.log(error)
        }
    }
}