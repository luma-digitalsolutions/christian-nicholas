import { randomUUID } from "node:crypto";
import { createDemoStore } from "@/lib/store/demo";
import type { Store, Turma } from "@/lib/types";
import type { LeadInput } from "@/lib/validation";

export const SECRET = "test-secret";
export const mkDeps = (store: Store) => ({ store, secret: SECRET, origem: "landing-page" });
export const input = (o: Partial<LeadInput> = {}): LeadInput => ({
  submissionId: randomUUID(), nome: "Maria Silva", whatsapp: "(81) 99999-1234", bairro: "Bairro Demo Centro",
  dia: "TER", horario: "19:00", consentimentoPrivacidade: true, consentimentoMarketing: false, ...o,
});
/** Store demo com turmas mutáveis, simulando edição da planilha. */
export function mutableStore(turmas: Turma[]): Store & { turmas: Turma[] } {
  const base = createDemoStore();
  return Object.assign(base, { turmas, listTurmas: async () => turmas.map((t) => ({ ...t })) });
}
export const turma = (o: Partial<Turma> = {}): Turma => ({
  id: "T1", bairro: "Bairro Demo Centro", nome: "Turma", local: "", dia: "TER", inicio: "19:00", fim: "20:00",
  capacidade: 20, vagas: 5, status: "ATIVA", link: "https://chat.whatsapp.com/ABCDEFGHIJKL", observacoes: "", ...o,
});
