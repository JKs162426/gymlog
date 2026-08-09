import Link from "next/link";

interface WorkoutCardProps {
  id: string;
  date: string;
  notes: string;
  exerciseCount: number;
}

export default function WorkoutCard({ id, date, notes, exerciseCount }: WorkoutCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-700">{date}</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">{notes || "Workout session"}</h2>
          <p className="mt-2 text-sm text-slate-500">{exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}</p>
        </div>
        <Link href={`/workouts/${id}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold hover:border-emerald-600 hover:text-emerald-700">
          View
        </Link>
      </div>
    </article>
  );
}
