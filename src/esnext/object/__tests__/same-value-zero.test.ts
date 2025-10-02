import { sameValueZero } from '../same-value-zero.ts';

function f(): void {
  /* empty for test */
}
function f1(): void {
  /* empty for test */
}
function f2(): void {
  /* empty for test */
}

describe('sameValueZero', () => {
  test('returns true for strictly equal primitives', () => {
    expect(sameValueZero(1, 1)).toBeTrue();
    expect(sameValueZero('a', 'a')).toBeTrue();
    expect(sameValueZero(true, true)).toBeTrue();
    expect(sameValueZero(undefined, undefined)).toBeTrue();
    expect(sameValueZero(null, null)).toBeTrue();
    expect(sameValueZero(Symbol.for('a'), Symbol.for('a'))).toBeTrue();
    expect(sameValueZero(123n, 123n)).toBeTrue();
  });

  test('returns false for different primitives', () => {
    expect(sameValueZero(1, 2)).toBeFalse();
    expect(sameValueZero('a', 'b')).toBeFalse();
    expect(sameValueZero(true, false)).toBeFalse();
    expect(sameValueZero(undefined, null)).toBeFalse();
    expect(sameValueZero(1, undefined)).toBeFalse();
    expect(sameValueZero('a', false)).toBeFalse();
    expect(sameValueZero(Symbol('a'), Symbol('a'))).toBeFalse();
    expect(sameValueZero(123n, 1n)).toBeFalse();
  });

  test('returns true for NaN and NaN', () => {
    expect(sameValueZero(NaN, NaN)).toBeTrue();
  });

  test('returns true for +0 and -0', () => {
    expect(sameValueZero(0, -0)).toBeTrue();
    expect(sameValueZero(-0, 0)).toBeTrue();
    expect(sameValueZero(0, 0)).toBeTrue();
    expect(sameValueZero(-0, -0)).toBeTrue();
  });

  test('returns false for 0 and false', () => {
    expect(sameValueZero(0, false)).toBeFalse();
    expect(sameValueZero(false, 0)).toBeFalse();
  });

  test('returns true for same object reference', () => {
    const obj = {};
    expect(sameValueZero(obj, obj)).toBeTrue();
    const arr: unknown[] = [];
    expect(sameValueZero(arr, arr)).toBeTrue();
  });

  test('returns false for different objects', () => {
    expect(sameValueZero({}, {})).toBeFalse();
    expect(sameValueZero([], [])).toBeFalse();
  });

  test('returns true for same function reference', () => {
    expect(sameValueZero(f, f)).toBeTrue();
  });

  test('returns false for different functions', () => {
    expect(sameValueZero(f1, f2)).toBeFalse();
  });
});
