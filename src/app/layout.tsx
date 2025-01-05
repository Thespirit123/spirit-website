import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
      <body className={`${montserrat}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
