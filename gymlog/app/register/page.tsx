"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/FormField";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload = { name: formData.get("name"), email: formData.get("email"), password: formData.get("password") };
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(result.error ?? "Unable to create the account.");
      setPending(false);
      return;
    }
    await signIn("credentials", { email: payload.email, password: payload.password, callbackUrl: "/dashboard" });
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-14">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Start tracking</p>
        <h1 className="mt-2 text-4xl font-black">Create account</h1>
        <p className="mt-3 text-slate-600">Your workouts stay private and are only available after sign-in.</p>
        <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
          {error && <p role="alert" className="rounded-2xl bg-rose-50 p-4 font-semibold text-rose-800">{error}</p>}
          <FormField label="Display name" name="name" autoComplete="name" minLength={2} maxLength={60} required />
          <FormField label="Email" type="email" name="email" autoComplete="email" required />
          <FormField label="Password" type="password" name="password" autoComplete="new-password" minLength={8} hint="Use at least 8 characters." required />
          <button disabled={pending} className="rounded-full bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-60">{pending ? "Creating account…" : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-slate-600">Already registered? <Link href="/login" className="font-bold text-emerald-700 hover:underline">Log in</Link></p>
      </section>
    </main>
  );
}
