"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { maskPhone, leadInputSchema } from "@/lib/validation";
import { mockCatalog, mockSelect, mockSubmit, USE_MOCK } from "@/lib/mock-client";
import { DIAS, DIA_LABEL, type LeadResult, type PublicTurma } from "@/lib/types";

const OUTRO = "__outro__";
const formSchema = leadInputSchema.pick({ nome: true, whatsapp: true, bairro: true, dia: true, horario: true, consentimentoPrivacidade: true, consentimentoMarketing: true });
type FormValues = z.input<typeof formSchema>;
interface Catalog { mode: "demo" | "sheets"; turmas: PublicTurma[]; allowOtherBairro: boolean; allowInterestAnySlot: boolean; interestTimes: string[] }

const SEM = " — sem turma ainda";

export function FindClass() {
  const [cat, setCat] = useState<Catalog | null>(null);
  const [loadErr, setLoadErr] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [keptPref, setKeptPref] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [outro, setOutro] = useState("");
  const submissionId = useRef<string | null>(null);
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, watch, setValue, setFocus, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema), defaultValues: { consentimentoPrivacidade: false as unknown as true, consentimentoMarketing: false },
  });
  const bairro = watch("bairro"), dia = watch("dia");

  useEffect(() => {
    startedAt.current = Date.now();
    (USE_MOCK ? Promise.resolve(mockCatalog()) : fetch("/api/turmas").then((r) => (r.ok ? r.json() : Promise.reject()))).then(setCat).catch(() => setLoadErr(true));
  }, []);

  const bairros = useMemo(() => [...new Set((cat?.turmas ?? []).map((t) => t.bairro))].sort(), [cat]);
  const inBairro = useMemo(() => (cat?.turmas ?? []).filter((t) => t.bairro === bairro), [cat, bairro]);
  const isOutro = bairro === OUTRO;

  const diaOptions = useMemo(() => {
    if (!cat) return [];
    return DIAS.filter((d) => cat.allowInterestAnySlot || isOutro || inBairro.some((t) => t.dia === d))
      .map((d) => ({ v: d, l: DIA_LABEL[d] + (!isOutro && !inBairro.some((t) => t.dia === d) ? SEM : "") }));
  }, [cat, inBairro, isOutro]);

  const horaOptions = useMemo(() => {
    if (!cat || !dia) return [];
    const have = new Set(inBairro.filter((t) => t.dia === dia).map((t) => t.inicio));
    const all = new Set(have);
    if (cat.allowInterestAnySlot || isOutro) cat.interestTimes.forEach((h) => all.add(h));
    return [...all].sort().map((h) => ({ v: h, l: h + (!isOutro && !have.has(h) ? SEM : "") }));
  }, [cat, inBairro, dia, isOutro]);

  async function post(url: string, body: unknown): Promise<LeadResult> {
    if (USE_MOCK) return url.endsWith("/alternativa") ? mockSelect(body as never) : mockSubmit(body as never);
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error ?? "Não foi possível concluir o cadastro. Seus dados não foram salvos.");
    return j;
  }

  const onInvalid = (errs: Record<string, unknown>) => { const k = Object.keys(errs)[0]; if (k) setFocus(k as never); };
  const onSubmit = handleSubmit(async (v) => {
    setServerErr("");
    const finalBairro = isOutro ? outro.trim() : v.bairro;
    if (finalBairro.length < 2) { setServerErr("Informe o nome do seu bairro."); return; }
    submissionId.current ??= crypto.randomUUID();
    setBusy(true);
    try {
      const res = await post("/api/leads", {
        ...v, bairro: finalBairro, submissionId: submissionId.current, startedAt: startedAt.current,
        website: honeypot.current?.value ?? "", origem: new URLSearchParams(location.search).get("origem") ?? undefined,
      });
      setResult(res);
    } catch (e) { setServerErr((e as Error).message); }
    finally { setBusy(false); }
  }, onInvalid);

  async function choose(turmaId: string) {
    if (!result) return;
    setBusy(true); setServerErr("");
    try { setResult(await post("/api/leads/alternativa", { leadId: result.leadId, turmaId })); }
    catch (e) { setServerErr((e as Error).message); }
    finally { setBusy(false); }
  }

  const err = (m?: string) => (m ? <p role="alert" className="mt-1.5 text-sm text-[#f0a090]">{m}</p> : null);

  return (
    <div id="turma" className="scroll-mt-20">
      <h2 className="display t-3">Encontre <em>sua turma.</em></h2>
      <p className="body-text mb-6 mt-4 hidden sm:block">
        Escolha bairro, dia e horário. Se ainda não houver turma, seu interesse ajuda a abrir uma. Você não precisa saber dançar.
      </p>
        <div className="mt-4 border border-gold/30 bg-ink p-4 sm:mt-0 md:p-8" aria-live="polite">
          {cat?.mode === "demo" && (
            <p className="mb-4 border border-gold/40 bg-gold/10 px-3 py-2 text-xs leading-snug text-gold sm:mb-6 sm:px-4 sm:py-3 sm:text-sm">
              MODO DEMONSTRAÇÃO — turmas fictícias. Nenhum dado é salvo em planilha e nenhum grupo real de WhatsApp é aberto.
            </p>
          )}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="res" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Result r={result} busy={busy} err={serverErr} keptPref={keptPref} onKeep={() => setKeptPref(true)} onChoose={choose}
                  onReset={() => { setResult(null); setKeptPref(false); submissionId.current = null; }} />
              </motion.div>
            ) : loadErr ? (
              <p role="alert" className="text-ivory/85">Não conseguimos carregar as turmas agora. Recarregue a página em instantes.</p>
            ) : !cat ? (
              <div>
                <label htmlFor="bairro-load" className="label">Bairro</label>
                <select id="bairro-load" className="field" disabled defaultValue=""><option value="">Carregando turmas…</option></select>
              </div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="bairro" className="label">Bairro</label>
                  <select id="bairro" className="field" aria-invalid={!!errors.bairro} defaultValue="" {...register("bairro", { onChange: () => { setValue("dia", "" as never); setValue("horario", ""); } })}>
                    <option value="" disabled>Selecione</option>
                    {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
                    {cat.allowOtherBairro && <option value={OUTRO}>Outro bairro</option>}
                  </select>
                  {err(errors.bairro?.message)}
                  {isOutro && <input aria-label="Nome do seu bairro" placeholder="Qual é o seu bairro?" className="field mt-3" value={outro} onChange={(e) => setOutro(e.target.value)} maxLength={80} />}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dia" className="label">Dia da semana</label>
                    <select id="dia" className="field" disabled={!bairro} aria-invalid={!!errors.dia} defaultValue="" {...register("dia", { onChange: () => setValue("horario", "") })}>
                      <option value="" disabled>{bairro ? "Selecione" : "Escolha o bairro"}</option>
                      {diaOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                    {err(errors.dia?.message)}
                  </div>
                  <div>
                    <label htmlFor="horario" className="label">Horário</label>
                    <select id="horario" className="field" disabled={!dia} aria-invalid={!!errors.horario} defaultValue="" {...register("horario")}>
                      <option value="" disabled>{dia ? "Selecione" : "Escolha o dia"}</option>
                      {horaOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                    {err(errors.horario?.message)}
                  </div>
                </div>
                <div>
                  <label htmlFor="nome" className="label">Nome completo</label>
                  <input id="nome" autoComplete="name" spellCheck={false} className="field" aria-invalid={!!errors.nome} {...register("nome")} />
                  {err(errors.nome?.message)}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="label">WhatsApp</label>
                  <input id="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" spellCheck={false} placeholder="(00) 00000-0000" className="field" aria-invalid={!!errors.whatsapp}
                    {...register("whatsapp", { onChange: (e) => setValue("whatsapp", maskPhone(e.target.value)) })} />
                  {err(errors.whatsapp?.message)}
                </div>
                {/* honeypot: invisível para pessoas */}
                <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/85">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#d6ae70]" {...register("consentimentoPrivacidade")} />
                  <span>Li e aceito o tratamento dos meus dados para encontrar minha turma, conforme a <Link href="/politica-de-privacidade" target="_blank" className="link link--on text-gold">Política de Privacidade</Link>.</span>
                </label>
                {err(errors.consentimentoPrivacidade?.message)}
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/85">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#d6ae70]" {...register("consentimentoMarketing")} />
                  <span>(Opcional) Quero receber novidades e avisos de novas turmas.</span>
                </label>
                {serverErr && <p role="alert" className="border border-[#e07a6b]/50 p-3 text-sm text-[#f0a090]">{serverErr}</p>}
                <button type="submit" className="btn w-full !min-h-16" disabled={busy}>{busy ? "Procurando…" : "Encontrar minha turma →"}</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
    </div>
  );
}

function Slot({ t }: { t: PublicTurma }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-y border-gold/25 py-5 text-sm">
      <dt className="text-ivory/75">Bairro</dt><dd>{t.bairro}</dd>
      <dt className="text-ivory/75">Dia</dt><dd>{DIA_LABEL[t.dia]}</dd>
      <dt className="text-ivory/75">Horário</dt><dd>{t.inicio}{t.fim ? ` às ${t.fim}` : ""}</dd>
      {t.local && <><dt className="text-ivory/75">Local</dt><dd>{t.local}</dd></>}
    </dl>
  );
}

function Alternatives({ alts, busy, onChoose }: { alts: PublicTurma[]; busy: boolean; onChoose: (id: string) => void }) {
  return (
    <ul className="mt-5 space-y-3">
      {alts.map((a) => (
        <li key={a.id} className="flex flex-col gap-3 border border-gold/25 p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm">{DIA_LABEL[a.dia]} · {a.inicio}{a.local ? ` · ${a.local}` : ""}</span>
          <button className="btn btn-sm" disabled={busy} onClick={() => onChoose(a.id)}>Escolher esta turma</button>
        </li>
      ))}
    </ul>
  );
}

function Result({ r, busy, err, keptPref, onKeep, onChoose, onReset }: {
  r: LeadResult; busy: boolean; err: string; keptPref: boolean; onKeep: () => void; onChoose: (id: string) => void; onReset: () => void;
}) {
  const alts = r.alternativas;
  const errBox = err && <p role="alert" className="mt-4 border border-[#e07a6b]/50 p-3 text-sm text-[#f0a090]">{err}</p>;
  if (r.outcome === "DISPONIVEL" && r.turma) {
    return (
      <div>
        <p className="eyebrow mb-3">Cadastro registrado</p>
        <h3 className="display t-2">Encontramos uma turma para você!</h3>
        <div className="mt-6"><Slot t={r.turma} /></div>
        <p className="mt-5 text-sm text-ivory/85">Entre no grupo da turma pelo botão abaixo para receber as orientações para começar. {r.demo && "(Demonstração: o botão abre uma página fictícia.)"}</p>
        <a href={r.inviteToken ? `/api/convite?t=${encodeURIComponent(r.inviteToken)}` : "/demo-convite"} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full">Entrar no grupo da turma</a>
        <button onClick={onReset} className="link link--on mt-4 py-2 text-sm text-ivory/75">Fazer outro cadastro</button>
      </div>
    );
  }
  const lotada = r.outcome === "LOTADA";
  return (
    <div>
      <p className="eyebrow mb-3">Interesse registrado</p>
      <h3 className="display t-3">
        {lotada ? "Essa turma está lotada, mas colocamos você na lista de espera!" : "Ainda não temos uma turma nesse horário, mas seu interesse já foi registrado!"}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-ivory/85">Seus dados poderão ser usados pelo professor para organizar novas turmas{lotada ? " e avisar sobre vagas" : ""}.</p>
      {alts.length > 0 && !keptPref && (
        <>
          <p className="mt-7 text-sm uppercase tracking-[.2em] text-gold">Turmas com vaga no seu bairro</p>
          <Alternatives alts={alts} busy={busy} onChoose={onChoose} />
          <button onClick={onKeep} className="link mt-5 inline-block py-2 text-sm font-semibold">Manter minha preferência e aguardar</button>
        </>
      )}
      {keptPref && <p className="mt-6 border border-gold/30 p-4 text-sm text-ivory/85">Combinado! Mantivemos sua preferência original na lista de interesse.</p>}
      {errBox}
      <button onClick={onReset} className="link link--on mt-5 py-2 text-sm text-ivory/75">Fazer outro cadastro</button>
    </div>
  );
}
