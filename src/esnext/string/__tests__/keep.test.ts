import { keep } from '../keep.ts';

describe('keep', () => {
  test('keeps only digits', () => {
    expect(keep('abc123!@#', { digits: true })).toBe('123');
  });

  test('keeps only alphabetic', () => {
    expect(keep('abc123!@#', { alphabetic: true })).toBe('abc');
  });

  test('keeps only letters (Unicode)', () => {
    expect(keep('abc123éü!@#', { letters: true })).toBe('abcéü');
    expect(keep('ΑβΓ123', { letters: true })).toBe('ΑβΓ'); // Greek letters
  });

  test('keeps only whitespace', () => {
    expect(keep('a b\tc\n1 2 3', { whitespace: true })).toBe(' \t\n  ');
  });

  test('keeps only punctuation', () => {
    expect(keep('abc!@#123', { punctuation: true })).toBe('!@#');
    expect(keep('你好，世界！', { punctuation: true })).toBe('，！'); // Chinese punctuation
  });

  test('keeps digits and alphabetic', () => {
    expect(keep('abc123!@#', { digits: true, alphabetic: true })).toBe('abc123');
  });

  test('keeps digits and letters', () => {
    expect(keep('abc123éü!@#', { digits: true, letters: true })).toBe('abc123éü');
  });

  test('keeps digits and whitespace', () => {
    expect(keep('a 1!b2@c3#', { digits: true, whitespace: true })).toBe(' 123');
  });

  test('keeps alphabetic and whitespace', () => {
    expect(keep('a 1!b2@c3#', { alphabetic: true, whitespace: true })).toBe('a bc');
  });

  test('keeps letters and punctuation', () => {
    expect(keep('abc!@#éü', { letters: true, punctuation: true })).toBe('abc!@#éü');
  });

  test('keeps all if all options true', () => {
    expect(
      keep('a 1!b2@c3#', {
        digits: true,
        alphabetic: true,
        whitespace: true,
        punctuation: true,
        letters: true,
      }),
    ).toBe('a 1!b2@c3#');
  });

  test('keeps nothing if all options false', () => {
    expect(keep('abc123!@#', {})).toBe('');
  });

  test('works with empty string', () => {
    expect(keep('', { digits: true, alphabetic: true, whitespace: true })).toBe('');
  });

  test('works with no matches', () => {
    expect(keep('!@#$', { digits: true, alphabetic: true, whitespace: true })).toBe('');
  });

  test('keeps only emoji (should not match any option)', () => {
    expect(keep('abc😀123', { digits: true, alphabetic: true, letters: true })).toBe('abc123');
  });
});
