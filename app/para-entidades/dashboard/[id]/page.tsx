"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DetectionStats } from "@/components/DetectionStats";
import { Header } from "@/components/Header";
import { QueueGrid } from "@/components/QueueGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { fetchEntityDashboard } from "@/lib/api";
import { formatRelative, queueLevel } from "@/lib/format";
import type { EntityDashboard } from "@/lib/types";

interface Counter {
  id: number;
  active: boolean;
}

export default function DashboardDemoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<EntityDashboard | null>(null);
  const [people, setPeople] = useState(0);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    const id = params.id;
    let cancelled = false;
    (async () => {
      try {
        const d = await fetchEntityDashboard(id);
        if (cancelled) return;
        setData(d);
        setPeople(d.peopleWaiting);
        setCounters(
          Array.from({ length: d.activeCounters }, (_, i) => ({
            id: i + 1,
            active: i < d.occupiedCounters,
          }))
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);

  if (loading || !data) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <Header showNav={false} />
        <div className="space-y-4 px-5 py-5">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="mt-6 h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const ratio = people / Math.max(1, data.capacity);
  const wait = Math.round(ratio * 60);
  const level = queueLevel(people, data.capacity);
  const points = data.history.map((h) => h.peopleWaiting);
  const maxV = Math.max(1, ...points, data.capacity);
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (v / maxV) * 100;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const adjust = (delta: number) => {
    setPeople((p) => Math.max(0, Math.min(data.capacity, p + delta)));
  };
  const toggleCounter = (id: number) => {
    setCounters((cs) => cs.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };
  const reset = () => setPeople(data.peopleWaiting);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
      <Header showNav={false} />
      <div className="flex items-center gap-2 px-5 pt-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          aria-label="Volver"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Admin demo
        </span>
      </div>

      <div className="space-y-4 px-5 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{data.name}</h1>
          <p className="text-sm text-slate-500">
            {data.type} · <span className="text-indigo-600">Modo demo</span>
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-50 to-white p-5">
            <div className="flex items-center justify-between">
              <Badge level={level} />
              {data.detection.active ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Detección en vivo
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  Desconectada
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-black tabular-nums text-slate-900">{people}</span>
              <span className="text-sm font-semibold text-slate-500">personas en espera</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Estimado: <span className="font-bold text-indigo-600">~{wait} min</span>
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Actualizado {formatRelative(data.lastUpdatedAt)}
            </p>
          </div>
        </Card>

        <DetectionStats detection={data.detection} lastUpdatedAt={data.lastUpdatedAt} />

        <ActivityFeed
          initialEvents={data.detection.recentEvents}
          peopleWaiting={people}
          capacity={data.capacity}
        />

        <Card className="p-5">
          <h2 className="text-sm font-bold text-slate-900">Fila actual</h2>
          <div className="mt-3">
            <QueueGrid
              peopleWaiting={people}
              occupiedCounters={data.occupiedCounters}
              activeCounters={data.activeCounters}
              capacity={data.capacity}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-bold text-slate-900">Cajas</h2>
          <p className="mt-0.5 text-[11px] text-slate-500">Toca para activar/desactivar</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {counters.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCounter(c.id)}
                className={[
                  "rounded-xl border p-3 text-center transition-colors",
                  c.active
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-400",
                ].join(" ")}
              >
                <div className="text-xs font-semibold">Caja {c.id}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide">
                  {c.active ? "Activa" : "Inactiva"}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-bold text-slate-900">Tendencia (últimos 60 min)</h2>
          <div className="mt-3 h-32">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${path} L100,100 L0,100 Z`} fill="url(#grad)" />
              <path
                d={path}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>-60 min</span>
            <span>ahora</span>
          </div>
        </Card>

        <details className="rounded-2xl border border-slate-200 bg-white">
          <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm font-bold text-slate-900">
            <span>Modo operador</span>
            <span className="text-[11px] font-normal text-slate-400">Ajuste manual</span>
          </summary>
          <div className="border-t border-slate-100 p-5">
            <p className="text-[11px] text-slate-500">
              La detección automática es la fuente principal. Usa estos controles solo para
              correcciones puntuales.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button variant="secondary" size="sm" onClick={() => adjust(-1)}>
                −1 Atendido
              </Button>
              <Button variant="secondary" size="sm" onClick={() => adjust(+1)}>
                +1 Nuevo
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                ↺ Reset
              </Button>
            </div>
          </div>
        </details>

        <Card className="p-5">
          <h2 className="text-sm font-bold text-slate-900">Información</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Dirección" value={data.address} />
            <Row label="Horario" value={data.hours} />
            <Row
              label="Cajas activas"
              value={`${counters.filter((c) => c.active).length} de ${counters.length}`}
            />
            <Row label="Origen detección" value={data.detection.cameraName} />
          </dl>
        </Card>

        <Link
          href={`/entidad/${data.id}`}
          className="block text-center text-xs font-semibold text-indigo-600 hover:underline"
        >
          Ver cómo lo ve el usuario →
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="text-right text-sm text-slate-900">{value}</dd>
    </div>
  );
}
