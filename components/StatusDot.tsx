import { LEVEL_STYLES } from "@/lib/format";
import type { QueueLevel } from "@/lib/types";

interface StatusDotProps {
  level: QueueLevel;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
};

export function StatusDot({ level, size = "md" }: StatusDotProps) {
  return <span className={["rounded-full", LEVEL_STYLES[level].dot, SIZES[size]].join(" ")} />;
}
