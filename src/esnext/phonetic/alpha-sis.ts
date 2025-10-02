import { type StringLike } from '../string/string-like.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  forking: true,
  scan: [
    { m: 'A',   i: 'b', o: '1'                },
    { m: 'A',           o: '-'                },
    { m: 'B',   i: 'b', o: '09'               },
    { m: 'B',           o: '9'                },
    { m: 'CZ',  i: 'b', o: ['070', '06', '0'] },
    { m: 'CZ',          o: ['70', '6', '0']   },
    { m: 'CH',  i: 'b', o: ['06', '070', '0'] },
    { m: 'CH',          o: ['6', '70', '0']   },
    { m: 'CK',  i: 'b', o: ['07', '06']       },
    { m: 'CK',          o: ['7', '6']         },
    { m: 'CI',          o: '0'                },
    { m: 'CY',          o: '0'                },
    { m: 'CE',          o: '0'                },
    { m: 'C',   i: 'b', o: ['07', '06']       },
    { m: 'C',           o: ['7', '6']         },
    { m: 'DG',  i: 'b', o: '07'               },
    { m: 'DG',          o: '7'                },
    { m: 'DS',  i: 'b', o: ['0', '010']       },
    { m: 'DS',          o: ['0', '10']        },
    { m: 'DZ',  i: 'b', o: ['0', '010']       },
    { m: 'DZ',          o: ['0', '10']        },
    { m: 'D',   i: 'b', o: '01'               },
    { m: 'D',           o: '1'                },
    { m: 'E',   i: 'b', o: '1'                },
    { m: 'E',           o: '-'                },
    { m: 'F',   i: 'b', o: '08'               },
    { m: 'F',           o: '8'                },
    { m: 'GF',  i: 'b', o: '08'               },
    { m: 'GM',  i: 'b', o: '03'               },
    { m: 'GN',  i: 'b', o: '02'               },
    { m: 'G',   i: 'b', o: '07'               },
    { m: 'G',           o: '7'                },
    { m: 'H',   i: 'b', o: '2'                },
    { m: 'H',           o: '-'                },
    { m: 'I',   i: 'b', o: '1'                },
    { m: 'I',           o: '-'                },
    { m: 'J',   i: 'b', o: '3'                },
    { m: 'J',           o: '6'                },
    { m: 'KN',  i: 'b', o: '02'               },
    { m: 'K',   i: 'b', o: ['07', '06']       },
    { m: 'K',           o: ['7', '6']         },
    { m: 'L',   i: 'b', o: '05'               },
    { m: 'L',           o: '5'                },
    { m: 'M',   i: 'b', o: '03'               },
    { m: 'M',           o: '3'                },
    { m: 'N',   i: 'b', o: '02'               },
    { m: 'N',           o: '2'                },
    { m: 'O',   i: 'b', o: '1'                },
    { m: 'O',           o: '-'                },
    { m: 'PF',  i: 'b', o: '08'               },
    { m: 'PH',  i: 'b', o: '08'               },
    { m: 'PH',          o: '8'                },
    { m: 'PN',  i: 'b', o: '02'               },
    { m: 'PS',  i: 'b', o: '0'                },
    { m: 'P',   i: 'b', o: '09'               },
    { m: 'P',           o: '9'                },
    { m: 'Q',   i: 'b', o: '07'               },
    { m: 'Q',           o: '7'                },
    { m: 'R',   i: 'b', o: '04'               },
    { m: 'R',           o: '4'                },
    { m: 'SCH', i: 'b', o: '06'               },
    { m: 'SCH',         o: '6'                },
    { m: 'SH',  i: 'b', o: '06'               },
    { m: 'SH',          o: '6'                },
    { m: 'S',           o: '0'                },
    { m: 'TS',  i: 'b', o: ['0', '010']       },
    { m: 'TS',          o: ['0', '10']        },
    { m: 'TZ',  i: 'b', o: ['0', '010']       },
    { m: 'TZ',          o: ['0', '10']        },
    { m: 'T',   i: 'b', o: '01'               },
    { m: 'T',           o: '1'                },
    { m: 'U',   i: 'b', o: '1'                },
    { m: 'U',           o: '-'                },
    { m: 'V',   i: 'b', o: '08'               },
    { m: 'V',           o: '8'                },
    { m: 'WR',  i: 'b', o: '04'               },
    { m: 'W',   i: 'b', o: '4'                },
    { m: 'W',           o: '-'                },
    { m: 'X',   i: 'b', o: '07'               },
    { m: 'X',           o: '7'                },
    { m: 'Y',   i: 'b', o: '5'                },
    { m: 'Y',           o: '-'                },
    { m: 'Z',           o: '0'                },
  ],
  length: 14,
  pad: '0',
});

/**
 * Generate phonetic codes using the IBM Alpha Search Inquiry System (Alpha-SIS) algorithm.
 *
 * The Alpha-SIS algorithm is a phonetic coding system developed by IBM that produces
 * multiple variant codes for each input string to account for different possible
 * pronunciations. This approach helps improve matching capabilities in search systems
 * by generating alternative phonetic representations.
 *
 * The algorithm processes input text according to specific letter patterns and rules,
 * creating codes that represent the phonetic characteristics of the original string.
 * Unlike single-code systems, Alpha-SIS returns an array of possible codes to handle
 * pronunciation variations.
 *
 * @param input - The string to encode phonetically
 * @returns An array of phonetic code strings representing different possible
 *   pronunciations of the input. Each code is up to 14 characters long and
 *   consists of digits representing phonetic characteristics.
 *
 * @example
 * ```typescript
 * alphaSis('Smith');
 * // Returns multiple variants like ['03101', '03110', ...]
 *
 * alphaSis('Johnson');
 * // Returns variants accounting for different pronunciations
 *
 * alphaSis('Catherine');
 * // Returns array with phonetic variants for the name
 * ```
 *
 * @see [Reference](https://archive.org/stream/accessingindivid00moor#page/15/mode/1up)
 *
 * @group Phonetic
 * @category Alpha-SIS
 */
export function alphaSis(input: StringLike): string[] {
  return phonetic(input, algorithm);
}
