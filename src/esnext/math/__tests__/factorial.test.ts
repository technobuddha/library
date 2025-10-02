import { factorial } from '../factorial.ts';

describe('factorial', () => {
  describe('basic factorial calculations', () => {
    test('should return 1 for factorial of 0', () => {
      expect(factorial(0)).toBe(1);
    });

    test('should return 1 for factorial of 1', () => {
      expect(factorial(1)).toBe(1);
    });

    test('should calculate factorial of small numbers', () => {
      expect(factorial(2)).toBe(2);
      expect(factorial(3)).toBe(6);
      expect(factorial(4)).toBe(24);
      expect(factorial(5)).toBe(120);
    });

    test('should calculate factorial of larger numbers', () => {
      expect(factorial(6)).toBe(720);
      expect(factorial(7)).toBe(5040);
      expect(factorial(10)).toBe(3628800);
      expect(factorial(12)).toBe(479001600);
    });
  });

  describe('error handling', () => {
    test('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => factorial(-5)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => factorial(-100)).toThrow('Factorial is only defined for non-negative integers');
    });

    test('should throw error for non-integer numbers', () => {
      expect(() => factorial(3.5)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => factorial(0.5)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => factorial(10.1)).toThrow('Factorial is only defined for non-negative integers');
    });

    test('should throw error for negative non-integers', () => {
      expect(() => factorial(-3.5)).toThrow('Factorial is only defined for non-negative integers');
    });
  });
});
