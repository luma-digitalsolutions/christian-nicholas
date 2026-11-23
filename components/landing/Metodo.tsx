import { METODO, METODO_NOTA, METODO_TEXTO } from "@/content/site";
import { Heading } from "../Heading";

/** Símbolo grande de cada elemento natural, em linha fina (terra, fogo, água, ar). */
function Glyph({ i }: { i: number }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 120 96" className="el-glyph h-24 w-[7.5rem] max-w-full" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {i === 0 && (
        <>
          <path d="M6 70 L38 22 L56 46 L70 30 L114 70 Z" />
          <path d="M38 22 L46 36 L40 42 L34 34 Z" />
          <path d="M6 82 H114 M22 92 H98" className="el-part" />
        </>
      )}
      {i === 1 && (
        <>
          <path d="M60 6 C64 28 92 38 86 66 C83 82 70 90 60 90 C48 90 34 82 34 64 C34 48 48 44 48 28 C54 32 58 22 60 6Z" />
          <path d="M60 46 C62 58 74 62 72 74 C71 82 66 86 60 86 C53 86 48 80 49 72 C50 64 57 62 60 46Z" className="el-part" />
        </>
      )}
      {i === 2 && (
        <>
          <path d="M60 6 C60 6 28 40 28 58 C28 76 42 88 60 88 C78 88 92 76 92 58 C92 40 60 6 60 6Z" />
          <path d="M4 62 C14 54 22 54 32 62 M88 62 C98 54 106 54 116 62" className="el-part" />
          <path d="M42 62 C48 70 54 74 62 74" className="el-part" />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M6 30 H78 C100 30 100 8 80 8 C72 8 66 13 66 20" />
          <path d="M6 52 H96 C118 52 118 76 96 76 C88 76 82 71 82 64" className="el-part" />
          <path d="M6 72 H48 M20 90 H62" className="el-part" />
        </>
      )}
    </svg>
  );
}

const TONE = ["#b8804d", "#e8693a", "#6fb3cf", "#d9e2e6"];

export function Metodo() {
  return (
    <section id="metodo" className="section scroll-mt-16">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="eyebrow mb-5">Método Emballo · Os 4 Elementos da Dança</p>
            <Heading text="Transformamos você em uma pessoa *muito mais confiante* através da dança a dois." />
          </div>
          <p className="lead measure">{METODO_TEXTO}</p>
        </div>

        <ol className="mt-[var(--head-gap)] grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {METODO.map((m, i) => (
            <li key={m.n} className="el border-t pt-6" style={{ color: TONE[i], borderColor: `${TONE[i]}66` }}>
              <div className="flex items-center justify-between gap-4">
                <span className="num display outline block text-4xl md:text-5xl" style={{ WebkitTextStrokeColor: TONE[i] }}>{m.n}</span>
                <span className="font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[.22em]">{m.el}</span>
              </div>
              <div className="mt-6 flex h-24 items-center"><Glyph i={i} /></div>
              <h3 className="display t-2 mt-6 text-ivory">{m.t}</h3>
              <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-ivory/85">{m.d}</p>
            </li>
          ))}
        </ol>

        <p className="display t-3 mt-14 max-w-3xl italic text-gold md:mt-20">{METODO_NOTA}</p>
      </div>
    </section>
  );
}
