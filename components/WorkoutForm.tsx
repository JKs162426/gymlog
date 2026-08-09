"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField, TextAreaField } from "@/components/FormField";
import type { ExerciseInput, WorkoutInput } from "@/lib/validation";

interface WorkoutFormProps {
  workoutId?: string;
  initialValue?: WorkoutInput;
}

const emptyExercise: ExerciseInput = { name: "", sets: 3, reps: 10, weight: 0 };

export default function WorkoutForm({ workoutId, initialValue }: WorkoutFormProps) {
  const router = useRouter();
  const [date, setDate] = useState(initialValue?.date ?? new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState(initialValue?.notes ?? "");
  const [exercises, setExercises] = useState<ExerciseInput[]>(initialValue?.exercises ?? [{ ...emptyExercise }]);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  function updateExercise(index: number, field: keyof ExerciseInput, value: string) {
    setExercises((current) => current.map((exercise, exerciseIndex) => (
      exerciseIndex === index
        ? { ...exercise, [field]: field === "name" ? value : Number(value) }
        : exercise
    )));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const response = await fetch(workoutId ? `/api/workouts/${workoutId}` : "/api/workouts", {
      method: workoutId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, notes, exercises }),
    });
    const result = (await response.json()) as { _id?: string; error?: string };
    setPending(false);

    if (!response.ok) {
      setMessage(result.error ?? "Unable to save the workout.");
      return;
    }

    router.push(`/workouts/${result._id ?? workoutId}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {message && <p role="alert" className="rounded-2xl bg-rose-50 p-4 font-semibold text-rose-800">{message}</p>}
      <FormField label="Workout date" type="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      <TextAreaField label="Session notes" name="notes" value={notes} maxLength={500} onChange={(event) => setNotes(event.target.value)} placeholder="How did the session feel?" />

      <fieldset className="grid gap-4">
        <div className="flex items-center justify-between gap-4">
          <legend className="text-xl font-black text-slate-950">Exercises</legend>
          <button type="button" onClick={() => setExercises((current) => [...current, { ...emptyExercise }])} className="rounded-full border border-emerald-600 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50">
            Add exercise
          </button>
        </div>
        {exercises.map((exercise, index) => (
          <div key={index} className="grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-4">
            <div className="md:col-span-4 flex items-center justify-between">
              <p className="font-bold text-slate-700">Exercise {index + 1}</p>
              {exercises.length > 1 && (
                <button type="button" onClick={() => setExercises((current) => current.filter((_, exerciseIndex) => exerciseIndex !== index))} className="text-sm font-bold text-rose-700 hover:underline">
                  Remove
                </button>
              )}
            </div>
            <FormField label="Name" value={exercise.name} onChange={(event) => updateExercise(index, "name", event.target.value)} required />
            <FormField label="Sets" type="number" min="1" value={exercise.sets} onChange={(event) => updateExercise(index, "sets", event.target.value)} required />
            <FormField label="Reps" type="number" min="1" value={exercise.reps} onChange={(event) => updateExercise(index, "reps", event.target.value)} required />
            <FormField label="Weight (kg)" type="number" min="0" step="0.5" value={exercise.weight} onChange={(event) => updateExercise(index, "weight", event.target.value)} required />
          </div>
        ))}
      </fieldset>

      <button disabled={pending} type="submit" className="rounded-full bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Saving…" : workoutId ? "Save changes" : "Save workout"}
      </button>
    </form>
  );
}
