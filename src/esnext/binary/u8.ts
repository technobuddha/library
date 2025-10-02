import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * An 8-bit unsigned integer wrapper providing bitwise and arithmetic operations.
 * Values are automatically wrapped to the range [0, 255].
 *
 * @group Binary
 * @category Representation
 */
export class U8 extends Int {
  /**
   * Normalizes a value to an 8-bit unsigned integer.
   * Converts any to-number value to a number and wraps to 8 bits.
   *
   * @param value - The value to normalize
   * @returns An 8-bit unsigned integer
   *
   * @example
   * ```typescript
   * U8.normalize(100);     // 100
   * U8.normalize(300);     // 44 (wrapped)
   * U8.normalize('50');    // 50
   * U8.normalize(-50);     // 206 (wrapped)
   * ```
   */
  public static normalize(value: NumberLike): number {
    return (toNumber(value) & 0xff) >>> 0;
  }

  /**
   * The wrapped 8-bit unsigned integer value.
   * This property holds the normalized 8-bit representation of the integer.
   */
  public readonly value: number;

  /**
   * The bit length of this integer type (8).
   */
  public readonly len = 8;

  /**
   * Creates a new U8 instance with the value wrapped to 8-bit unsigned integer range.
   *
   * @param value - The initial value (will be wrapped to [0, 255])
   *
   * @example
   * ```typescript
   * new U8(100).value;   // 100
   * new U8(300).value;   // 44 (wrapped)
   * new U8(-50).value;   // 206 (wrapped)
   * new U8(255).value;   // 255
   * new U8('50').value;  // 50
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = U8.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(0b1010).or(new U8(0b0110)).value;  // 0b1110 (14)
   * new U8(5).or(new U8(3)).value;            // 7
   * new U8(5).or(3).value;                    // 7
   * ```
   */
  public or(other: NumberLike): U8 {
    return new U8(this.value | U8.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(0b1010).and(new U8(0b0110)).value;  // 0b0010 (2)
   * new U8(5).and(new U8(3)).value;            // 1
   * new U8(5).and(3).value;                    // 1
   * ```
   */
  public and(other: NumberLike): U8 {
    return new U8(this.value & U8.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(0b1010).xor(new U8(0b0110)).value;  // 0b1100 (12)
   * new U8(5).xor(new U8(3)).value;            // 6
   * new U8(5).xor(3).value;                    // 6
   * ```
   */
  public xor(other: NumberLike): U8 {
    return new U8(this.value ^ U8.normalize(other));
  }

  /**
   * Performs bitwise NOT operation.
   *
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(0).not().value;     // 255
   * new U8(255).not().value;   // 0
   * new U8(0b10101010).not().value;  // 0b01010101 (85)
   * ```
   */
  public not(): U8 {
    return new U8(~this.value);
  }

  /**
   * Performs addition with 8-bit unsigned integer wrapping.
   *
   * @param other - The value to add
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(10).add(new U8(20)).value;    // 30
   * new U8(200).add(new U8(100)).value;  // 44 (wrapped)
   * new U8(255).add(new U8(1)).value;    // 0 (wrapped)
   * new U8(10).add(20).value;            // 30
   * ```
   */
  public add(other: NumberLike): U8 {
    return new U8(this.value + U8.normalize(other));
  }

  /**
   * Performs subtraction with 8-bit unsigned integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(30).subtract(new U8(10)).value;   // 20
   * new U8(10).subtract(new U8(20)).value;   // 246 (wrapped)
   * new U8(0).subtract(new U8(1)).value;     // 255 (wrapped)
   * new U8(30).subtract(10).value;           // 20
   * ```
   */
  public sub(other: NumberLike): U8 {
    return new U8(this.value - U8.normalize(other));
  }

  /**
   * Performs multiplication with 8-bit unsigned integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new U8 instance with the result
   *
   * @example
   * ```typescript
   * new U8(5).multiply(new U8(3)).value;     // 15
   * new U8(20).multiply(new U8(20)).value;   // 144 (wrapped)
   * new U8(255).multiply(new U8(2)).value;   // 254 (wrapped)
   * new U8(5).multiply(3).value;             // 15
   * ```
   */
  public mul(other: NumberLike): U8 {
    return new U8(this.value * U8.normalize(other));
  }

  /**
   * Performs integer division, truncating towards zero.
   *
   * @param other - The divisor
   * @returns A new U8 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U8(20).divide(new U8(3)).value;   // 6
   * new U8(100).divide(new U8(10)).value; // 10
   * new U8(10).divide(new U8(4)).value;   // 2
   * new U8(20).divide(3).value;           // 6
   * ```
   */
  public div(other: NumberLike): U8 {
    const otherValue = U8.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U8((this.value / otherValue) >>> 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new U8 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U8(10).modulo(new U8(3)).value;   // 1
   * new U8(100).modulo(new U8(7)).value;  // 2
   * new U8(255).modulo(new U8(10)).value; // 5
   * new U8(10).modulo(3).value;           // 1
   * ```
   */
  public mod(other: NumberLike): U8 {
    const otherValue = U8.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U8(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 8].
   *
   * @param bits - Number of positions to shift (clamped to 0-8)
   * @returns A new U8 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U8(1).shl(3).value;   // 8
   * new U8(0b1010).shl(1).value;  // 0b10100 (20)
   * ```
   */
  public shl(bits: number): U8 {
    const b = clamp(bits, 0, 8);
    return new U8(this.value << b);
  }

  /**
   * Performs logical right bit shift operation.
   * Shift amount is clamped to the range [0, 8].
   * Uses zero-fill (logical) shift for unsigned values.
   *
   * @param bits - Number of positions to shift (clamped to 0-8)
   * @returns A new U8 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U8(8).shr(3).value;  // 1
   * new U8(0b10100).shr(1).value;  // 0b1010 (10)
   * new U8(255).shr(1).value;      // 127
   * ```
   */
  public shr(bits: number): U8 {
    const b = clamp(bits, 0, 8);
    return new U8(this.value >>> b);
  }

  /**
   * Performs left rotation of bits.
   * Rotation amount wraps using modulo 8.
   *
   * @param bits - Number of positions to rotate
   * @returns A new U8 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U8(0b10100000).rotl(1).value;   // 0b01000001 (65)
   * new U8(0b00001111).rotl(4).value;   // 0b11110000 (240)
   * ```
   */
  public rotl(bits: number): U8 {
    const b = ((bits % 8) + 8) % 8;
    return new U8(((this.value << b) | (this.value >>> (8 - b))) & 0xff);
  }

  /**
   * Performs right rotation of bits.
   * Rotation amount wraps using modulo 8.
   *
   * @param bits - Number of positions to rotate
   * @returns A new U8 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U8(0b01000001).rotr(1).value;  // 0b10100000 (160)
   * new U8(0b11110000).rotr(4).value;  // 0b00001111 (15)
   * ```
   */
  public rotr(bits: number): U8 {
    const b = ((bits % 8) + 8) % 8;
    return new U8(((this.value >>> b) | (this.value << (8 - b))) & 0xff);
  }

  /**
   * Computes bitwise maj function with two other values.
   * For each bit position, returns 1 if at least two of the three values have 1.
   *
   * @param y - Second value
   * @param z - Third value
   * @returns A new U8 instance with the maj result
   *
   * @example
   * ```typescript
   * new U8(0b1010).maj(new U8(0b1100), new U8(0b1001)).value;  // 0b1000
   * ```
   */
  public maj(y: U8, z: U8): U8 {
    return new U8((this.value & y.value) | (this.value & z.value) | (y.value & z.value));
  }

  /**
   * Computes bitwise ch function with two other values.
   * For each bit position, returns y bit if this bit is 1, otherwise z bit.
   *
   * @param y - Value to ch from when bit is 1
   * @param z - Value to ch from when bit is 0
   * @returns A new U8 instance with the ch result
   *
   * @example
   * ```typescript
   * new U8(0b1010).ch(new U8(0b1111), new U8(0b0000)).value;  // 0b1010
   * ```
   */
  public ch(y: U8, z: U8): U8 {
    return new U8((this.value & y.value) | (~this.value & z.value));
  }
}
