import type { QueueLevel } from "./types";

export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));
  if (diffSec < 45) return "hace un momento";
  const min = Math.round(diffSec / 60);
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return `hace ${d} d`;
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function queueLevel(people: number, capacity = 50): QueueLevel {
  if (people === 0) return "free";
  const ratio = people / capacity;
  if (ratio < 0.2) return "low";
  if (ratio < 0.5) return "medium";
  return "high";
}

export const LEVEL_LABEL: Record<QueueLevel, string> = {
  free: "Sin cola",
  low: "Poca espera",
  medium: "Espera moderada",
  high: "Cola larga",
};

export const LEVEL_STYLES: Record<
  QueueLevel,
  { dot: string; bg: string; text: string; ring: string }
> = {
  free: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  low: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  medium: {
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
  high: {
    dot: "bg-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
  },
};
