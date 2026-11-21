import { DEPOIMENTOS, FAQ, INSECURITIES, MISSAO, PASSOS, PROFESSOR_BIO, PROFESSOR_MISSAO_CURTA, SITE, TRAJETORIA, VALORES, VISAO } from "@/content/site";
import { Heading } from "../Heading";
import { FinalMark, Portrait } from "./Client";

export { Metodo } from "./Metodo";

const Title = ({ eyebrow, children }: { eyebrow: string; children: string }) => (
  <div className="mb-[var(--head-gap)] max-w-4xl">
    <p className="eyebrow mb-5">{eyebrow}</p>
    <Heading text={children} />
  </div>
);
const Section = ({ id, children, alt }: { id: string; children: React.ReactNode; alt?: boolean }) => (
  <section id={id} className={`section scroll-mt-16 ${alt ? "section--alt" : ""}`}><div className="wrap">{children}</div></section>
);

export function Emocional() {
  return (
    <Section id="voce" alt>
      <Title eyebrow="Você não precisa saber dançar">Todo mundo começa *do zero.*</Title>
      <ul className="border-b border-gold/25">
        {INSECURITIES.map((i, n) => (
          <li key={i.t} className="grid gap-2 border-t border-gold/25 py-6 md:grid-cols-[4rem_1.1fr_1fr] md:items-baseline md:gap-8 md:py-8">
            <span aria-hidden className="num display text-2xl text-gold">{String(n + 1).padStart(2, "0")}</span>
            <h3 className="display t-3 text-ivory">{i.t}</h3>
            <p className="body-text">{i.d}</p>
          </li>
        ))}
      </ul>
      <p className="display t-3 mt-12 max-w-2xl italic text-gold">Dançar é uma habilidade — e habilidades se desenvolvem.</p>
    </Section>
  );
}

export function ComoFunciona() {
  return (
    <Section id="como-funciona">
      <Title eyebrow="Como funcionam as aulas">Quatro passos até *a sua turma.*</Title>
      <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
        {PASSOS.map((p, n) => (
          <li key={p.t} className="border-t border-gold/40 pt-6">
            <span aria-hidden className="num display outline block text-6xl">{n + 1}</span>
            <h3 className="display t-4 mt-4">{p.t}</h3>
            <p className="body-text mt-2">{p.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14"><a href="#turma" className="btn">Encontre sua turma</a></div>
    </Section>
  );
}

export function Professor() {
  return (
    <Section id="professor" alt>
      <div className="grid gap-14 md:grid-cols-[26rem_1fr] md:gap-20">
        {SITE.professorPhoto && <div className="md:pr-5"><Portrait src={SITE.professorPhoto} /></div>}
        <div>
          <p className="eyebrow mb-5">O professor</p>
          <Heading text="Christian *Nicholas*" className="t-1" />
          <div className="body-text measure mt-[var(--head-gap)] space-y-4">
            {PROFESSOR_BIO.map((t) => <p key={t}>{t}</p>)}
          </div>
          <p className="display t-4 measure mt-8 italic text-gold">{PROFESSOR_MISSAO_CURTA}</p>
        </div>
      </div>
    </Section>
  );
}

export function Trajetoria() {
  return (
    <Section id="trajetoria">
      <Title eyebrow="O empresário · A trajetória">Não é sobre ensinar passos. *É sobre estrutura.*</Title>
      <ol className="grid gap-10 md:grid-cols-5 md:gap-6 md:border-t md:border-gold/40 md:pt-8">
        {TRAJETORIA.map((t) => (
          <li key={t.ano} className="border-t border-gold/40 pt-6 md:border-t-0 md:pt-0">
            <span className="num display outline block text-5xl">{t.ano}</span>
            <h3 className="display t-4 mt-3">{t.t}</h3>
            <p className="body-text mt-2">{t.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-16 grid gap-10 border-t border-gold/25 pt-10 md:grid-cols-3 md:gap-12">
        <div><h3 className="eyebrow mb-3">Missão</h3><p className="body-text">{MISSAO}</p></div>
        <div><h3 className="eyebrow mb-3">Visão</h3><p className="body-text">{VISAO}</p></div>
        <div>
          <h3 className="eyebrow mb-3">Valores</h3>
          <ul className="body-text space-y-1.5">{VALORES.map((v) => <li key={v}>{v}</li>)}</ul>
        </div>
      </div>
      <p className="display t-3 mt-16 max-w-4xl">
        Christian Nicholas não ensina passos. <em>Ele ensina estrutura.</em>{" "}
        Não forma apenas dançarinos. <em>Forma pessoas confiantes.</em>
      </p>
    </Section>
  );
}

export function Depoimentos() {
  if (DEPOIMENTOS.length === 0) return null;
  return (
    <Section id="depoimentos" alt>
      <Title eyebrow="Depoimentos">Histórias de quem *começou.*</Title>
      <div className="grid gap-10 md:grid-cols-3">
        {DEPOIMENTOS.map((d) => (
          <figure key={d.nome} className="border-l border-gold/40 pl-6">
            <blockquote className="display t-4">“{d.texto}”</blockquote>
            <figcaption className="eyebrow mt-4">{d.nome}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  if (FAQ.length === 0) return null;
  return (
    <Section id="duvidas">
      <Title eyebrow="Perguntas frequentes">Tire suas *dúvidas.*</Title>
      <div className="max-w-3xl divide-y divide-gold/25 border-y border-gold/25">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="display t-4 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span aria-hidden className="text-2xl text-gold transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p className="body-text measure mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function CtaFinal() {
  return (
    <section id="cta-final" className="section relative overflow-hidden text-center md:py-40">
      <FinalMark />
      <div className="wrap relative">
        <Heading text="O primeiro passo é *decidir começar.*" className="t-1 mx-auto max-w-4xl" />
        <div className="mt-10"><a href="#turma" className="btn">Encontre sua turma</a></div>
      </div>
    </section>
  );
}
