import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from '../presentation/components/layout/ThemeRegistry';
import RootLayout from '../presentation/components/layout/RootLayout';

export const metadata: Metadata = {
  title: 'Meu Portfólio',
  description: 'Portfólio profissional desenvolvido com Next.js e Material UI',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <RootLayout>
            {children}
          </RootLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
} 