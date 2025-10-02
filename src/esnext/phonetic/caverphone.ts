import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { type CompiledNonForkingPhonetic, createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithms: Record<string, CompiledNonForkingPhonetic> = {
  'v1.0': createAlgorithm({
    keep: { alphabetic: true },
    convertCase: 'lower',
    priorRules: [
      { r: /^(cou|rou|tou|enou)gh/vg,       s: '$12f' },
      { r: /^gn/vg,                         s: '2n'   },
      { r: /mb$/vg,                         s: 'm2'   },
      { r: /cq/vg,                          s: '2q'   },
      { r: /ci/vg,                          s: 'si'   },
      { r: /ce/vg,                          s: 'se'   },
      { r: /cy/vg,                          s: 'sy'   },
      { r: /tch/vg,                         s: '2ch'  },
      { r: /c|q|x/vg,                       s: 'k'    },
      { r: /v/vg,                           s: 'f'    },
      { r: /dg/vg,                          s: '2g'   },
      { r: /tio/vg,                         s: 'sio'  },
      { r: /tia/vg,                         s: 'sia'  },
      { r: /d/vg,                           s: 't'    },
      { r: /ph/vg,                          s: 'fh'   },
      { r: /b/vg,                           s: 'p'    },
      { r: /sh/vg,                          s: 's2'   },
      { r: /z/vg,                           s: 's'    },
      { r: /^[aeiou]/vg,                    s: 'A'    },
      { r: /[aeiou]/vg,                     s: '3'    },
      { r: /3gh3/vg,                        s: '3kh3' },
      { r: /gh/vg,                          s: '22'   },
      { r: /g/vg,                           s: 'k'    },
      { r: /s+/vg,                          s: 'S'    },
      { r: /t+/vg,                          s: 'T'    },
      { r: /p+/vg,                          s: 'P'    },
      { r: /k+/vg,                          s: 'K'    },
      { r: /f+/vg,                          s: 'F'    },
      { r: /m+/vg,                          s: 'M'    },
      { r: /n+/vg,                          s: 'N'    },
      { r: /w3/vg,                          s: 'W3'   },
      { r: /wy/vg,                          s: 'Wy'   },
      { r: /wh3/vg,                         s: 'Wh3'  },
      { r: /why/vg,                         s: 'Why'  },
      { r: /w/vg,                           s: '2'    },
      { r: /^h/vg,                          s: 'A'    },
      { r: /h/vg,                           s: '2'    },
      { r: /r3/vg,                          s: 'R3'   },
      { r: /ry/vg,                          s: 'Ry'   },
      { r: /r/vg,                           s: '2'    },
      { r: /l3/vg,                          s: 'L3'   },
      { r: /ly/vg,                          s: 'Ly'   },
      { r: /l/vg,                           s: '2'    },
      { r: /j/vg,                           s: 'y'    },
      { r: /y3/vg,                          s: 'Y3'   },
      { r: /y/vg,                           s: '2'    },
      { r: /3/vg,                           s: empty  },
      { r: /2/vg,                           s: empty  },
    ],
    pad: '1',
    length: 6,
  }),
  'v2.0': createAlgorithm({
    keep: { alphabetic: true },
    convertCase: 'lower',
    priorRules: [
      { r: /e$/vg,                          s: empty  },
      // cspell:disable-next-line
      { r: /^(cou|rou|tou|enou|trou)gh/vg,  s: '$12f' },
      { r: /^gn/vg,                         s: '2n'   },
      { r: /mb$/vg,                         s: 'm2'   },
      { r: /cq/vg,                          s: '2q'   },
      { r: /c([iey])/vg,                    s: 's$1'  },
      { r: /tch/vg,                         s: '2ch'  },
      { r: /[cqx]/vg,                       s: 'k'    },
      { r: /v/vg,                           s: 'f'    },
      { r: /dg/vg,                          s: '2g'   },
      { r: /ti([oa])/vg,                    s: 'si$1' },
      { r: /d/vg,                           s: 't'    },
      { r: /ph/vg,                          s: 'fh'   },
      { r: /b/vg,                           s: 'p'    },
      { r: /sh/vg,                          s: 's2'   },
      { r: /z/vg,                           s: 's'    },
      { r: /^[aeiou]/vg,                    s: 'A'    },
      { r: /[aeiou]/vg,                     s: '3'    },
      { r: /j/vg,                           s: 'y'    },
      { r: /^y3/vg,                         s: 'Y3'   },
      { r: /^y/vg,                          s: 'A'    },
      { r: /y/vg,                           s: '3'    },
      { r: /3gh3/vg,                        s: '3kh3' },
      { r: /gh/vg,                          s: '22'   },
      { r: /g/vg,                           s: 'k'    },
      { r: /s+/vg,                          s: 'S'    },
      { r: /t+/vg,                          s: 'T'    },
      { r: /p+/vg,                          s: 'P'    },
      { r: /k+/vg,                          s: 'K'    },
      { r: /f+/vg,                          s: 'F'    },
      { r: /m+/vg,                          s: 'M'    },
      { r: /n+/vg,                          s: 'N'    },
      { r: /w3/vg,                          s: 'W3'   },
      { r: /wh3/vg,                         s: 'Wh3'  },
      { r: /w$/vg,                          s: '3'    },
      { r: /w/vg,                           s: '2'    },
      { r: /^h/vg,                          s: 'A'    },
      { r: /h/vg,                           s: '2'    },
      { r: /r3/vg,                          s: 'R3'   },
      { r: /r$/vg,                          s: '3'    },
      { r: /r/vg,                           s: '2'    },
      { r: /l3/vg,                          s: 'L3'   },
      { r: /l$/vg,                          s: '3'    },
      { r: /l/vg,                           s: '2'    },
      { r: /2/vg,                           s: empty  },
      { r: /3$/vg,                          s: 'A'    },
      { r: /3/vg,                           s: empty  },
    ],
    pad: '1',
    length: 10,
  }),
};

/**
 * Encodes a string using the Caverphone phonetic algorithm.
 *
 * Caverphone is a phonetic matching algorithm designed to identify
 * English names that sound similar but are spelled differently. This
 * implementation supports both Caverphone 1.0 and Caverphone 2.0 algorithms.
 *
 * The algorithm was created by David Hood at the University of Otago in
 * New Zealand for the Caversham Project. Version 1.0 produces a 6-character
 * code, while version 2.0 produces a 10-character code with improved accuracy.
 *
 * @param input - The string to encode
 * @param algorithm - The version of the Caverphone algorithm to use. Default is 'v2.0'
 * @returns A phonetic code (6 characters for v1.0, 10 characters for v2.0)
 *
 * @example
 * ```typescript
 * // Using Caverphone 2.0 (default)
 * caverphone('Thompson');     // Returns 'TMPSN11111'
 * caverphone('Thomson');      // Returns 'TMPSN11111'
 *
 * // Using Caverphone 1.0
 * caverphone('Smith', 'v1.0');    // Returns 'SMT111'
 * caverphone('Smyth', 'v1.0');    // Returns 'SMT111'
 * caverphone('Johnson', 'v1.0');  // Returns 'YNSN11'
 * caverphone('Jonson', 'v1.0');   // Returns 'YNSN11'
 * ```
 *
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Caverphone)
 *
 * @group Phonetic
 * @category Caverphone
 */
export function caverphone(input: StringLike, algorithm: keyof typeof algorithms = 'v2.0'): string {
  return phonetic(input, algorithms[algorithm]);
}
