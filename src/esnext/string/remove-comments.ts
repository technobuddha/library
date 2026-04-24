/* eslint-disable unicorn/prefer-switch */
import { splitChars } from '../tokenization/split-chars.ts';
import { isWhitespace } from '../unicode/is-whitespace.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for stripping unwanted characters or sequences from strings.
 * @group String
 * @category Clean
 */
export type RemoveCommentsOptions = {
  /**
   * If true, extra commas are removed
   */
  removeExtraCommas?: boolean;
  /**
   * The string to replace stripped content with. Defaults to an empty string.
   */
  replacement?: string;
};

/**
 * Removes unwanted sequences from the input string.
 *
 * This function can strip various types of content from strings including ANSI escape codes,
 * non-digit characters, non-alphabetic characters, and comments.
 *
 * @param text - The string to be processed
 * @param options - Options to control what is stripped. See {@link RemoveCommentsOptions}
 * @returns The processed string with specified sequences removed
 *
 * @example
 * ```typescript
 * // Remove comments
 * removeComments('code // comment\nmore code /* block *\/', { comments: true });
 * // 'code \nmore code '
 *

 * ```
 *
 * @group String
 * @category Clean
 */
export function removeComments(
  text: StringLike,
  { replacement = empty, removeExtraCommas = true }: RemoveCommentsOptions = {},
): string {
  const str = toString(text);

  const result: string[] = [];

  const chars = splitChars(str).values();
  let char: ReturnType<typeof chars.next>;

  function comment(): boolean {
    char = chars.next();
    if (char.done) {
      result.push('/');
      return false;
    } else if (char.value === '/') {
      result.push(replacement, replacement);

      while (true) {
        char = chars.next();
        if (char.done) {
          return true;
        } else if (char.value === '\n' || char.value === '\r') {
          result.push(char.value);
          return true;
        }
        result.push(replacement);
      }
    } else if (char.value === '*') {
      result.push(replacement, replacement);

      while (true) {
        char = chars.next();

        if (char.done) {
          return true;
        }
        if (char.value === '*') {
          char = chars.next();
          if (char.done) {
            result.push(replacement);
            return true;
          } else if (char.value === '/') {
            result.push(replacement, replacement);
            return true;
          }
          result.push(replacement, replacement);
        } else {
          result.push(replacement);
        }
      }
    } else {
      result.push('/', char.value);
      return false;
    }
  }

  function quotes(quote: string): void {
    result.push(quote);

    while (true) {
      char = chars.next();
      if (char.done) {
        return;
      } else if (char.value === '\\') {
        result.push(char.value);
        char = chars.next();
        if (char.done) {
          return;
        }
        result.push(char.value);
      } else if (char.value === quote) {
        result.push(char.value);
        return;
      } else {
        result.push(char.value);
      }
    }
  }

  function template(): void {
    result.push('`');

    while (true) {
      char = chars.next();
      if (char.done) {
        return;
      } else if (char.value === '\\') {
        result.push(char.value);
        char = chars.next();
        if (char.done) {
          return;
        }
        result.push(char.value);
      } else if (char.value === '`') {
        result.push(char.value);
        return;
      } else if (char.value === '$') {
        expression();
      } else {
        result.push(char.value);
      }
    }
  }

  function expression(): void {
    result.push('$');
    char = chars.next();
    if (!char.done) {
      if (char.value === '{') {
        result.push('{');
        while (true) {
          char = chars.next();
          if (char.done) {
            return;
          }
          if (char.value === '/') {
            comment();
          } else if (removeExtraCommas && char.value === ',') {
            comma();
          } else if (char.value === '"' || char.value === "'") {
            quotes(char.value);
          } else if (char.value === '`') {
            template();
          } else if (char.value === '}') {
            result.push(char.value);
            return;
          } else {
            result.push(char.value);
          }
        }
      } else {
        result.push(char.value);
      }
    }
  }

  function comma(): void {
    const pos = result.length;
    result.push(',');

    while (true) {
      char = chars.next();
      if (char.done) {
        result[pos] = replacement;
        return;
      } else if (char.value === '/') {
        if (!comment()) {
          return;
        }
      } else if (isWhitespace(char.value)) {
        result.push(char.value);
      } else if (char.value === ')' || char.value === ']' || char.value === '}') {
        result[pos] = replacement;
        result.push(char.value);
        return;
      } else if (char.value === "'" || char.value === '"') {
        quotes(char.value);
        return;
      } else if (char.value === '`') {
        template();
      } else if (char.value === ',') {
        comma();
        return;
      } else {
        result.push(char.value);
        return;
      }
    }
  }

  function scan(): void {
    while (true) {
      char = chars.next();
      if (char.done) {
        return;
      }
      if (char.value === '/') {
        comment();
      } else if (char.value === ',') {
        comma();
      } else if (char.value === '"' || char.value === "'") {
        quotes(char.value);
      } else if (char.value === '`') {
        template();
      } else {
        result.push(char.value);
      }
    }
  }

  scan();

  return result.join(empty);
}
