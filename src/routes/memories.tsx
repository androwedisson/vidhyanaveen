import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, Mic, Music, Pause, Play, VolumeX, X } from "lucide-react";
import BlueBackground from "@/components/BlueBackground";
import { MEMORIES } from "@/lib/love-config";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Things You Made for Me 💙 — For Vidhya" },
      {
        name: "description",
        content: "A little collection of everything she made for me — every piece a memory I'll always treasure.",
      },
      { property: "og:title", content: "Things You Made for Me 💙" },
      {
        property: "og:description",
        content: "A little collection of everything she made for me — every piece a memory I'll always treasure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemoriesPage,
});

function formatTime(sec: number): string {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function MemoriesPage() {
  const songRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const [songPlaying, setSongPlaying] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceTime, setVoiceTime] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const hasSong = MEMORIES.songSrc.length > 0;
  const hasVoice = MEMORIES.voiceNoteSrc.length > 0;
  const hasImages = MEMORIES.images.length > 0;

  const playSong = useCallback(() => {
    const el = songRef.current;
    if (!el) return;
    el.volume = 0.35;
    void el
      .play()
      .then(() => setSongPlaying(true))
      .catch(() => setSongPlaying(false));
  }, []);

  // Autoplay the song on load; if the browser blocks it, start on first touch.
  useEffect(() => {
    if (!hasSong) return;
    const el = songRef.current;
    if (!el) return;
    el.volume = 0.35;
    void el
      .play()
      .then(() => setSongPlaying(true))
      .catch(() => {
        const start = () => {
          playSong();
          window.removeEventListener("pointerdown", start);
        };
        window.addEventListener("pointerdown", start);
      });
  }, [hasSong, playSong]);

  useEffect(() => {
    return () => {
      songRef.current?.pause();
      voiceRef.current?.pause();
    };
  }, []);

  const toggleSong = () => {
    const el = songRef.current;
    if (!el) return;
    if (songPlaying) {
      el.pause();
      setSongPlaying(false);
    } else {
      playSong();
    }
  };

  const toggleVoice = () => {
    const v = voiceRef.current;
    if (!v) return;
    if (voicePlaying) {
      v.pause();
    } else {
      songRef.current?.pause();
      void v.play().catch(() => setVoicePlaying(false));
    }
  };

  const onVoiceEnd = useCallback(() => {
    setVoicePlaying(false);
    setVoiceTime(0);
    if (hasSong && songPlaying) playSong();
  }, [hasSong, songPlaying, playSong]);

  const seekVoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = voiceRef.current;
    const t = Number(e.target.value);
    if (!v) return;
    v.currentTime = t;
    setVoiceTime(t);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-dream px-5 py-14 sm:px-8">
      <BlueBackground />

      {hasSong && (
        <>
          <audio ref={songRef} src={MEMORIES.songSrc} loop preload="auto" />
          <button
            type="button"
            onClick={toggleSong}
            aria-label={songPlaying ? "Pause song" : "Play song"}
            className="glass-card glass-card-blue fixed right-4 top-4 z-30 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground"
          >
            {songPlaying ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
            {songPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}

      <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <h1 className="reveal font-display text-4xl font-semibold leading-tight text-glow-blue sm:text-5xl">
          Things You Made for Me 💙
        </h1>
        <p className="reveal mt-4 max-w-md text-base leading-relaxed text-foreground/90" style={{ animationDelay: "0.2s" }}>
          Every little thing you made for me is a memory I'll always treasure. 🥹💙
        </p>

        {/* Photo gallery */}
        {hasImages ? (
          <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
            {MEMORIES.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightbox(src)}
                aria-label={`Open memory photo ${i + 1}`}
                className="reveal glass-card glass-card-blue overflow-hidden p-1.5 transition-transform duration-300 hover:scale-[1.03]"
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                <img
                  src={src}
                  alt={`Something Vidhya made, photo ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-[calc(var(--radius)-6px)] object-cover"
                  style={{ boxShadow: "0 0 24px oklch(0.7 0.16 235 / 40%)" }}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="reveal glass-card glass-card-blue mt-10 w-full px-6 py-10" style={{ animationDelay: "0.3s" }}>
            <Heart className="heart-glow-blue mx-auto h-10 w-10 fill-sky text-sky" />
            <p className="mt-4 text-sm text-muted-foreground">
              The photos of everything she made will appear here soon. 💙
            </p>
          </div>
        )}

        {/* Voice note */}
        {hasVoice && (
          <div className="reveal glass-card glass-card-blue mt-12 w-full px-6 py-8" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-display text-2xl font-semibold text-glow-blue sm:text-3xl">
              A Little Message From Me to You 🎙️💙
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={toggleVoice}
                aria-label={voicePlaying ? "Pause voice note" : "Play voice note"}
                className="btn-yes flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
              >
                {voicePlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={voiceDuration || 0}
                  step={0.1}
                  value={voiceTime}
                  onChange={seekVoice}
                  aria-label="Voice note progress"
                  className="voice-progress w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(voiceTime)}</span>
                  <span>{formatTime(voiceDuration)}</span>
                </div>
              </div>
              <Mic className={`h-5 w-5 shrink-0 text-sky ${voicePlaying ? "heart-glow-blue" : "opacity-60"}`} />
            </div>
            <audio
              ref={voiceRef}
              src={MEMORIES.voiceNoteSrc}
              preload="metadata"
              onPlay={() => setVoicePlaying(true)}
              onPause={() => {
                setVoicePlaying(false);
                if (hasSong && songPlaying) playSong();
              }}
              onEnded={onVoiceEnd}
              onTimeUpdate={(e) => setVoiceTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setVoiceDuration(e.currentTarget.duration)}
            />
          </div>
        )}

        {/* Quote */}
        <p className="reveal quote-glow mt-14 max-w-md text-xl leading-relaxed sm:text-2xl" style={{ animationDelay: "0.7s" }}>
          “It's not just what you made for me… it's the love behind every little thing that makes it priceless. 💙”
        </p>

        <Heart className="heart-glow-blue mt-10 h-14 w-14 fill-sky text-sky" />
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Memory photo, full screen"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-5 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Memory photo enlarged"
            className="lightbox-img max-h-[85vh] max-w-full rounded-2xl object-contain"
            style={{ boxShadow: "0 0 60px oklch(0.7 0.16 235 / 55%), 0 0 120px oklch(0.55 0.2 250 / 40%)" }}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
            className="glass-card glass-card-blue absolute right-4 top-4 rounded-full p-2.5 text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </main>
  );
}
