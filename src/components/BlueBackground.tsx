import { useMemo } from "react";
import { Heart } from "lucide-react";

type Item = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
};

function make(count: number, seed: number): Item[] {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    left: rnd() * 100,
    delay: rnd() * 18,
    duration: 14 + rnd() * 16,
    size: 0.6 + rnd() * 1.4,
    opacity: 0.25 + rnd() * 0.5,
    drift: (rnd() - 0.5) * 120,
  }));
}

export function BlueBackground({ intense = false }: { intense?: boolean }) {
  const hearts = useMemo(() => make(intense ? 24 : 14, 13), [intense]);
  const sparkles = useMemo(() => make(intense ? 22 : 14, 71), [intense]);
  const glowHearts = useMemo(() => make(intense ? 8 : 5, 101), [intense]);

  return (
    <div className="romance-bg" aria-hidden="true">
      <div className="blue-glow blue-glow-a" />
      <div className="blue-glow blue-glow-b" />
      <div className="blue-glow blue-glow-c" />

      {glowHearts.map((p, i) => (
        <Heart
          key={`gh${i}`}
          className="heart-glow-blue absolute fill-sky text-sky"
          style={{
            left: `${p.left}%`,
            top: `${((p.delay / 18) * 80 + 10).toFixed(1)}%`,
            width: `${p.size * 1.8 + 1.2}rem`,
            height: `${p.size * 1.8 + 1.2}rem`,
            animationDelay: `${p.delay}s`,
            opacity: 0.35 + p.opacity * 0.45,
          }}
        />
      ))}

      {sparkles.map((p, i) => (
        <span
          key={`s${i}`}
          className="float-blue"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            fontSize: `${p.size * 1.1}rem`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          ✨
        </span>
      ))}

      {hearts.map((p, i) => (
        <span
          key={`h${i}`}
          className="float-blue float-blue-slow"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration * 1.3}s`,
            opacity: p.opacity * 0.85,
            fontSize: `${p.size}rem`,
            ["--drift" as string]: `${-p.drift}px`,
          }}
        >
          💙
        </span>
      ))}
    </div>
  );
}

export default BlueBackground;
