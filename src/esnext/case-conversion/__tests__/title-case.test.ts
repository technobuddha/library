import { titleCase } from '../title-case.ts';

describe('titleCase', () => {
  test('should handle sentences', () => {
    expect(titleCase('now is the time for all good men to come to the aid of their country.')).toBe(
      'Now Is the Time for All Good Men to Come to the Aid of Their Country.',
    );
  });

  test('should handle compound hyphenated words', () => {
    expect(titleCase('mother-in-law')).toBe('Mother-in-Law');
  });

  test('should handle acronyms', () => {
    expect(titleCase('AT&T')).toBe('AT&T');
  });

  test('should handle leading and trailing whitespace', () => {
    expect(titleCase('  hello world  ')).toBe('  Hello World  ');
  });

  test('should handle punctuation', () => {
    expect(titleCase('hello, world!')).toBe('Hello, World!');
    expect(titleCase('a.b,c')).toBe('A.B,C');
  });

  test('should handle empty string', () => {
    expect(titleCase('')).toBe('');
  });

  test('should handle all lowercase', () => {
    expect(titleCase('all lowercase sentence')).toBe('All Lowercase Sentence');
  });

  test('should allow custom small words', () => {
    expect(titleCase('foo bar baz', { small: /^(bar)$/iv })).toBe('Foo bar Baz');
  });

  test('should handle non-ASCII input', () => {
    expect(titleCase('élève et école')).toBe('Élève Et École');
  });
});
