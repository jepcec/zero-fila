import type { DetectionEventKind } from "@/lib/types";

interface EventIconProps {
  kind: DetectionEventKind;
  className?: string;
}

const KIND_STYLE: Record<DetectionEventKind, { bg: string; text: string; path: string }> = {
  detected: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    path: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  served: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  left: {
    bg: "bg-slate-100",
    text: "text-slate-500",
    path: "M13 7a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1zm14-7l4-4m0 0l-4-4m4 4H9",
  },
  override: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    path: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7 7 0 007 7h2a8 8 0 008-8V9a1.5 1.5 0 00-3 0v2.5",
  },
};

const KIND_LABEL: Record<DetectionEventKind, string> = {
  detected: "Persona detectada",
  served: "Persona atendida",
  left: "Persona salió",
  override: "Ajuste manual",
};

export function EventIcon({ kind, className = "" }: EventIconProps) {
  const s = KIND_STYLE[kind];
  return (
    <span
      className={[
        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
        s.bg,
        className,
      ].join(" ")}
      aria-label={KIND_LABEL[kind]}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={["h-4 w-4", s.text].join(" ")}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
      </svg>
    </span>
  );
}

export { KIND_LABEL };
