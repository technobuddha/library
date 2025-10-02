import { floor } from '../math/floor.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Locate the best instance of a pattern in text near a specified location using fuzzy matching.
 *
 * This function implements a sophisticated pattern matching algorithm that finds the best match
 * for a given pattern within a text string, prioritizing matches closer to the specified location.
 * It first attempts exact matching and falls back to fuzzy matching using the Bitap algorithm
 * when an exact match is not found.
 *
 * @param text - The text to search within
 * @param pattern - The pattern to search for
 * @param location - The preferred location around which to search
 * @returns The index of the best match, or -1 if no suitable match is found

 *
 * @example
 * ```typescript
 * // Exact match at the preferred location
 * match("Hello World", "World", 6); // Returns 6
 *
 * // Fuzzy matching finds closest match
 * match("Hello World", "Wrld", 6); // Returns 6 (fuzzy match for "World")
 *
 * // No match found
 * match("Hello", "xyz", 2); // Returns -1
 * ```
 * @group String
 * @category Pattern Matching
 */
export function match(text: StringLike, pattern: StringLike, location: number): number {
  const str = toString(text);
  const pat = toString(pattern);
  const loc = Math.max(0, Math.min(location, str.length));

  if (str === pat) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (str.length === 0) {
    // Nothing to match.
    return -1;
  } else if (str.slice(loc, loc + pat.length) === pat) {
    // Perfect match at the perfect spot!  (Includes case of null pat)
    return loc;
  }

  // Do a fuzzy compare.
  return matchBitap(str, pat, loc);
}

/** Maximum number of bits supported by the Bitap algorithm */
const MATCH_MAXBITS = 32;

/** Maximum distance from the expected location for a match to be considered */
const MATCH_DISTANCE = 1000;

/** Threshold score above which matches are rejected (0.0 = perfect, 1.0 = terrible) */
const MATCH_THRESHOLD = 0.5;

/**
 * Locate the best instance of a pattern in text near a location using the Bitap algorithm.
 *
 * The Bitap algorithm (also known as the shift-or, shift-and, or Baeza-Yates-Gonnet algorithm)
 * is a fuzzy string matching algorithm that can find approximate matches. It uses bitwise
 * operations to efficiently track multiple potential matches simultaneously.
 *
 * @param text - The text to search within
 * @param pattern - The pattern to search for (must be ≤ 32 characters)
 * @param location - The preferred location around which to search
 * @returns The index of the best match, or -1 if no suitable match is found
 * @throws Error when pattern length exceeds MATCH_MAXBITS (32 characters)
 * @internal
 */
function matchBitap(text: string, pattern: string, location: number): number {
  if (pattern.length > MATCH_MAXBITS) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialize the alphabet.
  const s = matchAlphabet(pattern);

  /**
   * Compute and return the score for a match with a given number of errors at a specific location.
   *
   * The score combines accuracy (based on error count) with proximity to the preferred location.
   * Lower scores indicate better matches.
   *
   * @param e - Number of errors in the match
   * @param x - Location index of the match
   * @returns Overall match score where 0.0 represents a perfect match and 1.0 represents a terrible match
   * @internal
   */
  function matchBitapScore(e: number, x: number): number {
    const accuracy = e / pattern.length;
    const proximity = Math.abs(location - x);

    return accuracy + proximity / MATCH_DISTANCE;
  }

  // Highest score beyond which we give up.
  let scoreThreshold = MATCH_THRESHOLD;
  // Is there a nearby exact match? (speedup)
  let bestLoc = text.indexOf(pattern, location);
  if (bestLoc !== -1) {
    scoreThreshold = Math.min(matchBitapScore(0, bestLoc), scoreThreshold);
    // What about in the other direction? (speedup)
    bestLoc = text.lastIndexOf(pattern, location + pattern.length);
    if (bestLoc !== -1) {
      scoreThreshold = Math.min(matchBitapScore(0, bestLoc), scoreThreshold);
    }
  }

  // Initialize the bit arrays.
  const matchMask = 1 << (pattern.length - 1);
  bestLoc = -1;

  let binMin: number;
  let binMid: number;
  let binMax = pattern.length + text.length;
  let lastRD: number[] = [];
  for (let d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    binMin = 0;
    binMid = binMax;
    while (binMin < binMid) {
      if (matchBitapScore(d, location + binMid) <= scoreThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;
    let start = Math.max(1, location - binMid + 1);
    const finish = Math.min(location + binMid, text.length) + pattern.length;

    const rd = Array.from<number>({ length: finish + 2 });
    rd[finish + 1] = (1 << d) - 1;

    for (let j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates warnings.
      const charMatch = s[text.charAt(j - 1)];
      // Use ternary to satisfy the lint rule: first pass exact match, subsequent passes fuzzy match.
      rd[j] =
        d === 0 ?
          ((rd[j + 1] << 1) | 1) & charMatch
        : (((rd[j + 1] << 1) | 1) & charMatch) |
          (((lastRD[j + 1] | lastRD[j]) << 1) | 1) |
          lastRD[j + 1];

      if (rd[j] & matchMask) {
        const score = matchBitapScore(d, j - 1);
        scoreThreshold = score;
        bestLoc = j - 1;
        if (bestLoc > location) {
          // When passing location, don't exceed our current distance from location.
          start = Math.max(1, 2 * location - bestLoc);
        } else {
          // Already passed location, downhill from here on in.
          break;
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (matchBitapScore(d + 1, location) > scoreThreshold) {
      break;
    }
    lastRD = rd;
  }
  return bestLoc;
}

/**
 * Initialize the character alphabet bitmask for the Bitap algorithm.
 *
 * Creates a hash table that maps each character in the pattern to a bitmask
 * indicating all positions where that character appears. This preprocessing
 * step enables the efficient bitwise operations in the main Bitap algorithm.
 *
 * @param pattern - The pattern text to encode into bitmasks
 * @returns A hash table mapping each character to its position bitmask
 * @internal
 */
function matchAlphabet(pattern: string): { [key: string]: number } {
  const s: { [key: string]: number } = {};
  for (let i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (let i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
}
