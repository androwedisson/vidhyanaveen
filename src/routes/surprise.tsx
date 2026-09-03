import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";

export const Route = createFileRoute("/surprise")({
  head: () => ({
    meta: [
      { title: "Wanna See Your Surprise? 💙 — Birthday Surprise" },
      {
        name: "description",
        content: "A dreamy question wrapped in love, sparkles, and blue hearts.",
      },
      { property: "og:title", content: "Wanna See Your Surprise? 💙" },
      {
        property: "og:description",
        content: "A dreamy question wrapped in love, sparkles, and blue hearts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SurprisePage,
});

function randomPos() {
  return { left: 10 + Math.random() * 80, top: 10 + Math.random() * 80 };
}

function SurprisePage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0); // 0 = initial, 1 = moved once, 2 = ready
  const [moving, setMoving] = useState(false);
  const [yesPos, setYesPos] = useState({ left: 72, top: 50 });
  const [noMsg, setNoMsg] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const moveYes = () => setYesPos(randomPos());

  const runSequence = () => {
    setMoving(true);
    let step = 0;
    const next = () => {
      step++;
      moveYes();
      if (step < 4) {
        setTimeout(next, 520);
      } else {
        setTimeout(() => {
          setMoving(false);
          setStage(2);
        }, 520);
      }
    };
    next();
  };

  const handleYesPointer = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (leaving) return;
    if (stage === 0) {
      e.preventDefault();
      moveYes();
      setStage(1);
    } else if (stage === 1 && !moving) {
      e.preventDefault();
      runSequence();
    }
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stage !== 2 || leaving) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setLeaving(true);
    setTimeout(() => navigate({ to: "/gift" }), 450);
  };

  const handleNo = () => {
    setNoMsg(true);
    setTimeout(() => setNoMsg(false), 2400);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-dream px-5 py-12 sm:px-8">
      <BlueBackground intense={stage === 2 || noMsg} />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <p
            className="reveal quote-glow text-center text-lg sm:text-left sm:text-xl"
            style={{ animationDelay: "0.1s" }}
          >
            “You are my favorite reason to smile. 💙”
          </p>
          <p
            className="reveal quote-glow text-center text-lg sm:text-right sm:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            “Every moment with you feels a little more beautiful. ✨”
          </p>
        </div>

        <div
          className="glass-card glass-card-blue reveal my-10 w-full max-w-md px-6 py-10 text-center sm:px-8 sm:py-12"
          style={{ animationDelay: "0.35s" }}
        >
          <Heart className="heart-glow-blue mx-auto h-16 w-16 fill-sky text-sky" />
          <h1 className="font-display mt-5 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Wanna see your surprise? 🥰💙
          </h1>

          <div className="relative mt-8 h-28 w-full">
            <div className="flex h-full items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleNo}
                className="btn-no rounded-full px-10 py-4 text-base font-medium active:scale-95"
              >
                NO 🙈
              </button>
            </div>

            <button
              type="button"
              onPointerDown={handleYesPointer}
              onClick={handleYesClick}
              className="btn-yes absolute z-20 cursor-pointer rounded-full px-10 py-4 text-base font-semibold tracking-wide"
              style={{
                left: `${yesPos.left}%`,
                top: `${yesPos.top}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              YES 💙
            </button>
          </div>

          <p
            className={`mt-2 min-h-7 text-lg font-medium text-sky transition-opacity duration-300 ${
              noMsg ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            Are you sure? 🥺💙
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 pb-6 sm:grid-cols-2">
          <p
            className="reveal quote-glow text-center text-lg sm:text-left sm:text-xl"
            style={{ animationDelay: "0.5s" }}
          >
            “My heart chose you, and it keeps choosing you every day. 💙”
          </p>
          <p
            className="reveal quote-glow text-center text-lg sm:text-right sm:text-xl"
            style={{ animationDelay: "0.6s" }}
          >
            “You make my world brighter just by being in it. 🥰”
          </p>
        </div>
      </section>

      {leaving && (
        <div className="pointer-events-none fixed inset-0 z-40 animate-fade-in bg-background/85 backdrop-blur-sm" />
      )}
    </main>
  );
}
