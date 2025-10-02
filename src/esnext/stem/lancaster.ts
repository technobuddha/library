// cspell: disable
import { deepCopy } from '../object/deep-copy.ts';
import { empty } from '../unicode/unicode.ts';

/** Configuration */
type Options = {
  /** Style of algorithm (default: `'c'`). */
  style?: Style;
};

type RuleCollection = Record<string, RuleSet[]>;

type RuleSet = {
  match: string;
  replacement: string;
  type: number;
};

/**
 * Style of algorithm.
 *
 * There are small algorithmic differences between how the algorithm was
 * implemented over the years.
 * Looking at [Algorithm Implementations][algos] on the archived website,
 * there are four styles available, in addition to the original paper.
 *
 * The only difference currently implemented in this package is whether a
 * final `s` is kept before stopping (`paper`) or dropped before stopping
 * (`c`).
 *
 * ###### Values
 *
 * - `'c'`
 *   — rules from the ANSI C (Stark, 1994) and Perl (Taffet, 2001)
 *     implementations (`compensation` → `compen`)
 * - `'paper'`
 *   — rules from the original paper (1990), and Pascal (Paice/Husk) and
 *     Java (O’Neill, 2000) implementations (`compensation` → `compens`)
 */
type Style = 'c' | 'paper';

const stop = -1;
const intact = 0;
const cont = 1;
const protect = 2;
const contint = 3;

const rulesPaper: RuleCollection = {
  a: [
    { match: 'ia', replacement: '', type: intact },
    { match: 'a', replacement: '', type: intact },
  ],
  b: [{ match: 'bb', replacement: 'b', type: stop }],
  c: [
    { match: 'ytic', replacement: 'ys', type: stop },
    { match: 'ic', replacement: '', type: cont },
    { match: 'nc', replacement: 'nt', type: cont },
  ],
  d: [
    { match: 'dd', replacement: 'd', type: stop },
    { match: 'ied', replacement: 'y', type: cont },
    { match: 'ceed', replacement: 'cess', type: stop },
    { match: 'eed', replacement: 'ee', type: stop },
    { match: 'ed', replacement: '', type: cont },
    { match: 'hood', replacement: '', type: cont },
  ],
  e: [{ match: 'e', replacement: '', type: cont }],
  f: [
    { match: 'lief', replacement: 'liev', type: stop },
    { match: 'if', replacement: '', type: cont },
  ],
  g: [
    { match: 'ing', replacement: '', type: cont },
    { match: 'iag', replacement: 'y', type: stop },
    { match: 'ag', replacement: '', type: cont },
    { match: 'gg', replacement: 'g', type: stop },
  ],
  h: [
    { match: 'th', replacement: '', type: intact },
    { match: 'guish', replacement: 'ct', type: stop },
    { match: 'ish', replacement: '', type: cont },
  ],
  i: [
    { match: 'i', replacement: '', type: intact },
    { match: 'i', replacement: 'y', type: cont },
  ],
  j: [
    { match: 'ij', replacement: 'id', type: stop },
    { match: 'fuj', replacement: 'fus', type: stop },
    { match: 'uj', replacement: 'ud', type: stop },
    { match: 'oj', replacement: 'od', type: stop },
    { match: 'hej', replacement: 'her', type: stop },
    { match: 'verj', replacement: 'vert', type: stop },
    { match: 'misj', replacement: 'mit', type: stop },
    { match: 'nj', replacement: 'nd', type: stop },
    { match: 'j', replacement: 's', type: stop },
  ],
  l: [
    { match: 'ifiabl', replacement: '', type: stop },
    { match: 'iabl', replacement: 'y', type: stop },
    { match: 'abl', replacement: '', type: cont },
    { match: 'ibl', replacement: '', type: stop },
    { match: 'bil', replacement: 'bl', type: cont },
    { match: 'cl', replacement: 'c', type: stop },
    { match: 'iful', replacement: 'y', type: stop },
    { match: 'ful', replacement: '', type: cont },
    { match: 'ul', replacement: '', type: stop },
    { match: 'ial', replacement: '', type: cont },
    { match: 'ual', replacement: '', type: cont },
    { match: 'al', replacement: '', type: cont },
    { match: 'll', replacement: 'l', type: stop },
  ],
  m: [
    { match: 'ium', replacement: '', type: stop },
    { match: 'um', replacement: '', type: intact },
    { match: 'ism', replacement: '', type: cont },
    { match: 'mm', replacement: 'm', type: stop },
  ],
  n: [
    { match: 'sion', replacement: 'j', type: cont },
    { match: 'xion', replacement: 'ct', type: stop },
    { match: 'ion', replacement: '', type: cont },
    { match: 'ian', replacement: '', type: cont },
    { match: 'an', replacement: '', type: cont },
    { match: 'een', replacement: '', type: protect },
    { match: 'en', replacement: '', type: cont },
    { match: 'nn', replacement: 'n', type: stop },
  ],
  p: [
    { match: 'ship', replacement: '', type: cont },
    { match: 'pp', replacement: 'p', type: stop },
  ],
  r: [
    { match: 'er', replacement: '', type: cont },
    { match: 'ear', replacement: '', type: protect },
    { match: 'ar', replacement: '', type: stop },
    { match: 'or', replacement: '', type: cont },
    { match: 'ur', replacement: '', type: cont },
    { match: 'rr', replacement: 'r', type: stop },
    { match: 'tr', replacement: 't', type: cont },
    { match: 'ier', replacement: 'y', type: cont },
  ],
  s: [
    { match: 'ies', replacement: 'y', type: cont },
    { match: 'sis', replacement: 's', type: stop },
    { match: 'is', replacement: '', type: cont },
    { match: 'ness', replacement: '', type: cont },
    { match: 'ss', replacement: '', type: protect },
    { match: 'ous', replacement: '', type: cont },
    { match: 'us', replacement: '', type: intact },
    { match: 's', replacement: '', type: contint },
    // Note: this following rule is mutated for the C set, be careful when
    // touching it.
    { match: 's', replacement: '', type: protect },
  ],
  t: [
    { match: 'plicat', replacement: 'ply', type: stop },
    { match: 'at', replacement: '', type: cont },
    { match: 'ment', replacement: '', type: cont },
    { match: 'ent', replacement: '', type: cont },
    { match: 'ant', replacement: '', type: cont },
    { match: 'ript', replacement: 'rib', type: stop },
    { match: 'orpt', replacement: 'orb', type: stop },
    { match: 'duct', replacement: 'duc', type: stop },
    { match: 'sumpt', replacement: 'sum', type: stop },
    { match: 'cept', replacement: 'ceiv', type: stop },
    { match: 'olut', replacement: 'olv', type: stop },
    { match: 'sist', replacement: '', type: protect },
    { match: 'ist', replacement: '', type: cont },
    { match: 'tt', replacement: 't', type: stop },
  ],
  u: [
    { match: 'iqu', replacement: '', type: stop },
    { match: 'ogu', replacement: 'og', type: stop },
  ],
  v: [
    { match: 'siv', replacement: 'j', type: cont },
    { match: 'eiv', replacement: '', type: protect },
    { match: 'iv', replacement: '', type: cont },
  ],
  y: [
    { match: 'bly', replacement: 'bl', type: cont },
    { match: 'ily', replacement: 'y', type: cont },
    { match: 'ply', replacement: '', type: protect },
    { match: 'ly', replacement: '', type: cont },
    { match: 'ogy', replacement: 'og', type: stop },
    { match: 'phy', replacement: 'ph', type: stop },
    { match: 'omy', replacement: 'om', type: stop },
    { match: 'opy', replacement: 'op', type: stop },
    { match: 'ity', replacement: '', type: cont },
    { match: 'ety', replacement: '', type: cont },
    { match: 'lty', replacement: 'l', type: stop },
    { match: 'istry', replacement: '', type: stop },
    { match: 'ary', replacement: '', type: cont },
    { match: 'ory', replacement: '', type: cont },
    { match: 'ify', replacement: '', type: stop },
    { match: 'ncy', replacement: 'nt', type: cont },
    { match: 'acy', replacement: '', type: cont },
  ],
  z: [
    { match: 'iz', replacement: '', type: cont },
    { match: 'yz', replacement: 'ys', type: stop },
  ],
};

const rulesC: RuleCollection = deepCopy(rulesPaper);
rulesC.s[8].type = stop;

export function lancasterStemmer(value: string, { style = 'c' }: Options = {}): string {
  return applyRules(value.toLowerCase(), true, style === 'paper' ? rulesPaper : rulesC);
}

function applyRules(value: string, isIntact: boolean, rules: RuleCollection): string {
  if (value === empty) {
    return empty;
  }

  const ruleset = rules[value.at(-1)!];
  if (!ruleset) {
    return value;
  }

  let index = -1;
  while (++index < ruleset.length) {
    const rule = ruleset[index];

    if (!isIntact && (rule.type === intact || rule.type === contint)) {
      continue;
    }

    const breakpoint = value.length - rule.match.length;

    if (breakpoint < 0 || value.slice(breakpoint) !== rule.match) {
      continue;
    }

    if (rule.type === protect) {
      return value;
    }

    const next = value.slice(0, breakpoint) + rule.replacement;

    if (!acceptable(next)) {
      continue;
    }

    if (rule.type === cont || rule.type === contint) {
      return applyRules(next, false, rules);
    }

    return next;
  }

  return value;
}

const VOWEL_FIRST_LETTER = /^[aeiouy]/v;
const VOWELS = /[aeiouy]/v;

function acceptable(value: string): boolean {
  return VOWEL_FIRST_LETTER.test(value) ? value.length > 1 : value.length > 2 && VOWELS.test(value);
}
