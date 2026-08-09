import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function FormField({ label, hint, id, ...props }: FormFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="grid gap-2 font-semibold text-slate-800" htmlFor={fieldId}>
      {label}
      <input id={fieldId} {...props} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
      {hint && <span className="text-sm font-normal text-slate-500">{hint}</span>}
    </label>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({ label, id, ...props }: TextAreaFieldProps) {
  const fieldId = id ?? props.name;
  return (
    <label className="grid gap-2 font-semibold text-slate-800" htmlFor={fieldId}>
      {label}
      <textarea id={fieldId} {...props} className="min-h-28 rounded-2xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
    </label>
  );
}
