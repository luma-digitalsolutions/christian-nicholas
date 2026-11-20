import { createInviteToken } from "../invite";
import { norm, WHATSAPP_INVITE } from "../normalize";
import { normalizePhone, POLICY_VERSION, sanitizeText, type LeadInput } from "../validation";
import { DIA_LABEL, ServiceError, type LeadRecord, type LeadResult, type PublicTurma, type Store, type Turma } from "../types";

export interface Deps { store: Store; secret: string; origem: string; now?: () => Date }

/** Turma só libera convite se ATIVA, com vagas e link de convite válido. */
export const isOpen = (t: Turma) => t.status === "ATIVA" && t.vagas > 0 && WHATSAPP_INVITE.test(t.link);

export const toPublic = (t: Turma): PublicTurma => ({
  id: t.id, bairro: t.bairro, nome: t.nome, local: t.local, dia: t.dia,
  inicio: t.inicio, fim: t.fim, status: t.status, aberta: isOpen(t),
});

export function formatRecife(d: Date): string {
  const p = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Recife", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(d);
  return p; // "2026-11-18 14:03:09"
}

const sameBairro = (a: string, b: string) => norm(a) === norm(b);

function alternativesFor(turmas: Turma[], bairro: string, excludeId?: string): PublicTurma[] {
  return turmas.filter((t) => isOpen(t) && sameBairro(t.bairro, bairro) && t.id !== excludeId).map(toPublic);
}

function resultFor(rec: LeadRecord, turmas: Turma[], deps: Deps): LeadResult {
  const demo = deps.store.mode === "demo";
  const alternativas = rec.status === "ENCAMINHADO" ? [] : alternativesFor(turmas, rec.bairro_preferido);
  if (rec.status === "ENCAMINHADO") {
    const t = turmas.find((x) => x.id === rec.turma_id);
    if (t && isOpen(t)) {
      return { leadId: rec.lead_id, outcome: "DISPONIVEL", status: "ENCAMINHADO", demo, turma: toPublic(t),
        inviteToken: createInviteToken(deps.secret, rec.lead_id, t.id), alternativas: [] };
    }
    // turma mudou depois do cadastro: não libera link
    return { leadId: rec.lead_id, outcome: "INDISPONIVEL", status: "ENCAMINHADO", demo, alternativas: alternativesFor(turmas, rec.bairro_preferido) };
  }
  return { leadId: rec.lead_id, outcome: rec.status === "LISTA_ESPERA" ? "LOTADA" : "INDISPONIVEL", status: rec.status, demo, alternativas };
}

export async function submitLead(input: LeadInput, deps: Deps): Promise<LeadResult> {
  const { store } = deps;
  const phone = normalizePhone(input.whatsapp);
  if (!phone) throw new ServiceError("INVALID", "WhatsApp inválido.");
  const bairro = sanitizeText(input.bairro, 80);

  // Idempotência: mesmo submissionId = mesmo lead (clique duplo, retry de rede)
  const existing = await store.findLead(input.submissionId);
  const turmas = await store.listTurmas({ fresh: true }); // nunca confiar em cache na hora de decidir
  if (existing) return resultFor(existing, turmas, deps);
  const dup = await store.findDuplicate(phone, bairro, input.dia, input.horario);
  if (dup) return resultFor(dup, turmas, deps);

  const slot = turmas.filter((t) => sameBairro(t.bairro, bairro) && t.dia === input.dia && t.inicio === input.horario && t.status !== "INATIVA");
  const open = slot.find(isOpen);
  const full = !open && slot.some((t) => t.status === "LOTADA" || (t.status === "ATIVA" && t.vagas <= 0));

  const now = (deps.now ?? (() => new Date()))();
  const base: LeadRecord = {
    lead_id: input.submissionId, data_cadastro: formatRecife(now), nome: sanitizeText(input.nome),
    whatsapp: phone, bairro_preferido: bairro, dia_preferido: input.dia, horario_preferido: input.horario,
    turma_id: "", status: "AGUARDANDO_TURMA", bairro_turma_selecionada: "", dia_turma_selecionada: "",
    horario_turma_selecionada: "", encaminhado_em: "", origem: sanitizeText(input.origem ?? deps.origem, 60) || deps.origem,
    consentimento_privacidade: "SIM", consentimento_marketing: input.consentimentoMarketing ? "SIM" : "NAO",
    versao_politica: POLICY_VERSION, observacoes: "",
  };
  if (open) Object.assign(base, selection(open, now, "ENCAMINHADO"));
  else if (full) base.status = "LISTA_ESPERA";

  await store.appendLead(base); // só depois de gravar é que o resultado existe
  return resultFor(base, turmas, deps);
}

function selection(t: Turma, now: Date, status: "ENCAMINHADO"): Partial<LeadRecord> {
  return { turma_id: t.id, status, bairro_turma_selecionada: t.bairro, dia_turma_selecionada: t.dia,
    horario_turma_selecionada: t.inicio, encaminhado_em: formatRecife(now) };
}

/** Lead escolheu outra turma sugerida. Mantém a preferência original no registro. */
export async function selectAlternative(leadId: string, turmaId: string, deps: Deps): Promise<LeadResult> {
  const rec = await deps.store.findLead(leadId);
  if (!rec) throw new ServiceError("NOT_FOUND", "Cadastro não encontrado.");
  const turmas = await deps.store.listTurmas({ fresh: true });
  if (rec.status === "ENCAMINHADO" && rec.turma_id === turmaId) return resultFor(rec, turmas, deps);
  const t = turmas.find((x) => x.id === turmaId);
  if (!t || !isOpen(t) || !sameBairro(t.bairro, rec.bairro_preferido)) {
    throw new ServiceError("UNAVAILABLE_SLOT", "Essa turma não está mais disponível.");
  }
  const patch = selection(t, (deps.now ?? (() => new Date()))(), "ENCAMINHADO");
  await deps.store.updateLead(leadId, patch);
  return resultFor({ ...rec, ...patch } as LeadRecord, turmas, deps);
}

export const slotLabel = (t: PublicTurma) => `${DIA_LABEL[t.dia]} às ${t.inicio}`;
