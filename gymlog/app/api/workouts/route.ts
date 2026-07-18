import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";

export async function GET() {
  await connectDB();
  const workouts = await Workout.find().sort({ date: -1 });
  return NextResponse.json(workouts);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const workout = await Workout.create(body);
  return NextResponse.json(workout, { status: 201 });
}
