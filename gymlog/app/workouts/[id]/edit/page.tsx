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
  );
}
