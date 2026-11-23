import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Syne } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const label = Syne({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-label", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Professor Christian Nicholas — Aulas de Dança | Método Emballo",
  description: "Dance com confiança em até 30 dias, mesmo que hoje você tenha vergonha. Encontre a turma do Professor Christian Nicholas no seu bairro, dia e horário.",
  openGraph: {
    title: "Professor Christian Nicholas — Aulas de Dança",
    description: "A confiança que transforma sua dança começa aqui. Encontre sua turma.",
    type: "website", locale: "pt_BR", images: [{ url: "/logoprofessor.png", width: 394, height: 208, alt: "Professor Christian Nicholas — Aulas de Dança" }],
  },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#080808", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org", "@type": "DanceSchool", name: "Professor Christian Nicholas — Aulas de Dança",
    url: SITE, sameAs: ["https://www.instagram.com/profchristiannicholas"], image: `${SITE}/logoprofessor.png`,
  };
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${label.variable}`}>
      <head><link rel="preconnect" href="https://i.ytimg.com" /></head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
