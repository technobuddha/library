import { Complex } from '../complex.ts';

describe('Complex', () => {
  describe('constructor', () => {
    test('should create a complex number with real and imaginary parts', () => {
      const c = new Complex(3, 4);
      expect(c.r).toBe(3);
      expect(c.i).toBe(4);
    });

    test('should handle zero values', () => {
      const c = new Complex(0, 0);
      expect(c.r).toBe(0);
      expect(c.i).toBe(0);
    });

    test('should handle negative values', () => {
      const c = new Complex(-2, -5);
      expect(c.r).toBe(-2);
      expect(c.i).toBe(-5);
    });
  });

  describe('add', () => {
    test('should add a real number to complex number', () => {
      const c = new Complex(3, 4);
      const result = c.add(2);
      expect(result.r).toBe(5);
      expect(result.i).toBe(4);
    });

    test('should add two complex numbers', () => {
      const c1 = new Complex(3, 4);
      const c2 = new Complex(1, 2);
      const result = c1.add(c2);
      expect(result.r).toBe(4);
      expect(result.i).toBe(6);
    });

    test('should not modify original complex number', () => {
      const c = new Complex(3, 4);
      c.add(2);
      expect(c.r).toBe(3);
      expect(c.i).toBe(4);
    });
  });

  describe('subtract', () => {
    test('should subtract a real number from complex number', () => {
      const c = new Complex(5, 4);
      const result = c.subtract(2);
      expect(result.r).toBe(3);
      expect(result.i).toBe(4);
    });

    test('should subtract two complex numbers', () => {
      const c1 = new Complex(5, 6);
      const c2 = new Complex(2, 3);
      const result = c1.subtract(c2);
      expect(result.r).toBe(3);
      expect(result.i).toBe(3);
    });

    test('should handle negative results', () => {
      const c1 = new Complex(1, 2);
      const c2 = new Complex(3, 4);
      const result = c1.subtract(c2);
      expect(result.r).toBe(-2);
      expect(result.i).toBe(-2);
    });
  });

  describe('multiply', () => {
    test('should multiply complex number by real number', () => {
      const c = new Complex(3, 4);
      const result = c.multiply(2);
      expect(result.r).toBe(6);
      expect(result.i).toBe(8);
    });

    test('should multiply two complex numbers', () => {
      const c1 = new Complex(3, 4);
      const c2 = new Complex(1, 2);
      const result = c1.multiply(c2);
      // (3 + 4i)(1 + 2i) = 3 + 6i + 4i + 8i² = 3 + 10i - 8 = -5 + 10i
      expect(result.r).toBe(-5);
      expect(result.i).toBe(10);
    });

    test('should handle multiplication by zero', () => {
      const c = new Complex(3, 4);
      const result = c.multiply(0);
      expect(result.r).toBe(0);
      expect(result.i).toBe(0);
    });
  });

  describe('divide', () => {
    test('should divide complex number by real number', () => {
      const c = new Complex(6, 8);
      const result = c.divide(2);
      expect(result.r).toBe(3);
      expect(result.i).toBe(4);
    });

    test('should divide two complex numbers', () => {
      const c1 = new Complex(1, 2);
      const c2 = new Complex(1, 1);
      const result = c1.divide(c2);
      // (1 + 2i) / (1 + i) = (1 + 2i)(1 - i) / ((1 + i)(1 - i)) = (1 - i + 2i - 2i²) / (1 - i²) = (1 + i + 2) / 2 = (3 + i) / 2
      expect(result.r).toBeCloseTo(1.5);
      expect(result.i).toBeCloseTo(0.5);
    });

    test('should handle division by complex number with zero real part', () => {
      const c1 = new Complex(2, 4);
      const c2 = new Complex(0, 2);
      const result = c1.divide(c2);
      // (2 + 4i) / (2i) = (2 + 4i)(-2i) / (2i)(-2i) = (-4i - 8i²) / 4 = (-4i + 8) / 4 = 2 - i
      expect(result.r).toBeCloseTo(2);
      expect(result.i).toBeCloseTo(-1);
    });
  });

  describe('conjugate', () => {
    test('should return complex conjugate', () => {
      const c = new Complex(3, 4);
      const result = c.conjugate();
      expect(result.r).toBe(3);
      expect(result.i).toBe(-4);
    });

    test('should handle zero imaginary part', () => {
      const c = new Complex(5, 0);
      const result = c.conjugate();
      expect(result.r).toBe(5);
      expect(result.i).toBe(-0);
    });

    test('should handle negative imaginary part', () => {
      const c = new Complex(2, -3);
      const result = c.conjugate();
      expect(result.r).toBe(2);
      expect(result.i).toBe(3);
    });
  });

  describe('abs', () => {
    test('should return magnitude as complex number with zero imaginary part', () => {
      const c = new Complex(3, 4);
      const result = c.abs();
      expect(result.r).toBe(5); // √(3² + 4²) = √(9 + 16) = √25 = 5
      expect(result.i).toBe(0);
    });

    test('should handle zero complex number', () => {
      const c = new Complex(0, 0);
      const result = c.abs();
      expect(result.r).toBe(0);
      expect(result.i).toBe(0);
    });

    test('should handle pure real number', () => {
      const c = new Complex(5, 0);
      const result = c.abs();
      expect(result.r).toBe(5);
      expect(result.i).toBe(0);
    });

    test('should handle pure imaginary number', () => {
      const c = new Complex(0, 3);
      const result = c.abs();
      expect(result.r).toBe(3);
      expect(result.i).toBe(0);
    });

    test('should handle negative components', () => {
      const c = new Complex(-3, -4);
      const result = c.abs();
      expect(result.r).toBe(5);
      expect(result.i).toBe(0);
    });
  });
});
