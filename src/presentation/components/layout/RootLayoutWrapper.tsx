'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import RootLayout from './RootLayout';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

export default function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Verifica se estamos em uma rota de dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  
  // Se estamos em uma rota de dashboard, apenas renderiza os filhos sem o RootLayout
  if (isDashboardRoute) {
    return <>{children}</>;
  }
  
  // Caso contrário, envolve com o RootLayout (que inclui Header e Footer do site)
  return <RootLayout>{children}</RootLayout>;
} 