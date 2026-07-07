import { Card } from "@/components/ui/Card";
import { formatRelative } from "@/lib/format";
import type { EntityDashboard } from "@/lib/types";

interface DetectionStatsProps {
  detection: EntityDashboard["detection"];
  lastUpdatedAt: string;
}

export function DetectionStats({ detection, lastUpdatedAt }: DetectionStatsProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">Detección</h2>
        {detection.active ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Activa
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
            Desconectada
          </span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Stat label="Detecciones hoy" value={detection.detectionsToday.toString()} />
        <Stat label="Atenciones hoy" value={detection.servedToday.toString()} />
        <Stat label="Precisión" value={`${detection.precisionPct.toFixed(1)}%`} accent="indigo" />
        <Stat label="Última lectura" value={formatRelative(lastUpdatedAt)} />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="truncate">Cámara: {detection.cameraName}</span>
      </div>
    </Card>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "indigo";
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p
        className={[
          "mt-0.5 text-base font-black tabular-nums",
          accent === "indigo" ? "text-indigo-600" : "text-slate-900",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
