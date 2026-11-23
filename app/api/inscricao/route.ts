import { NextResponse } from "next/server";
import { EVENTO, INSCRICAO_ENCERRADA } from "@/content/inscricao";
import { enviarInscricao, InscricaoError, inscricaoSchema } from "@/lib/inscricao";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  if (INSCRICAO_ENCERRADA) return NextResponse.json({ error: "As inscrições estão encerradas." }, { status: 403, headers: NO_STORE });
  if (!rateLimit(`inscricao:${clientIp(req)}`, 6, 60_000)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto." }, { status: 429, headers: NO_STORE });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requisição inválida." }, { status: 400, headers: NO_STORE }); }
  const parsed = inscricaoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400, headers: NO_STORE });
  if (parsed.data.startedAt && Date.now() - parsed.data.startedAt < 1500) {
    return NextResponse.json({ error: "Não foi possível enviar. Tente novamente." }, { status: 400, headers: NO_STORE });
  }
  try {
    await enviarInscricao(parsed.data, EVENTO.nome);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (e) {
    const notConfigured = e instanceof InscricaoError && e.code === "NOT_CONFIGURED";
    console.error("[api/inscricao] falha:", e instanceof Error ? e.message : "desconhecida");
    return NextResponse.json({
      error: notConfigured
        ? "As inscrições ainda não estão disponíveis. Seus dados não foram salvos. Tente novamente mais tarde."
        : "Não foi possível concluir a inscrição agora. Seus dados não foram salvos. Tente novamente em instantes.",
    }, { status: 503, headers: NO_STORE });
  }
}
