import { fractionSlash, hyphen, negativeSign } from '../unicode.ts';

import { cardinal } from './cardinal.ts';

describe('cardinal', () => {
  test('should handle simple numbers', () => {
    expect(cardinal(0)).toBe('zero');
    expect(cardinal(1)).toBe('one');
    expect(cardinal(10)).toBe('ten');
    expect(cardinal(11)).toBe('eleven');
    expect(cardinal(100)).toBe('one hundred');
    expect(cardinal(101)).toBe('one hundred one');
    expect(cardinal(123)).toBe('one hundred twenty three');
    expect(cardinal(1000)).toBe('one thousand');
    expect(cardinal(1001)).toBe('one thousand one');
    expect(cardinal(1234)).toBe('one thousand two hundred thirty four');
    expect(cardinal(12345)).toBe('twelve thousand three hundred forty five');
    expect(cardinal(123456)).toBe('one hundred twenty three thousand four hundred fifty six');
    expect(cardinal(1000000)).toBe('one million');
    expect(cardinal(1000001)).toBe('one million');
    expect(cardinal(12345678)).toBe(
      'twelve million three hundred forty five thousand seven hundred',
    );
    expect(cardinal(123456789)).toBe(
      'one hundred twenty three million four hundred fifty seven thousand',
    );
    expect(cardinal(1234567890)).toBe(
      'one billion two hundred thirty four million five hundred seventy thousand',
    );
    expect(cardinal(12345678901)).toBe(
      'twelve billion three hundred forty five million seven hundred thousand',
    );
  });

  test('should handle unusual numbers', () => {
    expect(cardinal(Number.POSITIVE_INFINITY)).toBe('infinity');
    expect(cardinal(Number.POSITIVE_INFINITY, { output: 'numeric' })).toBe('∞');
    expect(cardinal(Number.NEGATIVE_INFINITY)).toBe('negative infinity');
    expect(cardinal(Number.NEGATIVE_INFINITY, { output: 'numeric' })).toBe(`${negativeSign}∞`);
    expect(cardinal(Number.NaN)).toBe('not a number');
    expect(cardinal(Number.NaN, { output: 'numeric' })).toBe('NaN');
  });

  test('should handle negative numbers', () => {
    expect(cardinal(-123)).toBe('negative one hundred twenty three');
  });

  test('should handle large numbers', () => {
    expect(cardinal(1e100)).toBe('ten duotrigintillion');
    expect(cardinal(1e200)).toBe('one hundred quinsexagintillion');
    expect(cardinal(1e300)).toBe('one novenongintillion');
    expect(cardinal(1e303)).toBe('one centillion');
    expect(cardinal(Number.MAX_SAFE_INTEGER)).toBe(
      'nine quadrillion seven trillion two hundred billion',
    );

    expect(cardinal(Number.MAX_VALUE)).toBe(
      'one hundred seventy nine uncentillion seven hundred sixty nine centillion',
    );
    //Avogadro's Number
    expect(cardinal(6.02214e23)).toBe(
      'six hundred two sextillion two hundred fourteen qunitillion',
    );
    //Angstroms in a parsec
    expect(cardinal(3.08567782e26)).toBe(
      'three hundred eight septillion five hundred sixty eight sextillion',
    );
  });

  test('call with and', () => {
    expect(cardinal(101, { and: 'boogie' })).toBe('one hundred boogie one');
  });

  test('call with different outputs', () => {
    expect(cardinal(100.001, { output: { integer: 'alphabetic', fraction: 'numeric' } })).toBe(
      `one hundred 1${fractionSlash}1000`,
    );
  });

  test('should process the "and" and "hyphen" options', () => {
    expect(cardinal(100)).toBe('one hundred');
    expect(cardinal(101)).toBe('one hundred one');
    expect(cardinal(100, { and: 'and' })).toBe('one hundred');
    expect(cardinal(101, { and: 'and' })).toBe('one hundred and one');

    expect(cardinal(20)).toBe('twenty');
    expect(cardinal(21)).toBe('twenty one');
    expect(cardinal(20, { hyphen: '-' })).toBe('twenty');
    expect(cardinal(21, { hyphen: '-' })).toBe('twenty-one');
  });

  test('should honor the digits option', () => {
    const o = { output: 'hybrid' as const };

    expect(cardinal(1e6, o)).toBe('1 million');
    expect(cardinal(1.23456789e45, o)).toBe(
      '1 quattuordecillion 234 tredecillion 570 duodecillion',
    );
  });

  test('should limit groups', () => {
    const p4 = { precision: 4 as const };

    expect(cardinal(1, p4)).toBe('one');
    expect(cardinal(11, p4)).toBe('eleven');
    expect(cardinal(111, p4)).toBe('one hundred eleven');
    expect(cardinal(1111, p4)).toBe('one thousand one hundred eleven');
    expect(cardinal(11111, p4)).toBe('eleven thousand one hundred ten');
    expect(cardinal(111111, p4)).toBe('one hundred eleven thousand one hundred');
    expect(cardinal(1111111, p4)).toBe('one million one hundred eleven thousand');

    const p2 = { precision: 2 as const };

    expect(cardinal(1, p2)).toBe('one');
    expect(cardinal(11, p2)).toBe('eleven');
    expect(cardinal(111, p2)).toBe('one hundred ten');
    expect(cardinal(1111, p2)).toBe('one thousand one hundred');
    expect(cardinal(11111, p2)).toBe('eleven thousand');
    expect(cardinal(111111, p2)).toBe('one hundred ten thousand');
    expect(cardinal(1111111, p2)).toBe('one million one hundred thousand');
  });

  test('should round groups', () => {
    const p3 = { precision: 3 as const };

    expect(cardinal(9, p3)).toBe('nine');
    expect(cardinal(99, p3)).toBe('ninety nine');
    expect(cardinal(999, p3)).toBe('nine hundred ninety nine');
    expect(cardinal(9999, p3)).toBe('ten thousand');
    expect(cardinal(99999, p3)).toBe('one hundred thousand');
    expect(cardinal(999999, p3)).toBe('one million');
    expect(cardinal(9999999, p3)).toBe('ten million');
    expect(cardinal(99999999, p3)).toBe('one hundred million');
    expect(cardinal(999999999, p3)).toBe('one billion');

    const p6 = { precision: 6 as const };
    expect(cardinal(9, p6)).toBe('nine');
    expect(cardinal(99, p6)).toBe('ninety nine');
    expect(cardinal(999, p6)).toBe('nine hundred ninety nine');
    expect(cardinal(9999, p6)).toBe('nine thousand nine hundred ninety nine');
    expect(cardinal(99999, p6)).toBe('ninety nine thousand nine hundred ninety nine');
    expect(cardinal(999999, p6)).toBe('nine hundred ninety nine thousand nine hundred ninety nine');
    expect(cardinal(9999999, p6)).toBe('ten million');
    expect(cardinal(99999999, p6)).toBe('one hundred million');
    expect(cardinal(999999999, p6)).toBe('one billion');
  });

  // cspell:ignore illions
  test('should handle illions', () => {
    const p6 = { precision: 6 as const };
    expect(cardinal(9, p6)).toBe('nine');
    expect(cardinal(99, p6)).toBe('ninety nine');
    expect(cardinal(999, p6)).toBe('nine hundred ninety nine');
    expect(cardinal(9999, p6)).toBe('nine thousand nine hundred ninety nine');
    expect(cardinal(99999, p6)).toBe('ninety nine thousand nine hundred ninety nine');
    expect(cardinal(999999, p6)).toBe('nine hundred ninety nine thousand nine hundred ninety nine');
    expect(cardinal(9999999, p6)).toBe('ten million');
    expect(cardinal(99999999, p6)).toBe('one hundred million');
    expect(cardinal(999999999, p6)).toBe('one billion');
  });

  test('should handle non-integersI', () => {
    expect(cardinal(1.5)).toBe(`one and one${hyphen}half`);
    expect(cardinal(2.71828)).toBe(`two and five${hyphen}sevenths`);
    expect(cardinal(-3.14)).toBe(`negative three and one${hyphen}seventh`);
    expect(cardinal(0.0000001)).toBe(`one${hyphen}ten millionth`);
    expect(cardinal(0.9876543)).toBe(
      `nine hundred eighty seven thousand six hundred fifty four${hyphen}millionths`,
    );
    expect(cardinal(0.9999999)).toBe('one');
  });

  test('should handle non-integers', () => {
    const o = { output: 'numeric' as const };

    expect(cardinal(1.5, o)).toBe(`1 1${fractionSlash}2`);
    expect(cardinal(2.71828, o)).toBe(`2 5${fractionSlash}7`);
    expect(cardinal(-3.14, o)).toBe(`${negativeSign}3 1${fractionSlash}7`);
    expect(cardinal(0.0000001, o)).toBe(`1${fractionSlash}10000000`);
    expect(cardinal(0.987654, o)).toBe(`987654${fractionSlash}1000000`);
    expect(cardinal(0.9999999, o)).toBe('1');
  });

  test('should shift decimals in hybrid mode', () => {
    const o = { output: 'hybrid' as const, shift: 'decimal' as const, precision: 3 as const };

    expect(cardinal(1000000, o)).toBe('1 million');
    expect(cardinal(1200000, o)).toBe('1.2 million');
    expect(cardinal(1230000, o)).toBe('1.23 million');
    expect(cardinal(1234000, o)).toBe('1.23 million');
    expect(cardinal(1235000, o)).toBe('1.24 million');
  });

  test('should shift fractions in hybrid mode', () => {
    const o = { output: 'hybrid' as const, shift: 'fraction' as const, precision: 3 as const };

    expect(cardinal(1000000, o)).toBe('1 million');
    expect(cardinal(1200000, o)).toBe(`1 1${fractionSlash}5 million`);
    expect(cardinal(1230000, o)).toBe(`1 23${fractionSlash}100 million`);
    expect(cardinal(1234000, o)).toBe(`1 23${fractionSlash}100 million`);
    expect(cardinal(1235000, o)).toBe(`1 1${fractionSlash}4 million`);
  });

  test('should shift decimals in alphabetic mode', () => {
    const o = { output: 'alphabetic' as const, shift: 'decimal' as const, precision: 3 as const };

    expect(cardinal(1000000, o)).toBe('one million');
    expect(cardinal(1200000, o)).toBe('one point two million');
    expect(cardinal(1230000, o)).toBe('one point two three million');
    expect(cardinal(1234000, o)).toBe('one point two three million');
    expect(cardinal(1235000, o)).toBe('one point two four million');
  });

  test('should shift fractions in alphabetic mode', () => {
    const o = { output: 'alphabetic' as const, shift: 'fraction' as const, precision: 3 as const };

    expect(cardinal(1000000, o)).toBe('one million');
    expect(cardinal(1200000, o)).toBe(`one and one${hyphen}fifth million`);
    expect(cardinal(1230000, o)).toBe(`one and twenty three${hyphen}hundredths million`);
    expect(cardinal(1234000, o)).toBe(`one and twenty three${hyphen}hundredths million`);
    expect(cardinal(1235000, o)).toBe(`one and one${hyphen}quarter million`);
  });
});
