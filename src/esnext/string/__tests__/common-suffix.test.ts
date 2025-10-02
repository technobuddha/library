import { commonSuffix } from '../common-suffix.ts';

describe('commonSuffix', () => {
  test('returns the full string when both are equal', () => {
    expect(commonSuffix('foobar', 'foobar')).toBe('foobar');
  });

  test('returns the correct suffix when there is a common suffix', () => {
    expect(commonSuffix('foobar', 'bazbar')).toBe('bar');
    expect(commonSuffix('running', 'jogging')).toBe('ing');
    expect(commonSuffix('hello', 'yellow')).toBe('');
  });

  test('returns empty string when there is no common suffix', () => {
    expect(commonSuffix('abc', 'xyz')).toBe('');
    expect(commonSuffix('foo', 'bar')).toBe('');
  });

  test('returns empty string when one or both strings are empty', () => {
    expect(commonSuffix('', 'abc')).toBe('');
    expect(commonSuffix('abc', '')).toBe('');
    expect(commonSuffix('', '')).toBe('');
  });

  test('works with single-character strings', () => {
    expect(commonSuffix('a', 'a')).toBe('a');
    expect(commonSuffix('a', 'b')).toBe('');
  });

  test('works with unicode characters', () => {
    expect(commonSuffix('café', 'buffé')).toBe('fé');
    expect(commonSuffix('mañana', 'banana')).toBe('ana');
  });

  test('works with astral plane characters', () => {
    // all of these astral plane characters have the same high surrogate
    expect(commonSuffix('😂😁😀', '😃😁😀')).toBe('😁😀');
    // all of these astral plane characters have the same low surrogate
    expect(commonSuffix('𑐀𐐀𐀀', '𑠀𐐀𐀀')).toBe('𐐀𐀀');
  });
});
