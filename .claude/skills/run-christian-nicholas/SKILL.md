---
name: run-christian-nicholas
description: Run, start, test and smoke-test the Professor Christian Nicholas landing page (Next.js dev server, modo demo). Use when asked to run the app, start the dev server, check the API/lead form, or run its tests.
---

Landing page Next.js 16 + API de captação de leads. Handle do agente: dev server em segundo plano + `smoke.sh` (curl). Caminhos relativos à raiz do projeto. Verificado no Windows 11 (Git Bash), não em container Linux.

## Setup

```bash
npm install --legacy-peer-deps   # sem a flag: ERESOLVE (vitest x @types/node)
git checkout package-lock.json   # a instalação reescreve o lock; descarte se não for intencional
cp -n .env.example .env.local
sed -i 's/^INVITE_SECRET=.*/INVITE_SECRET=dev-local-secret-not-for-production/' .env.local
```

`.env.local` é ignorado pelo git. `DATA_MODE=demo` (padrão do exemplo) usa turmas fictícias em memória, sem Google.

## Run (agent path)

```bash
npm run dev -- -p 3100 > "$TEMP/dev.log" 2>&1 &
timeout 60 bash -c 'until curl -sf localhost:3100/api/turmas >/dev/null; do sleep 1; done'
bash .claude/skills/run-christian-nicholas/smoke.sh http://localhost:3100
```

O smoke checa `/` (200 + título), `GET /api/turmas` (`"mode":"demo"`), `POST /api/leads` válido (`outcome: DISPONIVEL`, retorna `inviteToken`) e inválido (400). Logs: `$TEMP/dev.log`.

Parar (Windows):

```powershell
Get-NetTCPConnection -LocalPort 3100 -State Listen | % { Stop-Process -Id $_.OwningProcess -Force }
```

## Run (human path)

`npm run dev` -> http://localhost:3000 (sobe em outra porta se ocupada). Ctrl-C para parar.

## Test

```bash
npm test   # vitest: 2 arquivos, 14 testes passam
```

## Gotchas

- **Use porta 3100**: a 3000 costuma estar ocupada por outro processo na máquina; o Next troca sozinho de porta e você acaba batendo no servidor errado.
- **`INVITE_SECRET` é obrigatório mesmo em demo**, apesar do README dizer que `DATA_MODE=demo` basta. Sem ele toda rota `/api/*` devolve 503 "Seus dados não foram salvos" e o log mostra `[api] falha: INVITE_SECRET ausente.`
- O `.env.local` é relido sem reiniciar o dev server, mas confirme com `GET /api/turmas`.
- Rate limit: 6 POSTs/min por IP em `/api/leads` (429 depois disso).
- AGENTS.md avisa que este Next tem breaking changes: leia `node_modules/next/dist/docs/` antes de editar código Next.

## Não coberto

Não há driver de navegador. `chromium-cli` não existe nesta máquina e a instalação de `playwright-core` foi bloqueada pelo classificador de permissões, então o preenchimento do formulário na UI (`components/forms/FindClass.tsx`) e screenshots não foram verificados. Edge está em `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` se alguém autorizar `npm install --no-save playwright-core` e usar `chromium.launch({ channel: "msedge" })`.
