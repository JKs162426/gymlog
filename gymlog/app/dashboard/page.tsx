import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Review your latest GymLog workout sessions and recent training activity.",
};

export default async function DashboardPage() {
  await connectDB();
  const workouts = await Workout.find().sort({ date: -1 }).limit(5);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} className="mb-1">
            {workout.notes} - {workout.date.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
