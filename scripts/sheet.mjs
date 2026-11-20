// Uso:  node --env-file=.env.local scripts/sheet.mjs setup     (cria/ajusta abas, cabeçalhos, validações, DEMANDA)
//       node --env-file=.env.local scripts/sheet.mjs validate  (confere a estrutura sem alterar nada)
import { google } from "googleapis";
import { DEMANDA_HEADERS, LEADS_HEADERS, TAB_DEMANDA, TAB_LEADS, TAB_TURMAS, TURMAS_HEADERS } from "../lib/sheets/schema.mjs";

const { GOOGLE_SERVICE_ACCOUNT_EMAIL: email, GOOGLE_PRIVATE_KEY: key, GOOGLE_SHEET_ID: id } = process.env;
if (!email || !key || !id) { console.error("Defina GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY e GOOGLE_SHEET_ID."); process.exit(1); }
const auth = new google.auth.JWT({ email, key: key.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
const api = google.sheets({ version: "v4", auth });
const tabs = { [TAB_LEADS]: LEADS_HEADERS, [TAB_TURMAS]: TURMAS_HEADERS, [TAB_DEMANDA]: DEMANDA_HEADERS };
const cmd = process.argv[2];

const meta = (await api.spreadsheets.get({ spreadsheetId: id })).data;
const byTitle = Object.fromEntries(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));

async function headers(tab) {
  const r = await api.spreadsheets.values.get({ spreadsheetId: id, range: `${tab}!1:1` });
  return r.data.values?.[0] ?? [];
}

if (cmd === "validate") {
  let ok = true;
  for (const [tab, expected] of Object.entries(tabs)) {
    if (!(tab in byTitle)) { console.error(`✗ aba ${tab} não existe`); ok = false; continue; }
    const have = await headers(tab);
    const missing = expected.filter((h) => !have.includes(h));
    if (missing.length) { console.error(`✗ ${tab}: faltam colunas: ${missing.join(", ")}`); ok = false; } else console.log(`✓ ${tab}`);
  }
  process.exit(ok ? 0 : 1);
}

if (cmd === "setup") {
  const reqs = [{ updateSpreadsheetProperties: { properties: { locale: "en_US", timeZone: "America/Recife" }, fields: "locale,timeZone" } }];
  for (const tab of Object.keys(tabs)) if (!(tab in byTitle)) reqs.push({ addSheet: { properties: { title: tab, gridProperties: { frozenRowCount: 1 } } } });
  await api.spreadsheets.batchUpdate({ spreadsheetId: id, requestBody: { requests: reqs } });
  const fresh = (await api.spreadsheets.get({ spreadsheetId: id })).data.sheets;
  const sid = Object.fromEntries(fresh.map((s) => [s.properties.title, s.properties.sheetId]));

  for (const tab of [TAB_LEADS, TAB_TURMAS]) {
    if ((await headers(tab)).length === 0)
      await api.spreadsheets.values.update({ spreadsheetId: id, range: `${tab}!A1`, valueInputOption: "RAW", requestBody: { values: [tabs[tab]] } });
  }
  // DEMANDA: fórmulas (locale en_US definido acima)
  await api.spreadsheets.values.update({ spreadsheetId: id, range: `${TAB_DEMANDA}!A1`, valueInputOption: "USER_ENTERED", requestBody: { values: [DEMANDA_HEADERS] } });
  await api.spreadsheets.values.update({ spreadsheetId: id, range: `${TAB_DEMANDA}!A2`, valueInputOption: "USER_ENTERED",
    requestBody: { values: [[`=QUERY(${TAB_LEADS}!E2:G,"select E,F,G,count(E) where E is not null group by E,F,G order by count(E) desc label count(E) ''",0)`]] } });
  const cnt = (_col, st) => (r) => `=IF(A${r}="","",COUNTIFS(${TAB_LEADS}!$E:$E,A${r},${TAB_LEADS}!$F:$F,B${r},${TAB_LEADS}!$G:$G,C${r},${TAB_LEADS}!$I:$I,"${st}"))`;
  const fm = [];
  for (let r = 2; r <= 301; r++) fm.push([cnt("E", "AGUARDANDO_TURMA")(r), cnt("F", "ENCAMINHADO")(r), cnt("G", "LISTA_ESPERA")(r)]);
  await api.spreadsheets.values.update({ spreadsheetId: id, range: `${TAB_DEMANDA}!E2:G301`, valueInputOption: "USER_ENTERED", requestBody: { values: fm } });

  const dv = (col, values) => ({ setDataValidation: { range: { sheetId: sid[TAB_TURMAS], startRowIndex: 1, startColumnIndex: col, endColumnIndex: col + 1 },
    rule: { condition: { type: "ONE_OF_LIST", values: values.map((v) => ({ userEnteredValue: v })) }, strict: true, showCustomUi: true } } });
  await api.spreadsheets.batchUpdate({ spreadsheetId: id, requestBody: { requests: [
    dv(TURMAS_HEADERS.indexOf("status"), ["ATIVA", "LOTADA", "PLANEJADA", "INATIVA"]),
    dv(TURMAS_HEADERS.indexOf("dia_semana"), ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]),
  ] } });
  console.log("Planilha preparada (locale en_US, fuso America/Recife). Rode 'validate' para conferir.");
}
