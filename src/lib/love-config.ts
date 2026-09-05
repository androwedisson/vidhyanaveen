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

/** Returns the next October 1 at 00:00 local time. */
export function getBirthdayTarget(now: Date = new Date()): Date {
  const year = now.getFullYear();
  const thisYear = new Date(year, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0, 0);
  if (now.getTime() < thisYear.getTime()) return thisYear;
  return new Date(year + 1, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0, 0);
}
