import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spirit Media | Digital Products & Services",
  description:
    "Access premium digital products including movie apps, airtime services, and specialized mobile applications. Join our affiliate program to earn while you share.",
  keywords: [
    "Spirit Media",
    "movie app",
    "airtime services",
    "WhatsApp spy app",
    "digital products",
    "affiliate program",
    "mobile applications",
  ],
  authors: [{ name: "Spirit Media" }],
  creator: "Spirit Media",
  publisher: "Spirit Media",
  robots: {
    index: true,
    follow: true,
  },
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
