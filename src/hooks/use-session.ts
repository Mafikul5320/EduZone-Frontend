"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  image?: string;
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user as User);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { user, loading };
}
