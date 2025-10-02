import { sameValue } from '../same-value.ts';

describe('sameValue', () => {
  test('returns true for identical primitives', () => {
    expect(sameValue(1, 1)).toBeTrue();
    expect(sameValue('a', 'a')).toBeTrue();
    expect(sameValue(true, true)).toBeTrue();
    expect(sameValue(false, false)).toBeTrue();
    expect(sameValue(null, null)).toBeTrue();
    expect(sameValue(undefined, undefined)).toBeTrue();
  });

  test('returns false for different primitives', () => {
    expect(sameValue(1, 2)).toBeFalse();
    expect(sameValue('a', 'b')).toBeFalse();
    expect(sameValue(true, false)).toBeFalse();
    expect(sameValue(null, undefined)).toBeFalse();
    expect(sameValue(0, false)).toBeFalse();
  });

  test('distinguishes +0 and -0', () => {
    expect(sameValue(0, -0)).toBeFalse();
    expect(sameValue(-0, 0)).toBeFalse();
    expect(sameValue(0, 0)).toBeTrue();
    expect(sameValue(-0, -0)).toBeTrue();
  });

  test('treats NaN as equal to itself', () => {
    expect(sameValue(NaN, NaN)).toBeTrue();
  });

  test('returns false for NaN and other values', () => {
    expect(sameValue(NaN, 0)).toBeFalse();
    expect(sameValue(NaN, undefined)).toBeFalse();
    expect(sameValue(NaN, null)).toBeFalse();
    expect(sameValue(NaN, 'NaN')).toBeFalse();
  });

  test('returns true for same object reference', () => {
    const obj = {};
    expect(sameValue(obj, obj)).toBeTrue();
  });

  test('returns false for different object references with same content', () => {
    expect(sameValue({}, {})).toBeFalse();
    expect(sameValue([], [])).toBeFalse();
  });

  test('returns true for same symbol', () => {
    const sym = Symbol('a');
    expect(sameValue(sym, sym)).toBeTrue();
  });

  test('returns false for different symbols', () => {
    expect(sameValue(Symbol('a'), Symbol('a'))).toBeFalse();
  });
});
