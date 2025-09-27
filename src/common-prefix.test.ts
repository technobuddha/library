import { commonPrefix } from './common-prefix.ts';

describe('commonPrefix', () => {
  test('returns the full string when both are equal', () => {
    expect(commonPrefix('foobar', 'foobar')).toBe('foobar');
  });

  test('returns the correct prefix when there is a common prefix', () => {
    expect(commonPrefix('foobar', 'foobaz')).toBe('fooba');
    expect(commonPrefix('hello', 'helium')).toBe('hel');
    expect(commonPrefix('prefix', 'presto')).toBe('pre');
  });

  test('returns empty string when there is no common prefix', () => {
    expect(commonPrefix('abc', 'xyz')).toBe('');
    expect(commonPrefix('foo', 'bar')).toBe('');
  });

  test('returns empty string when one or both strings are empty', () => {
    expect(commonPrefix('', 'abc')).toBe('');
    expect(commonPrefix('abc', '')).toBe('');
    expect(commonPrefix('', '')).toBe('');
  });

  test('works with single-character strings', () => {
    expect(commonPrefix('a', 'a')).toBe('a');
    expect(commonPrefix('a', 'b')).toBe('');
  });

  test('works with unicode characters', () => {
    expect(commonPrefix('café', 'cafeteria')).toBe('caf');
    expect(commonPrefix('mañana', 'mañana')).toBe('mañana');
  });

  test('works with astral plane characters', () => {
    // all of these astral plane characters have the same high surrogate
    expect(commonPrefix('😀😁😂', '😀😁😃')).toBe('😀😁');
    // all of these astral plane characters have the same low surrogate
    expect(commonPrefix('𐀀𐐀𑐀', '𐀀𐐀𑠀')).toBe('𐀀𐐀');
  });
});
