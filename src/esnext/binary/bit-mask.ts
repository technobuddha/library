/**
 * Creates a bit mask with the specified number of bits set to 1.
 *
 * Returns a mask with the least significant `len` bits set to 1, and all other bits set to 0.
 * For values less than 32 bits, returns a number. For 32 bits or more, returns a bigint.
 * This is useful for masking operations to extract or manipulate specific bit ranges.
 *
 * @param len - The number of bits to set in the mask (0 to n)
 * @returns A bit mask as number (for len \< 32) or bigint (for len \>= 32). Returns 0 for len \<= 0.
 *
 * @example
 * ```typescript
 * bitMask(0);  // 0
 * bitMask(1);  // 1 (0b1)
 * bitMask(4);  // 15 (0b1111)
 * bitMask(8);  // 255 (0b11111111)
 * bitMask(16); // 65535 (0xffff)
 * bitMask(32); // 4294967295 (0xffffffff)
 * bitMask(64); // 18446744073709551615n (0xffffffffffffffffn)
 * ```
 *
 * @group Binary
 * @category Bit Manipulation
 */
export function bitMask(len: number): number | bigint {
  if (len <= 0) {
    return 0;
  }

  if (len < 31) {
    return (1 << len) - 1;
  }

  if (len === 31) {
    return 0x7fffffff;
  }

  if (len === 32) {
    return 0xffffffff;
  }

  return (1n << BigInt(len)) - 1n;
}
