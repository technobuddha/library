import { negativeZero } from '../constants.ts';
import { fractionSlash, hyphen, negativeSign } from '../unicode.ts';

import { ordinal } from './ordinal.ts';

describe('ordinal', () => {
  describe('output = numeric', () => {
    test('should handle positive numbers', () => {
      const o = { output: 'numeric' as const };

      // expect(ordinal(0, o)).toBe('0th');
      expect(ordinal(1, o)).toBe('1st');
      expect(ordinal(2, o)).toBe('2nd');
      expect(ordinal(3, o)).toBe('3rd');
      expect(ordinal(4, o)).toBe('4th');
      expect(ordinal(5, o)).toBe('5th');
      expect(ordinal(10, o)).toBe('10th');
      expect(ordinal(11, o)).toBe('11th');
      expect(ordinal(12, o)).toBe('12th');
      expect(ordinal(13, o)).toBe('13th');
      expect(ordinal(14, o)).toBe('14th');
      expect(ordinal(20, o)).toBe('20th');
      expect(ordinal(21, o)).toBe('21st');
      expect(ordinal(22, o)).toBe('22nd');
      expect(ordinal(23, o)).toBe('23rd');
      expect(ordinal(24, o)).toBe('24th');
      expect(ordinal(1000010, o)).toBe('1,000,010th');
      expect(ordinal(1000011, o)).toBe('1,000,011th');
      expect(ordinal(1000012, o)).toBe('1,000,012th');
      expect(ordinal(1000013, o)).toBe('1,000,013th');
      expect(ordinal(1000014, o)).toBe('1,000,014th');
      expect(ordinal(1000020, o)).toBe('1,000,020th');
      expect(ordinal(1000021, o)).toBe('1,000,021st');
      expect(ordinal(1000022, o)).toBe('1,000,022nd');
      expect(ordinal(1000023, o)).toBe('1,000,023rd');
      expect(ordinal(1000024, o)).toBe('1,000,024th');
    });

    test('should handle negative numbers', () => {
      const o = { output: 'numeric' as const };

      expect(ordinal(-0, o)).toBe(`${negativeSign}0th`);
      expect(ordinal(-1, o)).toBe(`${negativeSign}1st`);
      expect(ordinal(-2, o)).toBe(`${negativeSign}2nd`);
      expect(ordinal(-3, o)).toBe(`${negativeSign}3rd`);
      expect(ordinal(-4, o)).toBe(`${negativeSign}4th`);
      expect(ordinal(-5, o)).toBe(`${negativeSign}5th`);
      expect(ordinal(-10, o)).toBe(`${negativeSign}10th`);
      expect(ordinal(-11, o)).toBe(`${negativeSign}11th`);
      expect(ordinal(-12, o)).toBe(`${negativeSign}12th`);
      expect(ordinal(-13, o)).toBe(`${negativeSign}13th`);
      expect(ordinal(-14, o)).toBe(`${negativeSign}14th`);
      expect(ordinal(-20, o)).toBe(`${negativeSign}20th`);
      expect(ordinal(-21, o)).toBe(`${negativeSign}21st`);
      expect(ordinal(-22, o)).toBe(`${negativeSign}22nd`);
      expect(ordinal(-23, o)).toBe(`${negativeSign}23rd`);
      expect(ordinal(-24, o)).toBe(`${negativeSign}24th`);
      expect(ordinal(-1000010, o)).toBe(`${negativeSign}1,000,010th`);
      expect(ordinal(-1000011, o)).toBe(`${negativeSign}1,000,011th`);
      expect(ordinal(-1000012, o)).toBe(`${negativeSign}1,000,012th`);
      expect(ordinal(-1000013, o)).toBe(`${negativeSign}1,000,013th`);
      expect(ordinal(-1000014, o)).toBe(`${negativeSign}1,000,014th`);
      expect(ordinal(-1000020, o)).toBe(`${negativeSign}1,000,020th`);
      expect(ordinal(-1000021, o)).toBe(`${negativeSign}1,000,021st`);
      expect(ordinal(-1000022, o)).toBe(`${negativeSign}1,000,022nd`);
      expect(ordinal(-1000023, o)).toBe(`${negativeSign}1,000,023rd`);
      expect(ordinal(-1000024, o)).toBe(`${negativeSign}1,000,024th`);
    });

    test('should handle non integers', () => {
      const o = { output: 'numeric' as const };

      expect(ordinal(0.1, o)).toBe(`0th and 1${fractionSlash}10`);
      expect(ordinal(0.2, o)).toBe(`0th and 1${fractionSlash}5`);
      expect(ordinal(0.3, o)).toBe(`0th and 3${fractionSlash}10`);
      expect(ordinal(0.4, o)).toBe(`0th and 2${fractionSlash}5`);
      expect(ordinal(0.5, o)).toBe(`0th and 1${fractionSlash}2`);

      expect(ordinal(1.1, o)).toBe(`1st and 1${fractionSlash}10`);
      expect(ordinal(2.2, o)).toBe(`2nd and 1${fractionSlash}5`);
      expect(ordinal(3.3, o)).toBe(`3rd and 3${fractionSlash}10`);
      expect(ordinal(4.4, o)).toBe(`4th and 2${fractionSlash}5`);
      expect(ordinal(5.5, o)).toBe(`5th and 1${fractionSlash}2`);
    });

    test('should handle exponential number', () => {
      const o = { output: 'numeric' as const };

      expect(ordinal(1e100, o)).toBe(
        '10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000th',
      );
      expect(ordinal(1.2e110, o)).toBe(
        '120,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000th',
      );
      expect(ordinal(1.23e120, o)).toBe(
        '1,230,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000th',
      );
      expect(ordinal(1e-100, o)).toBe(
        `0th and 1${fractionSlash}10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
      expect(ordinal(1.2e-110, o)).toBe(
        `0th and 12${fractionSlash}1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
      expect(ordinal(1.23e-120, o)).toBe(
        `0th and 123${fractionSlash}100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
      );
    });

    test('should handle special numbers', () => {
      const o = { output: 'numeric' as const };

      expect(ordinal(negativeZero, o)).toBe(`${negativeSign}0th`);
      expect(ordinal(Number.NaN, o)).toBe('nth');
      expect(ordinal(Infinity, o)).toBe('nth');
      expect(ordinal(-Infinity, o)).toBe('nth');
    });
  });

  describe('output = alphabetic', () => {
    test('should handle positive numbers', () => {
      const o = { output: 'alphabetic' as const };

      expect(ordinal(0, o)).toBe('zeroth');
      expect(ordinal(1, o)).toBe('first');
      expect(ordinal(2, o)).toBe('second');
      expect(ordinal(3, o)).toBe('third');
      expect(ordinal(4, o)).toBe('fourth');
      expect(ordinal(5, o)).toBe('fifth');
      expect(ordinal(10, o)).toBe('tenth');
      expect(ordinal(11, o)).toBe('eleventh');
      expect(ordinal(12, o)).toBe('twelfth');
      expect(ordinal(13, o)).toBe('thirteenth');
      expect(ordinal(14, o)).toBe('fourteenth');
      expect(ordinal(20, o)).toBe('twentieth');
      expect(ordinal(21, o)).toBe('twenty first');
      expect(ordinal(22, o)).toBe('twenty second');
      expect(ordinal(23, o)).toBe('twenty third');
      expect(ordinal(24, o)).toBe('twenty fourth');
      expect(ordinal(1000010, o)).toBe('one million tenth');
      expect(ordinal(1000011, o)).toBe('one million eleventh');
      expect(ordinal(1000012, o)).toBe('one million twelfth');
      expect(ordinal(1000013, o)).toBe('one million thirteenth');
      expect(ordinal(1000014, o)).toBe('one million fourteenth');
      expect(ordinal(1000020, o)).toBe('one million twentieth');
      expect(ordinal(1000021, o)).toBe('one million twenty first');
      expect(ordinal(1000022, o)).toBe('one million twenty second');
      expect(ordinal(1000023, o)).toBe('one million twenty third');
      expect(ordinal(1000024, o)).toBe('one million twenty fourth');
    });

    test('should handle negative numbers', () => {
      const o = { output: 'alphabetic' as const };

      expect(ordinal(-0, o)).toBe('negative zeroth');
      expect(ordinal(-1, o)).toBe('negative first');
      expect(ordinal(-2, o)).toBe('negative second');
      expect(ordinal(-3, o)).toBe('negative third');
      expect(ordinal(-4, o)).toBe('negative fourth');
      expect(ordinal(-5, o)).toBe('negative fifth');
      expect(ordinal(-10, o)).toBe('negative tenth');
      expect(ordinal(-11, o)).toBe('negative eleventh');
      expect(ordinal(-12, o)).toBe('negative twelfth');
      expect(ordinal(-13, o)).toBe('negative thirteenth');
      expect(ordinal(-14, o)).toBe('negative fourteenth');
      expect(ordinal(-20, o)).toBe('negative twentieth');
      expect(ordinal(-21, o)).toBe('negative twenty first');
      expect(ordinal(-22, o)).toBe('negative twenty second');
      expect(ordinal(-23, o)).toBe('negative twenty third');
      expect(ordinal(-24, o)).toBe('negative twenty fourth');
      expect(ordinal(-1000010, o)).toBe('negative one million tenth');
      expect(ordinal(-1000011, o)).toBe('negative one million eleventh');
      expect(ordinal(-1000012, o)).toBe('negative one million twelfth');
      expect(ordinal(-1000013, o)).toBe('negative one million thirteenth');
      expect(ordinal(-1000014, o)).toBe('negative one million fourteenth');
      expect(ordinal(-1000020, o)).toBe('negative one million twentieth');
      expect(ordinal(-1000021, o)).toBe('negative one million twenty first');
      expect(ordinal(-1000022, o)).toBe('negative one million twenty second');
      expect(ordinal(-1000023, o)).toBe('negative one million twenty third');
      expect(ordinal(-1000024, o)).toBe('negative one million twenty fourth');
    });

    test('should handle non integers', () => {
      const o = { output: 'alphabetic' as const };

      expect(ordinal(0.1, o)).toBe(`zeroth and one${hyphen}tenth`);
      expect(ordinal(0.2, o)).toBe(`zeroth and one${hyphen}fifth`);
      expect(ordinal(0.3, o)).toBe(`zeroth and three${hyphen}tenths`);
      expect(ordinal(0.4, o)).toBe(`zeroth and two${hyphen}fifths`);
      expect(ordinal(0.5, o)).toBe(`zeroth and one${hyphen}half`);

      expect(ordinal(1.1, o)).toBe(`first and one${hyphen}tenth`);
      expect(ordinal(2.2, o)).toBe(`second and one${hyphen}fifth`);
      expect(ordinal(3.3, o)).toBe(`third and three${hyphen}tenths`);
      expect(ordinal(4.4, o)).toBe(`fourth and two${hyphen}fifths`);
      expect(ordinal(5.5, o)).toBe(`fifth and one${hyphen}half`);
    });

    test('should handle special numbers', () => {
      const o = { output: 'alphabetic' as const };

      expect(ordinal(negativeZero, o)).toBe('negative zeroth');
      expect(ordinal(Number.NaN)).toBe('nth');
      expect(ordinal(Infinity, o)).toBe('nth');
      expect(ordinal(-Infinity, o)).toBe('nth');
    });
  });

  describe('output = suffix', () => {
    test('should handle positive numbers', () => {
      const o = { output: 'suffix' as const };

      expect(ordinal(0, o)).toBe('th');
      expect(ordinal(1, o)).toBe('st');
      expect(ordinal(2, o)).toBe('nd');
      expect(ordinal(3, o)).toBe('rd');
      expect(ordinal(4, o)).toBe('th');
      expect(ordinal(5, o)).toBe('th');
      expect(ordinal(10, o)).toBe('th');
      expect(ordinal(11, o)).toBe('th');
      expect(ordinal(12, o)).toBe('th');
      expect(ordinal(13, o)).toBe('th');
      expect(ordinal(14, o)).toBe('th');
      expect(ordinal(20, o)).toBe('th');
      expect(ordinal(21, o)).toBe('st');
      expect(ordinal(22, o)).toBe('nd');
      expect(ordinal(23, o)).toBe('rd');
      expect(ordinal(24, o)).toBe('th');
      expect(ordinal(1000010, o)).toBe('th');
      expect(ordinal(1000011, o)).toBe('th');
      expect(ordinal(1000012, o)).toBe('th');
      expect(ordinal(1000013, o)).toBe('th');
      expect(ordinal(1000014, o)).toBe('th');
      expect(ordinal(1000020, o)).toBe('th');
      expect(ordinal(1000021, o)).toBe('st');
      expect(ordinal(1000022, o)).toBe('nd');
      expect(ordinal(1000023, o)).toBe('rd');
      expect(ordinal(1000024, o)).toBe('th');
    });

    test('should handle negative numbers', () => {
      const o = { output: 'suffix' as const };

      expect(ordinal(-0, o)).toBe('th');
      expect(ordinal(-1, o)).toBe('st');
      expect(ordinal(-2, o)).toBe('nd');
      expect(ordinal(-3, o)).toBe('rd');
      expect(ordinal(-4, o)).toBe('th');
      expect(ordinal(-5, o)).toBe('th');
      expect(ordinal(-10, o)).toBe('th');
      expect(ordinal(-11, o)).toBe('th');
      expect(ordinal(-12, o)).toBe('th');
      expect(ordinal(-13, o)).toBe('th');
      expect(ordinal(-14, o)).toBe('th');
      expect(ordinal(-20, o)).toBe('th');
      expect(ordinal(-21, o)).toBe('st');
      expect(ordinal(-22, o)).toBe('nd');
      expect(ordinal(-23, o)).toBe('rd');
      expect(ordinal(-24, o)).toBe('th');
      expect(ordinal(-1000010, o)).toBe('th');
      expect(ordinal(-1000011, o)).toBe('th');
      expect(ordinal(-1000012, o)).toBe('th');
      expect(ordinal(-1000013, o)).toBe('th');
      expect(ordinal(-1000014, o)).toBe('th');
      expect(ordinal(-1000020, o)).toBe('th');
      expect(ordinal(-1000021, o)).toBe('st');
      expect(ordinal(-1000022, o)).toBe('nd');
      expect(ordinal(-1000023, o)).toBe('rd');
      expect(ordinal(-1000024, o)).toBe('th');
    });

    test('should handle non integers', () => {
      const o = { output: 'suffix' as const };

      expect(ordinal(0.1, o)).toBe('th');
      expect(ordinal(0.2, o)).toBe('th');
      expect(ordinal(0.3, o)).toBe('th');
      expect(ordinal(0.4, o)).toBe('th');
      expect(ordinal(0.5, o)).toBe('th');
    });

    test('should handle special numbers', () => {
      const o = { output: 'suffix' as const };

      expect(ordinal(negativeZero, o)).toBe('th');
      expect(ordinal(Number.NaN, o)).toBe('th');
      expect(ordinal(Infinity, o)).toBe('th');
      expect(ordinal(-Infinity, o)).toBe('th');
    });
  });

  describe('different outputs', () => {
    test('call with different outputs', () => {
      expect(ordinal(100.001, { output: { integer: 'alphabetic', fraction: 'numeric' } })).toBe(
        `one hundredth and 1${fractionSlash}1000`,
      );
      expect(ordinal(100.001, { output: 'hybrid' })).toBe(`100th and one${hyphen}thousandth`);
    });
  });
});
