import { describe, expect, it } from "vitest";
import { mockCatalog, mockSelect, mockSubmit } from "@/lib/mock-client";

const id = () => crypto.randomUUID();

describe("mock de turmas no frontend", () => {
  it("lista as turmas demo sem expor link nem vagas", () => {
    const c = mockCatalog();
    expect(c.turmas.length).toBe(11);
    expect(JSON.stringify(c)).not.toContain("whatsapp.com");
  });
  it("vaga aberta -> DISPONIVEL", () => {
    const r = mockSubmit({ submissionId: id(), bairro: "Boa Viagem", dia: "TER", horario: "19:00" });
    expect(r.outcome).toBe("DISPONIVEL");
    expect(r.turma?.id).toBe("DEMO-01");
  });
  it("turma lotada -> LOTADA com alternativas do bairro", () => {
    const r = mockSubmit({ submissionId: id(), bairro: "Boa Viagem", dia: "SAB", horario: "10:00" });
    expect(r.outcome).toBe("LOTADA");
    expect(r.alternativas.map((t) => t.id).sort()).toEqual(["DEMO-01", "DEMO-02"]);
  });
  it("sem turma no horário -> INDISPONIVEL; bairro sem turmas abertas -> sem alternativas", () => {
    expect(mockSubmit({ submissionId: id(), bairro: "Outro lugar", dia: "SEG", horario: "08:00" }))
      .toMatchObject({ outcome: "INDISPONIVEL", alternativas: [] });
    expect(mockSubmit({ submissionId: id(), bairro: "Tamarineira", dia: "QUA", horario: "18:00" }).alternativas).toEqual([]);
  });
  it("é idempotente por submissionId e permite escolher alternativa do mesmo bairro", () => {
    const sid = id();
    const a = mockSubmit({ submissionId: sid, bairro: "Boa Viagem", dia: "SAB", horario: "10:00" });
    expect(mockSubmit({ submissionId: sid, bairro: "Casa Forte", dia: "QUA", horario: "19:00" })).toBe(a);
    expect(mockSelect({ leadId: sid, turmaId: "DEMO-02" }).turma?.id).toBe("DEMO-02");
    expect(() => mockSelect({ leadId: sid, turmaId: "DEMO-04" })).toThrow(); // outro bairro
  });
});
