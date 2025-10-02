import { isBigInt } from '../is-big-int.ts';

describe('isBigInt', () => {
  test('returns true for primitive bigints', () => {
    expect(isBigInt(0n)).toBeTrue();
    expect(isBigInt(42n)).toBeTrue();
    expect(isBigInt(-314n)).toBeTrue();
    expect(isBigInt(123n)).toBeTrue();
    expect(isBigInt(9007199254740991n)).toBeTrue();
  });

  test('returns true for BigInt objects', () => {
    expect(isBigInt(new Object(42n))).toBeTrue();
    expect(isBigInt(new Object(0n))).toBeTrue();
    expect(isBigInt(new Object(-999n))).toBeTrue();
  });

  test('returns false for string representations of bigints', () => {
    expect(isBigInt('123n')).toBeFalse();
    expect(isBigInt('123')).toBeFalse();
    expect(isBigInt('0n')).toBeFalse();
  });

  test('returns false for numbers', () => {
    expect(isBigInt(0)).toBeFalse();
    expect(isBigInt(42)).toBeFalse();
    expect(isBigInt(-3.14)).toBeFalse();
    expect(isBigInt(NaN)).toBeFalse();
    expect(isBigInt(Infinity)).toBeFalse();
    expect(isBigInt(-Infinity)).toBeFalse();
  });

  test('returns false for non-bigint types', () => {
    expect(isBigInt(undefined)).toBeFalse();
    expect(isBigInt(null)).toBeFalse();
    expect(isBigInt(true)).toBeFalse();
    expect(isBigInt(false)).toBeFalse();
    expect(isBigInt([])).toBeFalse();
    expect(isBigInt({})).toBeFalse();
    expect(isBigInt(() => 1n)).toBeFalse();
    expect(isBigInt(Symbol('1'))).toBeFalse();
  });
});
