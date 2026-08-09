"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-6 py-20">
      <section className="w-full rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-700">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-black">GymLog could not load this page.</h1>
        <p className="mt-3 text-slate-600">Your data has not been changed. Try the request again.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-full bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">Try again</button>
      </section>
    </main>
  );
}
