import { type StringLike } from '../string/string-like.ts';

import { eudex } from './eudex.ts';

/**
 * Calculates the Eudex phonetic distance between two strings.
 *
 * The Eudex distance is a weighted sum of differing phonetic features between two words, as encoded by the Eudex algorithm. Lower values indicate greater phonetic similarity.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns The Eudex phonetic distance (non-negative integer).
 *
 * @example
 * ```ts
 * import { eudexDistance } from "@technobuddha/library";
 *
 * eudexDistance("cat", "kat"); // 0 (very similar)
 * eudexDistance("cat", "dog"); // >0 (less similar)
 * eudexDistance("cat", "catalogue"); // >0
 * ```
 * @see [Reference](https://github.com/ticki/eudex/blob/master/README.md)
 * @group Phonetic
 * @category Eudex
 */
export function eudexDistance(a: StringLike, b: StringLike): number {
  const d = eudex(a).xor(eudex(b));

  return (
    d.and(0xff).cnt1() +
    d.shr(8).and(0xff).cnt1() * 2 +
    d.shr(16).and(0xff).cnt1() * 4 +
    d.shr(24).and(0xff).cnt1() * 8 +
    d.shr(32).and(0xff).cnt1() * 16 +
    d.shr(40).and(0xff).cnt1() * 32 +
    d.shr(48).and(0xff).cnt1() * 64 +
    d.shr(56).and(0xff).cnt1() * 128
  );
}
