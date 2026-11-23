import { z } from "zod";
import { POLICY_VERSION } from "./validation";

export const inscricaoSchema = z.object({
  submissionId: z.uuid("Identificador inválido."),
  email: z.string().trim().min(1, "Informe seu e-mail.").max(254, "E-mail muito longo.")
    .pipe(z.email("Informe um e-mail válido.")),
  consentimentoPrivacidade: z.literal(true, { error: "É necessário aceitar a Política de Privacidade." }),
  consentimentoEmails: z.boolean().default(false),
  origem: z.string().max(60).optional(),
  website: z.string().max(0).optional(), // honeypot
  startedAt: z.number().optional(),
});
export type InscricaoInput = z.infer<typeof inscricaoSchema>;

export class InscricaoError extends Error {
  constructor(public code: "NOT_CONFIGURED" | "UPSTREAM", message: string) { super(message); }
}

/**
 * PONTO DE INTEGRAÇÃO PENDENTE.
 * Ainda não há sistema de inscrições (e-mail/CRM/planilha) definido para o evento. Enquanto
 * INSCRICAO_WEBHOOK_URL não existir, nada é enviado e a API responde 503: não simulamos sucesso.
 * Quando houver destino, aponte a variável para um endpoint que aceite este JSON via POST.
 */
export async function enviarInscricao(input: InscricaoInput, evento: string): Promise<void> {
  const url = process.env.INSCRICAO_WEBHOOK_URL;
  if (!url) throw new InscricaoError("NOT_CONFIGURED", "INSCRICAO_WEBHOOK_URL ausente.");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.INSCRICAO_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.INSCRICAO_WEBHOOK_TOKEN}`;
  const res = await fetch(url, {
    method: "POST", headers, cache: "no-store", signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      evento, submissionId: input.submissionId, email: input.email.toLowerCase(),
      consentimentoPrivacidade: true, consentimentoEmails: input.consentimentoEmails,
      politicaVersao: POLICY_VERSION, origem: input.origem ?? "inscricao", enviadoEm: new Date().toISOString(),
    }),
  }).catch(() => { throw new InscricaoError("UPSTREAM", "Falha de rede no destino."); });
  if (!res.ok) throw new InscricaoError("UPSTREAM", `Destino respondeu ${res.status}.`);
}
