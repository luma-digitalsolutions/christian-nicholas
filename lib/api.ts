import { NextResponse } from "next/server";
import { config } from "./config";
import { ServiceError, StoreError } from "./types";

export const deps = async () => {
  const { getStore } = await import("./store");
  const secret = config.inviteSecret();
  if (!secret) throw new StoreError("NOT_CONFIGURED", "INVITE_SECRET ausente.");
  return { store: getStore(), secret, origem: config.origem() };
};

export function errorResponse(e: unknown) {
  if (e instanceof ServiceError) {
    const status = e.code === "NOT_FOUND" ? 404 : e.code === "UNAVAILABLE_SLOT" ? 409 : 400;
    return NextResponse.json({ error: e.message }, { status });
  }
  console.error("[api] falha:", e instanceof Error ? e.message : "desconhecida");
  return NextResponse.json({ error: "Não foi possível concluir o cadastro agora. Seus dados não foram salvos. Tente novamente em instantes." }, { status: 503 });
}
