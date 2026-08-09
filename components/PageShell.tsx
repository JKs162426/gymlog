import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageShell({ eyebrow, title, description, actions, children }: PageShellProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">{eyebrow}</p>}
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </header>
        <div className="py-8">{children}</div>
      </div>
    </main>
  );
}
