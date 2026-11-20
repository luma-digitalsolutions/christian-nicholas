"use client";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

/** Texto em máscara: palavras sobem uma a uma. `*palavra*` vira itálico dourado. */
export function SplitText({ text, className = "", delay = 0, as: Tag = "h2" }: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" }) {
  const reduce = useReducedMotion();
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  let i = 0;
  const M = motion[Tag];
  return (
    <M className={`display ${className}`} initial="h" whileInView="v" viewport={{ once: true, margin: "-80px" }} aria-label={text.replace(/\*/g, "")}>
      {parts.flatMap((part) => {
        const em = part.startsWith("*");
        return part.replace(/\*/g, "").split(" ").filter(Boolean).map((w) => {
          const n = i++;
          const word = (
            <motion.span key={n} aria-hidden className="inline-block"
              variants={reduce ? undefined : { h: { y: "110%", rotate: 4 }, v: { y: 0, rotate: 0 } }}
              transition={{ duration: 0.9, delay: delay + n * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              {em ? <em>{w}</em> : w}
            </motion.span>
          );
          return (
            <span key={n} className="inline-block overflow-hidden pb-[.12em] align-bottom">{word}{" "}</span>
          );
        });
      })}
    </M>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold" />;
}

/** Botão que "puxa" em direção ao cursor (só ponteiro fino). */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25); y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  return <motion.div className={`inline-block ${className ?? ""}`} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}

/** Card com brilho dourado que segue o cursor. */
export function Spot({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`spot ${className}`} onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    }}>{children}</div>
  );
}

export function Marquee({ words, className = "" }: { words: string[]; className?: string }) {
  const row = (k: string) => words.map((w, i) => (
    <span key={k + i} className="flex items-center gap-10 pr-10">
      <span className={i % 2 ? "outline" : "text-ivory"}>{w}</span><span className="text-gold">✦</span>
    </span>
  ));
  return (
    <div aria-hidden className={`overflow-hidden whitespace-nowrap border-y border-gold/25 py-5 ${className}`}>
      <div className="marquee-track display text-5xl md:text-7xl">{row("a")}{row("b")}</div>
    </div>
  );
}
