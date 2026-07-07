import { NextResponse } from "next/server";
import { findSeed, mutate } from "@/lib/mock-data";
import type { DetectionEvent, EntityDashboard } from "@/lib/types";

export const dynamic = "force-dynamic";

const CAMERAS_BY_ID: Record<string, { name: string; brand: string }> = {
  "1": { name: "Entrada principal", brand: "Hikvision" },
  "2": { name: "Hall de admisión", brand: "Axis" },
  "3": { name: "Plataforma única", brand: "Dahua" },
  "4": { name: "Recepción", brand: "Genérica ONVIF" },
  "5": { name: "Ingreso 2do piso", brand: "Hikvision" },
  "6": { name: "Caja rápida", brand: "Genérica ONVIF" },
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const seed = findSeed(id);
  if (!seed) {
    return NextResponse.json({ error: "Entidad no encontrada" }, { status: 404 });
  }
  const peopleWaiting = mutate(seed.peopleWaiting, 3, 0, seed.capacity);
  const ratio = peopleWaiting / Math.max(1, seed.capacity);
  const estimatedWaitMinutes = Math.round(ratio * 60);

  const now = Date.now();
  const history = Array.from({ length: 12 }).map((_, i) => {
    const at = new Date(now - (11 - i) * 5 * 60_000).toISOString();
    const noise = Math.floor(Math.sin((i + seed.id.charCodeAt(0)) * 1.7) * 4);
    const value = Math.max(0, Math.min(seed.capacity, peopleWaiting + noise));
    return { at, peopleWaiting: value };
  });
  history[history.length - 1] = { at: new Date(now).toISOString(), peopleWaiting };

  const cam = CAMERAS_BY_ID[id] ?? { name: "Entrada principal", brand: "Genérica ONVIF" };

  const labels = ["Entrada", ...Array.from({ length: seed.activeCounters }, (_, i) => `Caja ${i + 1}`)];
  const eventKinds: DetectionEvent["kind"][] = ["detected", "served", "left"];
  const recentEvents: DetectionEvent[] = Array.from({ length: 10 }).map((_, i) => {
    const offsetSec = (10 - i) * 18 + Math.floor(Math.random() * 10);
    const kind = eventKinds[(i + seed.id.charCodeAt(0)) % eventKinds.length];
    return {
      id: `evt-${id}-${i}`,
      at: new Date(now - offsetSec * 1000).toISOString(),
      kind,
      label: labels[kind === "detected" ? 0 : 1 + (i % seed.activeCounters)],
    };
  });

  const detectionsToday = 80 + (seed.id.charCodeAt(0) * 7) % 120;
  const servedToday = Math.round(detectionsToday * 0.93);

  const data: EntityDashboard = {
    id: seed.id,
    name: seed.name,
    type: seed.type,
    peopleWaiting,
    estimatedWaitMinutes,
    lastUpdatedAt: new Date().toISOString(),
    activeCounters: seed.activeCounters,
    occupiedCounters: Math.min(seed.activeCounters, Math.ceil(peopleWaiting / 8)),
    capacity: seed.capacity,
    address: seed.address,
    hours: seed.hours,
    history,
    detection: {
      source: id === "6" ? "camera-zf" : "camera-existing",
      cameraName: `${cam.name} · ${cam.brand}`,
      active: true,
      precisionPct: 97 + (seed.id.charCodeAt(0) % 25) / 10,
      detectionsToday,
      servedToday,
      recentEvents,
    },
  };
  return NextResponse.json(data);
}
