import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLIXHOUSE Restaurant",
  description: "Pide comida desde tu celular",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CLIXHOUSE",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#d63f2a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" translate="no" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.__pwaInstallPrompt = e;
              });
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 min-h-screen antialiased font-body text-slate-800">
        {children}
      </body>
    </html>
  );
}
