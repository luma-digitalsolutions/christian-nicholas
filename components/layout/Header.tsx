"use client";
import { CoupleMark } from "../CoupleMark";
import { useState } from "react";

const LINKS = [["Método", "#metodo"], ["Professor", "#professor"], ["Como funciona", "#como-funciona"], ["Dúvidas", "#duvidas"]];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#topo" aria-label="Professor Christian Nicholas — início">
          <CoupleMark className="h-11 w-11" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="text-xs uppercase tracking-[.22em] text-ivory/80 transition hover:text-gold">{l}</a>)}
          <a href="#turma" className="btn-gold !min-h-10 !px-5">Encontre sua turma</a>
        </nav>
        <button className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          <span className={`h-px w-6 bg-gold transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-gold transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-gold transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-gold/15 bg-ink px-5 pb-6 md:hidden">
          {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-ivory/10 py-4 text-sm uppercase tracking-[.2em]">{l}</a>)}
          <a href="#turma" onClick={() => setOpen(false)} className="btn-gold mt-5 w-full">Encontre sua turma</a>
        </nav>
      )}
    </header>
  );
}

/** CTA fixo no mobile, sempre ao alcance do polegar. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/90 p-3 backdrop-blur md:hidden">
      <a href="#turma" className="btn-gold w-full">Encontre sua turma</a>
    </div>
  );
}
