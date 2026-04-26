"use server";

import { CategoryService } from "@/service/category.service";
import { revalidatePath } from "next/cache";

export const createCategoryAction = async (name: string) => {
  try {
    const res = await CategoryService.createCategory(name);
    if (res?.success) {
      revalidatePath("/admin-dashboard/categories");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};
