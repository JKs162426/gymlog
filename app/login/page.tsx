"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/FormField";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/dashboard",
      redirect: false,
    });
    if (result?.ok) window.location.assign("/dashboard");
    else {
      setError("The email or password is incorrect.");
      setPending(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-14">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">
          Welcome back
        </p>
        <h1 className="mt-2 text-4xl font-black">Log in</h1>
        <p className="mt-3 text-slate-600">
          Access your private workout history and training dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
          {error && (
            <p
              role="alert"
              className="rounded-2xl bg-rose-50 p-4 font-semibold text-rose-800"
            >
              {error}
            </p>
          )}
          <FormField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
          <button
            disabled={pending}
            className="rounded-full bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {pending ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          New to GymLog?{" "}
          <Link
            href="/register"
            className="font-bold text-emerald-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
