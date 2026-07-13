import { NextResponse } from "next/server";
import { getBackendUrl, proxyJson } from "@/lib/backend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const base = getBackendUrl();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido" },
      { status: 400 },
    );
  }
  return proxyJson(`${base}/v1/leads`, "POST", body, "No se pudo enviar el formulario");
}
