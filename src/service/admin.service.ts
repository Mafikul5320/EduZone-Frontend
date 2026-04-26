import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/api/v1";

export interface ReviewData {
  tutorId: string;
  bookingId: string;
  rating: number;
  comment: string;
}

export const ReviewService = {
  submitReview: async (data: ReviewData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/student/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  },
};

export const AdminService = {
  getDashboardStats: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/dashboard`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching admin dashboard stats:", error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  updateUserStatus: async (userId: string, status: "ACTIVE" | "BANNED") => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      return res.json();
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  },
};
