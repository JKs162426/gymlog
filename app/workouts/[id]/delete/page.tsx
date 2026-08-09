import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { deleteWorkout } from "@/lib/workout-action";

export default async function WorkoutDeletePage(props: {
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
      <h1>Delete Workout</h1>
      <p>Are you sure you want to delete this workout?</p>
      <form action={deleteWorkout.bind(null, params.id)}>
        <button type="submit">Yes, Delete</button>
      </form>
    </div>
  );
}
