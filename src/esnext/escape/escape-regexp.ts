import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const reSpecialChars = /[.*+?^$\{\}\(\)\|\[\]\\]/gv;

/**
 * Escapes special characters in a string to be used as a literal pattern in a regular expression.
 *
 * This function escapes the following special RegExp metacharacters:
 * - `.` (dot) - matches any character
 * - `*` (asterisk) - matches 0 or more of the preceding token
 * - `+` (plus) - matches 1 or more of the preceding token
 * - `?` (question mark) - matches 0 or 1 of the preceding token
 * - `^` (caret) - matches the beginning of the string
 * - `$` (dollar) - matches the end of the string
 * - `{` and `}` (braces) - quantifier delimiters
 * - `(` and `)` (parentheses) - capturing group delimiters
 * - `|` (pipe) - alternation operator
 * - `[` and `]` (brackets) - character class delimiters
 * - `\` (backslash) - escape character
 *
 * @param string - The string containing special characters to escape
 * @returns The string with all special RegExp characters escaped with backslashes
 *
 * @example
 * ```typescript
 * escapeRegExp('Hello. How are you?');
 * // Returns: 'Hello\\. How are you\\?'
 * ```
 *
 * @example
 * ```typescript
 * const userInput = '1 + 1 = 2';
 * const pattern = new RegExp(escapeRegExp(userInput));
 * pattern.test('1 + 1 = 2'); // true
 * ```
 *
 * @example
 * ```typescript
 * escapeRegExp('Cost: $50 (USD)');
 * // Returns: 'Cost: \\$50 \\(USD\\)'
 * ```
 *
 * @example
 * ```typescript
 * escapeRegExp('[a-z]');
 * // Returns: '\\[a-z\\]'
 * ```
 *
 * @group Escape
 * @category RegExp
 */
export function escapeRegExp(string: StringLike): string {
  return toString(string).replaceAll(reSpecialChars, '\\$&');
}
