/**
 * Unescape a string encoded in Java style
 *
 * @param input - The string to unescape
 * @returns the string with escapes resolved
 * @group Encoding
 * @category Escaping
 */
export function unescapeJava(input: string): string {
  // cspell:ignore bfnrt
  return input.replaceAll(/\\(([bfnrt"'\\])|([0-7]{1,3})|(u[0-9a-fA-F]{4}))/gu, (escape) => {
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
      // eslint-disable-next-line unicorn/prefer-code-point
      return String.fromCharCode(Number.parseInt(escape.slice(1), 8));
    }
    if (c === 'u') {
      // eslint-disable-next-line unicorn/prefer-code-point
      return String.fromCharCode(Number.parseInt(escape.slice(2), 16));
    }

    return escape.slice(1);
  });
}
