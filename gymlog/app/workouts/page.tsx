import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import EmptyState from "@/components/EmptyState";
import WorkoutCard from "@/components/WorkoutCard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Workouts", description: "Browse your workout history in reverse chronological order." };

interface WorkoutListItem {
  _id: { toString(): string };
  date: Date;
  notes?: string;
  exercises: unknown[];
}

export default async function WorkoutsPage() {
  const user = await requireUser();
  await connectDB();
  const workouts = await Workout.find({ userId: user.id }).sort({ date: -1 }).lean<WorkoutListItem[]>();

  return (
    <PageShell eyebrow="Workout history" title="Your workouts" description="Review every saved session, then open one to edit exercises or remove it." actions={<Link href="/workouts/new" className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700">New workout</Link>}>
      {workouts.length === 0 ? (
        <EmptyState title="Your workout list is empty" description="Start with one session and GymLog will keep it organized here." href="/workouts/new" action="Add workout" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {workouts.map((workout) => <WorkoutCard key={workout._id.toString()} id={workout._id.toString()} date={new Date(workout.date).toLocaleDateString()} notes={workout.notes ?? ""} exerciseCount={workout.exercises.length} />)}
        </div>
      )}
    </PageShell>
  );
}
