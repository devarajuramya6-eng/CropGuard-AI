import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import PWARegistry from "@/components/PWARegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriGuard AI",
  description: "AI-Powered Smart Farm Management",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0D5C35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWARegistry>
          <AuthProvider>
            {children}
          </AuthProvider>
        </PWARegistry>
      </body>
    </html>
  );
}
