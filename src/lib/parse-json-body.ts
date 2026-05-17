const DEFAULT_MAX_BYTES = 12_000;

export async function parseJsonBody(
  request: Request,
  maxBytes = DEFAULT_MAX_BYTES,
): Promise<{ ok: true; data: unknown } | { ok: false; response: Response }> {
  const raw = await request.text();
  if (raw.length > maxBytes) {
    return {
      ok: false,
      response: Response.json(
        { error: "Cuerpo de solicitud demasiado grande." },
        { status: 413 },
      ),
    };
  }
  if (!raw.trim()) {
    return {
      ok: false,
      response: Response.json({ error: "JSON inválido." }, { status: 400 }),
    };
  }
  try {
    return { ok: true, data: JSON.parse(raw) as unknown };
  } catch {
    return {
      ok: false,
      response: Response.json({ error: "JSON inválido." }, { status: 400 }),
    };
  }
}
