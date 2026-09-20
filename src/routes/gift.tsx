import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart, Sparkles } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";
import SongButton from "@/components/SongButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import song from "@/assets/song-page4.mp3.asset.json";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Vidhyashree 💙🎂" },
      {
        name: "description",
        content: "A deeply personal birthday letter for Vidhyashree, wrapped in blue light and love.",
      },
      { property: "og:title", content: "Happy Birthday, Vidhyashree 💙🎂" },
      {
        property: "og:description",
        content: "A deeply personal birthday letter for Vidhyashree, wrapped in blue light and love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayWishPage,
});

const QUOTES = [
  "You are my favorite person and my happiest thought. 💙",
  "Somehow, you make ordinary moments feel extraordinary. ✨",
  "If I could choose again, I would still choose you. Always. 💙",
  "Your smile is one of my favorite things in this world. 🥰",
  "My heart feels at home whenever I'm with you. 💙",
];

const NICKNAMES = ["Velachi 💙", "Muttakani 💙", "Milky Bareee 💙"];

function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("birthday-scroll-reveal", visible && "is-visible", className)}>
      {children}
    </div>
  );
}

function BirthdayWishPage() {

  return (
    <main className="birthday-page relative min-h-screen overflow-hidden bg-blue-dream px-5 pb-20 sm:px-8">
      <BlueBackground intense />
      <div className="birthday-night-texture" aria-hidden="true" />
      <div className="birthday-petals" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index}>❧</span>)}
      </div>
      <SongButton src={song.url} label="Play Our Song" displayLabel="Our Song" />

      <section className="birthday-opening relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center text-center">
        <p className="birthday-opening-line font-display text-xl italic text-blue-glow sm:text-3xl">
          “For the most special girl in my world…” 💙
        </p>
        <div className="birthday-name-wrap mt-8 flex items-center justify-center gap-3 sm:gap-5">
          <h1 className="birthday-name font-display text-4xl font-semibold text-glow-blue sm:text-7xl">
            VIDHYASHREE
          </h1>
          <Heart className="heart-glow-blue h-10 w-10 shrink-0 fill-sky text-sky sm:h-16 sm:w-16" />
        </div>
        <p className="birthday-title font-display mt-5 text-3xl text-foreground sm:text-5xl">
          Happy Birthday, My Love <span aria-hidden="true">🎂💙</span>
        </p>
        <Sparkles className="birthday-sparkle mt-10 h-7 w-7 text-blue-glow" aria-hidden="true" />
      </section>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <ScrollReveal className="py-16 text-center sm:py-24">
          <p className="font-display text-3xl text-glow-blue sm:text-4xl">The many names I have for you… 🥰</p>
          <div className="nickname-list mt-10 flex flex-wrap justify-center gap-3">
            {NICKNAMES.map((name) => (
              <span key={name} className="glass-card glass-card-blue nickname-chip px-5 py-3 text-base text-foreground sm:text-lg">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-14 text-sm uppercase text-muted-foreground">But my favorite will always be… 💙</p>
          <p className="deepi-reveal font-display mt-4 text-5xl font-semibold text-glow-blue sm:text-7xl">DEEPI 💙🥰</p>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-foreground/80">
            Because somehow, that little name feels extra special when I say it.
          </p>
        </ScrollReveal>

        <ScrollReveal className="py-10 sm:py-16">
          <article className="birthday-letter glass-card glass-card-blue px-6 py-9 sm:px-12 sm:py-12">
            <Heart className="heart-glow-blue mx-auto h-11 w-11 fill-sky text-sky" />
            <div className="font-display mt-7 space-y-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              <p>Happy Birthday, Vidhyashree. 💙</p>
              <p>Today is your day, but I feel like I&apos;m the lucky one because I get to have you in my life.</p>
              <p>You have brought so many smiles, memories and beautiful moments into my world. I hope you always keep that beautiful smile, chase everything you dream about, and know that there is someone who will always be cheering for you.</p>
              <p>No matter how many birthdays come and go, I hope I get to celebrate many more of them with you.</p>
              <p className="text-glow-blue">Happy Birthday, my Deepi. 💙🥰</p>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal className="py-16 text-center sm:py-24">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
            {QUOTES.map((quote, index) => (
              <blockquote key={quote} className={cn("quote-glow text-xl leading-relaxed sm:text-2xl", index === QUOTES.length - 1 && "sm:col-span-2 sm:mx-auto sm:max-w-md")}>
                “{quote}”
              </blockquote>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="flex flex-col items-center py-20 text-center sm:py-28">
          <p className="font-display text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
            Vidhyashree… Velachi… Muttakani…<br className="hidden sm:block" /> Milky Bareee… Deepi… 💙
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whatever name I call you, you will always be my favorite person.
          </p>
          <h2 className="font-display mt-14 text-4xl font-semibold text-glow-blue sm:text-6xl">I LOVE YOU, DEEPI 💙</h2>
          <Heart className="heart-glow-blue mt-8 h-20 w-20 fill-sky text-sky sm:h-24 sm:w-24" />
          <Link
            to="/reasons"
            className={cn(buttonVariants({ size: "lg" }), "btn-yes mt-12 h-13 rounded-full px-9 text-base")}
          >
            One More Surprise 💙
          </Link>
        </ScrollReveal>
      </div>
    </main>
  );
}
