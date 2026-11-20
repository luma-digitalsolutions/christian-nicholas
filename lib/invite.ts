import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 24 * 60 * 60 * 1000;
const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");

export function createInviteToken(secret: string, leadId: string, turmaId: string, now = Date.now()): string {
  if (!secret) throw new Error("INVITE_SECRET ausente");
  const payload = b64(JSON.stringify({ l: leadId, t: turmaId, e: now + TTL_MS }));
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyInviteToken(secret: string, token: string, now = Date.now()): { leadId: string; turmaId: string } | null {
  if (!secret || typeof token !== "string") return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof p.l !== "string" || typeof p.t !== "string" || typeof p.e !== "number" || p.e < now) return null;
    return { leadId: p.l, turmaId: p.t };
  } catch { return null; }
}
