/**
 * Unescape a string encoded in Python style
 *
 * @param input - The string to unescape
 * @returns the string with escapes resolved
 * @group Encoding
 * @category Python
 */
export function unescapePython(input: string): string {
  return input.replaceAll(
    //cspell:ignore abfnrtv
    /\\(([abfnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]+)|(U[0-9a-fA-F]{8})|(u[0-9a-fA-F]{4})|(N\[.*\])|.)/gu,
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
