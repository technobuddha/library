import { type BigIntLike } from '../number/big-int-like.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toBigInt } from '../number/to-big-int.ts';
import { toNumber } from '../number/to-number.ts';

import { bitMask } from './bit-mask.ts';
import { countOnes } from './count-ones.ts';

/**
 * Abstract base class for fixed-width integer wrappers providing bitwise and arithmetic operations.
 * Concrete implementations include {@link I8}, {@link U8}, {@link I16}, {@link U16},
 * {@link I32}, {@link U32}, {@link I64}, and {@link U64}.
 *
 * All operations return new instances, ensuring immutability. Values are automatically
 * wrapped to the appropriate bit width and signedness of the concrete type.
 *
 * @typeParam T - The underlying numeric type (number or bigint)
 * @typeParam A - The acceptable input type for operations (NumberLike or BigIntLike)
 *
 * @group Binary
 * @category Representation
 */
export abstract class Int<
  Base extends number | bigint = number,
  Able = Base extends number ? NumberLike : BigIntLike,
> {
  /**
   * The wrapped integer value.
   * This property holds the normalized representation of the integer.
   */
  public abstract readonly value: Base;

  /**
   * The bit length of this integer type.
   */
  public abstract readonly len: number;

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(0b1010).or(0b0110).value;  // 0b1110 (14)
   * new I8(5).or(3).value;            // 7
   * ```
   */
  public abstract or(other: Able): Int<Base>;

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(0b1010).and(0b0110).value;  // 0b0010 (2)
   * new I8(5).and(3).value;            // 1
   * ```
   */
  public abstract and(other: Able): Int<Base>;

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(0b1010).xor(0b0110).value;  // 0b1100 (12)
   * new I8(5).xor(3).value;            // 6
   * ```
   */
  public abstract xor(other: Able): Int<Base>;

  /**
   * Performs bitwise NOT operation.
   *
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(0).not().value;     // -1
   * new I8(-1).not().value;    // 0
   * new I8(5).not().value;     // -6
   * ```
   */
  public abstract not(): Int<Base>;

  /**
   * Performs addition with wrapping.
   *
   * @param other - The value to add
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(10).add(20).value;    // 30
   * new I8(100).add(50).value;   // -106 (wrapped)
   * new I8(-10).add(-20).value;  // -30
   * ```
   */
  public abstract add(other: Able): Int<Base>;

  /**
   * Performs subtraction with wrapping.
   *
   * @param other - The value to subtract
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(30).subtract(10).value;    // 20
   * new I8(-100).subtract(50).value;  // 106 (wrapped)
   * new I8(10).subtract(20).value;    // -10
   * ```
   */
  public abstract sub(other: Able): Int<Base>;

  /**
   * Performs multiplication with wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new instance with the result
   *
   * @example
   * ```ts
   * new I8(5).multiply(3).value;     // 15
   * new I8(10).multiply(20).value;   // -56 (wrapped)
   * new I8(-5).multiply(3).value;    // -15
   * ```
   */
  public abstract mul(other: Able): Int<Base>;

  /**
   * Performs integer division, truncating towards zero.
   *
   * @param other - The divisor
   * @returns A new instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```ts
   * new I8(20).divide(3).value;   // 6
   * new I8(-20).divide(3).value;  // -6
   * new I8(10).divide(4).value;   // 2
   * ```
   */
  public abstract div(other: Able): Int<Base>;

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```ts
   * new I8(10).modulo(3).value;   // 1
   * new I8(-10).modulo(3).value;  // -1
   * new I8(100).modulo(7).value;  // 2
   * ```
   */
  public abstract mod(other: Able): Int<Base>;

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the valid range for the integer type.
   *
   * @param bits - Number of positions to shift
   * @returns A new instance with the shifted value
   *
   * @example
   * ```ts
   * new I8(1).shl(3).value;           // 8
   * new I8(0b1010).shl(1).value;      // 20 (wrapped to -20)
   * new I16(1).shl(8).value;          // 256
   * ```
   */
  public abstract shl(bits: number): Int<Base>;

  /**
   * Performs arithmetic right bit shift operation (sign-extending).
   * Shift amount is clamped to the valid range for the integer type.
   *
   * @param bits - Number of positions to shift
   * @returns A new instance with the shifted value
   *
   * @example
   * ```ts
   * new I8(8).shr(3).value;    // 1
   * new I8(-8).shr(1).value;   // -4 (sign-extended)
   * ```
   */
  public abstract shr(bits: number): Int<Base>;

  /**
   * Performs left rotation of bits.
   * Rotation amount wraps using modulo of the bit length.
   *
   * @param bits - Number of positions to rotate
   * @returns A new instance with the rotated value
   *
   * @example
   * ```ts
   * new I8(0b10100000).rotl(1).value;   // 0b01000001 (65)
   * new I8(0b00001111).rotl(4).value;   // 0b11110000 (-16)
   * ```
   */
  public abstract rotl(bits: number): Int<Base>;

  /**
   * Performs right rotation of bits.
   * Rotation amount wraps using modulo of the bit length.
   *
   * @param bits - Number of positions to rotate
   * @returns A new instance with the rotated value
   *
   * @example
   * ```ts
   * new I8(0b01000001).rotr(1).value;  // 0b10100000 (-96)
   * new I8(0b11110000).rotr(4).value;  // 0b00001111 (15)
   * ```
   */
  public abstract rotr(bits: number): Int<Base>;

  /**
   * Computes bitwise majority function with two other values.
   * For each bit position, returns 1 if at least two of the three values have 1.
   *
   * @param y - Second value
   * @param z - Third value
   * @returns A new instance with the majority result
   *
   * @example
   * ```ts
   * new I8(0b1010).maj(new I8(0b1100), new I8(0b1001)).value;  // 0b1000
   * ```
   */
  public abstract maj(y: Int<Base>, z: Int<Base>): Int<Base>;

  /**
   * Computes bitwise choose function with two other values.
   * For each bit position, returns y bit if this bit is 1, otherwise z bit.
   *
   * @param y - Value to choose from when bit is 1
   * @param z - Value to choose from when bit is 0
   * @returns A new instance with the choose result
   *
   * @example
   * ```ts
   * new I8(0b1010).ch(new I8(0b1111), new I8(0b0000)).value;  // 0b1010
   * ```
   */
  public abstract ch(y: Int<Base>, z: Int<Base>): Int<Base>;

  /**
   * Counts the number of 1 bits in the value.
   *
   * @returns The count of set bits
   *
   * @example
   * ```ts
   * new I8(0).cnt1();      // 0
   * new I8(0b1010).cnt1(); // 2
   * new I8(-1).cnt1();     // 8 (all bits set)
   * ```
   */
  public cnt1(): number {
    return countOnes(this.value & (bitMask(this.len) as Base));
  }

  /**
   * Counts the number of 0 bits in the value.
   *
   * @returns The count of unset bits
   *
   * @example
   * ```ts
   * new I8(0).cnt0();      // 8 (all bits unset)
   * new I8(0b1010).cnt0(); // 6
   * new I8(-1).cnt0();     // 0
   * ```
   */
  public cnt0(): number {
    return this.len - this.cnt1();
  }

  /**
   * Tests equality with another value.
   *
   * @param other - The value to compare with
   * @returns True if values are equal
   *
   * @example
   * ```ts
   * new I8(42).eq(42);           // true
   * new I8(42).eq(new I8(42));   // true
   * new I8(42).eq(43);           // false
   * new U16(100).eq('100');      // true
   * ```
   */
  public eq(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value === o;
  }

  /**
   * Tests inequality with another value.
   *
   * @param other - The value to compare with
   * @returns True if values are not equal
   *
   * @example
   * ```ts
   * new I8(42).ne(43);           // true
   * new I8(42).ne(new I8(42));   // false
   * new I8(42).ne(42);           // false
   * new U16(100).ne('99');       // true
   * ```
   */
  public ne(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value !== o;
  }

  /**
   * Tests if this value is less than another value.
   *
   * @param other - The value to compare with
   * @returns True if this value is less than other
   *
   * @example
   * ```ts
   * new I8(10).lt(20);           // true
   * new I8(42).lt(new I8(42));   // false
   * new I8(50).lt(40);           // false
   * new I8(-5).lt(5);            // true
   * ```
   */
  public lt(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value < o;
  }

  /**
   * Tests if this value is less than or equal to another value.
   *
   * @param other - The value to compare with
   * @returns True if this value is less than or equal to other
   *
   * @example
   * ```ts
   * new I8(10).le(20);           // true
   * new I8(42).le(new I8(42));   // true
   * new I8(50).le(40);           // false
   * new I8(-5).le(-5);           // true
   * ```
   */
  public le(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value <= o;
  }

  /**
   * Tests if this value is greater than another value.
   *
   * @param other - The value to compare with
   * @returns True if this value is greater than other
   *
   * @example
   * ```ts
   * new I8(50).gt(40);           // true
   * new I8(42).gt(new I8(42));   // false
   * new I8(10).gt(20);           // false
   * new I8(5).gt(-5);            // true
   * ```
   */
  public gt(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value > o;
  }

  /**
   * Tests if this value is greater than or equal to another value.
   *
   * @param other - The value to compare with
   * @returns True if this value is greater than or equal to other
   *
   * @example
   * ```ts
   * new I8(50).ge(40);           // true
   * new I8(42).ge(new I8(42));   // true
   * new I8(10).ge(20);           // false
   * new I8(5).ge(5);             // true
   * ```
   */
  public ge(other: Able): boolean {
    const o =
      typeof this.value === 'bigint' ?
        toBigInt(other as BigIntLike)
      : toNumber(other as NumberLike);
    return this.value >= o;
  }

  /**
   * Converts the value to a string representation.
   *
   * @param radix - The numeric base (2-36, default 10)
   * @returns String representation in the specified radix
   *
   * @example
   * ```ts
   * new I8(42).toString();     // "42"
   * new I8(42).toString(2);    // "101010"
   * new I8(42).toString(16);   // "2a"
   * new I8(-42).toString();    // "-42"
   * ```
   */
  public toString(radix?: number): string {
    return this.value.toString(radix);
  }

  /**
   * Returns the primitive numeric value.
   *
   * @returns The wrapped integer value
   *
   * @example
   * ```ts
   * new I8(42).valueOf();  // 42
   * new I8(200).valueOf(); // -56 (wrapped)
   * ```
   */
  public valueOf(): Base {
    return this.value;
  }

  /**
   * Converts the value to a primitive (number or string).
   * Used by JavaScript when the object needs to be coerced to a primitive.
   *
   * @param hint - The preferred type ('number', 'string', or 'default')
   * @returns The primitive value (number for 'number'/'default', string for 'string')
   */
  public [Symbol.toPrimitive](hint: 'number' | 'string' | 'default'): Base | string {
    return hint === 'string' ? this.toString() : this.value;
  }
}
