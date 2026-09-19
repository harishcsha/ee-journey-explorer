export function Logo() {
  return (
    <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,.14)" />
      <path d="M32 6 A26 26 0 0 0 32 58 Z" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="7 4" />
      <path d="M32 6 A26 26 0 0 1 32 58" fill="none" stroke="#fff" strokeWidth="4" />
      <path
        d="M32 18 C42 18 46 26 40 30 C48 34 42 46 32 44"
        fill="none"
        stroke="#f3e94a"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
