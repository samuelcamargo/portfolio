import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from '../presentation/components/layout/ThemeRegistry';
import RootLayout from '../presentation/components/layout/RootLayout';
import Analytics from '../presentation/components/Analytics';
import Script from 'next/script';
import { Suspense } from 'react';
import ChatBot from '@/presentation/components/ChatBot/ChatBot';
import { inter, spaceGrotesk, outfit } from '../presentation/styles/fonts';

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

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samuel Camargo" />
        <meta name="application-name" content="Samuel Camargo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#7C3AED" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7C3AED" />

        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        
        {/* Fontes */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Samuel Camargo",
              "url": "https://samuelcamargo.dev",
              "sameAs": [
                "https://github.com/samuelcamargo",
                "https://www.linkedin.com/in/samuelcamargoti",
                "https://www.instagram.com/samuyoh"
              ],
              "jobTitle": "Desenvolvedor Full Stack",
              "worksFor": {
                "@type": "Organization",
                "name": "Campsoft"
              },
              "description": "Desenvolvedor Full Stack especializado em PHP, Laravel, Node.js, TypeScript e React."
            })
          }}
        />
      </head>
      <body>
        <ThemeRegistry>
          <RootLayout>
            {children}
          </RootLayout>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <ChatBot />
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