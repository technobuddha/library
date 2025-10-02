import { U64 } from '../binary/u64.ts';
import { keep } from '../string/keep.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { splitChars } from '../tokenization/split-chars.ts';

/**
 * Eudex phonetic feature bitmasks for each character.
 *
 * Each entry maps a character to a bitmask representing its phonetic features for the Eudex algorithm.
 *
 * The sound table.
 *
 * | Position | Modifier | Property     | Phones                   |
 * |----------|---------:|--------------|:------------------------:|
 * | 1        | 1        | Discriminant | (for tagging duplicates) |
 * | 2        | 2        | Nasal        | m,n                      |
 * | 3        | 4        | Fricative    | f,v,s,j,x,z,h,c,t        |
 * | 4        | 8        | Plosive      | p,b,t,d,c,g,q,k          |
 * | 5        | 16       | Dental       | t,d,n,z,s                |
 * | 6        | 32       | Liquid       | l,r                      |
 * | 7        | 64       | Labial       | b,f,p,v                  |
 * | 8        | 128      | Confident¹   | l,r,x,z,q                |
 *
 * ¹hard to misspell.
 *
 * Vowels are, to maximize the XOR distance, represented by 0 and 1 (open and close, respectively).
 * @internal
 */
// prettier-ignore
const PHONES: Record<string, bigint> = {
  //     ┏━━━━━━━━━ Confident
  //     ┃┏━━━━━━━━ Labial
  //     ┃┃┏━━━━━━━ Liquid
  //     ┃┃┃┏━━━━━━ Dental
  //     ┃┃┃┃┏━━━━━ Plosive
  //     ┃┃┃┃┃┏━━━━ Fricative┏
  //     ┃┃┃┃┃┃┏━━━ Nasal
  //     ┃┃┃┃┃┃┃┏━━ Discriminant
  //     ┃┃┃┃┃┃┃┃
  'a': 0b00000000n,
  'b': 0b01001000n,
  'c': 0b00001100n,
  'd': 0b00011000n,
  'e': 0b00000000n,
  'f': 0b01000100n,
  'g': 0b00001000n,
  'h': 0b00000100n,
  'i': 0b00000001n,
  'j': 0b00000101n,
  'k': 0b00001001n,
  'l': 0b10100000n,
  'm': 0b00000010n,
  'n': 0b00010010n,
  'o': 0b00000000n,
  'p': 0b01001001n,
  'q': 0b10101000n,
  'r': 0b10100001n,
  's': 0b00010100n,
  't': 0b00011101n,
  'u': 0b00000001n,
  'v': 0b01000101n,
  'w': 0b00000000n,
  'x': 0b10000100n,
  'y': 0b00000001n,
  'z': 0b10010100n,
  'ß': 0b00010101n, // s^1
  'à': 0b00000000n, //
  'á': 0b00000000n, //
  'â': 0b00000000n, //
  'ã': 0b00000000n, //
  'ä': 0b00000000n, //     [æ]
  'å': 0b00000001n, //     [oː]
  'æ': 0b00000000n, //     [æ]
  'ç': 0b10010101n, // z^1 [t͡ʃ]
  'è': 0b00000001n, //
  'é': 0b00000001n, //
  'ê': 0b00000001n, //
  'ë': 0b00000001n, //
  'ì': 0b00000001n, //
  'í': 0b00000001n, //
  'î': 0b00000001n, //
  'ï': 0b00000001n, //
  'ð': 0b00010101n, //      [ð̠] (represented as a non-plosive T)
  'ñ': 0b00010111n, //      [nj] (represented as a combination of n and j)
  'ò': 0b00000000n, //
  'ó': 0b00000000n, //
  'ô': 0b00000000n, //
  'õ': 0b00000000n, //
  'ö': 0b00000001n, //      [ø]
  '÷': 0b00000001n, //
  'ø': 0b00000001n, //      [ø]
  'ù': 0b00000001n, //
  'ú': 0b00000001n, //
  'û': 0b00000001n, //
  'ü': 0b00000001n, //
  'ý': 0b00000001n, //
  'þ': 0b00010101n, //      [ð̠] (represented as a non-plosive T)
  'ÿ': 0b00000001n, //
};

/**
 * Eudex injective phonetic feature bitmasks for each character.
 *
 * Each entry maps a character to a bitmask representing its injective phonetic features for the Eudex algorithm.
 *
 * An _injective_ phone table.
 *
 * The table is derived the following way:
 *
 * | Position | Modifier | Property (vowel)    | Property (consonant)                              |
 * |----------|---------:|---------------------|---------------------------------------------------|
 * | 1        | 1        | Discriminant        | (property 2 from the phone table) or discriminant |
 * | 2        | 2        | Is it open-mid?     | (property 3 from the phone table)                 |
 * | 3        | 4        | Is it central?      | (property 4 from the phone table)                 |
 * | 4        | 8        | Is it close-mid?    | (property 5 from the phone table)                 |
 * | 5        | 16       | Is it front?        | (property 6 from the phone table)                 |
 * | 6        | 32       | Is it close?        | (property 7 from the phone table)                 |
 * | 7        | 64       | More close than [ɜ] | (property 8 from the phone table)                 |
 * | 8        | 128      | Vowel?                                                                  |
 *
 * If it is a consonant, the rest of the bits are simply a right truncated version of the
 * {@link PHONES} table, with the LSD used as discriminant.
 * @internal
 */
// prettier-ignore
const INJECTIVE_PHONES: Record<string, bigint> = {
  //     ┏━━━━━━━━━ Vowel
  //     ┃┏━━━━━━━━ Closer than ɜ
  //     ┃┃┏━━━━━━━ Close
  //     ┃┃┃┏━━━━━━ Front
  //     ┃┃┃┃┏━━━━━ Close-mid
  //     ┃┃┃┃┃┏━━━━ Central
  //     ┃┃┃┃┃┃┏━━━ Open-mid
  //     ┃┃┃┃┃┃┃┏━━ Discriminant
  //     ┃┃┃┃┃┃┃┃   (*=vowel
  'a': 0b10000100n, // *
  'b': 0b00100100n, //
  'c': 0b00000110n, //
  'd': 0b00001100n, //
  'e': 0b11011000n, // *
  'f': 0b00100010n, //
  'g': 0b00000100n, //
  'h': 0b00000010n, //
  'i': 0b11111000n, // *
  'j': 0b00000011n, //
  'k': 0b00000101n, //
  'l': 0b01010000n, //
  'm': 0b00000001n, //
  'n': 0b00001001n, //
  'o': 0b10010100n, // *
  'p': 0b00100101n, //
  'q': 0b01010100n, //
  'r': 0b01010001n, //
  's': 0b00001010n, //
  't': 0b00001110n, //
  'u': 0b11100000n, // *
  'v': 0b00100011n, //
  'w': 0b00000000n, //
  'x': 0b01000010n, //
  'y': 0b11100100n, // *
  'z': 0b01001010n, //
  'ß': 0b00001011n, // s^1
  'à': 0b10000101n, // a^1
  'á': 0b10000100n, // a^1
  'â': 0b10000000n, //
  'ã': 0b10000110n, //
  'ä': 0b10100110n, //  [æ]
  'å': 0b11000010n, //  [oː]
  'æ': 0b10100111n, //  [æ]
  'ç': 0b01010100n, //  [t͡ʃ]
  'è': 0b11011001n, // e^1,
  'é': 0b11011001n, // e^1,
  'ê': 0b11011001n, // e^1,
  'ë': 0b11000110n, //  [ə] or [œ]
  'ì': 0b11111001n, // i^1,
  'í': 0b11111001n, // i^1,
  'î': 0b11111001n, // i^1,
  'ï': 0b11111001n, // i^1,
  'ð': 0b00001011n, //  [ð̠] (represented as a non-plosive T)
  'ñ': 0b00001011n, //  [nj] (represented as a combination of n and j)
  'ò': 0b10010101n, // o^1
  'ó': 0b10010101n, // o^1
  'ô': 0b10010101n, // o^1
  'õ': 0b10010101n, // o^1
  'ö': 0b11011100n, //  [œ] or [ø]
  '÷': 0b00000001n, //
  'ø': 0b11011101n, //  [œ] or [ø]
  'ù': 0b11100001n, // u^1
  'ú': 0b11100001n, // u^1
  'û': 0b11100001n, // u^1
  'ü': 0b11100001n, // u^1
  'ý': 0b11100001n, // u^1
  'þ': 0b00001011n, //  [ð̠] (represented as a non-plosive T)
  'ÿ': 0b11100101n, // y^1
};

/**
 * Encodes a word into its Eudex phonetic hash.
 *
 * Eudex is a phonetic matching algorithm designed for fast and efficient comparison of words based on their pronunciation.
 *
 * @param word - The word to encode.
 * @returns The Eudex hash as a bigint.
 * @example
 * ```ts
 * const hash = eudex('example');
 * ```
 * @see [Reference](https://github.com/ticki/eudex/blob/master/README.md)
 * @group Phonetic
 * @category Eudex
 */
export function eudex(word: StringLike): U64 {
  const array = splitChars(keep(toString(word).toLowerCase(), { letters: true }));

  let [entry] = array;
  const firstByte = new U64(INJECTIVE_PHONES[array[0]] ?? 0n);

  let res = new U64(0);
  let n = 0;
  let b = 1;

  while (n < 8 && b < array.length) {
    entry = array[b];

    if (entry in PHONES) {
      const x = PHONES[entry];
      if (!res.and(0xfe).eq(x & 0xfen)) {
        res = res.shl(8).or(x);
        n++;
      }
    }

    b++;
  }

  return res.or(firstByte.shl(56));
}
