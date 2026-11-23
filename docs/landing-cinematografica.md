# Landing cinematográfica — conceito, implementação e QA

## Conceito: "Dançar começa no chão"
A página leva quem tem medo de dançar do pé parado ao movimento a dois, na ordem dos 4 Elementos. Metáfora visual: a **pegada dourada**.
Pisar = 1 pegada · Tocar = 2 pegadas com um fio · Dividir = afastam e voltam em torno de um eixo · Apoiar = encaixam e formam a silhueta do casal (`CoupleMark`), que reaparece no CTA final.
Identidade mantida: `#080808`, dourado `#d6ae70` (só linhas, números e CTA), marfim; Instrument Serif, Syne, Manrope.

## Storyboard
1. **Abertura** - h1, formulário "Encontre sua turma" e vídeo visíveis desde o primeiro frame. Só o título e a linha de apoio têm entrada única (CSS, na carga).
2. **Você** - inseguranças reais em lista tipográfica numerada.
3. **Método / 4 Elementos** - seção normal, sem pin: título e texto lado a lado e quatro colunas (Pisar, Tocar, Dividir, Apoiar) com ilustração estática da pegada. Hover redesenha o fio e afasta as pegadas. 2x2 no mobile.
4. **Como funciona** - 4 passos + botão.
5. **Professor** - retrato no tamanho nativo com moldura dourada fina, biografia.
6. **Trajetória** - 5 marcos em colunas (régua estática), missão/visão/valores.
7. **Depoimentos** - não renderiza enquanto `DEPOIMENTOS` estiver vazio.
8. **FAQ** - perguntas com resposta pendente são omitidas.
9. **CTA final** - silhueta do casal estática + âncora `#turma`.

Movimento: nada ligado à rolagem (sem sticky, parallax, barra de progresso, fio por scroll, fade de cards). Só entrada do hero na carga e hovers discretos. `prefers-reduced-motion` reduz tudo. Sistema visual completo em `DESIGN.md`.

## Arquivos
Principais: `app/globals.css`, `components/Heading.tsx`, `components/landing/{Sections,Metodo,Client,VideoHero}.tsx`, `components/layout/{Header,Footer}.tsx`, `components/forms/FindClass.tsx`. `Motion.tsx` e `Reveal.tsx` foram removidos (eram o movimento por rolagem).

## Resultados (verificados)
| Verificação | Resultado |
|---|---|
| `npx tsc --noEmit` | 0 erros |
| `npm run lint` | 0 erros, 1 warning pré-existente (`watch()` em `FindClass.tsx`) |
| `npm test` | 14/14 passam |
| `npm run build` | compila; `/` estática |
| Navegador (Edge headless/CDP, dev server) | 360×640, 375×667, 768×1024, 768×700, 1440×900 |

Corrigido no QA: erro de hidratação com reduced motion; cena sticky maior que a tela (agora cabe em 768×700 e 1440×900); campo de bairro abaixo da dobra no mobile (agora em ~408–464px); foco de teclado invisível nos campos. Sem scroll horizontal, sem armadilha de foco (70 Tabs).

## Limitações / pendências
- Sem Lighthouse (LCP/CLS reais), sem teste em dispositivo real, sem teste em build de produção no navegador.
- Envio do formulário testado só via API (curl), não pela UI; sem teste com JS desligado (o formulário depende de `/api/turmas`).
- Alturas entre 640 e 700 com largura ≥768 não medidas; miniatura do YouTube é `<img>` externa.
- Copy nova curta nas faixas de CTA ("Descubra qual turma é a sua.", "Escolha bairro, dia e horário.") — revisar.
- Conteúdo ainda PENDENTE de confirmação com o professor (WhatsApp, respostas do FAQ, depoimentos).
