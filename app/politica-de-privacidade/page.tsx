import type { Metadata } from "next";
import Link from "next/link";
import { POLICY_VERSION } from "@/lib/validation";

export const metadata: Metadata = { title: "Política de Privacidade — Professor Christian Nicholas", alternates: { canonical: "/politica-de-privacidade" } };

// ⚠️ Revisar com o professor/assessoria jurídica: controlador, contato do encarregado e prazo de retenção.
export default function Privacidade() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 leading-relaxed text-ivory/80">
      <Link href="/" className="text-sm text-gold">← Voltar</Link>
      <h1 className="mt-6 display text-5xl text-ivory">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-ivory/70">Versão {POLICY_VERSION}</p>
      <div className="mt-8 space-y-6 [&_h2]:display [&_h2]:text-2xl [&_h2]:text-ivory">
        <section><h2>Quem somos</h2><p>Professor Christian Nicholas — Aulas de Dança (Método Emballo) é o responsável pelo tratamento dos dados coletados neste site. Contato: Instagram @profchristiannicholas. <em>(Dados completos do controlador a confirmar.)</em></p></section>
        <section><h2>Quais dados coletamos</h2><p>Nome completo, número de WhatsApp, bairro, dia e horário de preferência para as aulas, data do cadastro e a origem do acesso. Não solicitamos dados além do necessário.</p></section>
        <section><h2>Para que usamos</h2><p>Encontrar uma turma compatível e enviar o convite ao grupo de WhatsApp; registrar seu interesse quando não há turma; e entender a demanda por bairros e horários para organizar novas turmas. Só enviaremos novidades e comunicações de marketing se você marcar a opção específica e opcional.</p></section>
        <section><h2>Base legal</h2><p>Seu consentimento e a execução de procedimentos preliminares a seu pedido (LGPD, art. 7º, I e V).</p></section>
        <section><h2>Com quem compartilhamos</h2><p>Os dados ficam em planilha privada do Google (Google Sheets), acessada apenas pelo professor e por quem ele autorizar. Não vendemos seus dados.</p></section>
        <section><h2>Por quanto tempo guardamos</h2><p>Enquanto houver interesse em turmas ou por até 12 meses após o último contato, o que ocorrer primeiro. <em>(Prazo a confirmar pelo professor.)</em></p></section>
        <section><h2>Seus direitos</h2><p>Você pode pedir acesso, correção, exclusão dos dados ou revogar o consentimento a qualquer momento, pelo Instagram @profchristiannicholas.</p></section>
      </div>
    </main>
  );
}
