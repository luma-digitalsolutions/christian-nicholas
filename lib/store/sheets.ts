import { google, type sheets_v4 } from "googleapis";
import { parseDia, parseHora } from "../normalize";
import { LEADS_HEADERS, TAB_LEADS, TAB_TURMAS, TURMAS_HEADERS } from "../sheets/schema.mjs";
import { StoreError, type LeadRecord, type Store, type Turma, type TurmaStatus } from "../types";

const CACHE_MS = 30_000;
const STATUSES: TurmaStatus[] = ["ATIVA", "LOTADA", "PLANEJADA", "INATIVA"];

function colLetter(i: number) { let s = ""; for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; }

export function parseTurmaRows(rows: string[][]): Turma[] {
  if (rows.length < 2) return [];
  const idx = Object.fromEntries(rows[0].map((h, i) => [h.trim(), i]));
  const get = (r: string[], k: string) => (r[idx[k]] ?? "").toString().trim();
  const out: Turma[] = [];
  rows.slice(1).forEach((r, n) => {
    const id = get(r, "turma_id");
    if (!id) return;
    const dia = parseDia(get(r, "dia_semana")), inicio = parseHora(get(r, "horario_inicio"));
    const status = get(r, "status").toUpperCase() as TurmaStatus;
    if (!dia || !inicio || !STATUSES.includes(status) || !get(r, "bairro")) {
      console.warn(`[sheets] TURMAS linha ${n + 2} ignorada (dados inválidos)`);
      return;
    }
    out.push({
      id, bairro: get(r, "bairro"), nome: get(r, "nome_turma"), local: get(r, "local"), dia, inicio,
      fim: parseHora(get(r, "horario_fim")) ?? "", capacidade: Number(get(r, "capacidade")) || 0,
      vagas: Math.max(0, Number(get(r, "vagas_disponiveis")) || 0), status, link: get(r, "link_whatsapp"),
      observacoes: get(r, "observacoes"),
    });
  });
  return out;
}

export function createSheetsStore(): Store {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!email || !key || !sheetId) {
    throw new StoreError("NOT_CONFIGURED", "Integração com Google Sheets não configurada.");
  }
  const auth = new google.auth.JWT({ email, key: key.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const api: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
  let cache: { at: number; data: Turma[] } | null = null;

  const wrap = async <T,>(fn: () => Promise<T>): Promise<T> => {
    try { return await fn(); }
    catch (e) {
      console.error("[sheets] erro na API Google:", (e as { code?: number }).code ?? "desconhecido");
      throw new StoreError("UNAVAILABLE", "Google Sheets indisponível.");
    }
  };

  const readLeads = () => wrap(async () => {
    const res = await api.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${TAB_LEADS}!A1:${colLetter(LEADS_HEADERS.length - 1)}`, valueRenderOption: "FORMATTED_VALUE" });
    const rows = (res.data.values ?? []) as string[][];
    const head = rows[0] ?? [];
    return rows.slice(1).map((r, i) => ({
      row: i + 2,
      rec: Object.fromEntries(LEADS_HEADERS.map((h) => [h, (r[head.indexOf(h)] ?? "").toString()])) as unknown as LeadRecord,
    }));
  });

  const toRow = (rec: LeadRecord) => LEADS_HEADERS.map((h) => (rec as unknown as Record<string, string>)[h] ?? "");

  return {
    mode: "sheets",
    async listTurmas(opts) {
      if (!opts?.fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.data;
      const data = await wrap(async () => {
        const res = await api.spreadsheets.values.get({ spreadsheetId: sheetId, range: `${TAB_TURMAS}!A1:${colLetter(TURMAS_HEADERS.length - 1)}`, valueRenderOption: "FORMATTED_VALUE" });
        return parseTurmaRows((res.data.values ?? []) as string[][]);
      });
      cache = { at: Date.now(), data };
      return data;
    },
    async findLead(id) { return (await readLeads()).find((l) => l.rec.lead_id === id)?.rec ?? null; },
    async findDuplicate(w, b, d, h) {
      const cutoff = Date.now() - 24 * 3600_000;
      return (await readLeads()).find(({ rec }) =>
        rec.whatsapp === w && rec.bairro_preferido === b && rec.dia_preferido === d && rec.horario_preferido === h &&
        Date.parse(rec.data_cadastro.replace(" ", "T") + "-03:00") > cutoff)?.rec ?? null;
    },
    async appendLead(rec) {
      await wrap(() => api.spreadsheets.values.append({
        spreadsheetId: sheetId, range: `${TAB_LEADS}!A1`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS",
        requestBody: { values: [toRow(rec)] },
      }));
    },
    async updateLead(id, patch) {
      const found = (await readLeads()).find((l) => l.rec.lead_id === id);
      if (!found) throw new StoreError("UNAVAILABLE", "Lead não encontrado.");
      await wrap(() => api.spreadsheets.values.update({
        spreadsheetId: sheetId, range: `${TAB_LEADS}!A${found.row}:${colLetter(LEADS_HEADERS.length - 1)}${found.row}`,
        valueInputOption: "RAW", requestBody: { values: [toRow({ ...found.rec, ...patch })] },
      }));
    },
  };
}
