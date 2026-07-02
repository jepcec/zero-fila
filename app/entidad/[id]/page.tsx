"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface Entity {
  id: string;
  name: string;
  type: string;
  peopleWaiting: number;
  estimatedWaitMinutes: number;
  lastUpdatedMinutesAgo: number;
}

const MOCK_DATA: Entity[] = [
  {
    id: "1",
    name: "Banco de la Nacion",
    type: "Entidad Bancaria",
    peopleWaiting: 23,
    estimatedWaitMinutes: 45,
    lastUpdatedMinutesAgo: 2,
  },
  {
    id: "2",
    name: "Hospital Regional",
    type: "Salud",
    peopleWaiting: 8,
    estimatedWaitMinutes: 20,
    lastUpdatedMinutesAgo: 5,
  },
  {
    id: "3",
    name: "Municipalidad Provincial",
    type: "Tramites",
    peopleWaiting: 4,
    estimatedWaitMinutes: 10,
    lastUpdatedMinutesAgo: 1,
  },
  {
    id: "4",
    name: "Registro Civil",
    type: "Tramites",
    peopleWaiting: 15,
    estimatedWaitMinutes: 30,
    lastUpdatedMinutesAgo: 3,
  },
];

type DotColor = "served" | "next" | "waiting";

const colorMap: Record<DotColor, string> = {
  served: "bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800",
  next: "bg-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800",
  waiting: "bg-zinc-300 dark:bg-zinc-600",
};

function getColor(position: number, total: number): DotColor {
  if (position <= 2 && position <= total) return "served";
  if (position <= 4) return "next";
  return "waiting";
}

function simulateChange(current: number): number {
  const delta = Math.floor(Math.random() * 5) - 2;
  return Math.max(0, current + delta);
}

export default function EntityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const entity = useMemo(() => MOCK_DATA.find((e) => e.id === id), [id]);

  const [peopleWaiting, setPeopleWaiting] = useState(entity?.peopleWaiting ?? 0);
  const [estimatedWait, setEstimatedWait] = useState(entity?.estimatedWaitMinutes ?? 0);
  const [lastUpdated, setLastUpdated] = useState(entity?.lastUpdatedMinutesAgo ?? 0);

  if (!entity) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 p-8 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Entidad no encontrada</p>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Volver
        </button>
      </div>
    );
  }

  const dots = Array.from({ length: peopleWaiting }, (_, i) => ({
    position: i + 1,
    color: getColor(i + 1, peopleWaiting),
  }));

  const servedDots = dots.filter((d) => d.color === "served");
  const queueDots = dots.filter((d) => d.color !== "served");

  const handleRefresh = () => {
    const newTotal = simulateChange(peopleWaiting);
    setPeopleWaiting(newTotal);
    setEstimatedWait(
      Math.max(1, Math.round(newTotal * (entity.estimatedWaitMinutes / entity.peopleWaiting)))
    );
    setLastUpdated(0);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={() => router.back()}
          className="mb-2 flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {entity.name}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{entity.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              En vivo
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            <strong className="tabular-nums text-zinc-900 dark:text-zinc-50">
              {peopleWaiting}
            </strong>{" "}
            en espera
          </span>
          <span>
            ~<strong className="tabular-nums text-zinc-900 dark:text-zinc-50">{estimatedWait}</strong>{" "}
            min
          </span>
          <span>
            Actualizado hace{" "}
            {lastUpdated === 0 ? (
              <strong className="tabular-nums text-emerald-600 dark:text-emerald-400">un momento</strong>
            ) : (
              <strong className="tabular-nums text-zinc-900 dark:text-zinc-50">{lastUpdated}</strong>
            )}{" "}
            {lastUpdated > 0 && "min"}
          </span>
        </div>
      </header>

      <div className="flex-1 py-8">
        <div className="overflow-x-auto pb-4">
          <div className="relative min-w-max">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-zinc-200 dark:bg-zinc-700" />

            <div className="relative z-10 flex items-center gap-5 px-6">
              <div className="flex flex-shrink-0 flex-col items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900">
                  <svg
                    className="h-4 w-4 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-zinc-400">ENTRADA</span>
              </div>

              <span className="flex-shrink-0 text-sm text-zinc-300 dark:text-zinc-600">
                &rarr;
              </span>

              {peopleWaiting === 0 ? (
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-2 dark:border-zinc-600">
                  <span className="text-xs text-zinc-400">Sin espera</span>
                </div>
              ) : (
                queueDots.map((dot) => (
                  <div
                    key={dot.position}
                    className="flex flex-shrink-0 flex-col items-center gap-1"
                  >
                    <div className={`h-5 w-5 rounded-full ${colorMap[dot.color]}`} />
                    <span className="text-[9px] tabular-nums text-zinc-400">
                      {dot.position}
                    </span>
                  </div>
                ))
              )}

              {peopleWaiting > 0 && (
                <div className="mx-2 h-14 w-px flex-shrink-0 bg-zinc-300 dark:bg-zinc-700" />
              )}

              <div className="flex flex-shrink-0 flex-col items-center gap-1">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 bg-white dark:bg-zinc-800 ${
                    servedDots.length >= 1
                      ? "border-emerald-300 dark:border-emerald-700"
                      : "border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {servedDots.length >= 1 ? (
                    <div className="h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800" />
                  ) : (
                    <span className="text-zinc-300 dark:text-zinc-600">&mdash;</span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-zinc-500">Caja 1</span>
              </div>

              <div className="flex flex-shrink-0 flex-col items-center gap-1">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 bg-white dark:bg-zinc-800 ${
                    servedDots.length >= 2
                      ? "border-emerald-300 dark:border-emerald-700"
                      : "border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {servedDots.length >= 2 ? (
                    <div className="h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800" />
                  ) : (
                    <span className="text-zinc-300 dark:text-zinc-600">&mdash;</span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-zinc-500">Caja 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-4 text-[10px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-emerald-500 ring-1 ring-emerald-200 dark:ring-emerald-800" />
            <span>Atendiendo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-indigo-500 ring-1 ring-indigo-200 dark:ring-indigo-800" />
            <span>Proximo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span>En espera</span>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={handleRefresh}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            />
          </svg>
          Actualizar
        </button>
      </footer>
    </div>
  );
}
