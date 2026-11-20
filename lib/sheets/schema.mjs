// Estrutura oficial das abas. Usado pelo app e pelo script scripts/sheet.mjs
export const TAB_LEADS = "LEADS";
export const TAB_TURMAS = "TURMAS";
export const TAB_DEMANDA = "DEMANDA";

export const LEADS_HEADERS = [
  "lead_id", "data_cadastro", "nome", "whatsapp", "bairro_preferido", "dia_preferido",
  "horario_preferido", "turma_id", "status", "bairro_turma_selecionada", "dia_turma_selecionada",
  "horario_turma_selecionada", "encaminhado_em", "origem", "consentimento_privacidade",
  "consentimento_marketing", "versao_politica", "observacoes",
];

export const TURMAS_HEADERS = [
  "turma_id", "bairro", "nome_turma", "local", "dia_semana", "horario_inicio", "horario_fim",
  "capacidade", "vagas_disponiveis", "status", "link_whatsapp", "observacoes",
];

export const DEMANDA_HEADERS = [
  "bairro", "dia", "horario", "interessados", "aguardando_turma", "encaminhados", "lista_espera",
];
