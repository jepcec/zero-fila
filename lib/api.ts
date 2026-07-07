import type { Entity, EntityDetail, EntityDashboard, Lead } from "./types";

const BASE = "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function fetchEntities(): Promise<Entity[]> {
  return request<Entity[]>("/api/entities");
}

export function fetchEntity(id: string): Promise<EntityDetail> {
  return request<EntityDetail>(`/api/entities/${id}`);
}

export function fetchEntityDashboard(id: string): Promise<EntityDashboard> {
  return request<EntityDashboard>(`/api/entities/${id}/dashboard`);
}

export function submitLead(lead: Lead): Promise<{ ok: true }> {
  return request<{ ok: true }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(lead),
  });
}
