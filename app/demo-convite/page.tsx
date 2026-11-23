import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { robots: { index: false } };
export default function DemoConvite() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 text-center">
      <p className="eyebrow mb-4">Modo demonstração</p>
      <h1 className="display text-4xl">Aqui abriria o grupo de WhatsApp da turma.</h1>
      <p className="mt-4 text-ivory/70">Em produção, este botão leva ao convite real cadastrado na planilha. Nada foi salvo em Google Sheets.</p>
      <Link href="/#turma" className="btn mt-8">Voltar ao site</Link>
    </main>
  );
}
