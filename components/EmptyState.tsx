import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  href?: string;
  action?: string;
}

export default function EmptyState({ title, description, href, action }: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-slate-600">{description}</p>
      {href && action && (
        <Link href={href} className="mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 font-bold text-white hover:bg-emerald-700">
          {action}
        </Link>
      )}
    </section>
  );
}
