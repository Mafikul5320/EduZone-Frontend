import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/api/v1";

export const CategoryService = {
  createCategory: async (name: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/create/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name }),
      });
      return res.json();
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/all/category`, {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
