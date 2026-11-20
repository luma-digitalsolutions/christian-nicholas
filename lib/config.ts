export type DataMode = "demo" | "sheets";

export function getMode(): DataMode {
  const m = (process.env.DATA_MODE ?? "").toLowerCase();
  if (m === "sheets" || m === "demo") return m;
  // Sem DATA_MODE: demo só em desenvolvimento. Em produção, falha explícita (nada silencioso).
  if (process.env.NODE_ENV !== "production") return "demo";
  throw new Error("DATA_MODE não configurado (use 'demo' ou 'sheets').");
}

export const config = {
  allowOtherBairro: () => process.env.ALLOW_OTHER_BAIRRO !== "false",
  allowInterestAnySlot: () => process.env.ALLOW_INTEREST_ANY_SLOT !== "false",
  interestTimes: () => (process.env.INTEREST_TIMES ?? "08:00,10:00,14:00,18:00,19:00,20:00").split(",").map((s) => s.trim()).filter(Boolean),
  inviteSecret: () => process.env.INVITE_SECRET ?? (process.env.NODE_ENV !== "production" ? "dev-only-secret-change-me" : ""),
  origem: () => process.env.LEAD_ORIGEM ?? "landing-page",
};
