"use server";

import { TutorService, TutorProfileUpdate, AvailabilitySlot } from "@/service/tutor.service";
import { revalidatePath } from "next/cache";

export const convertToTutorAction = async (data: TutorProfileUpdate) => {
  try {
    const res = await TutorService.convertToTutor(data);
    if (res?.success) {
      revalidatePath("/tutor-dashboard/profile");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

export const updateTutorProfileAction = async (data: TutorProfileUpdate) => {
  try {
    const res = await TutorService.updateProfile(data);
    if (res?.success) {
      revalidatePath("/tutor-dashboard/profile");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

export const setAvailabilityAction = async (slots: AvailabilitySlot[]) => {
  try {
    const res = await TutorService.setAvailability(slots);
    if (res?.success) {
      revalidatePath("/tutor-dashboard/availability");
    }
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

export const getAllTutorsDashboard = async () => {
  try {
    const res = await TutorService.getAllTutors();
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching tutors" };
  }
};
