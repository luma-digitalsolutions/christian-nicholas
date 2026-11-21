// ⚠️ CONTEÚDO PENDENTE DE CONFIRMAÇÃO COM O PROFESSOR está marcado com PENDENTE.
// Nada aqui foi inventado: textos vêm do briefing; o que falta aparece como estado vazio.
export const SITE = {
  instagram: "https://www.instagram.com/profchristiannicholas",
  instagramHandle: "@profchristiannicholas",
  oldSite: "https://www.emballosp.com.br/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // PENDENTE: número comercial (somente dígitos, com 55)
  heroImage: null as string | null, // PENDENTE: ex. "/images/hero.jpg" (foto/vídeo real de dança)
  professorPhoto: "/images/christian.jpg" as string | null,
  finalImage: null as string | null, // PENDENTE
};

export const INSECURITIES = [
  { t: "Vergonha de dançar em público", d: "Todo mundo começa em algum lugar. Aqui, ninguém espera que você já saiba." },
  { t: "Medo de errar os passos", d: "Errar faz parte de aprender. O foco é a sua evolução, no seu tempo." },
  { t: "A sensação de não ter ritmo", d: "Ritmo e leveza se desenvolvem. Não é dom — é prática bem guiada." },
  { t: "Dançar com outra pessoa", d: "A conexão a dois também se aprende, passo a passo, com segurança." },
];

export const METODO_TEXTO = "Uma metodologia exclusiva baseada nos 4 Elementos da dança, que respeita sua individualidade, aprofunda sua técnica e desperta corpo, emoção e presença em turmas reduzidas.";

// Os 4 Elementos da Dança (texto do professor). Descrições individuais: PENDENTE, não inventar.
export const METODO = [
  { n: "01", t: "Pisar", el: "Terra", d: "Transferir totalmente o peso do corpo para um dos pés, deixando o outro livre." },
  { n: "02", t: "Tocar", el: "Fogo", d: "Aproveitar esse pé livre para tocar o chão, o parceiro ou a parceira, criando charme, intenção e conexão." },
  { n: "03", t: "Dividir", el: "Água", d: "Distribuir o peso entre os dois pés, desenvolvendo equilíbrio e novas possibilidades de movimento." },
  { n: "04", t: "Apoiar", el: "Ar", d: "Aprender a realizar dois movimentos dentro de um mesmo tempo musical, ganhando agilidade e fluidez." },
];
export const METODO_NOTA = "São os quatro elementos do Método Emballo: pisar, tocar, dividir e apoiar. Uma base sólida, consciência corporal e construção real de confiança.";

export const PROFESSOR_BIO = [
  "Christian Nicholas é professor de Dança de Salão, formado e mentorado por Jaime Arôxa, e fundador da Emballo Dança de Salão.",
  "Com mais de 20 anos de atuação no ensino, produção e desenvolvimento da Dança de Salão no Brasil, construiu sua trajetória unindo formação técnica, vivência prática, produção cultural e estrutura pedagógica sólida. Ao longo da carreira, ministrou aulas e desenvolveu projetos em cidades como Recife, Brasília, Florianópolis, Ribeirão Preto, Campinas, Mogi-Guaçu, Belo Horizonte, Curitiba, São Paulo e Santos, contribuindo para a formação consistente de alunos e professores.",
  "Com passagem direta pelos processos formativos e empresariais de Jaime Arôxa, aprofundou sua visão técnica e estratégica da dança a dois, integrando ensino, gestão e expansão do setor.",
  "É criador da abordagem estruturada nos 4 Elementos da Dança — pisar, tocar, dividir e apoiar —, um método que prioriza base sólida, consciência corporal e construção real de confiança.",
];
export const PROFESSOR_MISSAO_CURTA = "Sua missão é transformar insegurança em expressão, formando pessoas preparadas para dançar com clareza, segurança e conexão — dentro e fora da pista.";

export const TRAJETORIA = [
  { ano: "2000", t: "Fundação da Emballo", d: "A Emballo Dança de Salão nasce em Recife, com foco em formação de base sólida. Christian não buscava apenas ensinar passos: buscava entender a estrutura por trás da dança." },
  { ano: "2005", t: "Formação de professores", d: "Passa a integrar os cursos de formação de professores de Jaime Arôxa, aprofundando estudos técnicos, pedagógicos e artísticos." },
  { ano: "2007", t: "Rio de Janeiro", d: "Torna-se empresário do mestre e muda-se para o Rio, atuando na produção, assessoria e empresariamento de cursos, workshops e espetáculos, e percorrendo diversas cidades brasileiras com formações de professores." },
  { ano: "2024", t: "Volta a São Paulo", d: "A convite de Jaime Arôxa, retorna para produzir e empresariar suas aulas e eventos, com parcerias em diversas cidades do Brasil." },
  { ano: "Hoje", t: "Temporada no Recife", d: "Em sua cidade natal, atende a pedidos de antigos alunos para formar grupos de estudos presenciais." },
];
export const MISSAO = "Desenvolver confiança, presença e identidade através dos 4 Elementos da Dança — pisar, tocar, dividir e apoiar — formando pessoas seguras dentro e fora da pista.";
export const VISAO = "Ser referência nacional em base estruturada na dança a dois, consolidando um método que transforma técnica em liberdade e movimento em identidade.";
export const VALORES = ["Base antes da performance", "Técnica com consciência", "Conexão acima do ego", "Clareza no ensino", "Respeito e elegância", "Formação consistente", "Evolução contínua"];

export const PASSOS = [
  { t: "Escolha onde e quando", d: "Selecione seu bairro, o dia da semana e o horário que preferir." },
  { t: "Informe seu contato", d: "Nome e WhatsApp — só o necessário para você receber as orientações." },
  { t: "Encontre sua turma", d: "Se houver turma disponível, você recebe o acesso. Se não, seu interesse ajuda a abrir uma nova." },
  { t: "Receba as orientações", d: "Entre no grupo da turma no WhatsApp e veja como começar." },
];

const PEND = "Esta informação será confirmada em breve. Fale com o professor pelo Instagram @profchristiannicholas.";
const FAQ_ALL = [
  { q: "Preciso saber dançar?", a: "Não. A proposta do Método Emballo é justamente ajudar quem tem vergonha, se sente sem jeito ou acredita que não nasceu para dançar." },
  { q: "Posso começar sozinho?", a: PEND }, // PENDENTE
  { q: "Como escolho minha turma?", a: "Na seção “Encontre sua turma”, escolha bairro, dia e horário. Mostramos se há uma turma disponível e, se não houver, sugerimos alternativas no seu bairro." },
  { q: "E se não houver turma no meu bairro?", a: "Seu interesse fica registrado. O professor usa esses dados para organizar novas turmas e você poderá ser avisado quando houver novidade." },
  { q: "Como recebo as informações das aulas?", a: "Ao encontrar uma turma, você recebe um botão para entrar no grupo de WhatsApp dela, onde ficam as orientações." },
  { q: "Existe idade mínima?", a: PEND }, // PENDENTE

];

/** Itens sem resposta confirmada (PEND) nunca vão para a página. */
export const FAQ = FAQ_ALL.filter((f) => f.a !== PEND);

export const DEPOIMENTOS: { nome: string; texto: string }[] = []; // PENDENTE: só depoimentos reais autorizados
