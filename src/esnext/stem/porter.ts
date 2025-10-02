/* eslint-disable @typescript-eslint/prefer-destructuring */
// cspell:disable
import { escapeRegExp } from '../escape/escape-regexp.ts';
import { re } from '../regexp/re.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

// Standard suffix manipulations.
const step2list: Record<string, string> = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log',
};
const step2Keys = new RegExp(Object.keys(step2list).map(escapeRegExp).join('|'), 'v');

const step3list: Record<string, string> = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: '',
};
const step3Keys = new RegExp(
  Object.keys(step3list)
    .map((k) => escapeRegExp(k))
    .join('|'),
  'v',
);

const step4Keys = /al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize/v;

// Consonant-vowel sequences.
const consonant = /[^aeiou]/v;
const consonantY = /[^aeiouy]/v;
const consonantWYX = /[^aeiouwxy]/v;

const vowel = /[aeiou]/v;
const vowelY = /[aeiouy]/v;

const consonants = re`${consonant}${consonantY}*`;
const vowels = re`${vowelY}${vowel}*`;

const gt0 = re`^${consonants}?${vowels}${consonants}`;
const eq1 = re`^${consonants}?${vowels}${consonants}${vowels}?$`;
const gt1 = re`^${consonants}?(${vowels}${consonants}){2,}`;
const consonantLike = re`^${consonants}${vowelY}${consonantWYX}$`;

const suffixES = /(?<=ss|i)es$/v;
const suffixS = /(?<!s)s$/v;
const suffixEdIng = re`^(.*${vowelY}.*)(?:ed|ing)$`;
const suffixAtBlIz = /(at|bl|iz)$/v;
const suffixDoubleConsonantLike = /([^aeiouylsz])\1$/v;
const suffixY = re`^(.*${vowelY}.*)y$`;
const suffixIon = /^(.+?(s|t))(ion)$/v;

const step2 = re`^(.+?)(${step2Keys})$`;
const step3 = re`^(.+?)(${step3Keys})$`;
const step4 = re`^(.+?)(${step4Keys})$`;

export function porter(input: StringLike): string {
  let result = toString(input).toLowerCase();

  // Exit early.
  if (result.length < 3) {
    return result;
  }

  const firstCharacterWasY = result.startsWith('y');
  if (firstCharacterWasY) {
    result = `Y${result.slice(1)}`;
  }

  // Step 1a.
  result = result.replace(suffixES, empty);
  result = result.replace(suffixS, empty);

  let match: RegExpMatchArray | null;

  // Step 1b.
  if (result.length > 3 && result.endsWith('eed')) {
    if (gt0.test(result.slice(0, -3))) {
      // Remove last character.
      result = result.slice(0, -1);
    }
  } else if ((match = suffixEdIng.exec(result))) {
    [, result] = match;

    if (suffixAtBlIz.test(result)) {
      result += 'e';
    } else if (suffixDoubleConsonantLike.test(result)) {
      result = result.slice(0, -1);
    } else if (consonantLike.test(result)) {
      result += 'e';
    }
  }

  // Step 1c.
  if (suffixY.test(result)) {
    // Remove suffixing `y` and append `i`.
    result = `${result.slice(0, -1)}i`;
  }

  // Step 2.
  if ((match = step2.exec(result)) && gt0.test(match[1])) {
    result = match[1] + step2list[match[2]];
  }

  // Step 3.
  if ((match = step3.exec(result)) && gt0.test(match[1])) {
    result = match[1] + step3list[match[2]];
  }

  // Step 4.
  if ((match = step4.exec(result))) {
    if (gt1.test(match[1])) {
      result = match[1];
    }
  } else if ((match = suffixIon.exec(result)) && gt1.test(match[1])) {
    result = match[1];
  }

  // Step 5.
  if (result.endsWith('e')) {
    const root = result.slice(0, -1);
    if (gt1.test(root) || (eq1.test(root) && !consonantLike.test(root))) {
      result = root;
    }
  }

  if (result.endsWith('ll') && gt1.test(result)) {
    result = result.slice(0, -1);
  }

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasY) {
    result = `y${result.slice(1)}`;
  }

  return result;
}
