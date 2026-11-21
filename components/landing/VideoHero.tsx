"use client";
import { useState } from "react";
import { FindClass } from "../forms/FindClass";

const VIDEO_ID = "AATdDNqO5nI";

export function VideoHero() {
  const [play, setPlay] = useState(false);
  return (
    <section id="topo" className="pb-16 pt-[5.25rem] md:pb-24 md:pt-32">
      <div className="wrap grid items-start gap-x-16 gap-y-8 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-[auto_1fr]">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow mb-5 hidden sm:inline-flex">Método Emballo · Aula VIP</p>
          <h1 className="display t-1 enter">A confiança que transforma sua dança <em>começa aqui.</em></h1>
          <p className="lead enter enter-2 mt-4 max-w-xl md:mt-6">Dance com leveza e segurança, mesmo que hoje você ache que não leva jeito.</p>
        </div>

        <div className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1"><FindClass /></div>

        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-8">
          <div className="relative aspect-video w-full overflow-hidden border border-gold/40 bg-ink2">
            {play ? (
              <iframe className="absolute inset-0 h-full w-full" title="Você não precisa saber dançar para começar — Aula VIP, Professor Christian Nicholas"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            ) : (
              <button type="button" onClick={() => setPlay(true)} aria-label="Assistir ao vídeo: Você não precisa saber dançar para começar" className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" width={1280} height={720} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center bg-gold text-ink transition-transform duration-200 group-hover:scale-105 group-active:scale-95 md:h-20 md:w-20">
                    <svg aria-hidden focusable="false" viewBox="0 0 24 24" className="ml-1 h-7 w-7 md:h-9 md:w-9" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </button>
            )}
          </div>
          <p className="mt-6"><a href="#metodo" className="link py-3 text-sm font-semibold uppercase tracking-[.14em]">Conheça o método</a></p>
        </div>
      </div>
    </section>
  );
}
