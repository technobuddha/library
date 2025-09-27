/**
 * Determine is a character is a surrogate
 * @param input - the character to test, or the character code
 * @param options - see {@link IsSurrogateOptions}
 * @defaultValue high true
 * @defaultValue low true
 * @returns true if the specified character is a unicode surrogate
 * @group Unicode
 * @category Is Surrogate
 */
export function isSurrogate(input: string | number): boolean {
  return isSurrogateHigh(input) || isSurrogateLow(input);
}

/**
 * Determine is a character is a surrogate
 * @param input - the character to test, or the character code
 * @param options - see {@link IsSurrogateOptions}
 * @defaultValue high true
 * @defaultValue low true
 * @returns true if the specified character is a unicode surrogate
 * @group Unicode
 * @category Is Surrogate
 */
export function isSurrogateLow(input: string | number): boolean {
  const cc = typeof input === 'string' ? input.charCodeAt(0) : input;

  return cc >= 0xdc00 && cc <= 0xdfff;
}

/**
 * Determine is a character is a high surrogate
 * @param input - the character to test, or the character code
 * @returns true if the specified character is a unicode high surrogate
 * @group Unicode
 * @category Is Surrogate
 */
export function isSurrogateHigh(input: string | number): boolean {
  const cc = typeof input === 'string' ? input.charCodeAt(0) : input;

  return cc >= 0xd800 && cc <= 0xdbff;
}
