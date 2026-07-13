import { getBackendUrl, proxyGet } from "@/lib/backend";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = getBackendUrl();
  return proxyGet(`${base}/v1/entities`, "No se pudo obtener el listado de entidades");
}
