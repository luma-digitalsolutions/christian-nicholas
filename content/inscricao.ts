// Configuração e textos da rota /inscricao. Para uma próxima edição, altere só este arquivo.
// Textos vêm do briefing; nada aqui foi inventado.

export const EVENTO = {
  nome: "DANCE COM CONFIANÇA",
  /** Início da aula, com fuso explícito (Brasília, UTC-3, sem horário de verão). */
  inicioISO: "2026-12-10T20:00:00-03:00",
  timeZone: "America/Sao_Paulo",
  dataLabel: "10 de dezembro de 2026",
  diaSemana: "quinta-feira",
  horaLabel: "20h — horário de Brasília",
  formato: "100% online",
  investimento: "Gratuito",
  /** Âncora do formulário. Todos os CTAs apontam para ela. */
  ancora: "formulario-inscricao",
} as const;

/** Inscrições encerradas somente por configuração (NEXT_PUBLIC_INSCRICAO_ENCERRADA=true). Nunca automático. */
export const INSCRICAO_ENCERRADA = process.env.NEXT_PUBLIC_INSCRICAO_ENCERRADA === "true";

export const CTA_HERO = "QUERO ME INSCREVER GRATUITAMENTE";
export const CTA_FORM = "QUERO ME INSCREVER";
export const CTA_HREF = `/inscricao#${EVENTO.ancora}`;

export const HERO = {
  titulo: "Aprenda a dançar com *confiança* em até 30 dias",
  descricao:
    "Uma aula onde vou te mostrar o caminho para aprender a dançar com confiança em até 30 dias. Mesmo que hoje você tenha vergonha, se sinta sem jeito ou acredite que não nasceu pra isso.",
  fatos: ["Aula 100% online", "Participação gratuita", "10 de dezembro de 2026", "20h — horário de Brasília"],
};

export const APRENDER = {
  titulo: "O que você vai aprender nessa aula?",
  descricao:
    "Nesta aula você vai aprender, passo a passo, como desenvolver sua confiança na dança, superar a vergonha e destravar seus movimentos para dançar com mais segurança em até 30 dias, mesmo que hoje você se sinta sem jeito ou acredite que não nasceu pra isso!",
  cards: [
    { t: "Desenvolva confiança", d: "Aprenda a se sentir mais confiante ao dançar." },
    { t: "Supere a vergonha", d: "Descubra um caminho para deixar a insegurança para trás." },
    { t: "Destrave seus movimentos", d: "Desenvolva maior liberdade e naturalidade corporal." },
    { t: "Dance com mais segurança", d: "Entenda como evoluir na dança com mais confiança." },
  ],
};

export const INCLUI = {
  titulo: "Sua inscrição gratuita inclui",
  itens: [
    {
      t: "Aula exclusiva",
      sub: "DANCE COM CONFIANÇA",
      d: "Uma aula online com Christian Nicholas, em que ele apresenta o caminho para aprender a dançar com mais confiança em até 30 dias.",
    },
    {
      t: "Grupo exclusivo no WhatsApp",
      sub: "",
      d: "Acesso a um grupo onde os participantes receberão atividades e informações necessárias para acessar o evento.",
    },
  ],
};

export const METODO_RESUMO = {
  titulo: "O que é o *Método EMBALLO?*",
  texto: [
    "O Método EMBALLO foi desenvolvido por Christian Nicholas e é baseado nos 4 Elementos da Dança.",
    "A metodologia busca ajudar pessoas a desenvolver confiança, superar a vergonha e conquistar maior liberdade ao dançar.",
  ],
};

export const PROFESSOR_INSCRICAO = {
  titulo: "Conheça seu *professor*",
  nome: "Christian Nicholas",
  bio: [
    "Christian Nicholas é estudioso da dança e do movimento, formado e mentorado por Jaime Arôxa.",
    "Criador do Método EMBALLO, baseado nos 4 Elementos da Dança, dedica seu trabalho a ajudar homens e mulheres a superarem a vergonha e a insegurança para dançar com confiança e liberdade.",
    "Seu objetivo é mostrar que mesmo quem acredita não ter nascido para a dança pode aprender.",
  ],
};

export const FORM = {
  titulo: "Garanta sua vaga na *aula gratuita*",
  texto: "Preencha seus dados e participe da aula DANCE COM CONFIANÇA.",
};
