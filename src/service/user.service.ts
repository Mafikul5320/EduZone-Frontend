import { env } from "@/env";
import { cookies } from "next/headers"


const AUTH_URL = env.AUTH_URL;
const API_URL = "http://localhost:5000/api/v1";

export const UserService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    cookie: cookieStore.toString()
                },
                cache: "no-store"
            })
            return res.json()
        } catch (error) {
            console.log(error)
        }
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