import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-200",
  secondary:
    "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 active:bg-indigo-100",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200",
  danger: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth, className = "", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      {...rest}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT[variant],
        SIZE[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    />
  );
});
