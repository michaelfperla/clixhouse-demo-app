import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tu Restaurante",
  description: "Pide comida desde tu celular",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tu Restaurante",
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
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-primary-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
