import { NextResponse } from "next/server";
import { getSeed, mutate } from "@/lib/mock-data";
import type { Entity } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const list: Entity[] = getSeed().map((e) => {
    const peopleWaiting = mutate(e.peopleWaiting, 3, 0, e.capacity);
    const ratio = peopleWaiting / Math.max(1, e.capacity);
    const estimatedWaitMinutes = Math.round(ratio * 60);
    return {
      id: e.id,
      name: e.name,
      type: e.type,
      region: e.region,
      city: e.city,
      peopleWaiting,
      estimatedWaitMinutes,
      lastUpdatedAt: new Date().toISOString(),
    };
  });
  return NextResponse.json(list);
}
