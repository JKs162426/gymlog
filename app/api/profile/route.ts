import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User, Workout } from "@/lib/models";
import { getCurrentUser } from "@/lib/session";
import { validateProfile } from "@/lib/validation";

function unauthorized() {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}

export async function GET() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser?.id) return unauthorized();

  await connectDB();
  const user = await User.findById(sessionUser.id).select("name email createdAt").lean();
  if (!user) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const sessionUser = await getCurrentUser();
  if (!sessionUser?.id) return unauthorized();

  try {
    const validated = validateProfile(await request.json());
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await connectDB();
    const duplicate = await User.exists({
      email: validated.data.email,
      _id: { $ne: sessionUser.id },
    });
    if (duplicate) {
      return NextResponse.json({ error: "An account already uses this email." }, { status: 409 });
    }

    const user = await User.findByIdAndUpdate(sessionUser.id, validated.data, {
      new: true,
      runValidators: true,
    }).select("name email createdAt");
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Unable to update the profile." }, { status: 500 });
  }
}

export async function DELETE() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser?.id) return unauthorized();

  await connectDB();
  await Promise.all([
    Workout.deleteMany({ userId: sessionUser.id }),
    User.findByIdAndDelete(sessionUser.id),
  ]);
  return NextResponse.json({ success: true });
}
