"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
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
          const userData = session.data.user;
          
          setUser({
            id: userData.id,
            name: userData.name || '',
            email: userData.email,
            role: (userData as any).role,
            status: (userData as any).status,
            image: userData.image || undefined
          });
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
