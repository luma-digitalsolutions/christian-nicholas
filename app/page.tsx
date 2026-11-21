import { Footer } from "@/components/layout/Footer";
import { Header, StickyCta } from "@/components/layout/Header";
import { VideoHero } from "@/components/landing/VideoHero";
import { MotionProvider } from "@/components/MotionProvider";
import { ComoFunciona, CtaFinal, Depoimentos, Emocional, Faq, Metodo, Professor, Trajetoria } from "@/components/landing/Sections";

export default function Home() {
  return (
    <MotionProvider>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <VideoHero />
        <Emocional />
        <Metodo />
        <ComoFunciona />
        <Professor />
        <Trajetoria />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <StickyCta />
    </MotionProvider>
  );
}
