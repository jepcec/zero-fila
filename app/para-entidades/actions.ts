"use server";

import { submitLead } from "@/lib/api";
import type { Lead } from "@/lib/types";

export interface LeadState {
  ok: boolean;
  error?: string;
}

export async function submitLeadAction(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  const lead: Lead = {
    company: String(formData.get("company") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    entityType: String(formData.get("entityType") ?? "").trim(),
    plan: String(formData.get("plan") ?? "Starter").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!lead.company || !lead.contactName || !lead.email || !lead.entityType || !lead.message) {
    return { ok: false, error: "Completa los campos obligatorios." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { ok: false, error: "Ingresa un correo válido." };
  }
  try {
    await submitLead(lead);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "No se pudo enviar el formulario.",
    };
  }
}
