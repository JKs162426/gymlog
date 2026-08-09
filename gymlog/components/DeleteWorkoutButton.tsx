"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteWorkoutButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function deleteWorkout() {
    setPending(true);
    setError("");
    const response = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Unable to delete the workout.");
      setPending(false);
      return;
    }
    router.push("/workouts");
    router.refresh();
  }

  return (
    <div className="grid gap-3">
      {error && <p role="alert" className="text-sm font-semibold text-rose-700">{error}</p>}
      <button type="button" disabled={pending} onClick={deleteWorkout} className="rounded-full bg-rose-700 px-5 py-2.5 font-bold text-white hover:bg-rose-800 disabled:opacity-60">
        {pending ? "Deleting…" : "Yes, delete workout"}
      </button>
    </div>
  );
}
