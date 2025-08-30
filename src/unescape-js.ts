// cspell:ignore unnnn
/**
 * Unescape a string encoded in Javascript style
 *
 * | Escape Sequence      | Character          | Hex                  |
 * | -------------------- | ------------------ | -------------------- |
 * | \\b                  | Backspace          | 0x08                 |
 * | \\t                  | Tab                | 0x09                 |
 * | \\n                  | Newline            | 0x0a                 |
 * | \\v                  | Vertical Tab       | 0x0b                 |
 * | \\f                  | Form Feed          | 0x0c                 |
 * | \\r                  | Carriage Return    | 0x0d                 |
 * | \\"                  | Double Quote       | 0x22                 |
 * | \\'                  | Single Quote       | 0x27                 |
 * | \\\\                 | Backslash          | 0x5c                 |
 * | \\n…n[^1]            | Octal Escape       | 0x0000-0x01ff    |
 * | \\xnn                | Hexadecimal Escape | 0x0000-0x00ff    |
 * | \\unnnn              | Unicode Escape     | 0x00000-0x00ffff   |
 * | \\u\{code-point\}    | Code Point Escape  | 0x00000-0x10ffff   |
 * @param input - the string to unescape
 * @returns the string with escapes resolved
 * @example
 * ```typescript
 * unescapeJS('Hello\\nWorld'); // "Hello\nWorld"
 * unescapeJS('\\u20ac'); // "€"
 * unescapeJS('\\x48\\x65\\x6c\\x6c\\x6f'); // "Hello"
 * unescapeJS('\\u{1F600}'); // "😀"
 * ```
 * @group Encoding
 * @category Escaping
 */
export function unescapeJS(input: string): string {
  return input.replaceAll(
    //cspell:ignore bfnrtv
    /\\(([bfnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]{2})|(u[0-9a-fA-F]{4})|(u\{[0-9a-fA-F]{1,}\})|.)/gu,
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
      if (c === 'v') {
        return '\v';
      }
      if (c >= '0' && c <= '7') {
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape.slice(1), 8));
      }
      if (c === 'x') {
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape.slice(2), 16));
      }
      if (c === 'u') {
        if (escape.charAt(2) === '{') {
          return String.fromCodePoint(Number.parseInt(escape.slice(3, -1), 16));
        }
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape.slice(2), 16));
      }

      return escape.slice(1);
    },
  );
}
