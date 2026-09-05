import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Heart, Music, Sparkles, VolumeX } from "lucide-react";
import { INTRO } from "@/lib/love-config";
import { useFireworksSound } from "@/components/useFireworksSound";

const FIREWORK_COLORS = [
  "var(--sky)",
  "var(--azure)",
  "var(--blue-glow)",
  "var(--rose)",
  "var(--gold)",
  "var(--blush)",
];

type Firework = { id: number; left: number; top: number; color: string };

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"idle" | "show" | "final" | "leaving">("idle");
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { burst, unlock } = useFireworksSound();

  const stars = useMemo(() => {
    const rnd = seeded(4242);
    return Array.from({ length: 70 }, () => ({
      left: rnd() * 100,
      top: rnd() * 100,
      size: 1 + rnd() * 2.4,
      delay: rnd() * 4,
      duration: 2.4 + rnd() * 3,
    }));
  }, []);

  const hearts = useMemo(() => {
    const rnd = seeded(777);
    return Array.from({ length: 14 }, () => ({
      left: rnd() * 100,
      delay: rnd() * 10,
      duration: 12 + rnd() * 12,
      size: 14 + rnd() * 18,
      drift: (rnd() - 0.5) * 120,
    }));
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const start = useCallback(() => {
    if (stage !== "idle") return;
    unlock();
    setStage("show");

    if (INTRO.musicSrc && audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }

    const rnd = seeded(9182);
    const count = 10;
    for (let i = 0; i < count; i++) {
      const at = 350 + i * 620;
      later(() => {
        const fw: Firework = {
          id: Date.now() + i,
          left: 12 + rnd() * 76,
          top: 10 + rnd() * 45,
          color: FIREWORK_COLORS[Math.floor(rnd() * FIREWORK_COLORS.length)] ?? "var(--sky)",
        };
        setFireworks((prev) => [...prev, fw]);
        burst(0.45 + rnd() * 0.35);
        later(() => setFireworks((prev) => prev.filter((f) => f.id !== fw.id)), 1800);
      }, at);
    }

    later(() => setStage("final"), 350 + count * 620 + 300);
    later(() => setStage("leaving"), 350 + count * 620 + 3400);
    later(onFinish, 350 + count * 620 + 4500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, burst, unlock, onFinish]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setStage("leaving");
    later(onFinish, 900);
  };

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <div className={`intro-screen ${stage === "leaving" ? "intro-leaving" : ""}`}>
      <div className="intro-sky" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="intro-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
        {hearts.map((h, i) => (
          <span
            key={`h${i}`}
            className="intro-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              // @ts-expect-error custom property
              "--drift": `${h.drift}px`,
            }}
          >
            💙
          </span>
        ))}
        {fireworks.map((f) => (
          <span key={f.id} className="firework" style={{ left: `${f.left}%`, top: `${f.top}%` }}>
            {Array.from({ length: 18 }, (_, i) => (
              <i
                key={i}
                className="firework-spark"
                style={{
                  background: f.color,
                  // @ts-expect-error custom property
                  "--angle": `${(360 / 18) * i}deg`,
                  "--dist": `${70 + (i % 4) * 22}px`,
                }}
              />
            ))}
          </span>
        ))}
      </div>

      {INTRO.musicSrc && (
        <>
          <audio ref={audioRef} src={INTRO.musicSrc} loop preload="auto" />
          <button
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : "Play music"}
            className="glass-card fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center text-sky transition-transform hover:scale-105"
          >
            {playing ? <Music className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </>
      )}

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
        {stage !== "final" && stage !== "leaving" ? (
          <>
            <div className="reveal mb-6" style={{ animationDelay: "0.1s" }}>
              <Heart className="heart-glow-blue h-20 w-20 fill-current sm:h-24 sm:w-24" />
            </div>
            <h1
              className="reveal font-display text-4xl font-semibold leading-tight text-glow-blue sm:text-6xl"
              style={{ animationDelay: "0.3s" }}
            >
              Advance Happy Birthday, {INTRO.name} ❤️
            </h1>
            <p
              className="reveal mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "0.55s" }}
            >
              Your special day is coming… and I couldn&apos;t wait to celebrate you. 💙✨
            </p>

            {stage === "idle" ? (
              <button
                onClick={start}
                className="reveal btn-yes mt-10 rounded-full px-10 py-4 text-base font-medium tracking-wide"
                style={{ animationDelay: "0.8s" }}
              >
                Start the Surprise 💙
              </button>
            ) : (
              <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" /> Enjoy the show…
              </p>
            )}
          </>
        ) : (
          <h1 className="reveal font-display text-4xl font-semibold leading-tight text-glow-blue sm:text-6xl">
            Advance Happy Birthday, {INTRO.name} 💙🎂
          </h1>
        )}
      </section>

      {stage === "show" && (
        <button onClick={skip} className="intro-skip" aria-label="Skip intro">
          Skip →
        </button>
      )}
    </div>
  );
}

export default IntroScreen;
