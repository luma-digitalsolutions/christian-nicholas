import Image from "next/image";
import Link from "next/link";
import { APRENDER, CTA_FORM, CTA_HERO, EVENTO, FORM, HERO, INCLUI, METODO_RESUMO, PROFESSOR_INSCRICAO } from "@/content/inscricao";
import { METODO, SITE } from "@/content/site";
import { Heading } from "../Heading";
import { Portrait } from "../landing/Client";
import { Countdown } from "./Countdown";
import { InscricaoForm } from "./InscricaoForm";

const Section = ({ id, children, alt }: { id?: string; children: React.ReactNode; alt?: boolean }) => (
  <section id={id} className={`section scroll-mt-16 ${alt ? "section--alt" : ""}`}><div className="wrap">{children}</div></section>
);
const Cta = ({ children = CTA_FORM }: { children?: string }) => <a href={`#${EVENTO.ancora}`} className="btn">{children}</a>;

export function InscricaoHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" aria-label="Professor Christian Nicholas — página inicial" className="-ml-1 p-1"><Image src="/images/casal-header.jpg" alt="" width={240} height={250} priority className="h-12 w-auto mix-blend-lighten" /></Link>
        <a href={`#${EVENTO.ancora}`} className="btn btn-sm">Inscreva-se</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="pb-16 pt-[6.5rem] md:pb-24 md:pt-36">
      <div className="wrap grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow enter mb-5">Aula gratuita · {EVENTO.nome}</p>
          <h1 id="hero-h" className="display t-1 enter">
            {HERO.titulo.split(/(\*[^*]+\*)/).filter(Boolean).map((p, i) => (p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : p))}
          </h1>
          <p className="lead enter enter-2 measure mt-6">{HERO.descricao}</p>
          <ul className="enter enter-2 mt-10 grid gap-x-10 gap-y-3 border-t border-gold/30 pt-6 sm:grid-cols-2">
            {HERO.fatos.map((f) => <li key={f} className="flex items-center gap-3 text-ivory"><span aria-hidden className="h-px w-5 bg-gold" />{f}</li>)}
          </ul>
          <div className="mt-10"><Countdown /></div>
          <div className="mt-10 lg:hidden"><Cta>{CTA_HERO}</Cta></div>
        </div>
        <div id={EVENTO.ancora} className="scroll-mt-20">
          <Heading text={FORM.titulo} as="h2" className="t-3" />
          <p className="body-text mb-6 mt-4">{FORM.texto}</p>
          <InscricaoForm />
        </div>
      </div>
    </section>
  );
}

export function Aprender() {
  return (
    <Section alt>
      <div className="mb-[var(--head-gap)] max-w-4xl">
        <p className="eyebrow mb-5">Nesta aula</p>
        <Heading text={APRENDER.titulo} as="h2" />
        <p className="lead measure mt-6">{APRENDER.descricao}</p>
      </div>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {APRENDER.cards.map((c, n) => (
          <li key={c.t} className="border-t border-gold/40 pt-6">
            <span aria-hidden className="num display outline block text-5xl">{String(n + 1).padStart(2, "0")}</span>
            <h3 className="display t-4 mt-4">{c.t}</h3>
            <p className="body-text mt-2">{c.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14"><Cta /></div>
    </Section>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  data: <path d="M4 7h16M7 3v4m10-4v4M5 7v13h14V7" />,
  hora: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" />,
  formato: <path d="M4 6h16v10H4zM9 20h6M12 16v4" />,
  invest: <path d="M20 12v8H4v-8M2 7h20v5H2zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0" />,
};
export function Informacoes() {
  const itens = [
    { i: "data", l: "Data", v: `${EVENTO.dataLabel}, ${EVENTO.diaSemana}.` },
    { i: "hora", l: "Horário", v: EVENTO.horaLabel },
    { i: "formato", l: "Formato", v: EVENTO.formato },
    { i: "invest", l: "Investimento", v: EVENTO.investimento },
  ];
  return (
    <Section>
      <div className="mb-[var(--head-gap)] max-w-4xl">
        <p className="eyebrow mb-5">{EVENTO.nome}</p>
        <Heading text="Uma aula para transformar sua *relação com a dança*" as="h2" />
      </div>
      <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((it) => (
          <div key={it.l} className="border-t border-gold/40 pt-6">
            <svg aria-hidden focusable="false" viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{ICONS[it.i]}</svg>
            <dt className="eyebrow mt-5 !gap-0 before:hidden">{it.l}</dt>
            <dd className="display t-4 mt-2">{it.v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Inclui() {
  return (
    <Section alt>
      <div className="mb-[var(--head-gap)] max-w-4xl"><Heading text={INCLUI.titulo} as="h2" /></div>
      <ul className="grid gap-8 md:grid-cols-2">
        {INCLUI.itens.map((it, n) => (
          <li key={it.t} className={`border border-gold/30 p-6 md:p-8 ${n === 0 ? "bg-ink" : "bg-ink2"}`}>
            {it.sub && <p className="eyebrow mb-3 !gap-0 before:hidden">{it.sub}</p>}
            <h3 className="display t-3">{it.t}</h3>
            <p className="body-text mt-3">{it.d}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function MetodoResumo() {
  return (
    <Section id="metodo-emballo">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
        <div>
          <p className="eyebrow mb-5">Os 4 Elementos da Dança</p>
          <Heading text={METODO_RESUMO.titulo} as="h2" />
        </div>
        <div className="body-text measure space-y-4">{METODO_RESUMO.texto.map((t) => <p key={t}>{t}</p>)}</div>
      </div>
      <ol aria-label="Os quatro elementos" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gold/30 pt-8 lg:grid-cols-4">
        {METODO.map((m) => (
          <li key={m.n} className="flex items-baseline gap-4">
            <span aria-hidden className="num display outline text-3xl">{m.n}</span>
            <span className="display t-4">{m.t}</span>
          </li>
        ))}
      </ol>
      <p className="mt-10"><Link href="/#metodo" className="link py-3 text-sm font-semibold uppercase tracking-[.14em]">Conheça o método completo</Link></p>
    </Section>
  );
}

export function Professor() {
  return (
    <Section alt>
      <div className="grid gap-14 md:grid-cols-[26rem_1fr] md:gap-20">
        {SITE.professorPhoto && <div className="md:pr-5"><Portrait src={SITE.professorPhoto} /></div>}
        <div>
          <p className="eyebrow mb-5">Quem é {PROFESSOR_INSCRICAO.nome}?</p>
          <Heading text={PROFESSOR_INSCRICAO.titulo} as="h2" className="t-1" />
          <div className="body-text measure mt-[var(--head-gap)] space-y-4">{PROFESSOR_INSCRICAO.bio.map((t) => <p key={t}>{t}</p>)}</div>
          <div className="mt-10"><Cta /></div>
        </div>
      </div>
    </Section>
  );
}

export function CtaFinal() {
  return (
    <section aria-label="Inscrição" className="section text-center">
      <div className="wrap">
        <Heading text="Garanta sua vaga na *aula gratuita*" as="h2" className="t-2 mx-auto max-w-3xl" />
        <p className="body-text mt-4">{EVENTO.dataLabel} · 20h — horário de Brasília</p>
        <div className="mt-10"><Cta /></div>
      </div>
    </section>
  );
}

export function InscricaoFooter() {
  return (
    <footer className="border-t border-gold/25 bg-ink pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-12">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="body-text text-sm">© 2026 Professor Christian Nicholas. Desenvolvido por Luma Soluções Digitais.</p>
          <nav aria-label="Rodapé" className="text-sm">
            <Link className="link py-2" href="/politica-de-privacidade">Política de Privacidade</Link>
            {/* Termos de Uso: página ainda não existe; adicionar link quando houver texto verificado. */}
          </nav>
        </div>
      </div>
    </footer>
  );
}
