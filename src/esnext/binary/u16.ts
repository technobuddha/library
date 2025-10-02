import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * A class representing an unsigned 16-bit integer with immutable bitwise operations.
 * All operations return new U16 instances, preserving the immutability of the original value.
 * Values are automatically wrapped to the 16-bit unsigned range [0, 65535].
 *
 * @group Binary
 * @category Representation
 */
export class U16 extends Int {
  /**
   * Normalizes a value to a 16-bit unsigned integer.
   * Converts any to-number value to a number and wraps to 16 bits.
   *
   * @param value - The value to normalize
   * @returns A 16-bit unsigned integer
   *
   * @example
   * ```typescript
   * U16.normalize(42);           // 42
   * U16.normalize(-1);           // 65535
   * U16.normalize('123');        // 123
   * U16.normalize(65536);        // 0
   * ```
   */
  public static normalize(value: NumberLike): number {
    return (toNumber(value) & 0xffff) >>> 0;
  }

  /**
   * The underlying unsigned 16-bit integer value.
   * This property holds the normalized 16-bit representation of the integer.
   */
  public readonly value: number;

  /**
   * The bit length of this integer type (16).
   */
  public readonly len = 16;

  /**
   * Creates a new U16 instance from a number.
   * The value is automatically converted to an unsigned 16-bit integer.
   *
   * @param value - The initial value (will be converted to unsigned 16-bit integer)
   *
   * @example
   * ```ts
   * new U16(42).value;        // 42
   * new U16(-1).value;        // 65535
   * new U16(65536).value;     // 0
   * new U16(3.7).value;       // 3
   * new U16(42).len;          // 16
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = U16.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   * Returns 1 for each bit position where at least one operand has a 1.
   *
   * @param other - The value to OR with
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(0b1100).or(new U16(0b1010)).value;  // 0b1110 (14)
   * new U16(5).or(new U16(3)).value;            // 7
   * ```
   */
  public or(other: NumberLike): U16 {
    return new U16(this.value | U16.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   * Returns 1 for each bit position where both operands have a 1.
   *
   * @param other - The value to AND with
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(0b1100).and(new U16(0b1010)).value;  // 0b1000 (8)
   * new U16(5).and(new U16(3)).value;            // 1
   * ```
   */
  public and(other: NumberLike): U16 {
    return new U16(this.value & U16.normalize(other));
  }

  /**
   * Performs bitwise XOR (exclusive OR) operation.
   * Returns 1 for each bit position where exactly one operand has a 1.
   *
   * @param other - The value to XOR with
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(0b1100).xor(new U16(0b1010)).value;  // 0b0110 (6)
   * new U16(5).xor(new U16(3)).value;            // 6
   * ```
   */
  public xor(other: NumberLike): U16 {
    return new U16(this.value ^ U16.normalize(other));
  }

  /**
   * Performs bitwise NOT operation.
   * Inverts all bits in the 16-bit value.
   *
   * @returns A new U16 instance with all bits inverted
   *
   * @example
   * ```typescript
   * new U16(0).not().value;      // 65535
   * new U16(65535).not().value;  // 0
   * new U16(42).not().value;     // 65493
   * ```
   */
  public not(): U16 {
    return new U16(~this.value);
  }

  /**
   * Performs addition with 16-bit unsigned integer wrapping.
   *
   * @param other - The value to add
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(10).add(new U16(5)).value;        // 15
   * new U16(65535).add(new U16(1)).value;     // 0 (overflow wraps)
   * new U16(100).add(new U16(200)).value;     // 300
   * ```
   */
  public add(other: NumberLike): U16 {
    return new U16(this.value + U16.normalize(other));
  }

  /**
   * Performs subtraction with 16-bit unsigned integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(10).subtract(new U16(5)).value;   // 5
   * new U16(0).subtract(new U16(1)).value;    // 65535 (underflow wraps)
   * new U16(100).subtract(new U16(50)).value;  // 50
   * ```
   */
  public sub(other: NumberLike): U16 {
    return new U16(this.value - U16.normalize(other));
  }

  /**
   * Performs multiplication with 16-bit unsigned integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new U16 instance with the result
   *
   * @example
   * ```typescript
   * new U16(10).multiply(new U16(5)).value;      // 50
   * new U16(1000).multiply(new U16(100)).value;  // 34464 (overflow wraps)
   * ```
   */
  public mul(other: NumberLike): U16 {
    return new U16(this.value * U16.normalize(other));
  }

  /**
   * Performs integer division (truncates toward zero).
   *
   * @param other - The value to divide by
   * @returns A new U16 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U16(10).divide(new U16(3)).value;  // 3
   * new U16(100).divide(new U16(7)).value;  // 14
   * ```
   */
  public div(other: NumberLike): U16 {
    const otherValue = U16.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U16((this.value / otherValue) >>> 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new U16 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U16(10).modulo(new U16(3)).value;  // 1
   * new U16(100).modulo(new U16(7)).value;  // 2
   * ```
   */
  public mod(other: NumberLike): U16 {
    const otherValue = U16.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U16(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 16].
   *
   * @param bits - Number of positions to shift (clamped to 0-16)
   * @returns A new U16 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U16(1).shl(3).value;   // 8
   * new U16(0b1010).shl(1).value;  // 0b10100 (20)
   * ```
   */
  public shl(bits: number): U16 {
    const b = clamp(bits, 0, 16);
    return new U16(this.value << b);
  }

  /**
   * Performs logical right bit shift operation.
   * Shift amount is clamped to the range [0, 16].
   * Uses zero-fill (logical) shift for unsigned values.
   *
   * @param bits - Number of positions to shift (clamped to 0-16)
   * @returns A new U16 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U16(8).shr(3).value;  // 1
   * new U16(0b10100).shr(1).value;  // 0b1010 (10)
   * new U16(65535).shr(1).value;    // 32767
   * ```
   */
  public shr(bits: number): U16 {
    const b = clamp(bits, 0, 16);
    return new U16(this.value >>> b);
  }

  /**
   * Performs left bit rotation operation.
   * Bits shifted off the left end wrap around to the right end.
   * Uses modulo 16 for the rotation amount.
   *
   * @param bits - Number of positions to rotate (uses modulo 16)
   * @returns A new U16 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U16(0x1234).rotl(4).value;   // 0x2341
   * new U16(0x8001).rotl(1).value;   // 0x0003
   * new U16(0x1234).rotl(20).value;  // Same as rotl(4)
   * ```
   */
  public rotl(bits: number): U16 {
    if (bits < 0) {
      return this.rotr(-bits);
    }

    const b = bits % 16;
    if (b === 0) {
      return this;
    }

    return new U16(((this.value << b) | (this.value >>> (16 - b))) & 0xffff);
  }

  /**
   * Performs right bit rotation operation.
   * Bits shifted off the right end wrap around to the left end.
   * Uses modulo 16 for the rotation amount.
   *
   * @param bits - Number of positions to rotate (uses modulo 16)
   * @returns A new U16 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U16(0x1234).rotr(4).value;   // 0x4123
   * new U16(0x0003).rotr(1).value;   // 0x8001
   * new U16(0x1234).rotr(20).value;  // Same as rotr(4)
   * ```
   */
  public rotr(bits: number): U16 {
    if (bits < 0) {
      return this.rotl(-bits);
    }

    const b = bits % 16;
    if (b === 0) {
      return this;
    }

    return new U16(((this.value >>> b) | (this.value << (16 - b))) & 0xffff);
  }

  /**
   * Computes the maj function: for each bit position, returns 1 if at least two of the three
   * input bits are 1, otherwise returns 0.
   * Used in cryptographic hash functions like SHA-256.
   *
   * @param y - Second U16 value
   * @param z - Third U16 value
   * @returns A new U16 instance where each bit is the maj of the corresponding bits in x, y, z
   *
   * @example
   * ```typescript
   * new U16(0b1110).maj(new U16(0b1010), new U16(0b1100)).value;  // 0b1110
   * new U16(0xFFFF).maj(new U16(0xFFFF), new U16(0)).value;       // 0xFFFF
   * ```
   */
  public maj(y: U16, z: U16): U16 {
    return new U16((this.value & y.value) | (this.value & z.value) | (y.value & z.value));
  }

  /**
   * Computes the ch function: for each bit position, if the bit in x is 1, take the bit from y,
   * otherwise take the bit from z.
   * Used in cryptographic hash functions like SHA-256.
   *
   * @param y - U16 value to ch from when x bit is 1
   * @param z - U16 value to ch from when x bit is 0
   * @returns A new U16 instance where each bit is chosen from y or z based on the corresponding bit in x
   *
   * @example
   * ```typescript
   * new U16(0b1100).ch(new U16(0b1010), new U16(0b0101)).value;  // 0b1001
   * new U16(0xFFFF).ch(new U16(0xAAAA), new U16(0x5555)).value;  // 0xAAAA
   * ```
   */
  public ch(y: U16, z: U16): U16 {
    return new U16((this.value & y.value) | (~this.value & z.value));
  }
}
