import { type HTMLAttributes, type ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={[
        "rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
