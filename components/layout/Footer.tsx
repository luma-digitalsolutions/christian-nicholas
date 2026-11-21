import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-ink pb-[calc(7rem+env(safe-area-inset-bottom))] pt-16 md:pb-14">
      <div className="wrap grid gap-10 md:grid-cols-3">
        <div>
          <Image src="/logoprofessor.png" alt="Professor Christian Nicholas — Aulas de Dança" width={394} height={208} className="h-auto w-40" />
          <p className="body-text mt-4 text-sm">Método Emballo</p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col items-start gap-1 text-sm">
          <a className="link py-2" href="#metodo">Método Emballo</a>
          <a className="link py-2" href="#professor">O professor</a>
          <a className="link py-2" href="#turma">Encontre sua turma</a>
          <Link className="link py-2" href="/politica-de-privacidade">Política de Privacidade</Link>
        </nav>
        <div className="flex flex-col items-start gap-1 text-sm">
          <a className="link py-2" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram <span translate="no">{SITE.instagramHandle}</span></a>
          {SITE.whatsapp && <a className="link py-2" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
      </div>
      <p className="wrap body-text mt-12 text-sm">
        © 2026 Professor Christian Nicholas. Desenvolvido por Luma Soluções Digitais.
      </p>
    </footer>
  );
}
