import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { LoadingScreen } from '@/components/ui/loading-screen';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AutoMarket',
  description: 'Find your perfect car',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}