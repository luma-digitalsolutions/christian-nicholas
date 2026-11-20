/** Silhueta dourada de um casal dançando (marca do cabeçalho). */
export function CoupleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Professor Christian Nicholas — Aulas de Dança" className={className}>
      <g fill="#D6AE70" stroke="#080808" strokeWidth="1.1" strokeLinejoin="round">
        <ellipse cx="78" cy="22" rx="5" ry="6.3" transform="rotate(-22 78 22)" />
        <path d="M64 33 C68 29 77 30 81 35 L79 46 C75 53 71 57 69 63 L58 61 C61 52 63 42 64 33 Z" />
        <path d="M58 61 L69 63 C82 69 97 80 109 98 C101 103 95 98 89 102 C83 106 77 101 71 105 C63 109 52 107 40 110 C46 102 52 91 54 79 C55 71 56 65 58 61 Z" />
        <path d="M79 36 C88 36 96 30 100 20 L103 22 C100 34 91 44 80 45 Z" />
        <g stroke="none">
          <ellipse cx="37" cy="15" rx="5.6" ry="6.8" transform="rotate(10 37 15)" />
          <path d="M27 31 C31 26 42 26 49 30 L47 47 L45 64 L32 64 L30 46 Z" />
          <path d="M32 58 L46 58 L50 82 L63 107 L56 110 L43 88 L40 110 L31 110 L34 82 Z" />
        </g>
        <path d="M47 29 L60 11 L65 14 L51 35 Z" />
        <path d="M65 34 L59 14 L63 11 L70 31 Z" />
      </g>
    </svg>
  );
}
