import { empty } from '../../unicode/unicode.ts';

import { splitWords } from '../split-words.ts';

describe('splitWords', () => {
  describe('basic splitting', () => {
    test('returns [] for empty input', () => {
      expect(splitWords(empty)).toEqual([]);
      expect(splitWords('')).toEqual([]);
      expect(splitWords('     ')).toEqual([]);
      expect(splitWords('\t\n\r')).toEqual([]);
    });

    test('splits on whitespace', () => {
      expect(splitWords('a b c d')).toEqual(['a', 'b', 'c', 'd']);
      expect(splitWords('a\tb\tc\td')).toEqual(['a', 'b', 'c', 'd']);
      expect(splitWords('a\rb\rc\rd')).toEqual(['a', 'b', 'c', 'd']);
      expect(splitWords('a    b    c    d')).toEqual(['a', 'b', 'c', 'd']);
      expect(splitWords('a\r\nb\r\nc\r\nd')).toEqual(['a', 'b', 'c', 'd']);
    });

    test('ignores leading and trailing whitespace', () => {
      expect(splitWords('  a   b   c   d  ')).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('delimiters', () => {
    test('accepts alternate string delimiters', () => {
      expect(splitWords('*a*b*c*d*', { delimiter: '*' })).toEqual(['a', 'b', 'c', 'd']);
    });
    test('accepts alternate RegExp delimiters', () => {
      expect(splitWords('@a#b@c#', { delimiter: /@|#/v })).toEqual(['a', 'b', 'c']);
      expect(splitWords('a|b|c', { delimiter: /\|/v })).toEqual(['a', 'b', 'c']);
      expect(splitWords('1,2;3', { delimiter: /,|;/v })).toEqual(['1', '2', '3']);
    });
    test('does not return empty strings for consecutive delimiters', () => {
      expect(splitWords('a,,b,,c', { delimiter: /,+/v })).toEqual(['a', 'b', 'c']);
      expect(splitWords('a  b   c')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('punctuation and unicode', () => {
    test('splits on punctuation by default', () => {
      expect(splitWords('hello,world!')).toEqual(['hello', 'world']);
      expect(splitWords('foo:bar;baz')).toEqual(['foo', 'bar', 'baz']);
      expect(splitWords('a-b—c')).toEqual(['a-b', 'c']);
    });
    test('splits on unicode dashes', () => {
      expect(splitWords('foo–bar—baz')).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('edge cases', () => {
    test('single word returns array with one element', () => {
      expect(splitWords('word')).toEqual(['word']);
    });
    test('multiple delimiters at start/end', () => {
      expect(splitWords(',,a,b,c,,', { delimiter: /,+/v })).toEqual(['a', 'b', 'c']);
    });
    test('delimiter not present returns original string as array', () => {
      expect(splitWords('abc', { delimiter: ',' })).toEqual(['abc']);
    });

    test('string delimiter with empty input returns []', () => {
      expect(splitWords('', { delimiter: ',' })).toEqual([]);
      expect(splitWords('   ', { delimiter: ',' })).toEqual([]);
    });
  });
});
