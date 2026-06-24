import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export interface PaymentInitiateData {
  tutorId: string;
  slot: string;
  date: string;
  amount: number;
  totalPrice?: number;
}

export const PaymentService = {
  initiatePayment: async (data: PaymentInitiateData) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("better-auth.session_token")?.value || "";

      const res = await fetch(`${API_URL}/api/payment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "cookie": cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error initiating payment:", error);
      throw error;
    }
  },
};
