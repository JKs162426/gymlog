import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-950">
        <AppHeader />
        <div className="flex min-h-[calc(100vh-89px)] flex-col">{children}</div>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>GymLog — focused workout tracking.</p>
            <p>Built by Jesus Figueroa and Henry Chizoba.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
