"use server";

import { BookingService, BookingData } from "@/service/booking.service";
import { revalidatePath } from "next/cache";

export const createBookingAction = async (data: BookingData) => {
  try {
    const res = await BookingService.createBooking(data);
    if (res?.success) {
      revalidatePath("/student-dashboard");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while creating the booking" };
  }
};
