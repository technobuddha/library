import { evaluate } from '../evaluate.ts';

describe('evaluate', () => {
  describe('trigonometric functions', () => {
    test('should handle sin()', () => {
      expect(evaluate('sin(0)')).toBe(0);
      expect(evaluate('sin(π / 2)')).toBeCloseTo(1);
      expect(evaluate('sin(π)')).toBeCloseTo(0);
    });

    test('should handle cos()', () => {
      expect(evaluate('cos(0)')).toBe(1);
      expect(evaluate('cos(π / 2)')).toBeCloseTo(0);
      expect(evaluate('cos(π)')).toBeCloseTo(-1);
    });

    test('should handle tan()', () => {
      expect(evaluate('tan(0)')).toBe(0);
      expect(evaluate('tan(π / 4)')).toBeCloseTo(1);
    });

    test('should handle asin()', () => {
      expect(evaluate('asin(0)')).toBe(0);
      expect(evaluate('asin(1)')).toBeCloseTo(Math.PI / 2);
      expect(evaluate('asin(-1)')).toBeCloseTo(-Math.PI / 2);
    });

    test('should handle acos()', () => {
      expect(evaluate('acos(1)')).toBe(0);
      expect(evaluate('acos(0)')).toBeCloseTo(Math.PI / 2);
      expect(evaluate('acos(-1)')).toBeCloseTo(Math.PI);
    });

    test('should handle atan()', () => {
      expect(evaluate('atan(0)')).toBe(0);
      expect(evaluate('atan(1)')).toBeCloseTo(Math.PI / 4);
    });

    test('should handle atan2()', () => {
      expect(evaluate('atan2(0, 1)')).toBe(0);
      expect(evaluate('atan2(1, 0)')).toBeCloseTo(Math.PI / 2);
      expect(evaluate('atan2(1, 1)')).toBeCloseTo(Math.PI / 4);
    });
  });

  describe('hyperbolic functions', () => {
    test('should handle sinh()', () => {
      expect(evaluate('sinh(0)')).toBe(0);
      expect(evaluate('sinh(1)')).toBeCloseTo(Math.sinh(1));
    });

    test('should handle cosh()', () => {
      expect(evaluate('cosh(0)')).toBe(1);
      expect(evaluate('cosh(1)')).toBeCloseTo(Math.cosh(1));
    });

    test('should handle tanh()', () => {
      expect(evaluate('tanh(0)')).toBe(0);
      expect(evaluate('tanh(1)')).toBeCloseTo(Math.tanh(1));
    });

    test('should handle asinh()', () => {
      expect(evaluate('asinh(0)')).toBe(0);
      expect(evaluate('asinh(1)')).toBeCloseTo(Math.asinh(1));
    });

    test('should handle acosh()', () => {
      expect(evaluate('acosh(1)')).toBe(0);
      expect(evaluate('acosh(2)')).toBeCloseTo(Math.acosh(2));
    });

    test('should handle atanh()', () => {
      expect(evaluate('atanh(0)')).toBe(0);
      expect(evaluate('atanh(0.5)')).toBeCloseTo(Math.atanh(0.5));
    });
  });

  describe('power and root functions', () => {
    test('should handle sqrt()', () => {
      expect(evaluate('sqrt(4)')).toBe(2);
      expect(evaluate('sqrt(9)')).toBe(3);
      expect(evaluate('sqrt(16)')).toBe(4);
      expect(evaluate('sqrt(2)')).toBeCloseTo(Math.sqrt(2));
    });

    test('should handle cbrt()', () => {
      expect(evaluate('cbrt(8)')).toBe(2);
      expect(evaluate('cbrt(27)')).toBe(3);
      expect(evaluate('cbrt(-8)')).toBe(-2);
    });

    test('should handle pow()', () => {
      expect(evaluate('pow(2, 3)')).toBe(8);
      expect(evaluate('pow(5, 2)')).toBe(25);
      expect(evaluate('pow(10, 0)')).toBe(1);
      expect(evaluate('pow(2, -1)')).toBe(0.5);
    });

    test('should handle exp()', () => {
      expect(evaluate('exp(0)')).toBe(1);
      expect(evaluate('exp(1)')).toBeCloseTo(Math.E);
      expect(evaluate('exp(2)')).toBeCloseTo(Math.exp(2));
    });

    test('should handle expm1()', () => {
      expect(evaluate('expm1(0)')).toBe(0);
      expect(evaluate('expm1(1)')).toBeCloseTo(Math.expm1(1));
    });

    test('should handle hypot()', () => {
      expect(evaluate('hypot(3, 4)')).toBe(5);
      expect(evaluate('hypot(5, 12)')).toBe(13);
      expect(evaluate('hypot(1, 1, 1)')).toBeCloseTo(Math.sqrt(3));
    });
  });

  describe('logarithmic functions', () => {
    test('should handle log()', () => {
      expect(evaluate('log(1)')).toBe(0);
      expect(evaluate('log(e)')).toBeCloseTo(1);
      expect(evaluate('log(e ^ 2)')).toBeCloseTo(2);
    });

    test('should handle log10()', () => {
      expect(evaluate('log10(1)')).toBe(0);
      expect(evaluate('log10(10)')).toBe(1);
      expect(evaluate('log10(100)')).toBe(2);
      expect(evaluate('log10(1000)')).toBe(3);
    });

    test('should handle log2()', () => {
      expect(evaluate('log2(1)')).toBe(0);
      expect(evaluate('log2(2)')).toBe(1);
      expect(evaluate('log2(8)')).toBe(3);
      expect(evaluate('log2(1024)')).toBe(10);
    });

    test('should handle log1p()', () => {
      expect(evaluate('log1p(0)')).toBe(0);
      expect(evaluate('log1p(e - 1)')).toBeCloseTo(1);
    });
  });

  describe('rounding functions', () => {
    test('should handle ceil()', () => {
      expect(evaluate('ceil(4.1)')).toBe(5);
      expect(evaluate('ceil(4.9)')).toBe(5);
      expect(evaluate('ceil(-4.1)')).toBe(-4);
      expect(evaluate('ceil(5)')).toBe(5);
    });

    test('should handle floor()', () => {
      expect(evaluate('floor(4.1)')).toBe(4);
      expect(evaluate('floor(4.9)')).toBe(4);
      expect(evaluate('floor(-4.1)')).toBe(-5);
      expect(evaluate('floor(5)')).toBe(5);
    });

    test('should handle round()', () => {
      expect(evaluate('round(4.4)')).toBe(4);
      expect(evaluate('round(4.5)')).toBe(5);
      expect(evaluate('round(4.6)')).toBe(5);
      expect(evaluate('round(-4.5)')).toBe(-4);
    });

    test('should handle trunc()', () => {
      expect(evaluate('trunc(4.9)')).toBe(4);
      expect(evaluate('trunc(-4.9)')).toBe(-4);
      expect(evaluate('trunc(5)')).toBe(5);
    });
  });

  describe('basic math functions', () => {
    test('should handle abs()', () => {
      expect(evaluate('abs(5)')).toBe(5);
      expect(evaluate('abs(-5)')).toBe(5);
      expect(evaluate('abs(0)')).toBe(0);
      expect(evaluate('abs(-3.14)')).toBe(3.14);
    });

    test('should handle sign()', () => {
      expect(evaluate('sign(5)')).toBe(1);
      expect(evaluate('sign(-5)')).toBe(-1);
      expect(evaluate('sign(0)')).toBe(0);
    });

    test('should handle max()', () => {
      expect(evaluate('max(1, 2, 3)')).toBe(3);
      expect(evaluate('max(5, 2, 8, 1)')).toBe(8);
      expect(evaluate('max(-1, -5, -3)')).toBe(-1);
      expect(evaluate('max(10)')).toBe(10);
    });

    test('should handle min()', () => {
      expect(evaluate('min(1, 2, 3)')).toBe(1);
      expect(evaluate('min(5, 2, 8, 1)')).toBe(1);
      expect(evaluate('min(-1, -5, -3)')).toBe(-5);
      expect(evaluate('min(10)')).toBe(10);
    });
  });

  describe('custom math functions', () => {
    test('should handle clamp()', () => {
      expect(evaluate('clamp(15, 0, 10)')).toBe(10);
      expect(evaluate('clamp(-5, 0, 10)')).toBe(0);
      expect(evaluate('clamp(5, 0, 10)')).toBe(5);
    });

    test('should handle factorial()', () => {
      expect(evaluate('factorial(0)')).toBe(1);
      expect(evaluate('factorial(1)')).toBe(1);
      expect(evaluate('factorial(5)')).toBe(120);
      expect(evaluate('factorial(6)')).toBe(720);
    });

    test('should handle lerp()', () => {
      expect(evaluate('lerp(0, 10, 0)')).toBe(0);
      expect(evaluate('lerp(0, 10, 1)')).toBe(10);
      expect(evaluate('lerp(0, 10, 0.5)')).toBe(5);
      expect(evaluate('lerp(20, 30, 0.25)')).toBe(22.5);
    });

    test('should handle modulo()', () => {
      expect(evaluate('modulo(10, 3)')).toBe(1);
      expect(evaluate('modulo(-10, 3)')).toBe(2);
      expect(evaluate('modulo(10, -3)')).toBe(-2);
    });
  });

  describe('nested function calls', () => {
    test('should handle functions within functions', () => {
      expect(evaluate('sqrt(pow(3, 2) + pow(4, 2))')).toBe(5);
      expect(evaluate('abs(sin(π))')).toBeCloseTo(0);
      expect(evaluate('max(abs(-5), abs(-3))')).toBe(5);
    });

    test('should handle deeply nested functions', () => {
      expect(evaluate('sqrt(sqrt(16))')).toBe(2);
      expect(evaluate('abs(abs(abs(-5)))')).toBe(5);
      expect(evaluate('floor(ceil(4.5))')).toBe(5);
    });

    test('should handle functions with expressions', () => {
      expect(evaluate('sin(2 * π)')).toBeCloseTo(0);
      expect(evaluate('sqrt(3 ^ 2 + 4 ^ 2)')).toBe(5);
      expect(evaluate('max(1 + 2, 3 + 4, 5 + 6)')).toBe(11);
    });
  });

  describe('functions with variables', () => {
    test('should handle functions with variable arguments', () => {
      expect(evaluate('sin(x)', { x: 0 })).toBe(0);
      expect(evaluate('sqrt(x)', { x: 16 })).toBe(4);
      expect(evaluate('pow(x, 2)', { x: 5 })).toBe(25);
    });

    test('should handle functions in complex expressions with variables', () => {
      expect(evaluate('2 * sin(x) + 3', { x: 0 })).toBe(3);
      expect(evaluate('sqrt(x ^ 2 + y ^ 2)', { x: 3, y: 4 })).toBe(5);
      expect(evaluate('max(a, b, c)', { a: 1, b: 5, c: 3 })).toBe(5);
    });
  });

  describe('error handling', () => {
    test('should throw error for wrong number of arguments', () => {
      expect(() => evaluate('sin()')).toThrow('sin() takes 1 argument');
      expect(() => evaluate('sin(1, 2)')).toThrow('sin() takes 1 argument');
      expect(() => evaluate('pow(2)')).toThrow('pow() takes 2 arguments');
      expect(() => evaluate('pow(2, 3, 4)')).toThrow('pow() takes 2 arguments');
      expect(() => evaluate('clamp(1, 2)')).toThrow('clamp() takes 3 arguments');
    });

    test('should throw error for variadic functions with no arguments', () => {
      expect(() => evaluate('max()')).toThrow('max() takes at least 1 argument');
      expect(() => evaluate('min()')).toThrow('min() takes at least 1 argument');
    });
  });

  describe('mixed operators and functions', () => {
    test('should handle functions with arithmetic operators', () => {
      expect(evaluate('2 + sqrt(16)')).toBe(6);
      expect(evaluate('sqrt(16) * 3')).toBe(12);
      expect(evaluate('10 / sqrt(4)')).toBe(5);
      expect(evaluate('pow(2, 3) + 4')).toBe(12);
    });

    test('should handle functions with parentheses', () => {
      expect(evaluate('(2 + 3) * sqrt(4)')).toBe(10);
      expect(evaluate('sqrt(4) * (5 + 3)')).toBe(16);
    });

    test('should handle functions with special operators', () => {
      expect(evaluate('sqrt(16)²')).toBe(16);
      expect(evaluate('factorial(3)!')).toBe(720);
      expect(evaluate('|sin(π)|')).toBeCloseTo(0);
    });
  });

  describe('real-world calculations', () => {
    test('should calculate hypotenuse', () => {
      expect(evaluate('hypot(3, 4)')).toBe(5);
      expect(evaluate('sqrt(pow(3, 2) + pow(4, 2))')).toBe(5);
    });

    test('should calculate circle area and circumference', () => {
      expect(evaluate('π * pow(5, 2)')).toBeCloseTo(78.53981633974483);
      expect(evaluate('2 * π * 5')).toBeCloseTo(31.41592653589793);
    });

    test('should calculate angles and trigonometry', () => {
      expect(evaluate('atan2(1, 1) * 180 / π')).toBeCloseTo(45);
      expect(evaluate('asin(0.5) * 180 / π')).toBeCloseTo(30);
    });

    test('should handle compound interest calculation', () => {
      // A = P * (1 + r)^t
      const principal = 1000;
      const rate = 0.05;
      const time = 10;
      expect(evaluate(`${principal} * pow(1 + ${rate}, ${time})`)).toBeCloseTo(1628.89, 1);
    });
  });

  describe('function combinations', () => {
    test('should combine multiple function types', () => {
      expect(evaluate('max(abs(-5), sqrt(16), ceil(3.2))')).toBe(5);
      expect(evaluate('min(floor(4.9), round(3.5), trunc(5.8))')).toBe(4);
    });
  });
});
