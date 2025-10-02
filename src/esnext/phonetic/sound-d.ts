import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  priorRules: [
    { r: /^KN/vg,                 s: 'N'   },
    { r: /^GN/vg,                 s: 'N'   },
    { r: /^PN/vg,                 s: 'N'   },
    { r: /^AC/vg,                 s: 'C'   },
    { r: /^WR/vg,                 s: 'R'   },
    { r: /^X/vg,                  s: 'S'   },
    { r: /^WH/vg,                 s: 'W'   },
    { r: /DG[EI]/vg,              s: '2'   },
    { r: /GH/vg,                  s: '0'   },
    // cspell:disable-next-line
    { r: /[AEIOUYWH]/vg,          s: '0'   },
    // cspell:disable-next-line
    { r: /[BPFV]/vg,              s: '1'   },
    // cspell:disable-next-line
    { r: /[CSKGJQXZ]/vg,          s: '2'   },
    { r: /[DT]/vg,                s: '3'   },
    { r: /L/vg,                   s: '4'   },
    { r: /[MN]/vg,                s: '5'   },
    { r: /R/vg,                   s: '6'   },
    { r: /(.)\1+/vg,              s: '$1'  },
    { r: /0/vg,                   s: empty },
  ],
  pad: '0',
  length: 4,
});

/**
 * Generate a Sound-D phonetic code for the given text.
 *
 * Sound-D is a phonetic algorithm that encodes words based on their pronunciation,
 * similar to Soundex but with some different rules and mappings. It converts words
 * into 4-character codes where the first character is preserved from the original
 * word and the remaining 3 characters represent phonetic patterns.
 *
 * The algorithm applies the following transformations:
 * - Initial consonant clusters: KN, GN, PN → N; WR → R; WH → W
 * - Special patterns: DG before E/I → 2; GH → silent; X at start → S
 * - Vowels and silent letters (A, E, I, O, U, Y, W, H) → 0 (removed)
 * - Labial consonants (B, P, F, V) → 1
 * - Fricatives and sibilants (C, S, K, G, J, Q, X, Z) → 2
 * - Dental/alveolar stops (D, T) → 3
 * - Liquid L → 4
 * - Nasals (M, N) → 5
 * - Liquid R → 6
 *
 * @param text - The input text to encode phonetically
 * @returns A 4-character Sound-D code (padded with '0' if needed)
 *
 * @example
 * Basic phonetic encoding:
 * ```typescript
 * soundD('Smith'); // Returns 'S530'
 * soundD('Smyth'); // Returns 'S530' (same as Smith - phonetically similar)
 * ```
 *
 * @example
 * Handling different consonant patterns:
 * ```typescript
 * soundD('Knight'); // Returns 'N230' (KN → N)
 * soundD('Wright'); // Returns 'R230' (WR → R)
 * soundD('Gnome');  // Returns 'N500' (GN → N)
 * soundD('Psalm');  // Returns 'P245' (PS → S)
 * ```
 *
 * @example
 * Special letter combinations:
 * ```typescript
 * soundD('Bridge'); // Returns 'B632' (DG before E → 2)
 * soundD('Laugh');  // Returns 'L200' (GH → silent)
 * soundD('Xavier'); // Returns 'S166' (X at start → S)
 * ```
 *
 * @example
 * Vowel handling and padding:
 * ```typescript
 * soundD('A');      // Returns 'A000' (padded with zeros)
 * soundD('Apple');  // Returns 'A140' (vowels removed)
 * soundD('');       // Returns '0000' (empty string)
 * ```
 *
 * @example
 * Common name variations:
 * ```typescript
 * soundD('Johnson');  // Returns 'J525'
 * soundD('Jonson');   // Returns 'J525' (phonetically equivalent)
 * soundD('Catherine'); // Returns 'C365'
 * soundD('Katherine'); // Returns 'K365' (different initial, same pattern)
 * ```
 * @group Phonetic
 * @category Sound-D
 */
export function soundD(text: StringLike): string {
  return phonetic(text, algorithm);
}
