import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Heart, Lock } from "lucide-react";
import RomanticBackground from "@/components/RomanticBackground";
import { SECRET_PASSWORD } from "@/lib/love-config";

export const Route = createFileRoute("/secret")({
  head: () => ({
    meta: [
      { title: "A Little Secret ❤️ — Birthday Surprise" },
      {
        name: "description",
        content: "One little secret stands between you and your surprise. Enter the date that means the most to me.",
      },
      { property: "og:title", content: "A Little Secret ❤️" },
      {
        property: "og:description",
        content: "One little secret stands between you and your birthday surprise.",
      },
    ],
  }),
  component: SecretPage,
});

function SecretPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (unlocking) return;
    if (value.trim() === SECRET_PASSWORD) {
      setError("");
      setUnlocking(true);
      // Page 3 will be added here later:
      // setTimeout(() => navigate({ to: "/surprise" }), 1500);
    } else {
      setError("Almost, my love... try again ❤️");
      setValue("");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-12 sm:px-8">
      <RomanticBackground />

      {unlocking && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
          <Heart className="heart-unlock h-24 w-24 fill-rose text-rose" />
        </div>
      )}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="reveal mb-6">
          <Heart className="heart-glow h-16 w-16 fill-rose text-rose" />
        </div>

        <h1
          className="reveal font-display text-4xl font-semibold text-love sm:text-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          A Little Secret ❤️
        </h1>

        <p
          className="reveal mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{ animationDelay: "0.3s" }}
        >
          Before you continue, enter the date that means the most to me. 💕
        </p>

        <form
          onSubmit={onSubmit}
          className="reveal glass-card mt-8 w-full px-5 py-7 sm:px-7"
          style={{ animationDelay: "0.45s" }}
        >
          <div
            className={`flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-3 ${
              error ? "shake" : ""
            }`}
          >
            <Lock className="h-5 w-5 shrink-0 text-blush" />
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter the password"
              aria-label="Enter the password"
              className="w-full bg-transparent text-center text-lg tracking-[0.3em] text-foreground outline-none placeholder:text-sm placeholder:tracking-normal placeholder:text-muted-foreground"
            />
            <Heart className="h-5 w-5 shrink-0 fill-rose text-rose" />
          </div>

          <button type="submit" className="btn-love mt-5 w-full rounded-full px-6 py-4 text-base font-medium">
            Unlock My Heart ❤️
          </button>

          <p className="mt-4 min-h-5 text-sm text-blush" aria-live="polite">
            {error}
          </p>
          {unlocking && (
            <p className="font-display text-lg italic text-love">Unlocked ❤️</p>
          )}
        </form>

        <p className="reveal mt-6 text-xs text-muted-foreground" style={{ animationDelay: "0.6s" }}>
          Hint: it&apos;s a day I could never forget.
        </p>
      </section>
    </main>
  );
}
