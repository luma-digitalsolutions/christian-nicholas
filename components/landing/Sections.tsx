import Image from "next/image";
import { DEPOIMENTOS, FAQ, INSECURITIES, METODO, PASSOS, SITE } from "@/content/site";
import { Reveal } from "../Reveal";
import { Spot, SplitText } from "../Motion";

const Title = ({ eyebrow, children }: { eyebrow: string; children: string }) => (
  <div className="mb-14 max-w-4xl">
    <Reveal><p className="eyebrow mb-5">{eyebrow}</p></Reveal>
    <SplitText className="text-[clamp(2.4rem,6vw,5rem)]" text={children as string} />
  </div>
);
const Section = ({ id, children, alt }: { id: string; children: React.ReactNode; alt?: boolean }) => (
  <section id={id} className={`scroll-mt-16 px-5 py-20 md:py-28 ${alt ? "bg-ink2" : ""}`}><div className="mx-auto max-w-6xl">{children}</div></section>
);

export function Emocional() {
  return (
    <>
    <Section id="voce" alt>
      <Title eyebrow="Você não precisa saber dançar">Todo mundo começa *do zero.*</Title>
      <div className="grid gap-px bg-gold/20 sm:grid-cols-2">
        {INSECURITIES.map((i, n) => (
          <Reveal key={i.t} delay={n * 0.08} className="bg-ink2"><Spot className="h-full p-8">
            <h3 className="display text-3xl text-ivory">{i.t}</h3>
            <p className="mt-3 text-ivory/70">{i.d}</p>
          </Spot></Reveal>
        ))}
      </div>
      <Reveal><p className="mt-10 max-w-2xl display text-3xl italic text-gold">Dançar é uma habilidade — e habilidades se desenvolvem.</p></Reveal>
    </Section>
    </>
  );
}

export function Metodo() {
  return (
    <Section id="metodo">
      <Title eyebrow="Método Emballo">Dançar pode ser *mais simples* do que você imagina.</Title>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {METODO.map((m, n) => (
          <Reveal key={m.n} delay={n * 0.1}>
            <Spot className="h-full"><article className="group h-full border border-gold/25 p-7 transition duration-500 hover:-translate-y-1 hover:border-gold">
              <span className="display outline text-6xl transition group-hover:text-gold">{m.n}</span>
              <h3 className="mt-6 display text-3xl">{m.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{m.d}</p>
            </article></Spot>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Professor() {
  return (
    <Section id="professor" alt>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden border border-gold/30 bg-ink">
            {SITE.professorPhoto
              ? <Image src={SITE.professorPhoto} alt="Professor Christian Nicholas" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              : <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <Image src="/logoprofessor.png" alt="" width={240} height={127} className="opacity-80" />
                  <p className="text-xs uppercase tracking-[.25em] text-ivory/40">Foto do professor — pendente</p>
                </div>}
          </div>
        </Reveal>
        <div>
          <Title eyebrow="O professor">Christian *Nicholas*</Title>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ivory/80">Professor de dança e criador do Método Emballo, dedicado a ajudar pessoas a dançarem com confiança — mesmo quando sentem vergonha ou acham que não nasceram para isso.</p>
            {/* PENDENTE: trajetória, formação e experiência — receber do professor / site oficial. Não inventar. */}
            <p className="mt-5 text-sm text-ivory/50">Trajetória e formação em atualização. Acompanhe o dia a dia no <a className="text-gold underline-offset-4 hover:underline" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a>.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function ComoFunciona() {
  return (
    <Section id="como-funciona">
      <Title eyebrow="Como funcionam as aulas">Quatro passos até *a sua turma.*</Title>
      <ol className="grid gap-8 md:grid-cols-4">
        {PASSOS.map((p, n) => (
          <Reveal key={p.t} delay={n * 0.1}>
            <li className="relative border-t border-gold/40 pt-6">
              <span className="display outline text-7xl">{n + 1}</span>
              <h3 className="mt-3 display text-3xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{p.d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Depoimentos() {
  return (
    <Section id="depoimentos" alt>
      <Title eyebrow="Depoimentos">Histórias de quem *começou.*</Title>
      {DEPOIMENTOS.length === 0 ? (
        <p className="max-w-xl border border-dashed border-gold/30 p-8 text-ivory/60">Em breve, relatos reais de alunos. Enquanto isso, acompanhe os resultados no <a className="text-gold" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d) => <figure key={d.nome} className="border border-gold/25 p-7"><blockquote className="display text-2xl">“{d.texto}”</blockquote><figcaption className="mt-4 text-xs uppercase tracking-widest text-gold">{d.nome}</figcaption></figure>)}
        </div>
      )}
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="duvidas">
      <Title eyebrow="Perguntas frequentes">Tire suas *dúvidas.*</Title>
      <div className="max-w-3xl divide-y divide-gold/20 border-y border-gold/20">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 display text-2xl md:text-4xl">
              {f.q}<span aria-hidden className="text-2xl text-gold transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ivory/70">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden px-5 py-28 text-center">
      {SITE.finalImage && <Image src={SITE.finalImage} alt="" fill className="object-cover opacity-30" sizes="100vw" />}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,174,112,.14),transparent_60%)]" />
      <Reveal className="relative">
        <SplitText className="mx-auto max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)]" text="O primeiro passo é *decidir começar.*" />
        <a href="#turma" className="btn-gold mt-10">Encontre sua turma</a>
      </Reveal>
    </section>
  );
}
