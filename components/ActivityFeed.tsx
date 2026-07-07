"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EventIcon, KIND_LABEL } from "@/components/EventIcon";
import type { DetectionEvent, DetectionEventKind } from "@/lib/types";

const MAX_EVENTS = 30;
const MIN_INTERVAL = 3000;
const MAX_INTERVAL = 5000;

interface ActivityFeedProps {
  initialEvents: DetectionEvent[];
  peopleWaiting: number;
  capacity: number;
}

function pickKind(peopleWaiting: number): DetectionEventKind {
  if (peopleWaiting === 0) return Math.random() < 0.7 ? "detected" : "left";
  if (peopleWaiting < 5) return Math.random() < 0.55 ? "detected" : "served";
  return Math.random() < 0.6 ? "served" : "detected";
}

function newId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function ActivityFeed({
  initialEvents,
  peopleWaiting,
  capacity,
}: ActivityFeedProps) {
  const [events, setEvents] = useState<DetectionEvent[]>(initialEvents);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    let cancelled = false;
    const schedule = () => {
      const delay = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
      const t = setTimeout(() => {
        if (cancelled) return;
        setEvents((prev) => {
          const kind = pickKind(peopleWaiting);
          const label = kind === "detected" ? "Entrada" : `Caja ${1 + (prev.length % 3)}`;
          const next: DetectionEvent = {
            id: newId(),
            at: new Date().toISOString(),
            kind,
            label,
          };
          return [next, ...prev].slice(0, MAX_EVENTS);
        });
        schedule();
      }, delay);
      return () => clearTimeout(t);
    };
    const cleanup = schedule();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [paused, peopleWaiting, capacity]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [events.length]);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">Actividad reciente</h2>
          {!paused && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              En vivo
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Reanudar feed" : "Pausar feed"}
        >
          {paused ? (
            <>
              <PlayIcon /> Reanudar
            </>
          ) : (
            <>
              <PauseIcon /> Pausar
            </>
          )}
        </Button>
      </div>

      <div
        ref={listRef}
        className="mt-3 h-64 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50"
      >
        {events.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Sin actividad aún
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {events.map((e) => (
              <li key={e.id} className="flex items-center gap-3 bg-white px-3 py-2.5">
                <EventIcon kind={e.kind} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900">
                    {KIND_LABEL[e.kind]}
                    <span className="ml-1 font-normal text-slate-500">· {e.label}</span>
                  </p>
                </div>
                <time className="text-[10px] tabular-nums text-slate-400">
                  {formatTime(e.at)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.03A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
    </svg>
  );
}
