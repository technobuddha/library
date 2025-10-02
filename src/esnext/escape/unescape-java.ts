import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';
/**
 * Unescape a string encoded in Java style
 *
 * | Escape Sequence    | Hex                  | Character                |
 * | ------------------ | -------------------- | ------------------------ |
 * | \\b                | 0x08                 | Backspace                |
 * | \\f                | 0x0c                 | Form Feed                |
 * | \\n                | 0x0a                 | New Line                 |
 * | \\r                | 0x0d                 | Carriage Return          |
 * | \\t                | 0x09                 | Tab                      |
 * | \\\\               | 0x5c                 | Backslash                |
 * | \\'                | 0x27                 | Single Quote             |
 * | \\"                | 0x22                 | Double Quote             |
 * | \\u····            | 0x0000-0xFFFF    | Unicode Escape           |
 * @param input - The string to unescape
 * @returns the string with escapes resolved
 * @example
 * ```typescript
 * unescapeJava('Hello\\nWorld'); // "Hello\nWorld"
 * unescapeJava('\\u20ac'); // "€"
 * unescapeJava('\\tTabbed'); // "\tTabbed"
 * unescapeJava('\\\\'); // "\\"
 * ```
 * @group Escape
 * @category Java
 */
export function unescapeJava(input: StringLike): string {
  return toString(input).replaceAll(
    // cspell:disable-next-line
    /\\(([bfnrt"'\\])|([0-7]{1,3})|(u+[0-9a-fA-F]{4}))/gv,
    (escape) => {
      const c = escape.charAt(1);

      if (c === 'b') {
        return '\b';
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
      if (c >= '0' && c <= '7') {
        return String.fromCharCode(Number.parseInt(escape.slice(1), 8));
      }
      if (c === 'u') {
        // Java allows multiple occurrences of 'u' in it's escape sequence

        return String.fromCharCode(Number.parseInt(escape.replace(/^u+/v, empty), 16));
      }

      return escape.slice(1);
    },
  );
}
