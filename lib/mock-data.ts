import type { EntityDetail } from "./types";

type Seed = EntityDetail;

const baseDate = new Date("2025-01-01T08:00:00Z").toISOString();

export const SEED: Seed[] = [
  {
    id: "1",
    name: "Banco de la Nación",
    type: "Entidad bancaria",
    peopleWaiting: 12,
    estimatedWaitMinutes: 28,
    lastUpdatedAt: baseDate,
    activeCounters: 4,
    occupiedCounters: 3,
    capacity: 50,
    address: "Av. Sol 123, Cusco",
    hours: "Lun–Vie 9:00–17:00",
  },
  {
    id: "2",
    name: "Hospital Regional",
    type: "Salud",
    peopleWaiting: 7,
    estimatedWaitMinutes: 18,
    lastUpdatedAt: baseDate,
    activeCounters: 3,
    occupiedCounters: 2,
    capacity: 30,
    address: "Av. Cultura 710, Cusco",
    hours: "Lun–Dom 24h (urgencias)",
  },
  {
    id: "3",
    name: "Municipalidad Provincial",
    type: "Trámites",
    peopleWaiting: 4,
    estimatedWaitMinutes: 10,
    lastUpdatedAt: baseDate,
    activeCounters: 5,
    occupiedCounters: 2,
    capacity: 40,
    address: "Plaza de Armas s/n, Cusco",
    hours: "Lun–Vie 8:00–16:00",
  },
  {
    id: "4",
    name: "Registro Civil",
    type: "Trámites",
    peopleWaiting: 15,
    estimatedWaitMinutes: 35,
    lastUpdatedAt: baseDate,
    activeCounters: 2,
    occupiedCounters: 2,
    capacity: 35,
    address: "Jr. San Andrés 245, Cusco",
    hours: "Lun–Vie 8:30–15:30",
  },
  {
    id: "5",
    name: "SUNAT Cusco",
    type: "Tributos",
    peopleWaiting: 9,
    estimatedWaitMinutes: 22,
    lastUpdatedAt: baseDate,
    activeCounters: 3,
    occupiedCounters: 1,
    capacity: 40,
    address: "Av. La Cultura 1500, Cusco",
    hours: "Lun–Vie 9:00–17:00",
  },
  {
    id: "6",
    name: "EPS Sedacusco",
    type: "Servicios",
    peopleWaiting: 0,
    estimatedWaitMinutes: 0,
    lastUpdatedAt: baseDate,
    activeCounters: 3,
    occupiedCounters: 0,
    capacity: 30,
    address: "Av. Industrial Lote 4, Cusco",
    hours: "Lun–Vie 8:00–17:00",
  },
];

export function getSeed(): Seed[] {
  return SEED.map((e) => ({ ...e }));
}

export function findSeed(id: string): Seed | undefined {
  return SEED.find((e) => e.id === id);
}

export function mutate(value: number, range: number, min = 0, max = Infinity): number {
  const delta = Math.floor(Math.random() * (range * 2 + 1)) - range;
  return Math.max(min, Math.min(max, value + delta));
}
