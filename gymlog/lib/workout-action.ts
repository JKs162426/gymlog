"use server";

import { connectDB } from "./mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface WorkoutData {
  date?: string;
  notes?: string;
}

export async function updateWorkout(id: string, formData: FormData) {
  await connectDB();
  const { Workout } = await import("./models");

  const data: WorkoutData = {
    date: formData.get("date") as string,
    notes: formData.get("notes") as string,
  };

  await Workout.findByIdAndUpdate(id, data, { new: true });

  revalidatePath("/workouts");
  redirect(`/workouts/${id}`);
}

export async function deleteWorkout(id: string) {
  await connectDB();
  const { Workout } = await import("./models");

  await Workout.findByIdAndDelete(id);

  revalidatePath("/workouts");
  redirect("/workouts");
}
