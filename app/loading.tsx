export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14" aria-busy="true" aria-label="Loading page">
      <div className="animate-pulse space-y-5">
        <div className="h-4 w-36 rounded bg-emerald-200" />
        <div className="h-12 max-w-xl rounded-2xl bg-slate-200" />
        <div className="h-5 max-w-2xl rounded bg-slate-200" />
        <div className="grid gap-4 pt-8 md:grid-cols-2"><div className="h-40 rounded-3xl bg-slate-200" /><div className="h-40 rounded-3xl bg-slate-200" /></div>
      </div>
      <span className="sr-only">Loading GymLog content…</span>
    </main>
  );
}
