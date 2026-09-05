import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Music, VolumeX } from "lucide-react";
import RomanticBackground from "@/components/RomanticBackground";
import Confetti from "@/components/Confetti";
import IntroScreen from "@/components/IntroScreen";
import { getBirthdayTarget, MUSIC_SRC } from "@/lib/love-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Something Special Is Coming — A Birthday Surprise ❤️" },
      {
        name: "description",
        content:
          "A romantic birthday countdown made with love. Every second brings me closer to celebrating you.",
      },
      { property: "og:title", content: "Something Special Is Coming ❤️" },
      {
        property: "og:description",
        content: "A romantic birthday countdown made with love, just for you.",
      },
    ],
  }),
  component: CountdownPage,
});

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function diff(target: Date): Remaining {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: false,
  };
}

function CountdownPage() {
  const navigate = useNavigate();
  const [target] = useState(() => getBirthdayTarget());
  const [time, setTime] = useState<Remaining | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen") !== "1") setShowIntro(true);
  }, []);


  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => {
      const next = diff(target);
      setTime(next);
      if (next.done) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  // Try to play music; browsers may block autoplay — then we just show the button.
  useEffect(() => {
    if (!MUSIC_SRC || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const finished = time?.done ?? false;

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-12 sm:px-8">
      <RomanticBackground intense={finished} />
      {finished && <Confetti />}

      {MUSIC_SRC && (
        <>
          <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
          <button
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : "Play music"}
            className="glass-card fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center text-blush transition-transform hover:scale-105"
          >
            {playing ? <Music className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </>
      )}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col items-center justify-center text-center">
        {!finished ? (
          <>
            <p
              className="reveal font-display text-2xl italic tracking-wide text-blush sm:text-3xl"
              style={{ animationDelay: "0.1s" }}
            >
              Something Special Is Coming...
            </p>

            <h1
              className="reveal font-display mt-3 text-5xl font-semibold leading-tight text-love sm:text-7xl"
              style={{ animationDelay: "0.3s" }}
            >
              For My Love ❤️
            </h1>

            <div className="reveal my-8 sm:my-10" style={{ animationDelay: "0.5s" }}>
              <Heart className="heart-glow h-24 w-24 fill-rose text-rose sm:h-28 sm:w-28" />
            </div>

            <div
              className="reveal glass-card grid w-full grid-cols-4 gap-1 px-3 py-6 sm:gap-3 sm:px-8 sm:py-8"
              style={{ animationDelay: "0.7s" }}
            >
              {[
                { label: "Days", value: time?.days },
                { label: "Hours", value: time?.hours },
                { label: "Minutes", value: time?.minutes },
                { label: "Seconds", value: time?.seconds },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center gap-1">
                  <span className="font-display text-4xl font-semibold tabular-nums text-foreground sm:text-6xl">
                    {time ? String(unit.value).padStart(2, "0") : "--"}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="reveal mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
              style={{ animationDelay: "0.9s" }}
            >
              Every second brings me closer to celebrating you ❤️
            </p>
          </>
        ) : (
          <>
            <div className="reveal mb-8">
              <Heart className="heart-glow h-28 w-28 fill-rose text-rose sm:h-32 sm:w-32" />
            </div>
            <h1
              className="reveal font-display text-4xl font-semibold leading-tight text-love sm:text-6xl"
              style={{ animationDelay: "0.2s" }}
            >
              HAPPY BIRTHDAY,
              <br />
              MY LOVE ❤️
            </h1>
            <p
              className="reveal mt-5 max-w-sm text-base text-muted-foreground"
              style={{ animationDelay: "0.45s" }}
            >
              Today the whole world gets to celebrate what I celebrate every single day.
            </p>
            <button
              onClick={() => navigate({ to: "/secret" })}
              className="reveal btn-love mt-10 rounded-full px-10 py-4 text-base font-medium tracking-wide"
              style={{ animationDelay: "0.7s" }}
            >
              Continue ❤️
            </button>
          </>
        )}
      </section>
    </main>
  );
}
