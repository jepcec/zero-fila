interface QueueGridProps {
  peopleWaiting: number;
  occupiedCounters?: number;
  activeCounters?: number;
  capacity?: number;
}

const MAX_VISIBLE = 20;
const NEXT = 2;

export function QueueGrid({
  peopleWaiting,
  occupiedCounters = 0,
  activeCounters = 0,
  capacity = 50,
}: QueueGridProps) {
  if (peopleWaiting === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-base font-bold text-slate-900">Sin cola</h3>
        <p className="mt-1 text-sm text-slate-600">
          Puedes ir directamente. {activeCounters > 0 && `${activeCounters} cajas disponibles.`}
        </p>
      </div>
    );
  }

  const visible = Math.min(peopleWaiting, MAX_VISIBLE);
  const hidden = peopleWaiting - visible;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: visible }).map((_, i) => {
          const pos = i + 1;
          const isAttending = pos <= occupiedCounters;
          const isNext = !isAttending && pos <= occupiedCounters + NEXT;
          const bg = isAttending
            ? "bg-emerald-500 text-white"
            : isNext
            ? "bg-amber-400 text-white"
            : "bg-slate-200 text-slate-500";
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  bg,
                ].join(" ")}
              >
                <UserIcon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold tabular-nums text-slate-400">
                {pos}
              </span>
            </div>
          );
        })}
        {hidden > 0 && (
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-xs font-bold">
              +{hidden}
            </div>
            <span className="text-[10px] font-semibold text-slate-400">más</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[11px] text-slate-600">
        <Legend color="bg-emerald-500" label="Atendiendo" />
        <Legend color="bg-amber-400" label="Próximo" />
        <Legend color="bg-slate-200" label="En espera" />
        <span className="ml-auto text-slate-400">
          {peopleWaiting} / {capacity} capacidad
        </span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={["h-2.5 w-2.5 rounded-full", color].join(" ")} />
      {label}
    </span>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
