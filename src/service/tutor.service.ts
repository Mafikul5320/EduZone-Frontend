import { env } from "@/env";
import { cookies } from "next/headers";


const API_URL = `${env.BACKEND_URL}/api/v1`;

export interface TutorProfileUpdate {
  name?: string;
  image?: string;
  bio?: string;
  pricePerHour?: number;
  subjects?: string[];
  categoryId?: string;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export const TutorService = {
  convertToTutor: async (data: TutorProfileUpdate) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/upadte/tutor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error converting to tutor:", error);
      throw error;
    }
  },

  setAvailability: async (slots: AvailabilitySlot[]) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/availability/tutor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ slots }),
      });
      return res.json();
    } catch (error) {
      console.error("Error setting availability:", error);
      throw error;
    }
  },

  getAllTutors: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/all/data/tutor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching tutors:", error);
      throw error;
    }
  },

  updateProfile: async (data: TutorProfileUpdate) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/create/tutor-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error updating tutor profile:", error);
      throw error;
    }
  },

  filterTutors: async (params: {
    searchTerm?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const query = new URLSearchParams();
      if (params.searchTerm) query.append("searchTerm", params.searchTerm);
      if (params.categoryId) query.append("categoryId", params.categoryId);
      if (params.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
      if (params.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);

      const res = await fetch(`${API_URL}/tutor/filter?${query.toString()}`, {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error filtering tutors:", error);
      throw error;
    }
  },

  getSingleTutor: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/tutosr/${id}`, {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching single tutor:", error);
      throw error;
    }
  },

  getTutorNames: async () => {
    try {
      const res = await fetch(`${API_URL}/public/tutors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching tutor names:", error);
      throw error;
    }
  },
};
