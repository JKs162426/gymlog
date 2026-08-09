export interface ExerciseInput {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutInput {
  date: string;
  notes: string;
  exercises: ExerciseInput[];
}

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNonNegativeNumber(value: unknown) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function validateWorkout(value: unknown): ValidationResult<WorkoutInput> {
  if (!isRecord(value)) {
    return { success: false, error: "Workout data is required." };
  }

  const date = typeof value.date === "string" ? value.date.trim() : "";
  const notes = typeof value.notes === "string" ? value.notes.trim() : "";
  const exercises = Array.isArray(value.exercises) ? value.exercises : [];

  if (!date || Number.isNaN(Date.parse(date))) {
    return { success: false, error: "Enter a valid workout date." };
  }
  if (notes.length > 500) {
    return { success: false, error: "Notes must be 500 characters or fewer." };
  }
  if (exercises.length === 0 || exercises.length > 20) {
    return { success: false, error: "Add between 1 and 20 exercises." };
  }

  const normalized: ExerciseInput[] = [];
  for (const exercise of exercises) {
    if (!isRecord(exercise)) {
      return { success: false, error: "Each exercise must be complete." };
    }
    const name = typeof exercise.name === "string" ? exercise.name.trim() : "";
    const sets = asNonNegativeNumber(exercise.sets);
    const reps = asNonNegativeNumber(exercise.reps);
    const weight = asNonNegativeNumber(exercise.weight);

    if (!name || name.length > 80 || sets === null || reps === null || weight === null) {
      return { success: false, error: "Enter a valid name, sets, reps, and weight for every exercise." };
    }
    normalized.push({ name, sets, reps, weight });
  }

  return { success: true, data: { date, notes, exercises: normalized } };
}

export function validateProfile(value: unknown) {
  if (!isRecord(value)) return { success: false as const, error: "Profile data is required." };
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim().toLowerCase() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || name.length > 60) {
    return { success: false as const, error: "Name must be between 2 and 60 characters." };
  }
  if (!emailPattern.test(email)) {
    return { success: false as const, error: "Enter a valid email address." };
  }
  return { success: true as const, data: { name, email } };
}
