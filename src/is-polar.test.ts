import { isPolar } from './is-polar.ts';

describe('isPolar', () => {
  test('returns true for a valid Polar object', () => {
    expect(isPolar({ φ: 1.23, r: 4.56 })).toBeTrue();
  });

  test('returns false for null', () => {
    expect(isPolar(null)).toBeFalse();
  });

  test('returns false for undefined', () => {
    expect(isPolar(undefined)).toBeFalse();
  });

  test('returns false for a number', () => {
    expect(isPolar(42)).toBeFalse();
  });

  test('returns false for a string', () => {
    expect(isPolar('polar')).toBeFalse();
  });

  test('returns false for an object missing angle', () => {
    expect(isPolar({ r: 5 })).toBeFalse();
  });

  test('returns false for an object missing radius', () => {
    expect(isPolar({ φ: 2 })).toBeFalse();
  });

  test('returns false for an object with non-numeric angle', () => {
    expect(isPolar({ φ: 'foo', r: 3 })).toBeFalse();
  });

  test('returns false for an object with non-numeric radius', () => {
    expect(isPolar({ φ: 1, r: 'bar' })).toBeFalse();
  });

  test('returns true for an object with extra properties', () => {
    expect(isPolar({ φ: 0, r: 1, extra: true })).toBeTrue();
  });

  test('returns false for an array', () => {
    expect(isPolar([1, 2])).toBeFalse();
  });

  test('returns false for an object with angle and radius as NaN', () => {
    expect(isPolar({ φ: NaN, r: NaN })).toBeTrue();
  });

  test('returns true for negative radius and angle', () => {
    expect(isPolar({ φ: -1, r: -2 })).toBeTrue();
  });
});
