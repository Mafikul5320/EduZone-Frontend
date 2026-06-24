"use server";

import { PaymentService, PaymentInitiateData } from "@/service/payment.service";

export const initiatePaymentAction = async (data: PaymentInitiateData) => {
  try {
    const res = await PaymentService.initiatePayment(data);
    return res;
  } catch (error) {
    return { success: false, message: "An error occurred while initiating the payment" };
  }
};
