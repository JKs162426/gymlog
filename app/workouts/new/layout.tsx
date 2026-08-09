import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log Workout",
  description: "Record a new GymLog workout with exercises, sets, reps, and weight.",
  openGraph: {
    title: "Log Workout | GymLog",
    description: "Add a new workout session to GymLog.",
  },
};

export default function NewWorkoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
