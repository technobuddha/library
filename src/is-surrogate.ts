type Options = {
  /** test for high surrogates (D800-DBFF) */
  high?: boolean;
  /** test for low surrogates (DC00-DFFF) */
  low?: boolean;
};

/**
 * Deterimine is a character is a surrogate
 *
 * @param input the character to test
 * @param __namedParameters see {@link Options}
 * @default high true
 * @defaultValue low true
 * @returns true if the specified character is a unicode surrogate
 */
export function isSurrogate(input: string, { high = true, low = true }: Options = {}): boolean {
  const cc = input.codePointAt(0)!;

  // cspell:ignore DBFF DFFF
  return (
    (high && cc >= 0x0000d800 && cc <= 0x0000dbff) || (low && cc >= 0x0000dc00 && cc <= 0xdfff)
  );
}

export default isSurrogate;
