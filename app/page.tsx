import { Footer } from "@/components/layout/Footer";
import { Header, StickyCta } from "@/components/layout/Header";
import { VideoHero } from "@/components/landing/VideoHero";
import { ScrollProgress } from "@/components/Motion";
import { ComoFunciona, CtaFinal, Depoimentos, Emocional, Faq, Metodo, Professor, Trajetoria } from "@/components/landing/Sections";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <VideoHero />
        <Emocional />
        <Metodo />
        <Professor />
        <Trajetoria />
        <ComoFunciona />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
