import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Small floating play/pause control for a page's background song. */
export default function SongButton({
  src,
  label = "Play song",
  displayLabel = "Our Song",
}: {
  src: string;
  label?: string;
  displayLabel?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.volume = 0.4;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <Button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause song" : label}
        variant="ghost"
        className="glass-card glass-card-blue fixed right-4 top-4 z-30 h-10 rounded-full px-4 text-xs font-medium text-foreground"
      >
        {playing ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        {playing ? "Pause" : displayLabel}
      </Button>
    </>
  );
}
