/**
 * Converts a given word or number string to its ordinal form.
 *
 * Handles both numeric strings (e.g., "1", "2", "13") and English words (e.g., "one", "two", "three").
 * Applies appropriate ordinal suffixes ("st", "nd", "rd", "th") for numbers, and transforms
 * specific English words to their ordinal equivalents (e.g., "one" → "first", "five" → "fifth").
 * @param word - The input string representing a number or its English word form.
 * @returns The ordinal form of the input string.
 * @example
 * ```typescript
 * makeOrdinal("1");      // "1st"
 * makeOrdinal("2");      // "2nd"
 * makeOrdinal("3");      // "3rd"
 * makeOrdinal("4");      // "4th"
 * makeOrdinal("11");     // "11th"
 * makeOrdinal("one");    // "first"
 * makeOrdinal("five");   // "fifth"
 * makeOrdinal("twenty"); // "twentieth"
 * ```
 * @internal
 */
export function makeOrdinal(word: string): string {
  if (word.endsWith('11') || word.endsWith('12') || word.endsWith('13')) {
    return `${word}th`;
  }
  if (word.endsWith('1')) {
    return `${word}st`;
  }
  if (word.endsWith('2')) {
    return `${word}nd`;
  }
  if (word.endsWith('3')) {
    return `${word}rd`;
  }
  if (
    word.endsWith('4') ||
    word.endsWith('5') ||
    word.endsWith('6') ||
    word.endsWith('7') ||
    word.endsWith('8') ||
    word.endsWith('9') ||
    word.endsWith('0')
  ) {
    return `${word}th`;
  }

  if (word.endsWith('one')) {
    return `${word.slice(0, -3)}first`;
  }

  if (word.endsWith('two')) {
    return `${word.slice(0, -3)}second`;
  }

  if (word.endsWith('three')) {
    return `${word.slice(0, -5)}third`;
  }

  if (word.endsWith('five')) {
    return `${word.slice(0, -4)}fifth`;
  }

  if (word.endsWith('eight')) {
    return `${word.slice(0, -5)}eighth`;
  }

  if (word.endsWith('twelve')) {
    return `${word.slice(0, -6)}twelfth`;
  }

  if (word.endsWith('ty')) {
    // cspell:disable-next-line
    return `${word.slice(0, -2)}tieth`;
  }

  return `${word}th`;
}
