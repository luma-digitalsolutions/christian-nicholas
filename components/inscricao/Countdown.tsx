"use client";
import { useEffect, useState } from "react";
import { EVENTO } from "@/content/inscricao";

const START = new Date(EVENTO.inicioISO).getTime();
const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem regressiva até o início da aula. Nunca fica negativa: depois do início, mostra aviso. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div aria-hidden className="h-[5.5rem]" />; // reserva espaço; evita salto e divergência de hidratação
  const left = Math.max(0, START - now);
  if (left === 0) return <p className="display t-4 italic text-gold">Esta aula já aconteceu.</p>;

  const s = Math.floor(left / 1000);
  const parts = [["dias", Math.floor(s / 86400)], ["horas", Math.floor((s % 86400) / 3600)], ["min", Math.floor((s % 3600) / 60)], ["seg", s % 60]] as const;
  return (
    <div role="timer" aria-label={`Faltam ${parts[0][1]} dias, ${parts[1][1]} horas e ${parts[2][1]} minutos para a aula`} className="flex gap-6 md:gap-10">
      {parts.map(([l, v]) => (
        <div key={l} aria-hidden className="border-t border-gold/40 pt-3">
          <span className="num display block text-4xl text-ivory md:text-5xl">{l === "dias" ? v : pad(v)}</span>
          <span className="eyebrow !gap-0 !text-[.75rem] before:hidden">{l}</span>
        </div>
      ))}
    </div>
  );
}
