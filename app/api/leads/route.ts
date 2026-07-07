import { NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

const leads: Lead[] = [];

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const data = body as Partial<Lead>;
  if (
    !data.company ||
    !data.contactName ||
    !data.email ||
    !data.entityType ||
    !data.message
  ) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }
  if (!isEmail(data.email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  const lead: Lead = {
    company: String(data.company).slice(0, 120),
    contactName: String(data.contactName).slice(0, 120),
    email: String(data.email).slice(0, 200),
    phone: data.phone ? String(data.phone).slice(0, 40) : undefined,
    entityType: String(data.entityType).slice(0, 80),
    plan: data.plan ? String(data.plan).slice(0, 40) : "Starter",
    message: String(data.message).slice(0, 2000),
  };
  leads.push(lead);
  return NextResponse.json({ ok: true });
}
