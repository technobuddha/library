import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Removes surrounding quotes from a string and handles escaped quotes.
 *
 * This function removes the first and last character of the input string
 * if they are matching quotes (single or double). It also resolves escaped
 * quotes within the string, either by unescaping backslashes (e.g., `\"`)
 * or by collapsing repeated quotes (e.g., `""` to `"`).
 *
 * @param input - The string to unquote.
 * @returns The unquoted string with escapes resolved.
 *
 * @example
 * ```typescript
 * unquote('"Hello"'); // Hello
 * unquote("'Hello'"); // Hello
 * unquote('"He said, \"Hello!\""'); // He said, "Hello!"
 * unquote("'It''s a test'"); // It's a test
 * ```
 *
 * @group String
 * @category Construction
 */
export function unquote(input: StringLike): string {
  let text = toString(input);
  const q = text.at(0);
  if (q) {
    if (text.startsWith(q) && text.endsWith(q)) {
      text = text.slice(1, -1);

      if (text.includes(`\\${q}`)) {
        text = text.replaceAll(`\\${q}`, q);
      } else if (text.includes(q + q)) {
        text = text.replaceAll(q + q, q);
      }
    }
  }
  return text;
}
