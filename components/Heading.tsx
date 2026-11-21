import type { ElementType } from "react";

/** Título estático. `*palavra*` vira itálico dourado. Sem animação ligada à rolagem. */
export function Heading({ text, as: Tag = "h2", className = "t-2" }: { text: string; as?: ElementType; className?: string }) {
  return (
    <Tag className={`display ${className}`}>
      {text.split(/(\*[^*]+\*)/).filter(Boolean).map((p, i) => (p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : p))}
    </Tag>
  );
}
