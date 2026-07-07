import type { QueueLevel } from "@/lib/types";
import { LEVEL_LABEL, LEVEL_STYLES } from "@/lib/format";

interface BadgeProps {
  level: QueueLevel;
  className?: string;
  showDot?: boolean;
}

export function Badge({ level, className = "", showDot = true }: BadgeProps) {
  const s = LEVEL_STYLES[level];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        s.bg,
        s.text,
        className,
      ].join(" ")}
    >
      {showDot && <span className={["h-1.5 w-1.5 rounded-full", s.dot].join(" ")} />}
      {LEVEL_LABEL[level]}
    </span>
  );
}
