"use server";

import { AdminService, ReviewService, ReviewData } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (userId: string, status: "ACTIVE" | "BANNED") => {
  try {
    const res = await AdminService.updateUserStatus(userId, status);
    if (res?.success) {
      revalidatePath("/admin-dashboard/users");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

export const submitReviewAction = async (data: ReviewData) => {
  try {
    const res = await ReviewService.submitReview(data);
    if (res?.success) {
      revalidatePath("/student-dashboard/bookings");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};
