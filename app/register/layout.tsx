import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a GymLog account to start recording workout sessions.",
  openGraph: {
    title: "Create Account | GymLog",
    description: "Start tracking workouts with GymLog.",
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
