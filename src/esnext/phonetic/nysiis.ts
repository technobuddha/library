import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { type CompiledNonForkingPhonetic, createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithms: Record<string, CompiledNonForkingPhonetic> = {
  original: createAlgorithm({
    keep: { alphabetic: true },
    priorRules: [
      { r: /^MAC/gv,                    s: 'MCC'        },
      { r: /^KN/gv,                     s: 'NN'         },
      { r: /^K/gv,                      s: 'C'          },
      { r: /^(PH|PF)/gv,                s: 'FF'         },
      { r: /^SCH/gv,                    s: 'SSS'        },
      { r: /(EE|IE)$/gv,                s: 'Y'          },
      { r: /(DT|RT|RD|NT|ND)$/gv,       s: 'D'          },
    ],
    firstLetter: 'separate',
    laterRules: [
      { r: /EV/gv,                      s: 'AF'         },
      { r: /[AEIOU]+/gv,                s: 'A'          },
      { r: /Q/gv,                       s: 'G'          },
      { r: /Z/gv,                       s: 'S'          },
      { r: /M/gv,                       s: 'N'          },
      { r: /KN/gv,                      s: 'N'          },
      { r: /K/gv,                       s: 'C'          },
      { r: /SCH/gv,                     s: 'SSS'        },
      { r: /PH/gv,                      s: 'FF'         },
      { r: /([^A])H/vg,                 s: '$1'         },
      { r: /(.)H[^A]/vg,                s: '$1'         },
      { r: /AW/vg,                      s: 'A'          },
      { r: /S$/vg,                      s: empty        },
      { r: /AY$/vg,                     s: 'Y'          },
      { r: /A$/vg,                      s: empty        },
      { r: /(.)\1+/vg,                  s: '$1'         }, // Remove consecutive duplicates
    ],
  }),
  modified: createAlgorithm({
    keep: { alphabetic: true },
    priorRules: [
      { r: /[SZ]+$/vg,                  s: empty              },  // remove all trailing 'S' and 'Z'
      { r: /^$/vg,                      s: 'S'                },  // if empty keep an 'S'
      { r: /^MAC/vg,                    s: 'MC'               },  // change initial 'MAC' to 'MC'
      { r: /^PF/vg,                     s: 'F'                },  // change initial 'PF' to 'F'
      { r: /IX$/vg,                     s: 'IC'               },  // change suffix 'IX' to 'IC'
      { r: /EX$/vg,                     s: 'EC'               },  // change suffix 'EX' to 'EC'
      { r: /(YE|EE|IE)$/vg,             s: 'Y'                },  // change suffix 'YE', 'EE', 'IE' to 'Y'
      { r: /(R|N)*(DT|RT|RD|NT|ND)$/vg, s: 'D'                },  // change suffix 'DT', 'RT', 'RD', 'NT', 'ND' to 'D'
      { r: /\BEV/vg,                    s: 'EF',              },  // Change 'EV' to 'EF' if not at start
    ],
    firstLetter: 'vowel',
    laterRules: [
      { r: /([AEIOU])W/vg,              s: 'A'                }, // Remove any 'W' that follows a vowel
      { r: /[AEIOU]+/vg,                s: 'A'                }, // Replace all vowels with 'A' and collapse all strings of 'A' to one 'A'
      { r: /GHT/vg,                     s: 'GT'               }, // Replace 'GHT' with 'GT'
      { r: /DG/vg,                      s: 'G'                }, // Replace 'DG' with 'G'
      { r: /PH/vg,                      s: 'F'                }, // Replace 'PH' with 'F'
      { r: /^AH/vg,                     s: 'A',               }, // If not last character, eliminate all 'H' preceded by a vowel
      { r: /\B(HA|AH)/vg,               s: 'A',               }, // If not first character, eliminate all 'H' followed by a vowel
      { r: /KN/vg,                      s: 'N'                }, // Replace 'KN' with 'N'
      { r: /K/vg,                       s: 'C'                }, // Replace 'K' with 'C'
      { r: /\BM/vg,                     s: 'N',               }, // If not first character, change 'M' to 'N'
      { r: /\BQ/vg,                     s: 'G',               }, // If not first character, change 'Q' to 'G'
      { r: /SH/vg,                      s: 'S'                }, // Replace 'SH' with 'S'
      { r: /SCH/vg,                     s: 'S',               }, // Replace 'SCH' with 'S'
      { r: /YW/vg,                      s: 'Y',               }, // Replace 'YW' with 'Y'
      { r: /\BY\B/vg,                   s: 'A'                }, // If not first or last character, change 'Y' to 'A'
      { r: /WR/vg,                      s: 'R'                }, // Replace 'WR' with 'R'
      { r: /\BZ/vg,                     s: 'S'                }, // If not first character, change 'Z' to 'S'
      { r: /\BAY$/vg,                   s: 'Y'                }, // Change terminal 'AY' to 'Y'
      { r: /\BA+$/vg,                   s: empty              }, // Remove terminal 'A'
      { r: /(.)\1+/vg,                  s: '$1'               }, // Remove all adjacent duplicate letters
    ],
  })
};
/**
 * Generates a NYSIIS (New York State Identification and Intelligence System) phonetic code for the input string.
 *
 * NYSIIS is a phonetic algorithm designed to encode surnames based on their pronunciation.
 * It was developed to improve upon the Soundex algorithm, particularly for names of European origin.
 * The algorithm applies a series of transformations to convert similar-sounding names to the same code.
 *
 * @param input - The string (typically a surname) to encode using NYSIIS
 * @returns The NYSIIS phonetic code
 * @example
 * ```typescript
 * // Basic NYSIIS encoding
 * nysiis('Smith');     // Returns: 'SNAT'
 * nysiis('Schmidt');   // Returns: 'SSNAT'
 * nysiis('Johnson');   // Returns: 'JANSAN'
 * nysiis('Jackson');   // Returns: 'JACSAN'
 *
 * // Similar sounding names produce similar codes
 * nysiis('Brown');     // Returns: 'BRAN'
 * nysiis('Braun');     // Returns: 'BRAN'
 *
 * // Handles various name patterns
 * nysiis('MacDonald'); // Returns: 'MCDANAL'
 * nysiis('O\'Brien');  // Returns: 'OBRAN'
 * ```
 * @group Phonetic
 * @category NYSIIS
 */
export function nysiis(input: StringLike, algorithm: keyof typeof algorithms = 'original'): string {
  return phonetic(input, algorithms[algorithm]);
}
