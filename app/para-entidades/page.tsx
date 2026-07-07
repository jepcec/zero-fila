import Link from "next/link";
import type { Metadata } from "next";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LeadForm } from "./LeadForm";

export const metadata: Metadata = {
  title: "Para entidades",
  description:
    "Únete a Zero Fila y reduce el tiempo de espera de tus clientes. Cámaras con IA que cuentan tu fila en tiempo real.",
};

const BENEFITS = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Información en tiempo real",
    text: "Publica el estado de tu fila y evita aglomeraciones desde el primer minuto.",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Menos aglomeraciones",
    text: "Tus clientes llegan cuando hay espacio, mejorando la experiencia.",
  },
  {
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Detección automática con IA",
    text: "Cámaras con visión por computadora cuentan tu fila 24/7, sin operadores ni errores manuales.",
  },
  {
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    title: "Integración simple",
    text: "API REST y webhooks. Conecta con tu sistema de turnos en minutos.",
  },
];

const STEPS = [
  {
    n: 1,
    t: "Instala o conecta tus cámaras",
    d: "Usamos nuestras cámaras con IA o nos integramos a tu sistema existente (RTSP/ONVIF). Configuración en menos de 1 día.",
  },
  { n: 2, t: "Publicamos tu estado", d: "La IA cuenta las personas en cola y publica el estado en vivo." },
  {
    n: 3,
    t: "Tus clientes consultan",
    d: "Deciden cuándo ir, evitando esperas innecesarias y aglomeraciones.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "S/ 149",
    period: "/ mes",
    tag: "1 sede, hasta 5 cajas",
    hardware: "BYOC — usa tus cámaras",
    features: ["Panel básico", "Soporte por correo", "Actualización cada 5 min"],
    cta: "Elegir Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "S/ 399",
    period: "/ mes",
    tag: "Hasta 5 sedes",
    hardware: "Hardware de detección incluido",
    features: [
      "Panel avanzado",
      "Soporte prioritario",
      "Actualización en tiempo real",
      "Reportes",
    ],
    cta: "Elegir Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "A medida",
    period: "",
    tag: "Multi-sede + API",
    hardware: "Hardware dedicado + cámara propia",
    features: ["API dedicada", "SLA personalizado", "Gerente de cuenta", "Onboarding"],
    cta: "Contáctanos",
    highlight: false,
  },
];

const STATS = [
  { value: "98.4%", label: "Precisión" },
  { value: "< 1s", label: "Latencia" },
  { value: "24/7", label: "Automático" },
];

const COMPAT_BRANDS = ["Hikvision", "Dahua", "Axis", "Genérica ONVIF"];

export default function ParaEntidadesPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <section className="px-5 pt-8 pb-10 text-center bg-gradient-to-b from-indigo-50 to-background">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Para entidades
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Tus clientes llegan <span className="text-indigo-600">en el momento justo</span>
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-sm mx-auto">
            Zero Fila instala cámaras con IA —o se conecta a las que ya tienes— y muestra el
            conteo de tu fila en tiempo real. Reduce esperas y mejora la experiencia de tu
            entidad.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <a href="#contacto">
              <Button size="lg" fullWidth>
                Solicitar demo gratis
              </Button>
            </a>
            <Link href="/para-entidades/dashboard/1">
              <Button size="lg" fullWidth variant="secondary">
                Probar dashboard demo
              </Button>
            </Link>
          </div>
        </section>

        <section className="px-5 py-8">
          <h2 className="text-base font-bold text-slate-900">Beneficios</h2>
          <div className="mt-4 space-y-3">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="flex items-start gap-3 p-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-600">{b.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="px-5 py-8 bg-slate-50/60">
          <h2 className="text-base font-bold text-slate-900">Cómo funciona</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s) => (
              <li key={s.n} className="flex items-start gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
                  {s.n}
                </span>
                <div className="pt-0.5">
                  <h3 className="text-sm font-bold text-slate-900">{s.t}</h3>
                  <p className="text-xs text-slate-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-5 py-8">
          <div className="text-center">
            <h2 className="text-base font-bold text-slate-900">
              Visión por computadora que cuenta por ti
            </h2>
            <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
              Nuestra IA analiza el video de tu entrada y cuenta las personas en cola con
              precisión superior al 98%. Sin personal extra, sin errores manuales.
            </p>
          </div>

          <div className="mt-5">
            <CameraIllustration />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-100 bg-white px-3 py-4 text-center"
              >
                <p className="text-xl font-black text-indigo-600 tabular-nums">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Card className="mt-4 border-indigo-200 bg-indigo-50/60 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900">¿Ya tienes cámaras?</h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  Si tu entidad ya cuenta con un sistema de videovigilancia, lo integramos sin
                  reemplazar nada. Compatible con RTSP y los principales fabricantes del
                  mercado.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {COMPAT_BRANDS.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-white border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Link href="/para-entidades/dashboard/1" className="mt-3 block">
            <Button size="md" variant="secondary" fullWidth>
              Ver dashboard demo en vivo →
            </Button>
          </Link>
        </section>

        <section className="px-5 py-8">
          <h2 className="text-base font-bold text-slate-900">Planes</h2>
          <p className="mt-1 text-xs text-slate-500">Cancela cuando quieras. Sin permanencia.</p>
          <div className="mt-4 space-y-3">
            {PLANS.map((p) => (
              <Card
                key={p.name}
                className={[
                  "p-5",
                  p.highlight ? "border-indigo-500 ring-2 ring-indigo-100" : "",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                  {p.highlight && (
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Más elegido
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">{p.tag}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-500">{p.period}</span>
                </div>
                <p className="mt-1.5 text-[11px] font-semibold text-indigo-600">
                  {p.hardware}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="mt-4 block">
                  <Button variant={p.highlight ? "primary" : "secondary"} fullWidth>
                    {p.cta}
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section id="contacto" className="px-5 py-8">
          <h2 className="text-base font-bold text-slate-900">Contáctanos</h2>
          <p className="mt-1 text-xs text-slate-500">
            Te respondemos en menos de 24 horas.
          </p>
          <Card className="mt-4 p-5">
            <LeadForm />
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function CameraIllustration() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Cámara IA
          </span>
        </div>

        <svg
          viewBox="0 0 100 60"
          className="h-20 w-32 flex-shrink-0"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,30 L100,10" stroke="url(#beam)" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M0,30 L100,30" stroke="url(#beam)" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M0,30 L100,50" stroke="url(#beam)" strokeWidth="2" strokeDasharray="3 3" />
        </svg>

        <div className="flex flex-col gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={[
                "flex h-7 w-7 items-center justify-center rounded-lg",
                i === 0
                  ? "bg-emerald-500 text-white"
                  : i <= 1
                  ? "bg-amber-400 text-white"
                  : "bg-slate-200 text-slate-500",
              ].join(" ")}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] font-semibold text-slate-500">
        Entrada detectada · 4 personas en cola
      </p>
    </div>
  );
}
