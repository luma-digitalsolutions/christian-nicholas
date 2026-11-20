"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FindClass } from "../forms/FindClass";
import { SplitText } from "../Motion";

const VIDEO_ID = "AATdDNqO5nI";

export function VideoHero() {
  const [play, setPlay] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="topo" className="relative overflow-hidden px-5 pb-16 pt-24">
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div>
        <div className="mb-5">
          <p className="eyebrow">Método Emballo · Aula VIP</p>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          className="group relative aspect-video w-full overflow-hidden border border-gold/40 bg-ink2 ">
          {play ? (
            <iframe className="absolute inset-0 h-full w-full" title="Você não precisa saber dançar para começar — Aula VIP, Professor Christian Nicholas"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          ) : (
            <button onClick={() => setPlay(true)} aria-label="Assistir ao vídeo: Você não precisa saber dançar para começar" className="absolute inset-0 h-full w-full cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" className="h-full w-full object-cover opacity-80 " />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ink transition group-hover:scale-110 md:h-28 md:w-28">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 md:h-11 md:w-11" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
              <span className="absolute bottom-4 left-5 right-5 text-left font-[family-name:var(--font-label)] text-[.7rem] uppercase tracking-[.25em] text-ivory md:bottom-6 md:left-8 md:text-xs">
                Você não precisa saber dançar para começar
              </span>
            </button>
          )}
        </motion.div>

        <div className="mt-8">
          <SplitText as="h1" delay={0.3} className="text-[clamp(2.2rem,4.6vw,4.2rem)]" text="A confiança que transforma sua dança *começa aqui.*" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">Descubra como dançar com leveza, segurança e liberdade, mesmo que hoje você acredite que não leva jeito.</p>
          <div className="mt-6"><a href="#metodo" className="btn-ghost">Conheça o método</a></div>
        </div>
        </div>

        <div><FindClass /></div>
      </div>
    </section>
  );
}
