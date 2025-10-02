/* v8 ignore next 10000 */
/* eslint-disable no-param-reassign */
// cspell:disable
import { keep } from '../string/keep.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

/** Default size of key storage allocation */
const MAX_KEY_ALLOCATION = 32;

/** Default maximum length of encoded key. */
const DEFAULT_MAX_KEY_LENGTH = 8;

/*

Copyright 2010, Lawrence Philips
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

/*
 * A request from the author: Please comment and sign any changes you make to
 * the Metaphone 3 reference implementation.
 *
 * Please do NOT reformat this module to Refine's coding standard,
 * but instead keep the original format so that it can be more easily compared
 * to any modified fork of the original.
 */

/**
 * Metaphone 3
 * VERSION 2.1.3
 *
 * by Lawrence Philips
 *
 * Metaphone 3 is designed to return an *approximate* phonetic key (and an alternate
 * approximate phonetic key when appropriate) that should be the same for English
 * words, and most names familiar in the United States, that are pronounced *similarly*.
 * The key value is *not* intended to be an *exact* phonetic, or even phonemic,
 * representation of the word. This is because a certain degree of 'fuzziness' has
 * proven to be useful in compensating for variations in pronunciation, as well as
 * misheard pronunciations. For example, although americans are not usually aware of it,
 * the letter 's' is normally pronounced 'z' at the end of words such as "sounds".
 *
 * The 'approximate' aspect of the encoding is implemented according to the following rules:
 *
 * (1) All vowels are encoded to the same value - 'A'. If the parameter encodeVowels
 * is set to false, only *initial* vowels will be encoded at all. If encodeVowels is set
 * to true, 'A' will be encoded at all places in the word that any vowels are normally
 * pronounced. 'W' as well as 'Y' are treated as vowels. Although there are differences in
 * the pronunciation of 'W' and 'Y' in different circumstances that lead to their being
 * classified as vowels under some circumstances and as consonants in others, for the purposes
 * of the 'fuzziness' component of the Soundex and Metaphone family of algorithms they will
 * be always be treated here as vowels.
 *
 * (2) Voiced and un-voiced consonant pairs are mapped to the same encoded value. This
 * means that:
 * 'D' and 'T' → 'T'
 * 'B' and 'P' → 'P'
 * 'G' and 'K' → 'K'
 * 'Z' and 'S' → 'S'
 * 'V' and 'F' → 'F'
 *
 * - In addition to the above voiced/unvoiced rules, 'CH' and 'SH' → 'X', where 'X'
 * represents the "-SH-" and "-CH-" sounds in Metaphone 3 encoding.
 *
 * - Also, the sound that is spelled as "TH" in English is encoded to '0' (zero symbol). (Although
 * Americans are not usually aware of it, "TH" is pronounced in a voiced (e.g. "that") as
 * well as an unvoiced (e.g. "theater") form, which are naturally mapped to the same encoding.)
 *
 * The encodings in this version of Metaphone 3 are according to pronunciations common in the
 * United States. This means that they will be inaccurate for consonant pronunciations that
 * are different in the United Kingdom, for example "tube" → "CHOOBE" → XAP rather than american TAP.
 *
 * Metaphone 3 was preceded by by Soundex, patented in 1919, and Metaphone and Double Metaphone,
 * developed by Lawrence Philips. All of these algorithms resulted in a significant number of
 * incorrect encodings. Metaphone3 was tested against a database of about 100 thousand English words,
 * names common in the United States, and non-English words found in publications in the United States,
 * with an emphasis on words that are commonly mispronounced, prepared by the Moby Words website,
 * but with the Moby Words 'phonetic' encodings algorithmically mapped to Double Metaphone encodings.
 * Metaphone3 increases the accuracy of encoding of english words, common names, and non-English
 * words found in american publications from the 89% for Double Metaphone, to over 98%.
 *
 * DISCLAIMER:
 * Anthropomorphic Software LLC claims only that Metaphone 3 will return correct encodings,
 * within the 'fuzzy' definition of correct as above, for a very high percentage of correctly
 * spelled English and commonly recognized non-English words. Anthropomorphic Software LLC
 * warns the user that a number of words remain incorrectly encoded, that misspellings may not
 * be encoded 'properly', and that people often have differing ideas about the pronunciation
 * of a word. Therefore, Metaphone 3 is not guaranteed to return correct results every time, and
 * so a desired target word may very well be missed. Creators of commercial products should
 * keep in mind that systems like Metaphone 3 produce a 'best guess' result, and should
 * condition the expectations of end users accordingly.
 *
 * METAPHONE3 IS PROVIDED "AS IS" WITHOUT
 * WARRANTY OF ANY KIND. LAWRENCE PHILIPS AND ANTHROPOMORPHIC SOFTWARE LLC
 * MAKE NO WARRANTIES, EXPRESS OR IMPLIED, THAT IT IS FREE OF ERROR,
 * OR ARE CONSISTENT WITH ANY PARTICULAR STANDARD OF MERCHANTABILITY,
 * OR THAT IT WILL MEET YOUR REQUIREMENTS FOR ANY PARTICULAR APPLICATION.
 * LAWRENCE PHILIPS AND ANTHROPOMORPHIC SOFTWARE LLC DISCLAIM ALL LIABILITY
 * FOR DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES RESULTING FROM USE
 * OF THIS SOFTWARE.
 *
 * \@author Lawrence Philips
 *
 * Metaphone 3 is designed to return an <i>approximate</i> phonetic key (and an alternate
 * approximate phonetic key when appropriate) that should be the same for English
 * words, and most names familiar in the United States, that are pronounced "similarly".
 * The key value is <i>not</i> intended to be an exact phonetic, or even phonemic,
 * representation of the word. This is because a certain degree of 'fuzziness' has
 * proven to be useful in compensating for variations in pronunciation, as well as
 * misheard pronunciations. For example, although americans are not usually aware of it,
 * the letter 's' is normally pronounced 'z' at the end of words such as "sounds".
 *
 * The 'approximate' aspect of the encoding is implemented according to the following rules:
 *
 * (1) All vowels are encoded to the same value - 'A'. If the parameter encodeVowels
 * is set to false, only *initial* vowels will be encoded at all. If encodeVowels is set
 * to true, 'A' will be encoded at all places in the word that any vowels are normally
 * pronounced. 'W' as well as 'Y' are treated as vowels. Although there are differences in
 * the pronunciation of 'W' and 'Y' in different circumstances that lead to their being
 * classified as vowels under some circumstances and as consonants in others, for the purposes
 * of the 'fuzziness' component of the Soundex and Metaphone family of algorithms they will
 * be always be treated here as vowels.
 *
 * (2) Voiced and un-voiced consonant pairs are mapped to the same encoded value. This
 * means that:
 * 'D' and 'T' → 'T'
 * 'B' and 'P' → 'P'
 * 'G' and 'K' → 'K'
 * 'Z' and 'S' → 'S'
 * 'V' and 'F' → 'F'
 *
 * - In addition to the above voiced/unvoiced rules, 'CH' and 'SH' → 'X', where 'X'
 * represents the "-SH-" and "-CH-" sounds in Metaphone 3 encoding.
 *
 * - Also, the sound that is spelled as "TH" in English is encoded to '0' (zero symbol). (Although
 * americans are not usually aware of it, "TH" is pronounced in a voiced (e.g. "that") as
 * well as an unvoiced (e.g. "theater") form, which are naturally mapped to the same encoding.)
 *
 * In the "Exact" encoding, voiced/unvoiced pairs are <i>not</i> mapped to the same encoding, except
 * for the voiced and unvoiced versions of 'TH', sounds such as 'CH' and 'SH', and for 'S' and 'Z',
 * so that the words whose metaph keys match will in fact be closer in pronunciation that with the
 * more approximate setting. Keep in mind that encoding settings for search strings should always
 * be exactly the same as the encoding settings of the stored metaph keys in your database!
 * Because of the considerably increased accuracy of Metaphone3, it is now possible to use this
 * setting and have a very good chance of getting a correct encoding.
 *
 * In the Encode Vowels encoding, all non-initial vowels and diphthongs will be encoded to
 * 'A', and there will only be one such vowel encoding character between any two consonants.
 * It turns out that there are some surprising wrinkles to encoding non-initial vowels in
 * practice, pre-eminently in inversions between spelling and pronunciation such as e.g.
 * "wrinkle" → 'RANKAL', where the last two sounds are inverted when spelled.
 *
 * The encodings in this version of Metaphone 3 are according to pronunciations common in the
 * United States. This means that they will be inaccurate for consonant pronunciations that
 * are different in the United Kingdom, for example "tube" → "CHOOBE" → XAP rather than american TAP.
 *
 *
 */

class Metaphone3 {
  /** Length of word sent in to be encoded, as
   * measured at beginning of encoding. */
  private length = 0;

  /** Length of encoded key string. */
  private metaphLength: number;

  /** Flag whether or not to encode non-initial vowels. */
  private encodeVowels: boolean;

  /** Flag whether or not to encode consonants as exactly
   * as possible. */
  private encodeExact: boolean;

  /** Internal copy of word to be encoded, allocated separately
   * from string pointed to in incoming parameter. */
  private inWord = empty;

  /** Running copy of primary key. */
  private primary: string;

  /** Running copy of secondary key. */
  private secondary: string;

  /** Index of character in m_inWord currently being
   * encoded. */
  private current = 0;

  /** Index of last character in m_inWord. */
  private last = 0;

  /** Flag that an AL inversion has already been done. */
  private flagALInversion = false;

  /**
   * Constructor, parameterized. The Metaphone3 object will
   * be initialized with the incoming string, and can be called
   * on to encode this string. This constructor is most convenient
   * when only one word needs to be encoded.
   *
   * @param in - pointer to char string of word to be encoded.
   *
   */
  public constructor(inp?: string) {
    this.primary = empty;
    this.secondary = empty;

    this.metaphLength = DEFAULT_MAX_KEY_LENGTH;
    this.encodeVowels = false;
    this.encodeExact = false;

    if (inp) {
      this.setWord(inp);
    }
  }

  /**
   * Sets word to be encoded.
   *
   * @param in - pointer to EXTERNALLY ALLOCATED char string of
   * the word to be encoded.
   *
   */
  public setWord(inp: string): void {
    this.inWord = inp.toUpperCase();
    this.length = this.inWord.length;
  }

  /**
   * Sets length allocated for output keys.
   * If incoming number is greater than maximum allowable
   * length returned by GetMaximumKeyLength(), set key length
   * to maximum key length and return false;  otherwise, set key
   * length to parameter value and return true.
   *
   * @param inKeyLength - new length of key.
   * @returns true if able to set key length to requested value.
   *
   */
  public setKeyLength(inKeyLength: number): boolean {
    const ikl = Math.max(inKeyLength, 1);

    if (ikl > MAX_KEY_ALLOCATION) {
      this.metaphLength = MAX_KEY_ALLOCATION;
      return false;
    }

    this.metaphLength = ikl;
    return true;
  }

  /**
   * Adds an encoding character to the encoded key value string
   *
   * @param main - primary encoding character to be added to encoded key string
   * @param alt - alternative encoding character to be added to encoded alternative key string
   *
   */
  private metaphAdd(main: string, alt?: string): void {
    if (!(main === 'A' && this.primary.at(-1) === 'A')) {
      this.primary += main;
    }

    if (alt == null) {
      if (!(main === 'A' && this.secondary.at(-1) === 'A')) {
        this.secondary += main;
      }
    } else if (!(alt === 'A' && this.secondary.at(-1) === 'A')) {
      this.secondary += alt;
    }
  }

  /**
   * Adds an encoding character to the encoded key value string - Exact/Approx version
   *
   * @param mainExact - primary encoding character to be added to encoded key string if
   * m_encodeExact is set
   *
   * @param main - primary encoding character to be added to encoded key string
   *
   */
  private metaphAddExactApprox(mainExact: string, main: string): void;

  /**
   * Adds an encoding character to the encoded key value string - Exact/Approx version
   *
   * @param mainExact - primary encoding character to be added to encoded key string if
   * m_encodeExact is set
   *
   * @param altExact - alternative encoding character to be added to encoded alternative
   * key string if m_encodeExact is set
   *
   * @param main - primary encoding character to be added to encoded key string
   *
   * @param alt - alternative encoding character to be added to encoded alternative key string
   *
   */
  private metaphAddExactApprox(
    mainExact: string,
    altExact: string,
    main: string,
    alt: string,
  ): void;
  private metaphAddExactApprox(...args: string[]): void {
    switch (args.length) {
      case 2: {
        const [mainExact, main] = args;

        if (this.encodeExact) {
          this.metaphAdd(mainExact);
        } else {
          this.metaphAdd(main);
        }

        break;
      }

      case 4: {
        const [mainExact, altExact, main, alt] = args;

        if (this.encodeExact) {
          this.metaphAdd(mainExact, altExact);
        } else {
          this.metaphAdd(main, alt);
        }

        break;
      }

      // no default
    }
  }

  /**
   * Retrieves maximum number of characters currently allocated for encoded key.
   *
   * @returns short integer representing the length allowed for the key.
   */
  public getKeyLength(): number {
    return this.metaphLength;
  }

  /**
   * Retrieves maximum number of characters allowed for encoded key.
   *
   * @returns short integer representing the length of allocated storage for the key.
   */
  public getMaximumKeyLength(): number {
    return MAX_KEY_ALLOCATION;
  }

  /** Sets flag that causes Metaphone3 to encode non-initial vowels. However, even
   * if there are more than one vowel sound in a vowel sequence (i.e.
   * vowel diphthong, etc.), only one 'A' will be encoded before the next consonant or the
   * end of the word.
   *
   * @param inEncodeVowels - Non-initial vowels encoded if true, not if false.
   */
  public setEncodeVowels(inEncodeVowels: boolean): void {
    this.encodeVowels = inEncodeVowels;
  }

  /** Retrieves setting determining whether or not non-initial vowels will be encoded.
   *
   * @returns true if the Metaphone3 object has been set to encode non-initial vowels, false if not.
   */
  public getEncodeVowels(): boolean {
    return this.encodeVowels;
  }

  /** Sets flag that causes Metaphone3 to encode consonants as exactly as possible.
   * This does not include 'S' vs. 'Z', since americans will pronounce 'S' at the
   * at the end of many words as 'Z', nor does it include "CH" vs. "SH". It does cause
   * a distinction to be made between 'B' and 'P', 'D' and 'T', 'G' and 'K', and 'V'
   * and 'F'.
   *
   * @param inEncodeExact - consonants to be encoded "exactly" if true, not if false.
   */
  public setEncodeExact(inEncodeExact: boolean): void {
    this.encodeExact = inEncodeExact;
  }

  /** Retrieves setting determining whether or not consonants will be encoded "exactly".
   *
   * @returns true if the Metaphone3 object has been set to encode "exactly", false if not.
   */
  public getEncodeExact(): boolean {
    return this.encodeExact;
  }

  /** Retrieves primary encoded key.
   *
   * @returns a character pointer to the primary encoded key
   */
  public getMetaph(): string {
    return this.primary;
  }

  /** Retrieves alternate encoded key, if any.
   *
   * @returns a character pointer to the alternate encoded key
   */
  public getAlternateMetaph(): string | null {
    return this.secondary === '' ? null : this.secondary;
  }

  /**
   * Test for close front vowels
   *
   * @returns true if close front vowel
   */
  private frontVowel(at: number): boolean {
    if (this.charAt(at) === 'E' || this.charAt(at) === 'I' || this.charAt(at) === 'Y') {
      return true;
    }

    return false;
  }

  /**
   * Detect names or words that begin with spellings
   * typical of german or slavic words, for the purpose
   * of choosing alternate pronunciations correctly
   *
   */
  private slavoGermanic(): boolean {
    if (
      this.stringAt(0, 'SCH') ||
      this.stringAt(0, 'SW') ||
      this.charAt(0) === 'J' ||
      this.charAt(0) === 'W'
    ) {
      return true;
    }

    return false;
  }
  /**
   * Tests if character is a vowel
   *
   * @param inChar - character to be tested in string to be encoded
   * @returns true if character is a vowel, false if not
   *
   */
  private isVowel(inChar: string): boolean;

  /**
   * Tests if character in the input string is a vowel
   *
   * @param at - position of character to be tested in string to be encoded
   * @returns true if character is a vowel, false if not
   *
   */
  private isVowel(at: number): boolean;
  private isVowel(arg: string | number): boolean {
    if (typeof arg === 'string') {
      return (
        arg === 'A' ||
        arg === 'E' ||
        arg === 'I' ||
        arg === 'O' ||
        arg === 'U' ||
        arg === 'Y' ||
        arg === 'À' ||
        arg === 'Á' ||
        arg === 'Â' ||
        arg === 'Ã' ||
        arg === 'Ä' ||
        arg === 'Å' ||
        arg === 'Æ' ||
        arg === 'È' ||
        arg === 'É' ||
        arg === 'Ê' ||
        arg === 'Ë' ||
        arg === 'Ì' ||
        arg === 'Í' ||
        arg === 'Î' ||
        arg === 'Ï' ||
        arg === 'Ò' ||
        arg === 'Ó' ||
        arg === 'Ô' ||
        arg === 'Õ' ||
        arg === 'Ö' ||
        arg === '' ||
        arg === 'Ø' ||
        arg === 'Ù' ||
        arg === 'Ú' ||
        arg === 'Û' ||
        arg === 'Ü' ||
        arg === 'Ý' ||
        arg === ''
      );
    }

    if (arg < 0 || arg >= this.length) {
      return false;
    }

    const it = this.charAt(arg);

    return this.isVowel(it);
  }

  /**
   * Skips over vowels in a string. Has exceptions for skipping consonants that
   * will not be encoded.
   *
   * @param at - position, in string to be encoded, of character to start skipping from
   *
   * @returns position of next consonant in string to be encoded
   */
  private skipVowels(at: number): number {
    if (at < 0) {
      return 0;
    }

    if (at >= this.length) {
      return this.length;
    }

    let it = this.charAt(at);

    while (this.isVowel(it) || it === 'W') {
      if (
        this.stringAt(at, 'WICZ', 'WITZ', 'WIAK') ||
        this.stringAt(at - 1, 'EWSKI', 'EWSKY', 'OWSKI', 'OWSKY') ||
        (this.stringAt(at, 'WICKI', 'WACKI') && at + 4 === this.last)
      ) {
        break;
      }

      at++;
      if (
        this.charAt(at - 1) === 'W' &&
        this.charAt(at) === 'H' &&
        !(
          this.stringAt(at, 'HOP') ||
          this.stringAt(at, 'HIDE', 'HARD', 'HEAD', 'HAWK', 'HERD', 'HOOK', 'HAND', 'HOLE') ||
          this.stringAt(at, 'HEART', 'HOUSE', 'HOUND') ||
          this.stringAt(at, 'HAMMER')
        )
      ) {
        at++;
      }

      if (at > this.length - 1) {
        break;
      }
      it = this.charAt(at);
    }

    return at;
  }

  /**
   * Advanced counter m_current so that it indexes the next character to be encoded
   *
   * @param ifNotEncodeVowels - number of characters to advance if not encoding internal vowels
   * @param ifEncodeVowels - number of characters to advance if encoding internal vowels
   *
   */
  private advanceCounter(ifNotEncodeVowels: number, ifEncodeVowels: number): void {
    this.current += this.encodeVowels ? ifEncodeVowels : ifNotEncodeVowels;
  }

  /**
   * Subscript safe .charAt()
   *
   * @param at - index of character to access
   * @returns null if index out of bounds, .charAt() otherwise
   */
  private charAt(at: number): string {
    return this.inWord.at(at) ?? '\0';
  }

  /**
   * Tests whether the word is the root or a regular english inflection
   * of it, e.g. "ache", "achy", "aches", "ached", "aching", "achingly"
   * This is for cases where we want to match only the root and corresponding
   * inflected forms, and not completely different words which may have the
   * same substring in them.
   */
  private rootOrInflections(inWord: string, root: string): boolean {
    const len = root.length;
    let test: string;

    test = `${root}S`;
    if (inWord === root || inWord === test) {
      return true;
    }

    if (root.charAt(len - 1) !== 'E') {
      test = `${root}ES`;
    }

    if (inWord === test) {
      return true;
    }

    test = root.charAt(len - 1) === 'E' ? `${root}D` : `${root}ED`;

    if (inWord === test) {
      return true;
    }

    if (root.charAt(len - 1) === 'E') {
      root = root.slice(0, Math.max(0, len - 1));
    }

    test = `${root}ING`;
    if (inWord === test) {
      return true;
    }

    test = `${root}INGLY`;
    if (inWord === test) {
      return true;
    }

    test = `${root}Y`;
    if (inWord === test) {
      return true;
    }

    return false;
  }

  /**
   * Determines if one of the substrings sent in is the same as
   * what is at the specified position in the string being encoded.
   *
   * @param start -
   * @param length -
   * @param compareStrings -
   * @returns
   */
  private stringAt(start: number, ...compareStrings: string[]): boolean {
    // check substring bounds
    if (start < 0 || start > this.length - 1) {
      return false;
    }

    for (const strFragment of compareStrings) {
      if (this.inWord.startsWith(strFragment, start)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Encodes input string to one or two key values according to Metaphone 3 rules.
   *
   */
  public encode(): void {
    this.flagALInversion = false;
    this.current = 0;
    this.primary = empty;
    this.secondary = empty;

    if (this.length < 1) {
      return;
    }

    //zero based index
    this.last = this.length - 1;

    ///////////main loop//////////////////////////
    while (
      !(this.primary.length > this.metaphLength) &&
      !(this.secondary.length > this.metaphLength)
    ) {
      if (this.current >= this.length) {
        break;
      }

      switch (this.charAt(this.current)) {
        case 'B': {
          this.encodeB();
          break;
        }

        case 'ß':
        case 'Ç': {
          this.metaphAdd('S');
          this.current++;
          break;
        }

        case 'C': {
          this.encodeC();
          break;
        }

        case 'D': {
          this.encodeD();
          break;
        }

        case 'F': {
          this.encodeF();
          break;
        }

        case 'G': {
          this.encodeG();
          break;
        }

        case 'H': {
          this.encodeH();
          break;
        }

        case 'J': {
          this.encodeJ();
          break;
        }

        case 'K': {
          this.encodeK();
          break;
        }

        case 'L': {
          this.encodeL();
          break;
        }

        case 'M': {
          this.encodeM();
          break;
        }

        case 'N': {
          this.encodeN();
          break;
        }

        case 'Ñ': {
          this.metaphAdd('N');
          this.current++;
          break;
        }

        case 'P': {
          this.encodeP();
          break;
        }

        case 'Q': {
          this.encodeQ();
          break;
        }

        case 'R': {
          this.encodeR();
          break;
        }

        case 'S': {
          this.encodeS();
          break;
        }

        case 'T': {
          this.encodeT();
          break;
        }

        case 'Ð': // eth
        case 'Þ': {
          // thorn

          this.metaphAdd('0');
          this.current++;
          break;
        }

        case 'V': {
          this.encodeV();
          break;
        }

        case 'W': {
          this.encodeW();
          break;
        }

        case 'X': {
          this.encodeX();
          break;
        }

        case '': {
          this.metaphAdd('X');
          this.current++;
          break;
        }

        case '': {
          this.metaphAdd('S');
          this.current++;
          break;
        }

        case 'Z': {
          this.encodeZ();
          break;
        }

        default: {
          if (this.isVowel(this.charAt(this.current))) {
            this.encodeVowel();
            break;
          }

          this.current++;
        }
      }
    }

    //only give back m_metaphLength number of chars in m_metaph
    if (this.primary.length > this.metaphLength) {
      this.primary = this.primary.slice(0, this.metaphLength);
    }

    if (this.secondary.length > this.metaphLength) {
      this.secondary = this.secondary.slice(0, this.metaphLength);
    }

    // it is possible for the two metaphs to be the same
    // after truncation. lose the second one if so
    if (this.primary === this.secondary) {
      this.secondary = empty;
    }
  }

  /**
   * Encodes all initial vowels to A.
   *
   * Encodes non-initial vowels to A if m_encodeVowels is true
   *
   *
   */
  private encodeVowel(): void {
    if (this.current === 0) {
      // all init vowels map to 'A'
      // as of Double Metaphone
      this.metaphAdd('A');
    } else if (this.encodeVowels) {
      if (this.charAt(this.current) === 'E') {
        this.encodeEPronounced();
      } else {
        if (this.skipSilentUE()) {
          return;
        }

        if (this.oSilent()) {
          this.current++;
          return;
        }

        // encode all vowels and
        // diphthongs to the same value
        this.metaphAdd('A');
      }
    }

    if (
      !this.isVowel(this.current - 2) &&
      this.stringAt(this.current - 1, 'LEWA', 'LEWO', 'LEWI')
    ) {
      this.current++;
    } else {
      this.current = this.skipVowels(this.current);
    }
  }

  /**
   * Encodes cases where non-initial 'e' is pronounced, taking
   * care to detect unusual cases from the greek.
   *
   * Only executed if non initial vowel encoding is turned on
   *
   *
   */
  private encodeEPronounced(): void {
    // special cases with two pronunciations
    // 'agape' 'lame' 'resume'
    if (
      (this.stringAt(0, 'LAME', 'SAKE', 'PATE') && this.length === 4) ||
      (this.stringAt(0, 'AGAPE') && this.length === 5) ||
      (this.current === 5 && this.stringAt(0, 'RESUME'))
    ) {
      this.metaphAdd('', 'A');
      return;
    }

    // special case "inge" → 'INGA', 'INJ'
    if (this.stringAt(0, 'INGE') && this.length === 4) {
      this.metaphAdd('A', '');
      return;
    }

    // special cases with two pronunciations
    // special handling due to the difference in
    // the pronunciation of the '-D'
    if (this.current === 5 && this.stringAt(0, 'BLESSED', 'LEARNED')) {
      this.metaphAddExactApprox('D', 'AD', 'T', 'AT');
      this.current += 2;
      return;
    }

    // encode all vowels and diphthongs to the same value
    if (
      (!this.eSilent() && !this.flagALInversion && !this.silentInternalE()) ||
      this.ePronouncedExceptions()
    ) {
      this.metaphAdd('A');
    }

    // now that we've visited the vowel in question
    this.flagALInversion = false;
  }

  /**
   * Tests for cases where non-initial 'o' is not pronounced
   * Only executed if non initial vowel encoding is turned on
   *
   * @returns true if encoded as silent - no addition to m_metaph key
   *
   */
  private oSilent(): boolean {
    // if "iron" at beginning or end of word and not "irony"
    if (this.charAt(this.current) === 'O' && this.stringAt(this.current - 2, 'IRON')) {
      if (
        (this.stringAt(0, 'IRON') ||
          (this.stringAt(this.current - 2, 'IRON') && this.last === this.current + 1)) &&
        !this.stringAt(this.current - 2, 'IRONIC')
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Tests and encodes cases where non-initial 'e' is never pronounced
   * Only executed if non initial vowel encoding is turned on
   *
   * @returns true if encoded as silent - no addition to m_metaph key
   *
   */
  private eSilent(): boolean {
    if (this.ePronouncedAtEnd()) {
      return false;
    }

    // 'e' silent when last letter, altho
    if (
      this.current === this.last ||
      // also silent if before plural 's'
      // or past tense or participle 'd', e.g.
      // 'grapes' and 'banished' → PNXT
      (this.stringAt(this.last, 'S', 'D') &&
        this.current > 1 &&
        this.current + 1 === this.last &&
        // and not e.g. "nested", "rises", or "pieces" → RASAS
        !(
          this.stringAt(this.current - 1, 'TED', 'SES', 'CES') ||
          this.stringAt(0, 'ANTIPODES', 'ANOPHELES') ||
          this.stringAt(0, 'MOHAMMED', 'MUHAMMED', 'MOUHAMED') ||
          this.stringAt(0, 'MOHAMED') ||
          this.stringAt(0, 'NORRED', 'MEDVED', 'MERCED', 'ALLRED', 'KHALED', 'RASHED', 'MASJED') ||
          this.stringAt(0, 'JARED', 'AHMED', 'HAMED', 'JAVED') ||
          this.stringAt(0, 'ABED', 'IMED')
        )) ||
      // e.g.  'wholeness', 'boneless', 'barely'
      (this.stringAt(this.current + 1, 'NESS', 'LESS') && this.current + 4 === this.last) ||
      (this.stringAt(this.current + 1, 'LY') &&
        this.current + 2 === this.last &&
        !this.stringAt(0, 'CICELY'))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Tests for words where an 'E' at the end of the word
   * is pronounced
   *
   * special cases, mostly from the greek, spanish, japanese,
   * italian, and french words normally having an acute accent.
   * also, pronouns and articles
   *
   * Many Thanks to ali, QuentinCompson, JeffCO, ToonScribe, Xan,
   * Trafalz, and VictorLaszlo, all of them atriots from the Eschaton,
   * for all their fine contributions!
   *
   * @returns true if 'E' at end is pronounced
   *
   */
  private ePronouncedAtEnd(): boolean {
    if (
      this.current === this.last &&
      (this.stringAt(this.current - 6, 'STROPHE') ||
        // if a vowel is before the 'E', vowel eater will have eaten it.
        //otherwise, consonant + 'E' will need 'E' pronounced
        this.length === 2 ||
        (this.length === 3 && !this.isVowel(0)) ||
        // these german name endings can be relied on to have the 'e' pronounced
        (this.stringAt(
          this.last - 2,
          'BKE',
          'DKE',
          'FKE',
          'KKE',
          'LKE',
          'NKE',
          'MKE',
          'PKE',
          'TKE',
          'VKE',
          'ZKE',
        ) &&
          !this.stringAt(0, 'FINKE', 'FUNKE') &&
          !this.stringAt(0, 'FRANKE')) ||
        this.stringAt(this.last - 4, 'SCHKE') ||
        (this.stringAt(0, 'ACME', 'NIKE', 'CAFE', 'RENE', 'LUPE', 'JOSE', 'ESME') &&
          this.length === 4) ||
        (this.stringAt(
          0,
          'LETHE',
          'CADRE',
          'TILDE',
          'SIGNE',
          'POSSE',
          'LATTE',
          'ANIME',
          'DOLCE',
          'CROCE',
          'ADOBE',
          'OUTRE',
          'JESSE',
          'JAIME',
          'JAFFE',
          'BENGE',
          'RUNGE',
          'CHILE',
          'DESME',
          'CONDE',
          'URIBE',
          'LIBRE',
          'ANDRE',
        ) &&
          this.length === 5) ||
        (this.stringAt(
          0,
          'HECATE',
          'PSYCHE',
          'DAPHNE',
          'PENSKE',
          'CLICHE',
          'RECIPE',
          'TAMALE',
          'SESAME',
          'SIMILE',
          'FINALE',
          'KARATE',
          'RENATE',
          'SHANTE',
          'OBERLE',
          'COYOTE',
          'KRESGE',
          'STONGE',
          'STANGE',
          'SWAYZE',
          'FUENTE',
          'SALOME',
          'URRIBE',
        ) &&
          this.length === 6) ||
        (this.stringAt(
          0,
          'ECHIDNE',
          'ARIADNE',
          'MEINEKE',
          'PORSCHE',
          'ANEMONE',
          'EPITOME',
          'SYNCOPE',
          'SOUFFLE',
          'ATTACHE',
          'MACHETE',
          'KARAOKE',
          'BUKKAKE',
          'VICENTE',
          'ELLERBE',
          'VERSACE',
        ) &&
          this.length === 7) ||
        (this.stringAt(
          0,
          'PENELOPE',
          'CALLIOPE',
          'CHIPOTLE',
          'ANTIGONE',
          'KAMIKAZE',
          'EURIDICE',
          'YOSEMITE',
          'FERRANTE',
        ) &&
          this.length === 8) ||
        (this.stringAt(0, 'HYPERBOLE', 'GUACAMOLE', 'XANTHIPPE') && this.length === 9) ||
        (this.stringAt(0, 'SYNECDOCHE') && this.length === 10))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect internal silent 'E's e.g. "roseman",
   * "firestone"
   *
   */
  private silentInternalE(): boolean {
    // 'olesen' but not 'olen'	RAKE BLAKE
    if (
      (this.stringAt(0, 'OLE') && this.eSilentSuffix(3) && !this.ePronouncingSuffix(3)) ||
      (this.stringAt(
        0,
        'BARE',
        'FIRE',
        'FORE',
        'GATE',
        'HAGE',
        'HAVE',
        'HAZE',
        'HOLE',
        'CAPE',
        'HUSE',
        'LACE',
        'LINE',
        'LIVE',
        'LOVE',
        'MORE',
        'MOSE',
        'MORE',
        'NICE',
        'RAKE',
        'ROBE',
        'ROSE',
        'SISE',
        'SIZE',
        'WARE',
        'WAKE',
        'WISE',
        'WINE',
      ) &&
        this.eSilentSuffix(4) &&
        !this.ePronouncingSuffix(4)) ||
      (this.stringAt(
        0,
        'BLAKE',
        'BRAKE',
        'BRINE',
        'CARLE',
        'CLEVE',
        'DUNNE',
        'HEDGE',
        'HOUSE',
        'JEFFE',
        'LUNCE',
        'STOKE',
        'STONE',
        'THORE',
        'WEDGE',
        'WHITE',
      ) &&
        this.eSilentSuffix(5) &&
        !this.ePronouncingSuffix(5)) ||
      (this.stringAt(0, 'BRIDGE', 'CHEESE') &&
        this.eSilentSuffix(6) &&
        !this.ePronouncingSuffix(6)) ||
      this.stringAt(this.current - 5, 'CHARLES')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect conditions required
   * for the 'E' not to be pronounced
   *
   */
  private eSilentSuffix(at: number): boolean {
    if (
      this.current === at - 1 &&
      this.length > at + 1 &&
      (this.isVowel(at + 1) || (this.stringAt(at, 'ST', 'SL') && this.length > at + 2))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect endings that will
   * cause the 'e' to be pronounced
   *
   */
  private ePronouncingSuffix(at: number): boolean {
    // e.g. 'bridgewood' - the other vowels will get eaten
    // up so we need to put one in here
    if (this.length === at + 4 && this.stringAt(at, 'WOOD')) {
      return true;
    }

    // same as above
    if (this.length === at + 5 && this.stringAt(at, 'WATER', 'WORTH')) {
      return true;
    }

    // e.g. 'bridgette'
    if (this.length === at + 3 && this.stringAt(at, 'TTE', 'LIA', 'NOW', 'ROS', 'RAS')) {
      return true;
    }

    // e.g. 'olena'
    if (
      this.length === at + 2 &&
      this.stringAt(at, 'TA', 'TT', 'NA', 'NO', 'NE', 'RS', 'RE', 'LA', 'AU', 'RO', 'RA')
    ) {
      return true;
    }

    // e.g. 'bridget'
    if (this.length === at + 1 && this.stringAt(at, 'T', 'R')) {
      return true;
    }

    return false;
  }

  /**
   * Exceptions where 'E' is pronounced where it
   * usually wouldn't be, and also some cases
   * where 'LE' transposition rules don't apply
   * and the vowel needs to be encoded here
   *
   * @returns true if 'E' pronounced
   *
   */
  private ePronouncedExceptions(): boolean {
    // greek names e.g. "herakles" or hispanic names e.g. "robles", where 'e' is pronounced, other exceptions
    if (
      (this.current + 1 === this.last &&
        (this.stringAt(this.current - 3, 'OCLES', 'ACLES', 'AKLES') ||
          this.stringAt(0, 'INES') ||
          this.stringAt(
            0,
            'LOPES',
            'ESTES',
            'GOMES',
            'NUNES',
            'ALVES',
            'ICKES',
            'INNES',
            'PERES',
            'WAGES',
            'NEVES',
            'BENES',
            'DONES',
          ) ||
          this.stringAt(
            0,
            'CORTES',
            'CHAVES',
            'VALDES',
            'ROBLES',
            'TORRES',
            'FLORES',
            'BORGES',
            'NIEVES',
            'MONTES',
            'SOARES',
            'VALLES',
            'GEDDES',
            'ANDRES',
            'VIAJES',
            'CALLES',
            'FONTES',
            'HERMES',
            'ACEVES',
            'BATRES',
            'MATHES',
          ) ||
          this.stringAt(
            0,
            'DELORES',
            'MORALES',
            'DOLORES',
            'ANGELES',
            'ROSALES',
            'MIRELES',
            'LINARES',
            'PERALES',
            'PAREDES',
            'BRIONES',
            'SANCHES',
            'CAZARES',
            'REVELES',
            'ESTEVES',
            'ALVARES',
            'MATTHES',
            'SOLARES',
            'CASARES',
            'CACERES',
            'STURGES',
            'RAMIRES',
            'FUNCHES',
            'BENITES',
            'FUENTES',
            'PUENTES',
            'TABARES',
            'HENTGES',
            'VALORES',
          ) ||
          this.stringAt(
            0,
            'GONZALES',
            'MERCEDES',
            'FAGUNDES',
            'JOHANNES',
            'GONSALES',
            'BERMUDES',
            'CESPEDES',
            'BETANCES',
            'TERRONES',
            'DIOGENES',
            'CORRALES',
            'CABRALES',
            'MARTINES',
            'GRAJALES',
          ) ||
          this.stringAt(
            0,
            'CERVANTES',
            'FERNANDES',
            'GONCALVES',
            'BENEVIDES',
            'CIFUENTES',
            'SIFUENTES',
            'SERVANTES',
            'HERNANDES',
            'BENAVIDES',
          ) ||
          this.stringAt(0, 'ARCHIMEDES', 'CARRIZALES', 'MAGALLANES'))) ||
      this.stringAt(this.current - 2, 'FRED', 'DGES', 'DRED', 'GNES') ||
      this.stringAt(this.current - 5, 'PROBLEM', 'RESPLEN') ||
      this.stringAt(this.current - 4, 'REPLEN') ||
      this.stringAt(this.current - 3, 'SPLE')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Encodes "-UE".
   *
   * @returns true if encoding handled in this routine, false if not
   */
  private skipSilentUE(): boolean {
    // always silent except for cases listed below
    if (
      this.stringAt(this.current - 1, 'QUE', 'GUE') &&
      !this.stringAt(0, 'BARBEQUE', 'PALENQUE', 'APPLIQUE') &&
      // '-que' cases usually french but missing the acute accent
      !this.stringAt(0, 'RISQUE') &&
      !this.stringAt(this.current - 3, 'ARGUE', 'SEGUE') &&
      !this.stringAt(0, 'PIROGUE', 'ENRIQUE') &&
      !this.stringAt(0, 'COMMUNIQUE') &&
      this.current > 1 &&
      (this.current + 1 === this.last || this.stringAt(0, 'JACQUES'))
    ) {
      this.current = this.skipVowels(this.current);
      return true;
    }

    return false;
  }

  /**
   * Encodes 'B'
   *
   *
   */
  private encodeB(): void {
    if (this.encodeSilentB()) {
      return;
    }

    // "-mb", e.g", "dumb", already skipped over under
    // 'M', altho it should really be handled here...
    this.metaphAddExactApprox('B', 'P');

    if (
      this.charAt(this.current + 1) === 'B' ||
      (this.charAt(this.current + 1) === 'P' &&
        this.current + 1 < this.last &&
        this.charAt(this.current + 2) !== 'H')
    ) {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encodes silent 'B' for cases not covered under "-mb-"
   *
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentB(): boolean {
    //'debt', 'doubt', 'subtle'
    if (
      this.stringAt(this.current - 2, 'DEBT') ||
      this.stringAt(this.current - 2, 'SUBTL') ||
      this.stringAt(this.current - 2, 'SUBTIL') ||
      this.stringAt(this.current - 3, 'DOUBT')
    ) {
      this.metaphAdd('T');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes 'C'
   *
   */
  private encodeC(): void {
    if (
      this.encodeSilentCAtBeginning() ||
      this.encodeCaToS() ||
      this.encodeCoToS() ||
      this.encodeCh() ||
      this.encodeCcia() ||
      this.encodeCc() ||
      this.encodeCkCgCq() ||
      this.encodeCFrontVowel() ||
      this.encodeSilentC() ||
      this.encodeCz() ||
      this.encodeCs()
    ) {
      return;
    }

    //else
    if (!this.stringAt(this.current - 1, 'C', 'K', 'G', 'Q')) {
      this.metaphAdd('K');
    }

    //name sent in 'mac caffrey', 'mac gregor
    if (this.stringAt(this.current + 1, ' C', ' Q', ' G')) {
      this.current += 2;
    } else if (
      this.stringAt(this.current + 1, 'C', 'K', 'Q') &&
      !this.stringAt(this.current + 1, 'CE', 'CI')
    ) {
      this.current += 2;
      // account for combinations such as Ro-ckc-liffe
      if (
        this.stringAt(this.current, 'C', 'K', 'Q') &&
        !this.stringAt(this.current + 1, 'CE', 'CI')
      ) {
        this.current++;
      }
    } else {
      this.current++;
    }
  }

  /**
   * Encodes cases where 'C' is silent at beginning of word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentCAtBeginning(): boolean {
    //skip these when at start of word
    if (this.current === 0 && this.stringAt(this.current, 'CT', 'CN')) {
      this.current += 1;
      return true;
    }

    return false;
  }

  /**
   * Encodes exceptions where "-CA-" should encode to S
   * instead of K including cases where the cedilla has not been used
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCaToS(): boolean {
    // Special case: 'caesar'.
    // Also, where cedilla not used, as in "linguica" → LNKS
    if (
      (this.current === 0 && this.stringAt(this.current, 'CAES', 'CAEC', 'CAEM')) ||
      this.stringAt(0, 'FRANCAIS', 'FRANCAIX', 'LINGUICA') ||
      this.stringAt(0, 'FACADE') ||
      this.stringAt(0, 'GONCALVES', 'PROVENCAL')
    ) {
      this.metaphAdd('S');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encodes exceptions where "-CO-" encodes to S instead of K
   * including cases where the cedilla has not been used
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCoToS(): boolean {
    // e.g. 'coelecanth' → SLKN0
    if (
      (this.stringAt(this.current, 'COEL') &&
        (this.isVowel(this.current + 4) || this.current + 3 === this.last)) ||
      this.stringAt(this.current, 'COENA', 'COENO') ||
      this.stringAt(0, 'FRANCOIS', 'MELANCON') ||
      this.stringAt(0, 'GARCON')
    ) {
      this.metaphAdd('S');
      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-CH-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCh(): boolean {
    if (this.stringAt(this.current, 'CH')) {
      if (
        this.encodeChae() ||
        this.encodeChToH() ||
        this.encodeSilentCh() ||
        this.encodeArch() ||
        // Encode_CH_To_X() should be
        // called before the germanic
        // and greek encoding functions
        this.encodeChToX() ||
        this.encodeEnglishChToK() ||
        this.encodeGermanicChToK() ||
        this.encodeGreekChInitial() ||
        this.encodeGreekChNonInitial()
      ) {
        return true;
      }

      if (this.current > 0) {
        if (this.stringAt(0, 'MC') && this.current === 1) {
          //e.g., "McHugh"
          this.metaphAdd('K');
        } else {
          this.metaphAdd('X', 'K');
        }
      } else {
        this.metaphAdd('X');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes "-CHAE-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeChae(): boolean {
    // e.g. 'michael'
    if (this.current > 0 && this.stringAt(this.current + 2, 'AE')) {
      if (this.stringAt(0, 'RACHAEL')) {
        this.metaphAdd('X');
      } else if (!this.stringAt(this.current - 1, 'C', 'K', 'G', 'Q')) {
        this.metaphAdd('K');
      }

      this.advanceCounter(4, 2);
      return true;
    }

    return false;
  }

  /**
   * Encdoes transliterations from the hebrew where the
   * sound 'kh' is represented as "-CH-". The normal pronounciation
   * of this in english is either 'h' or 'kh', and alternate
   * spellings most often use "-H-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeChToH(): boolean {
    // hebrew → 'H', e.g. 'channukah', 'chabad'
    if (
      (this.current === 0 &&
        (this.stringAt(this.current + 2, 'AIM', 'ETH', 'ELM') ||
          this.stringAt(this.current + 2, 'ASID', 'AZAN') ||
          this.stringAt(this.current + 2, 'UPPAH', 'UTZPA', 'ALLAH', 'ALUTZ', 'AMETZ') ||
          this.stringAt(this.current + 2, 'ESHVAN', 'ADARIM', 'ANUKAH') ||
          this.stringAt(this.current + 2, 'ALLLOTH', 'ANNUKAH', 'AROSETH'))) ||
      // and an irish name with the same encoding
      this.stringAt(this.current - 3, 'CLACHAN')
    ) {
      this.metaphAdd('H');
      this.advanceCounter(3, 2);
      return true;
    }

    return false;
  }

  /**
   * Encodes cases where "-CH-" is not pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentCh(): boolean {
    // '-ch-' not pronounced
    if (
      this.stringAt(this.current - 2, 'FUCHSIA') ||
      this.stringAt(this.current - 2, 'YACHT') ||
      this.stringAt(0, 'STRACHAN') ||
      this.stringAt(0, 'CRICHTON') ||
      (this.stringAt(this.current - 3, 'DRACHM') && !this.stringAt(this.current - 3, 'DRACHMA'))
    ) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes "-CH-" to X
   * English language patterns
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeChToX(): boolean {
    // e.g. 'approach', 'beach'
    if (
      (this.stringAt(this.current - 2, 'OACH', 'EACH', 'EECH', 'OUCH', 'OOCH', 'MUCH', 'SUCH') &&
        !this.stringAt(this.current - 3, 'JOACH')) ||
      // e.g. 'dacha', 'macho'
      (this.current + 2 === this.last && this.stringAt(this.current - 1, 'ACHA', 'ACHO')) ||
      (this.stringAt(this.current, 'CHOT', 'CHOD', 'CHAT') && this.current + 3 === this.last) ||
      (this.stringAt(this.current - 1, 'OCHE') &&
        this.current + 2 === this.last &&
        !this.stringAt(this.current - 2, 'DOCHE')) ||
      this.stringAt(this.current - 4, 'ATTACH', 'DETACH', 'KOVACH') ||
      this.stringAt(this.current - 5, 'SPINACH') ||
      this.stringAt(0, 'MACHAU') ||
      this.stringAt(this.current - 4, 'PARACHUT') ||
      this.stringAt(this.current - 5, 'MASSACHU') ||
      (this.stringAt(this.current - 3, 'THACH') && !this.stringAt(this.current - 1, 'ACHE')) ||
      this.stringAt(this.current - 2, 'VACHON')
    ) {
      this.metaphAdd('X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes "-CH-" to K in contexts of
   * initial "A" or "E" follwed by "CH"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeEnglishChToK(): boolean {
    //'ache', 'echo', alternate spelling of 'michael'
    if (
      (this.current === 1 && this.rootOrInflections(this.inWord, 'ACHE')) ||
      (this.current > 3 &&
        this.rootOrInflections(this.inWord.slice(Math.max(0, this.current - 1)), 'ACHE') &&
        (this.stringAt(0, 'EAR') ||
          this.stringAt(0, 'HEAD', 'BACK') ||
          this.stringAt(0, 'HEART', 'BELLY', 'TOOTH'))) ||
      this.stringAt(this.current - 1, 'ECHO') ||
      this.stringAt(this.current - 2, 'MICHEAL') ||
      this.stringAt(this.current - 4, 'JERICHO') ||
      this.stringAt(this.current - 5, 'LEPRECH')
    ) {
      this.metaphAdd('K', 'X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes "-CH-" to K in mostly germanic context
   * of internal "-ACH-", with exceptions
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGermanicChToK(): boolean {
    // various germanic
    // "<consonant><vowel>CH-"implies a german word where 'ch' → K
    if (
      (this.current > 1 &&
        !this.isVowel(this.current - 2) &&
        this.stringAt(this.current - 1, 'ACH') &&
        !this.stringAt(this.current - 2, 'MACHADO', 'MACHUCA', 'LACHANC', 'LACHAPE', 'KACHATU') &&
        !this.stringAt(this.current - 3, 'KHACHAT') &&
        this.charAt(this.current + 2) !== 'I' &&
        (this.charAt(this.current + 2) !== 'E' ||
          this.stringAt(this.current - 2, 'BACHER', 'MACHER', 'MACHEN', 'LACHER'))) ||
      // e.g. 'brecht', 'fuchs'
      (this.stringAt(this.current + 2, 'T', 'S') &&
        !(this.stringAt(0, 'WHICHSOEVER') || this.stringAt(0, 'LUNCHTIME'))) ||
      // e.g. 'andromache'
      this.stringAt(0, 'SCHR') ||
      (this.current > 2 && this.stringAt(this.current - 2, 'MACHE')) ||
      (this.current === 2 && this.stringAt(this.current - 2, 'ZACH')) ||
      this.stringAt(this.current - 4, 'SCHACH') ||
      this.stringAt(this.current - 1, 'ACHEN') ||
      this.stringAt(this.current - 3, 'SPICH', 'ZURCH', 'BUECH') ||
      (this.stringAt(this.current - 3, 'KIRCH', 'JOACH', 'BLECH', 'MALCH') &&
        // "kirch" and "blech" both get 'X'
        !(this.stringAt(this.current - 3, 'KIRCHNER') || this.current + 1 === this.last)) ||
      (this.current + 1 === this.last && this.stringAt(this.current - 2, 'NICH', 'LICH', 'BACH')) ||
      (this.current + 1 === this.last &&
        this.stringAt(this.current - 3, 'URICH', 'BRICH', 'ERICH', 'DRICH', 'NRICH') &&
        !this.stringAt(this.current - 5, 'ALDRICH') &&
        !this.stringAt(this.current - 6, 'GOODRICH') &&
        !this.stringAt(this.current - 7, 'GINGERICH')) ||
      (this.current + 1 === this.last &&
        this.stringAt(
          this.current - 4,
          'ULRICH',
          'LFRICH',
          'LLRICH',
          'EMRICH',
          'ZURICH',
          'EYRICH',
        )) ||
      // e.g., 'wachtler', 'wechsler', but not 'tichner'
      ((this.stringAt(this.current - 1, 'A', 'O', 'U', 'E') || this.current === 0) &&
        this.stringAt(this.current + 2, 'L', 'R', 'N', 'M', 'B', 'H', 'F', 'V', 'W', ' '))
    ) {
      // "CHR/L-" e.g. 'chris' do not get
      // alt pronunciation of 'X'
      if (this.stringAt(this.current + 2, 'R', 'L') || this.slavoGermanic()) {
        this.metaphAdd('K');
      } else {
        this.metaphAdd('K', 'X');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-ARCH-". Some occurances are from greek roots and therefore encode
   * to 'K', others are from english words and therefore encode to 'X'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeArch(): boolean {
    if (this.stringAt(this.current - 2, 'ARCH')) {
      // "-ARCH-" has many combining forms where "-CH-" → K because of its
      // derivation from the greek
      if (
        ((this.isVowel(this.current + 2) &&
          this.stringAt(this.current - 2, 'ARCHA', 'ARCHI', 'ARCHO', 'ARCHU', 'ARCHY')) ||
          this.stringAt(
            this.current - 2,
            'ARCHEA',
            'ARCHEG',
            'ARCHEO',
            'ARCHET',
            'ARCHEL',
            'ARCHES',
            'ARCHEP',
            'ARCHEM',
            'ARCHEN',
          ) ||
          (this.stringAt(this.current - 2, 'ARCH') && this.current + 1 === this.last) ||
          this.stringAt(0, 'MENARCH')) &&
        !this.rootOrInflections(this.inWord, 'ARCH') &&
        !this.stringAt(this.current - 4, 'SEARCH', 'POARCH') &&
        !this.stringAt(0, 'ARCHENEMY', 'ARCHIBALD', 'ARCHULETA', 'ARCHAMBAU') &&
        !this.stringAt(0, 'ARCHER', 'ARCHIE') &&
        !(
          (((this.stringAt(this.current - 3, 'LARCH', 'MARCH', 'PARCH') ||
            this.stringAt(this.current - 4, 'STARCH')) &&
            !(
              this.stringAt(0, 'EPARCH') ||
              this.stringAt(0, 'NOMARCH') ||
              this.stringAt(0, 'EXILARCH', 'HIPPARCH', 'MARCHESE') ||
              this.stringAt(0, 'ARISTARCH') ||
              this.stringAt(0, 'MARCHETTI')
            )) ||
            this.rootOrInflections(this.inWord, 'STARCH')) &&
          (!this.stringAt(this.current - 2, 'ARCHU', 'ARCHY') || this.stringAt(0, 'STARCHY'))
        )
      ) {
        this.metaphAdd('K', 'X');
      } else {
        this.metaphAdd('X');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-CH-" to K when from greek roots
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGreekChInitial(): boolean {
    // greek roots e.g. 'chemistry', 'chorus', ch at beginning of root
    if (
      (this.stringAt(
        this.current,
        'CHAMOM',
        'CHARAC',
        'CHARIS',
        'CHARTO',
        'CHARTU',
        'CHARYB',
        'CHRIST',
        'CHEMIC',
        'CHILIA',
      ) ||
        (this.stringAt(
          this.current,
          'CHEMI',
          'CHEMO',
          'CHEMU',
          'CHEMY',
          'CHOND',
          'CHONA',
          'CHONI',
          'CHOIR',
          'CHASM',
          'CHARO',
          'CHROM',
          'CHROI',
          'CHAMA',
          'CHALC',
          'CHALD',
          'CHAET',
          'CHIRO',
          'CHILO',
          'CHELA',
          'CHOUS',
          'CHEIL',
          'CHEIR',
          'CHEIM',
          'CHITI',
          'CHEOP',
        ) &&
          !(
            this.stringAt(this.current, 'CHEMIN') || this.stringAt(this.current - 2, 'ANCHONDO')
          )) ||
        (this.stringAt(this.current, 'CHISM', 'CHELI') &&
          // exclude spanish "machismo"
          !(
            this.stringAt(0, 'MACHISMO') ||
            // exclude some french words
            this.stringAt(0, 'REVANCHISM') ||
            this.stringAt(0, 'RICHELIEU') ||
            (this.stringAt(0, 'CHISM') && this.length === 5) ||
            this.stringAt(0, 'MICHEL')
          )) ||
        // include e.g. "chorus", "chyme", "chaos"
        (this.stringAt(
          this.current,
          'CHOR',
          'CHOL',
          'CHYM',
          'CHYL',
          'CHLO',
          'CHOS',
          'CHUS',
          'CHOE',
        ) &&
          !this.stringAt(0, 'CHOLLO', 'CHOLLA', 'CHORIZ')) ||
        // "chaos" → K but not "chao"
        (this.stringAt(this.current, 'CHAO') && this.current + 3 !== this.last) ||
        // e.g. "abranchiate"
        (this.stringAt(this.current, 'CHIA') &&
          !(this.stringAt(0, 'APPALACHIA') || this.stringAt(0, 'CHIAPAS'))) ||
        // e.g. "chimera"
        this.stringAt(this.current, 'CHIMERA', 'CHIMAER', 'CHIMERI') ||
        // e.g. "chameleon"
        (this.current === 0 && this.stringAt(this.current, 'CHAME', 'CHELO', 'CHITO')) ||
        // e.g. "spirochete"
        ((this.current + 4 === this.last || this.current + 5 === this.last) &&
          this.stringAt(this.current - 1, 'OCHETE'))) &&
      // more exceptions where "-CH-" → X e.g. "chortle", "crocheter"
      !(
        (this.stringAt(0, 'CHORE', 'CHOLO', 'CHOLA') && this.length === 5) ||
        this.stringAt(this.current, 'CHORT', 'CHOSE') ||
        this.stringAt(this.current - 3, 'CROCHET') ||
        this.stringAt(0, 'CHEMISE', 'CHARISE', 'CHARISS', 'CHAROLE')
      )
    ) {
      // "CHR/L-" e.g. 'christ', 'chlorine' do not get
      // alt pronunciation of 'X'
      if (this.stringAt(this.current + 2, 'R', 'L')) {
        this.metaphAdd('K');
      } else {
        this.metaphAdd('K', 'X');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode a variety of greek and some german roots where "-CH-" → K
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGreekChNonInitial(): boolean {
    //greek & other roots e.g. 'tachometer', 'orchid', ch in middle or end of root
    if (
      this.stringAt(
        this.current - 2,
        'ORCHID',
        'NICHOL',
        'MECHAN',
        'LICHEN',
        'MACHIC',
        'PACHEL',
        'RACHIF',
        'RACHID',
        'RACHIS',
        'RACHIC',
        'MICHAL',
      ) ||
      this.stringAt(
        this.current - 3,
        'MELCH',
        'GLOCH',
        'TRACH',
        'TROCH',
        'BRACH',
        'SYNCH',
        'PSYCH',
        'STICH',
        'PULCH',
        'EPOCH',
      ) ||
      (this.stringAt(this.current - 3, 'TRICH') && !this.stringAt(this.current - 5, 'OSTRICH')) ||
      (this.stringAt(
        this.current - 2,
        'TYCH',
        'TOCH',
        'BUCH',
        'MOCH',
        'CICH',
        'DICH',
        'NUCH',
        'EICH',
        'LOCH',
        'DOCH',
        'ZECH',
        'WYCH',
      ) &&
        !(
          this.stringAt(this.current - 4, 'INDOCHINA') || this.stringAt(this.current - 2, 'BUCHON')
        )) ||
      this.stringAt(this.current - 2, 'LYCHN', 'TACHO', 'ORCHO', 'ORCHI', 'LICHO') ||
      (this.stringAt(this.current - 1, 'OCHER', 'ECHIN', 'ECHID') &&
        (this.current === 1 || this.current === 2)) ||
      this.stringAt(
        this.current - 4,
        'BRONCH',
        'STOICH',
        'STRYCH',
        'TELECH',
        'PLANCH',
        'CATECH',
        'MANICH',
        'MALACH',
        'BIANCH',
        'DIDACH',
      ) ||
      (this.stringAt(this.current - 1, 'ICHA', 'ICHN') && this.current === 1) ||
      this.stringAt(this.current - 2, 'ORCHESTR') ||
      this.stringAt(this.current - 4, 'BRANCHIO', 'BRANCHIF') ||
      (this.stringAt(this.current - 1, 'ACHAB', 'ACHAD', 'ACHAN', 'ACHAZ') &&
        !this.stringAt(this.current - 2, 'MACHADO', 'LACHANC')) ||
      this.stringAt(this.current - 1, 'ACHISH', 'ACHILL', 'ACHAIA', 'ACHENE') ||
      this.stringAt(this.current - 1, 'ACHAIAN', 'ACHATES', 'ACHIRAL', 'ACHERON') ||
      this.stringAt(
        this.current - 1,
        'ACHILLEA',
        'ACHIMAAS',
        'ACHILARY',
        'ACHELOUS',
        'ACHENIAL',
        'ACHERNAR',
      ) ||
      this.stringAt(this.current - 1, 'ACHALASIA', 'ACHILLEAN', 'ACHIMENES') ||
      this.stringAt(this.current - 1, 'ACHIMELECH', 'ACHITOPHEL') ||
      // e.g. 'inchoate'
      (this.current - 2 === 0 &&
        (this.stringAt(this.current - 2, 'INCHOA') ||
          // e.g. 'ischemia'
          this.stringAt(0, 'ISCH'))) ||
      // e.g. 'ablimelech', 'antioch', 'pentateuch'
      (this.current + 1 === this.last &&
        this.stringAt(this.current - 1, 'A', 'O', 'U', 'E') &&
        !(
          this.stringAt(0, 'DEBAUCH') ||
          this.stringAt(this.current - 2, 'MUCH', 'SUCH', 'KOCH') ||
          this.stringAt(this.current - 5, 'OODRICH', 'ALDRICH')
        ))
    ) {
      this.metaphAdd('K', 'X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes reliably italian "-CCIA-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCcia(): boolean {
    //e.g., 'focaccia'
    if (this.stringAt(this.current + 1, 'CIA')) {
      this.metaphAdd('X', 'S');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-CC-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCc(): boolean {
    //double 'C', but not if e.g. 'McClellan'
    if (this.stringAt(this.current, 'CC') && !(this.current === 1 && this.charAt(0) === 'M')) {
      // exception
      if (this.stringAt(this.current - 3, 'FLACCID')) {
        this.metaphAdd('S');
        this.advanceCounter(3, 2);
        return true;
      }

      //'bacci', 'bertucci', other italian
      if (
        (this.current + 2 === this.last && this.stringAt(this.current + 2, 'I')) ||
        this.stringAt(this.current + 2, 'IO') ||
        (this.current + 4 === this.last && this.stringAt(this.current + 2, 'INO', 'INI'))
      ) {
        this.metaphAdd('X');
        this.advanceCounter(3, 2);
        return true;
      }

      //'accident', 'accede' 'succeed'
      if (
        this.stringAt(this.current + 2, 'I', 'E', 'Y') &&
        //except 'bellocchio','bacchus', 'soccer' get K
        !(this.charAt(this.current + 2) === 'H' || this.stringAt(this.current - 2, 'SOCCER'))
      ) {
        this.metaphAdd('KS');
        this.advanceCounter(3, 2);
        return true;
      }
      //Pierce's rule
      this.metaphAdd('K');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode cases where the consonant following "C" is redundant
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCkCgCq(): boolean {
    if (this.stringAt(this.current, 'CK', 'CG', 'CQ')) {
      // eastern european spelling e.g. 'gorecki' == 'goresky'
      if (
        this.stringAt(this.current, 'CKI', 'CKY') &&
        this.current + 2 === this.last &&
        this.length > 6
      ) {
        this.metaphAdd('K', 'SK');
      } else {
        this.metaphAdd('K');
      }
      this.current += 2;

      if (this.stringAt(this.current, 'K', 'G', 'Q')) {
        this.current++;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "C" preceeds a front vowel such as "E", "I", or "Y".
   * These cases most likely → S or X
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCFrontVowel(): boolean {
    if (this.stringAt(this.current, 'CI', 'CE', 'CY')) {
      if (
        this.encodeBritishSilentCe() ||
        this.encodeCe() ||
        this.encodeCi() ||
        this.encodeLatinateSuffixes()
      ) {
        this.advanceCounter(2, 1);
        return true;
      }

      this.metaphAdd('S');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeBritishSilentCe(): boolean {
    // english place names like e.g.'gloucester' pronounced glo-ster
    if (
      (this.stringAt(this.current + 1, 'ESTER') && this.current + 5 === this.last) ||
      this.stringAt(this.current + 1, 'ESTERSHIRE')
    ) {
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCe(): boolean {
    // 'ocean', 'commercial', 'provincial', 'cello', 'fettucini', 'medici'
    if (
      (this.stringAt(this.current + 1, 'EAN') && this.isVowel(this.current - 1)) ||
      // e.g. 'rosacea'
      (this.stringAt(this.current - 1, 'ACEA') &&
        this.current + 2 === this.last &&
        !this.stringAt(0, 'PANACEA')) ||
      // e.g. 'botticelli', 'concerto'
      this.stringAt(this.current + 1, 'ELLI', 'ERTO', 'EORL') ||
      // some italian names familiar to americans
      (this.stringAt(this.current - 3, 'CROCE') && this.current + 1 === this.last) ||
      this.stringAt(this.current - 3, 'DOLCE') ||
      // e.g. 'cello'
      (this.stringAt(this.current + 1, 'ELLO') && this.current + 4 === this.last)
    ) {
      this.metaphAdd('X', 'S');
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCi(): boolean {
    // with consonant before C
    // e.g. 'fettucini', but exception for the americanized pronunciation of 'mancini'
    if (
      (this.stringAt(this.current + 1, 'INI') &&
        !this.stringAt(0, 'MANCINI') &&
        this.current + 3 === this.last) ||
      // e.g. 'medici'
      (this.stringAt(this.current - 1, 'ICI') && this.current + 1 === this.last) ||
      // e.g. "commercial', 'provincial', 'cistercian'
      this.stringAt(this.current - 1, 'RCIAL', 'NCIAL', 'RCIAN', 'UCIUS') ||
      // special cases
      this.stringAt(this.current - 3, 'MARCIA') ||
      this.stringAt(this.current - 2, 'ANCIENT')
    ) {
      this.metaphAdd('X', 'S');
      return true;
    }

    // with vowel before C (or at beginning?)
    if (
      ((this.stringAt(this.current, 'CIO', 'CIE', 'CIA') && this.isVowel(this.current - 1)) ||
        // e.g. "ciao"
        this.stringAt(this.current + 1, 'IAO')) &&
      !this.stringAt(this.current - 4, 'COERCION')
    ) {
      if (
        (this.stringAt(this.current, 'CIAN', 'CIAL', 'CIAO', 'CIES', 'CIOL', 'CION') ||
          // exception - "glacier" → 'X' but "spacier" = > 'S'
          this.stringAt(this.current - 3, 'GLACIER') ||
          this.stringAt(
            this.current,
            'CIENT',
            'CIENC',
            'CIOUS',
            'CIATE',
            'CIATI',
            'CIATO',
            'CIABL',
            'CIARY',
          ) ||
          (this.current + 2 === this.last && this.stringAt(this.current, 'CIA', 'CIO'))) &&
        // ||
        // TODO [>2.1]: CIAS and CIOS 4 letters
        //(this.current + 3 === this.last && this.stringAt(this.current,  'CIAS', 'CIOS'))
        // exceptions
        !(
          this.stringAt(this.current - 4, 'ASSOCIATION') ||
          this.stringAt(0, 'OCIE') ||
          // exceptions mostly because these names are usually from
          // the spanish rather than the italian in america
          this.stringAt(this.current - 2, 'LUCIO') ||
          this.stringAt(this.current - 2, 'MACIAS') ||
          this.stringAt(this.current - 3, 'GRACIE', 'GRACIA') ||
          this.stringAt(this.current - 2, 'LUCIANO') ||
          this.stringAt(this.current - 3, 'MARCIANO') ||
          this.stringAt(this.current - 4, 'PALACIO') ||
          this.stringAt(this.current - 4, 'FELICIANO') ||
          this.stringAt(this.current - 5, 'MAURICIO') ||
          this.stringAt(this.current - 7, 'ENCARNACION') ||
          this.stringAt(this.current - 4, 'POLICIES') ||
          this.stringAt(this.current - 2, 'HACIENDA') ||
          this.stringAt(this.current - 6, 'ANDALUCIA') ||
          this.stringAt(this.current - 2, 'SOCIO', 'SOCIE')
        )
      ) {
        this.metaphAdd('X', 'S');
      } else {
        this.metaphAdd('S', 'X');
      }

      return true;
    }

    // exception
    if (this.stringAt(this.current - 4, 'COERCION')) {
      this.metaphAdd('J');
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeLatinateSuffixes(): boolean {
    if (this.stringAt(this.current + 1, 'EOUS', 'IOUS')) {
      this.metaphAdd('X', 'S');
      return true;
    }

    return false;
  }

  /**
   * Encodes some exceptions where "C" is silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentC(): boolean {
    if (this.stringAt(this.current + 1, 'T', 'S')) {
      if (this.stringAt(0, 'CONNECTICUT') || this.stringAt(0, 'INDICT', 'TUCSON')) {
        this.current++;
        return true;
      }
    }

    return false;
  }

  /**
   * Encodes slavic spellings or transliterations
   * written as "-CZ-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCz(): boolean {
    if (this.stringAt(this.current + 1, 'Z') && !this.stringAt(this.current - 1, 'ECZEMA')) {
      if (this.stringAt(this.current, 'CZAR')) {
        this.metaphAdd('S');
      }
      // otherwise most likely a czech word...
      else {
        this.metaphAdd('X');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * "-CS" special cases
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCs(): boolean {
    // give an 'etymological' 2nd
    // encoding for "kovacs" so
    // that it matches "kovach"
    if (this.stringAt(0, 'KOVACS')) {
      this.metaphAdd('KS', 'X');
      this.current += 2;
      return true;
    }

    if (
      this.stringAt(this.current - 1, 'ACS') &&
      this.current + 1 === this.last &&
      !this.stringAt(this.current - 4, 'ISAACS')
    ) {
      this.metaphAdd('X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-D-"
   *
   */
  private encodeD(): void {
    if (
      this.encodeDg() ||
      this.encodeDj() ||
      this.encodeDtDd() ||
      this.encodeDToJ() ||
      this.encodeDous() ||
      this.encodeSilentD()
    ) {
      return;
    }

    if (this.encodeExact) {
      // "final de-voicing" in this case
      // e.g. 'missed' == 'mist'
      if (this.current === this.last && this.stringAt(this.current - 3, 'SSED')) {
        this.metaphAdd('T');
      } else {
        this.metaphAdd('D');
      }
    } else {
      this.metaphAdd('T');
    }
    this.current++;
  }

  /**
   * Encode "-DG-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeDg(): boolean {
    if (this.stringAt(this.current, 'DG')) {
      // excludes exceptions e.g. 'edgar',
      // or cases where 'g' is first letter of combining form
      // e.g. 'handgun', 'waldglas'
      if (
        this.stringAt(this.current + 2, 'A', 'O') ||
        // e.g. "midgut"
        this.stringAt(this.current + 1, 'GUN', 'GUT') ||
        // e.g. "handgrip"
        this.stringAt(this.current + 1, 'GEAR', 'GLAS', 'GRIP', 'GREN', 'GILL', 'GRAF') ||
        // e.g. "mudgard"
        this.stringAt(this.current + 1, 'GUARD', 'GUILT', 'GRAVE', 'GRASS') ||
        // e.g. "woodgrouse"
        this.stringAt(this.current + 1, 'GROUSE')
      ) {
        this.metaphAddExactApprox('DG', 'TK');
      } else {
        //e.g. "edge", "abridgment"
        this.metaphAdd('J');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-DJ-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeDj(): boolean {
    // e.g. "adjacent"
    if (this.stringAt(this.current, 'DJ')) {
      this.metaphAdd('J');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-DD-" and "-DT-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeDtDd(): boolean {
    // eat redundant 'T' or 'D'
    if (this.stringAt(this.current, 'DT', 'DD')) {
      if (this.stringAt(this.current, 'DTH')) {
        this.metaphAddExactApprox('D0', 'T0');
        this.current += 3;
      } else {
        if (this.encodeExact) {
          // devoice it
          if (this.stringAt(this.current, 'DT')) {
            this.metaphAdd('T');
          } else {
            this.metaphAdd('D');
          }
        } else {
          this.metaphAdd('T');
        }
        this.current += 2;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "-DU-" "-DI-", and "-DI-" → J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeDToJ(): boolean {
    // e.g. "module", "adulate"
    if (
      (this.stringAt(this.current, 'DUL') &&
        this.isVowel(this.current - 1) &&
        this.isVowel(this.current + 3)) ||
      // e.g. "soldier", "grandeur", "procedure"
      (this.current + 3 === this.last &&
        this.stringAt(this.current - 1, 'LDIER', 'NDEUR', 'EDURE', 'RDURE')) ||
      this.stringAt(this.current - 3, 'CORDIAL') ||
      // e.g.  "pendulum", "education"
      this.stringAt(this.current - 1, 'NDULA', 'NDULU', 'EDUCA') ||
      // e.g. "individual", "individual", "residuum"
      this.stringAt(this.current - 1, 'ADUA', 'IDUA', 'IDUU')
    ) {
      this.metaphAddExactApprox('J', 'D', 'J', 'T');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode latinate suffix "-DOUS" where 'D' is pronounced as J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeDous(): boolean {
    // e.g. "assiduous", "arduous"
    if (this.stringAt(this.current + 1, 'UOUS')) {
      this.metaphAddExactApprox('J', 'D', 'J', 'T');
      this.advanceCounter(4, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode silent "-D-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentD(): boolean {
    // silent 'D' e.g. 'wednesday', 'handsome'
    if (
      this.stringAt(this.current - 2, 'WEDNESDAY') ||
      this.stringAt(this.current - 3, 'HANDKER', 'HANDSOM', 'WINDSOR') ||
      // french silent D at end in words or names familiar to americans
      this.stringAt(this.current - 5, 'PERNOD', 'ARTAUD', 'RENAUD') ||
      this.stringAt(this.current - 6, 'RIMBAUD', 'MICHAUD', 'BICHAUD')
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-F-"
   *
   */
  private encodeF(): void {
    // Encode cases where "-FT-" → "T" is usually silent
    // e.g. 'often', 'soften'
    // This should really be covered under "T"!
    if (this.stringAt(this.current - 1, 'OFTEN')) {
      this.metaphAdd('F', 'FT');
      this.current += 2;
      return;
    }

    // eat redundant 'F'
    if (this.charAt(this.current + 1) === 'F') {
      this.current += 2;
    } else {
      this.current++;
    }

    this.metaphAdd('F');
  }

  /**
   * Encode "-G-"
   *
   */
  private encodeG(): void {
    if (
      this.encodeSilentGAtBeginning() ||
      this.encodeGg() ||
      this.encodeGk() ||
      this.encodeGh() ||
      this.encodeSilentG() ||
      this.encodeGn() ||
      this.encodeGl() ||
      this.encodeInitialGFrontVowel() ||
      this.encodeNger() ||
      this.encodeGer() ||
      this.encodeGel() ||
      this.encodeNonInitialGFrontVowel() ||
      this.encodeGaToJ()
    ) {
      return;
    }

    if (!this.stringAt(this.current - 1, 'C', 'K', 'G', 'Q')) {
      this.metaphAddExactApprox('G', 'K');
    }

    this.current++;
  }

  /**
   * Encode cases where 'G' is silent at beginning of word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentGAtBeginning(): boolean {
    //skip these when at start of word
    if (this.current === 0 && this.stringAt(this.current, 'GN')) {
      this.current += 1;
      return true;
    }

    return false;
  }

  /**
   * Encode "-GG-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGg(): boolean {
    if (this.charAt(this.current + 1) === 'G') {
      // italian e.g, 'loggia', 'caraveggio', also 'suggest' and 'exaggerate'
      if (
        this.stringAt(this.current - 1, 'AGGIA', 'OGGIA', 'AGGIO', 'EGGIO', 'EGGIA', 'IGGIO') ||
        // 'ruggiero' but not 'snuggies'
        (this.stringAt(this.current - 1, 'UGGIE') &&
          !(this.current + 3 === this.last || this.current + 4 === this.last)) ||
        (this.current + 2 === this.last && this.stringAt(this.current - 1, 'AGGI', 'OGGI')) ||
        this.stringAt(this.current - 2, 'SUGGES', 'XAGGER', 'REGGIE')
      ) {
        // expection where "-GG-" → KJ
        if (this.stringAt(this.current - 2, 'SUGGEST')) {
          this.metaphAddExactApprox('G', 'K');
        }

        this.metaphAdd('J');
        this.advanceCounter(3, 2);
      } else {
        this.metaphAddExactApprox('G', 'K');
        this.current += 2;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode "-GK-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGk(): boolean {
    // 'gingko'
    if (this.charAt(this.current + 1) === 'K') {
      this.metaphAdd('K');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-GH-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGh(): boolean {
    if (this.charAt(this.current + 1) === 'H') {
      if (
        this.encodeGhAfterConsonant() ||
        this.encodeInitialGh() ||
        this.encodeGhToJ() ||
        this.encodeGhToH() ||
        this.encodeUght() ||
        this.encodeGhHPartOfOtherWord() ||
        this.encodeSilentGh() ||
        this.encodeGhToF()
      ) {
        return true;
      }

      this.metaphAddExactApprox('G', 'K');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhAfterConsonant(): boolean {
    // e.g. 'burgher', 'bingham'
    if (
      this.current > 0 &&
      !this.isVowel(this.current - 1) &&
      // not e.g. 'greenhalgh'
      !(this.stringAt(this.current - 3, 'HALGH') && this.current + 1 === this.last)
    ) {
      this.metaphAddExactApprox('G', 'K');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialGh(): boolean {
    if (this.current < 3) {
      // e.g. "ghislane", "ghiradelli"
      if (this.current === 0) {
        if (this.charAt(this.current + 2) === 'I') {
          this.metaphAdd('J');
        } else {
          this.metaphAddExactApprox('G', 'K');
        }
        this.current += 2;
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhToJ(): boolean {
    // e.g., 'greenhalgh', 'dunkenhalgh', english names
    if (this.stringAt(this.current - 2, 'ALGH') && this.current + 1 === this.last) {
      this.metaphAdd('J', '');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhToH(): boolean {
    // special cases
    // e.g., 'donoghue', 'donaghy'
    if (
      (this.stringAt(this.current - 4, 'DONO', 'DONA') && this.isVowel(this.current + 2)) ||
      this.stringAt(this.current - 5, 'CALLAGHAN')
    ) {
      this.metaphAdd('H');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeUght(): boolean {
    //e.g. "ought", "aught", "daughter", "slaughter"
    if (this.stringAt(this.current - 1, 'UGHT')) {
      if (
        (this.stringAt(this.current - 3, 'LAUGH') &&
          !(
            this.stringAt(this.current - 4, 'SLAUGHT') || this.stringAt(this.current - 3, 'LAUGHTO')
          )) ||
        this.stringAt(this.current - 4, 'DRAUGH')
      ) {
        this.metaphAdd('FT');
      } else {
        this.metaphAdd('T');
      }
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhHPartOfOtherWord(): boolean {
    // if the 'H' is the beginning of another word or syllable
    if (this.stringAt(this.current + 1, 'HOUS', 'HEAD', 'HOLE', 'HORN', 'HARN')) {
      this.metaphAddExactApprox('G', 'K');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentGh(): boolean {
    //Parker's rule (with some further refinements) - e.g., 'hugh'
    if (
      ((this.current > 1 && this.stringAt(this.current - 2, 'B', 'H', 'D', 'G', 'L')) ||
        //e.g., 'bough'
        (this.current > 2 &&
          this.stringAt(this.current - 3, 'B', 'H', 'D', 'K', 'W', 'N', 'P', 'V') &&
          !this.stringAt(0, 'ENOUGH')) ||
        //e.g., 'broughton'
        (this.current > 3 && this.stringAt(this.current - 4, 'B', 'H')) ||
        //'plough', 'slaugh'
        (this.current > 3 && this.stringAt(this.current - 4, 'PL', 'SL')) ||
        (this.current > 0 &&
          // 'sigh', 'light'
          (this.charAt(this.current - 1) === 'I' ||
            this.stringAt(0, 'PUGH') ||
            // e.g. 'MCDONAGH', 'MURTAGH', 'CREAGH'
            (this.stringAt(this.current - 1, 'AGH') && this.current + 1 === this.last) ||
            this.stringAt(this.current - 4, 'GERAGH', 'DRAUGH') ||
            (this.stringAt(this.current - 3, 'GAUGH', 'GEOGH', 'MAUGH') &&
              !this.stringAt(0, 'MCGAUGHEY')) ||
            // exceptions to 'tough', 'rough', 'lough'
            (this.stringAt(this.current - 2, 'OUGH') &&
              this.current > 3 &&
              !this.stringAt(this.current - 4, 'CCOUGH', 'ENOUGH', 'TROUGH', 'CLOUGH'))))) &&
      // suffixes starting w/ vowel where "-GH-" is usually silent
      (this.stringAt(this.current - 3, 'VAUGH', 'FEIGH', 'LEIGH') ||
        this.stringAt(this.current - 2, 'HIGH', 'TIGH') ||
        this.current + 1 === this.last ||
        (this.stringAt(this.current + 2, 'IE', 'EY', 'ES', 'ER', 'ED', 'TY') &&
          this.current + 3 === this.last &&
          !this.stringAt(this.current - 5, 'GALLAGHER')) ||
        (this.stringAt(this.current + 2, 'Y') && this.current + 2 === this.last) ||
        (this.stringAt(this.current + 2, 'ING', 'OUT') && this.current + 4 === this.last) ||
        (this.stringAt(this.current + 2, 'ERTY') && this.current + 5 === this.last) ||
        !this.isVowel(this.current + 2) ||
        this.stringAt(this.current - 3, 'GAUGH', 'GEOGH', 'MAUGH') ||
        this.stringAt(this.current - 4, 'BROUGHAM')) &&
      // exceptions where '-g-' pronounced
      !(
        this.stringAt(0, 'BALOGH', 'SABAGH') ||
        this.stringAt(this.current - 2, 'BAGHDAD') ||
        this.stringAt(this.current - 3, 'WHIGH') ||
        this.stringAt(this.current - 5, 'SABBAGH', 'AKHLAGH')
      )
    ) {
      // silent - do nothing
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhSpecialCases(): boolean {
    let handled = false;

    // special case: 'hiccough' == 'hiccup'
    if (this.stringAt(this.current - 6, 'HICCOUGH')) {
      this.metaphAdd('P');
      handled = true;
    }
    // special case: 'lough' alt spelling for scots 'loch'
    else if (this.stringAt(0, 'LOUGH')) {
      this.metaphAdd('K');
      handled = true;
    }
    // hungarian
    else if (this.stringAt(0, 'BALOGH')) {
      this.metaphAddExactApprox('G', '', 'K', '');
      handled = true;
    }
    // "maclaughlin"
    else if (this.stringAt(this.current - 3, 'LAUGHLIN', 'COUGHLAN', 'LOUGHLIN')) {
      this.metaphAdd('K', 'F');
      handled = true;
    } else if (
      this.stringAt(this.current - 3, 'GOUGH') ||
      this.stringAt(this.current - 7, 'COLCLOUGH')
    ) {
      this.metaphAdd('', 'F');
      handled = true;
    }

    if (handled) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGhToF(): boolean {
    // the cases covered here would fall under
    // the GH_To_F rule below otherwise
    if (this.encodeGhSpecialCases()) {
      return true;
    }
    //e.g., 'laugh', 'cough', 'rough', 'tough'
    if (
      this.current > 2 &&
      this.charAt(this.current - 1) === 'U' &&
      this.isVowel(this.current - 2) &&
      this.stringAt(this.current - 3, 'C', 'G', 'L', 'R', 'T', 'N', 'S') &&
      !this.stringAt(this.current - 4, 'BREUGHEL', 'FLAUGHER')
    ) {
      this.metaphAdd('F');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode some contexts where "g" is silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentG(): boolean {
    // e.g. "phlegm", "apothegm", "voigt"
    if (
      (this.current + 1 === this.last &&
        (this.stringAt(this.current - 1, 'EGM', 'IGM', 'AGM') ||
          this.stringAt(this.current, 'GT'))) ||
      (this.stringAt(0, 'HUGES') && this.length === 5)
    ) {
      this.current++;
      return true;
    }

    // vietnamese names e.g. "Nguyen" but not "Ng"
    if (this.stringAt(0, 'NG') && this.current !== this.last) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * ENcode "-GN-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGn(): boolean {
    if (this.charAt(this.current + 1) === 'N') {
      // 'align' 'sign', 'resign' but not 'resignation'
      // also 'impugn', 'impugnable', but not 'repugnant'
      if (
        (this.current > 1 &&
          (this.stringAt(this.current - 1, 'I', 'U', 'E') ||
            this.stringAt(this.current - 3, 'LORGNETTE') ||
            this.stringAt(this.current - 2, 'LAGNIAPPE') ||
            this.stringAt(this.current - 2, 'COGNAC') ||
            this.stringAt(this.current - 3, 'CHAGNON') ||
            this.stringAt(this.current - 5, 'COMPAGNIE') ||
            this.stringAt(this.current - 4, 'BOLOGN')) &&
          // Exceptions: following are cases where 'G' is pronounced
          // in "assign" 'g' is silent, but not in "assignation"
          !(
            this.stringAt(this.current + 2, 'ATION') ||
            this.stringAt(this.current + 2, 'ATOR') ||
            this.stringAt(this.current + 2, 'ATE', 'ITY') ||
            // exception to exceptions, not pronounced:
            (this.stringAt(this.current + 2, 'AN', 'AC', 'IA', 'UM') &&
              !(
                this.stringAt(this.current - 3, 'POIGNANT') ||
                this.stringAt(this.current - 2, 'COGNAC')
              )) ||
            this.stringAt(0, 'SPIGNER', 'STEGNER') ||
            (this.stringAt(0, 'SIGNE') && this.length === 5) ||
            this.stringAt(
              this.current - 2,
              'LIGNI',
              'LIGNO',
              'REGNA',
              'DIGNI',
              'WEGNE',
              'TIGNE',
              'RIGNE',
              'REGNE',
              'TIGNO',
            ) ||
            this.stringAt(this.current - 2, 'SIGNAL', 'SIGNIF', 'SIGNAT') ||
            this.stringAt(this.current - 1, 'IGNIT')
          ) &&
          !this.stringAt(this.current - 2, 'SIGNET', 'LIGNEO')) ||
        //not e.g. 'cagney', 'magna'
        (this.current + 2 === this.last &&
          this.stringAt(this.current, 'GNE', 'GNA') &&
          !this.stringAt(this.current - 2, 'SIGNA', 'MAGNA', 'SIGNE'))
      ) {
        this.metaphAddExactApprox('N', 'GN', 'N', 'KN');
      } else {
        this.metaphAddExactApprox('GN', 'KN');
      }
      this.current += 2;
      return true;
    }
    return false;
  }

  /**
   * Encode "-GL-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGl(): boolean {
    //'tagliaro', 'puglia' BUT add K in alternative
    // since americans sometimes do this
    if (this.stringAt(this.current + 1, 'LIA', 'LIO', 'LIE') && this.isVowel(this.current - 1)) {
      this.metaphAddExactApprox('L', 'GL', 'L', 'KL');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private initialGSoft(): boolean {
    if (
      ((this.stringAt(
        this.current + 1,
        'EL',
        'EM',
        'EN',
        'EO',
        'ER',
        'ES',
        'IA',
        'IN',
        'IO',
        'IP',
        'IU',
        'YM',
        'YN',
        'YP',
        'YR',
        'EE',
      ) ||
        this.stringAt(this.current + 1, 'IRA', 'IRO')) &&
        // except for smaller set of cases where → K, e.g. "gerber"
        !(
          this.stringAt(
            this.current + 1,
            'ELD',
            'ELT',
            'ERT',
            'INZ',
            'ERH',
            'ITE',
            'ERD',
            'ERL',
            'ERN',
            'INT',
            'EES',
            'EEK',
            'ELB',
            'EER',
          ) ||
          this.stringAt(this.current + 1, 'ERSH', 'ERST', 'INSB', 'INGR', 'EROW', 'ERKE', 'EREN') ||
          this.stringAt(
            this.current + 1,
            'ELLER',
            'ERDIE',
            'ERBER',
            'ESUND',
            'ESNER',
            'INGKO',
            'INKGO',
            'IPPER',
            'ESELL',
            'IPSON',
            'EEZER',
            'ERSON',
            'ELMAN',
          ) ||
          this.stringAt(
            this.current + 1,
            'ESTALT',
            'ESTAPO',
            'INGHAM',
            'ERRITY',
            'ERRISH',
            'ESSNER',
            'ENGLER',
          ) ||
          this.stringAt(this.current + 1, 'YNAECOL', 'YNECOLO', 'ENTHNER', 'ERAGHTY') ||
          this.stringAt(this.current + 1, 'INGERICH', 'EOGHEGAN')
        )) ||
      (this.isVowel(this.current + 1) &&
        (this.stringAt(this.current + 1, 'EE ', 'EEW') ||
          (this.stringAt(this.current + 1, 'IGI', 'IRA', 'IBE', 'AOL', 'IDE', 'IGL') &&
            !this.stringAt(this.current + 1, 'IDEON')) ||
          this.stringAt(this.current + 1, 'ILES', 'INGI', 'ISEL') ||
          (this.stringAt(this.current + 1, 'INGER') &&
            !this.stringAt(this.current + 1, 'INGERICH')) ||
          this.stringAt(
            this.current + 1,
            'IBBER',
            'IBBET',
            'IBLET',
            'IBRAN',
            'IGOLO',
            'IRARD',
            'IGANT',
          ) ||
          this.stringAt(this.current + 1, 'IRAFFE', 'EEWHIZ') ||
          this.stringAt(this.current + 1, 'ILLETTE', 'IBRALTA')))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Encode cases where 'G' is at start of word followed
   * by a "front" vowel e.g. 'E', 'I', 'Y'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialGFrontVowel(): boolean {
    // 'g' followed by vowel at beginning
    if (this.current === 0 && this.frontVowel(this.current + 1)) {
      // special case "gila" as in "gila monster"
      if (this.stringAt(this.current + 1, 'ILA') && this.length === 4) {
        this.metaphAdd('H');
      } else if (this.initialGSoft()) {
        this.metaphAddExactApprox('J', 'G', 'J', 'K');
      } else if (
        // only code alternate 'J' if front vowel
        this.inWord.charAt(this.current + 1) === 'E' ||
        this.inWord.charAt(this.current + 1) === 'I'
      ) {
        this.metaphAddExactApprox('G', 'J', 'K', 'J');
      } else {
        this.metaphAddExactApprox('G', 'K');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-NGER-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeNger(): boolean {
    if (this.current > 1 && this.stringAt(this.current - 1, 'NGER')) {
      // default 'G' → J  such as 'ranger', 'stranger', 'manger', 'messenger', 'orangery', 'granger'
      // 'boulanger', 'challenger', 'danger', 'changer', 'harbinger', 'lounger', 'ginger', 'passenger'
      // except for these the following
      if (
        this.rootOrInflections(this.inWord, 'ANGER') ||
        this.rootOrInflections(this.inWord, 'LINGER') ||
        this.rootOrInflections(this.inWord, 'MALINGER') ||
        this.rootOrInflections(this.inWord, 'FINGER') ||
        (this.stringAt(
          this.current - 3,
          'HUNG',
          'FING',
          'BUNG',
          'WING',
          'RING',
          'DING',
          'ZENG',
          'ZING',
          'JUNG',
          'LONG',
          'PING',
          'CONG',
          'MONG',
          'BANG',
          'GANG',
          'HANG',
          'LANG',
          'SANG',
          'SING',
          'WANG',
          'ZANG',
        ) &&
          // exceptions to above where 'G' → J
          !(
            this.stringAt(this.current - 6, 'BOULANG', 'SLESING', 'KISSING', 'DERRING') ||
            this.stringAt(this.current - 8, 'SCHLESING') ||
            this.stringAt(this.current - 5, 'SALING', 'BELANG') ||
            this.stringAt(this.current - 6, 'BARRING') ||
            this.stringAt(this.current - 6, 'PHALANGER') ||
            this.stringAt(this.current - 4, 'CHANG')
          )) ||
        this.stringAt(this.current - 4, 'STING', 'YOUNG') ||
        this.stringAt(this.current - 5, 'STRONG') ||
        this.stringAt(0, 'UNG', 'ENG', 'ING') ||
        this.stringAt(this.current, 'GERICH') ||
        this.stringAt(0, 'SENGER') ||
        this.stringAt(this.current - 3, 'WENGER', 'MUNGER', 'SONGER', 'KINGER') ||
        this.stringAt(
          this.current - 4,
          'FLINGER',
          'SLINGER',
          'STANGER',
          'STENGER',
          'KLINGER',
          'CLINGER',
        ) ||
        this.stringAt(this.current - 5, 'SPRINGER', 'SPRENGER') ||
        this.stringAt(this.current - 3, 'LINGERF') ||
        this.stringAt(this.current - 2, 'ANGERLY', 'ANGERBO', 'INGERSO')
      ) {
        this.metaphAddExactApprox('G', 'J', 'K', 'J');
      } else {
        this.metaphAddExactApprox('J', 'G', 'J', 'K');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-GER-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGer(): boolean {
    if (this.current > 0 && this.stringAt(this.current + 1, 'ER')) {
      // Exceptions to 'GE' where 'G' → K
      // e.g. "JAGER", "TIGER", "LIGER", "LAGER", "LUGER", "AUGER", "EAGER", "HAGER", "SAGER"
      if (
        ((this.current === 2 &&
          this.isVowel(this.current - 1) &&
          !this.isVowel(this.current - 2) &&
          !this.stringAt(this.current - 2, 'PAGER', 'WAGER', 'NIGER', 'ROGER', 'LEGER', 'CAGER')) ||
          this.stringAt(this.current - 2, 'AUGER', 'EAGER', 'INGER', 'YAGER') ||
          this.stringAt(
            this.current - 3,
            'SEEGER',
            'JAEGER',
            'GEIGER',
            'KRUGER',
            'SAUGER',
            'BURGER',
            'MEAGER',
            'MARGER',
            'RIEGER',
            'YAEGER',
            'STEGER',
            'PRAGER',
            'SWIGER',
            'YERGER',
            'TORGER',
            'FERGER',
            'HILGER',
            'ZEIGER',
            'YARGER',
            'COWGER',
            'CREGER',
            'KROGER',
            'KREGER',
            'GRAGER',
            'STIGER',
            'BERGER',
          ) ||
          // 'berger' but not 'bergerac'
          (this.stringAt(this.current - 3, 'BERGER') && this.current + 2 === this.last) ||
          this.stringAt(
            this.current - 4,
            'KREIGER',
            'KRUEGER',
            'METZGER',
            'KRIEGER',
            'KROEGER',
            'STEIGER',
            'DRAEGER',
            'BUERGER',
            'BOERGER',
            'FIBIGER',
          ) ||
          // e.g. 'harshbarger', 'winebarger'
          (this.stringAt(this.current - 3, 'BARGER') && this.current > 4) ||
          // e.g. 'weisgerber'
          (this.stringAt(this.current, 'GERBER') && this.current > 0) ||
          this.stringAt(
            this.current - 5,
            'SCHWAGER',
            'LYBARGER',
            'SPRENGER',
            'GALLAGER',
            'WILLIGER',
          ) ||
          // TODO [>2.1]: HARGER has six letters
          // this.stringAt(0,  'HARGER') ||
          (this.stringAt(0, 'AGER', 'EGER') && this.length === 4) ||
          this.stringAt(this.current - 1, 'YGERNE') ||
          this.stringAt(this.current - 6, 'SCHWEIGER')) &&
        !(
          this.stringAt(this.current - 5, 'BELLIGEREN') ||
          this.stringAt(0, 'MARGERY') ||
          this.stringAt(this.current - 3, 'BERGERAC')
        )
      ) {
        if (this.slavoGermanic()) {
          this.metaphAddExactApprox('G', 'K');
        } else {
          this.metaphAddExactApprox('G', 'J', 'K', 'J');
        }
      } else {
        this.metaphAddExactApprox('J', 'G', 'J', 'K');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * ENcode "-GEL-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGel(): boolean {
    // more likely to be "-GEL-" → JL
    if (this.stringAt(this.current + 1, 'EL') && this.current > 0) {
      // except for
      // "BAGEL", "HEGEL", "HUGEL", "KUGEL", "NAGEL", "VOGEL", "FOGEL", "PAGEL"
      if (
        (this.length === 5 &&
          this.isVowel(this.current - 1) &&
          !this.isVowel(this.current - 2) &&
          !this.stringAt(this.current - 2, 'NIGEL', 'RIGEL')) ||
        // or the following as combining forms
        this.stringAt(this.current - 2, 'ENGEL', 'HEGEL', 'NAGEL', 'VOGEL') ||
        this.stringAt(
          this.current - 3,
          'MANGEL',
          'WEIGEL',
          'FLUGEL',
          'RANGEL',
          'HAUGEN',
          'RIEGEL',
          'VOEGEL',
        ) ||
        this.stringAt(this.current - 4, 'SPEIGEL', 'STEIGEL', 'WRANGEL', 'SPIEGEL') ||
        this.stringAt(this.current - 4, 'DANEGELD')
      ) {
        if (this.slavoGermanic()) {
          this.metaphAddExactApprox('G', 'K');
        } else {
          this.metaphAddExactApprox('G', 'J', 'K', 'J');
        }
      } else {
        this.metaphAddExactApprox('J', 'G', 'J', 'K');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-G-" followed by a vowel when non-initial leter.
   * Default for this is a 'J' sound, so check exceptions where
   * it is pronounced 'G'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeNonInitialGFrontVowel(): boolean {
    // -gy-, gi-, ge-
    if (this.stringAt(this.current + 1, 'E', 'I', 'Y')) {
      // '-ge' at end
      // almost always 'j 'sound
      if (this.stringAt(this.current, 'GE') && this.current === this.last - 1) {
        if (this.hardGeAtEnd()) {
          if (this.slavoGermanic()) {
            this.metaphAddExactApprox('G', 'K');
          } else {
            this.metaphAddExactApprox('G', 'J', 'K', 'J');
          }
        } else {
          this.metaphAdd('J');
        }
      } else if (this.internalHardG()) {
        // don't encode KG or KK if e.g. "mcgill"
        if (
          (this.current === 2 && this.stringAt(0, 'MC')) ||
          (this.current === 3 && this.stringAt(0, 'MAC'))
        ) {
          if (this.slavoGermanic()) {
            this.metaphAddExactApprox('G', 'K');
          } else {
            this.metaphAddExactApprox('G', 'J', 'K', 'J');
          }
        }
      } else {
        this.metaphAddExactApprox('J', 'G', 'J', 'K');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /*
   * Detect german names and other words that have
   * a 'hard' 'g' in the context of "-ge" at end
   *
   * @returns true if encoding handled in this routine, false if not
   */
  private hardGeAtEnd(): boolean {
    if (
      this.stringAt(0, 'RENEGE', 'STONGE', 'STANGE', 'PRANGE', 'KRESGE') ||
      this.stringAt(0, 'BYRGE', 'BIRGE', 'BERGE', 'HAUGE') ||
      this.stringAt(0, 'HAGE') ||
      this.stringAt(0, 'LANGE', 'SYNGE', 'BENGE', 'RUNGE', 'HELGE') ||
      this.stringAt(0, 'INGE', 'LAGE')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Exceptions to default encoding to 'J':
   * encode "-G-" to 'G' in "-g<frontvowel>-" words
   * where we are not at "-GE" at the end of the word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private internalHardG(): boolean {
    // if not "-GE" at end
    if (
      !(this.current + 1 === this.last && this.charAt(this.current + 1) === 'E') &&
      (this.internalHardNg() ||
        this.internalHardGenGinGetGit() ||
        this.internalHardGOpenSyllable() ||
        this.internalHardGOther())
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect words where "-ge-" or "-gi-" get a 'hard' 'g'
   * even though this is usually a 'soft' 'g' context
   *
   * @returns true if 'hard' 'g' detected
   *
   */
  private internalHardGOther(): boolean {
    if (
      (this.stringAt(
        this.current,
        'GETH',
        'GEAR',
        'GEIS',
        'GIRL',
        'GIVI',
        'GIVE',
        'GIFT',
        'GIRD',
        'GIRT',
        'GILV',
        'GILD',
        'GELD',
      ) &&
        !this.stringAt(this.current - 3, 'GINGIV')) ||
      // "gish" but not "largish"
      (this.stringAt(this.current + 1, 'ISH') && this.current > 0 && !this.stringAt(0, 'LARG')) ||
      (this.stringAt(this.current - 2, 'MAGED', 'MEGID') && !(this.current + 2 === this.last)) ||
      this.stringAt(this.current, 'GEZ') ||
      this.stringAt(0, 'WEGE', 'HAGE') ||
      (this.stringAt(this.current - 2, 'ONGEST', 'UNGEST') &&
        this.current + 3 === this.last &&
        !this.stringAt(this.current - 3, 'CONGEST')) ||
      this.stringAt(0, 'VOEGE', 'BERGE', 'HELGE') ||
      (this.stringAt(0, 'ENGE', 'BOGY') && this.length === 4) ||
      this.stringAt(this.current, 'GIBBON') ||
      this.stringAt(0, 'CORREGIDOR') ||
      this.stringAt(0, 'INGEBORG') ||
      (this.stringAt(this.current, 'GILL') &&
        (this.current + 3 === this.last || this.current + 4 === this.last) &&
        !this.stringAt(0, 'STURGILL'))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect words where "-gy-", "-gie-", "-gee-",
   * or "-gio-" get a 'hard' 'g' even though this is
   * usually a 'soft' 'g' context
   *
   * @returns true if 'hard' 'g' detected
   *
   */
  private internalHardGOpenSyllable(): boolean {
    if (
      this.stringAt(this.current + 1, 'EYE') ||
      this.stringAt(this.current - 2, 'FOGY', 'POGY', 'YOGI') ||
      this.stringAt(this.current - 2, 'MAGEE', 'MCGEE', 'HAGIO') ||
      this.stringAt(this.current - 1, 'RGEY', 'OGEY') ||
      this.stringAt(this.current - 3, 'HOAGY', 'STOGY', 'PORGY') ||
      this.stringAt(this.current - 5, 'CARNEGIE') ||
      (this.stringAt(this.current - 1, 'OGEY', 'OGIE') && this.current + 2 === this.last)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Detect a number of contexts, mostly german names, that
   * take a 'hard' 'g'.
   *
   * @returns true if 'hard' 'g' detected, false if not
   *
   */
  private internalHardGenGinGetGit(): boolean {
    if (
      (this.stringAt(
        this.current - 3,
        'FORGET',
        'TARGET',
        'MARGIT',
        'MARGET',
        'TURGEN',
        'BERGEN',
        'MORGEN',
        'JORGEN',
        'HAUGEN',
        'JERGEN',
        'JURGEN',
        'LINGEN',
        'BORGEN',
        'LANGEN',
        'KLAGEN',
        'STIGER',
        'BERGER',
      ) &&
        !this.stringAt(this.current, 'GENETIC', 'GENESIS') &&
        !this.stringAt(this.current - 4, 'PLANGENT')) ||
      (this.stringAt(this.current - 3, 'BERGIN', 'FEAGIN', 'DURGIN') &&
        this.current + 2 === this.last) ||
      (this.stringAt(this.current - 2, 'ENGEN') &&
        !this.stringAt(this.current + 3, 'DER', 'ETI', 'ESI')) ||
      this.stringAt(this.current - 4, 'JUERGEN') ||
      this.stringAt(0, 'NAGIN', 'MAGIN', 'HAGIN') ||
      (this.stringAt(0, 'ENGIN', 'DEGEN', 'LAGEN', 'MAGEN', 'NAGIN') && this.length === 5) ||
      (this.stringAt(
        this.current - 2,
        'BEGET',
        'BEGIN',
        'HAGEN',
        'FAGIN',
        'BOGEN',
        'WIGIN',
        'NTGEN',
        'EIGEN',
        'WEGEN',
        'WAGEN',
      ) &&
        !this.stringAt(this.current - 5, 'OSPHAGEN'))
    ) {
      return true;
    }

    return false;
  }
  /**
   * Detect a number of contexts of '-ng-' that will
   * take a 'hard' 'g' despite being followed by a
   * front vowel.
   *
   * @returns true if 'hard' 'g' detected, false if not
   *
   */
  private internalHardNg(): boolean {
    if (
      (this.stringAt(this.current - 3, 'DANG', 'FANG', 'SING') &&
        // exception to exception
        !this.stringAt(this.current - 5, 'DISINGEN')) ||
      this.stringAt(0, 'INGEB', 'ENGEB') ||
      (this.stringAt(this.current - 3, 'RING', 'WING', 'HANG', 'LONG') &&
        !(
          this.stringAt(this.current - 4, 'CRING', 'FRING', 'ORANG', 'TWING', 'CHANG', 'PHANG') ||
          this.stringAt(this.current - 5, 'SYRING') ||
          this.stringAt(this.current - 3, 'RINGENC', 'RINGENT', 'LONGITU', 'LONGEVI') ||
          // e.g. 'longino', 'mastrangelo'
          (this.stringAt(this.current, 'GELO', 'GINO') && this.current + 3 === this.last)
        )) ||
      (this.stringAt(this.current - 1, 'NGY') &&
        // exceptions to exception
        !(
          this.stringAt(this.current - 3, 'RANGY', 'MANGY', 'MINGY') ||
          this.stringAt(this.current - 4, 'SPONGY', 'STINGY')
        ))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Encode special case where "-GA-" → J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGaToJ(): boolean {
    // 'margary', 'margarine'
    if (
      (this.stringAt(this.current - 3, 'MARGARY', 'MARGARI') &&
        // but not in spanish forms such as "margatita"
        !this.stringAt(this.current - 3, 'MARGARIT')) ||
      this.stringAt(0, 'GAOL') ||
      this.stringAt(this.current - 2, 'ALGAE')
    ) {
      this.metaphAddExactApprox('J', 'G', 'J', 'K');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode 'H'
   *
   *
   */
  private encodeH(): void {
    if (
      this.encodeInitialSilentH() ||
      this.encodeInitialHs() ||
      this.encodeInitialHuHw() ||
      this.encodeNonInitialSilentH()
    ) {
      return;
    }

    //only keep if first & before vowel or btw. 2 vowels
    if (!this.encodeHPronounced()) {
      //also takes care of 'HH'
      this.current++;
    }
  }

  /**
   * Encode cases where initial 'H' is not pronounced (in American)
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialSilentH(): boolean {
    //'hour', 'herb', 'heir', 'honor'
    if (
      this.stringAt(this.current + 1, 'OUR', 'ERB', 'EIR') ||
      this.stringAt(this.current + 1, 'ONOR') ||
      this.stringAt(this.current + 1, 'ONOUR', 'ONEST')
    ) {
      // british pronounce H in this word
      // americans give it 'H' for the name,
      // no 'H' for the plant
      if (this.current === 0 && this.stringAt(this.current, 'HERB')) {
        if (this.encodeVowels) {
          this.metaphAdd('HA', 'A');
        } else {
          this.metaphAdd('H', 'A');
        }
      } else if (this.current === 0 || this.encodeVowels) {
        this.metaphAdd('A');
      }

      this.current++;
      // don't encode vowels twice
      this.current = this.skipVowels(this.current);
      return true;
    }

    return false;
  }

  /**
   * Encode "HS-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialHs(): boolean {
    // old chinese pinyin transliteration
    // e.g., 'HSIAO'
    if (this.current === 0 && this.stringAt(0, 'HS')) {
      this.metaphAdd('X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "HU-" is pronounced as part of a vowel dipthong
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialHuHw(): boolean {
    // spanish spellings and chinese pinyin transliteration
    if (this.stringAt(0, 'HUA', 'HUE', 'HWA')) {
      if (!this.stringAt(this.current, 'HUEY')) {
        this.metaphAdd('A');

        if (this.encodeVowels) {
          this.current++;
          // don't encode vowels twice
          while (this.isVowel(this.current) || this.charAt(this.current) === 'W') {
            this.current++;
          }
        } else {
          this.current += 3;
        }
        return true;
      }
    }

    return false;
  }

  /**
   * Encode cases where 'H' is silent between vowels
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeNonInitialSilentH(): boolean {
    //exceptions - 'h' not pronounced
    // "PROHIB" BUT NOT "PROHIBIT"
    if (
      this.stringAt(
        this.current - 2,
        'NIHIL',
        'VEHEM',
        'LOHEN',
        'NEHEM',
        'MAHON',
        'MAHAN',
        'COHEN',
        'GAHAN',
      ) ||
      this.stringAt(this.current - 3, 'GRAHAM', 'PROHIB', 'FRAHER', 'TOOHEY', 'TOUHEY') ||
      this.stringAt(this.current - 3, 'TOUHY') ||
      this.stringAt(0, 'CHIHUAHUA')
    ) {
      if (this.encodeVowels) {
        this.current++;
        // don't encode vowels twice
        this.current = this.skipVowels(this.current);
      } else {
        this.current += 2;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode cases where 'H' is pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeHPronounced(): boolean {
    if (
      ((this.current === 0 ||
        this.isVowel(this.current - 1) ||
        (this.current > 0 && this.charAt(this.current - 1) === 'W')) &&
        this.isVowel(this.current + 1)) ||
      // e.g. 'alWahhab'
      (this.charAt(this.current + 1) === 'H' && this.isVowel(this.current + 2))
    ) {
      this.metaphAdd('H');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode 'J'
   *
   */
  private encodeJ(): void {
    if (this.encodeSpanishJ() || this.encodeSpanishOjUj()) {
      return;
    }

    this.encodeOtherJ();
  }

  /**
   * Encode cases where initial or medial "j" is in a spanish word or name
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSpanishJ(): boolean {
    //obvious spanish, e.g. "jose", "san jacinto"
    if (
      (this.stringAt(this.current + 1, 'UAN', 'ACI', 'ALI', 'EFE', 'ICA', 'IME', 'OAQ', 'UAR') &&
        !this.stringAt(this.current, 'JIMERSON', 'JIMERSEN')) ||
      (this.stringAt(this.current + 1, 'OSE') && this.current + 3 === this.last) ||
      this.stringAt(this.current + 1, 'EREZ', 'UNTA', 'AIME', 'AVIE', 'AVIA') ||
      this.stringAt(this.current + 1, 'IMINEZ', 'ARAMIL') ||
      (this.current + 2 === this.last && this.stringAt(this.current - 2, 'MEJIA')) ||
      this.stringAt(
        this.current - 2,
        'TEJED',
        'TEJAD',
        'LUJAN',
        'FAJAR',
        'BEJAR',
        'BOJOR',
        'CAJIG',
        'DEJAS',
        'DUJAR',
        'DUJAN',
        'MIJAR',
        'MEJOR',
        'NAJAR',
        'NOJOS',
        'RAJED',
        'RIJAL',
        'REJON',
        'TEJAN',
        'UIJAN',
      ) ||
      this.stringAt(this.current - 3, 'ALEJANDR', 'GUAJARDO', 'TRUJILLO') ||
      (this.stringAt(this.current - 2, 'RAJAS') && this.current > 2) ||
      (this.stringAt(this.current - 2, 'MEJIA') && !this.stringAt(this.current - 2, 'MEJIAN')) ||
      this.stringAt(this.current - 1, 'OJEDA') ||
      this.stringAt(this.current - 3, 'LEIJA', 'MINJA') ||
      this.stringAt(this.current - 3, 'VIAJES', 'GRAJAL') ||
      this.stringAt(this.current, 'JAUREGUI') ||
      this.stringAt(this.current - 4, 'HINOJOSA') ||
      this.stringAt(0, 'SAN ') ||
      (this.current + 1 === this.last &&
        this.charAt(this.current + 1) === 'O' &&
        // exceptions
        !(this.stringAt(0, 'TOJO') || this.stringAt(0, 'BANJO') || this.stringAt(0, 'MARYJO')))
    ) {
      // americans pronounce "juan" as 'wan'
      // and "marijuana" and "tijuana" also
      // do not get the 'H' as in spanish, so
      // just treat it like a vowel in these cases
      if (this.stringAt(this.current, 'JUAN') || this.stringAt(this.current, 'JOAQ')) {
        if (this.current === 0) {
          this.metaphAdd('A');
        }
      } else {
        this.metaphAdd('H');
      }
      this.advanceCounter(2, 1);
      return true;
    }

    // Jorge gets 2nd HARHA. also JULIO, JESUS
    if (this.stringAt(this.current + 1, 'ORGE', 'ULIO', 'ESUS') && !this.stringAt(0, 'JORGEN')) {
      // get both consonants for "jorge"
      if (this.current + 4 === this.last && this.stringAt(this.current + 1, 'ORGE')) {
        if (this.encodeVowels) {
          this.metaphAdd('JARJ', 'HARHA');
        } else {
          this.metaphAdd('JRJ', 'HRH');
        }
        this.advanceCounter(5, 5);
        return true;
      }

      this.metaphAdd('J', 'H');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode cases where 'J' is clearly in a german word or name
   * that americans pronounce in the german fashion
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGermanJ(): boolean {
    if (
      this.stringAt(this.current + 1, 'AH') ||
      (this.stringAt(this.current + 1, 'OHANN') && this.current + 5 === this.last) ||
      (this.stringAt(this.current + 1, 'UNG') && !this.stringAt(this.current + 1, 'UNGL')) ||
      this.stringAt(this.current + 1, 'UGO')
    ) {
      this.metaphAdd('A');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-JOJ-" and "-JUJ-" as spanish words
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSpanishOjUj(): boolean {
    if (this.stringAt(this.current + 1, 'OJOBA', 'UJUY ')) {
      if (this.encodeVowels) {
        this.metaphAdd('HAH');
      } else {
        this.metaphAdd('HH');
      }

      this.advanceCounter(4, 3);
      return true;
    }

    return false;
  }

  /**
   * Encode 'J' → J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeJToJ(): boolean {
    if (this.isVowel(this.current + 1)) {
      if (this.current === 0 && this.namesBeginningWithJThatGetAltY()) {
        // 'Y' is a vowel so encode
        // is as 'A'
        if (this.encodeVowels) {
          this.metaphAdd('JA', 'A');
        } else {
          this.metaphAdd('J', 'A');
        }
      } else if (this.encodeVowels) {
        this.metaphAdd('JA');
      } else {
        this.metaphAdd('J');
      }

      this.current++;
      this.current = this.skipVowels(this.current);
      return false;
    }
    this.metaphAdd('J');
    this.current++;
    return true;

    //		return false;
  }

  /**
   * Encode 'J' toward end in spanish words
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSpanishJ2(): boolean {
    // spanish forms e.g. "brujo", "badajoz"
    if (
      (this.current - 2 === 0 &&
        this.stringAt(this.current - 2, 'BOJA', 'BAJA', 'BEJA', 'BOJO', 'MOJA', 'MOJI', 'MEJI')) ||
      (this.current - 3 === 0 &&
        this.stringAt(
          this.current - 3,
          'FRIJO',
          'BRUJO',
          'BRUJA',
          'GRAJE',
          'GRIJA',
          'LEIJA',
          'QUIJA',
        )) ||
      (this.current + 3 === this.last && this.stringAt(this.current - 1, 'AJARA')) ||
      (this.current + 2 === this.last &&
        this.stringAt(
          this.current - 1,
          'AJOS',
          'EJOS',
          'OJAS',
          'OJOS',
          'UJON',
          'AJOZ',
          'AJAL',
          'UJAR',
          'EJON',
          'EJAN',
        )) ||
      (this.current + 1 === this.last &&
        this.stringAt(this.current - 1, 'OJA', 'EJA') &&
        !this.stringAt(0, 'DEJA'))
    ) {
      this.metaphAdd('H');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode 'J' as vowel in some exception cases
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeJAsVowel(): boolean {
    if (this.stringAt(this.current, 'JEWSK')) {
      this.metaphAdd('J', '');
      return true;
    }

    // e.g. "stijl", "sejm" - dutch, scandanavian, and eastern european spellings
    if (
      (this.stringAt(this.current + 1, 'L', 'T', 'K', 'S', 'N', 'M') &&
        // except words from hindi and arabic
        !this.stringAt(this.current + 2, 'A')) ||
      this.stringAt(0, 'HALLELUJA', 'LJUBLJANA') ||
      this.stringAt(0, 'LJUB', 'BJOR') ||
      this.stringAt(0, 'HAJEK') ||
      this.stringAt(0, 'WOJ') ||
      // e.g. 'fjord'
      this.stringAt(0, 'FJ') ||
      // e.g. 'rekjavik', 'blagojevic'
      this.stringAt(this.current, 'JAVIK', 'JEVIC') ||
      (this.current + 1 === this.last && this.stringAt(0, 'SONJA', 'TANJA', 'TONJA'))
    ) {
      return true;
    }
    return false;
  }

  /**
   * Call routines to encode 'J', in proper order
   *
   */
  private encodeOtherJ(): void {
    if (this.current === 0) {
      if (this.encodeGermanJ()) {
        // handled by encodeGermanJ
      } else if (this.encodeJToJ()) {
        // handled by encodeJToJ
      }
    } else {
      if (this.encodeSpanishJ2()) {
        return;
      }
      if (!this.encodeJAsVowel()) {
        this.metaphAdd('J');
      }

      //it could happen! e.g. "hajj"
      // eat redundant 'J'
      if (this.charAt(this.current + 1) === 'J') {
        this.current += 2;
      } else {
        this.current++;
      }
    }
  }

  /**
   * Encode 'K'
   *
   *
   */
  private encodeK(): void {
    if (!this.encodeSilentK()) {
      this.metaphAdd('K');

      // eat redundant 'K's and 'Q's
      if (this.charAt(this.current + 1) === 'K' || this.charAt(this.current + 1) === 'Q') {
        this.current += 2;
      } else {
        this.current++;
      }
    }
  }

  /**
   * Encode cases where 'K' is not pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentK(): boolean {
    //skip this except for special cases
    if (this.current === 0 && this.stringAt(this.current, 'KN')) {
      if (
        !(
          this.stringAt(this.current + 2, 'ESSET', 'IEVEL') ||
          this.stringAt(this.current + 2, 'ISH')
        )
      ) {
        this.current += 1;
        return true;
      }
    }

    // e.g. "know", "knit", "knob"
    if (
      (this.stringAt(this.current + 1, 'NOW', 'NIT', 'NOT', 'NOB') &&
        // exception, "slipknot" → SLPNT but "banknote" → PNKNT
        !this.stringAt(0, 'BANKNOTE')) ||
      this.stringAt(this.current + 1, 'NOCK', 'NUCK', 'NIFE', 'NACK') ||
      this.stringAt(this.current + 1, 'NIGHT')
    ) {
      // N already encoded before
      // e.g. "penknife"
      if (this.current > 0 && this.charAt(this.current - 1) === 'N') {
        this.current += 2;
      } else {
        this.current++;
      }

      return true;
    }

    return false;
  }

  /**
   * Encode 'L'
   *
   * Includes special vowel transposition
   * encoding, where 'LE' → AL
   *
   */
  private encodeL(): void {
    // logic below needs to know this
    // after 'm_current' variable changed
    const saveCurrent: number = this.current;

    this.interpolateVowelWhenConsLAtEnd();

    if (
      this.encodeLelyToL() ||
      this.encodeColonel() ||
      this.encodeFrenchAult() ||
      this.encodeFrenchEuil() ||
      this.encodeFrenchOulx() ||
      this.encodeSilentLInLm() ||
      this.encodeSilentLInLkLv() ||
      this.encodeSilentLInOuld()
    ) {
      return;
    }

    if (this.encodeLlAsVowelCases()) {
      return;
    }

    this.encodeLeCases(saveCurrent);
  }

  /**
   * Cases where an L follows D, G, or T at the
   * end have a schwa pronounced before the L
   *
   */
  private interpolateVowelWhenConsLAtEnd(): void {
    if (this.encodeVowels) {
      // e.g. "ertl", "vogl"
      if (this.current === this.last && this.stringAt(this.current - 1, 'D', 'G', 'T')) {
        this.metaphAdd('A');
      }
    }
  }

  /**
   * Catch cases where 'L' spelled twice but pronounced
   * once, e.g., 'DOCILELY' → TSL
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeLelyToL(): boolean {
    // e.g. "agilely", "docilely"
    if (this.stringAt(this.current - 1, 'ILELY') && this.current + 3 === this.last) {
      this.metaphAdd('L');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode special case "colonel" → KRNL. Can somebody tell
   * me how this pronounciation came to be?
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeColonel(): boolean {
    if (this.stringAt(this.current - 2, 'COLONEL')) {
      this.metaphAdd('R');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-AULT-", found in a french names
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeFrenchAult(): boolean {
    // e.g. "renault" and "foucault", well known to americans, but not "fault"
    if (
      this.current > 3 &&
      (this.stringAt(this.current - 3, 'RAULT', 'NAULT', 'BAULT', 'SAULT', 'GAULT', 'CAULT') ||
        this.stringAt(this.current - 4, 'REAULT', 'RIAULT', 'NEAULT', 'BEAULT')) &&
      !(
        this.rootOrInflections(this.inWord, 'ASSAULT') ||
        this.stringAt(this.current - 8, 'SOMERSAULT') ||
        this.stringAt(this.current - 9, 'SUMMERSAULT')
      )
    ) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-EUIL-", always found in a french word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeFrenchEuil(): boolean {
    // e.g. "auteuil"
    if (this.stringAt(this.current - 3, 'EUIL') && this.current === this.last) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-OULX", always found in a french word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeFrenchOulx(): boolean {
    // e.g. "proulx"
    if (this.stringAt(this.current - 2, 'OULX') && this.current + 1 === this.last) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encodes contexts where 'L' is not pronounced in "-LM-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentLInLm(): boolean {
    if (this.stringAt(this.current, 'LM', 'LN')) {
      // e.g. "lincoln", "holmes", "psalm", "salmon"
      if (
        (this.stringAt(this.current - 2, 'COLN', 'CALM', 'BALM', 'MALM', 'PALM') ||
          (this.stringAt(this.current - 1, 'OLM') && this.current + 1 === this.last) ||
          this.stringAt(this.current - 3, 'PSALM', 'QUALM') ||
          this.stringAt(this.current - 2, 'SALMON', 'HOLMES') ||
          this.stringAt(this.current - 1, 'ALMOND') ||
          (this.current === 1 && this.stringAt(this.current - 1, 'ALMS'))) &&
        !this.stringAt(this.current + 2, 'A') &&
        !this.stringAt(this.current - 2, 'BALMO') &&
        !this.stringAt(this.current - 2, 'PALMER', 'PALMOR', 'BALMER') &&
        !this.stringAt(this.current - 3, 'THALM')
      ) {
        this.current++;
        return true;
      }
      this.metaphAdd('L');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encodes contexts where '-L-' is silent in 'LK', 'LV'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentLInLkLv(): boolean {
    if (
      (this.stringAt(
        this.current - 2,
        'WALK',
        'YOLK',
        'FOLK',
        'HALF',
        'TALK',
        'CALF',
        'BALK',
        'CALK',
      ) ||
        (this.stringAt(this.current - 2, 'POLK') &&
          !this.stringAt(this.current - 2, 'POLKA', 'WALKO')) ||
        (this.stringAt(this.current - 2, 'HALV') &&
          !this.stringAt(this.current - 2, 'HALVA', 'HALVO')) ||
        (this.stringAt(this.current - 3, 'CAULK', 'CHALK', 'BAULK', 'FAULK') &&
          !this.stringAt(this.current - 4, 'SCHALK')) ||
        ((this.stringAt(this.current - 2, 'SALVE', 'CALVE') ||
          this.stringAt(this.current - 2, 'SOLDER')) &&
          // exceptions to above cases where 'L' is usually pronounced
          !this.stringAt(this.current - 2, 'SALVER', 'CALVER'))) &&
      !this.stringAt(this.current - 5, 'GONSALVES', 'GONCALVES') &&
      !this.stringAt(this.current - 2, 'BALKAN', 'TALKAL') &&
      !this.stringAt(this.current - 3, 'PAULK', 'CHALF')
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode 'L' in contexts of "-OULD-" where it is silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentLInOuld(): boolean {
    //'would', 'could'
    if (
      this.stringAt(this.current - 3, 'WOULD', 'COULD') ||
      (this.stringAt(this.current - 4, 'SHOULD') && !this.stringAt(this.current - 4, 'SHOULDER'))
    ) {
      this.metaphAddExactApprox('D', 'T');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-ILLA-" and "-ILLE-" in spanish and french
   * contexts were americans know to pronounce it as a 'Y'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeLlAsVowelSpecialCases(): boolean {
    if (
      this.stringAt(this.current - 5, 'TORTILLA') ||
      this.stringAt(this.current - 8, 'RATATOUILLE') ||
      // e.g. 'guillermo', "veillard"
      (this.stringAt(0, 'GUILL', 'VEILL', 'GAILL') &&
        // 'guillotine' usually has '-ll-' pronounced as 'L' in english
        !(
          this.stringAt(this.current - 3, 'GUILLOT', 'GUILLOR', 'GUILLEN') ||
          (this.stringAt(0, 'GUILL') && this.length === 5)
        )) ||
      // e.g. "brouillard", "gremillion"
      //
      // TODO [>2.1]: ROBILL has six letters
      this.stringAt(0, 'BROUILL', 'GREMILL') ||
      // e.g. 'mireille'
      (this.stringAt(this.current - 2, 'EILLE') &&
        this.current + 2 === this.last &&
        // exception "reveille" usually pronounced as 're-vil-lee'
        !this.stringAt(this.current - 5, 'REVEILLE'))
    ) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode other spanish cases where "-LL-" is pronounced as 'Y'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeLlAsVowel(): boolean {
    //spanish e.g. "cabrillo", "gallegos" but also "gorilla", "ballerina" -
    // give both pronounciations since an american might pronounce "cabrillo"
    // in the spanish or the american fashion.
    if (
      (this.current + 3 === this.length &&
        this.stringAt(this.current - 1, 'ILLO', 'ILLA', 'ALLE')) ||
      ((this.stringAt(this.last - 1, 'AS', 'OS') ||
        this.stringAt(this.last, 'AS', 'OS') ||
        this.stringAt(this.last, 'A', 'O')) &&
        this.stringAt(this.current - 1, 'AL', 'IL') &&
        !this.stringAt(this.current - 1, 'ALLA')) ||
      this.stringAt(0, 'VILLE', 'VILLA') ||
      this.stringAt(0, 'GALLARDO', 'VALLADAR', 'MAGALLAN', 'CAVALLAR', 'BALLASTE') ||
      this.stringAt(0, 'LLA')
    ) {
      this.metaphAdd('L', '');
      this.current += 2;
      return true;
    }
    return false;
  }

  /**
   * Call routines to encode "-LL-", in proper order
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeLlAsVowelCases(): boolean {
    if (this.charAt(this.current + 1) === 'L') {
      if (this.encodeLlAsVowelSpecialCases()) {
        return true;
      }
      if (this.encodeLlAsVowel()) {
        return true;
      }

      this.current += 2;
    } else {
      this.current++;
    }

    return false;
  }

  /**
   * Encode vowel-encoding cases where "-LE-" is pronounced "-EL-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeVowelLeTransposition(saveCurrent: number): boolean {
    // transposition of vowel sound and L occurs in many words,
    // e.g. "bristle", "dazzle", "goggle" → KAKAL
    if (
      this.encodeVowels &&
      saveCurrent > 1 &&
      !this.isVowel(saveCurrent - 1) &&
      this.charAt(saveCurrent + 1) === 'E' &&
      this.charAt(saveCurrent - 1) !== 'L' &&
      this.charAt(saveCurrent - 1) !== 'R' &&
      // lots of exceptions to this:
      !this.isVowel(saveCurrent + 2) &&
      !this.stringAt(0, 'ECCLESI', 'COMPLEC', 'COMPLEJ', 'ROBLEDO') &&
      !this.stringAt(0, 'MCCLE', 'MCLEL') &&
      !this.stringAt(0, 'EMBLEM', 'KADLEC') &&
      !(saveCurrent + 2 === this.last && this.stringAt(saveCurrent, 'LET')) &&
      !this.stringAt(saveCurrent, 'LETTING') &&
      !this.stringAt(saveCurrent, 'LETELY', 'LETTER', 'LETION', 'LETIAN', 'LETING', 'LETORY') &&
      !this.stringAt(saveCurrent, 'LETUS', 'LETIV') &&
      !this.stringAt(saveCurrent, 'LESS', 'LESQ', 'LECT', 'LEDG', 'LETE', 'LETH', 'LETS', 'LETT') &&
      !this.stringAt(saveCurrent, 'LEG', 'LER', 'LEX') &&
      // e.g. "complement" !→ KAMPALMENT
      !(
        this.stringAt(saveCurrent, 'LEMENT') &&
        !(
          this.stringAt(this.current - 5, 'BATTLE', 'TANGLE', 'PUZZLE', 'RABBLE', 'BABBLE') ||
          this.stringAt(this.current - 4, 'TABLE')
        )
      ) &&
      !(
        saveCurrent + 2 === this.last && this.stringAt(saveCurrent - 2, 'OCLES', 'ACLES', 'AKLES')
      ) &&
      !this.stringAt(saveCurrent - 3, 'LISLE', 'AISLE') &&
      !this.stringAt(0, 'ISLE') &&
      !this.stringAt(0, 'ROBLES') &&
      !this.stringAt(saveCurrent - 4, 'PROBLEM', 'RESPLEN') &&
      !this.stringAt(saveCurrent - 3, 'REPLEN') &&
      !this.stringAt(saveCurrent - 2, 'SPLE') &&
      this.charAt(saveCurrent - 1) !== 'H' &&
      this.charAt(saveCurrent - 1) !== 'W'
    ) {
      this.metaphAdd('AL');
      this.flagALInversion = true;

      // eat redundant 'L'
      if (this.charAt(saveCurrent + 2) === 'L') {
        this.current = saveCurrent + 3;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode special vowel-encoding cases where 'E' is not
   * silent at the end of a word as is the usual case
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeVowelPreserveVowelAfterL(saveCurrent: number): boolean {
    // an example of where the vowel would NOT need to be preserved
    // would be, say, "hustled", where there is no vowel pronounced
    // between the 'l' and the 'd'
    if (
      this.encodeVowels &&
      !this.isVowel(saveCurrent - 1) &&
      this.charAt(saveCurrent + 1) === 'E' &&
      saveCurrent > 1 &&
      saveCurrent + 1 !== this.last &&
      !(this.stringAt(saveCurrent + 1, 'ES', 'ED') && saveCurrent + 2 === this.last) &&
      !this.stringAt(saveCurrent - 1, 'RLEST')
    ) {
      this.metaphAdd('LA');
      this.current = this.skipVowels(this.current);
      return true;
    }

    return false;
  }

  /**
   * Call routines to encode "-LE-", in proper order
   *
   * @param save_current - index of actual current letter
   *
   */
  private encodeLeCases(saveCurrent: number): void {
    if (this.encodeVowelLeTransposition(saveCurrent)) {
      // handled by encodeVowelLeTransposition
    } else if (this.encodeVowelPreserveVowelAfterL(saveCurrent)) {
      // handled by encodeVowelPreserveVowelAfterL
    } else {
      this.metaphAdd('L');
    }
  }

  /**
   * Encode "-M-"
   *
   */
  private encodeM(): void {
    if (
      this.encodeSilentMAtBeginning() ||
      this.encodeMrAndMrs() ||
      this.encodeMac() ||
      this.encodeMpt()
    ) {
      return;
    }

    // Silent 'B' should really be handled
    // under 'B", not here under 'M'!
    this.encodeMb();

    this.metaphAdd('M');
  }

  /**
   * Encode cases where 'M' is silent at beginning of word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentMAtBeginning(): boolean {
    //skip these when at start of word
    if (this.current === 0 && this.stringAt(this.current, 'MN')) {
      this.current += 1;
      return true;
    }

    return false;
  }

  /**
   * Encode special cases "Mr." and "Mrs."
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeMrAndMrs(): boolean {
    if (this.current === 0 && this.stringAt(this.current, 'MR')) {
      // exceptions for "mr." and "mrs."
      if (this.length === 2 && this.stringAt(this.current, 'MR')) {
        if (this.encodeVowels) {
          this.metaphAdd('MASTAR');
        } else {
          this.metaphAdd('MSTR');
        }
        this.current += 2;
        return true;
      }
      if (this.length === 3 && this.stringAt(this.current, 'MRS')) {
        if (this.encodeVowels) {
          this.metaphAdd('MASAS');
        } else {
          this.metaphAdd('MSS');
        }
        this.current += 3;
        return true;
      }
    }

    return false;
  }

  /**
   * Encode "Mac-" and "Mc-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeMac(): boolean {
    // should only find irish and
    // scottish names e.g. 'macintosh'
    if (
      this.current === 0 &&
      (this.stringAt(0, 'MACIVER', 'MACEWEN') ||
        this.stringAt(0, 'MACELROY', 'MACILROY') ||
        this.stringAt(0, 'MACINTOSH') ||
        this.stringAt(0, 'MC'))
    ) {
      if (this.encodeVowels) {
        this.metaphAdd('MAK');
      } else {
        this.metaphAdd('MK');
      }

      if (this.stringAt(0, 'MC')) {
        this.current +=
          (
            this.stringAt(this.current + 2, 'K', 'G', 'Q') &&
            !this.stringAt(this.current + 2, 'GEOR')
          ) ?
            3
          : 2;
      } else {
        this.current += 3;
      }

      return true;
    }

    return false;
  }

  /**
   * Encode silent 'M' in context of "-MPT-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeMpt(): boolean {
    if (this.stringAt(this.current - 2, 'COMPTROL') || this.stringAt(this.current - 4, 'ACCOMPT')) {
      this.metaphAdd('N');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Test if 'B' is silent in these contexts
   *
   * @returns true if 'B' is silent in this context
   *
   */
  private testSilentMb1(): boolean {
    // e.g. "LAMB", "COMB", "LIMB", "DUMB", "BOMB"
    // Handle combining roots first
    if (
      (this.current === 3 && this.stringAt(this.current - 3, 'THUMB')) ||
      (this.current === 2 &&
        this.stringAt(this.current - 2, 'DUMB', 'BOMB', 'DAMN', 'LAMB', 'NUMB', 'TOMB'))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test if 'B' is pronounced in this context
   *
   * @returns true if 'B' is pronounced in this context
   *
   */
  private testPronouncedMb(): boolean {
    if (
      this.stringAt(this.current - 2, 'NUMBER') ||
      (this.stringAt(this.current + 2, 'A') && !this.stringAt(this.current - 2, 'DUMBASS')) ||
      this.stringAt(this.current + 2, 'O') ||
      this.stringAt(this.current - 2, 'LAMBEN', 'LAMBER', 'LAMBET', 'TOMBIG', 'LAMBRE')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test whether "-B-" is silent in these contexts
   *
   * @returns true if 'B' is silent in this context
   *
   */
  private testSilentMb2(): boolean {
    // 'M' is the current letter
    if (
      this.charAt(this.current + 1) === 'B' &&
      this.current > 1 &&
      (this.current + 1 === this.last ||
        // other situations where "-MB-" is at end of root
        // but not at end of word. The tests are for standard
        // noun suffixes.
        // e.g. "climbing" → KLMNK
        this.stringAt(this.current + 2, 'ING', 'ABL') ||
        this.stringAt(this.current + 2, 'LIKE') ||
        (this.charAt(this.current + 2) === 'S' && this.current + 2 === this.last) ||
        this.stringAt(this.current - 5, 'BUNCOMB') ||
        // e.g. "bomber",
        (this.stringAt(this.current + 2, 'ED', 'ER') &&
          this.current + 3 === this.last &&
          (this.stringAt(0, 'CLIMB', 'PLUMB') ||
            // e.g. "beachcomber"
            !this.stringAt(this.current - 1, 'IMBER', 'AMBER', 'EMBER', 'UMBER')) &&
          // exceptions
          !this.stringAt(this.current - 2, 'CUMBER', 'SOMBER')))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test if 'B' is pronounced in these "-MB-" contexts
   *
   * @returns true if "-B-" is pronounced in these contexts
   *
   */
  private testPronouncedMb2(): boolean {
    // e.g. "bombastic", "umbrage", "flamboyant"
    if (
      this.stringAt(this.current - 1, 'OMBAS', 'OMBAD', 'UMBRA') ||
      this.stringAt(this.current - 3, 'FLAM')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Tests for contexts where "-N-" is silent when after "-M-"
   *
   * @returns true if "-N-" is silent in these contexts
   *
   */
  private testMn(): boolean {
    if (
      this.charAt(this.current + 1) === 'N' &&
      (this.current + 1 === this.last ||
        // or at the end of a word but followed by suffixes
        (this.stringAt(this.current + 2, 'ING', 'EST') && this.current + 4 === this.last) ||
        (this.charAt(this.current + 2) === 'S' && this.current + 2 === this.last) ||
        (this.stringAt(this.current + 2, 'LY', 'ER', 'ED') && this.current + 3 === this.last) ||
        this.stringAt(this.current - 2, 'DAMNEDEST') ||
        this.stringAt(this.current - 5, 'GODDAMNIT'))
    ) {
      return true;
    }

    return false;
  }

  /**
   * Call routines to encode "-MB-", in proper order
   *
   */
  private encodeMb(): void {
    if (this.testSilentMb1()) {
      if (this.testPronouncedMb()) {
        this.current++;
      } else {
        this.current += 2;
      }
    } else if (this.testSilentMb2()) {
      if (this.testPronouncedMb2()) {
        this.current++;
      } else {
        this.current += 2;
      }
    } else if (this.testMn()) {
      this.current += 2;
    } else {
      // eat redundant 'M'
      this.current += this.charAt(this.current + 1) === 'M' ? 2 : 1;
    }
  }

  /**
   * Encode "-N-"
   *
   */
  private encodeN(): void {
    if (this.encodeNce()) {
      return;
    }

    // eat redundant 'N'
    if (this.charAt(this.current + 1) === 'N') {
      this.current += 2;
    } else {
      this.current++;
    }

    if (
      !this.stringAt(this.current - 3, 'MONSIEUR') &&
      // e.g. "aloneness",
      !this.stringAt(this.current - 3, 'NENESS')
    ) {
      this.metaphAdd('N');
    }
  }

  /**
   * Encode "-NCE-" and "-NSE-"
   * "entrance" is pronounced exactly the same as "entrants"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeNce(): boolean {
    //'acceptance', 'accountancy'
    if (
      this.stringAt(this.current + 1, 'C', 'S') &&
      this.stringAt(this.current + 2, 'E', 'Y', 'I') &&
      (this.current + 2 === this.last ||
        (this.current + 3 === this.last && this.charAt(this.current + 3) === 'S'))
    ) {
      this.metaphAdd('NTS');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-P-"
   *
   */
  private encodeP(): void {
    if (
      this.encodeSilentPAtBeginning() ||
      this.encodePt() ||
      this.encodePh() ||
      this.encodePph() ||
      this.encodeRps() ||
      this.encodeCoup() ||
      this.encodePneum() ||
      this.encodePsych() ||
      this.encodePsalm()
    ) {
      return;
    }

    this.encodePb();

    this.metaphAdd('P');
  }

  /**
   * Encode cases where "-P-" is silent at the start of a word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentPAtBeginning(): boolean {
    //skip these when at start of word
    if (this.current === 0 && this.stringAt(this.current, 'PN', 'PF', 'PS', 'PT')) {
      this.current += 1;
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "-P-" is silent before "-T-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePt(): boolean {
    // 'pterodactyl', 'receipt', 'asymptote'
    if (this.charAt(this.current + 1) === 'T') {
      if (
        (this.current === 0 && this.stringAt(this.current, 'PTERO')) ||
        this.stringAt(this.current - 5, 'RECEIPT') ||
        this.stringAt(this.current - 4, 'ASYMPTOT')
      ) {
        this.metaphAdd('T');
        this.current += 2;
        return true;
      }
    }
    return false;
  }

  /**
   * Encode "-PH-", usually as F, with exceptions for
   * cases where it is silent, or where the 'P' and 'T'
   * are pronounced seperately because they belong to
   * two different words in a combining form
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePh(): boolean {
    if (this.charAt(this.current + 1) === 'H') {
      // 'PH' silent in these contexts
      if (
        this.stringAt(this.current, 'PHTHALEIN') ||
        (this.current === 0 && this.stringAt(this.current, 'PHTH')) ||
        this.stringAt(this.current - 3, 'APOPHTHEGM')
      ) {
        this.metaphAdd('0');
        this.current += 4;
      }
      // combining forms
      //'sheepherd', 'upheaval', 'cupholder'
      else if (
        this.current > 0 &&
        (this.stringAt(
          this.current + 2,
          'EAD',
          'OLE',
          'ELD',
          'ILL',
          'OLD',
          'EAP',
          'ERD',
          'ARD',
          'ANG',
          'ORN',
          'EAV',
          'ART',
        ) ||
          this.stringAt(this.current + 2, 'OUSE') ||
          (this.stringAt(this.current + 2, 'AM') && !this.stringAt(this.current - 1, 'LPHAM')) ||
          this.stringAt(this.current + 2, 'AMMER', 'AZARD', 'UGGER') ||
          this.stringAt(this.current + 2, 'OLSTER')) &&
        !this.stringAt(this.current - 3, 'LYMPH', 'NYMPH')
      ) {
        this.metaphAdd('P');
        this.advanceCounter(3, 2);
      } else {
        this.metaphAdd('F');
        this.current += 2;
      }

      return true;
    }

    return false;
  }

  /**
   * Encode "-PPH-". I don't know why the greek poet's
   * name is transliterated this way...
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePph(): boolean {
    // 'sappho'
    if (
      this.charAt(this.current + 1) === 'P' &&
      this.current + 2 < this.length &&
      this.charAt(this.current + 2) === 'H'
    ) {
      this.metaphAdd('F');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode "-CORPS-" where "-PS-" not pronounced
   * since the cognate is here from the french
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeRps(): boolean {
    //'-corps-', 'corpsman'
    if (this.stringAt(this.current - 3, 'CORPS') && !this.stringAt(this.current - 3, 'CORPSE')) {
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-COUP-" where "-P-" is not pronounced
   * since the word is from the french
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeCoup(): boolean {
    //'coup'
    if (
      this.current === this.last &&
      this.stringAt(this.current - 3, 'COUP') &&
      !this.stringAt(this.current - 5, 'RECOUP')
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode 'P' in non-initial contexts of "-PNEUM-"
   * where is also silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePneum(): boolean {
    //'-pneum-'
    if (this.stringAt(this.current + 1, 'NEUM')) {
      this.metaphAdd('N');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode special case "-PSYCH-" where two encodings need to be
   * accounted for in one syllable, one for the 'PS' and one for
   * the 'CH'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePsych(): boolean {
    //'-psych-'
    if (this.stringAt(this.current + 1, 'SYCH')) {
      if (this.encodeVowels) {
        this.metaphAdd('SAK');
      } else {
        this.metaphAdd('SK');
      }

      this.current += 5;
      return true;
    }

    return false;
  }

  /**
   * Encode 'P' in context of "-PSALM-", where it has
   * become silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodePsalm(): boolean {
    //'-psalm-'
    if (this.stringAt(this.current + 1, 'SALM')) {
      // go ahead and encode entire word
      if (this.encodeVowels) {
        this.metaphAdd('SAM');
      } else {
        this.metaphAdd('SM');
      }

      this.current += 5;
      return true;
    }

    return false;
  }

  /**
   * Eat redundant 'B' or 'P'
   *
   */
  private encodePb(): void {
    // e.g. "campbell", "raspberry"
    // eat redundant 'P' or 'B'
    if (this.stringAt(this.current + 1, 'P', 'B')) {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encode "-Q-"
   *
   */
  private encodeQ(): void {
    // current pinyin
    if (this.stringAt(this.current, 'QIN')) {
      this.metaphAdd('X');
      this.current++;
      return;
    }

    // eat redundant 'Q'
    if (this.charAt(this.current + 1) === 'Q') {
      this.current += 2;
    } else {
      this.current++;
    }

    this.metaphAdd('K');
  }

  /**
   * Encode "-R-"
   *
   */
  private encodeR(): void {
    if (this.encodeRz()) {
      return;
    }

    if (!this.testSilentR()) {
      if (!this.encodeVowelReTransposition()) {
        this.metaphAdd('R');
      }
    }

    // eat redundant 'R'; also skip 'S' as well as 'R' in "poitiers"
    if (this.charAt(this.current + 1) === 'R' || this.stringAt(this.current - 6, 'POITIERS')) {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encode "-RZ-" according
   * to american and polish pronunciations
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeRz(): boolean {
    if (
      this.stringAt(this.current - 2, 'GARZ', 'KURZ', 'MARZ', 'MERZ', 'HERZ', 'PERZ', 'WARZ') ||
      this.stringAt(this.current, 'RZANO', 'RZOLA') ||
      this.stringAt(this.current - 1, 'ARZA', 'ARZN')
    ) {
      return false;
    }

    // 'yastrzemski' usually has 'z' silent in
    // united states, but should get 'X' in poland
    if (this.stringAt(this.current - 4, 'YASTRZEMSKI')) {
      this.metaphAdd('R', 'X');
      this.current += 2;
      return true;
    }
    // 'BRZEZINSKI' gets two pronunciations
    // in the united states, neither of which
    // are authentically polish
    if (this.stringAt(this.current - 1, 'BRZEZINSKI')) {
      this.metaphAdd('RS', 'RJ');
      // skip over 2nd 'Z'
      this.current += 4;
      return true;
    }
    // 'z' in 'rz after voiceless consonant gets 'X'
    // in alternate polish style pronunciation

    if (
      this.stringAt(this.current - 1, 'TRZ', 'PRZ', 'KRZ') ||
      (this.stringAt(this.current, 'RZ') && (this.isVowel(this.current - 1) || this.current === 0))
    ) {
      this.metaphAdd('RS', 'X');
      this.current += 2;
      return true;
    }
    // 'z' in 'rz after voiceled consonant, vowel, or at
    // beginning gets 'J' in alternate polish style pronunciation

    if (this.stringAt(this.current - 1, 'BRZ', 'DRZ', 'GRZ')) {
      this.metaphAdd('RS', 'J');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Test whether 'R' is silent in this context
   *
   * @returns true if 'R' is silent in this context
   *
   */
  private testSilentR(): boolean {
    // test cases where 'R' is silent, either because the
    // word is from the french or because it is no longer pronounced.
    // e.g. "rogier", "monsieur", "surburban"
    if (
      (this.current === this.last &&
        // reliably french word ending
        this.stringAt(this.current - 2, 'IER') &&
        // e.g. "metier"
        (this.stringAt(this.current - 5, 'MET', 'VIV', 'LUC') ||
          // e.g. "cartier", "bustier"
          this.stringAt(
            this.current - 6,
            'CART',
            'DOSS',
            'FOUR',
            'OLIV',
            'BUST',
            'DAUM',
            'ATEL',
            'SONN',
            'CORM',
            'MERC',
            'PELT',
            'POIR',
            'BERN',
            'FORT',
            'GREN',
            'SAUC',
            'GAGN',
            'GAUT',
            'GRAN',
            'FORC',
            'MESS',
            'LUSS',
            'MEUN',
            'POTH',
            'HOLL',
            'CHEN',
          ) ||
          // e.g. "croupier"
          this.stringAt(
            this.current - 7,
            'CROUP',
            'TORCH',
            'CLOUT',
            'FOURN',
            'GAUTH',
            'TROTT',
            'DEROS',
            'CHART',
          ) ||
          // e.g. "chevalier"
          this.stringAt(
            this.current - 8,
            'CHEVAL',
            'LAVOIS',
            'PELLET',
            'SOMMEL',
            'TREPAN',
            'LETELL',
            'COLOMB',
          ) ||
          this.stringAt(this.current - 9, 'CHARCUT') ||
          this.stringAt(this.current - 10, 'CHARPENT'))) ||
      this.stringAt(this.current - 2, 'SURBURB', 'WORSTED') ||
      this.stringAt(this.current - 2, 'WORCESTER') ||
      this.stringAt(this.current - 7, 'MONSIEUR') ||
      this.stringAt(this.current - 6, 'POITIERS')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Encode '-re-" as 'AR' in contexts
   * where this is the correct pronunciation
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeVowelReTransposition(): boolean {
    // -re inversion is just like
    // -le inversion
    // e.g. "fibre" → FABAR or "centre" → SANTAR
    if (
      this.encodeVowels &&
      this.charAt(this.current + 1) === 'E' &&
      this.length > 3 &&
      !this.stringAt(0, 'OUTRE', 'LIBRE', 'ANDRE') &&
      !(this.stringAt(0, 'FRED', 'TRES') && this.length === 4) &&
      !this.stringAt(
        this.current - 2,
        'LDRED',
        'LFRED',
        'NDRED',
        'NFRED',
        'NDRES',
        // TODO [>2.1]: TRES
        // 'TRES',
        'IFRED',
      ) &&
      !this.isVowel(this.current - 1) &&
      (this.current + 1 === this.last ||
        (this.current + 2 === this.last && this.stringAt(this.current + 2, 'D', 'S')))
    ) {
      this.metaphAdd('AR');
      return true;
    }

    return false;
  }

  /**
   * Encode "-S-"
   *
   */
  private encodeS(): void {
    if (
      this.encodeSkj() ||
      this.encodeSpecialSw() ||
      this.encodeSj() ||
      this.encodeSilentFrenchSFinal() ||
      this.encodeSilentFrenchSInternal() ||
      this.encodeIsl() ||
      this.encodeStl() ||
      this.encodeChristmas() ||
      this.encodeSthm() ||
      this.encodeIsten() ||
      this.encodeSugar() ||
      this.encodeSh() ||
      this.encodeSch() ||
      this.encodeSur() ||
      this.encodeSu() ||
      this.encodeSsio() ||
      this.encodeSs() ||
      this.encodeSia() ||
      this.encodeSio() ||
      this.encodeAnglicisations() ||
      this.encodeSc() ||
      this.encodeSeaSuiSier() ||
      this.encodeSea()
    ) {
      return;
    }

    this.metaphAdd('S');

    if (this.stringAt(this.current + 1, 'S', 'Z') && !this.stringAt(this.current + 1, 'SH')) {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encode a couple of contexts where scandinavian, slavic
   * or german names should get an alternate, native
   * pronunciation of 'SV' or 'XV'
   *
   * @returns true if handled
   *
   */
  private encodeSpecialSw(): boolean {
    if (this.current === 0) {
      //
      if (this.namesBeginningWithSwThatGetAltSv()) {
        this.metaphAdd('S', 'SV');
        this.current += 2;
        return true;
      }

      //
      if (this.namesBeginningWithSwThatGetAltXv()) {
        this.metaphAdd('S', 'XV');
        this.current += 2;
        return true;
      }
    }

    return false;
  }

  /**
   * Encode "-SKJ-" as X ("sh"), since americans pronounce
   * the name Dag Hammerskjold as "hammer-shold"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSkj(): boolean {
    // scandinavian
    if (this.stringAt(this.current, 'SKJO', 'SKJU') && this.isVowel(this.current + 3)) {
      this.metaphAdd('X');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode initial swedish "SJ-" as X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSj(): boolean {
    if (this.stringAt(0, 'SJ')) {
      this.metaphAdd('X');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode final 'S' in words from the french, where they
   * are not pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentFrenchSFinal(): boolean {
    // "louis" is an exception because it gets two pronuncuations
    if (this.stringAt(0, 'LOUIS') && this.current === this.last) {
      this.metaphAdd('S', '');
      this.current++;
      return true;
    }

    // french words familiar to americans where final s is silent
    if (
      (this.current === this.last &&
        (this.stringAt(0, 'YVES') ||
          (this.stringAt(0, 'HORS') && this.current === 3) ||
          this.stringAt(this.current - 4, 'CAMUS', 'YPRES') ||
          this.stringAt(this.current - 5, 'MESNES', 'DEBRIS', 'BLANCS', 'INGRES', 'CANNES') ||
          this.stringAt(
            this.current - 6,
            'CHABLIS',
            'APROPOS',
            'JACQUES',
            'ELYSEES',
            'OEUVRES',
            'GEORGES',
            'DESPRES',
          ) ||
          this.stringAt(0, 'ARKANSAS', 'FRANCAIS', 'CRUDITES', 'BRUYERES') ||
          this.stringAt(0, 'DESCARTES', 'DESCHUTES', 'DESCHAMPS', 'DESROCHES', 'DESCHENES') ||
          this.stringAt(0, 'RENDEZVOUS') ||
          this.stringAt(0, 'CONTRETEMPS', 'DESLAURIERS'))) ||
      (this.current === this.last &&
        this.stringAt(this.current - 2, 'AI', 'OI', 'UI') &&
        !this.stringAt(0, 'LOIS', 'LUIS'))
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode non-final 'S' in words from the french where they
   * are not pronounced.
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentFrenchSInternal(): boolean {
    // french words familiar to americans where internal s is silent
    if (
      this.stringAt(this.current - 2, 'DESCARTES') ||
      this.stringAt(
        this.current - 2,
        'DESCHAM',
        'DESPRES',
        'DESROCH',
        'DESROSI',
        'DESJARD',
        'DESMARA',
        'DESCHEN',
        'DESHOTE',
        'DESLAUR',
      ) ||
      this.stringAt(this.current - 2, 'MESNES') ||
      this.stringAt(this.current - 5, 'DUQUESNE', 'DUCHESNE') ||
      this.stringAt(this.current - 7, 'BEAUCHESNE') ||
      this.stringAt(this.current - 3, 'FRESNEL') ||
      this.stringAt(this.current - 3, 'GROSVENOR') ||
      this.stringAt(this.current - 4, 'LOUISVILLE') ||
      this.stringAt(this.current - 7, 'ILLINOISAN')
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode silent 'S' in context of "-ISL-"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeIsl(): boolean {
    //special cases 'island', 'isle', 'carlisle', 'carlysle'
    if (
      (this.stringAt(this.current - 2, 'LISL', 'LYSL', 'AISL') &&
        !this.stringAt(this.current - 3, 'PAISLEY', 'BAISLEY', 'ALISLAM', 'ALISLAH', 'ALISLAA')) ||
      (this.current === 1 &&
        (this.stringAt(this.current - 1, 'ISLE') || this.stringAt(this.current - 1, 'ISLAN')) &&
        !this.stringAt(this.current - 1, 'ISLEY', 'ISLER'))
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-STL-" in contexts where the 'T' is silent. Also
   * encode "-USCLE-" in contexts where the 'C' is silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeStl(): boolean {
    //'hustle', 'bustle', 'whistle'
    if (
      (this.stringAt(this.current, 'STLE', 'STLI') &&
        !this.stringAt(this.current + 2, 'LESS', 'LIKE', 'LINE')) ||
      this.stringAt(this.current - 3, 'THISTLY', 'BRISTLY', 'GRISTLY') ||
      // e.g. "corpuscle"
      this.stringAt(this.current - 1, 'USCLE')
    ) {
      // KRISTEN, KRYSTLE, CRYSTLE, KRISTLE all pronounce the 't'
      // also, exceptions where "-LING" is a nominalizing suffix
      if (
        this.stringAt(0, 'KRISTEN', 'KRYSTLE', 'CRYSTLE', 'KRISTLE') ||
        this.stringAt(0, 'CHRISTENSEN', 'CHRISTENSON') ||
        this.stringAt(this.current - 3, 'FIRSTLING') ||
        this.stringAt(this.current - 2, 'NESTLING', 'WESTLING')
      ) {
        this.metaphAdd('ST');
        this.current += 2;
      } else {
        if (
          this.encodeVowels &&
          this.charAt(this.current + 3) === 'E' &&
          this.charAt(this.current + 4) !== 'R' &&
          !this.stringAt(this.current + 3, 'ETTE', 'ETTA') &&
          !this.stringAt(this.current + 3, 'EY')
        ) {
          this.metaphAdd('SAL');
          this.flagALInversion = true;
        } else {
          this.metaphAdd('SL');
        }
        this.current += 3;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode "christmas". Americans always pronounce this as "krissmuss"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeChristmas(): boolean {
    //'christmas'
    if (this.stringAt(this.current - 4, 'CHRISTMA')) {
      this.metaphAdd('SM');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode "-STHM-" in contexts where the 'TH'
   * is silent.
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSthm(): boolean {
    //'asthma', 'isthmus'
    if (this.stringAt(this.current, 'STHM')) {
      this.metaphAdd('SM');
      this.current += 4;
      return true;
    }

    return false;
  }

  /**
   * Encode "-ISTEN-" and "-STNT-" in contexts
   * where the 'T' is silent
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeIsten(): boolean {
    // 't' is silent in verb, pronounced in name
    if (this.stringAt(0, 'CHRISTEN')) {
      // the word itself
      if (this.rootOrInflections(this.inWord, 'CHRISTEN') || this.stringAt(0, 'CHRISTENDOM')) {
        this.metaphAdd('S', 'ST');
      } else {
        // e.g. 'christenson', 'christene'
        this.metaphAdd('ST');
      }
      this.current += 2;
      return true;
    }

    //e.g. 'glisten', 'listen'
    if (
      this.stringAt(this.current - 2, 'LISTEN', 'RISTEN', 'HASTEN', 'FASTEN', 'MUSTNT') ||
      this.stringAt(this.current - 3, 'MOISTEN')
    ) {
      this.metaphAdd('S');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode special case "sugar"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSugar(): boolean {
    //special case 'sugar-'
    if (this.stringAt(this.current, 'SUGAR')) {
      this.metaphAdd('X');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-SH-" as X ("sh"), except in cases
   * where the 'S' and 'H' belong to different combining
   * roots and are therefore pronounced seperately
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSh(): boolean {
    if (this.stringAt(this.current, 'SH')) {
      // exception
      if (this.stringAt(this.current - 2, 'CASHMERE')) {
        this.metaphAdd('J');
        this.current += 2;
        return true;
      }

      //combining forms, e.g. 'clotheshorse', 'woodshole'
      if (
        this.current > 0 &&
        // e.g. "mishap"
        ((this.stringAt(this.current + 1, 'HAP') && this.current + 3 === this.last) ||
          // e.g. "hartsheim", "clothshorse"
          this.stringAt(
            this.current + 1,
            'HEIM',
            'HOEK',
            'HOLM',
            'HOLZ',
            'HOOD',
            'HEAD',
            'HEID',
            'HAAR',
            'HORS',
            'HOLE',
            'HUND',
            'HELM',
            'HAWK',
            'HILL',
          ) ||
          // e.g. "dishonor"
          this.stringAt(this.current + 1, 'HEART', 'HATCH', 'HOUSE', 'HOUND', 'HONOR') ||
          // e.g. "mishear"
          (this.stringAt(this.current + 2, 'EAR') && this.current + 4 === this.last) ||
          // e.g. "hartshorn"
          (this.stringAt(this.current + 2, 'ORN') && !this.stringAt(this.current - 2, 'UNSHORN')) ||
          // e.g. "newshour" but not "bashour", "manshour"
          (this.stringAt(this.current + 1, 'HOUR') &&
            !(
              this.stringAt(0, 'BASHOUR') ||
              this.stringAt(0, 'MANSHOUR') ||
              this.stringAt(0, 'ASHOUR')
            )) ||
          // e.g. "dishonest", "grasshopper"
          this.stringAt(
            this.current + 2,
            'ARMON',
            'ONEST',
            'ALLOW',
            'OLDER',
            'OPPER',
            'EIMER',
            'ANDLE',
            'ONOUR',
          ) ||
          // e.g. "dishabille", "transhumance"
          this.stringAt(this.current + 2, 'ABILLE', 'UMANCE', 'ABITUA'))
      ) {
        if (!this.stringAt(this.current - 1, 'S')) {
          this.metaphAdd('S');
        }
      } else {
        this.metaphAdd('X');
      }

      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-SCH-" in cases where the 'S' is pronounced
   * seperately from the "CH", in words from the dutch, italian,
   * and greek where it can be pronounced SK, and german words
   * where it is pronounced X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSch(): boolean {
    // these words were combining forms many centuries ago
    if (this.stringAt(this.current + 1, 'CH')) {
      if (
        this.current > 0 &&
        // e.g. "mischief", "escheat"
        (this.stringAt(this.current + 3, 'IEF', 'EAT') ||
          // e.g. "mischance"
          this.stringAt(this.current + 3, 'ANCE', 'ARGE') ||
          // e.g. "eschew"
          this.stringAt(0, 'ESCHEW'))
      ) {
        this.metaphAdd('S');
        this.current++;
        return true;
      }

      //Schlesinger's rule
      //dutch, danish, italian, greek origin, e.g. "school", "schooner", "schiavone", "schiz-"
      if (
        (this.stringAt(
          this.current + 3,
          'OO',
          'ER',
          'EN',
          'UY',
          'ED',
          'EM',
          'IA',
          'IZ',
          'IS',
          'OL',
        ) &&
          !this.stringAt(this.current, 'SCHOLT', 'SCHISL', 'SCHERR')) ||
        this.stringAt(this.current + 3, 'ISZ') ||
        (this.stringAt(this.current - 1, 'ESCHAT', 'ASCHIN', 'ASCHAL', 'ISCHAE', 'ISCHIA') &&
          !this.stringAt(this.current - 2, 'FASCHING')) ||
        (this.stringAt(this.current - 1, 'ESCHI') && this.current + 3 === this.last) ||
        this.charAt(this.current + 3) === 'Y'
      ) {
        // e.g. "schermerhorn", "schenker", "schistose"
        if (
          this.stringAt(this.current + 3, 'ER', 'EN', 'IS') &&
          (this.current + 4 === this.last || this.stringAt(this.current + 3, 'ENK', 'ENB', 'IST'))
        ) {
          this.metaphAdd('X', 'SK');
        } else {
          this.metaphAdd('SK');
        }
        this.current += 3;
        return true;
      }
      this.metaphAdd('X');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode "-SUR\<E,A,Y\>-" to J, unless it is at the beginning,
   * or preceeded by 'N', 'K', or "NO"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSur(): boolean {
    // 'erasure', 'usury'
    if (this.stringAt(this.current + 1, 'URE', 'URA', 'URY')) {
      //'sure', 'ensure'
      if (
        this.current === 0 ||
        this.stringAt(this.current - 1, 'N', 'K') ||
        this.stringAt(this.current - 2, 'NO')
      ) {
        this.metaphAdd('X');
      } else {
        this.metaphAdd('J');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-SU[O,A]-" to X ("sh") unless it is preceeded by
   * an 'R', in which case it is encoded to S, or it is
   * preceeded by a vowel, in which case it is encoded to J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSu(): boolean {
    //'sensuous', 'consensual'
    if (this.stringAt(this.current + 1, 'UO', 'UA') && this.current !== 0) {
      // exceptions e.g. "persuade"
      if (this.stringAt(this.current - 1, 'RSUA')) {
        this.metaphAdd('S');
      }
      // exceptions e.g. "casual"
      else if (this.isVowel(this.current - 1)) {
        this.metaphAdd('J', 'S');
      } else {
        this.metaphAdd('X', 'S');
      }

      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encodes "-SSIO-" in contexts where it is pronounced
   * either J or X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSsio(): boolean {
    if (this.stringAt(this.current + 1, 'SION')) {
      //"abcission"
      if (this.stringAt(this.current - 2, 'CI')) {
        this.metaphAdd('J');
      }
      //'mission'
      else if (this.isVowel(this.current - 1)) {
        this.metaphAdd('X');
      }

      this.advanceCounter(4, 2);
      return true;
    }

    return false;
  }

  /**
   * Encode "-SS-" in contexts where it is pronounced X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSs(): boolean {
    // e.g. "russian", "pressure"
    if (
      this.stringAt(this.current - 1, 'USSIA', 'ESSUR', 'ISSUR', 'ISSUE') ||
      // e.g. "hessian", "assurance"
      this.stringAt(this.current - 1, 'ESSIAN', 'ASSURE', 'ASSURA', 'ISSUAB', 'ISSUAN', 'ASSIUS')
    ) {
      this.metaphAdd('X');
      this.advanceCounter(3, 2);
      return true;
    }

    return false;
  }

  /**
   * Encodes "-SIA-" in contexts where it is pronounced
   * as X ("sh"), J, or S
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSia(): boolean {
    // e.g. "controversial", also "fuchsia", "ch" is silent
    if (this.stringAt(this.current - 2, 'CHSIA') || this.stringAt(this.current - 1, 'RSIAL')) {
      this.metaphAdd('X');
      this.advanceCounter(3, 1);
      return true;
    }

    // names generally get 'X' where terms, e.g. "aphasia" get 'J'
    if (
      (this.stringAt(0, 'ALESIA', 'ALYSIA', 'ALISIA', 'STASIA') &&
        this.current === 3 &&
        !this.stringAt(0, 'ANASTASIA')) ||
      this.stringAt(this.current - 5, 'DIONYSIAN') ||
      this.stringAt(this.current - 5, 'THERESIA')
    ) {
      this.metaphAdd('X', 'S');
      this.advanceCounter(3, 1);
      return true;
    }

    if (
      (this.stringAt(this.current, 'SIA') && this.current + 2 === this.last) ||
      (this.stringAt(this.current, 'SIAN') && this.current + 3 === this.last) ||
      this.stringAt(this.current - 5, 'AMBROSIAL')
    ) {
      if (
        (this.isVowel(this.current - 1) || this.stringAt(this.current - 1, 'R')) &&
        // exclude compounds based on names, or french or greek words
        !(
          this.stringAt(0, 'JAMES', 'NICOS', 'PEGAS', 'PEPYS') ||
          this.stringAt(0, 'HOBBES', 'HOLMES', 'JAQUES', 'KEYNES') ||
          this.stringAt(0, 'MALTHUS', 'HOMOOUS') ||
          this.stringAt(0, 'MAGLEMOS', 'HOMOIOUS') ||
          this.stringAt(0, 'LEVALLOIS', 'TARDENOIS') ||
          this.stringAt(this.current - 4, 'ALGES')
        )
      ) {
        this.metaphAdd('J');
      } else {
        this.metaphAdd('S');
      }

      this.advanceCounter(2, 1);
      return true;
    }
    return false;
  }

  /**
   * Encodes "-SIO-" in contexts where it is pronounced
   * as J or X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSio(): boolean {
    // special case, irish name
    if (this.stringAt(0, 'SIOBHAN')) {
      this.metaphAdd('X');
      this.advanceCounter(3, 1);
      return true;
    }

    if (this.stringAt(this.current + 1, 'ION')) {
      // e.g. "vision", "version"
      if (this.isVowel(this.current - 1) || this.stringAt(this.current - 2, 'ER', 'UR')) {
        this.metaphAdd('J');
      } // e.g. "declension"
      else {
        this.metaphAdd('X');
      }

      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "-S-" might well be from a german name
   * and add encoding of german pronounciation in alternate m_metaph
   * so that it can be found in a genealogical search
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeAnglicisations(): boolean {
    //german & anglicisations, e.g. 'smith' match 'schmidt', 'snider' match 'schneider'
    //also, -sz- in slavic language altho in hungarian it is pronounced 's'
    if (
      (this.current === 0 && this.stringAt(this.current + 1, 'M', 'N', 'L')) ||
      this.stringAt(this.current + 1, 'Z')
    ) {
      this.metaphAdd('S', 'X');

      // eat redundant 'Z'
      if (this.stringAt(this.current + 1, 'Z')) {
        this.current += 2;
      } else {
        this.current++;
      }

      return true;
    }

    return false;
  }

  /**
   * Encode "-SC<vowel>-" in contexts where it is silent,
   * or pronounced as X ("sh"), S, or SK
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSc(): boolean {
    if (this.stringAt(this.current, 'SC')) {
      // exception 'viscount'
      if (this.stringAt(this.current - 2, 'VISCOUNT')) {
        this.current += 1;
        return true;
      }

      // encode "-SC<front vowel>-"
      if (this.stringAt(this.current + 2, 'I', 'E', 'Y')) {
        // e.g. "conscious"
        if (
          this.stringAt(this.current + 2, 'IOUS') ||
          // e.g. "prosciutto"
          this.stringAt(this.current + 2, 'IUT') ||
          this.stringAt(this.current - 4, 'OMNISCIEN') ||
          // e.g. "conscious"
          this.stringAt(this.current - 3, 'CONSCIEN', 'CRESCEND', 'CONSCION') ||
          this.stringAt(this.current - 2, 'FASCIS')
        ) {
          this.metaphAdd('X');
        } else if (
          this.stringAt(this.current, 'SCEPTIC', 'SCEPSIS') ||
          this.stringAt(this.current, 'SCIVV', 'SCIRO') ||
          // commonly pronounced this way in u.s.
          this.stringAt(this.current, 'SCIPIO') ||
          this.stringAt(this.current - 2, 'PISCITELLI')
        ) {
          this.metaphAdd('SK');
        } else {
          this.metaphAdd('S');
        }

        this.current += 2;
        return true;
      }

      this.metaphAdd('SK');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-S\<EA,UI,IER\>-" in contexts where it is pronounced
   * as J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSeaSuiSier(): boolean {
    // "nausea" by itself has → NJ as a more likely encoding. Other forms
    // using "nause-" (see Encode_SEA()) have X or S as more familiar pronounciations
    if (
      (this.stringAt(this.current - 3, 'NAUSEA') && this.current + 2 === this.last) ||
      // e.g. "casuistry", "frasier", "hoosier"
      this.stringAt(this.current - 2, 'CASUI') ||
      (this.stringAt(this.current - 1, 'OSIER', 'ASIER') &&
        !(
          this.stringAt(0, 'EASIER') ||
          this.stringAt(0, 'OSIER') ||
          this.stringAt(this.current - 2, 'ROSIER', 'MOSIER')
        ))
    ) {
      this.metaphAdd('J', 'X');
      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "-SE-" is pronounced as X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSea(): boolean {
    if (
      (this.stringAt(0, 'SEAN') && this.current + 3 === this.last) ||
      (this.stringAt(this.current - 3, 'NAUSEO') && !this.stringAt(this.current - 3, 'NAUSEAT'))
    ) {
      this.metaphAdd('X');
      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-T-"
   *
   */
  private encodeT(): void {
    if (
      this.encodeTInitial() ||
      this.encodeTch() ||
      this.encodeSilentFrenchT() ||
      this.encodeTunTulTuaTuo() ||
      this.encodeTueTeuTeouTulTie() ||
      this.encodeTurTiuSuffixes() ||
      this.encodeTi() ||
      this.encodeTient() ||
      this.encodeTsch() ||
      this.encodeTzsch() ||
      this.encodeThPronouncedSeparately() ||
      this.encodeTth() ||
      this.encodeTh()
    ) {
      return;
    }

    // eat redundant 'T' or 'D'
    if (this.stringAt(this.current + 1, 'T', 'D')) {
      this.current += 2;
    } else {
      this.current++;
    }

    this.metaphAdd('T');
  }

  /**
   * Encode some exceptions for initial 'T'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTInitial(): boolean {
    if (this.current === 0) {
      // americans usually pronounce "tzar" as "zar"
      if (this.stringAt(this.current + 1, 'SAR', 'ZAR')) {
        this.current++;
        return true;
      }

      // old 'École française d'Extrême-Orient' chinese pinyin where 'ts-' → 'X'
      if (
        (this.length === 3 && this.stringAt(this.current + 1, 'SO', 'SA', 'SU')) ||
        (this.length === 4 && this.stringAt(this.current + 1, 'SAO', 'SAI')) ||
        (this.length === 5 && this.stringAt(this.current + 1, 'SING', 'SANG'))
      ) {
        this.metaphAdd('X');
        this.advanceCounter(3, 2);
        return true;
      }

      // "TS<vowel>-" at start can be pronounced both with and without 'T'
      if (this.stringAt(this.current + 1, 'S') && this.isVowel(this.current + 2)) {
        this.metaphAdd('TS', 'S');
        this.advanceCounter(3, 2);
        return true;
      }

      // e.g. "Tjaarda"
      if (this.stringAt(this.current + 1, 'J')) {
        this.metaphAdd('X');
        this.advanceCounter(3, 2);
        return true;
      }

      // cases where initial "TH-" is pronounced as T and not 0 ("th")
      if (
        (this.stringAt(this.current + 1, 'HU') && this.length === 3) ||
        this.stringAt(this.current + 1, 'HAI', 'HUY', 'HAO') ||
        this.stringAt(this.current + 1, 'HYME', 'HYMY', 'HANH') ||
        this.stringAt(this.current + 1, 'HERES')
      ) {
        this.metaphAdd('T');
        this.advanceCounter(3, 2);
        return true;
      }
    }

    return false;
  }

  /**
   * Encode "-TCH-", reliably X ("sh", or in this case, "ch")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTch(): boolean {
    if (this.stringAt(this.current + 1, 'CH')) {
      this.metaphAdd('X');
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode the many cases where americans are aware that a certain word is
   * french and know to not pronounce the 'T'
   *
   * @returns true if encoding handled in this routine, false if not
   * TOUCHET CHABOT BENOIT
   */
  private encodeSilentFrenchT(): boolean {
    // french silent T familiar to americans
    if (
      (this.current === this.last && this.stringAt(this.current - 4, 'MONET', 'GENET', 'CHAUT')) ||
      this.stringAt(this.current - 2, 'POTPOURRI') ||
      this.stringAt(this.current - 3, 'BOATSWAIN') ||
      this.stringAt(this.current - 3, 'MORTGAGE') ||
      ((this.stringAt(
        this.current - 4,
        'BERET',
        'BIDET',
        'FILET',
        'DEBUT',
        'DEPOT',
        'PINOT',
        'TAROT',
      ) ||
        this.stringAt(
          this.current - 5,
          'BALLET',
          'BUFFET',
          'CACHET',
          'CHALET',
          'ESPRIT',
          'RAGOUT',
          'GOULET',
          'CHABOT',
          'BENOIT',
        ) ||
        this.stringAt(
          this.current - 6,
          'GOURMET',
          'BOUQUET',
          'CROCHET',
          'CROQUET',
          'PARFAIT',
          'PINCHOT',
          'CABARET',
          'PARQUET',
          'RAPPORT',
          'TOUCHET',
          'COURBET',
          'DIDEROT',
        ) ||
        this.stringAt(
          this.current - 7,
          'ENTREPOT',
          'CABERNET',
          'DUBONNET',
          'MASSENET',
          'MUSCADET',
          'RICOCHET',
          'ESCARGOT',
        ) ||
        this.stringAt(
          this.current - 8,
          'SOBRIQUET',
          'CABRIOLET',
          'CASSOULET',
          'OUBRIQUET',
          'CAMEMBERT',
        )) &&
        !this.stringAt(this.current + 1, 'AN', 'RY', 'IC', 'OM', 'IN'))
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-TU\<N,L,A,O\>-" in cases where it is pronounced
   * X ("sh", or in this case, "ch")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTunTulTuaTuo(): boolean {
    // e.g. "fortune", "fortunate"
    if (
      this.stringAt(this.current - 3, 'FORTUN') ||
      // e.g. "capitulate"
      (this.stringAt(this.current, 'TUL') &&
        this.isVowel(this.current - 1) &&
        this.isVowel(this.current + 3)) ||
      // e.g. "obituary", "barbituate"
      this.stringAt(this.current - 2, 'BITUA', 'BITUE') ||
      // e.g. "actual"
      (this.current > 1 && this.stringAt(this.current, 'TUA', 'TUO'))
    ) {
      this.metaphAdd('X', 'T');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-T<vowel>-" forms where 'T' is pronounced as X
   * ("sh", or in this case "ch")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTueTeuTeouTulTie(): boolean {
    // 'constituent', 'pasteur'
    if (
      this.stringAt(this.current + 1, 'UENT') ||
      this.stringAt(this.current - 4, 'RIGHTEOUS') ||
      this.stringAt(this.current - 3, 'STATUTE') ||
      this.stringAt(this.current - 3, 'AMATEUR') ||
      // e.g. "blastula", "pasteur"
      this.stringAt(this.current - 1, 'NTULE', 'NTULA', 'STULE', 'STULA', 'STEUR') ||
      // e.g. "statue"
      (this.current + 2 === this.last && this.stringAt(this.current, 'TUE')) ||
      // e.g. "constituency"
      this.stringAt(this.current, 'TUENC') ||
      // e.g. "statutory"
      this.stringAt(this.current - 3, 'STATUTOR') ||
      // e.g. "patience"
      (this.current + 5 === this.last && this.stringAt(this.current, 'TIENCE'))
    ) {
      this.metaphAdd('X', 'T');
      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-TU-" forms in suffixes where it is usually
   * pronounced as X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTurTiuSuffixes(): boolean {
    // 'adventure', 'musculature'
    if (
      this.current > 0 &&
      this.stringAt(this.current + 1, 'URE', 'URA', 'URI', 'URY', 'URO', 'IUS')
    ) {
      // exceptions e.g. 'tessitura', mostly from romance languages
      if (
        (this.stringAt(this.current + 1, 'URA', 'URO') &&
          //&& !stringAt((m_current + 1),  "URIA", "")
          this.current + 3 === this.last &&
          !this.stringAt(this.current - 3, 'VENTURA')) ||
        // e.g. "kachaturian", "hematuria"
        this.stringAt(this.current + 1, 'URIA')
      ) {
        this.metaphAdd('T');
      } else {
        this.metaphAdd('X', 'T');
      }

      this.advanceCounter(2, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-TI\<O,A,U\>-" as X ("sh"), except
   * in cases where it is part of a combining form,
   * or as J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTi(): boolean {
    // '-tio-', '-tia-', '-tiu-'
    // except combining forms where T already pronounced e.g 'rooseveltian'
    if (
      (this.stringAt(this.current + 1, 'IO') && !this.stringAt(this.current - 1, 'ETIOL')) ||
      this.stringAt(this.current + 1, 'IAL') ||
      this.stringAt(this.current - 1, 'RTIUM', 'ATIUM') ||
      (this.stringAt(this.current + 1, 'IAN') &&
        this.current > 0 &&
        !(
          this.stringAt(this.current - 4, 'FAUSTIAN') ||
          this.stringAt(this.current - 5, 'PROUSTIAN') ||
          this.stringAt(this.current - 2, 'TATIANA') ||
          this.stringAt(this.current - 3, 'KANTIAN', 'GENTIAN') ||
          this.stringAt(this.current - 8, 'ROOSEVELTIAN')
        )) ||
      (this.current + 2 === this.last &&
        this.stringAt(this.current, 'TIA') &&
        // exceptions to above rules where the pronounciation is usually X
        !(
          this.stringAt(this.current - 3, 'HESTIA', 'MASTIA') ||
          this.stringAt(this.current - 2, 'OSTIA') ||
          this.stringAt(0, 'TIA') ||
          this.stringAt(this.current - 5, 'IZVESTIA')
        )) ||
      this.stringAt(this.current + 1, 'IATE', 'IATI', 'IABL', 'IATO', 'IARY') ||
      this.stringAt(this.current - 5, 'CHRISTIAN')
    ) {
      if (
        (this.current === 2 && this.stringAt(0, 'ANTI')) ||
        this.stringAt(0, 'PATIO', 'PITIA', 'DUTIA')
      ) {
        this.metaphAdd('T');
      } else if (this.stringAt(this.current - 4, 'EQUATION')) {
        this.metaphAdd('J');
      } else if (this.stringAt(this.current, 'TION')) {
        this.metaphAdd('X');
      } else if (this.stringAt(0, 'KATIA', 'LATIA')) {
        this.metaphAdd('T', 'X');
      } else {
        this.metaphAdd('X', 'T');
      }

      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-TIENT-" where "TI" is pronounced X ("sh")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTient(): boolean {
    // e.g. 'patient'
    if (this.stringAt(this.current + 1, 'IENT')) {
      this.metaphAdd('X', 'T');
      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode "-TSCH-" as X ("ch")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTsch(): boolean {
    //'deutsch'
    if (
      this.stringAt(this.current, 'TSCH') &&
      // combining forms in german where the 'T' is pronounced seperately
      !this.stringAt(this.current - 3, 'WELT', 'KLAT', 'FEST')
    ) {
      // pronounced the same as "ch" in "chit" → X
      this.metaphAdd('X');
      this.current += 4;
      return true;
    }

    return false;
  }

  /**
   * Encode "-TZSCH-" as X ("ch")
   *
   * "Neitzsche is peachy"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTzsch(): boolean {
    //'neitzsche'
    if (this.stringAt(this.current, 'TZSCH')) {
      this.metaphAdd('X');
      this.current += 5;
      return true;
    }

    return false;
  }

  /**
   * Encodes cases where the 'H' in "-TH-" is the beginning of
   * another word in a combining form, special cases where it is
   * usually pronounced as 'T', and a special case where it has
   * become pronounced as X ("sh", in this case "ch")
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeThPronouncedSeparately(): boolean {
    //'adulthood', 'bithead', 'apartheid'
    if (
      (this.current > 0 &&
        this.stringAt(
          this.current + 1,
          'HOOD',
          'HEAD',
          'HEID',
          'HAND',
          'HILL',
          'HOLD',
          'HAWK',
          'HEAP',
          'HERD',
          'HOLE',
          'HOOK',
          'HUNT',
          'HUMO',
          'HAUS',
          'HOFF',
          'HARD',
        ) &&
        !this.stringAt(this.current - 3, 'SOUTH', 'NORTH')) ||
      this.stringAt(this.current + 1, 'HOUSE', 'HEART', 'HASTE', 'HYPNO', 'HEQUE') ||
      // watch out for greek root "-thallic"
      (this.stringAt(this.current + 1, 'HALL') &&
        this.current + 4 === this.last &&
        !this.stringAt(this.current - 3, 'SOUTH', 'NORTH')) ||
      (this.stringAt(this.current + 1, 'HAM') &&
        this.current + 3 === this.last &&
        !(
          this.stringAt(0, 'GOTHAM', 'WITHAM', 'LATHAM') ||
          this.stringAt(0, 'BENTHAM', 'WALTHAM', 'WORTHAM') ||
          this.stringAt(0, 'GRANTHAM')
        )) ||
      (this.stringAt(this.current + 1, 'HATCH') &&
        !(this.current === 0 || this.stringAt(this.current - 2, 'UNTHATCH'))) ||
      this.stringAt(this.current - 3, 'WARTHOG') ||
      // and some special cases where "-TH-" is usually pronounced 'T'
      this.stringAt(this.current - 2, 'ESTHER') ||
      this.stringAt(this.current - 3, 'GOETHE') ||
      this.stringAt(this.current - 2, 'NATHALIE')
    ) {
      // special case
      if (this.stringAt(this.current - 3, 'POSTHUM')) {
        this.metaphAdd('X');
      } else {
        this.metaphAdd('T');
      }
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode the "-TTH-" in "matthew", eating the redundant 'T'
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTth(): boolean {
    // 'matthew' vs. 'outthink'
    if (this.stringAt(this.current, 'TTH')) {
      if (this.stringAt(this.current - 2, 'MATTH')) {
        this.metaphAdd('0');
      } else {
        this.metaphAdd('T0');
      }
      this.current += 3;
      return true;
    }

    return false;
  }

  /**
   * Encode "-TH-". 0 (zero) is used in Metaphone to encode this sound
   * when it is pronounced as a dipthong, either voiced or unvoiced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeTh(): boolean {
    if (this.stringAt(this.current, 'TH')) {
      //'-clothes-'
      if (this.stringAt(this.current - 3, 'CLOTHES')) {
        // vowel already encoded so skip right to S
        this.current += 3;
        return true;
      }

      //special case "thomas", "thames", "beethoven" or germanic words
      if (
        this.stringAt(
          this.current + 2,
          'OMAS',
          'OMPS',
          'OMPK',
          'OMSO',
          'OMSE',
          'AMES',
          'OVEN',
          'OFEN',
          'ILDA',
          'ILDE',
        ) ||
        (this.stringAt(0, 'THOM') && this.length === 4) ||
        (this.stringAt(0, 'THOMS') && this.length === 5) ||
        this.stringAt(0, 'VAN ', 'VON ') ||
        this.stringAt(0, 'SCH')
      ) {
        this.metaphAdd('T');
      } else {
        // give an 'etymological' 2nd
        // encoding for "smith"
        this.metaphAdd('0', this.stringAt(0, 'SM') ? 'T' : undefined);
      }

      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-V-"
   *
   */
  private encodeV(): void {
    // eat redundant 'V'
    if (this.charAt(this.current + 1) === 'V') {
      this.current += 2;
    } else {
      this.current++;
    }

    this.metaphAddExactApprox('V', 'F');
  }

  /**
   * Encode "-W-"
   *
   */
  private encodeW(): void {
    if (
      this.encodeSilentWAtBeginning() ||
      this.encodeWitzWicz() ||
      this.encodeWr() ||
      this.encodeInitialWVowel() ||
      this.encodeWh() ||
      this.encodeEasternEuropeanW()
    ) {
      return;
    }

    // e.g. 'zimbabwe'
    if (this.encodeVowels && this.stringAt(this.current, 'WE') && this.current + 1 === this.last) {
      this.metaphAdd('A');
    }

    //else skip it
    this.current++;
  }

  /**
   * Encode cases where 'W' is silent at beginning of word
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeSilentWAtBeginning(): boolean {
    //skip these when at start of word
    if (this.current === 0 && this.stringAt(this.current, 'WR')) {
      this.current += 1;
      return true;
    }

    return false;
  }

  /**
   * Encode polish patronymic suffix, mapping
   * alternate spellings to the same encoding,
   * and including easern european pronounciation
   * to the american so that both forms can
   * be found in a genealogy search
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeWitzWicz(): boolean {
    //polish e.g. 'filipowicz'
    if (this.current + 3 === this.last && this.stringAt(this.current, 'WICZ', 'WITZ')) {
      if (this.encodeVowels) {
        if (this.primary.length > 0 && this.primary.endsWith('A')) {
          this.metaphAdd('TS', 'FAX');
        } else {
          this.metaphAdd('ATS', 'FAX');
        }
      } else {
        this.metaphAdd('TS', 'FX');
      }
      this.current += 4;
      return true;
    }

    return false;
  }

  /**
   * Encode "-WR-" as R ('W' always effectively silent)
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeWr(): boolean {
    //can also be in middle of word
    if (this.stringAt(this.current, 'WR')) {
      this.metaphAdd('R');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "W-", adding central and eastern european
   * pronounciations so that both forms can be found
   * in a genealogy search
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialWVowel(): boolean {
    if (this.current === 0 && this.isVowel(this.current + 1)) {
      //Witter should match Vitter
      if (this.germanicOrSlavicNameBeginningWithW()) {
        if (this.encodeVowels) {
          this.metaphAddExactApprox('A', 'VA', 'A', 'FA');
        } else {
          this.metaphAddExactApprox('A', 'V', 'A', 'F');
        }
      } else {
        this.metaphAdd('A');
      }

      this.current++;
      // don't encode vowels twice
      this.current = this.skipVowels(this.current);
      return true;
    }

    return false;
  }

  /**
   * Encode "-WH-" either as H, or close enough to 'U' to be
   * considered a vowel
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeWh(): boolean {
    if (this.stringAt(this.current, 'WH')) {
      // cases where it is pronounced as H
      // e.g. 'who', 'whole'
      if (
        this.charAt(this.current + 2) === 'O' &&
        // exclude cases where it is pronounced like a vowel
        !(
          this.stringAt(this.current + 2, 'OOSH') ||
          this.stringAt(this.current + 2, 'OOP', 'OMP', 'ORL', 'ORT') ||
          this.stringAt(this.current + 2, 'OA', 'OP')
        )
      ) {
        this.metaphAdd('H');
        this.advanceCounter(3, 2);
        return true;
      }
      // combining forms, e.g. 'hollowhearted', 'rawhide'
      if (
        this.stringAt(
          this.current + 2,
          'IDE',
          'ARD',
          'EAD',
          'AWK',
          'ERD',
          'OOK',
          'AND',
          'OLE',
          'OOD',
        ) ||
        this.stringAt(this.current + 2, 'EART', 'OUSE', 'OUND') ||
        this.stringAt(this.current + 2, 'AMMER')
      ) {
        this.metaphAdd('H');
        this.current += 2;
        return true;
      }
      if (this.current === 0) {
        this.metaphAdd('A');
        this.current += 2;
        // don't encode vowels twice
        this.current = this.skipVowels(this.current);
        return true;
      }

      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode "-W-" when in eastern european names, adding
   * the eastern european pronounciation to the american so
   * that both forms can be found in a genealogy search
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeEasternEuropeanW(): boolean {
    //Arnow should match Arnoff
    if (
      (this.current === this.last && this.isVowel(this.current - 1)) ||
      this.stringAt(this.current - 1, 'EWSKI', 'EWSKY', 'OWSKI', 'OWSKY') ||
      (this.stringAt(this.current, 'WICKI', 'WACKI') && this.current + 4 === this.last) ||
      (this.stringAt(this.current, 'WIAK') && this.current + 3 === this.last) ||
      this.stringAt(0, 'SCH')
    ) {
      this.metaphAddExactApprox('', 'V', '', 'F');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-X-"
   *
   */
  private encodeX(): void {
    if (
      this.encodeInitialX() ||
      this.encodeGreekX() ||
      this.encodeXSpecialCases() ||
      this.encodeXToH() ||
      this.encodeXVowel() ||
      this.encodeFrenchXFinal()
    ) {
      return;
    }

    // eat redundant 'X' or other redundant cases
    if (
      this.stringAt(this.current + 1, 'X', 'Z', 'S') ||
      // e.g. "excite", "exceed"
      this.stringAt(this.current + 1, 'CI', 'CE')
    ) {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encode initial X where it is usually pronounced as S
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeInitialX(): boolean {
    // current chinese pinyin spelling
    if (this.stringAt(0, 'XIA', 'XIO', 'XIE') || this.stringAt(0, 'XU')) {
      this.metaphAdd('X');
      this.current++;
      return true;
    }

    // else
    if (this.current === 0) {
      this.metaphAdd('S');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode X when from greek roots where it is usually pronounced as S
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGreekX(): boolean {
    // 'xylophone', xylem', 'xanthoma', 'xeno-'
    if (
      this.stringAt(this.current + 1, 'YLO', 'YLE', 'ENO') ||
      this.stringAt(this.current + 1, 'ANTH')
    ) {
      this.metaphAdd('S');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode special cases, "LUXUR-", "Texeira"
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeXSpecialCases(): boolean {
    // 'luxury'
    if (this.stringAt(this.current - 2, 'LUXUR')) {
      this.metaphAddExactApprox('GJ', 'KJ');
      this.current++;
      return true;
    }

    // 'texeira' portuguese/galician name
    if (this.stringAt(0, 'TEXEIRA') || this.stringAt(0, 'TEIXEIRA')) {
      this.metaphAdd('X');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode special case where americans know the
   * proper mexican indian pronounciation of this name
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeXToH(): boolean {
    // T-O-D-O: look for other mexican indian words
    // where 'X' is usually pronounced this way
    if (this.stringAt(this.current - 2, 'OAXACA') || this.stringAt(this.current - 3, 'QUIXOTE')) {
      this.metaphAdd('H');
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-X-" in vowel contexts where it is usually
   * pronounced KX ("ksh")
   * account also for BBC pronounciation of → KS
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeXVowel(): boolean {
    // e.g. "sexual", "connexion" (british), "noxious"
    if (this.stringAt(this.current + 1, 'UAL', 'ION', 'IOU')) {
      this.metaphAdd('KX', 'KS');
      this.advanceCounter(3, 1);
      return true;
    }

    return false;
  }

  /**
   * Encode cases of "-X", encoding as silent when part
   * of a french word where it is not pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeFrenchXFinal(): boolean {
    //french e.g. "breaux", "paix"
    if (
      !(
        this.current === this.last &&
        (this.stringAt(this.current - 3, 'IAU', 'EAU', 'IEU') ||
          this.stringAt(this.current - 2, 'AI', 'AU', 'OU', 'OI', 'EU'))
      )
    ) {
      this.metaphAdd('KS');
    }

    return false;
  }

  /**
   * Encode "-Z-"
   *
   */
  private encodeZ(): void {
    if (this.encodeZz() || this.encodeZuZierZs() || this.encodeFrenchEz() || this.encodeGermanZ()) {
      return;
    }

    if (this.encodeZh()) {
      return;
    }
    this.metaphAdd('S');

    // eat redundant 'Z'
    if (this.charAt(this.current + 1) === 'Z') {
      this.current += 2;
    } else {
      this.current++;
    }
  }

  /**
   * Encode cases of "-ZZ-" where it is obviously part
   * of an italian word where "-ZZ-" is pronounced as TS
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeZz(): boolean {
    // "abruzzi", 'pizza'
    if (
      this.charAt(this.current + 1) === 'Z' &&
      ((this.stringAt(this.current + 2, 'I', 'O', 'A') && this.current + 2 === this.last) ||
        this.stringAt(this.current - 2, 'MOZZARELL', 'PIZZICATO', 'PUZZONLAN'))
    ) {
      this.metaphAdd('TS', 'S');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Encode special cases where "-Z-" is pronounced as J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeZuZierZs(): boolean {
    if (
      (this.current === 1 && this.stringAt(this.current - 1, 'AZUR')) ||
      (this.stringAt(this.current, 'ZIER') && !this.stringAt(this.current - 2, 'VIZIER')) ||
      this.stringAt(this.current, 'ZSA')
    ) {
      this.metaphAdd('J', 'S');

      if (this.stringAt(this.current, 'ZSA')) {
        this.current += 2;
      } else {
        this.current++;
      }
      return true;
    }

    return false;
  }

  /**
   * Encode cases where americans recognize "-EZ" as part
   * of a french word where Z not pronounced
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeFrenchEz(): boolean {
    if (
      (this.current === 3 && this.stringAt(this.current - 3, 'CHEZ')) ||
      this.stringAt(this.current - 5, 'RENDEZ')
    ) {
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode cases where "-Z-" is in a german word
   * where Z → TS in german
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeGermanZ(): boolean {
    if (
      (this.current === 2 &&
        this.current + 1 === this.last &&
        this.stringAt(this.current - 2, 'NAZI')) ||
      this.stringAt(this.current - 2, 'NAZIFY', 'MOZART') ||
      this.stringAt(this.current - 3, 'HOLZ', 'HERZ', 'MERZ', 'FITZ') ||
      (this.stringAt(this.current - 3, 'GANZ') && !this.isVowel(this.current + 1)) ||
      this.stringAt(this.current - 4, 'STOLZ', 'PRINZ') ||
      this.stringAt(this.current - 4, 'VENEZIA') ||
      this.stringAt(this.current - 3, 'HERZOG') ||
      // german words beginning with "sch-" but not schlimazel, schmooze
      (this.inWord.includes('SCH') && !this.stringAt(this.last - 2, 'IZE', 'OZE', 'ZEL')) ||
      (this.current > 0 && this.stringAt(this.current, 'ZEIT')) ||
      this.stringAt(this.current - 3, 'WEIZ')
    ) {
      if (this.current > 0 && this.inWord.charAt(this.current - 1) === 'T') {
        this.metaphAdd('S');
      } else {
        this.metaphAdd('TS');
      }
      this.current++;
      return true;
    }

    return false;
  }

  /**
   * Encode "-ZH-" as J
   *
   * @returns true if encoding handled in this routine, false if not
   *
   */
  private encodeZh(): boolean {
    //chinese pinyin e.g. 'zhao', also english "phonetic spelling"
    if (this.charAt(this.current + 1) === 'H') {
      this.metaphAdd('J');
      this.current += 2;
      return true;
    }

    return false;
  }

  /**
   * Test for names derived from the swedish,
   * dutch, or slavic that should get an alternate
   * pronunciation of 'SV' to match the native
   * version
   *
   * @returns true if swedish, dutch, or slavic derived name
   */
  private namesBeginningWithSwThatGetAltSv(): boolean {
    if (
      this.stringAt(0, 'SWANSON', 'SWENSON', 'SWINSON', 'SWENSEN', 'SWOBODA') ||
      this.stringAt(0, 'SWIDERSKI', 'SWARTHOUT') ||
      this.stringAt(0, 'SWEARENGIN')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test for names derived from the german
   * that should get an alternate pronunciation
   * of 'XV' to match the german version spelled
   * "schw-"
   *
   * @returns true if german derived name
   */
  private namesBeginningWithSwThatGetAltXv(): boolean {
    if (
      this.stringAt(0, 'SWART') ||
      this.stringAt(0, 'SWARTZ', 'SWARTS', 'SWIGER') ||
      this.stringAt(0, 'SWITZER', 'SWANGER', 'SWIGERT', 'SWIGART', 'SWIHART') ||
      this.stringAt(0, 'SWEITZER', 'SWATZELL', 'SWINDLER') ||
      this.stringAt(0, 'SWINEHART') ||
      this.stringAt(0, 'SWEARINGEN')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test whether the word in question
   * is a name of germanic or slavic origin, for
   * the purpose of determining whether to add an
   * alternate encoding of 'V'
   *
   * @returns true if germanic or slavic name
   */
  private germanicOrSlavicNameBeginningWithW(): boolean {
    if (
      this.stringAt(0, 'WEE', 'WIX', 'WAX') ||
      this.stringAt(
        0,
        'WOLF',
        'WEIS',
        'WAHL',
        'WALZ',
        'WEIL',
        'WERT',
        'WINE',
        'WILK',
        'WALT',
        'WOLL',
        'WADA',
        'WULF',
        'WEHR',
        'WURM',
        'WYSE',
        'WENZ',
        'WIRT',
        'WOLK',
        'WEIN',
        'WYSS',
        'WASS',
        'WANN',
        'WINT',
        'WINK',
        'WILE',
        'WIKE',
        'WIER',
        'WELK',
        'WISE',
      ) ||
      this.stringAt(
        0,
        'WIRTH',
        'WIESE',
        'WITTE',
        'WENTZ',
        'WOLFF',
        'WENDT',
        'WERTZ',
        'WILKE',
        'WALTZ',
        'WEISE',
        'WOOLF',
        'WERTH',
        'WEESE',
        'WURTH',
        'WINES',
        'WARGO',
        'WIMER',
        'WISER',
        'WAGER',
        'WILLE',
        'WILDS',
        'WAGAR',
        'WERTS',
        'WITTY',
        'WIENS',
        'WIEBE',
        'WIRTZ',
        'WYMER',
        'WULFF',
        'WIBLE',
        'WINER',
        'WIEST',
        'WALKO',
        'WALLA',
        'WEBRE',
        'WEYER',
        'WYBLE',
        'WOMAC',
        'WILTZ',
        'WURST',
        'WOLAK',
        'WELKE',
        'WEDEL',
        'WEIST',
        'WYGAN',
        'WUEST',
        'WEISZ',
        'WALCK',
        'WEITZ',
        'WYDRA',
        'WANDA',
        'WILMA',
        'WEBER',
      ) ||
      this.stringAt(
        0,
        'WETZEL',
        'WEINER',
        'WENZEL',
        'WESTER',
        'WALLEN',
        'WENGER',
        'WALLIN',
        'WEILER',
        'WIMMER',
        'WEIMER',
        'WYRICK',
        'WEGNER',
        'WINNER',
        'WESSEL',
        'WILKIE',
        'WEIGEL',
        'WOJCIK',
        'WENDEL',
        'WITTER',
        'WIENER',
        'WEISER',
        'WEXLER',
        'WACKER',
        'WISNER',
        'WITMER',
        'WINKLE',
        'WELTER',
        'WIDMER',
        'WITTEN',
        'WINDLE',
        'WASHER',
        'WOLTER',
        'WILKEY',
        'WIDNER',
        'WARMAN',
        'WEYANT',
        'WEIBEL',
        'WANNER',
        'WILKEN',
        'WILTSE',
        'WARNKE',
        'WALSER',
        'WEIKEL',
        'WESNER',
        'WITZEL',
        'WROBEL',
        'WAGNON',
        'WINANS',
        'WENNER',
        'WOLKEN',
        'WILNER',
        'WYSONG',
        'WYCOFF',
        'WUNDER',
        'WINKEL',
        'WIDMAN',
        'WELSCH',
        'WEHNER',
        'WEIGLE',
        'WETTER',
        'WUNSCH',
        'WHITTY',
        'WAXMAN',
        'WILKER',
        'WILHAM',
        'WITTIG',
        'WITMAN',
        'WESTRA',
        'WEHRLE',
        'WASSER',
        'WILLER',
        'WEGMAN',
        'WARFEL',
        'WYNTER',
        'WERNER',
        'WAGNER',
        'WISSER',
      ) ||
      this.stringAt(
        0,
        'WISEMAN',
        'WINKLER',
        'WILHELM',
        'WELLMAN',
        'WAMPLER',
        'WACHTER',
        'WALTHER',
        'WYCKOFF',
        'WEIDNER',
        'WOZNIAK',
        'WEILAND',
        'WILFONG',
        'WIEGAND',
        'WILCHER',
        'WIELAND',
        'WILDMAN',
        'WALDMAN',
        'WORTMAN',
        'WYSOCKI',
        'WEIDMAN',
        'WITTMAN',
        'WIDENER',
        'WOLFSON',
        'WENDELL',
        'WEITZEL',
        'WILLMAN',
        'WALDRUP',
        'WALTMAN',
        'WALCZAK',
        'WEIGAND',
        'WESSELS',
        'WIDEMAN',
        'WOLTERS',
        'WIREMAN',
        'WILHOIT',
        'WEGENER',
        'WOTRING',
        'WINGERT',
        'WIESNER',
        'WAYMIRE',
        'WHETZEL',
        'WENTZEL',
        'WINEGAR',
        'WESTMAN',
        'WYNKOOP',
        'WALLICK',
        'WURSTER',
        'WINBUSH',
        'WILBERT',
        'WALLACH',
        'WYNKOOP',
        'WALLICK',
        'WURSTER',
        'WINBUSH',
        'WILBERT',
        'WALLACH',
        'WEISSER',
        'WEISNER',
        'WINDERS',
        'WILLMON',
        'WILLEMS',
        'WIERSMA',
        'WACHTEL',
        'WARNICK',
        'WEIDLER',
        'WALTRIP',
        'WHETSEL',
        'WHELESS',
        'WELCHER',
        'WALBORN',
        'WILLSEY',
        'WEINMAN',
        'WAGAMAN',
        'WOMMACK',
        'WINGLER',
        'WINKLES',
        'WIEDMAN',
        'WHITNER',
        'WOLFRAM',
        'WARLICK',
        'WEEDMAN',
        'WHISMAN',
        'WINLAND',
        'WEESNER',
        'WARTHEN',
        'WETZLER',
        'WENDLER',
        'WALLNER',
        'WOLBERT',
        'WITTMER',
        'WISHART',
        'WILLIAM',
      ) ||
      this.stringAt(
        0,
        'WESTPHAL',
        'WICKLUND',
        'WEISSMAN',
        'WESTLUND',
        'WOLFGANG',
        'WILLHITE',
        'WEISBERG',
        'WALRAVEN',
        'WOLFGRAM',
        'WILHOITE',
        'WECHSLER',
        'WENDLING',
        'WESTBERG',
        'WENDLAND',
        'WININGER',
        'WHISNANT',
        'WESTRICK',
        'WESTLING',
        'WESTBURY',
        'WEITZMAN',
        'WEHMEYER',
        'WEINMANN',
        'WISNESKI',
        'WHELCHEL',
        'WEISHAAR',
        'WAGGENER',
        'WALDROUP',
        'WESTHOFF',
        'WIEDEMAN',
        'WASINGER',
        'WINBORNE',
      ) ||
      this.stringAt(
        0,
        'WHISENANT',
        'WEINSTEIN',
        'WESTERMAN',
        'WASSERMAN',
        'WITKOWSKI',
        'WEINTRAUB',
        'WINKELMAN',
        'WINKFIELD',
        'WANAMAKER',
        'WIECZOREK',
        'WIECHMANN',
        'WOJTOWICZ',
        'WALKOWIAK',
        'WEINSTOCK',
        'WILLEFORD',
        'WARKENTIN',
        'WEISINGER',
        'WINKLEMAN',
        'WILHEMINA',
      ) ||
      this.stringAt(
        0,
        'WISNIEWSKI',
        'WUNDERLICH',
        'WHISENHUNT',
        'WEINBERGER',
        'WROBLEWSKI',
        'WAGUESPACK',
        'WEISGERBER',
        'WESTERVELT',
        'WESTERLUND',
        'WASILEWSKI',
        'WILDERMUTH',
        'WESTENDORF',
        'WESOLOWSKI',
        'WEINGARTEN',
        'WINEBARGER',
        'WESTERBERG',
        'WANNAMAKER',
        'WEISSINGER',
      ) ||
      this.stringAt(0, 'WALDSCHMIDT', 'WEINGARTNER', 'WINEBRENNER') ||
      this.stringAt(0, 'WOLFENBARGER') ||
      this.stringAt(0, 'WOJCIECHOWSKI')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Test whether the word in question
   * is a name starting with 'J' that should
   * match names starting with a 'Y' sound.
   * All forms of 'John', 'Jane', etc, get
   * and alt to match e.g. 'Ian', 'Yana'. Joelle
   * should match 'Yael', 'Joseph' should match
   * 'Yusef'. German and slavic last names are
   * also included.
   *
   * @returns true if name starting with 'J' that
   * should get an alternate encoding as a vowel
   */
  private namesBeginningWithJThatGetAltY(): boolean {
    if (
      this.stringAt(0, 'JAN', 'JON', 'JAN', 'JIN', 'JEN') ||
      this.stringAt(
        0,
        'JUHL',
        'JULY',
        'JOEL',
        'JOHN',
        'JOSH',
        'JUDE',
        'JUNE',
        'JONI',
        'JULI',
        'JENA',
        'JUNG',
        'JINA',
        'JANA',
        'JENI',
        'JOEL',
        'JANN',
        'JONA',
        'JENE',
        'JULE',
        'JANI',
        'JONG',
        'JOHN',
        'JEAN',
        'JUNG',
        'JONE',
        'JARA',
        'JUST',
        'JOST',
        'JAHN',
        'JACO',
        'JANG',
        'JUDE',
        'JONE',
      ) ||
      this.stringAt(
        0,
        'JOANN',
        'JANEY',
        'JANAE',
        'JOANA',
        'JUTTA',
        'JULEE',
        'JANAY',
        'JANEE',
        'JETTA',
        'JOHNA',
        'JOANE',
        'JAYNA',
        'JANES',
        'JONAS',
        'JONIE',
        'JUSTA',
        'JUNIE',
        'JUNKO',
        'JENAE',
        'JULIO',
        'JINNY',
        'JOHNS',
        'JACOB',
        'JETER',
        'JAFFE',
        'JESKE',
        'JANKE',
        'JAGER',
        'JANIK',
        'JANDA',
        'JOSHI',
        'JULES',
        'JANTZ',
        'JEANS',
        'JUDAH',
        'JANUS',
        'JENNY',
        'JENEE',
        'JONAH',
        'JONAS',
        'JACOB',
        'JOSUE',
        'JOSEF',
        'JULES',
        'JULIE',
        'JULIA',
        'JANIE',
        'JANIS',
        'JENNA',
        'JANNA',
        'JEANA',
        'JENNI',
        'JEANE',
        'JONNA',
      ) ||
      this.stringAt(
        0,
        'JORDAN',
        'JORDON',
        'JOSEPH',
        'JOSHUA',
        'JOSIAH',
        'JOSPEH',
        'JUDSON',
        'JULIAN',
        'JULIUS',
        'JUNIOR',
        'JUDITH',
        'JOESPH',
        'JOHNIE',
        'JOANNE',
        'JEANNE',
        'JOANNA',
        'JOSEFA',
        'JULIET',
        'JANNIE',
        'JANELL',
        'JASMIN',
        'JANINE',
        'JOHNNY',
        'JEANIE',
        'JEANNA',
        'JOHNNA',
        'JOELLE',
        'JOVITA',
        'JOSEPH',
        'JONNIE',
        'JANEEN',
        'JANINA',
        'JOANIE',
        'JAZMIN',
        'JOHNIE',
        'JANENE',
        'JOHNNY',
        'JONELL',
        'JENELL',
        'JANETT',
        'JANETH',
        'JENINE',
        'JOELLA',
        'JOEANN',
        'JULIAN',
        'JOHANA',
        'JENICE',
        'JANNET',
        'JANISE',
        'JULENE',
        'JOSHUA',
        'JANEAN',
        'JAIMEE',
        'JOETTE',
        'JANYCE',
        'JENEVA',
        'JORDAN',
        'JACOBS',
        'JENSEN',
        'JOSEPH',
        'JANSEN',
        'JORDON',
        'JULIAN',
        'JAEGER',
        'JACOBY',
        'JENSON',
        'JARMAN',
        'JOSLIN',
        'JESSEN',
        'JAHNKE',
        'JACOBO',
        'JULIEN',
        'JOSHUA',
        'JEPSON',
        'JULIUS',
        'JANSON',
        'JACOBI',
        'JUDSON',
        'JARBOE',
        'JOHSON',
        'JANZEN',
        'JETTON',
        'JUNKER',
        'JONSON',
        'JAROSZ',
        'JENNER',
        'JAGGER',
        'JASMIN',
        'JEPSEN',
        'JORDEN',
        'JANNEY',
        'JUHASZ',
        'JERGEN',
        // TODO [>2.1]: JAKOB has 5 letters
        // 'JAKOB',
      ) ||
      this.stringAt(
        0,
        'JOHNSON',
        'JOHNNIE',
        'JASMINE',
        'JEANNIE',
        'JOHANNA',
        'JANELLE',
        'JANETTE',
        'JULIANA',
        'JUSTINA',
        'JOSETTE',
        'JOELLEN',
        'JENELLE',
        'JULIETA',
        'JULIANN',
        'JULISSA',
        'JENETTE',
        'JANETTA',
        'JOSELYN',
        'JONELLE',
        'JESENIA',
        'JANESSA',
        'JAZMINE',
        'JEANENE',
        'JOANNIE',
        'JADWIGA',
        'JOLANDA',
        'JULIANE',
        'JANUARY',
        'JEANICE',
        'JANELLA',
        'JEANETT',
        'JENNINE',
        'JOHANNE',
        'JOHNSIE',
        'JANIECE',
        'JOHNSON',
        'JENNELL',
        'JAMISON',
        'JANSSEN',
        'JOHNSEN',
        'JARDINE',
        'JAGGERS',
        'JURGENS',
        'JOURDAN',
        'JULIANO',
        'JOSEPHS',
        'JHONSON',
        'JOZWIAK',
        'JANICKI',
        'JELINEK',
        'JANSSON',
        'JOACHIM',
        'JANELLE',
        'JACOBUS',
        'JENNING',
        'JANTZEN',
        'JOHNNIE',
      ) ||
      this.stringAt(
        0,
        'JOSEFINA',
        'JEANNINE',
        'JULIANNE',
        'JULIANNA',
        'JONATHAN',
        'JONATHON',
        'JEANETTE',
        'JANNETTE',
        'JEANETTA',
        'JOHNETTA',
        'JENNEFER',
        'JULIENNE',
        'JOSPHINE',
        'JEANELLE',
        'JOHNETTE',
        'JULIEANN',
        'JOSEFINE',
        'JULIETTA',
        'JOHNSTON',
        'JACOBSON',
        'JACOBSEN',
        'JOHANSEN',
        'JOHANSON',
        'JAWORSKI',
        'JENNETTE',
        'JELLISON',
        'JOHANNES',
        'JASINSKI',
        'JUERGENS',
        'JARNAGIN',
        'JEREMIAH',
        'JEPPESEN',
        'JARNIGAN',
        'JANOUSEK',
      ) ||
      this.stringAt(
        0,
        'JOHNATHAN',
        'JOHNATHON',
        'JORGENSEN',
        'JEANMARIE',
        'JOSEPHINA',
        'JEANNETTE',
        'JOSEPHINE',
        'JEANNETTA',
        'JORGENSON',
        'JANKOWSKI',
        'JOHNSTONE',
        'JABLONSKI',
        'JOSEPHSON',
        'JOHANNSEN',
        'JURGENSEN',
        'JIMMERSON',
        'JOHANSSON',
      ) ||
      this.stringAt(0, 'JAKUBOWSKI')
    ) {
      return true;
    }

    return false;
  }
}

const m3 = new Metaphone3();

/**
 * Configuration options for the {@link metaphone3} algorithm.
 * @group Phonetic
 * @category Metaphone
 */
export type Metaphone3Options = {
  /**
   * Encodes consonants as exactly as possible.
   * This does not include 'S' vs. 'Z', since Americans will pronounce 'S' at the
   * end of many words as 'Z', nor does it include "CH" vs. "SH". It does cause
   * a distinction to be made between 'B' and 'P', 'D' and 'T', 'G' and 'K', and 'V'
   * and 'F'.
   *
   * @defaultValue false
   */
  encodeExact?: boolean;
  /**
   * Encodes non-initial vowels. However, even if there are more than one vowel sound
   * in a vowel sequence (i.e. vowel diphthong, etc.), only one 'A' will be encoded
   * before the next consonant or the end of the word.
   *
   * @defaultValue false
   */
  encodeVowels?: boolean;
};

/**
 * Takes in a word and returns the primary and alternate metaphone3 encodings
 *
 * @param word - The word to encode
 * @param config - The configuration options
 * @returns The primary and alternate metaphone3 encodings in that order
 * @group Phonetic
 * @category Metaphone
 */
export function metaphone3(word: StringLike, config?: Metaphone3Options): string[] {
  const text = keep(toString(word).replaceAll(/[\s\p{P}\p{S}]+/gv, ''), {
    letters: true,
    whitespace: true,
  }).trim();

  if (text === '') {
    return [];
  }

  const { encodeVowels = false, encodeExact = false } = config ?? {};

  m3.setEncodeExact(encodeExact);
  m3.setEncodeVowels(encodeVowels);
  m3.setWord(text);
  m3.encode();

  const pri = m3.getMetaph();
  const sec = m3.getAlternateMetaph();

  return sec ? [pri, sec] : [pri];
}
