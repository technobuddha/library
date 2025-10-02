/* cspell:disable */

import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

/** Represents a replacement rule for the Lancaster stemmer. */
interface LSRule {
  /** Suffix to be replaced. */
  s: string;
  /** Replacement string. */
  r: string;
  /** Minimum length of the stemmed word. */
  l?: number;
  /** Check if the stemmed word contains a vowel. */
  v?: boolean;
}

/** Replace rules for the Lancaster stemmer. */
// prettier-ignore
const rules: LSRule[] = [
  { s: 'ational', r: 'ate'                },
  { s: 'tional',  r: 'tion'               },
  { s: 'fulness', r: 'ful'                },
  { s: 'ousness', r: 'ous'                },
  { s: 'iveness', r: 'ive'                },
  { s: 'ization', r: 'ize'                },
  { s: 'isation', r: 'ize'                },
  { s: 'biliti',  r: 'ble'                },
  { s: 'lessli',  r: 'less'               },
  { s: 'entli',   r: 'ent'                },
  { s: 'ation',   r: 'ate'                },
  { s: 'ator',    r: 'ate'                },
  { s: 'alism',   r: 'al'                 },
  { s: 'aliti',   r: 'al'                 },
  { s: 'ousli',   r: 'ous'                },
  { s: 'iviti',   r: 'ive'                },
  { s: 'fulli',   r: 'ful'                },
  { s: 'enci',    r: 'ence'               },
  { s: 'anci',    r: 'ance'               },
  { s: 'abli',    r: 'able'               },
  { s: 'izer',    r: 'ize'                },
  { s: 'iser',    r: 'ise'                },
  { s: 'alli',    r: 'al'                 },
  { s: 'ical',    r: 'ic'                 },
  { s: 'ement',   r: empty                },
  { s: 'ance',    r: empty                },
  { s: 'ence',    r: empty                },
  { s: 'able',    r: empty                },
  { s: 'ible',    r: empty                },
  { s: 'ment',    r: empty                },
  { s: 'ness',    r: empty                },
  { s: 'ful',     r: empty                },
  { s: 'ous',     r: empty                },
  { s: 'ive',     r: empty                },
  { s: 'ize',     r: empty                },
  { s: 'ise',     r: empty                },
  { s: 'ing',     r: empty, l: 4, v: true },
  { s: 'ed',      r: empty, l: 3, v: true },
  { s: 'es',      r: 'e',   l: 3          },
  { s: 'es',      r: empty, l: 3, v: true },
  { s: 'ly',      r: empty, l: 3          },
  { s: 'li',      r: empty, l: 3          },
  { s: 'ti',      r: 't',   l: 3          },
  { s: 'ci',      r: 'c',   l: 3          },
  { s: 'gi',      r: 'g',   l: 3          },
  { s: 'si',      r: 's',   l: 3          },
  { s: 'zi',      r: 'z',   l: 3          },
  { s: 's',       r: empty, l: 2          },
  { s: 'e',       r: empty, l: 3          },
  { s: 'bb',      r: 'b',   l: 3, v: true },
  { s: 'dd',      r: 'd',   l: 3, v: true },
  { s: 'ff',      r: 'f',   l: 3, v: true },
  { s: 'gg',      r: 'g',   l: 3, v: true },
  { s: 'll',      r: 'l',   l: 3, v: true },
  { s: 'mm',      r: 'm',   l: 3, v: true },
  { s: 'nn',      r: 'n',   l: 3, v: true },
  { s: 'pp',      r: 'p',   l: 3, v: true },
  { s: 'rr',      r: 'r',   l: 3, v: true },
  { s: 'ss',      r: 's',   l: 3, v: true },
  { s: 'tt',      r: 't',   l: 3, v: true },
  { s: 'zz',      r: 'z',   l: 3, v: true },
  { s: 'i',       r: empty, l: 3, v: true },
  { s: 'ant',     r: empty                },
  { s: 'ent',     r: empty                },
  { s: 'ism',     r: empty                },
  { s: 'ist',     r: empty                },
  { s: 'er',      r: empty, l: 3          },
  { s: 'or',      r: empty, l: 3          },
  { s: 'al',      r: empty, l: 3          },
  { s: 'ic',      r: empty, l: 3          },
  { s: 'at',      r: empty, l: 3          },
  { s: 'en',      r: empty, l: 3          },
  { s: 'um',      r: empty, l: 3          },
  { s: 'us',      r: empty, l: 3          },
  { s: 'on',      r: empty, l: 3          },
  { s: 'ar',      r: empty, l: 3          },
  { s: 'el',      r: empty, l: 3          },
  { s: 'em',      r: empty, l: 3          },
  { s: 'in',      r: empty, l: 3          },
  { s: 'it',      r: empty, l: 3          },
  { s: 'ol',      r: empty, l: 3          },
  { s: 'op',      r: empty, l: 3          },
  { s: 'ot',      r: empty, l: 3          },
  { s: 'un',      r: empty, l: 3          },
  { s: 'up',      r: empty, l: 3          },
  { s: 'ur',      r: empty, l: 3          },
  { s: 'ut',      r: empty, l: 3          },
  { s: 'ct',      r: 'c',   l: 3          },
  { s: 'lt',      r: 'l',   l: 3          },
  { s: 'nt',      r: 'n',   l: 3          },
  { s: 'pt',      r: 'p',   l: 3          },
  { s: 'rt',      r: 'r',   l: 3          },
  { s: 'st',      r: 's',   l: 3          },
  { s: 'xt',      r: 'x',   l: 3          },
  { s: 'y',       r: empty, l: 3, v: true }
];

/**
 * Check if a word contains at least one vowel.
 * @param word - word to be checked
 * @returns true if the word contains a vowel, false otherwise
 */
function hasVowel(word: string): boolean {
  return /[aeiouy]/v.test(word);
}

/**
 * Stem a word to its base form using the Lancaster stemmer.
 * @param word - word to be stemmed
 * @returns stemmed word
 */
export function lancaster(input: StringLike): string {
  const word = toString(input).toLowerCase();
  if (word.length === 0) {
    return empty;
  }

  for (const r of rules) {
    if (word.endsWith(r.s)) {
      const base = word.slice(0, -r.s.length) + r.r;
      if (base.length >= (r.l ?? 0)) {
        if (!r.v || hasVowel(base)) {
          // Recursively stem again if further changes are possible.
          return lancaster(base);
        }
      }
    }
  }
  return word;
}
