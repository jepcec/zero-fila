import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatRelative, queueLevel } from "@/lib/format";
import type { Entity } from "@/lib/types";

interface EntityCardProps {
  entity: Entity;
}

export function EntityCard({ entity }: EntityCardProps) {
  const level = queueLevel(entity.peopleWaiting);
  return (
    <Link
      href={`/entidad/${entity.id}`}
      className="block transition-transform active:scale-[0.99]"
    >
      <Card className="flex items-center gap-4 p-4 hover:shadow-md hover:shadow-slate-200/60 transition-shadow">
        <div className="flex-1 min-w-0">
          <h2 className="truncate text-[15px] font-bold text-slate-900">{entity.name}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{entity.type}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3 w-3 flex-shrink-0"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">
              {entity.city} · {entity.region}
            </span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge level={level} />
            <span className="text-[11px] text-slate-400">
              {formatRelative(entity.lastUpdatedAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black tabular-nums text-slate-900">
            {entity.peopleWaiting}
          </span>
          <span className="text-[11px] text-slate-500">en espera</span>
          {entity.peopleWaiting > 0 && (
            <span className="mt-1 text-[11px] font-semibold text-indigo-600">
              ~{entity.estimatedWaitMinutes} min
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}
