import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SetLocaleLang from "@/components/SetLocaleLang";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "sabi's portfolio",
  description: "Creative portfolio with an OS-style interface",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        <SetLocaleLang />
        {children}
      </body>
    </html>
  );
}
