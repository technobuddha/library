import { empty } from '../unicode/unicode.ts';

/**
 * Generates n-grams from a string.
 *
 * @param n - The size of each n-gram.
 * @param sequence - The string to tokenize.
 * @returns An array of string n-grams.
 * @example
 * ```ts
 * nGrams(2, 'hello'); // ['he', 'el', 'll', 'lo']
 * nGrams(3, 'hello'); // ['hel', 'ell', 'llo']
 * ```
 */
export function nGrams(n: number, sequence: string): string[];
/**
 * Generates n-grams from an iterable sequence.
 *
 * @typeParam T - The type of elements in the sequence.
 * @param n - The size of each n-gram.
 * @param sequence - The iterable to tokenize.
 * @returns An array of n-grams, each as an array of elements.
 * @example
 * ```ts
 * nGrams(2, [1,2,3,4]); // [[1,2], [2,3], [3,4]]
 * nGrams(3, [1,2,3,4]); // [[1,2,3], [2,3,4]]
 * ```
 */
export function nGrams<T>(n: number, sequence: Iterable<T>): T[][];
/**
 * Generates n-grams from a string or iterable sequence.
 *
 * An n-gram is a contiguous sequence of n items from a given sequence of text or data.
 * @group Iteration
 * @category N-Grams
 */
export function nGrams<T>(n: number, sequence: Iterable<T>): T[][] | string[] {
  if (n < 1) {
    throw new TypeError('n should be a positive integer > 0.');
  }

  const isString = typeof sequence === 'string';

  let i = 0;
  let j = 0;
  const subsequences: T[][] = [];

  for (const element of sequence) {
    for (let k = i; k <= j; k++) {
      subsequences[k] ??= [];
      subsequences[k].push(element);
    }

    j++;
    if (j - i >= n) {
      i++;
    }
  }

  return isString ? subsequences.slice(0, i).map((ss) => ss.join(empty)) : subsequences.slice(0, i);
}

/**
 * @example
 * ```ts
 * bigrams('hello'); // ['he', 'el', 'll', 'lo']
 * ```
 */
export function bigrams(sequence: string): string[];
/**
 * @example
 * ```ts
 * bigrams([1,2,3]); // [[1,2], [2,3]]
 * ```
 */
export function bigrams<T>(sequence: Iterable<T>): T[][];
/**
 * Alias for {@link nGrams} with n = 2 (bigrams).
 * @group Iteration
 * @category N-Grams
 */
export function bigrams<T>(sequence: Iterable<T>): T[][] | string[] {
  return nGrams(2, sequence);
}

/**
 * @example
 * ```ts
 * trigrams('hello'); // ['hel', 'ell', 'llo']
 * ```
 */
export function trigrams(sequence: string): string[];
/**
 * @example
 * ```ts
 * trigrams([1,2,3,4]); // [[1,2,3], [2,3,4]]
 * ```
 */
export function trigrams<T>(sequence: Iterable<T>): T[][];
/**
 * Alias for {@link nGrams} with n = 3 (trigrams).
 * @group Iteration
 * @category N-Grams
 */
export function trigrams<T>(sequence: Iterable<T>): T[][] | string[] {
  return nGrams(3, sequence);
}

/**
 * @example
 * ```ts
 * quadrigrams('hello'); // ['hell', 'ello']
 * ```
 */
export function quadrigrams(sequence: string): string[];
/**
 * @example
 * ```ts
 * quadrigrams([1,2,3,4,5]); // [[1,2,3,4], [2,3,4,5]]
 * ```
 */
export function quadrigrams<T>(sequence: Iterable<T>): T[][];
/**
 * Alias for {@link nGrams} with n = 4 (quadrigrams).
 * @group Iteration
 * @category N-Grams
 */
export function quadrigrams<T>(sequence: Iterable<T>): T[][] | string[] {
  return nGrams(4, sequence);
}
