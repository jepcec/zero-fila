import { getBackendUrl, proxyGet } from "@/lib/backend";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const base = getBackendUrl();
  return proxyGet(
    `${base}/v1/entities/${encodeURIComponent(id)}/dashboard`,
    `No se pudo obtener el dashboard de la entidad ${id}`,
  );
}
