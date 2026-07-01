import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Unescape a string encoded in C style
 *
 * | Escape Sequence    | Hex                  | Character                |
 * | ------------------ | -------------------- | ------------------------ |
 * | \\0                | 0x00                 | NUL                      |
 * | \\a                | 0x07                 | Bell                     |
 * | \\b                | 0x08                 | Backspace                |
 * | \\e                | 0x1b                 | Escape                   |
 * | \\f                | 0x0c                 | Form Feed                |
 * | \\n                | 0x0a                 | New Line                 |
 * | \\r                | 0x0d                 | Carriage Return          |
 * | \\t                | 0x09                 | Tab                      |
 * | \\v                | 0x0b                 | Vertical Tab             |
 * | \\\\               | 0x5c                 | Backslash                |
 * | \\'                | 0x27                 | Single Quote             |
 * | \\"                | 0x22                 | Double Quote             |
 * | \\?                | 0x3f                 | Question Mark            |
 * | \\···[^1]          | 0x0000-0x01ff    | Octal Escape             |
 * | \\x·…[^2]          |                      | Hex Escape               |
 * | \\u····            | 0x0000-0xFFFF    | Unicode Escape           |
 * | \\U········        | 0x0000-0x10FFFF  | Unicode Escape           |
 *
 * [^1]: An octal escape sequence consists of a backslash followed by one to three octal digits.
 * The octal escape sequence ends when it either contains three octal digits, or the next character
 * is not an octal digit.
 * [^2]: A hex escape sequence must have at least one hex digit following \\x, with no upper bound;
 * it continues for as many hex digits as there are.
 * @param input - The string to unescape
 * @returns the string with escapes resolved
 * @example
 * ```typescript
 * unescapeC('Hello\\nWorld'); // "Hello\nWorld"
 * unescapeC('\\x48\\x65\\x6c\\x6c\\x6f'); // "Hello"
 * unescapeC('\\u20ac'); // "€"
 * unescapeC('\\U0001f600'); // "😀"
 * ```
 * @group Escape
 * @category C
 */
export function unescapeC(input: StringLike): string {
  return toString(input).replaceAll(
    // cspell:disable-next-line
    /\\(([abefnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]+)|(U[0-9a-fA-F]{8})|(u[0-9a-fA-F]{4})|.)/gv,
    (escape) => {
      const c = escape.charAt(1);

      if (c === 'a') {
        return '\u{7}';
      }
      if (c === 'b') {
        return '\b';
      }
      if (c === 'e') {
        return '\u{1B}';
      }
      if (c === 'f') {
        return '\f';
      }
      if (c === 'n') {
        return '\n';
      }
      if (c === 'r') {
        return '\r';
      }
      if (c === 't') {
        return '\t';
      }
      if (c === 'v') {
        return '\v';
      }
      if (c >= '0' && c <= '7') {
        return String.fromCodePoint(Number.parseInt(escape.slice(1), 8));
      }
      if (c === 'x') {
        return String.fromCodePoint(Number.parseInt(escape.slice(2), 16));
      }
      if (c === 'U' || c === 'u') {
        return String.fromCodePoint(Number.parseInt(escape.slice(2), 16));
      }

      return escape.slice(1);
    },
  );
}
