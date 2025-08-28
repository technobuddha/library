// cspell:ignore unnnn Unnnnnnnn
/**
 * Unescape a string encoded in Python style
 *
 * | Escape Sequence    | Hex                  | Character                |
 * | ------------------ | -------------------- | ------------------------ |
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
 * | \\n…n[^1]          | 0x0000-0x01ff    | Octal Escape             |
 * | \\xnn              |                      | Hex Escape               |
 * | \\unnnn            | 0x0000-0xFFFF    | Unicode Escape           |
 * | \\Unnnnnnnn        | 0x0000-0x10FFFF  | Unicode Escape           |
 *
 * [^1]: An octal escape sequence consists of a backslash followed by one to three octal digits.
 * The octal escape sequence ends when it either contains three octal digits, or the next character
 * is not an octal digit.
 *
 * @param input - The string to unescape
 * @returns the string with escapes resolved
 * @example
 * ```typescript
 * unescapePython('Hello\\nWorld'); // "Hello\nWorld"
 * unescapePython('\\u20ac'); // "€"
 * unescapePython('\\x48\\x65\\x6c\\x6c\\x6f'); // "Hello"
 * unescapePython('\\U0001f600'); // "😀"
 * ```
 * @group Encoding
 * @category Escaping
 */
export function unescapePython(input: string): string {
  return input.replaceAll(
    //cspell:ignore abfnrtv
    /\\(([abfnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]{2})|(U[0-9a-fA-F]{8})|(u[0-9a-fA-F]{4})|(N\[.*\])|.)/gu,
    (escape) => {
      const c = escape.charAt(1);

      if (c === 'a') {
        return '\u0007';
      }
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
      if (c === '"') {
        return '"';
      }
      if (c === "'") {
        return "'";
      }
      if (c === '\\') {
        return '\\';
      }
      if (c === 'N') {
        throw new Error('N escape is not supported.');
      }
      if (c >= '0' && c <= '7') {
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape, 8));
      }
      if (c === 'x') {
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape.slice(2), 16));
      }
      if (c === 'U' || c === 'u') {
        // eslint-disable-next-line unicorn/prefer-code-point
        return String.fromCharCode(Number.parseInt(escape.slice(2), 16));
      }

      return escape;
    },
  );
}
