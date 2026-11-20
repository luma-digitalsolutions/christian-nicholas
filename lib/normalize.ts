import { DIAS, type Dia } from "./types";

export const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

const DIA_MAP: Record<string, Dia> = { seg: "SEG", ter: "TER", qua: "QUA", qui: "QUI", sex: "SEX", sab: "SAB", dom: "DOM" };
export function parseDia(raw: string): Dia | null {
  const up = raw.trim().toUpperCase();
  if ((DIAS as readonly string[]).includes(up)) return up as Dia;
  return DIA_MAP[norm(raw).slice(0, 3)] ?? null;
}

/** Aceita "19:00", "19h", "7:00 PM", "19:00:00" → "19:00" */
export function parseHora(raw: string): string | null {
  const m = norm(raw).match(/^(\d{1,2})(?:[:h](\d{2})?)?(?::\d{2})?\s*(am|pm)?$/);
  if (!m) return null;
  let h = Number(m[1]); const min = Number(m[2] ?? 0);
  if (m[3] === "pm" && h < 12) h += 12;
  if (m[3] === "am" && h === 12) h = 0;
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export const WHATSAPP_INVITE = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9_-]{10,}$/;
