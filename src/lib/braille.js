// Real Grade-1 English Braille dot patterns (Perkins standard: dots 1-3 left, 4-6 right).
// Bitmask mapping: dot 1 -> 1, dot 2 -> 2, dot 3 -> 4, dot 4 -> 8, dot 5 -> 16, dot 6 -> 32.

/** @type {Record<string, number[]>} */
export const LETTER_TO_DOTS = {
  A: [1],
  B: [1, 2],
  C: [1, 4],
  D: [1, 4, 5],
  E: [1, 5],
  F: [1, 2, 4],
  G: [1, 2, 4, 5],
  H: [1, 2, 5],
  I: [2, 4],
  J: [2, 4, 5],
  K: [1, 3],
  L: [1, 2, 3],
  M: [1, 3, 4],
  N: [1, 3, 4, 5],
  O: [1, 3, 5],
  P: [1, 2, 3, 4],
  Q: [1, 2, 3, 4, 5],
  R: [1, 2, 3, 5],
  S: [2, 3, 4],
  T: [2, 3, 4, 5],
  U: [1, 3, 6],
  V: [1, 2, 3, 6],
  W: [2, 4, 5, 6],
  X: [1, 3, 4, 6],
  Y: [1, 3, 4, 5, 6],
  Z: [1, 3, 5, 6],
  ' ': [],
};

/** @param {number[]} dots */
export function dotsToKey(dots) {
  return [...new Set(dots)].sort((a, b) => a - b).join('-');
}

/** @type {Record<string, string>} */
export const DOTS_TO_LETTER = Object.fromEntries(
  Object.entries(LETTER_TO_DOTS).map(([char, dots]) => [dotsToKey(dots), char]),
);

/**
 * Converts a string into an array of `{ char, dots }` Braille cells.
 * @param {string} text
 */
export function encodeBrailleWord(text) {
  return Array.from(text.toUpperCase()).map((char) => ({
    char,
    dots: LETTER_TO_DOTS[char] ?? [],
  }));
}

/**
 * Decodes an array of active dot numbers (1..6) into a Grade-1 letter, or null if unassigned.
 * @param {number[]} dots
 */
export function decodeBrailleDots(dots) {
  if (!dots.length) return null;
  return DOTS_TO_LETTER[dotsToKey(dots)] ?? null;
}

/**
 * Returns the real Unicode Braille Pattern character (U+2800..U+283F) for a dot set.
 * @param {number[]} dots
 */
export function dotsToUnicode(dots) {
  let mask = 0;
  for (const d of dots) {
    if (d >= 1 && d <= 6) mask |= 1 << (d - 1);
  }
  return String.fromCharCode(0x2800 + mask);
}
