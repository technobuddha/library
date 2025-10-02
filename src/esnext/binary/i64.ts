import { clamp } from '../math/clamp.ts';
import { type BigIntLike } from '../number/big-int-like.ts';
import { toBigInt } from '../number/to-big-int.ts';

import { Int } from './int.ts';

/**
 * A 64-bit signed integer wrapper providing bitwise and arithmetic operations.
 * Values are automatically wrapped to the range [-2^63, 2^63-1].
 * Uses BigInt for internal storage.
 *
 * @group Binary
 * @category Representation
 */
export class I64 extends Int<bigint> {
  /**
   * Normalizes a value to a 64-bit signed integer.
   * Converts any to-bigint value to a bigint and wraps to 64 bits.
   *
   * @param value - The value to normalize
   * @returns A 64-bit signed integer as bigint
   *
   * @example
   * ```typescript
   * I64.normalize(100n);           // 100n
   * I64.normalize(100);            // 100n
   * I64.normalize('123');          // 123n
   * I64.normalize(2n ** 63n);      // -9223372036854775808n
   * ```
   */
  public static normalize(value: BigIntLike): bigint {
    // Handle numbers by truncating before converting to BigInt
    const num = toBigInt(value instanceof Int ? value.value : value);
    const wrapped = num & 0xffffffffffffffffn;
    return wrapped >= 1n << 63n ? wrapped - (1n << 64n) : wrapped;
  }

  /**
   * The wrapped 64-bit signed integer value.
   * This property holds the normalized 64-bit representation of the integer.
   */
  public readonly value: bigint;

  /**
   * The bit length of this integer type (64).
   */
  public readonly len = 64;

  /**
   * Creates a new I64 instance with the value wrapped to 64-bit signed integer range.
   *
   * @param value - The initial value (will be wrapped to [-2^63, 2^63-1])
   *
   * @example
   * ```ts
   * new I64(100n).value;          // 100n
   * new I64(2n ** 63n).value;     // -9223372036854775808n (wrapped)
   * new I64(-50n).value;          // -50n
   * new I64(42n).len;             // 64
   * ```
   */
  public constructor(value: BigIntLike) {
    super();
    this.value = I64.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(0b1010n).or(new I64(0b0110n)).value;  // 0b1110n (14n)
   * new I64(5n).or(new I64(3n)).value;            // 7n
   * ```
   */
  public or(other: BigIntLike): I64 {
    return new I64(this.value | I64.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(0b1010n).and(new I64(0b0110n)).value;  // 0b0010n (2n)
   * new I64(5n).and(new I64(3n)).value;            // 1n
   * ```
   */
  public and(other: BigIntLike): I64 {
    return new I64(this.value & I64.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(0b1010n).xor(new I64(0b0110n)).value;  // 0b1100n (12n)
   * new I64(5n).xor(new I64(3n)).value;            // 6n
   * ```
   */
  public xor(other: BigIntLike): I64 {
    return new I64(this.value ^ I64.normalize(other));
  }

  /**
   * Performs bitwise NOT operation.
   *
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(0n).not().value;     // -1n
   * new I64(-1n).not().value;    // 0n
   * new I64(5n).not().value;     // -6n
   * ```
   */
  public not(): I64 {
    return new I64(~this.value);
  }

  /**
   * Performs addition with 64-bit signed integer wrapping.
   *
   * @param other - The value to add
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(10n).add(new I64(20n)).value;    // 30n
   * new I64(9223372036854775807n).add(new I64(1n)).value;   // -9223372036854775808n (wrapped)
   * new I64(-10n).add(new I64(-20n)).value;  // -30n
   * ```
   */
  public add(other: BigIntLike): I64 {
    return new I64(this.value + I64.normalize(other));
  }

  /**
   * Performs subtraction with 64-bit signed integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(30n).subtract(new I64(10n)).value;    // 20n
   * new I64(-9223372036854775808n).subtract(new I64(1n)).value;  // 9223372036854775807n (wrapped)
   * new I64(10n).subtract(new I64(20n)).value;    // -10n
   * ```
   */
  public sub(other: BigIntLike): I64 {
    return new I64(this.value - I64.normalize(other));
  }

  /**
   * Performs multiplication with 64-bit signed integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new I64 instance with the result
   *
   * @example
   * ```typescript
   * new I64(5n).multiply(new I64(3n)).value;     // 15n
   * new I64(1000000000n).multiply(new I64(1000000000n)).value;   // -1530494976n (wrapped)
   * new I64(-5n).multiply(new I64(3n)).value;    // -15n
   * ```
   */
  public mul(other: BigIntLike): I64 {
    return new I64(this.value * I64.normalize(other));
  }

  /**
   * Performs integer division, truncating towards zero.
   *
   * @param other - The divisor
   * @returns A new I64 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I64(20n).divide(new I64(3n)).value;   // 6n
   * new I64(-20n).divide(new I64(3n)).value;  // -6n
   * new I64(10n).divide(new I64(4n)).value;   // 2n
   * ```
   */
  public div(other: BigIntLike): I64 {
    const otherValue = I64.normalize(other);
    if (otherValue === 0n) {
      throw new RangeError('Division by zero');
    }
    return new I64(this.value / otherValue);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new I64 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I64(10n).modulo(new I64(3n)).value;   // 1n
   * new I64(-10n).modulo(new I64(3n)).value;  // -1n
   * new I64(100n).modulo(new I64(7n)).value;  // 2n
   * ```
   */
  public mod(other: BigIntLike): I64 {
    const otherValue = I64.normalize(other);
    if (otherValue === 0n) {
      throw new RangeError('Division by zero');
    }
    return new I64(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 64].
   *
   * @param bits - Number of positions to shift (clamped to 0-64)
   * @returns A new I64 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I64(1n).shl(3).value;   // 8n
   * new I64(0b1010n).shl(1).value;  // 0b10100n (20n)
   * ```
   */
  public shl(bits: number): I64 {
    const b = BigInt(clamp(bits, 0, 64));
    return new I64(this.value << b);
  }

  /**
   * Performs arithmetic right bit shift operation (sign-extending).
   * Shift amount is clamped to the range [0, 64].
   *
   * @param bits - Number of positions to shift (clamped to 0-64)
   * @returns A new I64 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I64(8n).shr(3).value;    // 1n
   * new I64(-8n).shr(1).value;   // -4n (sign-extended)
   * ```
   */
  public shr(bits: number): I64 {
    const b = BigInt(clamp(bits, 0, 64));
    return new I64(this.value >> b);
  }

  /**
   * Performs left rotation of bits.
   * Rotation amount wraps using modulo 64.
   *
   * @param bits - Number of positions to rotate
   * @returns A new I64 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I64(1n).rotl(1).value;   // 2n
   * new I64(1n << 63n).rotl(1).value;   // 1n
   * ```
   */
  public rotl(bits: number): I64 {
    const b = BigInt(((bits % 64) + 64) % 64);
    const mask = (1n << 64n) - 1n;
    const unsigned = this.value < 0n ? this.value + (1n << 64n) : this.value;
    const rotated = ((unsigned << b) | (unsigned >> (64n - b))) & mask;
    return new I64(rotated);
  }

  /**
   * Performs right rotation of bits.
   * Rotation amount wraps using modulo 64.
   *
   * @param bits - Number of positions to rotate
   * @returns A new I64 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I64(2n).rotr(1).value;  // 1n
   * new I64(1n).rotr(1).value;  // -9223372036854775808n
   * ```
   */
  public rotr(bits: number): I64 {
    const b = BigInt(((bits % 64) + 64) % 64);
    const mask = (1n << 64n) - 1n;
    const unsigned = this.value < 0n ? this.value + (1n << 64n) : this.value;
    const rotated = ((unsigned >> b) | (unsigned << (64n - b))) & mask;
    return new I64(rotated);
  }

  /**
   * Computes bitwise maj function with two other values.
   * For each bit position, returns 1 if at least two of the three values have 1.
   *
   * @param y - Second value
   * @param z - Third value
   * @returns A new I64 instance with the maj result
   *
   * @example
   * ```typescript
   * new I64(0b1010n).maj(new I64(0b1100n), new I64(0b1001n)).value;  // 0b1000n
   * ```
   */
  public maj(y: I64, z: I64): I64 {
    return new I64((this.value & y.value) | (this.value & z.value) | (y.value & z.value));
  }

  /**
   * Computes bitwise ch function with two other values.
   * For each bit position, returns y bit if this bit is 1, otherwise z bit.
   *
   * @param y - Value to ch from when bit is 1
   * @param z - Value to ch from when bit is 0
   * @returns A new I64 instance with the ch result
   *
   * @example
   * ```typescript
   * new I64(0b1010n).ch(new I64(0b1111n), new I64(0b0000n)).value;  // 0b1010n
   * ```
   */
  public ch(y: I64, z: I64): I64 {
    return new I64((this.value & y.value) | (~this.value & z.value));
  }
}
