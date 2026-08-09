"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
