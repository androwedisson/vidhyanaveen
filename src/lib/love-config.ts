/**
 * ─────────────────────────────────────────────
 *  EDIT EVERYTHING HERE ❤️
 * ─────────────────────────────────────────────
 */

/** Birthday target: October 1, 12:00 AM (visitor's local time). */
export const BIRTHDAY = {
  month: 10, // October
  day: 1,
};

/**
 * Password = her birthday in DDMMYYYY format.
 * Change the year below to her real birth year.
 */
export const SECRET_PASSWORD = "01102007";

/** Optional background music file placed in /public (e.g. "/music.mp3"). */
export const MUSIC_SRC = "";

/**
 * Intro screen (shown before the countdown).
 * Put the song file in /public and set musicSrc to e.g. "/rathanimo.mp3".
 */
export const INTRO = {
  name: "Vidhya",
  musicSrc: "",
};

/**
 * PAGE 6 — "Things You Made for Me 💙"
 * Photos of things she made, your voice note, and this page's song.
 */
import memory1 from "@/assets/memory-1.jpg.asset.json";
import memory2 from "@/assets/memory-2.jpg.asset.json";
import memory3 from "@/assets/memory-3.jpg.asset.json";
import voiceNote from "@/assets/voice-note.mp3.asset.json";
import songPage6 from "@/assets/song-page6.mp3.asset.json";

export const MEMORIES = {
  images: [memory1.url, memory2.url, memory3.url],
  voiceNoteSrc: voiceNote.url,
  songSrc: songPage6.url,
};

/** Returns the next October 1 at 00:00 local time. */
export function getBirthdayTarget(now: Date = new Date()): Date {
  const year = now.getFullYear();
  const thisYear = new Date(year, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0, 0);
  if (now.getTime() < thisYear.getTime()) return thisYear;
  return new Date(year + 1, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0, 0);
}
