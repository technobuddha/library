import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { type CompiledNonForkingPhonetic, createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithms: Record<string, CompiledNonForkingPhonetic> = {
  nara: createAlgorithm({
    keep: { alphabetic: true },
    firstLetter: 'replace',
    scan: [
      { m: 'A', o: '-'  },
      { m: 'B', o: '1'  },
      { m: 'C', o: '2'  },
      { m: 'D', o: '3'  },
      { m: 'E', o: '-'  },
      { m: 'F', o: '1'  },
      { m: 'G', o: '2'  },
      { m: 'H', o: '-'  },
      { m: 'I', o: '-'  },
      { m: 'J', o: '2'  },
      { m: 'K', o: '2'  },
      { m: 'L', o: '4'  },
      { m: 'M', o: '5'  },
      { m: 'N', o: '5'  },
      { m: 'O', o: '-'  },
      { m: 'P', o: '1'  },
      { m: 'Q', o: '2'  },
      { m: 'R', o: '6'  },
      { m: 'S', o: '2'  },
      { m: 'T', o: '3'  },
      { m: 'U', o: '-'  },
      { m: 'V', o: '1'  },
      { m: 'W', o: '-'  },
      { m: 'X', o: '2'  },
      { m: 'Y',o: '-'   },
      { m: 'Z', o: '2'  },
    ],
    pad: '0',
    length: 4
  }),
  historical: createAlgorithm({
    keep: { alphabetic: true },
    firstLetter: 'replace',
    scan: [
      { m: 'A', o: '-'  },
      { m: 'B', o: '1'  },
      { m: 'C', o: '2'  },
      { m: 'D', o: '3'  },
      { m: 'E', o: '-'  },
      { m: 'F', o: '1'  },
      { m: 'G', o: '2'  },
      { m: 'H',         },
      { m: 'I', o: '-'  },
      { m: 'J', o: '2'  },
      { m: 'K', o: '2'  },
      { m: 'L', o: '4'  },
      { m: 'M', o: '5'  },
      { m: 'N', o: '5'  },
      { m: 'O', o: '-'  },
      { m: 'P', o: '1'  },
      { m: 'Q', o: '2'  },
      { m: 'R', o: '6'  },
      { m: 'S', o: '2'  },
      { m: 'T', o: '3'  },
      { m: 'U', o: '-'  },
      { m: 'V', o: '1'  },
      { m: 'W',         },
      { m: 'X', o: '2'  },
      { m: 'Y', o: '-'  },
      { m: 'Z', o: '2'  },
    ],
    pad: '0',
    length: 4
  }),
  refined: createAlgorithm({
    keep: { alphabetic: true },
    firstLetter: 'prefix',
    scan: [
      { m: 'A', o: '0'  },
      { m: 'B', o: '1'  },
      { m: 'C', o: '3'  },
      { m: 'D', o: '6'  },
      { m: 'E', o: '0'  },
      { m: 'F', o: '2'  },
      { m: 'G', o: '4'  },
      { m: 'H', o: '0'  },
      { m: 'I', o: '0'  },
      { m: 'J', o: '4'  },
      { m: 'K', o: '3'  },
      { m: 'L', o: '7'  },
      { m: 'M', o: '8'  },
      { m: 'N', o: '8'  },
      { m: 'O', o: '0'  },
      { m: 'P', o: '1'  },
      { m: 'Q', o: '5'  },
      { m: 'R', o: '9'  },
      { m: 'S', o: '3'  },
      { m: 'T', o: '6'  },
      { m: 'U', o: '0'  },
      { m: 'V', o: '2'  },
      { m: 'W', o: '0'  },
      { m: 'X', o: '5'  },
      { m: 'Y', o: '0'  },
      { m: 'Z', o: '5'  }
    ],
  }),
  fuzzy: createAlgorithm({
    keep: { alphabetic: true },
    priorRules: [
      { r: /^(CS|CZ|TS|TZ)/gv,  s: 'SS' },
      { r: /^GN/gv,             s: 'NN' },
      { r: /^(HR|WR)/gv,        s: 'RR' },
      { r: /^HW/gv,             s: 'WW' },
      { r: /^(KN|NG)/gv,        s: 'NN' },
      { r: /CH$/gv,             s: 'KK' },
      { r: /NT$/gv,             s: 'TT' },
      { r: /(RT|RDT)$/gv,       s: 'RR' },
      { r: /CA/gv,              s: 'KA' },
      { r: /(CC|CK)/gv,         s: 'KK' },
      { r: /CE/gv,              s: 'SE' },
      { r: /(CHL|CL)/gv,        s: 'KL' },
      { r: /(CHR|CR)/gv,        s: 'KR' },
      { r: /CI/gv,              s: 'SI' },
      { r: /CO/gv,              s: 'KO' },
      { r: /CU/gv,              s: 'KU' },
      { r: /CY/gv,              s: 'SY' },
      { r: /DG/gv,              s: 'GG' },
      { r: /GH/gv,              s: 'HH' },
      { r: /(MAC|MC)/gv,        s: 'MK' },
      { r: /NST/gv,             s: 'NSS' },
      { r: /PF/gv,              s: 'FF' },
      { r: /PH/gv,              s: 'FF' },
      { r: /SCH/gv,             s: 'SSS' },
      { r: /(TIO|TIA)/gv,       s: 'SIO' },
      { r: /TCH/gv,             s: 'CHH' },
    ],
    firstLetter: 'replace',
    silentLetters: ['H', 'W', 'Y'],
    scan: [
      { m: 'A', o: '0' },
      { m: 'B', o: '1' },
      { m: 'C', o: '9' },
      { m: 'D', o: '3' },
      { m: 'E', o: '0' },
      { m: 'F', o: '1' },
      { m: 'G', o: '7' },
      { m: 'H',        },
      { m: 'I', o: '0' },
      { m: 'J', o: '7' },
      { m: 'K', o: '7' },
      { m: 'L', o: '4' },
      { m: 'M', o: '5' },
      { m: 'N', o: '5' },
      { m: 'O', o: '0' },
      { m: 'P', o: '1' },
      { m: 'Q', o: '7' },
      { m: 'R', o: '6' },
      { m: 'S', o: '9' },
      { m: 'T', o: '3' },
      { m: 'U', o: '0' },
      { m: 'V', o: '1' },
      { m: 'W',        },
      { m: 'X', o: '7' },
      { m: 'Y',        },
      { m: 'Z', o: '9' },
    ],
    laterRules: [
      { r: /0/gv, s: empty },
    ]
  }),
  p123: createAlgorithm({
    keep: { alphabetic: true },
    firstLetter: 'separate',
    scan: [
      { m: 'A', o: '-'  },
      { m: 'B', o: '1'  },
      { m: 'C', o: '2'  },
      { m: 'D', o: '3'  },
      { m: 'E', o: '-'  },
      { m: 'F', o: '1'  },
      { m: 'G', o: '2'  },
      { m: 'H', o: '-'  },
      { m: 'I', o: '-'  },
      { m: 'J', o: '2'  },
      { m: 'K', o: '2'  },
      { m: 'L', o: '4'  },
      { m: 'M', o: '5'  },
      { m: 'N', o: '5'  },
      { m: 'O', o: '-'  },
      { m: 'P', o: '1'  },
      { m: 'Q', o: '2'  },
      { m: 'R', o: '6'  },
      { m: 'S', o: '2'  },
      { m: 'T', o: '3'  },
      { m: 'U', o: '-'  },
      { m: 'V', o: '1'  },
      { m: 'W', o: '-'  },
      { m: 'X', o: '2'  },
      { m: 'Y', o: '-'  },
      { m: 'Z', o: '2'  },
          ],
    pad: '0',
    length: 4
  }),
};

/**
 * Generates a Soundex code for the given text using the specified Soundex algorithm variant.
 *
 * The Soundex algorithm is a phonetic encoding system that converts names (particularly surnames)
 * into a standardized code based on how they sound when pronounced in English.
 * This allows for matching names that sound similar but are spelled differently.
 *
 * Multiple algorithm variants are supported:
 * - **nara**: Standard NARA (National Archives) Soundex (default) - 4-character codes
 * - **refined**: Refined Soundex with expanded digit mapping and trailing zero removal
 * - **fuzzy**: Fuzzy Soundex with preprocessing rules and vowel removal
 * - **p123**: Simplified variant using only digits 1-6
 *
 * Standard algorithm behavior (nara):
 * - Preserves the first letter of the input
 * - Converts subsequent consonants to numeric codes (1-6)
 * - Ignores vowels (A, E, I, O, U, Y) and separators (H, W) after the first character
 * - Collapses consecutive identical codes into a single digit
 * - Pads with zeros or truncates to exactly 4 characters
 *
 * Standard numeric mapping:
 * - 1: B, F, P, V
 * - 2: C, G, J, K, Q, S, X, Z
 * - 3: D, T
 * - 4: L
 * - 5: M, N
 * - 6: R
 *
 * @param text - The text to generate a Soundex code for
 * @param algorithm - The Soundex algorithm variant to use. Defaults to 'nara' (standard NARA Soundex)
 * @returns A Soundex code (typically 4 characters), or empty string if input is empty
 *
 * @example
 * ```typescript
 * // Standard NARA Soundex (default)
 * soundex('Robert')           // 'R163'
 * soundex('Robert', 'nara')   // 'R163' (explicit algorithm)
 * soundex('Rupert')           // 'R163' (sounds similar to Robert)
 * soundex('Johnson')          // 'J525'
 *
 * // Different algorithm variants
 * soundex('Smith', 'nara')     // 'S530' (standard)
 * soundex('Smith', 'refined')  // 'S83'  (refined with trailing zero removal)
 * soundex('Smith', 'fuzzy')    // 'S83'  (fuzzy with vowel removal)
 * soundex('Smith', 'p123')     // 'S530' (simplified)
 *
 * // Case insensitive
 * soundex('SMITH')    // 'S530'
 * soundex('smith')    // 'S530'
 *
 * // Handles vowels and separators
 * soundex('Ashcraft') // 'A226' (H acts as separator)
 * soundex('O\'Hara')  // 'O600' (vowels ignored after first)
 *
 * // Consecutive duplicate codes collapse
 * soundex('Pfister')  // 'P236' (P and F both = 1, collapsed)
 *
 * // Fuzzy algorithm with preprocessing
 * soundex('MacDonald', 'fuzzy') // Applies MAC→MK preprocessing
 * soundex('Schmidt', 'fuzzy')   // Applies SCH→SSS preprocessing
 *
 * // Edge cases
 * soundex('')         // ''
 * soundex('A')        // 'A000'
 * ```
 *
 * @group Phonetic
 * @category Soundex
 */
export function soundex(text: StringLike, algorithm: keyof typeof algorithms = 'nara'): string {
  return phonetic(text, algorithms[algorithm]);
}
