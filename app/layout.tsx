import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinBridge | AI-Based Microfinance & Digital Wallet",
  description: "Advanced AI loan risk assessment platform and secure digital wallet for Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="h-full bg-[#0A0E1A] font-sans">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
