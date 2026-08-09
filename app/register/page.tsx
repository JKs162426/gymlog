"use client";

export default function RegisterPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      alert("User saved successfully!");
      event.currentTarget.reset();
    } else {
      alert("Email already registered.");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
