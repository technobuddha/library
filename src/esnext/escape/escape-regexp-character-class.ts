import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const reSpecialCharsInClass = /[.*+?^$\-\{\}\(\)\|\[\]\\]/gv;

/**
 * Escapes special characters in a string to be used as a literal pattern inside a regular expression character class.
 *
 * This function is similar to `escapeRegExp` but also escapes the hyphen (`-`) character, which has special meaning
 * inside character classes where it denotes a range (e.g., `[a-z]`). Use this function when building character class
 * patterns dynamically to ensure literal matching of all metacharacters.
 *
 * The following special characters are escaped:
 * - `.` (dot) - matches any character (when not in character class)
 * - `*` (asterisk) - matches 0 or more of the preceding token
 * - `+` (plus) - matches 1 or more of the preceding token
 * - `?` (question mark) - matches 0 or 1 of the preceding token
 * - `^` (caret) - negates character class or matches beginning
 * - `$` (dollar) - matches the end of the string
 * - `-` (hyphen) - denotes a range in character classes (e.g., `a-z`)
 * - `{` and `}` (braces) - quantifier delimiters
 * - `(` and `)` (parentheses) - capturing group delimiters
 * - `|` (pipe) - alternation operator
 * - `[` and `]` (brackets) - character class delimiters
 * - `\` (backslash) - escape character
 *
 * @param string - The string containing special characters to escape for use in a character class
 * @returns The string with all special RegExp characters escaped with backslashes
 *
 * @example
 * ```typescript
 * // Escape hyphen for use in character class
 * const pattern = `[${escapeRegExpCharacterClass('a-z')}]`;
 * // Returns: '[a\\-z]' (matches literal 'a', '-', or 'z', not a range)
 * ```
 *
 * @example
 * ```typescript
 * // Build a character class from user input
 * const chars = '.*+?';
 * const pattern = new RegExp(`[${escapeRegExpCharacterClass(chars)}]`, 'v');
 * pattern.test('.'); // true
 * pattern.test('*'); // true
 * pattern.test('x'); // false
 * ```
 *
 * @example
 * ```typescript
 * // Escape special characters including hyphen
 * escapeRegExpCharacterClass('[a-z]');
 * // Returns: '\\[a\\-z\\]'
 * ```
 *
 * @example
 * ```typescript
 * // Compare with range behavior
 * new RegExp('[a-z]').test('m'); // true (matches range)
 * new RegExp(`[${escapeRegExpCharacterClass('a-z')}]`).test('m'); // false (literal chars only)
 * ```
 *
 * @group Escape
 * @category RegExp
 */
export function escapeRegExpCharacterClass(string: StringLike): string {
  return toString(string).replaceAll(reSpecialCharsInClass, '\\$&');
}
