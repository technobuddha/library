import { empty, negativeZero, space } from './constants.js';
import isNumeric from './is-numeric.js';

describe('isNumeric', () => {
  test('should handle numbers', () => {
    expect(isNumeric(-1)).toBeTrue();
    expect(isNumeric(0)).toBeTrue();
    expect(isNumeric(1)).toBeTrue();
  });

  test('should handle special numbers', () => {
    expect(isNumeric(negativeZero)).toBeTrue();
    expect(isNumeric(Number.NaN)).toBeFalse();
    expect(isNumeric(Infinity)).toBeTrue();
    expect(isNumeric(-Infinity)).toBeTrue();
  });

  test('should handle numeric strings', () => {
    expect(isNumeric('0')).toBeTrue();
    expect(isNumeric('-0')).toBeTrue();
    expect(isNumeric('+0')).toBeTrue();
    expect(isNumeric('1')).toBeTrue();
    expect(isNumeric('-1')).toBeTrue();
    expect(isNumeric('+1')).toBeTrue();
    expect(isNumeric('1e100')).toBeTrue();
    expect(isNumeric('-1e100')).toBeTrue();
    expect(isNumeric('+1e100')).toBeTrue();
    expect(isNumeric('1e-100')).toBeTrue();
    expect(isNumeric('-1e-100')).toBeTrue();
    expect(isNumeric('+1e-100')).toBeTrue();
    expect(isNumeric('1e+100')).toBeTrue();
    expect(isNumeric('-1e+100')).toBeTrue();
    expect(isNumeric('+1e+100')).toBeTrue();
    expect(isNumeric('Infinity')).toBeTrue();
    expect(isNumeric('-Infinity')).toBeTrue();
    expect(isNumeric('+Infinity')).toBeTrue();
    expect(isNumeric('NaN')).toBeFalse();
  });

  test('should handle non-numbers', () => {
    expect(isNumeric(empty)).toBeFalse();
    expect(isNumeric(space)).toBeFalse();
    expect(isNumeric('abcdef')).toBeFalse();
    expect(isNumeric(null)).toBeFalse();
    expect(isNumeric()).toBeFalse();
    expect(isNumeric([])).toBeFalse();
    expect(isNumeric({})).toBeFalse();
  });
});
