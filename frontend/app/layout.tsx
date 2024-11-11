import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Header} from "@/app/_Components/Header";
import {Spacing} from "@/app/_Components/Spacing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Peche3000",
  description: "Leader français de la peche.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans h-screen bg-background`}
      >
      <Header/>
        {children}
      </body>
    </html>
  );
}
