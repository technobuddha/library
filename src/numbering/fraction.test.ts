import { fractionSlash, hyphen, negativeSign } from '../unicode.ts';

import { fraction } from './fraction.ts';

describe('fraction', () => {
  describe('numeric', () => {
    test('should return whole number for integer input', () => {
      expect(fraction(0)).toBe('0');
      expect(fraction(1)).toBe('1');
      expect(fraction(-2)).toBe(`${negativeSign}2`);
      expect(fraction(100)).toBe('100');
    });

    test('should return correct simple fractions', () => {
      expect(fraction(1 / 2)).toBe(`1${fractionSlash}2`);
      expect(fraction(1 / 4)).toBe(`1${fractionSlash}4`);
      expect(fraction(3 / 4)).toBe(`3${fractionSlash}4`);
      expect(fraction(1 / 3)).toBe(`1${fractionSlash}3`);
      expect(fraction(2 / 3)).toBe(`2${fractionSlash}3`);
      expect(fraction(1 / 5)).toBe(`1${fractionSlash}5`);
      expect(fraction(4 / 5)).toBe(`4${fractionSlash}5`);
      expect(fraction(1 / 8)).toBe(`1${fractionSlash}8`);
      expect(fraction(3 / 8)).toBe(`3${fractionSlash}8`);
      expect(fraction(3 / 5)).toBe(`3${fractionSlash}5`);
      expect(fraction(5 / 8)).toBe(`5${fractionSlash}8`);
      expect(fraction(7 / 8)).toBe(`7${fractionSlash}8`);
      expect(fraction(2 / 5)).toBe(`2${fractionSlash}5`);
      expect(fraction(1 / 6)).toBe(`1${fractionSlash}6`);
      expect(fraction(5 / 6)).toBe(`5${fractionSlash}6`);
      expect(fraction(3 / 7)).toBe(`3${fractionSlash}7`);
    });

    test('should return mixed fractions for numbers > 1', () => {
      expect(fraction(1 + 1 / 2)).toBe(`1 1${fractionSlash}2`);
      expect(fraction(2 + 1 / 4)).toBe(`2 1${fractionSlash}4`);
      expect(fraction(3 + 3 / 4)).toBe(`3 3${fractionSlash}4`);
      expect(fraction(4 + 1 / 3)).toBe(`4 1${fractionSlash}3`);
      expect(fraction(5 + 2 / 3)).toBe(`5 2${fractionSlash}3`);
      expect(fraction(7 + 1 / 5)).toBe(`7 1${fractionSlash}5`);
      expect(fraction(9 + 4 / 5)).toBe(`9 4${fractionSlash}5`);
      expect(fraction(10 + 1 / 8)).toBe(`10 1${fractionSlash}8`);
      expect(fraction(12 + 3 / 8)).toBe(`12 3${fractionSlash}8`);
      expect(fraction(15 + 3 / 5)).toBe(`15 3${fractionSlash}5`);
      expect(fraction(20 + 5 / 8)).toBe(`20 5${fractionSlash}8`);
      expect(fraction(25 + 7 / 8)).toBe(`25 7${fractionSlash}8`);
      expect(fraction(30 + 2 / 5)).toBe(`30 2${fractionSlash}5`);
      expect(fraction(40 + 1 / 6)).toBe(`40 1${fractionSlash}6`);
      expect(fraction(50 + 5 / 6)).toBe(`50 5${fractionSlash}6`);
    });

    test('should handle negative numbers', () => {
      expect(fraction(-1 / 2)).toBe(`${negativeSign}1${fractionSlash}2`);
      expect(fraction(-1 - 1 / 4)).toBe(`${negativeSign}1 1${fractionSlash}4`);
      expect(fraction(-2 - 3 / 4)).toBe(`${negativeSign}2 3${fractionSlash}4`);
      expect(fraction(-3 - 1 / 3)).toBe(`${negativeSign}3 1${fractionSlash}3`);
      expect(fraction(-4 - 2 / 3)).toBe(`${negativeSign}4 2${fractionSlash}3`);
    });

    test('should pick closest fraction for non-exact values', () => {
      expect(fraction(0.51)).toBe(`1${fractionSlash}2`); // 1/2
      expect(fraction(0.26)).toBe(`1${fractionSlash}4`); // 1/4
      expect(fraction(0.74)).toBe(`3${fractionSlash}4`);
      expect(fraction(1.32)).toBe(`1 32${fractionSlash}100`);
      expect(fraction(2.67)).toBe(`2 2${fractionSlash}3`);
      expect(fraction(Math.PI)).toBe(`3 1${fractionSlash}7`);
      expect(fraction(Math.E)).toBe(`2 5${fractionSlash}7`);
    });

    test('should round numbers to precision', () => {
      expect(fraction(1.000000001)).toBe('1');
    });

    test('should use fraction fallback when no match within tolerance is found', () => {
      // expect(fraction(0.012345)).toBe(`12345${fractionSlash}1000000`);
      expect(fraction(0.012345, { precision: 1 })).toBe(`1${fractionSlash}100`);
      expect(fraction(0.012345, { precision: 2 })).toBe(`12${fractionSlash}1000`);
      expect(fraction(0.012345, { precision: 3 })).toBe(`123${fractionSlash}10000`);
      expect(fraction(0.012345, { precision: 4 })).toBe(`1235${fractionSlash}100000`);
      expect(fraction(0.012345, { precision: 5 })).toBe(`12345${fractionSlash}1000000`);

      expect(fraction(0.23456)).toBe(`23456${fractionSlash}100000`);
      expect(fraction(0.23456, { precision: 1 })).toBe(`1${fractionSlash}5`);
      expect(fraction(0.23456, { precision: 2 })).toBe(`23${fractionSlash}100`);
      expect(fraction(0.23456, { precision: 3 })).toBe(`235${fractionSlash}1000`);
      expect(fraction(0.23456, { precision: 4 })).toBe(`2346${fractionSlash}10000`);

      expect(fraction(0.23)).toBe(`23${fractionSlash}100`);
      expect(fraction(0.23, { precision: 1 })).toBe(`1${fractionSlash}5`);
      expect(fraction(0.23, { precision: 2 })).toBe(`23${fractionSlash}100`);
      expect(fraction(0.23, { precision: 3 })).toBe(`23${fractionSlash}100`);
      expect(fraction(0.23, { precision: 4 })).toBe(`23${fractionSlash}100`);
    });

    test('should handle exponential number', () => {
      const o = { output: 'numeric' as const };

      expect(fraction(1e100, o)).toBe(
        '10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000',
      );
      expect(fraction(1.2e110, o)).toBe(
        '120,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000',
      );
      expect(fraction(1.23e120, o)).toBe(
        '1,230,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000',
      );
      expect(fraction(1e-100, o)).toBe(
        `1${fractionSlash}10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
      expect(fraction(1.2e-110, o)).toBe(
        `12${fractionSlash}1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
      expect(fraction(1.23e-120, o)).toBe(
        `123${fractionSlash}100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
    });
  });
  describe('alphabetic', () => {
    test('should return whole number in words for integer input', () => {
      const o = { output: 'alphabetic' } as const;

      expect(fraction(0, o)).toBe('zero');
      expect(fraction(1, o)).toBe('one');
      expect(fraction(-2, o)).toBe('negative two');
      expect(fraction(100, o)).toBe('one hundred');
    });

    test('should return correct simple fractions in words', () => {
      const o = { output: 'alphabetic' } as const;

      expect(fraction(1 / 2, o)).toBe(`one${hyphen}half`);
      expect(fraction(1 / 4, o)).toBe(`one${hyphen}quarter`);
      expect(fraction(3 / 4, o)).toBe(`three${hyphen}quarters`);
      expect(fraction(1 / 3, o)).toBe(`one${hyphen}third`);
      expect(fraction(2 / 3, o)).toBe(`two${hyphen}thirds`);
      expect(fraction(1 / 5, o)).toBe(`one${hyphen}fifth`);
      expect(fraction(4 / 5, o)).toBe(`four${hyphen}fifths`);
      expect(fraction(1 / 8, o)).toBe(`one${hyphen}eighth`);
      expect(fraction(3 / 8, o)).toBe(`three${hyphen}eighths`);
      expect(fraction(3 / 5, o)).toBe(`three${hyphen}fifths`);
      expect(fraction(5 / 8, o)).toBe(`five${hyphen}eighths`);
      expect(fraction(7 / 8, o)).toBe(`seven${hyphen}eighths`);
      expect(fraction(2 / 5, o)).toBe(`two${hyphen}fifths`);
      expect(fraction(1 / 6, o)).toBe(`one${hyphen}sixth`);
      expect(fraction(5 / 6, o)).toBe(`five${hyphen}sixths`);
    });

    test('should return mixed fractions in words for numbers > 1', () => {
      const o = { output: 'alphabetic', outputFraction: 'alphabetic' } as const;

      expect(fraction(1.5, o)).toBe(`one and one${hyphen}half`);
      expect(fraction(2.25, o)).toBe(`two and one${hyphen}quarter`);
      expect(fraction(3.75, o)).toBe(`three and three${hyphen}quarters`);
      expect(fraction(4.333333, o)).toBe(`four and one${hyphen}third`);
      expect(fraction(5.666666, o)).toBe(`five and two${hyphen}thirds`);
      expect(fraction(7.2, o)).toBe(`seven and one${hyphen}fifth`);
      expect(fraction(9.8, o)).toBe(`nine and four${hyphen}fifths`);
      expect(fraction(10.125, o)).toBe(`ten and one${hyphen}eighth`);
      expect(fraction(12.375, o)).toBe(`twelve and three${hyphen}eighths`);
      expect(fraction(15.6, o)).toBe(`fifteen and three${hyphen}fifths`);
      expect(fraction(20.625, o)).toBe(`twenty and five${hyphen}eighths`);
      expect(fraction(25.875, o)).toBe(`twenty five and seven${hyphen}eighths`);
      expect(fraction(30.4, o)).toBe(`thirty and two${hyphen}fifths`);
      expect(fraction(40.166666, o)).toBe(`forty and one${hyphen}sixth`);
      expect(fraction(50.833333, o)).toBe(`fifty and five${hyphen}sixths`);
    });

    test('should handle negative numbers in words', () => {
      const o = { output: 'alphabetic' } as const;

      expect(fraction(-0.5, o)).toBe(`negative one${hyphen}half`);
      expect(fraction(-1.25, o)).toBe(`negative one and one${hyphen}quarter`);
      expect(fraction(-2.75, o)).toBe(`negative two and three${hyphen}quarters`);
      expect(fraction(-3.333333, o)).toBe(`negative three and one${hyphen}third`);
      expect(fraction(-4.666666, o)).toBe(`negative four and two${hyphen}thirds`);
    });

    test('should pick closest fraction in words for non-exact values', () => {
      const o = { output: 'alphabetic' } as const;

      expect(fraction(0.51, o)).toBe(`one${hyphen}half`);
      expect(fraction(0.26, o)).toBe(`one${hyphen}quarter`);
      expect(fraction(0.74, o)).toBe(`three${hyphen}quarters`);
      expect(fraction(1.34, o)).toBe(`one and one${hyphen}third`);
      expect(fraction(2.67, o)).toBe(`two and two${hyphen}thirds`);
    });

    test('should use fraction fallback when no match within tolerance is found', () => {
      const o = { output: 'alphabetic' } as const;

      expect(fraction(0.012345, o)).toBe(
        `twelve thousand three hundred forty five${hyphen}millionths`,
      );
      expect(fraction(0.012345, { ...o, precision: 1 })).toBe(`one${hyphen}hundredth`);
      expect(fraction(0.012345, { ...o, precision: 2 })).toBe(`twelve${hyphen}thousandths`);
      expect(fraction(0.012345, { ...o, precision: 3 })).toBe(
        `one hundred twenty three${hyphen}ten thousandths`,
      );
      expect(fraction(0.012345, { ...o, precision: 4 })).toBe(
        `one thousand two hundred thirty five${hyphen}hundred thousandths`,
      );
      expect(fraction(0.012345, { ...o, precision: 5 })).toBe(
        `twelve thousand three hundred forty five${hyphen}millionths`,
      );

      expect(fraction(0.23456, { ...o })).toBe(
        `twenty three thousand four hundred fifty six${hyphen}hundred thousandths`,
      );
      expect(fraction(0.23456, { ...o, precision: 1 })).toBe(`one${hyphen}fifth`);
      expect(fraction(0.23456, { ...o, precision: 2 })).toBe(`twenty three${hyphen}hundredths`);
      expect(fraction(0.23456, { ...o, precision: 3 })).toBe(
        `two hundred thirty five${hyphen}thousandths`,
      );
      expect(fraction(0.23456, { ...o, precision: 4 })).toBe(
        `two thousand three hundred forty six${hyphen}ten thousandths`,
      );

      expect(fraction(0.23, o)).toBe(`twenty three${hyphen}hundredths`);
      expect(fraction(0.23, { ...o, precision: 1 })).toBe(`one${hyphen}fifth`);
      expect(fraction(0.23, { ...o, precision: 2 })).toBe(`twenty three${hyphen}hundredths`);
      expect(fraction(0.23, { ...o, precision: 3 })).toBe(`twenty three${hyphen}hundredths`);
      expect(fraction(0.23, { ...o, precision: 4 })).toBe(`twenty three${hyphen}hundredths`);
    });
  });

  test('should handle exponential number', () => {
    const o = { output: 'alphabetic' as const };

    expect(fraction(1e100, o)).toBe('ten duotrigintillion');
    expect(fraction(1.2e110, o)).toBe('one hundred twenty quintrigintillion');
    expect(fraction(1.23e120, o)).toBe(
      'one noventrigintillion two hundred thirty octotrigintillion',
    );
    expect(fraction(1e-100, o)).toBe(`one‐ten duotrigintillionth`);
    expect(fraction(1.2e-110, o)).toBe(`twelve‐sestrigintillionths`);
    expect(fraction(1.23e-120, o)).toBe(`one hundred twenty three‐hundred noventrigintillionths`);
  });

  test('call with different outputs', () => {
    expect(fraction(100.001, { output: { integer: 'alphabetic', fraction: 'numeric' } })).toBe(
      `one hundred 1${fractionSlash}1000`,
    );
    expect(fraction(100.001, { output: 'hybrid' })).toBe(`100 and one${hyphen}thousandth`);
  });
});
