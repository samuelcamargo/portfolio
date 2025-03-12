import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from '../presentation/components/layout/ThemeRegistry';
import RootLayoutWrapper from '../presentation/components/layout/RootLayoutWrapper';
import Analytics from '../presentation/components/Analytics';
import Script from 'next/script';
import { Suspense } from 'react';
import ChatBotWrapper from '../presentation/components/ChatBot/ChatBotWrapper';
import ClientProviders from '../presentation/components/layout/ClientProviders';
import ErrorHandler from '../presentation/components/layout/ErrorHandler';

export const metadata: Metadata = {
  title: {
    default: 'Samuel Camargo | Desenvolvedor Full Stack',
    template: '%s | Samuel Camargo'
  },
  description: 'Desenvolvedor Full Stack especializado em PHP, Laravel, Node.js, TypeScript e React. Confira meu portfólio e projetos.',
  keywords: ['desenvolvedor full stack', 'php', 'laravel', 'node.js', 'typescript', 'react', 'next.js', 'docker', 'mysql', 'desenvolvedor web', 'programador', 'desenvolvimento de software'],
  authors: [{ name: 'Samuel Camargo', url: 'https://github.com/samuelcamargo' }],
  creator: 'Samuel Camargo',
  publisher: 'Samuel Camargo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://samuelcamargo.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    title: 'Samuel Camargo | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em PHP, Laravel, Node.js, TypeScript e React. Confira meu portfólio e projetos.',
    url: 'https://samuelcamargo.dev',
    siteName: 'Samuel Camargo Portfolio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel Camargo - Desenvolvedor Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Camargo | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em PHP, Laravel, Node.js, TypeScript e React. Confira meu portfólio e projetos.',
    images: ['/og-image.jpg'],
    creator: '@samuelcamargo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'adicione_seu_codigo_de_verificacao_google',
  },
  category: 'technology',
};

export default function RootLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <ClientProviders>
            <ErrorHandler />
            <RootLayoutWrapper>
              {children}
            </RootLayoutWrapper>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <ChatBotWrapper />
          </ClientProviders>
        </ThemeRegistry>
        
        {/* Microsoft Clarity (opcional) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
} 