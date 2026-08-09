<<<<<<< HEAD
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";

export default async function WorkoutDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const params = await props.params;
  const workout = await Workout.findById(params.id);

  if (!workout) {
    return (
      <div>
        <h1>Workout Not Found</h1>
        <p>The workout with ID {params.id} does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Workout Details</h1>
      <p>
        <strong>Date:</strong> {workout.date.toDateString()}
      </p>
      <p>
        <strong>Notes:</strong> {workout.notes}
      </p>
      <ul>
        {workout.exercises.map(
          (
            ex: { name: string; sets: number; reps: number; weight: number },
            i: number
          ) => (
            <li key={i}>
              {ex.name} — {ex.sets} sets × {ex.reps} reps @ {ex.weight}kg
            </li>
          )
        )}
      </ul>
    </div>
=======
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Workout details", description: "Review the exercises and volume from a saved workout." };

interface WorkoutDetail {
  _id: { toString(): string };
  date: Date;
  notes?: string;
  exercises: Array<{ _id?: { toString(): string }; name: string; sets: number; reps: number; weight: number }>;
}

export default async function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await connectDB();
  const workout = await Workout.findOne({ _id: id, userId: user.id }).lean<WorkoutDetail | null>();
  if (!workout) notFound();

  return (
    <PageShell eyebrow="Saved session" title={new Date(workout.date).toLocaleDateString(undefined, { dateStyle: "long" })} description={workout.notes || "Workout session"} actions={<><Link href={`/workouts/${id}/edit`} className="rounded-full bg-emerald-600 px-5 py-2.5 font-bold text-white hover:bg-emerald-700">Edit</Link><Link href={`/workouts/${id}/delete`} className="rounded-full border border-rose-300 px-5 py-2.5 font-bold text-rose-700 hover:bg-rose-50">Delete</Link></>}>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <h2 className="border-b border-slate-200 px-6 py-5 text-2xl font-black">Exercises</h2>
        <ul className="divide-y divide-slate-200">
          {workout.exercises.map((exercise, index) => (
            <li key={exercise._id?.toString() ?? `${exercise.name}-${index}`} className="grid gap-4 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div><h3 className="text-lg font-black">{exercise.name}</h3><p className="mt-1 text-slate-600">{exercise.sets} sets × {exercise.reps} reps</p></div>
              <p className="text-lg font-bold text-emerald-700">{exercise.weight} kg</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
>>>>>>> b2cc64ef2d5391359e7dc6427b68039fec07a450
  );
}
