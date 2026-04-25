import { env } from "@/env";
import { cookies } from "next/headers"


const AUTH_URL = env.AUTH_URL;
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
    }
}