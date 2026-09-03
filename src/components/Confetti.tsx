import { useMemo } from "react";

const COLORS = [
  "var(--rose)",
  "var(--blush)",
  "var(--plum)",
  "var(--gold)",
  "var(--crimson)",
];

export function Confetti({ pieces = 80 }: { pieces?: number }) {
  const bits = useMemo(() => {
    let s = 12345;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: pieces }, () => ({
      left: rnd() * 100,
      delay: rnd() * 3,
      duration: 3.5 + rnd() * 3.5,
      color: COLORS[Math.floor(rnd() * COLORS.length)],
      rotate: rnd() * 360,
      w: 5 + rnd() * 6,
      h: 8 + rnd() * 10,
    }));
  }, [pieces]);

  return (
    <div className="confetti-layer" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className="confetti-bit"
          style={{
            left: `${b.left}%`,
            width: `${b.w}px`,
            height: `${b.h}px`,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            transform: `rotate(${b.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
