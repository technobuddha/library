import { parsePath } from '../parse-path.ts';

describe('parsePath', () => {
  test('returns array unchanged if input is array', () => {
    expect(parsePath(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  test('parses dot notation', () => {
    expect(parsePath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  test('parses bracket notation', () => {
    expect(parsePath('a[0][b]')).toEqual(['a', '0', 'b']);
  });

  test('parses mixed dot and bracket notation', () => {
    expect(parsePath('a.b[0].c')).toEqual(['a', 'b', '0', 'c']);
  });

  test('removes trailing brackets', () => {
    expect(parsePath('a.b[0]')).toEqual(['a', 'b', '0']);
  });

  test('handles empty string', () => {
    expect(parsePath('')).toEqual([]);
  });

  test('handles single property', () => {
    expect(parsePath('foo')).toEqual(['foo']);
  });

  test('handles consecutive brackets', () => {
    expect(parsePath('a[0][1][2]')).toEqual(['a', '0', '1', '2']);
  });

  test('handles property names with dots inside quotes (not supported by this parser)', () => {
    expect(parsePath('foo["bar.baz"]')).toEqual(['foo', '"bar', 'baz"']);
  });

  test('handles number or symbol input', () => {
    const s = Symbol('sym');
    expect(parsePath(42)).toEqual([42]);
    expect(parsePath(s)).toEqual([s]);
  });
});
