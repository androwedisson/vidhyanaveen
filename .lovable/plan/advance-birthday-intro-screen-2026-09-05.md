# Advance Birthday Intro Screen

A new cinematic intro that plays when the site is opened, before the countdown.

## What she will see

1. A dark-blue romantic night sky with glowing stars, sparkles and floating blue hearts.
2. A centered card with "Advance Happy Birthday, Vidhya ❤️" and the line
   "Your special day is coming… and I couldn't wait to celebrate you. 💙✨",
   plus a "Start the Surprise 💙" button.
3. Tapping the button starts the show: colorful fireworks burst across the sky in
   time with a crackers/fireworks sound, and the song begins playing softly.
4. After the fireworks, the final line fades in: "Advance Happy Birthday, Vidhya 💙🎂".
5. The screen then gently fades into the existing countdown page.
6. A small music button (top corner) lets her pause or play the song at any time.

The intro shows only once per visit-session, so moving between the other pages
does not replay it. Pages 1, 2 and 3 keep working exactly as they do now.

## About the song

I can't include the "Rathanimo" recording — I have no rights to it and no copy of
the file. I'll wire up a music slot so the song plays as soon as an audio file is
added: upload the file (for example `rathanimo.mp3`) and I'll point the intro at it.
Until then the intro plays with the fireworks sound only.

The fireworks/crackers sound is generated in the browser (short crackle bursts),
so nothing needs to be uploaded for that, and each burst is timed to a visual firework.

## Technical notes

- New `src/components/IntroScreen.tsx`: full-screen overlay with star field,
  sparkles, floating hearts, canvas-free CSS/SVG firework bursts, staged copy reveal.
- New `src/components/useFireworksSound.ts`: small Web Audio helper producing
  crackle/boom bursts, triggered on the same timeline as the visual bursts.
- `src/routes/index.tsx` renders `IntroScreen` above the countdown when
  `sessionStorage` has no `intro-seen` flag; on completion it sets the flag and
  cross-fades the intro out. Countdown logic untouched.
- `src/lib/love-config.ts` gains `INTRO = { name: "Vidhya", musicSrc: "" }` so the
  name and song path are easy to change.
- Styles added to `src/styles.css` reusing existing blue tokens: `--gradient-night`,
  star twinkle, firework burst keyframes, cinematic fade transition; all disabled
  under reduced-motion.
- Fully responsive; audio only starts after the tap, so autoplay rules are respected.
