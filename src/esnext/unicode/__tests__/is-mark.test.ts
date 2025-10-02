import { isMark } from '../is-mark.ts';

describe('isMark', () => {
  test('returns true for combining acute accent (U+0301)', () => {
    expect(isMark('\u0301')).toBeTrue();
    expect(isMark(0x0301)).toBeTrue();
  });

  test('returns true for combining tilde (U+0303)', () => {
    expect(isMark('\u0303')).toBeTrue();
    expect(isMark(0x0303)).toBeTrue();
  });

  test('returns false for regular letters', () => {
    expect(isMark('a')).toBeFalse();
    expect(isMark('Z')).toBeFalse();
    expect(isMark('é')).toBeFalse(); // precomposed accented letter
  });

  test('returns false for numbers', () => {
    expect(isMark('1')).toBeFalse();
    expect(isMark(49)).toBeFalse(); // codepoint for '1'
  });

  test('returns false for empty string', () => {
    expect(isMark('')).toBeFalse();
  });

  test('returns true for multiple combining marks', () => {
    expect(isMark('\u0301\u0303')).toBeTrue();
  });
});
