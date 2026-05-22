import { isError } from '../is-error.ts';

describe('isError', () => {
  test('returns true for Error instances', () => {
    expect(isError(new Error('message'))).toBeTrue();
    expect(isError(new TypeError('bad type'))).toBeTrue();
  });

  test('returns false for non-error values', () => {
    expect(isError('message')).toBeFalse();
    expect(isError(123)).toBeFalse();
    expect(isError(true)).toBeFalse();
    expect(isError(null)).toBeFalse();
    expect(isError(undefined)).toBeFalse();
    expect(isError({ message: 'message' })).toBeFalse();
    expect(isError([])).toBeFalse();
  });
});
