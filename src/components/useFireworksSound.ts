import { useCallback, useRef } from "react";

/**
 * Tiny Web Audio helper that synthesises firework / cracker bursts.
 * No audio file needed — each burst is a low "boom" plus noise crackle.
 */
export function useFireworksSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const burst = useCallback(
    (volume = 0.5) => {
      const ctx = getCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Low boom
      const osc = ctx.createOscillator();
      const oGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);
      oGain.gain.setValueAtTime(0.0001, t);
      oGain.gain.exponentialRampToValueAtTime(0.5 * volume, t + 0.02);
      oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.connect(oGain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);

      // Crackle (filtered noise)
      const dur = 1.1;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const p = i / data.length;
        const spark = Math.random() < 0.06 ? 1 : 0.12;
        data[i] = (Math.random() * 2 - 1) * spark * Math.pow(1 - p, 2.2);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1200;
      const nGain = ctx.createGain();
      nGain.gain.value = 0.35 * volume;
      noise.connect(hp).connect(nGain).connect(ctx.destination);
      noise.start(t + 0.03);
      noise.stop(t + dur);
    },
    [getCtx],
  );

  const unlock = useCallback(() => {
    getCtx();
  }, [getCtx]);

  return { burst, unlock };
}

export default useFireworksSound;
