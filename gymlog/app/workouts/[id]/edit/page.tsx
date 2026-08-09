<<<<<<< HEAD
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { updateWorkout } from "@/lib/workout-action";

export default async function WorkoutEditPage(props: {
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
      <h1>Edit Workout</h1>
      <form action={updateWorkout.bind(null, params.id)}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={workout.date.toISOString().split("T")[0]}
          required
        />
        <br />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={workout.notes}
          required
        ></textarea>
        <br />
        {/* Add fields for exercises here */}
        <button type="submit">Update Workout</button>
      </form>
    </div>
=======
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import WorkoutForm from "@/components/WorkoutForm";

export const metadata: Metadata = { title: "Edit workout", description: "Update a workout session and its exercises." };

interface EditableWorkout {
  date: Date;
  notes?: string;
  exercises: Array<{ name: string; sets: number; reps: number; weight: number }>;
}

export default async function EditWorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();
  await connectDB();
  const workout = await Workout.findOne({ _id: id, userId: user.id }).lean<EditableWorkout | null>();
  if (!workout) notFound();

  return (
    <PageShell eyebrow="Update session" title="Edit workout" description="Correct session details or update every exercise in this workout.">
      <div className="mx-auto max-w-4xl"><WorkoutForm workoutId={id} initialValue={{ date: new Date(workout.date).toISOString().slice(0, 10), notes: workout.notes ?? "", exercises: workout.exercises.map(({ name, sets, reps, weight }) => ({ name, sets, reps, weight })) }} /></div>
    </PageShell>
>>>>>>> b2cc64ef2d5391359e7dc6427b68039fec07a450
  );
}
