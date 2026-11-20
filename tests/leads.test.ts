import { describe, expect, it } from "vitest";
import { createInviteToken, verifyInviteToken } from "@/lib/invite";
import { selectAlternative, submitLead } from "@/lib/leads/service";
import { leadInputSchema, normalizePhone } from "@/lib/validation";
import { StoreError } from "@/lib/types";
import { input, mkDeps, mutableStore, SECRET, turma } from "./helpers";

describe("fluxo de cadastro", () => {
  it("1. turma disponível → ENCAMINHADO com token (sem expor link)", async () => {
    const s = mutableStore([turma()]);
    const r = await submitLead(input(), mkDeps(s));
    expect(r.outcome).toBe("DISPONIVEL"); expect(r.status).toBe("ENCAMINHADO");
    expect(JSON.stringify(r)).not.toContain("chat.whatsapp.com");
    expect(r.inviteToken).toBeTruthy();
    expect((await s.findLead(r.leadId))?.turma_id).toBe("T1");
  });
  it("2. sem turma → AGUARDANDO_TURMA", async () => {
    const r = await submitLead(input({ dia: "DOM" }), mkDeps(mutableStore([turma()])));
    expect(r.outcome).toBe("INDISPONIVEL"); expect(r.status).toBe("AGUARDANDO_TURMA"); expect(r.inviteToken).toBeUndefined();
  });
  it("3. turma lotada → LISTA_ESPERA sem link, com alternativas do bairro", async () => {
    const s = mutableStore([turma({ vagas: 0, status: "LOTADA" }), turma({ id: "T2", dia: "QUI" })]);
    const r = await submitLead(input(), mkDeps(s));
    expect(r.outcome).toBe("LOTADA"); expect(r.status).toBe("LISTA_ESPERA");
    expect(r.inviteToken).toBeUndefined(); expect(r.alternativas.map((a) => a.id)).toEqual(["T2"]);
  });
  it("4. alternativa: guarda preferência original e turma escolhida", async () => {
    const s = mutableStore([turma({ vagas: 0, status: "LOTADA" }), turma({ id: "T2", dia: "QUI", inicio: "20:00" })]);
    const first = await submitLead(input(), mkDeps(s));
    const r = await selectAlternative(first.leadId, "T2", mkDeps(s));
    const rec = await s.findLead(first.leadId);
    expect(r.outcome).toBe("DISPONIVEL");
    expect(rec).toMatchObject({ dia_preferido: "TER", horario_preferido: "19:00", turma_id: "T2", dia_turma_selecionada: "QUI", horario_turma_selecionada: "20:00", status: "ENCAMINHADO" });
  });
  it("4b. alternativa fechada/de outro bairro é recusada", async () => {
    const s = mutableStore([turma({ vagas: 0, status: "LOTADA" }), turma({ id: "T3", bairro: "Outro", status: "ATIVA" })]);
    const first = await submitLead(input(), mkDeps(s));
    await expect(selectAlternative(first.leadId, "T3", mkDeps(s))).rejects.toThrow();
  });
  it("5/6. telefone inválido e campos ausentes", () => {
    expect(normalizePhone("(81) 99999-1234")).toBe("+5581999991234");
    for (const p of ["123", "(81) 89999-1234", "(00) 99999-1234", "(81) 99999-9999"]) expect(normalizePhone(p)).toBeNull();
    expect(leadInputSchema.safeParse(input({ whatsapp: "123" })).success).toBe(false);
    expect(leadInputSchema.safeParse(input({ nome: "Maria" })).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...input(), consentimentoPrivacidade: false }).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...input(), bairro: "" }).success).toBe(false);
  });
  it("7. falha ao consultar Sheets → erro, nada gravado", async () => {
    const s = mutableStore([turma()]); s.listTurmas = async () => { throw new StoreError("UNAVAILABLE", "x"); };
    await expect(submitLead(input(), mkDeps(s))).rejects.toBeInstanceOf(StoreError);
  });
  it("8. falha ao registrar → erro, sem token/resultado", async () => {
    const s = mutableStore([turma()]); s.appendLead = async () => { throw new StoreError("UNAVAILABLE", "x"); };
    await expect(submitLead(input(), mkDeps(s))).rejects.toBeInstanceOf(StoreError);
  });
  it("9. envio duplicado (mesmo id ou mesmos dados) não cria 2º lead", async () => {
    const s = mutableStore([turma()]); let n = 0; const orig = s.appendLead; s.appendLead = async (r) => { n++; return orig(r); };
    const i = input();
    await submitLead(i, mkDeps(s)); await submitLead(i, mkDeps(s));
    await submitLead(input(), mkDeps(s)); // outro id, mesmos dados
    expect(n).toBe(1);
  });
  it("10. turma alterada na planilha vale no próximo envio", async () => {
    const s = mutableStore([turma()]);
    expect((await submitLead(input(), mkDeps(s))).outcome).toBe("DISPONIVEL");
    s.turmas[0].dia = "QUA";
    expect((await submitLead(input({ whatsapp: "(81) 98888-1234" }), mkDeps(s))).outcome).toBe("INDISPONIVEL");
    s.turmas[0].status = "INATIVA";
    expect((await submitLead(input({ whatsapp: "(81) 97777-1234", dia: "QUA" }), mkDeps(s))).outcome).toBe("INDISPONIVEL");
  });
  it("ATIVA sem link válido não libera grupo", async () => {
    const r = await submitLead(input(), mkDeps(mutableStore([turma({ link: "http://evil.example" })])));
    expect(r.outcome).not.toBe("DISPONIVEL");
  });
});

describe("11. convite", () => {
  it("token adulterado, expirado ou de outro segredo é rejeitado", () => {
    const t = createInviteToken(SECRET, "L", "T", 1000);
    expect(verifyInviteToken(SECRET, t, 2000)).toEqual({ leadId: "L", turmaId: "T" });
    expect(verifyInviteToken("outro", t, 2000)).toBeNull();
    expect(verifyInviteToken(SECRET, t + "x", 2000)).toBeNull();
    expect(verifyInviteToken(SECRET, t, 1000 + 25 * 3600_000)).toBeNull();
    expect(verifyInviteToken(SECRET, "lixo")).toBeNull();
  });
});
