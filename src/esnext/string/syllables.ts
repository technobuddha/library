import { singular } from '../english/singular.ts';
import { sum } from '../math/sum.ts';
import { re, reArray } from '../regexp/re.ts';
import { extractWords } from '../tokenization/extract-words.ts';
import { removeDiacritics } from '../unicode/remove-diacritics.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Loosely based on concepts and portions of [syllable](https://github.com/words/syllable)
 * but extensively rewritten and adapted for this library.',
 *
 * (The MIT License)
 *
 *  Copyright (c) 2014 Titus Wormer \<tituswormer\@gmail.com\>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const vowel = /[aeiou]/v;
const vowely = /[aeiouy]/v;

const notVowel = /[^aeiou]/v;
const notVowely = /[^aeiouy]/v;

const magic = re`${vowely}${reArray([
  re`[bcfgklmnprsvwxyz]`,
  re`ch`,
  re`dg`,
  re`g[hn]`,
  re`lch`,
  re`l[lv]`,
  re`mm`,
  re`nch`,
  re`n[cgn]`,
  re`r[bcnsv]`,
  re`squ`,
  re`s[chkls]`,
  re`th`,
])}`;

// Two expressions of occurrences which normally would be counted as two
// syllables, but should be counted as one.
const EXPRESSION_MONOSYLLABIC_ONE = re('g')`${reArray([
  re`awe($|d|so)`,
  re`cia(?:l|$)`,
  re`tia`,
  re`cius`,
  re`cious`,
  re`${notVowel}giu`,
  re`${vowely}${notVowely}ion`,
  re`iou`,
  re`sia$`,
  re`eous$`,
  re`[oa]gue$`,
  re`.[^aeiuoycgltdb]{2,}ed$`,
  re`.ely$`,
  re`^jua`,
  re`uai`,
  re`eau`,
  re`^busi$`,
  re`${magic}ed$`,
  re`${magic}es$`,
])}`;

const EXPRESSION_MONOSYLLABIC_TWO = re('g')`${magic}e$`;

// Four expression of occurrences which normally would be counted as one
// syllable, but should be counted as two.
const EXPRESSION_DOUBLE_SYLLABIC_ONE = re('g')`${reArray([
  re`(${notVowely})\\1l`,
  re`${notVowely}ie(?:r|s?t)`,
  re`[aeiouym]bl`,
  re`eo`,
  re`ism`,
  re`asm`,
  re`thm`,
  re`dnt`,
  re`snt`,
  re`uity`,
  re`dea`,
  re`gean`,
  re`oa`,
  re`ua`,
  re`react?`,
  re`orbed`, // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
  re`shred`, // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
  re`eings?`,
  re`${vowely}sh?e[rs]`,
])}$`;

const EXPRESSION_DOUBLE_SYLLABIC_TWO = re('g')`${reArray([
  re`creat(?!u)`,
  re`[^gq]ua${notVowel}`,
  re`${vowel}{3}`,
  re`^(?:ia|mc|coa[dglx].)`,
  re`^re(app|es|im|us)`,
  re`(th|d)eist`,
])}`;

const EXPRESSION_DOUBLE_SYLLABIC_THREE = re('g')`${reArray([
  re`${notVowely}y[ae]`,
  re`[^l]lien`,
  re`riet`,
  re`dien`,
  re`iu`,
  re`io`,
  re`ii`,
  re`uen`,
  re`[aeilotu]real`,
  re`real[aeilotu]`,
  re`iell`,
  re`eo${notVowel}`,
  re`${vowel}y${vowel}`,
])}`;

const EXPRESSION_DOUBLE_SYLLABIC_FOUR = re('g')`[^s]ia`;

// Expression to match single syllable pre- and suffixes.
const EXPRESSION_SINGLE = re('g')`^${reArray([
  reArray([
    re`un`,
    re`fore`,
    re`ware`,
    re`none?`,
    re`out`,
    re`post`,
    re`sub`,
    re`pre`,
    re`pro`,
    re`dis`,
    re`side`,
    re`some`,
  ]),
  reArray([
    re`ly`,
    re`less`,
    re`some`,
    re`ful`,
    re`ers?`,
    re`ness`,
    re`cians?`,
    re`ments?`,
    re`ettes?`,
    re`villes?`,
    re`ships?`,
    re`sides?`,
    re`ports?`,
    re`shires?`,
    re`[gnst]ion(?:ed|s)?`,
  ]),
])}$`;

// Expression to match double syllable pre- and suffixes.
const EXPRESSION_DOUBLE = re('g')`^${reArray([
  re`${reArray([
    re`above`,
    re`anti`,
    re`ante`,
    re`counter`,
    re`hyper`,
    re`afore`,
    re`agri`,
    re`infra`,
    re`intra`,
    re`inter`,
    re`over`,
    re`semi`,
    re`ultra`,
    re`under`,
    re`extra`,
    re`dia`,
    re`micro`,
    re`mega`,
    re`kilo`,
    re`pico`,
    re`nano`,
    re`macro`,
    re`somer`,
  ])}`,
  re`(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$`,
])}`;

// Expression to match triple syllable suffixes.
const EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/gv;

const problematic: Record<string, number> = {
  abalone: 4,
  abare: 3,
  abbruzzese: 4,
  abed: 2,
  aborigine: 5,
  abruzzese: 4,
  acreage: 3,
  adame: 3,
  adieu: 2,
  adobe: 3,
  anemone: 4,
  anyone: 3,
  apache: 3,
  aphrodite: 4,
  apostrophe: 4,
  ariadne: 4,
  cafe: 2,
  calliope: 4,
  catastrophe: 4,
  chile: 2,
  chloe: 2,
  circe: 2,
  coyote: 3,
  daphne: 2,
  epitome: 4,
  eurydice: 4,
  euterpe: 3,
  every: 2,
  everywhere: 3,
  forever: 3,
  gethsemane: 4,
  guacamole: 4,
  hermione: 4,
  hyperbole: 4,
  jesse: 2,
  jukebox: 2,
  karate: 3,
  machete: 3,
  maybe: 2,
  naive: 2,
  newlywed: 3,
  penelope: 4,
  people: 2,
  persephone: 4,
  phoebe: 2,
  pulse: 1,
  queue: 1,
  recipe: 3,
  riverbed: 3,
  sesame: 3,
  shoreline: 2,
  simile: 3,
  snuffleupagus: 5,
  sometimes: 2,
  syncope: 3,
  tamale: 3,
  waterbed: 3,
  wednesday: 2,
  yosemite: 4,
  zoe: 2,
};

/**
 * Counts the number of syllables in a word or string.
 *
 * Handles problematic words, compound words, diacritics, and edge cases.
 * Uses a combination of regular expressions and a problematic word list for accuracy.
 *
 * @param word - The word or string to count syllables in
 * @returns The number of syllables in the input
 *
 * @example
 * syllables('banana'); // 3
 * syllables('queue'); // 1
 * syllables('the quick brown fox'); // 5
 *
 * @group String
 * @category Syllables
 */
export function syllables(word: StringLike): number {
  const words = extractWords(
    removeDiacritics(toString(word))
      .toLowerCase()
      .replaceAll(/[^a-z\s]/gv, empty),
  );

  return sum(words.map((w) => countSyllables(w)));
}

function countSyllables(word: string): number {
  let value = word;

  if (value.length === 0) {
    return 0;
  }

  if (value.length < 3) {
    return 1;
  }

  if (value in problematic) {
    return problematic[value];
  }

  const singularWord = singular(word);
  if (singularWord in problematic) {
    return problematic[singularWord];
  }

  let count = 0;
  value = value.replaceAll(EXPRESSION_TRIPLE, () => {
    count += 3;
    return empty;
  });
  value = value.replaceAll(EXPRESSION_DOUBLE, () => {
    count += 2;
    return empty;
  });
  value = value.replaceAll(EXPRESSION_SINGLE, () => {
    count += 1;
    return empty;
  });

  for (const part of value.split(re`${notVowely}+`)) {
    if (part.length > 0) {
      count += 1;
    }
  }

  value = value.replaceAll(EXPRESSION_MONOSYLLABIC_ONE, (x) => {
    count -= 1;
    return x;
  });
  value = value.replaceAll(EXPRESSION_MONOSYLLABIC_TWO, (x) => {
    count -= 1;
    return x;
  });

  value = value.replaceAll(EXPRESSION_DOUBLE_SYLLABIC_ONE, (x) => {
    count += 1;
    return x;
  });
  value = value.replaceAll(EXPRESSION_DOUBLE_SYLLABIC_TWO, (x) => {
    count += 1;
    return x;
  });
  value = value.replaceAll(EXPRESSION_DOUBLE_SYLLABIC_THREE, (x) => {
    count += 1;
    return x;
  });
  value = value.replaceAll(EXPRESSION_DOUBLE_SYLLABIC_FOUR, (x) => {
    count += 1;
    return x;
  });

  return count || 1;
}
