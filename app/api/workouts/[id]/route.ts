import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { getCurrentUser } from "@/lib/session";
import { validateWorkout } from "@/lib/validation";
import { isValidObjectId } from "mongoose";

function unauthorized() {
  return NextResponse.json(
    { error: "Authentication required." },
    { status: 401 }
  );
}

function notFound() {
  return NextResponse.json({ error: "Workout not found." }, { status: 404 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.id) return unauthorized();

  const { id } = await params;
  if (!isValidObjectId(id)) return notFound();

  await connectDB();
  const workout = await Workout.findOne({
    _id: id,
    userId: user.id,
  }).lean();
  if (!workout) return notFound();
  return NextResponse.json(workout);
}

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.id) return unauthorized();

  const { id } = await params;
  if (!isValidObjectId(id)) return notFound();

  try {
    const validated = validateWorkout(await _request.json());
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await connectDB();
    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: user.id },
      validated.data,
      { new: true, runValidators: true }
    );
    if (!workout) return notFound();
    return NextResponse.json(workout);
  } catch {
    return NextResponse.json(
      { error: "Unable to update the workout." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.id) return unauthorized();

  const { id } = await params;
  if (!isValidObjectId(id)) return notFound();

  await connectDB();
  const workout = await Workout.findOneAndDelete({
    _id: id,
    userId: user.id,
  });
  if (!workout) return notFound();
  return NextResponse.json(workout);
}
