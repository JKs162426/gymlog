import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { requireUser } from "@/lib/session";
import PageShell from "@/components/PageShell";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = { title: "Profile", description: "Manage your GymLog profile and account." };

export default async function ProfilePage() {
  const sessionUser = await requireUser();
  await connectDB();
  const user = await User.findById(sessionUser.id).select("name email").lean<{ name?: string; email: string } | null>();
  if (!user) return null;

  return (
    <PageShell eyebrow="Account" title="Your profile" description="Keep your account details current or remove your account and its workout history.">
      <ProfileForm initialName={user.name || sessionUser.name || "GymLog athlete"} initialEmail={user.email} />
    </PageShell>
  );
}
