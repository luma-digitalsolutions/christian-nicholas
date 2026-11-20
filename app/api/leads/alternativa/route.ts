import { NextResponse } from "next/server";
import { deps, errorResponse } from "@/lib/api";
import { selectAlternative } from "@/lib/leads/service";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { alternativaSchema } from "@/lib/validation";


export async function POST(req: Request) {
  if (!rateLimit(`alt:${clientIp(req)}`, 10, 60_000)) return NextResponse.json({ error: "Muitas tentativas." }, { status: 429 });
  const parsed = alternativaSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  try {
    return NextResponse.json(await selectAlternative(parsed.data.leadId, parsed.data.turmaId, await deps()), { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return errorResponse(e); }
}
