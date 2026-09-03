import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Your Surprise Is Coming 💙 — Birthday Surprise" },
      { name: "description", content: "The next surprise is almost ready..." },
      { property: "og:title", content: "Your Surprise Is Coming 💙" },
      { property: "og:description", content: "The next surprise is almost ready..." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GiftPage,
});

function GiftPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-dream px-5 py-12 sm:px-8">
      <BlueBackground />
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col items-center justify-center text-center">
        <Heart className="heart-glow-blue h-20 w-20 fill-sky text-sky" />
        <h1 className="font-display mt-6 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Your surprise is almost here...
        </h1>
        <p className="mt-4 text-muted-foreground">Page 4 will be added here soon 💙</p>
        <Link to="/surprise" className="btn-yes mt-8 rounded-full px-8 py-3 text-base font-medium">
          Go Back
        </Link>
      </section>
    </main>
  );
}
