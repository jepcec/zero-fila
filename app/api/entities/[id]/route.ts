import { NextResponse } from "next/server";
import { findSeed, mutate } from "@/lib/mock-data";
import type { EntityDetail } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const seed = findSeed(id);
  if (!seed) {
    return NextResponse.json({ error: "Entidad no encontrada" }, { status: 404 });
  }
  const peopleWaiting = mutate(seed.peopleWaiting, 2, 0, seed.capacity);
  const ratio = peopleWaiting / Math.max(1, seed.capacity);
  const estimatedWaitMinutes = Math.round(ratio * 60);
  const occupied = Math.min(seed.activeCounters, Math.ceil(peopleWaiting / 8));
  const data: EntityDetail = {
    id: seed.id,
    name: seed.name,
    type: seed.type,
    peopleWaiting,
    estimatedWaitMinutes,
    lastUpdatedAt: new Date().toISOString(),
    activeCounters: seed.activeCounters,
    occupiedCounters: occupied,
    capacity: seed.capacity,
    address: seed.address,
    hours: seed.hours,
  };
  return NextResponse.json(data);
}
