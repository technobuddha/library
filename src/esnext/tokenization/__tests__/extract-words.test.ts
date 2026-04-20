import { empty } from '../../unicode/unicode.ts';

import { extractWords } from '../extract-words.ts';

describe('extractWords', () => {
  describe('basic splitting', () => {
    test('returns [] for empty input', () => {
      expect(extractWords(empty)).toEqual([]);
      expect(extractWords('')).toEqual([]);
      expect(extractWords('     ')).toEqual([]);
      expect(extractWords('\t\n\r')).toEqual([]);
    });

    test('splits on whitespace', () => {
      expect(extractWords('a b c d')).toEqual(['a', 'b', 'c', 'd']);
      expect(extractWords('a\tb\tc\td')).toEqual(['a', 'b', 'c', 'd']);
      expect(extractWords('a\rb\rc\rd')).toEqual(['a', 'b', 'c', 'd']);
      expect(extractWords('a    b    c    d')).toEqual(['a', 'b', 'c', 'd']);
      expect(extractWords('a\r\nb\r\nc\r\nd')).toEqual(['a', 'b', 'c', 'd']);
    });

    test('ignores leading and trailing whitespace', () => {
      expect(extractWords('  a   b   c   d  ')).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('delimiters', () => {
    test('accepts alternate string delimiters', () => {
      expect(extractWords('*a*b*c*d*', { delimiter: '*' })).toEqual(['a', 'b', 'c', 'd']);
    });
    test('accepts alternate RegExp delimiters', () => {
      expect(extractWords('@a#b@c#', { delimiter: /@|#/v })).toEqual(['a', 'b', 'c']);
      expect(extractWords('a|b|c', { delimiter: /\|/v })).toEqual(['a', 'b', 'c']);
      expect(extractWords('1,2;3', { delimiter: /,|;/v })).toEqual(['1', '2', '3']);
    });
    test('does not return empty strings for consecutive delimiters', () => {
      expect(extractWords('a,,b,,c', { delimiter: /,+/v })).toEqual(['a', 'b', 'c']);
      expect(extractWords('a  b   c')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('punctuation and unicode', () => {
    test('splits on punctuation by default', () => {
      expect(extractWords('hello,world!')).toEqual(['hello', 'world']);
      expect(extractWords('foo:bar;baz')).toEqual(['foo', 'bar', 'baz']);
      expect(extractWords('a-b—c')).toEqual(['a-b', 'c']);
    });
    test('splits on unicode dashes', () => {
      expect(extractWords('foo–bar—baz')).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('edge cases', () => {
    test('single word returns array with one element', () => {
      expect(extractWords('word')).toEqual(['word']);
    });
    test('multiple delimiters at start/end', () => {
      expect(extractWords(',,a,b,c,,', { delimiter: /,+/v })).toEqual(['a', 'b', 'c']);
    });
    test('delimiter not present returns original string as array', () => {
      expect(extractWords('abc', { delimiter: ',' })).toEqual(['abc']);
    });

    test('string delimiter with empty input returns []', () => {
      expect(extractWords('', { delimiter: ',' })).toEqual([]);
      expect(extractWords('   ', { delimiter: ',' })).toEqual([]);
    });
  });
});
