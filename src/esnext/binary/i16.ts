import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * A 16-bit signed integer wrapper providing bitwise operations and manipulations.
 * All operations return new I16 instances, ensuring immutability.
 *
 * @example
 * ```typescript
 * const a = new I16(0b1100);
 * const b = new I16(0b1010);
 *
 * a.and(b).value;  // 0b1000 (8)
 * a.or(b).value;   // 0b1110 (14)
 * a.xor(b).value;  // 0b0110 (6)
 * a.not().value;   // ~0b1100 (-13)
 *
 * const x = new I16(0x1234);
 * x.rotl(4).value;   // 0x2341
 * x.cnt1();           // 5
 * ```
 *
 * @group Binary
 * @category Representation
 */
export class I16 extends Int {
  /**
   * Normalizes a value to a 16-bit signed integer.
   * Converts any to-number value to a number and truncates to 16 bits using bit shifts.
   *
   * @param value - The value to normalize
   * @returns A 16-bit signed integer
   *
   * @example
   * ```typescript
   * I16.normalize(42);           // 42
   * I16.normalize(3.7);          // 3
   * I16.normalize('123');        // 123
   * I16.normalize(32768);        // -32768
   * ```
   */
  public static normalize(value: NumberLike): number {
    return (toNumber(value) << 16) >> 16;
  }

  /**
   * The 16-bit signed integer value.
   * This property holds the normalized 16-bit representation of the integer.
   */
  public value: number;

  /**
   * The bit length of this integer type (16).
   */
  public readonly len = 16;

  /**
   * Creates a new 16-bit signed integer.
   * Values are automatically truncated to 16 bits.
   *
   * @param value - The initial value (will be converted to 16-bit signed integer)
   *
   * @example
   * ```ts
   * new I16(100).value;     // 100
   * new I16(32768).value;   // -32768 (wrapped)
   * new I16(-50).value;     // -50
   * new I16(42).len;        // 16
   * ```
   *
   *
   * @example
   * ```typescript
   * new I16(42).value;       // 42
   * new I16(-1).value;       // -1
   * new I16(3.7).value;      // 3 (truncated)
   * new I16(32768).value;    // -32768 (wrapped)
   * new I16(-32769).value;   // 32767 (wrapped)
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = I16.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(0b1100).or(new I16(0b1010)).value;  // 0b1110 (14)
   * new I16(0b1100).or(0b1010).value;           // 0b1110 (14)
   * ```
   */
  public or(other: NumberLike): I16 {
    return new I16(this.value | I16.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(0b1100).and(new I16(0b1010)).value;  // 0b1000 (8)
   * new I16(0b1100).and(0b1010).value;           // 0b1000 (8)
   * ```
   */
  public and(other: NumberLike): I16 {
    return new I16(this.value & I16.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(0b1100).xor(new I16(0b1010)).value;  // 0b0110 (6)
   * new I16(0b1100).xor(0b1010).value;           // 0b0110 (6)
   * new I16(42).xor(42).value;                   // 0
   * ```
   */
  public xor(other: NumberLike): I16 {
    return new I16(this.value ^ I16.normalize(other));
  }

  /**
   * Performs bitwise NOT operation (one's complement).
   *
   * @returns A new I16 instance with all bits flipped
   *
   * @example
   * ```typescript
   * new I16(0).not().value;   // -1
   * new I16(-1).not().value;  // 0
   * new I16(42).not().value;  // -43
   * ```
   */
  public not(): I16 {
    return new I16(~this.value);
  }

  /**
   * Performs addition with 16-bit signed integer wrapping.
   *
   * @param other - The value to add
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(10).add(new I16(5)).value;        // 15
   * new I16(10).add(5).value;                 // 15
   * new I16(32767).add(1).value;              // -32768 (overflow wraps)
   * new I16(-5).add(3).value;                 // -2
   * ```
   */
  public add(other: NumberLike): I16 {
    return new I16(this.value + I16.normalize(other));
  }

  /**
   * Performs subtraction with 16-bit signed integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(10).subtract(new I16(5)).value;         // 5
   * new I16(10).subtract(5).value;                  // 5
   * new I16(-32768).subtract(1).value;              // 32767 (underflow wraps)
   * new I16(5).subtract(10).value;                  // -5
   * ```
   */
  public sub(other: NumberLike): I16 {
    return new I16(this.value - I16.normalize(other));
  }

  /**
   * Performs multiplication with 16-bit signed integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new I16 instance with the result
   *
   * @example
   * ```typescript
   * new I16(10).multiply(new I16(5)).value;      // 50
   * new I16(10).multiply(5).value;               // 50
   * new I16(-3).multiply(4).value;               // -12
   * new I16(1000).multiply(100).value;           // -31072 (overflow wraps)
   * ```
   */
  public mul(other: NumberLike): I16 {
    return new I16(this.value * I16.normalize(other));
  }

  /**
   * Performs integer division (truncates toward zero).
   *
   * @param other - The value to divide by
   * @returns A new I16 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I16(10).divide(new I16(3)).value;    // 3
   * new I16(10).divide(3).value;             // 3
   * new I16(-10).divide(3).value;            // -3
   * new I16(10).divide(-3).value;            // -3
   * ```
   */
  public div(other: NumberLike): I16 {
    if (I16.normalize(other) === 0) {
      throw new RangeError('Division by zero');
    }
    return new I16((this.value / I16.normalize(other)) | 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new I16 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I16(10).modulo(new I16(3)).value;    // 1
   * new I16(10).modulo(3).value;             // 1
   * new I16(-10).modulo(3).value;            // -1
   * new I16(10).modulo(-3).value;            // 1
   * ```
   */
  public mod(other: NumberLike): I16 {
    if (I16.normalize(other) === 0) {
      throw new RangeError('Division by zero');
    }
    return new I16(this.value % I16.normalize(other));
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 16].
   *
   * @param bits - Number of positions to shift (clamped to 0-16)
   * @returns A new I16 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I16(1).shl(3).value;   // 8
   * new I16(0b1010).shl(1).value;  // 0b10100 (20)
   * ```
   */
  public shl(bits: number): I16 {
    const b = clamp(bits, 0, 16);
    return new I16(this.value << b);
  }

  /**
   * Performs arithmetic right bit shift operation (sign-preserving).
   * Shift amount is clamped to the range [0, 16].
   *
   * @param bits - Number of positions to shift (clamped to 0-16)
   * @returns A new I16 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I16(8).shr(3).value;    // 1
   * new I16(-8).shr(1).value;   // -4 (sign preserved)
   * ```
   */
  public shr(bits: number): I16 {
    const b = clamp(bits, 0, 16);
    return new I16(this.value >> b);
  }

  /**
   * Performs left rotation (circular shift).
   * Bits shifted off the left end wrap around to the right.
   * Rotation amount uses modulo 16. Negative values rotate right.
   *
   * @param bits - Number of positions to rotate (modulo 16)
   * @returns A new I16 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I16(0x1234).rotl(4).value;   // 0x2341
   * new I16(0x8001).rotl(1).value;   // 0x0003
   * new I16(0x1234).rotl(20).value;  // Same as rotl(4)
   * new I16(0x1234).rotl(-4).value;  // Same as rotr(4)
   * ```
   */
  public rotl(bits: number): I16 {
    const b = bits % 16;
    if (b < 0) {
      return this.rotr(-b);
    }
    const unsigned = this.value & 0xffff;
    return new I16((unsigned << b) | (unsigned >>> (16 - b)));
  }

  /**
   * Performs right rotation (circular shift).
   * Bits shifted off the right end wrap around to the left.
   * Rotation amount uses modulo 16. Negative values rotate left.
   *
   * @param bits - Number of positions to rotate (modulo 16)
   * @returns A new I16 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I16(0x1234).rotr(4).value;   // 0x4123
   * new I16(0x0003).rotr(1).value;   // -32767
   * new I16(0x1234).rotr(20).value;  // Same as rotr(4)
   * new I16(0x1234).rotr(-4).value;  // Same as rotl(4)
   * ```
   */
  public rotr(bits: number): I16 {
    const b = bits % 16;
    if (b < 0) {
      return this.rotl(-b);
    }
    const unsigned = this.value & 0xffff;
    return new I16((unsigned >>> b) | (unsigned << (16 - b)));
  }

  /**
   * Computes the maj function used in cryptographic algorithms.
   * For each bit position, returns 1 if at least two of the three inputs are 1.
   *
   * @param y - Second operand
   * @param z - Third operand
   * @returns A new I16 instance with the maj result
   *
   * @example
   * ```typescript
   * const x = new I16(0b1110);
   * const y = new I16(0b1010);
   * const z = new I16(0b1100);
   * x.maj(y, z).value;  // 0b1110
   * ```
   */
  public maj(y: I16, z: I16): I16 {
    return new I16((this.value & y.value) | (z.value & (this.value | y.value)));
  }

  /**
   * Computes the ch function used in cryptographic algorithms.
   * For each bit position, chs bits from y where this value is 1, or from z where this value is 0.
   *
   * @param y - Value to ch from when corresponding bit is 1
   * @param z - Value to ch from when corresponding bit is 0
   * @returns A new I16 instance with the chosen bits
   *
   * @example
   * ```typescript
   * const x = new I16(0b1100);
   * const y = new I16(0b1010);
   * const z = new I16(0b0101);
   * x.ch(y, z).value;  // 0b1001
   * ```
   */
  public ch(y: I16, z: I16): I16 {
    return new I16((this.value & y.value) ^ (~this.value & z.value));
  }
}
