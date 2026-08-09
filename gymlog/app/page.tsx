import Link from "next/link";

const featureCards = [
  {
    title: "Log focused sessions",
    description:
      "Capture the date, notes, and key exercises for each workout without fighting a bloated interface.",
  },
  {
    title: "Track useful details",
    description:
      "Record sets, reps, and weight so each training session has the numbers needed for progress.",
  },
  {
    title: "Review recent work",
    description:
      "Use the dashboard and workout history pages to see your latest sessions in reverse chronological order.",
  },
];

const workflowSteps = [
  "Create an account",
  "Add a workout session",
  "Review progress over time",
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-700">
            Simple training tracker
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Keep your workout log clear, fast, and focused.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            GymLog helps gym-goers record training sessions, track exercise
            volume, and return to past workouts without the clutter of a
            full-scale fitness platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Create account
            </Link>
            <Link
              href="/workouts/new"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Log a workout
            </Link>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold text-emerald-300">Today&apos;s focus</p>
            <h2 className="mt-3 text-3xl font-black">Push Day</h2>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-3">
                <dt className="text-xs text-slate-300">Exercises</dt>
                <dd className="mt-1 text-2xl font-bold">5</dd>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <dt className="text-xs text-slate-300">Sets</dt>
                <dd className="mt-1 text-2xl font-bold">18</dd>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <dt className="text-xs text-slate-300">PRs</dt>
                <dd className="mt-1 text-2xl font-bold">2</dd>
              </div>
            </dl>
          </div>
          <ol className="mt-6 space-y-3">
            {workflowSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                  {index + 1}
                </span>
                <span className="font-semibold text-slate-800">{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 md:grid-cols-3">
          {featureCards.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-slate-950">{feature.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
