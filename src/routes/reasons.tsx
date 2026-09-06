import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";
import SongButton from "@/components/SongButton";
import song from "@/assets/song-page5.mp3.asset.json";

export const Route = createFileRoute("/reasons")({
  head: () => ({
    meta: [
      { title: "20 Reasons Why I Love You ❤️ — For Vidhya" },
      {
        name: "description",
        content: "Twenty little reasons, one at a time, for the girl who is all of them.",
      },
      { property: "og:title", content: "20 Reasons Why I Love You ❤️" },
      {
        property: "og:description",
        content: "Twenty little reasons, one at a time, for the girl who is all of them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReasonsPage,
});

const REASONS = [
  "The way your smile fixes my whole day.",
  "Your laugh — the sound I'd choose over any song.",
  "How safe you make me feel, even from far away.",
  "The way you care about people without being asked.",
  "Your eyes, and everything they say without words.",
  "How you listen to me even when I make no sense.",
  "The little things you remember about me.",
  "Your patience with my worst moods.",
  "The way you say my name.",
  "How honest you are, always.",
  "Your strength — you keep going, no matter what.",
  "The way you get excited about tiny things.",
  "How you make ordinary days feel special.",
  "Your kindness, even to strangers.",
  "The way you forgive me.",
  "How hard you work for your dreams.",
  "Your messages that show up exactly when I need them.",
  "The peace I feel just knowing you're mine.",
  "The future I can already see with you in it.",
  "And simply because you are you. 💙",
];

function ReasonsPage() {
  const [index, setIndex] = useState(0);
  const done = index >= REASONS.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-dream px-5 py-14 sm:px-8">
      <BlueBackground />
      <SongButton src={song.url} label="Play song" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-lg flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-semibold leading-tight text-glow-blue sm:text-4xl">
          20 Reasons Why I Love You ❤️
        </h1>

        {!done ? (
          <>
            <div className="glass-card glass-card-blue mt-10 flex w-full flex-col items-center px-6 py-12">
              <Heart className="heart-glow-blue h-10 w-10 fill-sky text-sky" />
              <p
                key={index}
                className="reveal font-display mt-6 text-2xl leading-snug text-foreground sm:text-3xl"
              >
                {REASONS[index]}
              </p>
            </div>

            <div className="mt-6 w-full">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((index + 1) / REASONS.length) * 100}%`,
                    background: "var(--gradient-blue)",
                  }}
                />
              </div>
              <p className="mt-2 text-sm tracking-[0.2em] text-muted-foreground">
                {index + 1} / {REASONS.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="btn-yes mt-8 rounded-full px-10 py-4 text-base font-medium"
            >
              {index === REASONS.length - 1 ? "Finish ❤️" : "Next 💙"}
            </button>
          </>
        ) : (
          <div className="reveal glass-card glass-card-blue mt-10 w-full px-6 py-12">
            <Heart className="heart-glow-blue mx-auto h-16 w-16 fill-sky text-sky" />
            <p className="font-display mt-6 text-2xl leading-snug text-glow-blue sm:text-3xl">
              And a thousand more I'll never finish writing...
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/90">
              Happy Birthday, Vidhya. Thank you for being the best part of my life. 💙
            </p>
            <button
              type="button"
              disabled
              className="btn-yes mt-8 rounded-full px-10 py-4 text-base font-medium opacity-70"
            >
              One More Surprise 💙
            </button>
            <p className="mt-3 text-xs tracking-[0.15em] text-muted-foreground">Coming soon...</p>
          </div>
        )}
      </section>
    </main>
  );
}
