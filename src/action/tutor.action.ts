"use server";

import { TutorService, TutorProfileUpdate, AvailabilitySlot } from "@/service/tutor.service";
import { revalidatePath } from "next/cache";

export const createTutorProfileAction = async (data: TutorProfileUpdate) => {
  try {
    const res = await TutorService.createProfile(data);
    if (res?.success) {
      revalidatePath("/tutor-dashboard");
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

export const getDashboardDataAction = async () => {
  try {
    const res = await TutorService.getDashboardData();
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching dashboard data" };
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

export const getTutorNamesAction = async () => {
  try {
    const res = await TutorService.getTutorNames();
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching tutor names" };
  }
};

export const getAllTutorProfilesAction = async () => {
  try {
    const res = await TutorService.getTutorNames();
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching all tutor profiles" };
  }
};

export const filterTutorsAction = async (params: {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  try {
    const res = await TutorService.filterTutors(params);
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while filtering tutors" };
  }
};

export const getSingleTutorAction = async (id: string) => {
  try {
    const res = await TutorService.getSingleTutor(id);
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching tutor details" };
  }
};
