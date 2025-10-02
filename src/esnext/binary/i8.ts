import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * An 8-bit signed integer wrapper providing bitwise and arithmetic operations.
 * Values are automatically wrapped to the range [-128, 127].
 *
 * @group Binary
 * @category Representation
 */
export class I8 extends Int {
  /**
   * Normalizes a value to an 8-bit signed integer.
   * Converts any to-number value to a number and wraps to 8 bits.
   *
   * @param value - The value to normalize
   * @returns An 8-bit signed integer
   *
   * @example
   * ```ts
   * I8.normalize(100);     // 100
   * I8.normalize(200);     // -56 (wrapped)
   * I8.normalize('50');    // 50
   * I8.normalize(-200);    // 56 (wrapped)
   * ```
   */
  public static normalize(value: NumberLike): number {
    return (toNumber(value) << 24) >> 24;
  }

  /**
   * The wrapped 8-bit signed integer value.
   * This property holds the normalized 8-bit representation of the integer.
   */
  public readonly value: number;

  /**
   * The bit length of this integer type (8).
   */
  public readonly len: number;

  /**
   * Creates a new I8 instance with the value wrapped to 8-bit signed integer range.
   *
   * @param value - The initial value (will be wrapped to [-128, 127])
   *
   * @example
   * ```ts
   * new I8(100).value;   // 100
   * new I8(200).value;   // -56 (wrapped)
   * new I8(-50).value;   // -50
   * new I8(-200).value;  // 56 (wrapped)
   * new I8('50').value;  // 50
   * new I8(42).len;      // 8
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = I8.normalize(value);
    this.len = 8;
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(0b1010).or(new I8(0b0110)).value;  // 0b1110 (14)
   * new I8(5).or(new I8(3)).value;            // 7
   * new I8(5).or(3).value;                    // 7
   * ```
   */
  public or(other: NumberLike): I8 {
    return new I8(this.value | I8.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(0b1010).and(new I8(0b0110)).value;  // 0b0010 (2)
   * new I8(5).and(new I8(3)).value;            // 1
   * new I8(5).and(3).value;                    // 1
   * ```
   */
  public and(other: NumberLike): I8 {
    return new I8(this.value & I8.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(0b1010).xor(new I8(0b0110)).value;  // 0b1100 (12)
   * new I8(5).xor(new I8(3)).value;            // 6
   * new I8(5).xor(3).value;                    // 6
   * ```
   */
  public xor(other: NumberLike): I8 {
    return new I8(this.value ^ I8.normalize(other));
  }

  /**
   * Performs bitwise NOT operation.
   *
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(0).not().value;     // -1
   * new I8(-1).not().value;    // 0
   * new I8(5).not().value;     // -6
   * ```
   */
  public not(): I8 {
    return new I8(~this.value);
  }

  /**
   * Performs addition with 8-bit signed integer wrapping.
   *
   * @param other - The value to add
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(10).add(new I8(20)).value;    // 30
   * new I8(100).add(new I8(50)).value;   // -106 (wrapped)
   * new I8(-10).add(new I8(-20)).value;  // -30
   * new I8(10).add(20).value;            // 30
   * ```
   */
  public add(other: NumberLike): I8 {
    return new I8(this.value + I8.normalize(other));
  }

  /**
   * Performs subtraction with 8-bit signed integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(30).subtract(new I8(10)).value;    // 20
   * new I8(-100).subtract(new I8(50)).value;  // 106 (wrapped)
   * new I8(10).subtract(new I8(20)).value;    // -10
   * new I8(30).subtract(10).value;            // 20
   * ```
   */
  public sub(other: NumberLike): I8 {
    return new I8(this.value - I8.normalize(other));
  }

  /**
   * Performs multiplication with 8-bit signed integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new I8 instance with the result
   *
   * @example
   * ```typescript
   * new I8(5).multiply(new I8(3)).value;     // 15
   * new I8(10).multiply(new I8(20)).value;   // -56 (wrapped)
   * new I8(-5).multiply(new I8(3)).value;    // -15
   * new I8(5).multiply(3).value;             // 15
   * ```
   */
  public mul(other: NumberLike): I8 {
    return new I8(this.value * I8.normalize(other));
  }

  /**
   * Performs integer division, truncating towards zero.
   *
   * @param other - The divisor
   * @returns A new I8 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I8(20).divide(new I8(3)).value;   // 6
   * new I8(-20).divide(new I8(3)).value;  // -6
   * new I8(10).divide(new I8(4)).value;   // 2
   * new I8(20).divide(3).value;           // 6
   * ```
   */
  public div(other: NumberLike): I8 {
    const otherValue = I8.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new I8((this.value / otherValue) | 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new I8 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new I8(10).modulo(new I8(3)).value;   // 1
   * new I8(-10).modulo(new I8(3)).value;  // -1
   * new I8(100).modulo(new I8(7)).value;  // 2
   * new I8(10).modulo(3).value;           // 1
   * ```
   */
  public mod(other: NumberLike): I8 {
    const otherValue = I8.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new I8(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 8].
   *
   * @param bits - Number of positions to shift (clamped to 0-8)
   * @returns A new I8 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I8(1).shl(3).value;   // 8
   * new I8(0b1010).shl(1).value;  // 0b10100 (20) -> -20 (wrapped)
   * ```
   */
  public shl(bits: number): I8 {
    const b = clamp(bits, 0, 8);
    return new I8(this.value << b);
  }

  /**
   * Performs arithmetic right bit shift operation (sign-extending).
   * Shift amount is clamped to the range [0, 8].
   *
   * @param bits - Number of positions to shift (clamped to 0-8)
   * @returns A new I8 instance with the shifted value
   *
   * @example
   * ```typescript
   * new I8(8).shr(3).value;    // 1
   * new I8(-8).shr(1).value;   // -4 (sign-extended)
   * ```
   */
  public shr(bits: number): I8 {
    const b = clamp(bits, 0, 8);
    return new I8(this.value >> b);
  }

  /**
   * Performs left rotation of bits.
   * Rotation amount wraps using modulo 8.
   *
   * @param bits - Number of positions to rotate
   * @returns A new I8 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I8(0b10100000).rotl(1).value;   // 0b01000001 (65)
   * new I8(0b00001111).rotl(4).value;   // 0b11110000 (-16)
   * ```
   */
  public rotl(bits: number): I8 {
    const b = ((bits % 8) + 8) % 8;
    return new I8(((this.value << b) | ((this.value & 0xff) >>> (8 - b))) & 0xff);
  }

  /**
   * Performs right rotation of bits.
   * Rotation amount wraps using modulo 8.
   *
   * @param bits - Number of positions to rotate
   * @returns A new I8 instance with the rotated value
   *
   * @example
   * ```typescript
   * new I8(0b01000001).rotr(1).value;  // 0b10100000 (-96)
   * new I8(0b11110000).rotr(4).value;  // 0b00001111 (15)
   * ```
   */
  public rotr(bits: number): I8 {
    const b = ((bits % 8) + 8) % 8;
    return new I8((((this.value & 0xff) >>> b) | (this.value << (8 - b))) & 0xff);
  }

  /**
   * Computes bitwise maj function with two other values.
   * For each bit position, returns 1 if at least two of the three values have 1.
   *
   * @param y - Second value
   * @param z - Third value
   * @returns A new I8 instance with the maj result
   *
   * @example
   * ```typescript
   * new I8(0b1010).maj(new I8(0b1100), new I8(0b1001)).value;  // 0b1000
   * ```
   */
  public maj(y: this, z: this): I8 {
    return new I8((this.value & y.value) | (this.value & z.value) | (y.value & z.value));
  }

  /**
   * Computes bitwise ch function with two other values.
   * For each bit position, returns y bit if this bit is 1, otherwise z bit.
   *
   * @param y - Value to ch from when bit is 1
   * @param z - Value to ch from when bit is 0
   * @returns A new I8 instance with the ch result
   *
   * @example
   * ```typescript
   * new I8(0b1010).ch(new I8(0b1111), new I8(0b0000)).value;  // 0b1010
   * ```
   */
  public ch(y: this, z: this): I8 {
    return new I8((this.value & y.value) | (~this.value & z.value));
  }
}
