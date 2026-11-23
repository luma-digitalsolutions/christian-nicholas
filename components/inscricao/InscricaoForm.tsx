"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CTA_FORM, INSCRICAO_ENCERRADA } from "@/content/inscricao";
import { inscricaoSchema } from "@/lib/inscricao";

const formSchema = inscricaoSchema.pick({ email: true, consentimentoPrivacidade: true, consentimentoEmails: true });
type FormValues = z.input<typeof formSchema>;

export function InscricaoForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const submissionId = useRef<string | null>(null);
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const honeypot = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema), defaultValues: { email: "", consentimentoPrivacidade: false as unknown as true, consentimentoEmails: false },
  });

  const onInvalid = (errs: Record<string, unknown>) => { const k = Object.keys(errs)[0]; if (k) setFocus(k as never); };
  const enviar = async (v: FormValues) => {
    if (busy) return; // evita envio duplicado
    setServerErr("");
    submissionId.current ??= crypto.randomUUID();
    setBusy(true);
    try {
      const r = await fetch("/api/inscricao", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, submissionId: submissionId.current, startedAt: startedAt.current, website: honeypot.current?.value ?? "", origem: new URLSearchParams(location.search).get("origem") ?? undefined }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error ?? "Não foi possível concluir a inscrição. Seus dados não foram salvos.");
      setDone(true);
    } catch (e) { setServerErr((e as Error).message); }
    finally { setBusy(false); }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => handleSubmit(enviar, onInvalid)(e);

  if (INSCRICAO_ENCERRADA) {
    return <p role="status" className="border border-gold/30 p-6 text-ivory/90">As inscrições para esta edição estão encerradas.</p>;
  }
  if (done) {
    return (
      <div role="status" className="border border-gold/30 p-6 md:p-8">
        <p className="eyebrow mb-3">Inscrição recebida</p>
        <h3 className="display t-3">Sua inscrição foi enviada.</h3>
        <p className="body-text mt-3">Fique atento ao seu e-mail e ao grupo exclusivo no WhatsApp para receber as informações de acesso à aula.</p>
      </div>
    );
  }

  const err = (id: string, m?: string) => (m ? <p id={id} role="alert" className="mt-1.5 text-sm text-[#f0a090]">{m}</p> : null);
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 border border-gold/30 bg-ink p-5 md:p-8" aria-live="polite">
      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input id="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder="seuemail@exemplo.com" className="field"
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
        {err("email-err", errors.email?.message)}
      </div>
      {/* honeypot: invisível para pessoas */}
      <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/85">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#d6ae70]" aria-invalid={!!errors.consentimentoPrivacidade} {...register("consentimentoPrivacidade")} />
        <span>Li e aceito o tratamento do meu e-mail para minha inscrição na aula, conforme a <Link href="/politica-de-privacidade" target="_blank" className="link link--on text-gold">Política de Privacidade</Link>.</span>
      </label>
      {err("priv-err", errors.consentimentoPrivacidade?.message)}
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/85">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#d6ae70]" {...register("consentimentoEmails")} />
        <span>(Opcional) Aceito receber e-mails com informações sobre a aula e novidades do Método EMBALLO.</span>
      </label>
      {serverErr && <p role="alert" className="border border-[#e07a6b]/50 p-3 text-sm text-[#f0a090]">{serverErr}</p>}
      <button type="submit" className="btn w-full !min-h-16" disabled={busy}>{busy ? "ENVIANDO…" : CTA_FORM}</button>
    </form>
  );
}
