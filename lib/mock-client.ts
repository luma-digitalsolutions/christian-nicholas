import { DEMO_TURMAS } from "./store/demo";
import { norm } from "./normalize";
import type { LeadResult, PublicTurma, Turma } from "./types";

/**
 * MOCK SÓ NO FRONTEND. Enquanto não há banco, o formulário de turmas roda inteiro no navegador com
 * DEMO_TURMAS: nada vai ao servidor e nada é salvo. Para usar a API real, defina NEXT_PUBLIC_TURMAS_MOCK=false.
 * Não importa lib/leads/service (usa node:crypto), por isso a decisão é reimplementada de forma mínima.
 */
export const USE_MOCK = process.env.NEXT_PUBLIC_TURMAS_MOCK !== "false";

const isOpen = (t: Turma) => t.status === "ATIVA" && t.vagas > 0;
const toPublic = (t: Turma): PublicTurma => ({
  id: t.id, bairro: t.bairro, nome: t.nome, local: t.local, dia: t.dia, inicio: t.inicio, fim: t.fim, status: t.status, aberta: isOpen(t),
});
const same = (a: string, b: string) => norm(a) === norm(b);
const alternativesFor = (bairro: string, excludeId?: string) =>
  DEMO_TURMAS.filter((t) => isOpen(t) && same(t.bairro, bairro) && t.id !== excludeId).map(toPublic);

export const mockCatalog = () => ({
  mode: "demo" as const,
  turmas: DEMO_TURMAS.filter((t) => t.status !== "INATIVA").map(toPublic),
  allowOtherBairro: true, allowInterestAnySlot: true, interestTimes: ["08:00", "10:00", "14:00", "18:00", "19:00", "20:00"],
});

interface MockLead { bairro: string; result: LeadResult }
const leads = new Map<string, MockLead>();

export function mockSubmit(b: { submissionId: string; bairro: string; dia: string; horario: string }): LeadResult {
  const prev = leads.get(b.submissionId);
  if (prev) return prev.result; // idempotente, como a API
  const slot = DEMO_TURMAS.filter((t) => same(t.bairro, b.bairro) && t.dia === b.dia && t.inicio === b.horario && t.status !== "INATIVA");
  const open = slot.find(isOpen);
  const full = !open && slot.some((t) => t.status === "LOTADA" || (t.status === "ATIVA" && t.vagas <= 0));
  const result: LeadResult = open
    ? { leadId: b.submissionId, outcome: "DISPONIVEL", status: "ENCAMINHADO", demo: true, turma: toPublic(open), alternativas: [] }
    : { leadId: b.submissionId, outcome: full ? "LOTADA" : "INDISPONIVEL", status: full ? "LISTA_ESPERA" : "AGUARDANDO_TURMA", demo: true, alternativas: alternativesFor(b.bairro) };
  leads.set(b.submissionId, { bairro: b.bairro, result });
  return result;
}

export function mockSelect(b: { leadId: string; turmaId: string }): LeadResult {
  const lead = leads.get(b.leadId);
  const t = DEMO_TURMAS.find((x) => x.id === b.turmaId);
  if (!lead || !t || !isOpen(t) || !same(t.bairro, lead.bairro)) throw new Error("Essa turma não está mais disponível.");
  const result: LeadResult = { leadId: b.leadId, outcome: "DISPONIVEL", status: "ENCAMINHADO", demo: true, turma: toPublic(t), alternativas: [] };
  leads.set(b.leadId, { ...lead, result });
  return result;
}
