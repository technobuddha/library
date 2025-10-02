import { clamp } from '../math/clamp.ts';
import { type BigIntLike } from '../number/big-int-like.ts';
import { toBigInt } from '../number/to-big-int.ts';

import { Int } from './int.ts';

/**
 * A 64-bit unsigned integer wrapper providing bitwise and arithmetic operations.
 * Values are automatically wrapped to the range [0, 2^64-1].
 * Uses BigInt for internal storage.
 *
 * @group Binary
 * @category Representation
 */
export class U64 extends Int<bigint> {
  /**
   * Normalizes a value to a 64-bit unsigned integer.
   * Converts any to-bigint value to a bigint and wraps to 64 bits.
   *
   * @param value - The value to normalize
   * @returns A 64-bit unsigned integer as bigint
   *
   * @example
   * ```typescript
   * U64.normalize(100n);           // 100n
   * U64.normalize(100);            // 100n
   * U64.normalize('123');          // 123n
   * U64.normalize(2n ** 64n);      // 0n
   * ```
   */
  public static normalize(value: BigIntLike): bigint {
    return toBigInt(value) & 0xffffffffffffffffn;
  }

  /**
   * Creates a U64 instance from a byte array in big-endian order.
   * Reads 8 bytes starting at the specified offset and combines them into a 64-bit unsigned integer.
   *
   * @param bytes - The byte array to read from
   * @param offset - The index offset (in 8-byte chunks) to start reading from. Defaults to 0
   * @returns A new U64 instance with the value constructed from the bytes
   *
   * @example
   * ```typescript
   * const bytes = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]);
   * U64.fromBytes(bytes).value;       // 0x0123456789abcdefn (81985529216486895n)
   * U64.fromBytes(bytes, 0).value;    // 0x0123456789abcdefn
   * ```
   */
  public static fromBytes(bytes: Uint8Array, offset = 0): U64 {
    const b0 = BigInt(bytes[offset * 8 + 0] ?? 0);
    const b1 = BigInt(bytes[offset * 8 + 1] ?? 0);
    const b2 = BigInt(bytes[offset * 8 + 2] ?? 0);
    const b3 = BigInt(bytes[offset * 8 + 3] ?? 0);
    const b4 = BigInt(bytes[offset * 8 + 4] ?? 0);
    const b5 = BigInt(bytes[offset * 8 + 5] ?? 0);
    const b6 = BigInt(bytes[offset * 8 + 6] ?? 0);
    const b7 = BigInt(bytes[offset * 8 + 7] ?? 0);
    return new U64(
      (b0 << 56n) |
        (b1 << 48n) |
        (b2 << 40n) |
        (b3 << 32n) |
        (b4 << 24n) |
        (b5 << 16n) |
        (b6 << 8n) |
        b7,
    );
  }

  /**
   * The wrapped 64-bit unsigned integer value.
   * This property holds the normalized 64-bit representation of the integer.
   */
  public readonly value: bigint;

  /**
   * The bit length of this integer type (64).
   */
  public readonly len = 64;

  /**
   * Creates a new U64 instance with the value wrapped to 64-bit unsigned integer range.
   *
   * @param value - The initial value (will be wrapped to [0, 2^64-1])
   *
   * @example
   * ```ts
   * new U64(100n).value;          // 100n
   * new U64(2n ** 64n).value;     // 0n (wrapped)
   * new U64(-50n).value;          // 18446744073709551566n (wrapped)
   * new U64(42n).len;             // 64
   * ```
   */
  public constructor(value: BigIntLike) {
    super();
    this.value = U64.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(0b1010n).or(new U64(0b0110n)).value;  // 0b1110n (14n)
   * new U64(5n).or(new U64(3n)).value;            // 7n
   * ```
   */
  public or(other: BigIntLike): U64 {
    return new U64(this.value | U64.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(0b1010n).and(new U64(0b0110n)).value;  // 0b0010n (2n)
   * new U64(5n).and(new U64(3n)).value;            // 1n
   * ```
   */
  public and(other: BigIntLike): U64 {
    return new U64(this.value & U64.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(0b1010n).xor(new U64(0b0110n)).value;  // 0b1100n (12n)
   * new U64(5n).xor(new U64(3n)).value;            // 6n
   * ```
   */
  public xor(other: BigIntLike): U64 {
    return new U64(this.value ^ U64.normalize(other));
  }

  /**
   * Performs bitwise NOT operation.
   *
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(0n).not().value;     // 18446744073709551615n
   * new U64(18446744073709551615n).not().value;   // 0n
   * ```
   */
  public not(): U64 {
    return new U64(~this.value);
  }

  /**
   * Performs addition with 64-bit unsigned integer wrapping.
   *
   * @param other - The value to add
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(10n).add(new U64(20n)).value;    // 30n
   * new U64(18446744073709551615n).add(new U64(1n)).value;  // 0n (wrapped)
   * ```
   */
  public add(other: BigIntLike): U64 {
    return new U64(this.value + U64.normalize(other));
  }

  /**
   * Performs subtraction with 64-bit unsigned integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(30n).subtract(new U64(10n)).value;   // 20n
   * new U64(10n).subtract(new U64(20n)).value;   // 18446744073709551606n (wrapped)
   * new U64(0n).subtract(new U64(1n)).value;     // 18446744073709551615n (wrapped)
   * ```
   */
  public sub(other: BigIntLike): U64 {
    return new U64(this.value - U64.normalize(other));
  }

  /**
   * Performs multiplication with 64-bit unsigned integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new U64 instance with the result
   *
   * @example
   * ```typescript
   * new U64(5n).multiply(new U64(3n)).value;     // 15n
   * new U64(10000000000n).multiply(new U64(10000000000n)).value;   // (wrapped)
   * ```
   */
  public mul(other: BigIntLike): U64 {
    return new U64(this.value * U64.normalize(other));
  }

  /**
   * Performs integer division, truncating towards zero.
   *
   * @param other - The divisor
   * @returns A new U64 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U64(20n).divide(new U64(3n)).value;   // 6n
   * new U64(100n).divide(new U64(10n)).value; // 10n
   * new U64(10n).divide(new U64(4n)).value;   // 2n
   * ```
   */
  public div(other: BigIntLike): U64 {
    const otherValue = U64.normalize(other);
    if (otherValue === 0n) {
      throw new RangeError('Division by zero');
    }
    return new U64(this.value / otherValue);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new U64 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U64(10n).modulo(new U64(3n)).value;   // 1n
   * new U64(100n).modulo(new U64(7n)).value;  // 2n
   * ```
   */
  public mod(other: BigIntLike): U64 {
    const otherValue = U64.normalize(other);
    if (otherValue === 0n) {
      throw new RangeError('Division by zero');
    }
    return new U64(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 64].
   *
   * @param bits - Number of positions to shift (clamped to 0-64)
   * @returns A new U64 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U64(1n).shl(3).value;   // 8n
   * new U64(0b1010n).shl(1).value;  // 0b10100n (20n)
   * ```
   */
  public shl(bits: number): U64 {
    const b = BigInt(clamp(bits, 0, 64));
    return new U64(this.value << b);
  }

  /**
   * Performs logical right bit shift operation.
   * Shift amount is clamped to the range [0, 64].
   * Uses zero-fill (logical) shift for unsigned values.
   *
   * @param bits - Number of positions to shift (clamped to 0-64)
   * @returns A new U64 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U64(8n).shr(3).value;  // 1n
   * new U64(0b10100n).shr(1).value;  // 0b1010n (10n)
   * ```
   */
  public shr(bits: number): U64 {
    const b = BigInt(clamp(bits, 0, 64));
    return new U64(this.value >> b);
  }

  /**
   * Performs left rotation of bits.
   * Rotation amount wraps using modulo 64.
   *
   * @param bits - Number of positions to rotate
   * @returns A new U64 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U64(1n).rotl(1).value;   // 2n
   * new U64(1n << 63n).rotl(1).value;   // 1n
   * ```
   */
  public rotl(bits: number): U64 {
    const b = BigInt(((bits % 64) + 64) % 64);
    const mask = (1n << 64n) - 1n;
    return new U64(((this.value << b) | (this.value >> (64n - b))) & mask);
  }

  /**
   * Performs right rotation of bits.
   * Rotation amount wraps using modulo 64.
   *
   * @param bits - Number of positions to rotate
   * @returns A new U64 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U64(2n).rotr(1).value;  // 1n
   * new U64(1n).rotr(1).value;  // 9223372036854775808n
   * ```
   */
  public rotr(bits: number): U64 {
    const b = BigInt(((bits % 64) + 64) % 64);
    const mask = (1n << 64n) - 1n;
    return new U64(((this.value >> b) | (this.value << (64n - b))) & mask);
  }

  /**
   * Computes bitwise majority function with two other values.
   * For each bit position, returns 1 if at least two of the three values have 1.
   *
   * @param y - Second value
   * @param z - Third value
   * @returns A new U64 instance with the maj result
   *
   * @example
   * ```typescript
   * new U64(0b1010n).maj(new U64(0b1100n), new U64(0b1001n)).value;  // 0b1000n
   * ```
   */
  public maj(y: U64, z: U64): U64 {
    return new U64((this.value & y.value) | (this.value & z.value) | (y.value & z.value));
  }

  /**
   * Computes bitwise choose function with two other values.
   * For each bit position, returns y bit if this bit is 1, otherwise z bit.
   *
   * @param y - Value to choose from when bit is 1
   * @param z - Value to choose from when bit is 0
   * @returns A new U64 instance with the ch result
   *
   * @example
   * ```typescript
   * new U64(0b1010n).ch(new U64(0b1111n), new U64(0b0000n)).value;  // 0b1010n
   * ```
   */
  public ch(y: U64, z: U64): U64 {
    const mask = (1n << 64n) - 1n;
    return new U64((this.value & y.value) | (~this.value & z.value & mask));
  }

  /**
   * Converts the 64-bit unsigned integer to an 8-byte array in big-endian order.
   * The most significant byte is first, followed by progressively less significant bytes.
   *
   * @returns A tuple of 8 numbers representing the bytes in big-endian order
   *
   * @example
   * ```typescript
   * new U64(0x0123456789abcdefn).toBytes();  // [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]
   * new U64(81985529216486895n).toBytes();   // [1, 35, 69, 103, 137, 171, 205, 239]
   * new U64(0n).toBytes();                   // [0, 0, 0, 0, 0, 0, 0, 0]
   * new U64(18446744073709551615n).toBytes(); // [255, 255, 255, 255, 255, 255, 255, 255]
   * ```
   */
  public toBytes(): [number, number, number, number, number, number, number, number] {
    return [
      Number((this.value >> 56n) & 0xffn),
      Number((this.value >> 48n) & 0xffn),
      Number((this.value >> 40n) & 0xffn),
      Number((this.value >> 32n) & 0xffn),
      Number((this.value >> 24n) & 0xffn),
      Number((this.value >> 16n) & 0xffn),
      Number((this.value >> 8n) & 0xffn),
      Number((this.value >> 0n) & 0xffn),
    ];
  }

  /**
   * Computes the SHA-384/SHA-512 Σ₀ (sigma0) function for 64-bit values.
   *
   * This function performs bitwise rotations, combining them with XOR,
   * as defined in the SHA-2 specification for 64-bit operations:
   *   Σ₀(x) = ROTR²⁸(x) ⊕ ROTR³⁴(x) ⊕ ROTR³⁹(x)
   *
   * where:
   * - ROTRⁿ(x) is the right rotation of x by n bits
   * - ⊕ represents the XOR operation
   *
   * @returns A new U64 instance with the Σ₀ transformation result
   *
   * @example
   * ```typescript
   * const x = new U64(0x0123456789abcdefn);
   * const result = x.sigma0();
   * // Used in SHA-384/512 compression function
   * ```
   */
  public sigma0(): U64 {
    return this.rotr(28).xor(this.rotr(34)).xor(this.rotr(39));
  }

  /**
   * Computes the SHA-384/SHA-512 Σ₁ (sigma1) function for 64-bit values.
   *
   * This function performs bitwise rotations, combining them with XOR,
   * as defined in the SHA-2 specification for 64-bit operations:
   *   Σ₁(x) = ROTR¹⁴(x) ⊕ ROTR¹⁸(x) ⊕ ROTR⁴¹(x)
   *
   * where:
   * - ROTRⁿ(x) is the right rotation of x by n bits
   * - ⊕ represents the XOR operation
   *
   * @returns A new U64 instance with the Σ₁ transformation result
   *
   * @example
   * ```typescript
   * const x = new U64(0x0123456789abcdefn);
   * const result = x.sigma1();
   * // Used in SHA-384/512 compression function
   * ```
   */
  public sigma1(): U64 {
    return this.rotr(14).xor(this.rotr(18)).xor(this.rotr(41));
  }

  /**
   * Computes the SHA-384/SHA-512 γ₀ (gamma0) function for 64-bit values.
   *
   * This function performs bitwise rotations and shifts, combining them with XOR,
   * as defined in the SHA-2 specification for 64-bit operations:
   *   γ₀(x) = ROTR¹(x) ⊕ ROTR⁸(x) ⊕ SHR⁷(x)
   *
   * where:
   * - ROTRⁿ(x) is the right rotation of x by n bits
   * - SHRⁿ(x) is the logical right shift of x by n bits
   * - ⊕ represents the XOR operation
   *
   * @returns A new U64 instance with the γ₀ transformation result
   *
   * @example
   * ```typescript
   * const x = new U64(0x0123456789abcdefn);
   * const result = x.gamma0();
   * // Used in SHA-384/512 message schedule expansion
   * ```
   */
  public gamma0(): U64 {
    return this.rotr(1).xor(this.rotr(8)).xor(this.shr(7));
  }

  /**
   * Computes the SHA-384/SHA-512 γ₁ (gamma1) function for 64-bit values.
   *
   * This function performs bitwise rotations and shifts, combining them with XOR,
   * as defined in the SHA-2 specification for 64-bit operations:
   *   γ₁(x) = ROTR¹⁹(x) ⊕ ROTR⁶¹(x) ⊕ SHR⁶(x)
   *
   * where:
   * - ROTRⁿ(x) is the right rotation of x by n bits
   * - SHRⁿ(x) is the logical right shift of x by n bits
   * - ⊕ represents the XOR operation
   *
   * @returns A new U64 instance with the γ₁ transformation result
   *
   * @example
   * ```typescript
   * const x = new U64(0x0123456789abcdefn);
   * const result = x.gamma1();
   * // Used in SHA-384/512 message schedule expansion
   * ```
   */
  public gamma1(): U64 {
    return this.rotr(19).xor(this.rotr(61)).xor(this.shr(6));
  }
}
