import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A-ESDP 2026: Nurturing MSME Innovation",
  description: "Advanced-ESDP 2026 Event Website at IIT Jammu. A program fully sponsored by the Ministry of MSME.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
