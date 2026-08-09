import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";

export default async function WorkoutPage() {
  await connectDB();
  const workouts = await Workout.find().sort({ date: -1 });
  return (
    <div>
      <h1>Workouts</h1>
      <p>These are your workouts:</p>
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
