import type { Entity } from "./types";

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export const ALL = "Todos" as const;
export type AllValue = typeof ALL;

function uniqSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "es"));
}

export function uniqueTypes(entities: Entity[]): string[] {
  return [ALL, ...uniqSorted(entities.map((e) => e.type))];
}

export function uniqueRegions(entities: Entity[]): string[] {
  return [ALL, ...uniqSorted(entities.map((e) => e.region))];
}

export function uniqueCitiesInRegion(
  entities: Entity[],
  region: string
): string[] {
  const filtered =
    region === ALL ? entities : entities.filter((e) => e.region === region);
  return [ALL, ...uniqSorted(filtered.map((e) => e.city))];
}

export function filterEntities(
  entities: Entity[],
  query: string,
  activeType: string,
  activeRegion: string = ALL,
  activeCity: string = ALL
): Entity[] {
  const q = normalize(query);
  return entities.filter((e) => {
    if (activeType !== ALL && e.type !== activeType) return false;
    if (activeRegion !== ALL && e.region !== activeRegion) return false;
    if (activeCity !== ALL && e.city !== activeCity) return false;
    if (!q) return true;
    return (
      normalize(e.name).includes(q) ||
      normalize(e.type).includes(q) ||
      normalize(e.region).includes(q) ||
      normalize(e.city).includes(q)
    );
  });
}
