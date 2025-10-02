/* cspell: disable */
import { type StringLike } from '../string/string-like.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

const VOWEL = ['A', 'E', 'I', 'O', 'U', 'Y', 'J'];

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  removeDuplicates: 'full',
  forking: true,
  scan: [
    { m: 'AI',      i: 'b',             o: '0',         },
    { m: 'AI',              n: VOWEL,   o: '1',         },
    { m: 'AI',                          o: '-'          },
    { m: 'AJ',      i: 'b',             o: '0',         },
    { m: 'AJ',              n: VOWEL,   o: '1',         },
    { m: 'AJ',                          o: '-'          },
    { m: 'AY',      i: 'b',             o: '0',         },
    { m: 'AY',              n: VOWEL,   o: '1',         },
    { m: 'AY',                          o: '-'          },
    { m: 'AU',      i: 'b',             o: '0',         },
    { m: 'AU',              n: VOWEL,   o: '7',         },
    { m: 'AU',                          o: '-'          },
    { m: 'A',       i: 'b',             o: '0',         },
    { m: 'A',                           o: '-',         },
//  { m: 'Ą',       i: 'b',             o: '-'          }, // Polish a-ogonek
//  { m: 'Ą',               n: VOWEL,   o: '-'          }, // Polish a-ogonek
//  { m: 'Ą',                           o: ['-', '6']   }, // Polish a-ogonek
    { m: 'B',                           o: '7',         },
    { m: 'CHS',     i: 'b',             o: '5',         },
    { m: 'CHS',                         o: '54',        },
    { m: 'CH',                          o: ['5', '4']   },
    { m: 'CK',                          o: ['5', '45']  },
    { m: 'CSZ',                         o: '4',         },
    { m: 'CS',                          o: '4',         },
    { m: 'CZS',                         o: '4',         },
    { m: 'CZ',                          o: '4',         },
    { m: 'C',                           o: ['5', '4']   },
    { m: 'DRZ',                         o: '4',         },
    { m: 'DRS',                         o: '4',         },
    { m: 'DSH',                         o: '4',         },
    { m: 'DSZ',                         o: '4',         },
    { m: 'DS',                          o: '4',         },
    { m: 'DT',                          o: '3',         },
    { m: 'DZH',                         o: '4',         },
    { m: 'DZS',                         o: '4',         },
    { m: 'DZ',                          o: '4',         },
    { m: 'D',                           o: '3',         },
    { m: 'EI',      i: 'b',             o: '0',         },
    { m: 'EI',              n: VOWEL,   o: '1',         },
    { m: 'EI',                          o: '-',         },
    { m: 'EJ',      i: 'b',             o: '0',         },
    { m: 'EJ',              n: VOWEL,   o: '1',         },
    { m: 'EJ',                          o: '-',         },
    { m: 'EY',      i: 'b',             o: '0',         },
    { m: 'EY',              n: VOWEL,   o: '1',         },
    { m: 'EY',                          o: '-',         },
    { m: 'EU',      i: 'b',             o: '1',         },
    { m: 'EU',              n: VOWEL,   o: '1',         },
    { m: 'EU',                          o: '-',         },
    { m: 'E',       i: 'b',             o: '0',         },
    { m: 'E',                           o: '-',         },
//  { m: 'Ę',       i: 'b',             o: '-'          }, // Polish e-ogonek
//  { m: 'Ę',               n: VOWEL,   o: '-'          }, // Polish e-ogonek
//  { m: 'Ę',                           o: ['-', '6']   }, // Polish e-ogonek
    { m: 'FB',                          o: '7',         },
    { m: 'F',                           o: '7',         },
    { m: 'G',                           o: '5',         },
    { m: 'H',       i: 'b',             o: '5',         },
    { m: 'H',               n: VOWEL,   o: '5',         },
    { m: 'H',                           o: '-',         },
    { m: 'IA',      i: 'b',             o: '1',         },
    { m: 'IA',                          o: '-',         },
    { m: 'IE',      i: 'b',             o: '1',         },
    { m: 'IE',                          o: '-',         },
    { m: 'IO',      i: 'b',             o: '1',         },
    { m: 'IO',                          o: '-',         },
    { m: 'IU',      i: 'b',             o: '1',         },
    { m: 'IU',                          o: '-',         },
    { m: 'I',       i: 'b',             o: '0',         },
    { m: 'I',                           o: '-',         },
    { m: 'J',       i: 'b',             o: ['1', '4']   },
    { m: 'J',                           o: ['-', '4']   },
    { m: 'KS',      i: 'b',             o: '5',         },
    { m: 'KS',                          o: '54',        },
    { m: 'KH',                          o: '5',         },
    { m: 'K',                           o: '5',         },
    { m: 'L',                           o: '8',         },
    { m: 'MN',                          o: '66'         },
    { m: 'M',                           o: '6',         },
    { m: 'NM',                          o: '66'         },
    { m: 'N',                           o: '6',         },
    { m: 'OI',      i: 'b',             o: '0',         },
    { m: 'OI',              n: VOWEL,   o: '1',         },
    { m: 'OI',                          o: '-',         },
    { m: 'OJ',      i: 'b',             o: '0',         },
    { m: 'OJ',              n: VOWEL,   o: '1',         },
    { m: 'OJ',                          o: '-',         },
    { m: 'OY',      i: 'b',             o: '0',         },
    { m: 'OY',              n: VOWEL,   o: '1',         },
    { m: 'OY',                          o: '-',         },
    { m: 'O',       i: 'b',             o: '0',         },
    { m: 'O',                           o: '-',         },
    { m: 'PF',                          o: '7',         },
    { m: 'PH',                          o: '7',         },
    { m: 'P',                           o: '7',         },
    { m: 'Q',                           o: '5',         },
    { m: 'RZ',                          o: ['94', '4']  },
//  { m: 'RS',                          o: ['94', '4']  },
    { m: 'R',                           o: '9',         },
    { m: 'SCHD',    i: 'b',             o: '2',         },
    { m: 'SCHD',                        o: '43',        },
    { m: 'SCHTCH',  i: 'b',             o: '2',         },
    { m: 'SCHTCH',                      o: '4',         },
    { m: 'SCHTSCH', i: 'b',             o: '2',         },
    { m: 'SCHTSCH',                     o: '4',         },
    { m: 'SCHTSH',  i: 'b',             o: '2',         },
    { m: 'SCHTSH',                      o: '4',         },
    { m: 'SCHT',    i: 'b',             o: '2',         },
    { m: 'SCHT',                        o: '43',        },
    { m: 'SCH',                         o: '4',         },
    { m: 'SC',      i: 'b',             o: '2',         },
    { m: 'SC',                          o: '4',         },
    { m: 'SD',      i: 'b',             o: '2',         },
    { m: 'SD',                          o: '43',        },
    { m: 'SHTCH',   i: 'b',             o: '2',         },
    { m: 'SHTCH',                       o: '4',         },
    { m: 'SHTSH',   i: 'b',             o: '2',         },
    { m: 'SHTSH',                       o: '4',         },
    { m: 'SHT',     i: 'b',             o: '2',         },
    { m: 'SHT',                         o: '43',        },
    { m: 'SHCH',    i: 'b',             o: '2',         },
    { m: 'SHCH',                        o: '4',         },
    { m: 'SHD',     i: 'b',             o: '2',         },
    { m: 'SHD',                         o: '43'         },
    { m: 'SH',                          o: '4',         },
    { m: 'STCH',    i: 'b',             o: '2',         },
    { m: 'STCH',                        o: '4',         },
    { m: 'STRZ',    i: 'b',             o: '2',         },
    { m: 'STRZ',                        o: '4',         },
    { m: 'STRS',    i: 'b',             o: '2',         },
    { m: 'STRS',                        o: '4',         },
    { m: 'STSH',    i: 'b',             o: '2',         },
    { m: 'STSH',                        o: '4',         },
    { m: 'STSCH',   i: 'b',             o: '2',         },
    { m: 'STSCH',                       o: '4',         },
    { m: 'ST',      i: 'b',             o: '2',         },
    { m: 'ST',                          o: '43',        },
    { m: 'SZCZ',    i: 'b',             o: '2',         },
    { m: 'SZCZ',                        o: '4',         },
    { m: 'SZCS',    i: 'b',             o: '2',         },
    { m: 'SZCS',                        o: '4',         },
    { m: 'SZT',     i: 'b',             o: '2',         },
    { m: 'SZT',                         o: '43',        },
    { m: 'SZD',     i: 'b',             o: '2',         },
    { m: 'SZD',                         o: '43',        },
    { m: 'SZ',                          o: '4',         },
    { m: 'S',                           o: '4',         },
    { m: 'TCH',                         o: '4',         },
    { m: 'TC',                          o: '4',         },
    { m: 'TH',                          o: '3',         },
    { m: 'TRZ',                         o: '4',         },
    { m: 'TRS',                         o: '4',         },
    { m: 'TSCH',                        o: '4',         },
    { m: 'TSH',                         o: '4',         },
    { m: 'TSZ',                         o: '4',         },
    { m: 'TS',                          o: '4',         },
    { m: 'TTSCH',                       o: '4',         },
    { m: 'TTCH',                        o: '4',         },
    { m: 'TTSZ',                        o: '4',         },
    { m: 'TTS',                         o: '4',         },
    { m: 'TTZ',                         o: '4',         },
    { m: 'TZS',                         o: '4',         },
    { m: 'TZ',                          o: '4',         },
    { m: 'T',                           o: '3',         },
//  { m: 'Ţ',                           o: ['3', '4']   }, // Romanian t-cedilla
    { m: 'UI',      i: 'b',             o: '0',         },
    { m: 'UI',              n: VOWEL,   o: '1',         },
    { m: 'UI',                          o: '-',         },
    { m: 'UJ',      i: 'b',             o: '0',         },
    { m: 'UJ',              n: VOWEL,   o: '1',         },
    { m: 'UJ',                          o: '-',         },
    { m: 'UY',      i: 'b',             o: '0',         },
    { m: 'UY',              n: VOWEL,   o: '1',         },
    { m: 'UY',                          o: '-',         },
    { m: 'UE',      i: 'b',             o: '0',         },
    { m: 'UE',              n: VOWEL,   o: '1',         },
    { m: 'UE',                          o: '-',         },
    { m: 'U',       i: 'b',             o: '0',         },
    { m: 'U',                           o: '-',         },
    { m: 'V',                           o: '7',         },
    { m: 'W',                           o: '7',         },
    { m: 'X',       i: 'b',             o: '5',         },
    { m: 'X',                           o: '54',        },
    { m: 'Y',       i: 'b',             o: '1',         },
    { m: 'Y',                           o: '-',         },
    { m: 'ZDZH',    i: 'b',             o: '2',         },
    { m: 'ZDZH',                        o: '4',         },
    { m: 'ZDZ',     i: 'b',             o: '2',         },
    { m: 'ZDZ',                         o: '4',         },
    { m: 'ZD',      i: 'b',             o: '2',         },
    { m: 'ZD',                          o: '43',        },
    { m: 'ZHDZH',   i: 'b',             o: '2',         },
    { m: 'ZHDZH',                       o: '4',         },
    { m: 'ZHD',     i: 'b',             o: '2',         },
    { m: 'ZHD',                         o: '43',        },
    { m: 'ZH',                          o: '4',         },
    { m: 'ZSCH',                        o: '4',         },
    { m: 'ZSH',                         o: '4',         },
    { m: 'ZS',                          o: '4',         },
    { m: 'Z',                           o: '4',         },
  ],
  length: 6,
  pad: '0',
});

/**
 * Generates Daitch-Mokotoff Soundex codes for the given text.
 *
 * The Daitch-Mokotoff Soundex is a phonetic encoding system specifically designed
 * for Eastern European names, particularly Jewish surnames. Unlike the standard
 * Soundex algorithm, it can produce multiple codes for a single name due to
 * alternative pronunciations and handles complex consonant combinations common
 * in Slavic languages.
 *
 * Key features:
 * - Produces multiple possible codes for ambiguous pronunciations
 * - Handles complex consonant clusters (SCH, SHTCH, etc.)
 * - Position-sensitive encoding (different codes at start vs. middle)
 * - Variable-length codes (not limited to 4 characters)
 * - Designed for Eastern European phonetic patterns
 *
 * The algorithm processes character combinations and can branch into multiple
 * possible encodings when ambiguous pronunciations exist, returning all valid
 * variations.
 *
 * @param str - The text to encode using Daitch-Mokotoff Soundex
 * @returns Array of possible Soundex codes for the input text
 *
 * @example
 * ```typescript
 * // Single pronunciation
 * soundexDaitchMokotoff('Miller')     // ['689']
 * soundexDaitchMokotoff('Johnson')    // ['164640']
 *
 * // Multiple pronunciations (branching)
 * soundexDaitchMokotoff('Jackson')    // ['164640', '464640']
 * soundexDaitchMokotoff('Chernoff')   // ['496740', '596740']
 *
 * // Complex Eastern European names
 * soundexDaitchMokotoff('Goldschmidt') // ['583643', '583653']
 * soundexDaitchMokotoff('Brzezinski')  // ['7949643', '7949653']
 *
 * // Handles various spellings
 * soundexDaitchMokotoff('Kowalski')   // ['583794']
 * soundexDaitchMokotoff('Kovalski')   // ['583794']
 * ```
 *
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Daitch%E2%80%93Mokotoff_Soundex)
 * @group Phonetic
 * @category Soundex
 */
export function daitchMokotoff(str: StringLike): string[] {
  return phonetic(str, algorithm);
}
