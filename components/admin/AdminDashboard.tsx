"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useAuth } from "@/lib/hooks";
import { toast } from "sonner";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      router.push('/admin/login');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  }, [signOut, router]);

  return (
    <ErrorBoundary>
      <div>
        <header className="border-b">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">AutoMarket Admin</h1>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>
        {children}
      </div>
    </ErrorBoundary>
  );
}