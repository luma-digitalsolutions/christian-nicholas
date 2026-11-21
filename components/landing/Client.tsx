import Image from "next/image";
import { CoupleMark } from "../CoupleMark";

/** Retrato do professor: tamanho nativo da foto, moldura dourada fina deslocada. Estático. */
export function Portrait({ src }: { src: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] md:mx-0">
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/50 md:translate-x-5 md:translate-y-5" />
      <Image src={src} alt="Retrato do professor Christian Nicholas, de camisa cinza, sorrindo com a mão apoiada no queixo, sobre fundo escuro"
        width={417} height={449} sizes="(min-width: 768px) 416px, 90vw" priority={false} className="relative block h-auto w-full bg-ink2" />
    </div>
  );
}

/** Silhueta do casal ao fim da página, estática. */
export function FinalMark() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 w-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-[.14]">
      <CoupleMark decorative className="h-auto w-full" />
    </div>
  );
}
