import { describe, expect, it } from "vitest";
import { parseTurmaRows } from "@/lib/store/sheets";
import { parseDia, parseHora } from "@/lib/normalize";
import { TURMAS_HEADERS } from "@/lib/sheets/schema.mjs";

describe("leitura da planilha", () => {
  it("normaliza dia/hora digitados pelo professor", () => {
    expect(parseDia("Terça-feira")).toBe("TER"); expect(parseDia("sábado")).toBe("SAB");
    expect(parseHora("19h")).toBe("19:00"); expect(parseHora("7:00 PM")).toBe("19:00"); expect(parseHora("19:00:00")).toBe("19:00");
    expect(parseHora("abc")).toBeNull();
  });
  it("ignora linhas inválidas e aceita colunas reordenadas", () => {
    const head = [...TURMAS_HEADERS].reverse();
    const row = (o: Record<string, string>) => head.map((h) => o[h] ?? "");
    const ok = row({ turma_id: "A", bairro: "Centro", dia_semana: "Terça", horario_inicio: "19h", status: "ativa", vagas_disponiveis: "3", link_whatsapp: "https://chat.whatsapp.com/ABCDEFGHIJ" });
    const bad = row({ turma_id: "B", bairro: "Centro", dia_semana: "???", horario_inicio: "19h", status: "ATIVA" });
    const r = parseTurmaRows([head, ok, bad]);
    expect(r).toHaveLength(1); expect(r[0]).toMatchObject({ id: "A", dia: "TER", inicio: "19:00", status: "ATIVA", vagas: 3 });
  });
});
