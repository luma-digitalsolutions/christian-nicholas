import type { Metadata } from "next";
import { MotionProvider } from "@/components/MotionProvider";
import { Aprender, CtaFinal, Hero, Informacoes, Inclui, InscricaoFooter, InscricaoHeader, MetodoResumo, Professor } from "@/components/inscricao/Sections";

const TITLE = "Aula Gratuita de Dança | Dance com Confiança — Método EMBALLO";
const DESC = "Participe da aula gratuita DANCE COM CONFIANÇA com Christian Nicholas e descubra como superar a vergonha e desenvolver confiança na dança.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/inscricao" },
  openGraph: {
    title: TITLE, description: DESC, type: "website", locale: "pt_BR", url: "/inscricao",
    images: [{ url: "/logoprofessor.png", width: 394, height: 208, alt: "Professor Christian Nicholas — Aulas de Dança" }],
  },
};

export default function Inscricao() {
  return (
    <MotionProvider>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <InscricaoHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Aprender />
        <Informacoes />
        <Inclui />
        <MetodoResumo />
        <Professor />
        <CtaFinal />
      </main>
      <InscricaoFooter />
    </MotionProvider>
  );
}
