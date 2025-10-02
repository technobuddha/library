import { evaluate } from '../evaluate.ts';

describe('evaluate', () => {
  describe('basic arithmetic operations', () => {
    test('should handle addition', () => {
      expect(evaluate('2 + 3')).toBe(5);
      expect(evaluate('10 + 20 + 30')).toBe(60);
      expect(evaluate('0 + 0')).toBe(0);
    });

    test('should handle subtraction', () => {
      expect(evaluate('5 - 3')).toBe(2);
      expect(evaluate('10 - 5 - 2')).toBe(3);
      expect(evaluate('0 - 5')).toBe(-5);
    });

    test('should handle multiplication', () => {
      expect(evaluate('2 * 3')).toBe(6);
      expect(evaluate('4 * 5 * 2')).toBe(40);
      expect(evaluate('0 * 100')).toBe(0);
    });

    test('should handle division', () => {
      expect(evaluate('10 / 2')).toBe(5);
      expect(evaluate('20 / 4 / 2')).toBe(2.5);
      expect(evaluate('7 / 2')).toBe(3.5);
    });

    test('should handle modulo', () => {
      expect(evaluate('10 % 3')).toBe(1);
      expect(evaluate('15 % 4')).toBe(3);
      expect(evaluate('8 % 2')).toBe(0);
    });

    test('should handle exponentiation', () => {
      expect(evaluate('2 ^ 3')).toBe(8);
      expect(evaluate('5 ^ 2')).toBe(25);
      expect(evaluate('10 ^ 0')).toBe(1);
      expect(evaluate('4 ^ 0.5')).toBe(2);
    });

    test('should handle × as multiplication', () => {
      expect(evaluate('2 × 3')).toBe(6);
      expect(evaluate('4 × 5 × 2')).toBe(40);
      expect(evaluate('12 × 0')).toBe(0);
    });

    test('should handle ÷ as division', () => {
      expect(evaluate('10 ÷ 2')).toBe(5);
      expect(evaluate('20 ÷ 4 ÷ 2')).toBe(2.5);
      expect(evaluate('15 ÷ 3')).toBe(5);
    });

    test('should mix × and * operators', () => {
      expect(evaluate('2 × 3 * 4')).toBe(24);
      expect(evaluate('5 * 2 × 3')).toBe(30);
    });

    test('should mix ÷ and / operators', () => {
      expect(evaluate('20 ÷ 4 / 2')).toBe(2.5);
      expect(evaluate('30 / 3 ÷ 2')).toBe(5);
    });
  });

  describe('order of operations', () => {
    test('should prioritize multiplication over addition', () => {
      expect(evaluate('2 + 3 * 4')).toBe(14);
      expect(evaluate('3 * 4 + 2')).toBe(14);
    });

    test('should prioritize division over subtraction', () => {
      expect(evaluate('10 - 6 / 2')).toBe(7);
      expect(evaluate('6 / 2 - 1')).toBe(2);
    });

    test('should prioritize exponentiation over multiplication', () => {
      expect(evaluate('2 * 3 ^ 2')).toBe(18);
      expect(evaluate('3 ^ 2 * 2')).toBe(18);
    });

    test('should handle right-associative exponentiation', () => {
      expect(evaluate('2 ^ 3 ^ 2')).toBe(512); // 2 ^ (3 ^ 2) = 2 ^ 9
    });

    test('should handle complex expressions', () => {
      expect(evaluate('2 + 3 * 4 - 5')).toBe(9);
      expect(evaluate('10 / 2 + 3 * 4')).toBe(17);
      expect(evaluate('2 ^ 3 + 4 * 5')).toBe(28);
    });
  });

  describe('parentheses', () => {
    test('should respect parentheses for grouping', () => {
      expect(evaluate('(2 + 3) * 4')).toBe(20);
      expect(evaluate('2 * (3 + 4)')).toBe(14);
      expect(evaluate('(10 - 2) / 2')).toBe(4);
    });

    test('should handle nested parentheses', () => {
      expect(evaluate('((2 + 3) * 4)')).toBe(20);
      expect(evaluate('(2 * (3 + 4))')).toBe(14);
      expect(evaluate('((2 + 3) * (4 + 5))')).toBe(45);
    });

    test('should handle multiple levels of nesting', () => {
      expect(evaluate('(2 + (3 * (4 + 5)))')).toBe(29);
      expect(evaluate('((2 + 3) * (4 + (5 * 6)))')).toBe(170);
    });

    test('should handle parentheses with exponentiation', () => {
      expect(evaluate('(2 + 3) ^ 2')).toBe(25);
      expect(evaluate('2 ^ (3 + 1)')).toBe(16);
    });
  });

  describe('unary operators', () => {
    test('should handle unary minus', () => {
      expect(evaluate('-5')).toBe(-5);
      expect(evaluate('10 + -5')).toBe(5);
      expect(evaluate('-2 * 3')).toBe(-6);
      expect(evaluate('-(2 + 3)')).toBe(-5);
    });

    test('should handle unary plus', () => {
      expect(evaluate('+5')).toBe(5);
      expect(evaluate('10 + +5')).toBe(15);
      expect(evaluate('+2 * 3')).toBe(6);
    });

    test('should handle multiple unary operators', () => {
      expect(evaluate('--5')).toBe(5);
      expect(evaluate('-+5')).toBe(-5);
      expect(evaluate('+-5')).toBe(-5);
    });

    test('should handle square root (√)', () => {
      expect(evaluate('√4')).toBe(2);
      expect(evaluate('√16')).toBe(4);
      expect(evaluate('√25')).toBe(5);
      expect(evaluate('√2')).toBeCloseTo(1.414213562373095);
    });

    test('should handle √ with parentheses', () => {
      expect(evaluate('√(9 + 16)')).toBe(5);
      expect(evaluate('√(2 * 8)')).toBe(4);
      expect(evaluate('√((3 + 1) * 4)')).toBe(4);
    });

    test('should handle √ in expressions', () => {
      expect(evaluate('2 * √4')).toBe(4);
      expect(evaluate('√16 + √9')).toBe(7);
      expect(evaluate('√25 * 2')).toBe(10);
    });

    test('should handle nested √', () => {
      expect(evaluate('√√16')).toBe(2);
      expect(evaluate('√√256')).toBe(4);
    });

    test('should handle √ with negative numbers', () => {
      expect(evaluate('√-1')).toBeNaN();
      expect(evaluate('-√4')).toBe(-2);
      expect(evaluate('√(-1 * -9)')).toBe(3);
    });
  });

  describe('decimal numbers', () => {
    test('should handle decimal numbers', () => {
      expect(evaluate('1.5 + 2.5')).toBe(4);
      expect(evaluate('3.14 * 2')).toBe(6.28);
      expect(evaluate('10.5 / 2.5')).toBe(4.2);
    });

    test('should handle numbers starting with decimal', () => {
      expect(evaluate('0.5 + 0.3')).toBeCloseTo(0.8);
      expect(evaluate('.5 + .3')).toBeCloseTo(0.8);
    });

    test('should handle scientific notation', () => {
      expect(evaluate('1e10')).toBe(1e10);
      expect(evaluate('2.5e3')).toBe(2500);
      expect(evaluate('1.5E10')).toBe(1.5e10);
      expect(evaluate('3E5')).toBe(300000);
    });

    test('should handle scientific notation with signs', () => {
      expect(evaluate('1e+10')).toBe(1e10);
      expect(evaluate('2.5e-3')).toBe(0.0025);
      expect(evaluate('1.5E+10')).toBe(1.5e10);
      expect(evaluate('3E-5')).toBe(0.00003);
    });

    test('should handle scientific notation in expressions', () => {
      expect(evaluate('1e3 + 1e3')).toBe(2000);
      expect(evaluate('2e2 * 3')).toBe(600);
      expect(evaluate('1e6 / 1e3')).toBe(1000);
    });
  });

  describe('constants', () => {
    test('should handle π (pi symbol)', () => {
      expect(evaluate('π')).toBe(Math.PI);
      expect(evaluate('2 * π')).toBe(2 * Math.PI);
      expect(evaluate('π * 2')).toBe(Math.PI * 2);
      expect(evaluate('π + π')).toBe(Math.PI + Math.PI);
    });

    test('should handle pi (text)', () => {
      expect(evaluate('pi')).toBe(Math.PI);
      expect(evaluate('2 * pi')).toBe(2 * Math.PI);
      expect(evaluate('pi * 2')).toBe(Math.PI * 2);
      expect(evaluate('pi + pi')).toBe(Math.PI + Math.PI);
    });

    test('should handle π in complex expressions', () => {
      expect(evaluate('2 * π * 5')).toBeCloseTo(31.41592653589793);
      expect(evaluate('π * 5 ^ 2')).toBeCloseTo(78.53981633974483);
      expect(evaluate('(π + 1) * 2')).toBeCloseTo(8.283185307179586);
    });
  });

  describe('whitespace handling', () => {
    test('should handle expressions with spaces', () => {
      expect(evaluate('  2   +   3  ')).toBe(5);
      expect(evaluate(' ( 2 + 3 ) * 4 ')).toBe(20);
    });

    test('should handle expressions with tabs and newlines', () => {
      expect(evaluate('2\t+\t3')).toBe(5);
      expect(evaluate('2\n+\n3')).toBe(5);
      expect(evaluate('2\r\n+\r\n3')).toBe(5);
    });
  });

  describe('error handling', () => {
    test('should throw on division by zero', () => {
      expect(() => evaluate('10 / 0')).toThrow('Division by zero');
      expect(() => evaluate('5 / (3 - 3)')).toThrow('Division by zero');
    });

    test('should throw on invalid characters', () => {
      expect(() => evaluate('2 & 3')).toThrow('Invalid character: &');
      expect(() => evaluate('2 $ 3')).toThrow('Invalid character: $');
    });

    test('should throw on missing closing parenthesis', () => {
      expect(() => evaluate('(2 + 3')).toThrow('Missing closing parenthesis');
      expect(() => evaluate('((2 + 3)')).toThrow('Missing closing parenthesis');
    });

    test('should throw on unexpected closing parenthesis', () => {
      expect(() => evaluate('2 + 3)')).toThrow('Unexpected token: )');
      expect(() => evaluate('2 + 3))')).toThrow('Unexpected token: )');
    });

    test('should throw on empty expression', () => {
      expect(() => evaluate('')).toThrow('Unexpected end of expression');
    });

    test('should throw on invalid operators', () => {
      expect(() => evaluate('2 +')).toThrow('Unexpected end of expression');
      expect(() => evaluate('* 3')).toThrow('Unknown variable: *');
    });

    test('should throw on invalid numbers', () => {
      expect(() => evaluate('2..3')).toThrow('Unknown variable: 2..3');
    });

    test('should throw on invalid identifiers', () => {
      expect(() => evaluate('xyz')).toThrow('Unknown variable: xyz');
      expect(() => evaluate('2 + abc')).toThrow('Unknown variable: abc');
    });

    test('should handle identifiers followed by numbers', () => {
      // With variable support, identifiers can contain digits, so 'pi3' and 'e2' are valid variable names
      // They just happen to be undefined variables
      expect(() => evaluate('pi3')).toThrow('Unknown variable: pi3');
      expect(() => evaluate('e2')).toThrow('Unknown variable: e2');
    });

    test('should handle numbers followed by identifiers without operator', () => {
      // This tests tokenization of number followed by identifier
      // '3pi' tokenizes as '3' and 'pi', then fails because pi is unexpected after 3
      expect(() => evaluate('3pi')).toThrow('Unexpected token: pi');
      // '2e' is parsed as scientific notation start, so fails as invalid number
      expect(() => evaluate('2e')).toThrow('Unknown variable: 2e');
    });
  });

  describe('factorial (!)', () => {
    test('should handle basic factorial', () => {
      expect(evaluate('0!')).toBe(1);
      expect(evaluate('1!')).toBe(1);
      expect(evaluate('5!')).toBe(120);
      expect(evaluate('10!')).toBe(3628800);
    });

    test('should handle factorial in expressions', () => {
      expect(evaluate('3! + 2!')).toBe(8);
      expect(evaluate('4! / 2!')).toBe(12);
      expect(evaluate('2 * 3!')).toBe(12);
    });

    test('should handle factorial with parentheses', () => {
      expect(evaluate('(2 + 3)!')).toBe(120);
      expect(evaluate('(1 + 1)!')).toBe(2);
    });

    test('should throw error for negative factorial', () => {
      expect(() => evaluate('-5!')).toThrow('Factorial is only defined for non-negative integers');
    });

    test('should throw error for non-integer factorial', () => {
      expect(() => evaluate('3.5!')).toThrow('Factorial is only defined for non-negative integers');
    });
  });

  describe('e constant', () => {
    test('should handle e constant', () => {
      expect(evaluate('e')).toBe(Math.E);
      expect(evaluate('e')).toBeCloseTo(2.718281828);
    });

    test('should handle e in expressions', () => {
      expect(evaluate('e + 1')).toBeCloseTo(3.718281828);
      expect(evaluate('2 * e')).toBeCloseTo(5.436563656);
      expect(evaluate('e ^ 2')).toBeCloseTo(7.389056099);
    });
  });

  describe('absolute value (|x|)', () => {
    test('should handle basic absolute value', () => {
      expect(evaluate('|5|')).toBe(5);
      expect(evaluate('|-5|')).toBe(5);
      expect(evaluate('|0|')).toBe(0);
    });

    test('should handle absolute value of expressions', () => {
      expect(evaluate('|3 - 8|')).toBe(5);
      expect(evaluate('|-2 * 3|')).toBe(6);
      expect(evaluate('|10 / -2|')).toBe(5);
    });

    test('should handle nested absolute values', () => {
      expect(evaluate('||5||')).toBe(5);
      expect(evaluate('||-5||')).toBe(5);
    });

    test('should handle absolute value in complex expressions', () => {
      expect(evaluate('|-5| + 3')).toBe(8);
      expect(evaluate('2 * |-4|')).toBe(8);
    });

    test('should throw error for missing closing delimiter', () => {
      expect(() => evaluate('|5')).toThrow('Missing closing |');
    });
  });

  describe('superscripts (² ³)', () => {
    test('should handle ² operator', () => {
      expect(evaluate('5²')).toBe(25);
      expect(evaluate('10²')).toBe(100);
      expect(evaluate('0²')).toBe(0);
    });

    test('should handle ³ operator', () => {
      expect(evaluate('5³')).toBe(125);
      expect(evaluate('10³')).toBe(1000);
      expect(evaluate('2³')).toBe(8);
    });

    test('should handle superscripts with parentheses', () => {
      expect(evaluate('(2 + 3)²')).toBe(25);
      expect(evaluate('(1 + 1)³')).toBe(8);
    });

    test('should handle superscripts in expressions', () => {
      expect(evaluate('2² + 3²')).toBe(13);
      expect(evaluate('5² - 3²')).toBe(16);
      expect(evaluate('2³ * 3')).toBe(24);
    });
  });

  describe('floor division (//)', () => {
    test('should handle basic floor division', () => {
      expect(evaluate('17 // 5')).toBe(3);
      expect(evaluate('20 // 4')).toBe(5);
      expect(evaluate('7 // 2')).toBe(3);
    });

    test('should handle floor division with negative numbers', () => {
      expect(evaluate('-17 // 5')).toBe(-4);
      expect(evaluate('17 // -5')).toBe(-4);
      expect(evaluate('-17 // -5')).toBe(3);
    });

    test('should handle floor division in expressions', () => {
      expect(evaluate('100 // 3 + 1')).toBe(34);
      expect(evaluate('2 * 15 // 4')).toBe(7);
    });

    test('should throw error for division by zero', () => {
      expect(() => evaluate('10 // 0')).toThrow('Division by zero');
    });
  });

  describe('** exponentiation', () => {
    test('should handle basic ** operator', () => {
      expect(evaluate('2 ** 3')).toBe(8);
      expect(evaluate('5 ** 2')).toBe(25);
      expect(evaluate('10 ** 0')).toBe(1);
    });

    test('should handle ** in expressions', () => {
      expect(evaluate('2 ** 3 + 1')).toBe(9);
      expect(evaluate('2 + 3 ** 2')).toBe(11);
    });

    test('should be right-associative like ^', () => {
      expect(evaluate('2 ** 2 ** 3')).toBe(256); // 2 ** (2 ** 3) = 2 ** 8 = 256
    });

    test('should work interchangeably with ^', () => {
      expect(evaluate('2 ** 3')).toBe(evaluate('2 ^ 3'));
      expect(evaluate('5 ** 2')).toBe(evaluate('5 ^ 2'));
    });
  });

  describe('complex real-world expressions', () => {
    test('should handle complex mathematical formulas', () => {
      expect(evaluate('2 * (3 + 4) / 2')).toBe(7);
      expect(evaluate('(10 + 5) * 2 - 8 / 4')).toBe(28);
      expect(evaluate('3 + 4 * 2 / (1 - 5) ^ 2 ^ 3')).toBe(3.0001220703125);
    });

    test('should handle financial calculations', () => {
      expect(evaluate('100 * (1 + 0.05)')).toBe(105);
      expect(evaluate('1000 * (1 - 0.2)')).toBe(800);
    });

    test('should handle geometric formulas', () => {
      expect(evaluate('3.14159 * 5 ^ 2')).toBeCloseTo(78.53975);
      expect(evaluate('2 * 3.14159 * 10')).toBeCloseTo(62.8318);
    });
  });

  describe('variables', () => {
    test('should handle single variable', () => {
      expect(evaluate('x', { x: 5 })).toBe(5);
      expect(evaluate('x + 10', { x: 5 })).toBe(15);
      expect(evaluate('2 * x', { x: 3 })).toBe(6);
    });

    test('should handle multiple variables', () => {
      expect(evaluate('x + y', { x: 2, y: 3 })).toBe(5);
      expect(evaluate('a * b + c', { a: 2, b: 3, c: 4 })).toBe(10);
      expect(evaluate('(x + y) * z', { x: 2, y: 3, z: 4 })).toBe(20);
    });

    test('should handle variables with underscores and numbers', () => {
      expect(evaluate('my_var', { my_var: 10 })).toBe(10);
      expect(evaluate('x1 + x2', { x1: 5, x2: 3 })).toBe(8);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expect(evaluate('_temp * 2', { _temp: 7 })).toBe(14);
    });

    test('should handle multi-character variable names', () => {
      expect(evaluate('rate * time', { rate: 5, time: 10 })).toBe(50);
      expect(evaluate('radius ^ 2', { radius: 3 })).toBe(9);
    });

    test('should handle variables in complex expressions', () => {
      expect(evaluate('π * r ^ 2', { r: 5 })).toBeCloseTo(78.53981633974483);
      expect(evaluate('2 * π * radius', { radius: 10 })).toBeCloseTo(62.83185307179586);
      expect(evaluate('(a + b) * (c - d)', { a: 2, b: 3, c: 10, d: 4 })).toBe(30);
    });

    test('should allow variables to override built-in constants', () => {
      expect(evaluate('e', { e: 10 })).toBe(10);
      expect(evaluate('pi', { pi: 3 })).toBe(3);
      expect(evaluate('π', { π: 3.14 })).toBe(3.14);
    });

    test('should handle unicode variable names', () => {
      expect(evaluate('α + β', { α: 2, β: 3 })).toBe(5);
      expect(evaluate('θ * 2', { θ: Math.PI })).toBe(Math.PI * 2);
    });

    test('should throw error for undefined variables', () => {
      expect(() => evaluate('x')).toThrow('Unknown variable: x');
      expect(() => evaluate('a + b', { a: 5 })).toThrow('Unknown variable: b');
      expect(() => evaluate('2 * unknown', { x: 5 })).toThrow('Unknown variable: unknown');
    });

    test('should work with scientific notation and variables', () => {
      expect(evaluate('1e10 + x', { x: 5 })).toBe(10000000005);
      expect(evaluate('x * 1e3', { x: 2 })).toBe(2000);
      // 'e' as part of number vs 'e' as variable with space
      expect(evaluate('1 + e', { e: 5 })).toBe(6);
    });

    test('should handle variables with all operators', () => {
      expect(evaluate('x!', { x: 5 })).toBe(120);
      expect(evaluate('√x', { x: 16 })).toBe(4);
      expect(evaluate('|x|', { x: -5 })).toBe(5);
      expect(evaluate('x²', { x: 3 })).toBe(9);
      expect(evaluate('x³', { x: 2 })).toBe(8);
      expect(evaluate('x // y', { x: 17, y: 5 })).toBe(3);
    });
  });
});
