// ⚠️ CONTEÚDO PENDENTE DE CONFIRMAÇÃO COM O PROFESSOR está marcado com PENDENTE.
// Nada aqui foi inventado: textos vêm do briefing; o que falta aparece como estado vazio.
export const SITE = {
  instagram: "https://www.instagram.com/profchristiannicholas",
  instagramHandle: "@profchristiannicholas",
  oldSite: "https://www.emballosp.com.br/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // PENDENTE: número comercial (somente dígitos, com 55)
  heroImage: null as string | null, // PENDENTE: ex. "/images/hero.jpg" (foto/vídeo real de dança)
  professorPhoto: null as string | null, // PENDENTE: ex. "/images/christian.jpg"
  finalImage: null as string | null, // PENDENTE
};

export const INSECURITIES = [
  { t: "Vergonha de dançar em público", d: "Todo mundo começa em algum lugar. Aqui, ninguém espera que você já saiba." },
  { t: "Medo de errar os passos", d: "Errar faz parte de aprender. O foco é a sua evolução, no seu tempo." },
  { t: "A sensação de não ter ritmo", d: "Ritmo e leveza se desenvolvem. Não é dom — é prática bem guiada." },
  { t: "Dançar com outra pessoa", d: "A conexão a dois também se aprende, passo a passo, com segurança." },
];

// PENDENTE: confirmar fundamentos oficiais do Método Emballo com o professor/site.
// Estes cards refletem apenas a proposta de marca informada (confiança, sem pressão, evolução em até 30 dias).
export const METODO = [
  { n: "01", t: "Confiança primeiro", d: "A proposta do método é fazer você se sentir seguro para dançar, antes de qualquer coisa." },
  { n: "02", t: "Sem pressão", d: "Pensado para quem tem vergonha ou acredita que não leva jeito." },
  { n: "03", t: "Passo a passo", d: "Aprender a dançar pode ser mais simples e prazeroso do que você imagina." },
  { n: "04", t: "Evolução em até 30 dias", d: "A promessa da marca: dançar com confiança em até 30 dias." },
];

export const PASSOS = [
  { t: "Escolha onde e quando", d: "Selecione seu bairro, o dia da semana e o horário que preferir." },
  { t: "Informe seu contato", d: "Nome e WhatsApp — só o necessário para você receber as orientações." },
  { t: "Encontre sua turma", d: "Se houver turma disponível, você recebe o acesso. Se não, seu interesse ajuda a abrir uma nova." },
  { t: "Receba as orientações", d: "Entre no grupo da turma no WhatsApp e veja como começar." },
];

const PEND = "Esta informação será confirmada em breve. Fale com o professor pelo Instagram @profchristiannicholas.";
export const FAQ = [
  { q: "Preciso saber dançar?", a: "Não. A proposta do Método Emballo é justamente ajudar quem tem vergonha, se sente sem jeito ou acredita que não nasceu para dançar." },
  { q: "Posso começar sozinho?", a: PEND }, // PENDENTE
  { q: "Como escolho minha turma?", a: "Na seção “Encontre sua turma”, escolha bairro, dia e horário. Mostramos se há uma turma disponível e, se não houver, sugerimos alternativas no seu bairro." },
  { q: "E se não houver turma no meu bairro?", a: "Seu interesse fica registrado. O professor usa esses dados para organizar novas turmas e você poderá ser avisado quando houver novidade." },
  { q: "Como recebo as informações das aulas?", a: "Ao encontrar uma turma, você recebe um botão para entrar no grupo de WhatsApp dela, onde ficam as orientações." },
  { q: "Existe idade mínima?", a: PEND }, // PENDENTE
];

export const DEPOIMENTOS: { nome: string; texto: string }[] = []; // PENDENTE: só depoimentos reais autorizados
