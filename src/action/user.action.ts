"use server";

import { UserService } from "@/service/user.service";
import { revalidatePath } from "next/cache";

export const updateStudentProfileAction = async (data: { name?: string; image?: string }) => {
  try {
    const res = await UserService.updateStudentProfile(data);
    if (res?.success) {
      revalidatePath("/student-dashboard/profile");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

export const getStudentDashboardStatsAction = async () => {
  try {
    const res = await UserService.getStudentDashboardStats();
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};
