import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import EmptyState from "@/components/EmptyState";
import WorkoutCard from "@/components/WorkoutCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Review your latest GymLog workout sessions and training activity.",
};

interface DashboardWorkout {
  _id: { toString(): string };
  date: Date;
  notes?: string;
  exercises: Array<{ sets: number }>;
}

export default async function DashboardPage() {
  const user = await requireUser();
  await connectDB();
  const workouts = await Workout.find({ userId: user.id })
    .sort({ date: -1 })
    .limit(5)
    .lean<DashboardWorkout[]>();
  const totalSets = workouts.reduce(
    (sum, workout) =>
      sum +
      workout.exercises.reduce((sets, exercise) => sets + exercise.sets, 0),
    0
  );

  return (
    <PageShell
      eyebrow="Training overview"
      title={`Welcome back, ${user.name || "athlete"}`}
      description="See your latest sessions and keep your training history moving forward."
      actions={
        <Link
          href="/workouts/new"
          className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
        >
          Log workout
        </Link>
      }
    >
      <section
        className="grid gap-4 sm:grid-cols-3"
        aria-label="Workout statistics"
      >
        {[
          ["Recent sessions", workouts.length],
          [
            "Exercises logged",
            workouts.reduce(
              (sum, workout) => sum + workout.exercises.length,
              0
            ),
          ],
          ["Working sets", totalSets],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-3xl bg-slate-950 p-6 text-white"
          >
            <p className="text-sm font-semibold text-emerald-300">{label}</p>
            <p className="mt-2 text-4xl font-black">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">Recent workouts</h2>
          <Link
            href="/workouts"
            className="font-bold text-emerald-700 hover:underline"
          >
            View all
          </Link>
        </div>
        {workouts.length === 0 ? (
          <EmptyState
            title="No workouts yet"
            description="Log your first training session to populate this dashboard."
            href="/workouts/new"
            action="Log first workout"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout._id.toString()}
                id={workout._id.toString()}
                date={new Date(workout.date).toLocaleDateString()}
                notes={workout.notes ?? ""}
                exerciseCount={workout.exercises.length}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
