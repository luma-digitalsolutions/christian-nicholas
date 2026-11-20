# Professor Christian Nicholas — Landing page + captação de turmas

Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · React Hook Form + Zod · Google Sheets API.

## Rodar
```bash
cp .env.example .env.local   # DATA_MODE=demo já funciona sem Google
npm install --legacy-peer-deps
npm run dev                   # http://localhost:3000
npm test                      # fluxos de cadastro/segurança
```

## Modos de dados (`DATA_MODE`)
| Modo | Comportamento |
|---|---|
| `demo` | Turmas fictícias `[DEMO]`, leads só em memória, convite abre `/demo-convite`. Banner visível no formulário. |
| `sheets` | Usa **exclusivamente** a planilha. Se faltar credencial ou o Google falhar → erro 503 ("seus dados não foram salvos"). **Nunca** cai para demo. |

Em produção sem `DATA_MODE` a aplicação falha explicitamente.

## Configurar o Google Sheets
1. Google Cloud → crie projeto → ative **Google Sheets API**.
2. IAM → Contas de serviço → crie uma → Chaves → JSON. Copie `client_email` e `private_key` para `GOOGLE_SERVICE_ACCOUNT_EMAIL` e `GOOGLE_PRIVATE_KEY` (com `\n`).
3. Crie uma planilha **privada** e compartilhe com o e-mail da conta de serviço como **Editor**. Copie o ID da URL para `GOOGLE_SHEET_ID`.
4. `npm run sheet:setup` cria as abas `LEADS`, `TURMAS`, `DEMANDA`, cabeçalhos, validação de status/dia e as fórmulas de demanda (define locale `en_US` e fuso `America/Recife`). `npm run sheet:validate` confere a estrutura.
5. Modelos CSV em `docs/modelo-planilha/`.

## Gestão pelo professor (na planilha, sem deploy)
- **Nova turma:** nova linha em `TURMAS` com bairro, dia (`SEG`..`DOM`), `horario_inicio` (`19:00`), vagas, `status=ATIVA` e `link_whatsapp` (`https://chat.whatsapp.com/...`).
- **Suspender:** status `LOTADA` ou `INATIVA`. **Mudar horário:** edite dia/horário.
- O site lê a planilha com cache de 30 s para a lista; **na hora do cadastro a leitura é sempre nova**.
- **Vagas:** `vagas_disponiveis` é controlada pelo professor. Um lead `ENCAMINHADO` **não** consome vaga automaticamente (abrir o convite não confirma matrícula). Atualize as vagas conforme as entradas reais.
- Status do lead: `ENCAMINHADO`, `AGUARDANDO_TURMA`, `LISTA_ESPERA`. A aba `DEMANDA` mostra onde há mais interesse.

## Segurança implementada
Validação Zod no front e no back · sanitização (controle, `=+-@` iniciais) · rate limit por IP · honeypot + tempo mínimo · idempotência por `submissionId` e deduplicação por WhatsApp+preferência (24 h) · link do grupo **nunca** vai ao navegador: `/api/convite` exige token HMAC (24 h), lead gravado, status ENCAMINHADO e turma ainda aberta · credenciais só no servidor · logs sem dados pessoais · resultado só é exibido **após** gravar na planilha.

Limitações conhecidas: o rate limit é em memória (por instância serverless) — para limite global use Upstash/Vercel KV; gravações simultâneas na mesma vaga podem passar do limite (vagas são controladas manualmente).

## Deploy na Vercel
Importe o repositório, configure as variáveis do `.env.example` (`DATA_MODE=sheets`, `INVITE_SECRET`, `GOOGLE_*`, `NEXT_PUBLIC_SITE_URL`) e faça o deploy. Rode `sheet:validate` localmente antes.

## Conteúdo pendente (marcado `PENDENTE` em `content/site.ts`)
Fotos do hero/professor, biografia e formação, fundamentos oficiais do Método Emballo, depoimentos reais, respostas do FAQ (começar sozinho, idade mínima), WhatsApp comercial, dados do controlador/retenção na política de privacidade. Nada disso foi inventado. Para colocar uma foto, salve em `public/images/` e preencha `SITE.heroImage` etc.
