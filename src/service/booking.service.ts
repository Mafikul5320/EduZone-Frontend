import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/api/v1";

export interface BookingData {
  tutorId: string;
  slotId: string;
  date: string;
  totalPrice: number;
}

export const BookingService = {
  createBooking: async (data: BookingData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  getMyBookings: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/my-bookings`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching my bookings:", error);
      throw error;
    }
  },

  getAllBookings: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/bookings`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      throw error;
    }
  },
};
