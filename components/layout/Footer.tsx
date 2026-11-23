import Link from "next/link";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-ink pb-[calc(7rem+env(safe-area-inset-bottom))] pt-12 md:pb-14">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 text-sm md:justify-start">
            <a className="link py-2" href="#metodo">Método Emballo</a>
            <a className="link py-2" href="#professor">O professor</a>
            <a className="link py-2" href="#turma">Encontre sua turma</a>
          </nav>
          <div className="flex flex-wrap gap-x-8 text-sm md:justify-center">
            <a className="link py-2" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram <span translate="no">{SITE.instagramHandle}</span></a>
            {SITE.whatsapp && <a className="link py-2" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          </div>
          <div className="text-sm md:text-right"><Link className="link py-2" href="/politica-de-privacidade">Política de Privacidade</Link></div>
        </div>
        <p className="body-text mt-8 text-sm md:text-center">© 2026 Professor Christian Nicholas. Desenvolvido por Luma Soluções Digitais.</p>
      </div>
    </footer>
  );
}
