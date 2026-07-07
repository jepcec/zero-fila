"use client";

interface CategoryChipsProps {
  types: string[];
  active: string;
  onChange: (type: string) => void;
  label?: string;
}

export function CategoryChips({ types, active, onChange, label }: CategoryChipsProps) {
  return (
    <div>
      {label && (
        <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      )}
      <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {types.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onChange(t)}
                aria-pressed={isActive}
                className={[
                  "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
