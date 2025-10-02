import { clamp } from '../math/clamp.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { Int } from './int.ts';

/**
 * A 32-bit unsigned integer wrapper providing bitwise operations and manipulations.
 * All operations return new U32 instances, ensuring immutability.
 *
 * @example
 * ```typescript
 * const a = new U32(0b1100);
 * const b = new U32(0b1010);
 *
 * a.and(b).value;  // 0b1000 (8)
 * a.or(b).value;   // 0b1110 (14)
 * a.xor(b).value;  // 0b0110 (6)
 * a.not().value;   // ~0b1100 (4294967283)
 *
 * const x = new U32(0x12345678);
 * x.rotl(8).value;   // 0x34567812
 * x.cnt1();           // 13
 * ```
 *
 * @group Binary
 * @category Representation
 */
export class U32 extends Int {
  /**
   * Normalizes a value to a 32-bit unsigned integer.
   * Converts any to-number value to a number and truncates to 32 bits using unsigned right shift.
   *
   * @param value - The value to normalize
   * @returns A 32-bit unsigned integer
   *
   * @example
   * ```typescript
   * U32.normalize(42);           // 42
   * U32.normalize(-1);           // 4294967295
   * U32.normalize('123');        // 123
   * U32.normalize(4294967296);   // 0
   * ```
   */
  public static normalize(value: NumberLike): number {
    return toNumber(value) >>> 0;
  }

  /**
   * Creates a U32 instance from a byte array in big-endian order.
   * Reads 4 bytes starting at the specified offset and combines them into a 32-bit unsigned integer.
   *
   * @param bytes - The byte array to read from
   * @param offset - The index offset (in 4-byte chunks) to start reading from. Defaults to 0
   * @returns A new U32 instance with the value constructed from the bytes
   *
   * @example
   * ```typescript
   * const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
   * U32.fromBytes(bytes).value;       // 0x12345678 (305419896)
   * U32.fromBytes(bytes, 0).value;    // 0x12345678
   * ```
   */
  public static fromBytes(bytes: Uint8Array, offset = 0): U32 {
    const b0 = bytes[offset * 4 + 0] ?? 0;
    const b1 = bytes[offset * 4 + 1] ?? 0;
    const b2 = bytes[offset * 4 + 2] ?? 0;
    const b3 = bytes[offset * 4 + 3] ?? 0;
    return new U32((b0 << 24) | (b1 << 16) | (b2 << 8) | b3);
  }

  /**
   * The 32-bit unsigned integer value.
   * This property holds the normalized 32-bit representation of the integer.
   */
  public value: number;

  /**
   * The bit length of this integer type (32).
   */
  public readonly len = 32;

  /**
   * Creates a new 32-bit unsigned integer.
   * Values are automatically converted to unsigned 32-bit integers.
   *
   * @param value - The initial value (will be converted to 32-bit unsigned integer)
   *
   * @example
   * ```ts
   * new U32(100).value;           // 100
   * new U32(-1).value;            // 4294967295
   * new U32(4294967296).value;    // 0 (wrapped)
   * new U32(42).len;              // 32
   * ```
   *
   * @example
   * ```typescript
   * new U32(42).value;           // 42
   * new U32(-1).value;           // 4294967295
   * new U32(3.7).value;          // 3 (truncated)
   * new U32(4294967296).value;   // 0 (wrapped)
   * ```
   */
  public constructor(value: NumberLike) {
    super();
    this.value = U32.normalize(value);
  }

  /**
   * Performs bitwise OR operation.
   *
   * @param other - The value to OR with
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(0b1100).or(new U32(0b1010)).value;  // 0b1110 (14)
   * ```
   */
  public or(other: NumberLike): U32 {
    return new U32(this.value | U32.normalize(other));
  }

  /**
   * Performs bitwise AND operation.
   *
   * @param other - The value to AND with
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(0b1100).and(new U32(0b1010)).value;  // 0b1000 (8)
   * ```
   */
  public and(other: NumberLike): U32 {
    return new U32(this.value & U32.normalize(other));
  }

  /**
   * Performs bitwise XOR operation.
   *
   * @param other - The value to XOR with
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(0b1100).xor(new U32(0b1010)).value;  // 0b0110 (6)
   * new U32(42).xor(new U32(42)).value;          // 0
   * ```
   */
  public xor(other: NumberLike): U32 {
    return new U32(this.value ^ U32.normalize(other));
  }

  /**
   * Performs bitwise NOT operation (one's complement).
   *
   * @returns A new U32 instance with all bits flipped
   *
   * @example
   * ```typescript
   * new U32(0).not().value;   // 4294967295
   * new U32(0xFFFFFFFF).not().value;  // 0
   * new U32(42).not().value;  // 4294967253
   * ```
   */
  public not(): U32 {
    return new U32(~this.value);
  }

  /**
   * Performs addition with 32-bit unsigned integer wrapping.
   *
   * @param other - The value to add
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(10).add(new U32(5)).value;           // 15
   * new U32(4294967295).add(new U32(1)).value;   // 0 (overflow wraps)
   * new U32(100).add(new U32(200)).value;        // 300
   * ```
   */
  public add(other: NumberLike): U32 {
    return new U32(this.value + U32.normalize(other));
  }

  /**
   * Performs subtraction with 32-bit unsigned integer wrapping.
   *
   * @param other - The value to subtract
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(10).subtract(new U32(5)).value;  // 5
   * new U32(0).subtract(new U32(1)).value;   // 4294967295 (underflow wraps)
   * new U32(100).subtract(new U32(50)).value;  // 50
   * ```
   */
  public sub(other: NumberLike): U32 {
    return new U32(this.value - U32.normalize(other));
  }

  /**
   * Performs multiplication with 32-bit unsigned integer wrapping.
   *
   * @param other - The value to multiply by
   * @returns A new U32 instance with the result
   *
   * @example
   * ```typescript
   * new U32(10).multiply(new U32(5)).value;     // 50
   * new U32(100000).multiply(new U32(100000)).value;  // 1215752192 (overflow wraps)
   * ```
   */
  public mul(other: NumberLike): U32 {
    return new U32(this.value * U32.normalize(other));
  }

  /**
   * Performs integer division (truncates toward zero).
   *
   * @param other - The value to divide by
   * @returns A new U32 instance with the result
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U32(10).divide(new U32(3)).value;  // 3
   * new U32(100).divide(new U32(7)).value;  // 14
   * ```
   */
  public div(other: NumberLike): U32 {
    const otherValue = U32.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U32((this.value / otherValue) >>> 0);
  }

  /**
   * Performs modulo operation (remainder after division).
   *
   * @param other - The divisor
   * @returns A new U32 instance with the remainder
   * @throws RangeError if dividing by zero
   *
   * @example
   * ```typescript
   * new U32(10).modulo(new U32(3)).value;  // 1
   * new U32(100).modulo(new U32(7)).value;  // 2
   * ```
   */
  public mod(other: NumberLike): U32 {
    const otherValue = U32.normalize(other);
    if (otherValue === 0) {
      throw new RangeError('Division by zero');
    }
    return new U32(this.value % otherValue);
  }

  /**
   * Performs left bit shift operation.
   * Shift amount is clamped to the range [0, 32].
   *
   * @param bits - Number of positions to shift (clamped to 0-32)
   * @returns A new U32 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U32(1).shl(3).value;   // 8
   * new U32(0b1010).shl(1).value;  // 0b10100 (20)
   * ```
   */
  public shl(bits: number): U32 {
    const b = clamp(bits, 0, 32);
    return new U32(this.value << b);
  }

  /**
   * Performs logical right bit shift operation (zero-fill).
   * Shift amount is clamped to the range [0, 32].
   *
   * @param bits - Number of positions to shift (clamped to 0-32)
   * @returns A new U32 instance with the shifted value
   *
   * @example
   * ```typescript
   * new U32(8).shr(3).value;    // 1
   * new U32(0xFFFFFFFF).shr(1).value;  // 0x7FFFFFFF (zero-fill)
   * ```
   */
  public shr(bits: number): U32 {
    const b = clamp(bits, 0, 32);
    return new U32(this.value >>> b);
  }

  /**
   * Performs left rotation (circular shift).
   * Bits shifted off the left end wrap around to the right.
   * Rotation amount uses modulo 32. Negative values rotate right.
   *
   * @param bits - Number of positions to rotate (modulo 32)
   * @returns A new U32 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U32(0x12345678).rotl(4).value;   // 0x23456781
   * new U32(0x80000001).rotl(1).value;   // 0x00000003
   * new U32(0x12345678).rotl(36).value;  // Same as rotl(4)
   * new U32(0x12345678).rotl(-4).value;  // Same as rotr(4)
   * ```
   */
  public rotl(bits: number): U32 {
    const b = bits % 32;
    if (b < 0) {
      return this.rotr(-b);
    }
    return new U32((this.value << b) | (this.value >>> (32 - b)));
  }

  /**
   * Performs right rotation (circular shift).
   * Bits shifted off the right end wrap around to the left.
   * Rotation amount uses modulo 32. Negative values rotate left.
   *
   * @param bits - Number of positions to rotate (modulo 32)
   * @returns A new U32 instance with the rotated value
   *
   * @example
   * ```typescript
   * new U32(0x12345678).rotr(4).value;   // 0x81234567
   * new U32(0x00000003).rotr(1).value;   // 0x80000001
   * new U32(0x12345678).rotr(36).value;  // Same as rotr(4)
   * new U32(0x12345678).rotr(-4).value;  // Same as rotl(4)
   * ```
   */
  public rotr(bits: number): U32 {
    const b = bits % 32;
    if (b < 0) {
      return this.rotl(-b);
    }
    return new U32((this.value >>> b) | (this.value << (32 - b)));
  }

  /**
   * Computes the maj function used in cryptographic algorithms.
   * For each bit position, returns 1 if at least two of the three inputs are 1.
   *
   * @param y - Second operand
   * @param z - Third operand
   * @returns A new U32 instance with the maj result
   *
   * @example
   * ```typescript
   * const x = new U32(0b1110);
   * const y = new U32(0b1010);
   * const z = new U32(0b1100);
   * x.maj(y, z).value;  // 0b1110
   * ```
   */
  public maj(y: U32, z: U32): U32 {
    return new U32((this.value & y.value) | (z.value & (this.value | y.value)));
  }

  /**
   * Computes the ch function used in cryptographic algorithms.
   * For each bit position, chs bits from y where this value is 1, or from z where this value is 0.
   *
   * @param y - Value to ch from when corresponding bit is 1
   * @param z - Value to ch from when corresponding bit is 0
   * @returns A new U32 instance with the chosen bits
   *
   * @example
   * ```typescript
   * const x = new U32(0b1100);
   * const y = new U32(0b1010);
   * const z = new U32(0b0101);
   * x.ch(y, z).value;  // 0b1001
   * ```
   */
  public ch(y: U32, z: U32): U32 {
    return new U32(((this.value & y.value) ^ (~this.value & z.value)) >>> 0);
  }

  /**
   * Converts the 32-bit unsigned integer to a 4-byte array in big-endian order.
   * The most significant byte is first, followed by progressively less significant bytes.
   *
   * @returns A tuple of 4 numbers representing the bytes in big-endian order
   *
   * @example
   * ```typescript
   * new U32(0x12345678).toBytes();  // [0x12, 0x34, 0x56, 0x78]
   * new U32(305419896).toBytes();   // [18, 52, 86, 120]
   * new U32(0).toBytes();           // [0, 0, 0, 0]
   * new U32(0xffffffff).toBytes();  // [255, 255, 255, 255]
   * ```
   */
  public toBytes(): [number, number, number, number] {
    return [
      (this.value >>> 24) & 0xff,
      (this.value >>> 16) & 0xff,
      (this.value >>> 8) & 0xff,
      (this.value >>> 0) & 0xff,
    ];
  }

  /**
   * Computes the SHA-224/SHA-256 γ₀ (gamma0) function for a 32-bit integer.
   *
   * This function performs a bitwise rotation and shift, then combines the results using XOR,
   * as defined in the SHA-2 specification:
   *   γ₀(x) = ROTR⁷(x) ⊕ ROTR¹⁸(x) ⊕ SHR³(x)
   * @returns The result of the γ₀ transformation.
   * @internal
   */
  public gamma0(): U32 {
    const x = this.value;
    return new U32(((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3));
  }

  /**
   * Computes the SHA-224/SHA-256 γ₁ (gamma1) function for a 32-bit integer.
   *
   * This function performs bitwise operations as defined in the SHA-2 specification:
   *   γ₁(x) = ROTR¹⁷(x) ⊕ ROTR¹⁹(x) ⊕ SHR¹⁰(x)
   * where:
   *   - ROTR^n(x) is the right rotation of x by n bits,
   *   - SHR^n(x) is the right shift of x by n bits.
   * @param x - The 32-bit integer input.
   * @returns The result of applying the γ₁ function to the input.
   * @internal
   */
  public gamma1(): U32 {
    const x = this.value;
    return new U32(((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10));
  }

  /**
   * Computes the SHA-224/SHA-256 σ₀ (sigma0) function for a 32-bit integer.
   *
   * This function performs a bitwise rotation and XOR combination as defined in the SHA-2 specification:
   *   σ₀(x) = ROTR²(x) ⊕ ROTR¹³(x) ⊕ ROTR²²(x)
   * @param x - The 32-bit integer input.
   * @returns The result of applying the σ₀ function to the input.
   * @internal
   */
  public sigma0(): U32 {
    const x = this.value;
    return new U32(((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ ((x >>> 22) | (x << 10)));
  }

  /**
   * Computes the SHA-224/SHA-256 σ₁ (sigma1) function for a 32-bit integer.
   *
   * This function performs bitwise right rotations and XORs as defined in the SHA-2 specification:
   *   σ₁(x) = ROTR⁶(x) ⊕ ROTR¹¹(x) ⊕ ROTR²⁵(x)
   * @param x - The 32-bit integer input.
   * @returns The result of applying the σ₁ function to the input.
   * @internal
   */
  public sigma1(): U32 {
    const x = this.value;
    return new U32(((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ ((x >>> 25) | (x << 7)));
  }
}
