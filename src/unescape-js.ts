/**
 * Unescape a string encoded in Javascript style
 *
 * @param input - the string to unescape
 * @returns the string with escapes resolved
 */
export function unescapeJS(input: string): string {
  return input.replaceAll(
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
