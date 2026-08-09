import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import WorkoutForm from "@/components/WorkoutForm";

export default async function NewWorkoutPage() {
  await requireUser();
  return (
    <PageShell
      eyebrow="New session"
      title="Log a workout"
      description="Record the exercises, working sets, repetitions, and weight from this session."
    >
      <div className="mx-auto max-w-4xl">
        <WorkoutForm />
      </div>
    </PageShell>
  );
}
