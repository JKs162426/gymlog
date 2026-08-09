import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your GymLog account to view and manage workouts.",
  openGraph: {
    title: "Log In | GymLog",
    description: "Access your GymLog workout dashboard.",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
