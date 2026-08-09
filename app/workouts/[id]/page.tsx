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
  );
}
