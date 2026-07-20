export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 shadow-lg shadow-brand-600/30">
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <path
            d="M5 18 L11 18 L14 9 L18 23 L21 15 L24 15 L27 15"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">Pulse</span>
    </div>
  );
}
