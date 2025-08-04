import { negativeZero } from './constants.ts';
import { ordinal } from './ordinal.ts';

describe('ordinal', () => {
  test('number should handle positive numbers', () => {
    expect(ordinal(0)).toBe('0th');
    expect(ordinal(1)).toBe('1st');
    expect(ordinal(2)).toBe('2nd');
    expect(ordinal(3)).toBe('3rd');
    expect(ordinal(4)).toBe('4th');
    expect(ordinal(5)).toBe('5th');
    expect(ordinal(10)).toBe('10th');
    expect(ordinal(11)).toBe('11th');
    expect(ordinal(12)).toBe('12th');
    expect(ordinal(13)).toBe('13th');
    expect(ordinal(14)).toBe('14th');
    expect(ordinal(20)).toBe('20th');
    expect(ordinal(21)).toBe('21st');
    expect(ordinal(22)).toBe('22nd');
    expect(ordinal(23)).toBe('23rd');
    expect(ordinal(24)).toBe('24th');
    expect(ordinal(1000010)).toBe('1000010th');
    expect(ordinal(1000011)).toBe('1000011th');
    expect(ordinal(1000012)).toBe('1000012th');
    expect(ordinal(1000013)).toBe('1000013th');
    expect(ordinal(1000014)).toBe('1000014th');
    expect(ordinal(1000020)).toBe('1000020th');
    expect(ordinal(1000021)).toBe('1000021st');
    expect(ordinal(1000022)).toBe('1000022nd');
    expect(ordinal(1000023)).toBe('1000023rd');
    expect(ordinal(1000024)).toBe('1000024th');
  });

  test('number should handle negative numbers', () => {
    expect(ordinal(-0)).toBe('0th');
    expect(ordinal(-1)).toBe('-1st');
    expect(ordinal(-2)).toBe('-2nd');
    expect(ordinal(-3)).toBe('-3rd');
    expect(ordinal(-4)).toBe('-4th');
    expect(ordinal(-5)).toBe('-5th');
    expect(ordinal(-10)).toBe('-10th');
    expect(ordinal(-11)).toBe('-11th');
    expect(ordinal(-12)).toBe('-12th');
    expect(ordinal(-13)).toBe('-13th');
    expect(ordinal(-14)).toBe('-14th');
    expect(ordinal(-20)).toBe('-20th');
    expect(ordinal(-21)).toBe('-21st');
    expect(ordinal(-22)).toBe('-22nd');
    expect(ordinal(-23)).toBe('-23rd');
    expect(ordinal(-24)).toBe('-24th');
    expect(ordinal(-1000010)).toBe('-1000010th');
    expect(ordinal(-1000011)).toBe('-1000011th');
    expect(ordinal(-1000012)).toBe('-1000012th');
    expect(ordinal(-1000013)).toBe('-1000013th');
    expect(ordinal(-1000014)).toBe('-1000014th');
    expect(ordinal(-1000020)).toBe('-1000020th');
    expect(ordinal(-1000021)).toBe('-1000021st');
    expect(ordinal(-1000022)).toBe('-1000022nd');
    expect(ordinal(-1000023)).toBe('-1000023rd');
    expect(ordinal(-1000024)).toBe('-1000024th');
  });

  test('number should handle non integers', () => {
    expect(ordinal(0.1)).toBe('0.1th');
    expect(ordinal(0.2)).toBe('0.2th');
    expect(ordinal(0.3)).toBe('0.3th');
    expect(ordinal(0.4)).toBe('0.4th');
    expect(ordinal(0.5)).toBe('0.5th');
  });

  test('number should handle exponential number', () => {
    expect(ordinal(1e100)).toBe('1e+100th');
    expect(ordinal(1.2e110)).toBe('1.2e+110th');
    expect(ordinal(1.23e120)).toBe('1.23e+120th');
    expect(ordinal(1e-100)).toBe('1e-100th');
    expect(ordinal(1.2e-110)).toBe('1.2e-110th');
    expect(ordinal(1.23e-120)).toBe('1.23e-120th');
  });

  test('number should handle special numbers', () => {
    expect(ordinal(negativeZero)).toBe('0th');
    expect(ordinal(Number.NaN)).toBe('nth');
    expect(ordinal(Infinity)).toBe('nth');
    expect(ordinal(-Infinity)).toBe('nth');
  });

  test('alpha should handle positive numbers', () => {
    expect(ordinal(0, { output: 'alphabetic' })).toBe('zeroth');
    expect(ordinal(1, { output: 'alphabetic' })).toBe('first');
    expect(ordinal(2, { output: 'alphabetic' })).toBe('second');
    expect(ordinal(3, { output: 'alphabetic' })).toBe('third');
    expect(ordinal(4, { output: 'alphabetic' })).toBe('fourth');
    expect(ordinal(5, { output: 'alphabetic' })).toBe('fifth');
    expect(ordinal(10, { output: 'alphabetic' })).toBe('tenth');
    expect(ordinal(11, { output: 'alphabetic' })).toBe('eleventh');
    expect(ordinal(12, { output: 'alphabetic' })).toBe('twelfth');
    expect(ordinal(13, { output: 'alphabetic' })).toBe('thirteenth');
    expect(ordinal(14, { output: 'alphabetic' })).toBe('fourteenth');
    expect(ordinal(20, { output: 'alphabetic' })).toBe('twentieth');
    expect(ordinal(21, { output: 'alphabetic' })).toBe('twenty first');
    expect(ordinal(22, { output: 'alphabetic' })).toBe('twenty second');
    expect(ordinal(23, { output: 'alphabetic' })).toBe('twenty third');
    expect(ordinal(24, { output: 'alphabetic' })).toBe('twenty fourth');
    expect(ordinal(1000010, { output: 'alphabetic' })).toBe('one million tenth');
    expect(ordinal(1000011, { output: 'alphabetic' })).toBe('one million eleventh');
    expect(ordinal(1000012, { output: 'alphabetic' })).toBe('one million twelfth');
    expect(ordinal(1000013, { output: 'alphabetic' })).toBe('one million thirteenth');
    expect(ordinal(1000014, { output: 'alphabetic' })).toBe('one million fourteenth');
    expect(ordinal(1000020, { output: 'alphabetic' })).toBe('one million twentieth');
    expect(ordinal(1000021, { output: 'alphabetic' })).toBe('one million twenty first');
    expect(ordinal(1000022, { output: 'alphabetic' })).toBe('one million twenty second');
    expect(ordinal(1000023, { output: 'alphabetic' })).toBe('one million twenty third');
    expect(ordinal(1000024, { output: 'alphabetic' })).toBe('one million twenty fourth');
  });

  test('alpha should handle negative numbers', () => {
    expect(ordinal(-0, { output: 'alphabetic' })).toBe('zeroth');
    expect(ordinal(-1, { output: 'alphabetic' })).toBe('negative first');
    expect(ordinal(-2, { output: 'alphabetic' })).toBe('negative second');
    expect(ordinal(-3, { output: 'alphabetic' })).toBe('negative third');
    expect(ordinal(-4, { output: 'alphabetic' })).toBe('negative fourth');
    expect(ordinal(-5, { output: 'alphabetic' })).toBe('negative fifth');
    expect(ordinal(-10, { output: 'alphabetic' })).toBe('negative tenth');
    expect(ordinal(-11, { output: 'alphabetic' })).toBe('negative eleventh');
    expect(ordinal(-12, { output: 'alphabetic' })).toBe('negative twelfth');
    expect(ordinal(-13, { output: 'alphabetic' })).toBe('negative thirteenth');
    expect(ordinal(-14, { output: 'alphabetic' })).toBe('negative fourteenth');
    expect(ordinal(-20, { output: 'alphabetic' })).toBe('negative twentieth');
    expect(ordinal(-21, { output: 'alphabetic' })).toBe('negative twenty first');
    expect(ordinal(-22, { output: 'alphabetic' })).toBe('negative twenty second');
    expect(ordinal(-23, { output: 'alphabetic' })).toBe('negative twenty third');
    expect(ordinal(-24, { output: 'alphabetic' })).toBe('negative twenty fourth');
    expect(ordinal(-1000010, { output: 'alphabetic' })).toBe('negative one million tenth');
    expect(ordinal(-1000011, { output: 'alphabetic' })).toBe('negative one million eleventh');
    expect(ordinal(-1000012, { output: 'alphabetic' })).toBe('negative one million twelfth');
    expect(ordinal(-1000013, { output: 'alphabetic' })).toBe('negative one million thirteenth');
    expect(ordinal(-1000014, { output: 'alphabetic' })).toBe('negative one million fourteenth');
    expect(ordinal(-1000020, { output: 'alphabetic' })).toBe('negative one million twentieth');
    expect(ordinal(-1000021, { output: 'alphabetic' })).toBe('negative one million twenty first');
    expect(ordinal(-1000022, { output: 'alphabetic' })).toBe('negative one million twenty second');
    expect(ordinal(-1000023, { output: 'alphabetic' })).toBe('negative one million twenty third');
    expect(ordinal(-1000024, { output: 'alphabetic' })).toBe('negative one million twenty fourth');
  });

  test('alpha should handle non integers', () => {
    expect(ordinal(0.1, { output: 'alphabetic' })).toBe('0.1th');
    expect(ordinal(0.2, { output: 'alphabetic' })).toBe('0.2th');
    expect(ordinal(0.3, { output: 'alphabetic' })).toBe('0.3th');
    expect(ordinal(0.4, { output: 'alphabetic' })).toBe('0.4th');
    expect(ordinal(0.5, { output: 'alphabetic' })).toBe('0.5th');
  });

  test('alpha should handle special numbers', () => {
    expect(ordinal(negativeZero, { output: 'alphabetic' })).toBe('zeroth');
    expect(ordinal(Number.NaN, { output: 'alphabetic' })).toBe('nth');
    expect(ordinal(Infinity, { output: 'alphabetic' })).toBe('nth');
    expect(ordinal(-Infinity, { output: 'alphabetic' })).toBe('nth');
  });
});
