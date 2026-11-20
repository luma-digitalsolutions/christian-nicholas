export const DIAS = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const;
export type Dia = (typeof DIAS)[number];
export const DIA_LABEL: Record<Dia, string> = {
  SEG: "Segunda-feira", TER: "Terça-feira", QUA: "Quarta-feira", QUI: "Quinta-feira",
  SEX: "Sexta-feira", SAB: "Sábado", DOM: "Domingo",
};

export type TurmaStatus = "ATIVA" | "LOTADA" | "PLANEJADA" | "INATIVA";
export type LeadStatus = "ENCAMINHADO" | "AGUARDANDO_TURMA" | "LISTA_ESPERA";

export interface Turma {
  id: string; bairro: string; nome: string; local: string; dia: Dia;
  inicio: string; fim: string; capacidade: number; vagas: number;
  status: TurmaStatus; link: string; observacoes: string;
}

/** Visão pública: nunca contém link nem número de vagas. */
export interface PublicTurma {
  id: string; bairro: string; nome: string; local: string; dia: Dia;
  inicio: string; fim: string; status: TurmaStatus; aberta: boolean;
}

export interface LeadRecord {
  lead_id: string; data_cadastro: string; nome: string; whatsapp: string;
  bairro_preferido: string; dia_preferido: string; horario_preferido: string;
  turma_id: string; status: LeadStatus; bairro_turma_selecionada: string;
  dia_turma_selecionada: string; horario_turma_selecionada: string; encaminhado_em: string;
  origem: string; consentimento_privacidade: string; consentimento_marketing: string;
  versao_politica: string; observacoes: string;
}

export type Outcome = "DISPONIVEL" | "INDISPONIVEL" | "LOTADA";
export interface LeadResult {
  leadId: string; outcome: Outcome; status: LeadStatus; demo: boolean;
  turma?: PublicTurma; inviteToken?: string; alternativas: PublicTurma[];
}

export class StoreError extends Error {
  constructor(public code: "UNAVAILABLE" | "NOT_CONFIGURED", message: string) { super(message); }
}
export class ServiceError extends Error {
  constructor(public code: "INVALID" | "NOT_FOUND" | "UNAVAILABLE_SLOT", message: string) { super(message); }
}

export interface Store {
  mode: "demo" | "sheets";
  listTurmas(opts?: { fresh?: boolean }): Promise<Turma[]>;
  findLead(leadId: string): Promise<LeadRecord | null>;
  findDuplicate(whatsapp: string, bairro: string, dia: string, horario: string): Promise<LeadRecord | null>;
  appendLead(rec: LeadRecord): Promise<void>;
  updateLead(leadId: string, patch: Partial<LeadRecord>): Promise<void>;
}
