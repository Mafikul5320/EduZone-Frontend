"use server"
import { UserService } from "@/service/user.service"

export const getSession = async () => {
    const data = await UserService.getSession();
    return data?.user ?? null;
}