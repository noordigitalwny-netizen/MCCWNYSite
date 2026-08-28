import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCC WNY - Muslim Community Center of Western New York",
  description: "Official website for Muslim Community Center of Western New York. Daily prayer times, Friday Jummah, community services, events, and weekend school.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-emerald-950">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
