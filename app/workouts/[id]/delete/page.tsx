import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import DeleteWorkoutButton from "@/components/DeleteWorkoutButton";

export const metadata: Metadata = {
  title: "Delete workout",
  description: "Confirm removal of a saved workout.",
};

export default async function DeleteWorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();
  await connectDB();
  const workout = await Workout.findOne({ _id: id, userId: user.id })
    .select("date notes")
    .lean<{ date: Date; notes?: string } | null>();
  if (!workout) notFound();

  return (
    <PageShell
      eyebrow="Destructive action"
      title="Delete workout?"
      description="This permanently removes the session and cannot be undone."
    >
      <section className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black">
          {new Date(workout.date).toLocaleDateString()}
        </h2>
        <p className="mt-2 text-slate-600">
          {workout.notes || "Workout session"}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <DeleteWorkoutButton id={id} />
          <Link
            href={`/workouts/${id}`}
            className="rounded-full border border-slate-300 px-5 py-2.5 font-bold"
          >
            Cancel
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
