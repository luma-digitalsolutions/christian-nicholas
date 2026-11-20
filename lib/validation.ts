import { z } from "zod";
import { DIAS } from "./types";

export const POLICY_VERSION = "2026-11-v1";

/** Retorna "+55DDDNNNNNNNNN" ou null. Exige celular (WhatsApp). */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return null;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99 || d[1] === "0") return null;
  const first = d[2];
  if (d.length === 11 && first !== "9") return null;
  if (d.length === 10 && !"6789".includes(first)) return null;
  if (/^(\d)\1+$/.test(d.slice(2))) return null;
  return `+55${d}`;
}

export function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Remove caracteres de controle e gatilhos de fórmula no início. */
export function sanitizeText(s: string, max = 120): string {
  return s.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().replace(/^[=+\-@]+/, "").slice(0, max).trim();
}

export const leadInputSchema = z.object({
  submissionId: z.uuid("Identificador inválido."),
  nome: z.string().trim().min(1, "Informe seu nome completo.")
    .refine((v) => sanitizeText(v).split(" ").filter(Boolean).length >= 2, "Informe nome e sobrenome.")
    .refine((v) => v.length <= 120, "Nome muito longo."),
  whatsapp: z.string().min(1, "Informe seu WhatsApp.")
    .refine((v) => normalizePhone(v) !== null, "Informe um WhatsApp válido com DDD."),
  bairro: z.string().trim().min(2, "Escolha seu bairro.").max(80),
  dia: z.enum(DIAS, { error: "Escolha o dia da semana." }),
  horario: z.string().regex(/^\d{2}:\d{2}$/, "Escolha o horário."),
  consentimentoPrivacidade: z.literal(true, { error: "É necessário aceitar a Política de Privacidade." }),
  consentimentoMarketing: z.boolean().default(false),
  origem: z.string().max(60).optional(),
  website: z.string().max(0).optional(), // honeypot
  startedAt: z.number().optional(),
});
export type LeadInput = z.infer<typeof leadInputSchema>;

export const alternativaSchema = z.object({ leadId: z.uuid(), turmaId: z.string().min(1).max(60) });
