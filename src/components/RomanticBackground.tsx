import { useMemo } from "react";

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

export function RomanticBackground({ intense = false }: { intense?: boolean }) {
  const hearts = useMemo(() => make(intense ? 26 : 16, 7), [intense]);
  const petals = useMemo(() => make(intense ? 18 : 12, 31), [intense]);
  const sparks = useMemo(() => make(30, 97), []);

  return (
    <div className="romance-bg" aria-hidden="true">
      <div className="romance-glow romance-glow-a" />
      <div className="romance-glow romance-glow-b" />
      <div className="romance-glow romance-glow-c" />

      {sparks.map((p, i) => (
        <span
          key={`s${i}`}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            width: `${p.size * 4}px`,
            height: `${p.size * 4}px`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}

      {hearts.map((p, i) => (
        <span
          key={`h${i}`}
          className="float-emoji"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            fontSize: `${p.size * 1.1}rem`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          ❤️
        </span>
      ))}

      {petals.map((p, i) => (
        <span
          key={`p${i}`}
          className="float-emoji float-emoji-slow"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration * 1.3}s`,
            opacity: p.opacity * 0.8,
            fontSize: `${p.size}rem`,
            ["--drift" as string]: `${-p.drift}px`,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
}

export default RomanticBackground;
