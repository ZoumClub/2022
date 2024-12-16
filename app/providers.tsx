"use client";

import { Toaster } from 'sonner';
import { AuthProvider } from '@/lib/auth/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-center" />
    </AuthProvider>
  );
}