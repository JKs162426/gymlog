import Link from "next/link";
import EmptyState from "@/components/EmptyState";

export default function WorkoutNotFound() {
  return <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20"><EmptyState title="Workout not found" description="This workout does not exist or does not belong to your account." href="/workouts" action="Back to workouts" /><p className="mt-5 text-center"><Link href="/dashboard" className="font-bold text-emerald-700 hover:underline">Go to dashboard</Link></p></main>;
}
