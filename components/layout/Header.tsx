"use client";
import { CoupleMark } from "../CoupleMark";
import { useEffect, useState } from "react";

const LINKS = [["Método", "#metodo"], ["Professor", "#professor"], ["Como funciona", "#como-funciona"], ["Dúvidas", "#duvidas"]];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#topo" aria-label="Professor Christian Nicholas — início" className="-ml-1 p-1">
          <CoupleMark className="h-11 w-11" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="link py-2 text-[.8125rem] uppercase tracking-[.18em] text-ivory/85">{l}</a>)}
          <a href="#turma" className="btn btn-sm">Encontre sua turma</a>
        </nav>
        <button type="button" className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          <span className={`h-px w-6 bg-gold transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-gold transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-gold transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="wrap border-t border-gold/15 bg-ink pb-6 md:hidden">
          {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-ivory/10 py-4 text-sm uppercase tracking-[.18em]">{l}</a>)}
          <a href="#turma" onClick={() => setOpen(false)} className="btn mt-5 w-full">Encontre sua turma</a>
        </nav>
      )}
    </header>
  );
}

/** CTA fixo no mobile; some quando o formulário (#turma) ou o CTA final estão visíveis. */
export function StickyCta() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const targets = ["turma", "cta-final"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHidden(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <div inert={hidden} className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/95 px-3 pt-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${hidden ? "invisible translate-y-full" : ""}`}>
      <a href="#turma" className="btn w-full">Encontre sua turma</a>
    </div>
  );
}
