import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "@/components/AppHeader";
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
  title: {
    default: "GymLog",
    template: "%s | GymLog",
  },
  description:
    "Track focused workout sessions, exercise volume, and recent training progress with GymLog.",
  openGraph: {
    title: "GymLog",
    description:
      "A simple workout tracking application for focused training and progress review.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        <AppHeader />
        <div className="flex min-h-[calc(100vh-89px)] flex-col">{children}</div>
      </body>
    </html>
  );
}
