import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workouts", label: "Workouts" },
  { href: "/workouts/new", label: "New Workout" },
  { href: "/profile", label: "Profile" },
];

export default async function AppHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="GymLog home">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-black text-white shadow-sm">
            G
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-950">
              GymLog
            </span>
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Simple workout tracking
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700" aria-label="Main navigation">
          {user && navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/register" className="rounded-full px-3 py-2 hover:bg-slate-100">
                Register
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-300 px-4 py-2 text-slate-950 transition hover:border-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Log in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
