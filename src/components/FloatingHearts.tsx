const EMOJIS = ["💖", "💕", "🌸", "✨", "💗", "🌹", "💝", "⭐"];

export function FloatingHearts({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 10;
        const size = 16 + Math.random() * 28;
        const emoji = EMOJIS[i % EMOJIS.length];
        return (
          <span
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

export function Sparkles({ count = 25 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${8 + Math.random() * 14}px`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
