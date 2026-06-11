import { space } from '../../unicode/unicode.ts';

import { splitTokens } from '../split-tokens.ts';

describe('splitTokens', () => {
  test('returns [] for empty input', () => {
    expect(splitTokens('')).toEqual([]);
    expect(splitTokens(space.repeat(5))).toEqual([space.repeat(5)]);
    expect(splitTokens('\t\n\r')).toEqual(['\t\n\r']);
  });

  test('splits on whitespace', () => {
    expect(splitTokens('a b c d')).toEqual(['a', ' ', 'b', ' ', 'c', ' ', 'd']);
    expect(splitTokens('a\tb\tc\td')).toEqual(['a', '\t', 'b', '\t', 'c', '\t', 'd']);
    expect(splitTokens('a\rb\rc\rd')).toEqual(['a', '\r', 'b', '\r', 'c', '\r', 'd']);
    expect(splitTokens('a    b    c    d')).toEqual([
      'a',
      ' '.repeat(4),
      'b',
      ' '.repeat(4),
      'c',
      ' '.repeat(4),
      'd',
    ]);
    expect(splitTokens('a\r\nb\r\nc\r\nd')).toEqual(['a', '\r\n', 'b', '\r\n', 'c', '\r\n', 'd']);
  });

  test('ignores leading and trailing whitespace', () => {
    expect(splitTokens('  a   b   c   d  ')).toEqual([
      '  ',
      'a',
      ' '.repeat(3),
      'b',
      ' '.repeat(3),
      'c',
      ' '.repeat(3),
      'd',
      '  ',
    ]);
  });

  test('separates punctuation', () => {
    expect(splitTokens('hello, world!')).toEqual(['hello', ',', ' ', 'world', '!']);
    expect(splitTokens('foo:bar;baz')).toEqual(['foo', ':', 'bar', ';', 'baz']);
    expect(splitTokens('a-b—c')).toEqual(['a', '-', 'b', '—', 'c']);
  });

  test('single word returns array with one element', () => {
    expect(splitTokens('word')).toEqual(['word']);
  });

  test('multiple whitespace at start/end', () => {
    expect(splitTokens('   a b c   ')).toEqual([
      ' '.repeat(3),
      'a',
      ' ',
      'b',
      ' ',
      'c',
      ' '.repeat(3),
    ]);
  });
});
