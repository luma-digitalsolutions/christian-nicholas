import { NextResponse } from "next/server";
import { deps } from "@/lib/api";
import { verifyInviteToken } from "@/lib/invite";
import { isOpen } from "@/lib/leads/service";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const H = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };
const gone = () => new NextResponse("Convite indisponível ou expirado. Refaça sua busca pela turma no site.", { status: 404, headers: H });

/** Só redireciona ao grupo com token assinado + lead registrado + turma ainda aberta. */
export async function GET(req: Request) {
  if (!rateLimit(`inv:${clientIp(req)}`, 20, 60_000)) return new NextResponse("Muitas tentativas.", { status: 429 });
  try {
    const d = await deps();
    const tok = verifyInviteToken(d.secret, new URL(req.url).searchParams.get("t") ?? "");
    if (!tok) return gone();
    const [lead, turmas] = await Promise.all([d.store.findLead(tok.leadId), d.store.listTurmas({ fresh: true })]);
    const turma = turmas.find((t) => t.id === tok.turmaId);
    if (!lead || lead.status !== "ENCAMINHADO" || lead.turma_id !== tok.turmaId || !turma || !isOpen(turma)) return gone();
    const target = d.store.mode === "demo" ? new URL("/demo-convite", req.url).toString() : turma.link;
    return NextResponse.redirect(target, { status: 302, headers: H });
  } catch { return new NextResponse("Serviço indisponível. Tente novamente em instantes.", { status: 503, headers: H }); }
}
