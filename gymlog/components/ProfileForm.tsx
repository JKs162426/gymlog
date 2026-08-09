"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FormField } from "@/components/FormField";

export default function ProfileForm({ initialName, initialEmail }: { initialName: string; initialEmail: string }) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const result = (await response.json()) as { error?: string };
    setPending(false);
    setMessage(response.ok ? "Profile updated." : result.error ?? "Unable to update the profile.");
  }

  async function deleteAccount() {
    if (!window.confirm("Delete your account and every workout? This cannot be undone.")) return;
    setPending(true);
    const response = await fetch("/api/profile", { method: "DELETE" });
    if (response.ok) await signOut({ callbackUrl: "/" });
    else {
      setMessage("Unable to delete the account.");
      setPending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
      <form onSubmit={updateProfile} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black">Account details</h2>
        {message && <p role="status" className="rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-900">{message}</p>}
        <FormField label="Display name" name="name" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
        <FormField label="Email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button disabled={pending} className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-60">Save profile</button>
      </form>
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="text-xl font-black text-rose-950">Delete account</h2>
        <p className="mt-2 leading-7 text-rose-900">Permanently removes your profile and all workout history.</p>
        <button type="button" disabled={pending} onClick={deleteAccount} className="mt-5 rounded-full border border-rose-700 px-5 py-2.5 font-bold text-rose-800 hover:bg-rose-100 disabled:opacity-60">Delete my account</button>
      </section>
    </div>
  );
}
