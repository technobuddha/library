import { isBoolean } from './is-boolean.ts';

describe('isBoolean', () => {
  test('returns true for primitive true', () => {
    expect(isBoolean(true)).toBeTrue();
  });

  test('returns true for primitive false', () => {
    expect(isBoolean(false)).toBeTrue();
  });

  test('returns true for Boolean object (true)', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isBoolean(new Boolean(true))).toBeTrue();
  });

  test('returns true for Boolean object (false)', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isBoolean(new Boolean(false))).toBeTrue();
  });

  test('returns false for string "true"', () => {
    expect(isBoolean('true')).toBeFalse();
  });

  test('returns false for string "false"', () => {
    expect(isBoolean('false')).toBeFalse();
  });

  test('returns false for number 1', () => {
    expect(isBoolean(1)).toBeFalse();
  });

  test('returns false for number 0', () => {
    expect(isBoolean(0)).toBeFalse();
  });

  test('returns false for null', () => {
    expect(isBoolean(null)).toBeFalse();
  });

  test('returns false for undefined', () => {
    expect(isBoolean(undefined)).toBeFalse();
  });

  test('returns false for object', () => {
    expect(isBoolean({})).toBeFalse();
  });

  test('returns false for array', () => {
    expect(isBoolean([])).toBeFalse();
  });

  test('returns false for function', () => {
    expect(isBoolean(() => true)).toBeFalse();
  });
});
