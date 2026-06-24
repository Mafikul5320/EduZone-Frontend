import { cookies } from "next/headers";

export async function getSessionFromCookie() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("❌ No session");
      return null;
    }

    const session = await res.json();

    console.log("✅ Session:", session.user?.email);

    return session;

  } catch (error) {
    console.log("❌ Session error:", error);
    return null;
  }
}