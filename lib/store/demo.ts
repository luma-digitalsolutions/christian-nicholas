import type { LeadRecord, Store, Turma } from "../types";

// TURMAS FICTÍCIAS — apenas demonstração. Links não são reais.
const T = (id: string, bairro: string, dia: Turma["dia"], inicio: string, fim: string, vagas: number, status: Turma["status"]): Turma => ({
  id, bairro, nome: `[DEMO] Turma ${bairro}`, local: "Local fictício (demonstração)", dia, inicio, fim,
  capacidade: 20, vagas, status, link: `https://chat.whatsapp.com/DEMO-NAO-REAL-${id}`, observacoes: "demo",
});

// Cobre todos os desfechos do formulário: vaga disponível, lotada (lista de espera), planejada (sem turma
// aberta) e bairros com alternativas em outros dias. Bairros reais só como cenário; as turmas não existem.
export const DEMO_TURMAS: Turma[] = [
  T("DEMO-01", "Boa Viagem", "TER", "19:00", "20:00", 8, "ATIVA"),
  T("DEMO-02", "Boa Viagem", "QUI", "20:00", "21:00", 5, "ATIVA"),
  T("DEMO-03", "Boa Viagem", "SAB", "10:00", "11:00", 0, "LOTADA"),
  T("DEMO-04", "Casa Forte", "QUA", "19:00", "20:00", 12, "ATIVA"),
  T("DEMO-05", "Casa Forte", "SEX", "18:00", "19:00", 0, "PLANEJADA"),
  T("DEMO-06", "Espinheiro", "SEG", "20:00", "21:00", 14, "ATIVA"),
  T("DEMO-07", "Espinheiro", "SAB", "09:00", "10:00", 3, "ATIVA"),
  T("DEMO-08", "Graças", "QUI", "19:00", "20:00", 10, "ATIVA"),
  T("DEMO-09", "Graças", "SAB", "11:00", "12:00", 0, "LOTADA"),
  T("DEMO-10", "Tamarineira", "TER", "20:00", "21:00", 0, "LOTADA"),
  T("DEMO-11", "Tamarineira", "QUA", "18:00", "19:00", 0, "PLANEJADA"),
];

export function createDemoStore(): Store {
  const leads = new Map<string, LeadRecord>();
  return {
    mode: "demo",
    async listTurmas() { return DEMO_TURMAS.map((t) => ({ ...t })); },
    async findLead(id) { return leads.get(id) ?? null; },
    async findDuplicate(w, b, d, h) {
      return [...leads.values()].find((l) => l.whatsapp === w && l.bairro_preferido === b && l.dia_preferido === d && l.horario_preferido === h) ?? null;
    },
    async appendLead(r) { leads.set(r.lead_id, { ...r }); },
    async updateLead(id, p) { const c = leads.get(id); if (c) leads.set(id, { ...c, ...p }); },
  };
}
