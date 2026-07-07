import Link from "next/link";

interface HeaderProps {
  showNav?: boolean;
  variant?: "default" | "minimal";
}

export function Header({ showNav = true, variant = "default" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
            ZF
          </span>
          {variant === "default" && (
            <span className="text-sm font-bold tracking-tight text-slate-900">Zero Fila</span>
          )}
        </Link>
        {showNav && (
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Colas
            </Link>
            <Link
              href="/para-entidades"
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Entidades
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
