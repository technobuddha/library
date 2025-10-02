import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Represents a complex number with real and imaginary components.
 *
 * Provides basic arithmetic operations (addition, subtraction, multiplication, division)
 * and utility methods for working with complex numbers.
 *
 * @group Math
 * @category Complex Numbers
 */
export class Complex {
  /** The real component of the complex number */
  public r: number;

  /** The imaginary component of the complex number */
  public i: number;

  /**
   * Creates a new Complex number.
   *
   * @param r - The real component
   * @param i - The imaginary component
   */
  public constructor(r: NumberLike, i: NumberLike) {
    this.r = toNumber(r);
    this.i = toNumber(i);
  }

  /**
   * Adds a real number to this complex number.
   *
   * @param n - The real number to add
   * @returns A new Complex number representing the sum
   */
  public add(n: NumberLike): Complex;
  /**
   * Adds another complex number to this complex number.
   *
   * @param c - The complex number to add
   * @returns A new Complex number representing the sum
   */
  public add(c: Complex): Complex;
  /**
   * Adds a number or complex number to this complex number.
   *
   * @param v - The value to add (number or Complex)
   * @returns A new Complex number representing the sum
   */
  public add(v: NumberLike | Complex): Complex {
    if (v instanceof Complex) {
      return new Complex(this.r + v.r, this.i + v.i);
    }
    return new Complex(this.r + toNumber(v), this.i);
  }

  /**
   * Subtracts a real number from this complex number.
   *
   * @param n - The real number to subtract
   * @returns A new Complex number representing the difference
   */
  public subtract(n: NumberLike): Complex;
  /**
   * Subtracts another complex number from this complex number.
   *
   * @param c - The complex number to subtract
   * @returns A new Complex number representing the difference
   */
  public subtract(c: Complex): Complex;
  /**
   * Subtracts a number or complex number from this complex number.
   *
   * @param v - The value to subtract (number or Complex)
   * @returns A new Complex number representing the difference
   */
  public subtract(v: NumberLike | Complex): Complex {
    if (v instanceof Complex) {
      return new Complex(this.r - v.r, this.i - v.i);
    }
    return new Complex(this.r - toNumber(v), this.i);
  }

  /**
   * Multiplies this complex number by a real number.
   *
   * @param n - The real number to multiply by
   * @returns A new Complex number representing the product
   */
  public multiply(n: NumberLike): Complex;
  /**
   * Multiplies this complex number by another complex number.
   *
   * @param c - The complex number to multiply by
   * @returns A new Complex number representing the product
   */
  public multiply(c: Complex): Complex;
  /**
   * Multiplies this complex number by a number or complex number.
   *
   * @param v - The value to multiply by (number or Complex)
   * @returns A new Complex number representing the product
   */
  public multiply(v: NumberLike | Complex): Complex {
    if (v instanceof Complex) {
      return new Complex(this.r * v.r - this.i * v.i, this.r * v.i + this.i * v.r);
    }
    const multiplicand = toNumber(v);
    return new Complex(this.r * multiplicand, this.i * multiplicand);
  }

  /**
   * Divides this complex number by a real number.
   *
   * @param n - The real number to divide by
   * @returns A new Complex number representing the quotient
   */
  public divide(n: NumberLike): Complex;
  /**
   * Divides this complex number by another complex number.
   *
   * @param c - The complex number to divide by
   * @returns A new Complex number representing the quotient
   */
  public divide(c: Complex): Complex;
  /**
   * Divides this complex number by a number or complex number.
   *
   * @param v - The value to divide by (number or Complex)
   * @returns A new Complex number representing the quotient
   */
  public divide(v: NumberLike | Complex): Complex {
    if (v instanceof Complex) {
      const denom = v.r ** 2 + v.i ** 2;
      return new Complex(
        (this.r * v.r + this.i * v.i) / denom,
        (this.i * v.r - this.r * v.i) / denom,
      );
    }

    const divisor = toNumber(v);
    return new Complex(this.r / divisor, this.i / divisor);
  }

  /**
   * Returns the complex conjugate of this complex number.
   *
   * The complex conjugate of a + bi is a - bi.
   *
   * @returns A new Complex number representing the conjugate
   */
  public conjugate(): Complex {
    return new Complex(this.r, -this.i);
  }

  /**
   * Returns the absolute value (magnitude) of this complex number as a real number.
   *
   * The absolute value is calculated as √(r² + i²) and returned as a Complex number
   * with zero imaginary component.
   *
   * @returns A new Complex number with the magnitude as the real part and 0 as imaginary
   */
  public abs(): Complex {
    return new Complex(Math.hypot(this.r, this.i), 0);
  }
}
