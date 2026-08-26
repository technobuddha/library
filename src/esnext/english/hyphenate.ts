import { exceptions, tree } from '../@data/hyphenation.ts';
import { create1dArray } from '../array/create1d-array.ts';
import { isArray } from '../array/is-array.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Hyphenation algorithm for tokenizing words into hyphenated segments.
 *
 * Uses language-specific hyphenation patterns and exceptions to split words into hyphenated tokens.
 * @param input - The word to hyphenate.
 * @returns An array of strings representing the hyphenated segments of the input word.
 *
 * @example
 * ```ts
 * hyphenate('hyphenation'); // ['hy', 'phen', 'ation']
 * ```
 * @group English
 * @category Hyphenation
 */
export function hyphenate(input: StringLike): readonly string[] {
  const text = toString(input);
  // Convert input to lowercase for pattern matching
  const word = text.toLowerCase();

  // If the word is too short, it doesn't need to be hyphenated
  if (word.length <= 4) {
    return [word];
  }

  // Handle language-specific hyphenation exceptions
  if (Object.hasOwn(exceptions, word)) {
    const exc = exceptions[word];
    // Map exception tokens to match input casing
    if (text === text.toUpperCase()) {
      // All uppercase input
      return exc.map((token) => token.toUpperCase());
    }
    if (text === text.toLowerCase()) {
      // All lowercase input
      return exc;
    }
    // Mixed or title case: map each token to match the casing of the corresponding input substring
    let idx = 0;
    return exc.map((token) => {
      const part = text.slice(idx, idx + token.length);
      idx += token.length;
      // If part is all uppercase, return token in uppercase
      if (part === part.toUpperCase()) {
        return token.toUpperCase();
      }
      // If part is all lowercase, return token
      if (part === part.toLowerCase()) {
        return token;
      }
      // Otherwise, preserve the casing of the input substring
      return Array.from(token, (_, i) => part[i]).join('');
    });
  }

  // Retrieving the stored hyphenation points
  const code = `.${word}.`;
  const points = create1dArray(code.length + 1, 0);

  // Traverse the hyphenation tree to assign points
  for (let i = 0, l = code.length; i < l; i++) {
    let branch = tree;

    for (let j = i; j < l; j++) {
      const character = code[j];

      if (Object.hasOwn(branch, character)) {
        const next = branch[character];

        branch = next as typeof tree;

        if ('points' in branch && isArray(branch.points)) {
          const pointsArray = branch.points as number[];
          for (let k = 0, n = pointsArray.length; k < n; k++) {
            points[i + k] = Math.max(points[i + k], pointsArray[k]);
          }
        }
      } else {
        break;
      }
    }
  }

  // No hyphens in the first two characters or the last two
  points[1] = 0;
  points[2] = 0;
  points[points.length - 2] = 0;
  points[points.length - 3] = 0;

  // Build the hyphenated tokens (preserve input casing)
  const tokens = [''];

  for (let i = 0, l = text.length; i < l; i++) {
    tokens[tokens.length - 1] += text[i];
    if (points[i + 2] % 2) {
      tokens.push('');
    }
  }

  return tokens;
}
