"use client";

export default function NewWorkoutPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: data.date,
        notes: data.notes,
        exercises: [
          {
            name: data.name,
            sets: Number(data.sets),
            reps: Number(data.reps),
            weight: Number(data.weight),
          },
        ],
      }),
    });
    if (response.ok) {
      alert("Workout saved successfully!");
      event.currentTarget.reset();
    } else {
      alert("Failed to save workout.");
    }
  };
  return (
    <div>
      <h1>New Workout</h1>
      <p>Create a new workout entry.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="date">Date:</label>
        <input type="date" name="date" id="date" required />

        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" required />

        <label htmlFor="sets">Sets:</label>
        <input type="number" name="sets" id="sets" required />

        <label htmlFor="reps">Repetitions:</label>
        <input type="number" name="reps" id="reps" required />

        <label htmlFor="weight">Weight:</label>
        <input type="number" name="weight" id="weight" required />

        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" id="notes" rows={4} required></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}
