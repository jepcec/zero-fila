"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { EntityCard } from "@/components/EntityCard";
import { Header } from "@/components/Header";
import { LiveIndicator } from "@/components/LiveIndicator";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { fetchEntities } from "@/lib/api";
import type { Entity } from "@/lib/types";

const REFRESH_MS = 60_000;

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const silent = async () => {
      try {
        const data = await fetchEntities();
        if (cancelled) return;
        setEntities(data);
        setLastSync(new Date());
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    silent();
    const id = setInterval(silent, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await fetchEntities();
      setEntities(data);
      setLastSync(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
      <Header />
      <div className="flex items-center justify-between px-5 pt-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Colas cerca de ti</h1>
          <p className="text-xs text-slate-500">Estado en tiempo real</p>
        </div>
        <LiveIndicator />
      </div>

      <div className="flex-1 space-y-2.5 px-5 py-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/3" />
              <div className="mt-3 flex justify-between">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          ))
        ) : error ? (
          <EmptyState
            title="No pudimos cargar las colas"
            description={error}
            action={
              <Button size="sm" onClick={handleRefresh}>
                Reintentar
              </Button>
            }
          />
        ) : entities.length === 0 ? (
          <EmptyState
            title="Aún no hay entidades"
            description="Cuando se registren entidades, aparecerán aquí."
          />
        ) : (
          entities.map((e) => <EntityCard key={e.id} entity={e} />)
        )}
      </div>

      <div className="border-t border-slate-100 bg-white px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            {lastSync
              ? `Sincronizado ${lastSync.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Sincronizando…"}
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshIcon className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Actualizando" : "Actualizar"}
          </Button>
        </div>
      </div>

      <BottomNav />
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
