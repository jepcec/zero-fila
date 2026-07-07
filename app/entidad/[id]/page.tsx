"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { LiveIndicator } from "@/components/LiveIndicator";
import { QueueGrid } from "@/components/QueueGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { fetchEntity } from "@/lib/api";
import { formatRelative, formatTime, queueLevel } from "@/lib/format";
import type { EntityDetail } from "@/lib/types";

const REFRESH_MS = 60_000;

export default function EntityDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [entity, setEntity] = useState<EntityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    const id = params.id;
    let cancelled = false;
    const silent = async () => {
      try {
        const data = await fetchEntity(id);
        if (cancelled) return;
        setEntity(data);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    silent();
    const t = setInterval(silent, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [params]);

  const handleRefresh = async () => {
    if (!params?.id) return;
    const id = params.id;
    setRefreshing(true);
    setError(null);
    try {
      const data = await fetchEntity(id);
      setEntity(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <Header showNav={false} />
        <div className="space-y-4 px-5 py-5">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="mt-6 h-40 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-sm text-slate-600">{error ?? "Entidad no encontrada"}</p>
        <Button variant="secondary" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    );
  }

  const level = queueLevel(entity.peopleWaiting, entity.capacity);

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
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Detalle</span>
      </div>

      <div className="space-y-4 px-5 py-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">{entity.name}</h1>
              <p className="text-sm text-slate-500">{entity.type}</p>
            </div>
            <LiveIndicator />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-50 to-white p-5">
            <Badge level={level} />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-black tabular-nums text-slate-900">
                {entity.peopleWaiting}
              </span>
              <span className="text-sm font-semibold text-slate-500">en espera</span>
            </div>
            {entity.peopleWaiting > 0 && (
              <p className="mt-1 text-sm text-slate-600">
                Tiempo estimado:{" "}
                <span className="font-bold text-indigo-600">
                  ~{entity.estimatedWaitMinutes} min
                </span>
              </p>
            )}
            <p className="mt-2 text-[11px] text-slate-400">
              Actualizado {formatRelative(entity.lastUpdatedAt)} · {formatTime(entity.lastUpdatedAt)}
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Fila actual</h2>
          <QueueGrid
            peopleWaiting={entity.peopleWaiting}
            occupiedCounters={entity.occupiedCounters}
            activeCounters={entity.activeCounters}
            capacity={entity.capacity}
          />
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-bold text-slate-900">Información</h2>
          <dl className="space-y-2.5 text-sm">
            <Row label="Dirección" value={entity.address} />
            <Row label="Horario" value={entity.hours} />
            <Row
              label="Cajas activas"
              value={`${entity.occupiedCounters} de ${entity.activeCounters} ocupadas`}
            />
            <Row label="Capacidad" value={`${entity.capacity} personas`} />
          </dl>
        </Card>
      </div>

      <div className="border-t border-slate-100 bg-white px-5 py-3">
        <Button fullWidth variant="secondary" onClick={handleRefresh} disabled={refreshing}>
          <RefreshIcon className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Actualizando" : "Actualizar"}
        </Button>
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

function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={["h-4 w-4", className].join(" ")} stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
      />
    </svg>
  );
}
