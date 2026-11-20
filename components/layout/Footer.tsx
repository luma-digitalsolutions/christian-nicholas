import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink pb-28 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <Image src="/logoprofessor.png" alt="Professor Christian Nicholas — Aulas de Dança" width={160} height={85} className="h-auto w-40" />
          <p className="mt-4 text-sm text-ivory/60">Método Emballo</p>
        </div>
        <nav aria-label="Rodapé" className="space-y-3 text-sm text-ivory/80">
          <a className="block hover:text-gold" href="#metodo">Método Emballo</a>
          <a className="block hover:text-gold" href="#professor">O professor</a>
          <a className="block hover:text-gold" href="#turma">Encontre sua turma</a>
          <Link className="block hover:text-gold" href="/politica-de-privacidade">Política de Privacidade</Link>
        </nav>
        <div className="space-y-3 text-sm text-ivory/80">
          <a className="block hover:text-gold" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a>
          {SITE.whatsapp && <a className="block hover:text-gold" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-5 text-xs text-ivory/40">
        © 2026 Professor Christian Nicholas. Desenvolvido por Luma Soluções Digitais.
      </p>
    </footer>
  );
}
