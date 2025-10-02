import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * A 32-bit signed integer wrapper providing bitwise operations and manipulations.
 * All operations return new I32 instances, ensuring immutability.
 *
 * @example
 * ```typescript
 * const a = new I32(0b1100);
 * const b = new I32(0b1010);
 *
 * a.and(b).value;  // 0b1000 (8)
 * a.or(b).value;   // 0b1110 (14)
 * a.xor(b).value;  // 0b0110 (6)
 * a.not().value;   // ~0b1100 (-13)
 *
 * const x = new I32(0x12345678);
 * x.rotl(8).value;   // 0x34567812
 * x.cnt1();           // 13
 * ```
 *
 * @group Binary
 * @category Representation
 */
export class I32 extends Int {
  /**
   * Normalizes a value to a 32-bit signed integer.
   * Converts any to-number value to a number and truncates to 32 bits using bitwise OR.
   *
   * @param value - The value to normalize
   * @returns A 32-bit signed integer
   *
   * @example
   * ```typescript
   * I32.normalize(42);           // 42
   * I32.normalize(3.7);          // 3
   * I32.normalize('123');        // 123
   * I32.normalize(2147483648);   // -2147483648
   * ```
   */
  public static normalize(value: NumberLike): number {
    return toNumber(value) | 0;
  }

  /**
   * The 32-bit signed integer value.
   * This property holds the normalized 32-bit representation of the integer.
   */
  public value: number;

  /**
   * The bit length of this integer type (32).
   */
  public readonly len = 32;

  /**
   * Creates a new 32-bit signed integer.
   * Values are automatically truncated to 32 bits.
   *
   * @param value - The initial value (will be converted to 32-bit signed integer)
   *
   * @example
   * ```ts
   * new I32(100).value;           // 100
   * new I32(2147483648).value;    // -2147483648 (wrapped)
   * new I32(-50).value;           // -50
   * new I32(42).len;              // 32
   * ```
   *
   *
   * @example
   * ```typescript
   * new I32(42).value;           // 42
   * new I32(-1).value;           // -1
   * new I32(3.7).value;          // 3 (truncated)
   * new I32(2147483648).value;   // -2147483648 (wrapped)
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = I32.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(0b1100).or(new I32(0b1010)).value;  // 0b1110 (14)
   * ```
   */
  public or(other: NumberLike): I32 {
    return new I32(this.value | I32.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(0b1100).and(new I32(0b1010)).value;  // 0b1000 (8)
   * ```
   */
  public and(other: NumberLike): I32 {
    return new I32(this.value & I32.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(0b1100).xor(new I32(0b1010)).value;  // 0b0110 (6)
   * new I32(42).xor(new I32(42)).value;          // 0
   * ```
   */
  public xor(other: NumberLike): I32 {
    return new I32(this.value ^ I32.normalize(other));
  }

  /**
   * Performs bitwise NOT operation (one's complement).
   *
   * @returns A new I32 instance with all bits flipped
   *
   * @example
   * ```typescript
   * new I32(0).not().value;   // -1
   * new I32(-1).not().value;  // 0
   * new I32(42).not().value;  // -43
   * ```
   */
  public not(): I32 {
    return new I32(~this.value);
  }

  /**
   * Performs addition with 32-bit signed integer wrapping.
   *
   * @param other - The value to add
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(10).add(new I32(5)).value;           // 15
   * new I32(2147483647).add(new I32(1)).value;   // -2147483648 (overflow wraps)
   * new I32(-5).add(new I32(3)).value;           // -2
   * ```
   */
  public add(other: NumberLike): I32 {
    return new I32(this.value + I32.normalize(other));
  }

  /**
   * Performs subtraction with 32-bit signed integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(10).subtract(new I32(5)).value;        // 5
   * new I32(-2147483648).subtract(new I32(1)).value;  // 2147483647 (underflow wraps)
   * new I32(5).subtract(new I32(10)).value;        // -5
   * ```
   */
  public sub(other: NumberLike): I32 {
    return new I32(this.value - I32.normalize(other));
  }

  /**
   * Performs multiplication with 32-bit signed integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new I32 instance with the result
   *
   * @example
   * ```typescript
   * new I32(10).multiply(new I32(5)).value;     // 50
   * new I32(-3).multiply(new I32(4)).value;     // -12
   * new I32(100000).multiply(new I32(100000)).value;  // 1410065408 (overflow wraps)
   * ```
   */
  public mul(other: NumberLike): I32 {
    return new I32(this.value * I32.normalize(other));
  }

  /**
   * Performs integer division (truncates toward zero).
   *
   * @param other - The value to divide by
   * @returns A new I32 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I32(10).divide(new I32(3)).value;    // 3
   * new I32(-10).divide(new I32(3)).value;   // -3
   * new I32(10).divide(new I32(-3)).value;   // -3
   * ```
   */
  public div(other: NumberLike): I32 {
    if (I32.normalize(other) === 0) {
      throw new RangeError('Division by zero');
    }
    return new I32((this.value / I32.normalize(other)) | 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new I32 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I32(10).modulo(new I32(3)).value;    // 1
   * new I32(-10).modulo(new I32(3)).value;   // -1
   * new I32(10).modulo(new I32(-3)).value;   // 1
   * ```
   */
  public mod(other: NumberLike): I32 {
    if (I32.normalize(other) === 0) {
      throw new RangeError('Division by zero');
    }
    return new I32(this.value % I32.normalize(other));
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 32].
   *
   * @param bits - Number of positions to shift (clamped to 0-32)
   * @returns A new I32 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I32(1).shl(3).value;   // 8
   * new I32(0b1010).shl(1).value;  // 0b10100 (20)
   * ```
   */
  public shl(bits: number): I32 {
    const b = clamp(bits, 0, 32);
    return new I32(this.value << b);
  }

  /**
   * Performs arithmetic right bit shift operation (sign-preserving).
   * Shift amount is clamped to the range [0, 32].
   *
   * @param bits - Number of positions to shift (clamped to 0-32)
   * @returns A new I32 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I32(8).shr(3).value;    // 1
   * new I32(-8).shr(1).value;   // -4 (sign preserved)
   * ```
   */
  public shr(bits: number): I32 {
    const b = clamp(bits, 0, 32);
    return new I32(this.value >> b);
  }

  /**
   * Performs left rotation (circular shift).
   * Bits shifted off the left end wrap around to the right.
   * Rotation amount uses modulo 32. Negative values rotate right.
   *
   * @param bits - Number of positions to rotate (modulo 32)
   * @returns A new I32 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I32(0x12345678).rotl(4).value;   // 0x23456781
   * new I32(0x80000001).rotl(1).value;   // 0x00000003
   * new I32(0x12345678).rotl(36).value;  // Same as rotl(4)
   * new I32(0x12345678).rotl(-4).value;  // Same as rotr(4)
   * ```
   */
  public rotl(bits: number): I32 {
    const b = bits % 32;
    if (b < 0) {
      return this.rotr(-b);
    }
    return new I32((this.value << b) | (this.value >>> (32 - b)));
  }

  /**
   * Performs right rotation (circular shift).
   * Bits shifted off the right end wrap around to the left.
   * Rotation amount uses modulo 32. Negative values rotate left.
   *
   * @param bits - Number of positions to rotate (modulo 32)
   * @returns A new I32 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I32(0x12345678).rotr(4).value;   // 0x81234567
   * new I32(0x00000003).rotr(1).value;   // 0x80000001
   * new I32(0x12345678).rotr(36).value;  // Same as rotr(4)
   * new I32(0x12345678).rotr(-4).value;  // Same as rotl(4)
   * ```
   */
  public rotr(bits: number): I32 {
    const b = bits % 32;
    if (b < 0) {
      return this.rotl(-b);
    }
    return new I32((this.value >>> b) | (this.value << (32 - b)));
  }

  /**
   * Computes the maj function used in cryptographic algorithms.
   * For each bit position, returns 1 if at least two of the three inputs are 1.
   *
   * @param y - Second operand
   * @param z - Third operand
   * @returns A new I32 instance with the maj result
   *
   * @example
   * ```typescript
   * const x = new I32(0b1110);
   * const y = new I32(0b1010);
   * const z = new I32(0b1100);
   * x.maj(y, z).value;  // 0b1110
   * ```
   */
  public maj(y: I32, z: I32): I32 {
    return new I32((this.value & y.value) | (z.value & (this.value | y.value)));
  }

  /**
   * Computes the ch function used in cryptographic algorithms.
   * For each bit position, chs bits from y where this value is 1, or from z where this value is 0.
   *
   * @param y - Value to ch from when corresponding bit is 1
   * @param z - Value to ch from when corresponding bit is 0
   * @returns A new I32 instance with the chosen bits
   *
   * @example
   * ```typescript
   * const x = new I32(0b1100);
   * const y = new I32(0b1010);
   * const z = new I32(0b0101);
   * x.ch(y, z).value;  // 0b1001
   * ```
   */
  public ch(y: I32, z: I32): I32 {
    return new I32(((this.value & y.value) ^ (~this.value & z.value)) >>> 0);
  }
}
