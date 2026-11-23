# DESIGN.md — Professor Christian Nicholas

Sistema visual desta landing. Consulte antes de mexer em estilo. Tokens vivem em `app/globals.css`.

## Conceito
"Pegada dourada": dançar começa no chão (pisar), vira dois (tocar), se afasta e volta em torno de um eixo (dividir) e se encaixa na silhueta do casal (apoiar). A silhueta (`CoupleMark`) é a marca: cabeçalho, 4º elemento, CTA final.
Tom: elegante, direto, noturno. Poucas cores, muito tipo, linhas finas douradas.

## Cores (única paleta)
| Token | Valor | Uso |
|---|---|---|
| `ink` | `#080808` | fundo da página |
| `ink2` | `#141414` | fundo alternado de seção, campos |
| `gold` | `#d6ae70` | só linhas, números, itálicos de destaque, botão, foco |
| `ivory` | `#f5f0e8` | texto (corpo a 85%) |
| erro | `#e07a6b` / `#f0a090` | validação |
Sem violeta, sem gradientes decorativos, sem partículas, sem sombras. `color-scheme: dark` no `html`.

## Tipografia
- Títulos: Instrument Serif (`.display`, peso 400, `text-wrap: balance`). Destaque em `<em>` itálico dourado: no máximo uma frase por título (`*assim*` no componente `Heading`).
- Rótulos/botões: Syne 700, caixa alta, tracking .14–.22em, mínimo 13px (`.eyebrow`, `.label`, `.btn`).
- Corpo: Manrope 16px/1.65 (`.body-text`), lead 18px (`.lead`), linha até 62ch (`.measure`).
- Escala única de títulos: `.t-1` (hero, nome do professor, CTA final) · `.t-2` (títulos de seção) · `.t-3` (subtítulos, itens da lista) · `.t-4` (títulos de passo/ano). Não criar tamanhos soltos.
- Números: `.num` (`tabular-nums`). Números contornados (`.outline`) só em 01–04, passos e anos.

## Espaço e grade
- `.wrap`: largura máx. 76rem, margem lateral `--gut` (20px mobile, 40px md+). Cabeçalho, seções e rodapé usam o mesmo `.wrap`: bordas esquerda e direita idênticas.
- `.section`: padding vertical `--sec` (80px / 112px). Título -> conteúdo: `--head-gap` (32 / 48px). Alternância de fundo `ink` / `ink2` (`.section--alt`), sem sombras.
- Separadores: linhas de 1px `gold/25–40`. Sem cards com caixa; listas e colunas com régua no topo.
- Raio: 0 em tudo (botões, campos, vídeo, retrato).

## Botões e links
- Um botão: `.btn` (dourado cheio, quadrado, Syne caixa alta, 52px). Hover: vira contorno dourado; active desce 1px. `.btn-sm` (44px) só no cabeçalho e em ações secundárias do resultado do formulário. Rótulo principal sempre "Encontre sua turma".
- Ação terciária: `.link` (texto com sublinhado que se desenha no hover/foco). `.link--on` mantém o sublinhado (links de texto corrido).
- Foco: `:focus-visible` 2px dourado, offset 3px. Alvos de toque >= 44px.
- Nunca `transition: all`; listar propriedades.

## Movimento
Regra: nada se move só porque a página rolou. Sem sticky/pin, sem parallax, sem barra de progresso, sem fade de cards ao rolar, sem fio ligado ao scroll.
- Entrada única na carga: título e linha de apoio do hero (`.enter`, 0,9 s, só opacity/transform). Formulário e vídeo aparecem sem animação (conversão).
- Hover: botão preenche, `.link` desenha o sublinhado, miniatura do vídeo amplia 2,5%, play escala 5%, nos 4 Elementos o fio se redesenha e as pegadas se afastam 4px.
- Formulário: troca formulário/resultado com `AnimatePresence` (curta).
- `prefers-reduced-motion`: animações e transições reduzidas a ~0 (`globals.css`) e `MotionConfig reducedMotion="user"`.
- Movimento só de `transform` e `opacity`.

## Seções (ritmo)
Hero (h1 + apoio + vídeo | formulário `#turma`, visível sem rolar no mobile) · Você (lista numerada) · Método / 4 Elementos (título + texto lado a lado; quatro colunas com número, ilustração estática da pegada e nome; 2×2 no mobile) · Como funciona (4 passos + botão) · Professor (retrato no tamanho nativo com moldura dourada deslocada + biografia) · Trajetória (5 marcos em colunas, missão/visão/valores) · Depoimentos (só com conteúdo real) · Dúvidas (só respostas confirmadas) · CTA final com silhueta estática.

## Imagens
- Retrato: `/images/christian.jpg` 417×449, exibido até 416px de largura (sem ampliar), `next/image`, sem máscara nem brilho. Sem legendas sob imagens.
- Vídeo: miniatura do YouTube (`<img>` com width/height, lazy), clique carrega `youtube-nocookie`. `preconnect` para `i.ytimg.com`.
- Pegadas e casal: SVG inline, `aria-hidden`.

## Copy
Direta, sem metáforas de efeito nem números inventados. Textos PENDENTE (WhatsApp, respostas do FAQ, depoimentos) ficam fora do ar até confirmação. Botões: verbo + objeto. Aspas curvas, reticências `…`.

## Acessibilidade
Skip link, um `h1`, hierarquia h2/h3, `aria-live` no formulário, erros inline com `role="alert"` e foco no primeiro campo inválido, rótulos visíveis em todos os campos, `inert` na barra fixa quando oculta, `Escape` fecha o menu mobile, `touch-action: manipulation`, `scroll-padding-top` para o cabeçalho fixo.

## Regras para mudanças
1. Reutilize `.wrap`, `.section`, `.t-*`, `.btn`, `.link`; não crie segundo estilo.
2. Dourado só em linhas, números, destaques e CTA.
3. Antes de animar algo, pergunte se é entrada única ou hover; se depende de rolagem, não faça.
4. Não adicionar legendas explicativas sob imagens, nem cards repetidos.
5. Rodar `npx tsc --noEmit`, `npx eslint app components content lib tests`, `npm test`, `npm run build`.
