import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

/**
 * Options for the {@link chunk} function.
 *
 * @group Tokenization
 * @category Chunking
 */
export type ChunkOptions = {
  /**
   * If true, the last chunk will be omitted if it has insufficient elements/characters.
   */
  truncate?: boolean;
};

/**
 * Chunks a string into substrings of a specified size.
 *
 * @param text - The input string to chunk.
 * @param size - The size of each chunk.
 * @param options - Options for chunking.
 * @returns An iterable that yields string chunks.
 * @example
 * ```ts
 * for (const part of chunk('abcdef', 2)) {
 *   console.log(part); // Logs 'ab', 'cd', 'ef'
 * }
 * ```
 */
export function chunk(text: StringLike, size: number, options?: ChunkOptions): Generator<string>;

/**
 * Chunks an iterable into arrays of a specified size.
 *
 * @typeParam T - The type of elements in the iterable.
 * @param iterable - The input iterable to chunk.
 * @param size - The size of each chunk.
 * @param options - Options for chunking.
 * @returns An iterable that yields array chunks.
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * for (const part of chunk(numbers, 2)) {
 *   console.log(part); // Logs [1, 2], [3, 4], [5]
 * }
 * ```
 */
export function chunk<T>(
  iterable: Iterable<T>,
  size: number,
  options?: ChunkOptions,
): Generator<T[]>;

/**
 * Chunks a string or iterable into smaller chunks of a specified size.
 * @group Tokenization
 * @category Chunking
 */
export function* chunk<T>(
  iterable: Iterable<T> | StringLike,
  size: number,
  { truncate = false }: ChunkOptions = {},
): Generator<T[] | string> {
  if (size <= 0) {
    throw new TypeError('Chunk size must be a positive integer');
  }

  if (isStringLike(iterable)) {
    let currentChunk = empty;
    for (const char of toString(iterable)) {
      currentChunk += char;
      if (currentChunk.length >= size) {
        yield currentChunk;
        currentChunk = empty;
      }
    }
    if (!truncate && currentChunk.length > 0) {
      yield currentChunk;
    }
    return;
  }

  let currentChunk: T[] = [];
  for (const item of iterable) {
    currentChunk.push(item);
    if (currentChunk.length >= size) {
      yield currentChunk;
      currentChunk = [];
    }
  }
  if (!truncate && currentChunk.length > 0) {
    yield currentChunk;
  }
}
