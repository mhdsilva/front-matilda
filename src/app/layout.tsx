import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';

import { AuthProvider } from '@/context/authContext';

export const metadata: Metadata = {
  title: 'Matilda',
  description: 'Plataforma de aprendizado de matemática',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
