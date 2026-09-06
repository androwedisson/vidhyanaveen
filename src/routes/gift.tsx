import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";
import SongButton from "@/components/SongButton";
import photo from "@/assets/vidhya.jpg.asset.json";
import song from "@/assets/song-page4.mp3.asset.json";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Vidhya 💙🎂" },
      {
        name: "description",
        content: "A birthday wish for Vidhya, wrapped in blue light, music and love.",
      },
      { property: "og:title", content: "Happy Birthday, Vidhya 💙🎂" },
      {
        property: "og:description",
        content: "A birthday wish for Vidhya, wrapped in blue light, music and love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayWishPage,
});

const MESSAGE =
  "Today the world got a little brighter, because it's the day you came into it. Thank you for every smile, every late-night talk, and every moment that feels like home. Happy Birthday, my love — may this year be as beautiful as you are. 💙";

const QUOTES = [
  "You are my favourite hello and my hardest goodbye. 💙",
  "Every love story is beautiful, but ours is my favourite.",
  "In a sky full of stars, my eyes still search for you.",
  "You are the calm in my chaos and the song in my silence.",
  "Loving you is the easiest thing I've ever done. ✨",
];

function BirthdayWishPage() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) window.clearInterval(id);
    }, 32);
    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-dream px-5 py-14 sm:px-8">
      <BlueBackground />
      <SongButton src={song.url} label="Play birthday song" />

      <section className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="reveal glass-card glass-card-blue rounded-full p-2" style={{ animationDelay: "0.1s" }}>
          <img
            src={photo.url}
            alt="Vidhya smiling"
            loading="lazy"
            className="h-56 w-56 rounded-full object-cover sm:h-64 sm:w-64"
            style={{ boxShadow: "0 0 40px oklch(0.7 0.16 235 / 60%), 0 0 90px oklch(0.55 0.2 250 / 45%)" }}
          />
        </div>

        <h1
          className="reveal font-display mt-8 text-4xl font-semibold leading-tight text-glow-blue sm:text-5xl"
          style={{ animationDelay: "0.3s" }}
        >
          Happy Birthday, Vidhya ❤️🎂
        </h1>

        <p
          className="reveal mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground"
          style={{ animationDelay: "0.45s" }}
        >
          My forever favourite person
        </p>

        <div
          className="reveal glass-card glass-card-blue mt-8 w-full px-6 py-7 text-left"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="min-h-[9rem] text-base leading-relaxed text-foreground/90">
            {typed}
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-sky align-middle" />
          </p>
        </div>

        <div className="mt-8 grid w-full gap-4">
          {QUOTES.map((q, i) => (
            <p
              key={q}
              className="reveal quote-glow text-lg sm:text-xl"
              style={{ animationDelay: `${0.9 + i * 0.25}s` }}
            >
              “{q}”
            </p>
          ))}
        </div>

        <Heart className="heart-glow-blue mt-10 h-14 w-14 fill-sky text-sky" />

        <Link
          to="/reasons"
          className="btn-yes reveal mt-8 rounded-full px-10 py-4 text-base font-medium"
          style={{ animationDelay: "2.2s" }}
        >
          There's More For You 💙
        </Link>
      </section>
    </main>
  );
}
