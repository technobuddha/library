import { fraction } from './fraction.ts';

describe('fraction', () => {
  describe('numeric', () => {
    test('should return whole number for integer input', () => {
      expect(fraction(0)).toBe('0');
      expect(fraction(1)).toBe('1');
      expect(fraction(-2)).toBe('-2');
      expect(fraction(100)).toBe('100');
    });

    test('should return correct simple fractions', () => {
      expect(fraction(0.5)).toBe('½');
      expect(fraction(0.25)).toBe('¼');
      expect(fraction(0.75)).toBe('¾');
      expect(fraction(0.333333)).toBe('⅓');
      expect(fraction(0.666666)).toBe('⅔');
      expect(fraction(0.2)).toBe('⅕');
      expect(fraction(0.8)).toBe('⅘');
      expect(fraction(0.125)).toBe('⅛');
      expect(fraction(0.375)).toBe('⅜');
      expect(fraction(0.6)).toBe('⅗');
      expect(fraction(0.625)).toBe('⅝');
      expect(fraction(0.875)).toBe('⅞');
      expect(fraction(0.4)).toBe('⅖');
      expect(fraction(0.166666)).toBe('⅙');
      expect(fraction(0.833333)).toBe('⅚');
    });

    test('should return mixed fractions for numbers > 1', () => {
      expect(fraction(1.5)).toBe('1 ½');
      expect(fraction(2.25)).toBe('2 ¼');
      expect(fraction(3.75)).toBe('3 ¾');
      expect(fraction(4.333333)).toBe('4 ⅓');
      expect(fraction(5.666666)).toBe('5 ⅔');
      expect(fraction(7.2)).toBe('7 ⅕');
      expect(fraction(9.8)).toBe('9 ⅘');
      expect(fraction(10.125)).toBe('10 ⅛');
      expect(fraction(12.375)).toBe('12 ⅜');
      expect(fraction(15.6)).toBe('15 ⅗');
      expect(fraction(20.625)).toBe('20 ⅝');
      expect(fraction(25.875)).toBe('25 ⅞');
      expect(fraction(30.4)).toBe('30 ⅖');
      expect(fraction(40.166666)).toBe('40 ⅙');
      expect(fraction(50.833333)).toBe('50 ⅚');
    });

    test('should handle negative numbers', () => {
      expect(fraction(-0.5)).toBe('-½');
      expect(fraction(-1.25)).toBe('-1 ¼');
      expect(fraction(-2.75)).toBe('-2 ¾');
      expect(fraction(-3.333333)).toBe('-3 ⅓');
      expect(fraction(-4.666666)).toBe('-4 ⅔');
    });

    test('should pick closest fraction for non-exact values', () => {
      expect(fraction(0.51)).toBe('½');
      expect(fraction(0.26)).toBe('¼');
      expect(fraction(0.74)).toBe('¾');
      expect(fraction(1.32)).toBe('1 ⅓');
      expect(fraction(2.68)).toBe('2 ⅔');
    });
  });
  describe('alphabetic', () => {
    test('should return whole number in words for integer input', () => {
      expect(fraction(0, { output: 'alphabetic' })).toBe('zero');
      expect(fraction(1, { output: 'alphabetic' })).toBe('one');
      expect(fraction(-2, { output: 'alphabetic' })).toBe('negative two');
      expect(fraction(100, { output: 'alphabetic' })).toBe('one hundred');
    });

    test('should return correct simple fractions in words', () => {
      expect(fraction(0.5, { output: 'alphabetic' })).toBe('one‐half');
      expect(fraction(0.25, { output: 'alphabetic' })).toBe('one‐fourth');
      expect(fraction(0.75, { output: 'alphabetic' })).toBe('three‐fourths');
      expect(fraction(0.333333, { output: 'alphabetic' })).toBe('one‐third');
      expect(fraction(0.666666, { output: 'alphabetic' })).toBe('two‐thirds');
      expect(fraction(0.2, { output: 'alphabetic' })).toBe('one‐fifth');
      expect(fraction(0.8, { output: 'alphabetic' })).toBe('four‐fifths');
      expect(fraction(0.125, { output: 'alphabetic' })).toBe('one‐eighth');
      expect(fraction(0.375, { output: 'alphabetic' })).toBe('three‐eighths');
      expect(fraction(0.6, { output: 'alphabetic' })).toBe('three‐fifths');
      expect(fraction(0.625, { output: 'alphabetic' })).toBe('five‐eighths');
      expect(fraction(0.875, { output: 'alphabetic' })).toBe('seven‐eighths');
      expect(fraction(0.4, { output: 'alphabetic' })).toBe('two‐fifths');
      expect(fraction(0.166666, { output: 'alphabetic' })).toBe('one‐sixth');
      expect(fraction(0.833333, { output: 'alphabetic' })).toBe('five‐sixths');
    });

    test('should return mixed fractions in words for numbers > 1', () => {
      expect(fraction(1.5, { output: 'alphabetic' })).toBe('one and one‐half');
      expect(fraction(2.25, { output: 'alphabetic' })).toBe('two and one‐fourth');
      expect(fraction(3.75, { output: 'alphabetic' })).toBe('three and three‐fourths');
      expect(fraction(4.333333, { output: 'alphabetic' })).toBe('four and one‐third');
      expect(fraction(5.666666, { output: 'alphabetic' })).toBe('five and two‐thirds');
      expect(fraction(7.2, { output: 'alphabetic' })).toBe('seven and one‐fifth');
      expect(fraction(9.8, { output: 'alphabetic' })).toBe('nine and four‐fifths');
      expect(fraction(10.125, { output: 'alphabetic' })).toBe('ten and one‐eighth');
      expect(fraction(12.375, { output: 'alphabetic' })).toBe('twelve and three‐eighths');
      expect(fraction(15.6, { output: 'alphabetic' })).toBe('fifteen and three‐fifths');
      expect(fraction(20.625, { output: 'alphabetic' })).toBe('twenty and five‐eighths');
      expect(fraction(25.875, { output: 'alphabetic' })).toBe('twenty five and seven‐eighths');
      expect(fraction(30.4, { output: 'alphabetic' })).toBe('thirty and two‐fifths');
      expect(fraction(40.166666, { output: 'alphabetic' })).toBe('forty and one‐sixth');
      expect(fraction(50.833333, { output: 'alphabetic' })).toBe('fifty and five‐sixths');
    });

    test('should handle negative numbers in words', () => {
      expect(fraction(-0.5, { output: 'alphabetic' })).toBe('negative one‐half');
      expect(fraction(-1.25, { output: 'alphabetic' })).toBe('negative one and one‐fourth');
      expect(fraction(-2.75, { output: 'alphabetic' })).toBe('negative two and three‐fourths');
      expect(fraction(-3.333333, { output: 'alphabetic' })).toBe('negative three and one‐third');
      expect(fraction(-4.666666, { output: 'alphabetic' })).toBe('negative four and two‐thirds');
    });

    test('should pick closest fraction in words for non-exact values', () => {
      expect(fraction(0.51, { output: 'alphabetic' })).toBe('one‐half');
      expect(fraction(0.26, { output: 'alphabetic' })).toBe('one‐fourth');
      expect(fraction(0.74, { output: 'alphabetic' })).toBe('three‐fourths');
      expect(fraction(1.32, { output: 'alphabetic' })).toBe('one and one‐third');
      expect(fraction(2.68, { output: 'alphabetic' })).toBe('two and two‐thirds');
    });
  });
});
