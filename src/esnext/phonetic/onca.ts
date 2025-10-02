import { type StringLike } from '../string/string-like.ts';

import { nysiis } from './nysiis.ts';
import { soundex } from './soundex.ts';

/**
 * Computes the ONCA (Oxford Name Compression Algorithm) code for a string.
 *
 * ONCA is a phonetic algorithm that combines the NYSIIS (New York State Identification
 * and Intelligence System) algorithm followed by the Soundex algorithm to create a
 * more refined phonetic encoding.
 *
 * @param input - The string to encode
 * @returns The ONCA phonetic code
 *
 * @example
 * ```typescript
 * onca('Smith'); // S530
 * onca('Johnson'); // J250
 * ```
 *
 * @group Phonetic
 * @category ONCA
 */
export function onca(input: StringLike): string {
  return soundex(nysiis(input));
}
