#!/usr/bin/env bash
# Smoke test da app em execução. Uso: smoke.sh [base_url]  (padrão http://localhost:3100)
set -euo pipefail
B=${1:-http://localhost:3100}
echo "== GET / ";        curl -s -L -o /dev/null -w "%{http_code}\n" "$B/"
echo "== título";        curl -s -L "$B/" | grep -o '<title>[^<]*'
echo "== GET /api/turmas"; curl -s "$B/api/turmas" | head -c 300; echo
echo "== POST /api/leads (cadastro válido, modo demo)"
ID=$(node -e 'console.log(crypto.randomUUID())')
curl -s -X POST "$B/api/leads" -H 'content-type: application/json' -d "{
  \"submissionId\":\"$ID\",\"nome\":\"Maria Teste\",\"whatsapp\":\"(81) 98765-4321\",
  \"bairro\":\"Boa Viagem\",\"dia\":\"TER\",\"horario\":\"19:00\",
  \"consentimentoPrivacidade\":true,\"consentimentoMarketing\":false}"; echo
echo "== POST inválido (esperado 400)"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "$B/api/leads" -H 'content-type: application/json' -d '{}'
