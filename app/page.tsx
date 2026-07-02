"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

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

type QueueLevel = "low" | "medium" | "high";

function getQueueLevel(people: number): QueueLevel {
  if (people <= 5) return "low";
  if (people <= 15) return "medium";
  return "high";
}

const levelConfig: Record<QueueLevel, { label: string; bar: string; text: string }> = {
  low: { label: "Poca espera", bar: "bg-emerald-500", text: "text-emerald-600" },
  medium: { label: "Espera moderada", bar: "bg-amber-500", text: "text-amber-600" },
  high: { label: "Mucha espera", bar: "bg-red-500", text: "text-red-600" },
};

function shuffleTimes(data: Entity[]): Entity[] {
  const minutes = [1, 2, 3, 4, 5, 2, 3, 1, 4, 6];
  return data.map((e, i) => ({
    ...e,
    lastUpdatedMinutesAgo: minutes[i % minutes.length],
    peopleWaiting: Math.max(0, e.peopleWaiting + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)),
  }));
}

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>(MOCK_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setEntities(shuffleTimes(entities));
      setLastRefresh(new Date());
      setRefreshing(false);
    }, 600);
  }, [entities]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Zero Fila
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Estado de colas en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              En vivo
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-3 px-4 py-4">
        {entities.map((entity) => {
          const level = getQueueLevel(entity.peopleWaiting);
          const config = levelConfig[level];

          return (
            <Link
              key={entity.id}
              href={`/entidad/${entity.id}`}
              className="block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex">
                <div className={`w-1.5 flex-shrink-0 ${config.bar}`} />

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {entity.name}
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {entity.type}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {entity.peopleWaiting}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        en espera
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${config.text}`}>
                      {config.label} (~{entity.estimatedWaitMinutes} min)
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      Actualizado hace {entity.lastUpdatedMinutesAgo} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="sticky bottom-0 border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Ult. actualizacion: {lastRefresh.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
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
            {refreshing ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </footer>
    </div>
  );
}
