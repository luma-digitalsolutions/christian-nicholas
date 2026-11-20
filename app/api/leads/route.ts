import { NextResponse } from "next/server";
import { deps, errorResponse } from "@/lib/api";
import { submitLead } from "@/lib/leads/service";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { leadInputSchema } from "@/lib/validation";


export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 6, 60_000)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto." }, { status: 429 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requisição inválida." }, { status: 400 }); }
  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
  }
  // Bots: honeypot preenchido ou formulário enviado rápido demais
  if (parsed.data.startedAt && Date.now() - parsed.data.startedAt < 1500) {
    return NextResponse.json({ error: "Não foi possível enviar. Tente novamente." }, { status: 400 });
  }
  try {
    return NextResponse.json(await submitLead(parsed.data, await deps()), { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return errorResponse(e); }
}
