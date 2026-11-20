import { connection, NextResponse } from "next/server";
import { deps, errorResponse } from "@/lib/api";
import { config } from "@/lib/config";
import { toPublic } from "@/lib/leads/service";


export async function GET() {
  await connection();
  try {
    const { store } = await deps();
    const turmas = (await store.listTurmas()).filter((t) => t.status !== "INATIVA").map(toPublic);
    return NextResponse.json({
      mode: store.mode, turmas, allowOtherBairro: config.allowOtherBairro(),
      allowInterestAnySlot: config.allowInterestAnySlot(), interestTimes: config.interestTimes(),
    }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30" } });
  } catch (e) { return errorResponse(e); }
}
