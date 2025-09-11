/**
 * Determines if the given character code corresponds to an octal digit (0-7).
 * @param c - The character code to check. Can be `undefined`.
 * @returns `true` if `c` is defined and is the character code for an octal digit ('0' to '7'), otherwise `false`.
 * @internal
 */
export const oct = (c: number | undefined): boolean => c !== undefined && c >= 0x30 && c <= 0x37;

/**
 * Determines if the given character code corresponds to a hexadecimal digit (0-9, A-F, a-f).
 * @param c - The character code to check. Can be `undefined`.
 * @returns `true` if `c` is defined and is the character code for a hexadecimal digit, otherwise `false`.
 * @internal
 */
export const hex = (c: number | undefined): boolean =>
  c !== undefined &&
  ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66));

/**
 * Converts a number to a two-digit hexadecimal escape sequence string prefixed with '\\x'.
 * @param c - The number to convert to a hexadecimal escape sequence.
 * @returns A string representing the hexadecimal escape sequence (e.g., '\\x0a').
 * @internal
 */
export const x2 = (c: number): string => `\\x${c.toString(16).padStart(2, '0')}`;

/**
 * Converts a number to a four-digit Unicode escape sequence string prefixed with '\\u'.
 * @param c - The number to convert to a Unicode escape sequence.
 * @returns A string representing the Unicode escape sequence (e.g., '\\u00a9').
 * @internal
 */
export const u4 = (c: number): string => `\\u${c.toString(16).padStart(4, '0')}`;

/**
 * Converts a number to an eight-digit Unicode escape sequence string prefixed with '\\U'.
 * @param c - The number to convert to a Unicode escape sequence.
 * @returns A string representing the Unicode escape sequence (e.g., '\\U0001f600').
 * @internal
 */
export const u8 = (c: number): string => `\\U${c.toString(16).padStart(8, '0')}`;

/**
 * Converts a number to a Unicode code point escape sequence string wrapped in '\\u\{\}'.
 * @param c - The number to convert to a Unicode code point escape sequence.
 * @returns A string representing the Unicode code point escape sequence (e.g., '\\u\{1F600\}').
 * @internal
 */
export const uu = (c: number): string => `\\u{${c.toString(16)}}`;
