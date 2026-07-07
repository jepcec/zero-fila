"use client";

import { useActionState, useState } from "react";
import { submitLeadAction, type LeadState } from "./actions";
import { Button } from "@/components/ui/Button";

const ENTITY_TYPES = [
  "Entidad bancaria",
  "Salud",
  "Municipalidad / Trámites",
  "Retail / Tienda",
  "Educación",
  "Otro",
];

const PLANS = [
  { id: "starter", name: "Starter", price: "S/ 149", tag: "1 sede, hasta 5 cajas" },
  { id: "pro", name: "Pro", price: "S/ 399", tag: "Hasta 5 sedes" },
  { id: "enterprise", name: "Enterprise", price: "A medida", tag: "Multi-sede + API" },
];

const initial: LeadState = { ok: false };

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLeadAction, initial);
  const [plan, setPlan] = useState("starter");

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-base font-bold text-slate-900">¡Recibimos tu solicitud!</h3>
        <p className="mt-1 text-sm text-slate-600">
          Te contactaremos en menos de 24 horas para coordinar la demo.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="plan" value={plan} />

      <div className="grid grid-cols-2 gap-3">
        <Field label="Empresa" name="company" required />
        <Field label="Contacto" name="contactName" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Correo" name="email" type="email" required />
        <Field label="Teléfono (opcional)" name="phone" type="tel" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
          Tipo de entidad
        </label>
        <select
          name="entityType"
          required
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Selecciona…</option>
          {ENTITY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-600">Plan</label>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={[
                "rounded-xl border px-2 py-2 text-center text-[11px] font-semibold transition-colors",
                plan === p.id
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
              ].join(" ")}
            >
              <div className="text-sm font-bold">{p.name}</div>
              <div className="text-[10px] font-medium opacity-80">{p.price}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
          Cuéntanos sobre tu caso
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Sedes, número de cajas, dolor principal…"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
          {state.error}
        </p>
      )}

      <Button type="submit" fullWidth size="lg" disabled={pending}>
        {pending ? "Enviando…" : "Solicitar demo"}
      </Button>
      <p className="text-center text-[11px] text-slate-400">
        Al enviar aceptas que te contactemos por los medios brindados.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}
