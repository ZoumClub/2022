"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { FetchError } from "@/lib/api/types";

interface UseAdminAuthResult {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthResult {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          if (mounted) {
            setUser(null);
            router.push("/admin/login");
          }
          return;
        }

        // Verify admin role
        const { data: { role }, error: roleError } = await supabase.rpc('get_user_role');
        
        if (roleError) {
          throw new FetchError(
            "Failed to verify admin role",
            roleError.code,
            roleError.message
          );
        }

        if (role !== 'admin') {
          throw new FetchError(
            "Unauthorized access",
            "AUTH_ERROR",
            "User is not an admin"
          );
        }

        if (mounted) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Auth error:", error);
        
        const message = error instanceof FetchError 
          ? error.message 
          : "Authentication failed";
        
        toast.error(message, {
          description: error instanceof FetchError ? error.details : undefined,
        });
        
        if (mounted) {
          setUser(null);
          router.push("/admin/login");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return {
    user,
    isLoading,
    signOut: handleSignOut,
  };
}