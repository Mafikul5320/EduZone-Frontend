import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/env";


const API_URL = `${env.BACKEND_URL}/api/v1`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    
    // Get authorization header from incoming request or fallback to cookie
    const authHeader = req.headers.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : (cookieStore.get("better-auth.session_token")?.value || "");

    const backendRes = await fetch(`${API_URL}/payment/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "cookie": cookieStore.toString(), // Also send cookie as fallback
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to initiate payment";
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
