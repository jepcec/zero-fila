import { NextResponse } from "next/server";

export function getBackendUrl(): string {
  const url =
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:3001";
  return url.replace(/\/+$/, "");
}

export async function proxyGet(
  url: string,
  fallbackMessage: string,
): Promise<NextResponse> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "backend_unreachable", message: fallbackMessage, detail: String(e) },
      { status: 502 },
    );
  }
}

export async function proxyJson(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body: unknown,
  fallbackMessage: string,
): Promise<NextResponse> {
  try {
    const res = await fetch(url, {
      method,
      cache: "no-store",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "backend_unreachable", message: fallbackMessage, detail: String(e) },
      { status: 502 },
    );
  }
}
