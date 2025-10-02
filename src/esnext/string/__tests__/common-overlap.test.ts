import { commonOverlap } from '../common-overlap.ts';

describe('commonOverlap', () => {
  test('returns the full string when suffix and prefix are equal', () => {
    expect(commonOverlap('foobar', 'foobar')).toBe('foobar');
  });

  test('returns the correct overlap when suffix of first matches prefix of second', () => {
    expect(commonOverlap('foobar', 'barbaz')).toBe('bar');
    expect(commonOverlap('hello', 'love')).toBe('lo');
    expect(commonOverlap('prefix', 'fixer')).toBe('fix');
  });

  test('returns empty string when there is no overlap', () => {
    expect(commonOverlap('abc', 'xyz')).toBe('');
    expect(commonOverlap('foo', 'bar')).toBe('');
  });

  test('returns empty string when one or both strings are empty', () => {
    expect(commonOverlap('', 'abc')).toBe('');
    expect(commonOverlap('abc', '')).toBe('');
    expect(commonOverlap('', '')).toBe('');
  });

  test('works with single-character strings', () => {
    expect(commonOverlap('a', 'a')).toBe('a');
    expect(commonOverlap('a', 'b')).toBe('');
  });

  test('works with unicode characters', () => {
    expect(commonOverlap('café', 'féline')).toBe('fé');
    expect(commonOverlap('mañana', 'ñanaimo')).toBe('ñana');
  });

  test('works with astral plane characters', () => {
    // all of these astral plane characters have the same high surrogate
    expect(commonOverlap('😂😁😀', '😁😀😃')).toBe('😁😀');
    // all of these astral plane characters have the same low surrogate
    expect(commonOverlap('𑐀𐀀𐐀', '𐀀𐐀𑠀')).toBe('𐀀𐐀');
  });
});
