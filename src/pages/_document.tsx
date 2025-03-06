import Document, { Html, Head, Main, NextScript } from 'next/document';
import { inter, spaceGrotesk, outfit } from '../presentation/styles/fonts';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
        <Head>
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 