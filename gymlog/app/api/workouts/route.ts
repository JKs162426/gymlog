import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { getCurrentUser } from "@/lib/session";
import { validateWorkout } from "@/lib/validation";

function unauthorized() {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.id) return unauthorized();

  await connectDB();
  const workouts = await Workout.find({ userId: user.id }).sort({ date: -1 }).lean();
  return NextResponse.json(workouts);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user?.id) return unauthorized();

  try {
    const validated = validateWorkout(await request.json());
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await connectDB();
    const workout = await Workout.create({ ...validated.data, userId: user.id });
    return NextResponse.json(workout, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save the workout." }, { status: 500 });
  }
}
