/**
 * Options for {@link isSurrogate}
 * @group Unicode
 * @category Is Surrogate
 */
export type IsSurrogateOptions = {
  /** test for high surrogates (D800-DBFF) */
  high?: boolean;
  /** test for low surrogates (DC00-DFFF) */
  low?: boolean;
};

/**
 * Determine is a character is a surrogate
 *
 * @param input - the character to test
 * @param options - see {@link IsSurrogateOptions}
 * @defaultValue high true
 * @defaultValue low true
 * @returns true if the specified character is a unicode surrogate
 * @group Unicode
 * @category Is Surrogate
 */
export function isSurrogate(
  input: string,
  { high = true, low = true }: IsSurrogateOptions = {},
): boolean {
  // eslint-disable-next-line unicorn/prefer-code-point
  const cc = input.charCodeAt(0);

  return (high && cc >= 0xd800 && cc <= 0xdbff) || (low && cc >= 0xdc00 && cc <= 0xdfff);
}
