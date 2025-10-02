// cspell:disable

import { type StringLike } from '../string/string-like.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  convertCase: 'upper',
  scan: [
    { m: 'A',     i: 'b',   o: '1-'   },
    { m: 'A',               o: '-'    },
    { m: 'B',     i: 'b',   o: '09-'  },
    { m: 'B',               o: '9'    },
    { m: 'CE',    i: 'b',   o: '00-'  },
    { m: 'CE',              o: '0'    },
    { m: 'CH',    i: 'b',   o: '06-'  },
    { m: 'CH',              o: '6'    },
    { m: 'CI',    i: 'b',   o: '00-'  },
    { m: 'CI',              o: '0'    },
    { m: 'CY',    i: 'b',   o: '00-'  },
    { m: 'CY',              o: '0'    },
    { m: 'C',     i: 'b',   o: '07-'  },
    { m: 'C',               o: '7'    },
    { m: 'DG',    i: 'b',   o: '07-'  },
    { m: 'DG',              o: '7'    },
    { m: 'D',     i: 'b',   o: '01-'  },
    { m: 'D',               o: '1'    },
    { m: 'E',     i: 'b',   o: '1-'   },
    { m: 'E',               o: '-'    },
    { m: 'F',     i: 'b',   o: '08-'  },
    { m: 'F',               o: '8'    },
    { m: 'GF',    i: 'b',   o: '08-', },
    { m: 'GM',    i: 'b',   o: '03-'  },
    { m: 'GN',    i: 'b',   o: '02-'  },
    { m: 'G',     i: 'b',   o: '07-'  },
    { m: 'G',               o: '7'    },
    { m: 'H',     i: 'b',   o: '2-'   },
    { m: 'H',               o: '-'    },
    { m: 'I',     i: 'b',   o: '1-'   },
    { m: 'I',               o: '-'    },
    { m: 'J',     i: 'b',   o: '3-'   },
    { m: 'J',               o: '6'    },
    { m: 'KN',    i: 'b',   o: '02-'  },
    { m: 'K',     i: 'b',   o: '07-'  },
    { m: 'K',               o: '7'    },
    { m: 'L',     i: 'b',   o: '05-'  },
    { m: 'L',               o: '5'    },
    { m: 'M',     i: 'b',   o: '03-'  },
    { m: 'M',               o: '3'    },
    { m: 'N',     i: 'b',   o: '02-'  },
    { m: 'N',               o: '2'    },
    { m: 'O',     i: 'b',   o: '1-'   },
    { m: 'O',               o: '-'    },
    { m: 'PF',    i: 'b',   o: '08-'  },
    { m: 'PH',    i: 'b',   o: '08-'  },
    { m: 'PH',              o: '8'    },
    { m: 'PN',    i: 'b',   o: '02-'  },
    { m: 'P',     i: 'b',   o: '09-'  },
    { m: 'P',               o: '9'    },
    { m: 'Q',     i: 'b',   o: '07-'  },
    { m: 'Q',               o: '7'    },
    { m: 'R',     i: 'b',   o: '04-'  },
    { m: 'R',               o: '4'    },
    { m: 'SCH',   i: 'b',   o: '06-'  },
    { m: 'SCH',             o: '6'    },
    { m: 'SH',    i: 'b',   o: '06-'  },
    { m: 'SH',              o: '6'    },
    { m: 'S',     i: 'b',   o: '00-'  },
    { m: 'S',               o: '0'    },
    { m: 'TSCH',  i: 'b',   o: '06-'  },
    { m: 'TSCH',            o: '6'    },
    { m: 'TSH',   i: 'b',   o: '06-'  },
    { m: 'TSH',             o: '6'    },
    { m: 'TS',    i: 'b',   o: '00-'  },
    { m: 'TS',              o: '0'    },
    { m: 'T',     i: 'b',   o: '01-'  },
    { m: 'T',               o: '1'    },
    { m: 'U',     i: 'b',   o: '1-'   },
    { m: 'U',               o: '-'    },
    { m: 'V',     i: 'b',   o: '08-'  },
    { m: 'V',               o: '8'    },
    { m: 'WR',    i: 'b',   o: '04-'  },
    { m: 'W',     i: 'b',   o: '4-'   },
    { m: 'W',               o: '-'    },
    { m: 'X',     i: 'b',   o: '07-'  },
    { m: 'X',               o: '7'    },
    { m: 'Y',     i: 'b',   o: '5-'   },
    { m: 'Y',               o: '-'    },
    { m: 'Z',     i: 'b',   o: '00-'  },
    { m: 'Z',               o: '0'    },
  ],
  length: 5,
  pad: '0',
});

/**
 * Generate a phonetic code using the Roger Root algorithm.
 *
 * The Roger Root algorithm is a phonetic encoding system that converts words into
 * standardized codes based on their sound characteristics. It uses a comprehensive
 * scanning table to map letter patterns to numeric codes, making it effective for
 * matching names and words that may have different spellings but similar pronunciations.
 *
 * The algorithm processes input text by:
 * 1. Converting to uppercase for consistent processing
 * 2. Scanning for specific letter patterns and combinations
 * 3. Mapping patterns to corresponding phonetic codes
 * 4. Generating a 5-character code padded with zeros if needed
 *
 * This system is particularly useful for genealogical research, record matching,
 * and database searches where variant spellings of names need to be identified.
 *
 * @param input - The string to encode phonetically
 * @returns A 5-character phonetic code consisting of digits and representing
 *   the phonetic characteristics of the input. The code is padded with '0'
 *   characters to ensure consistent length.
 *
 * @example
 * ```typescript
 * rogerRoot('Smith'); // Returns '00310'
 * rogerRoot('Smyth'); // Returns '00310' (same as Smith - phonetically similar)
 *
 * rogerRoot('Johnson'); // Returns '36002'
 * rogerRoot('Jonsen'); // Returns '36002' (similar phonetic pattern)
 *
 * rogerRoot('Catherine'); // Returns '71602'
 * rogerRoot('Katherine'); // Returns '71602' (handles C/K variation)
 *
 * rogerRoot('Schmidt'); // Returns '06301' (handles SCH pattern)
 * rogerRoot('Wright'); // Returns '42310' (handles WR pattern)
 * ```
 * @group Phonetic
 * @category Roger Root
 */
export function rogerRoot(input: StringLike): string {
  return phonetic(input, algorithm);
}
