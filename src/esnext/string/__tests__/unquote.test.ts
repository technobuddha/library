import { unquote } from '../unquote.ts';

describe('unquote', () => {
  test('should remove surrounding single quotes', () => {
    expect(unquote("'Hello'")).toBe('Hello');
  });

  test('should remove surrounding double quotes', () => {
    expect(unquote('"Hello"')).toBe('Hello');
  });

  test('should unescape backslash-escaped quotes', () => {
    expect(unquote('"He said, "Hello!"""')).toBe('He said, "Hello!"');
  });

  test('should collapse repeated quotes', () => {
    expect(unquote("'It''s a test'")).toBe("It's a test");
  });

  test('should handle strings without quotes', () => {
    expect(unquote('Hello')).toBe('Hello');
  });

  test('should handle empty strings', () => {
    expect(unquote('')).toBe('');
  });

  test('should handle mismatched quotes', () => {
    expect(unquote('\'Hello"')).toBe('\'Hello"');
  });

  test('should handle escaped quotes without surrounding quotes', () => {
    expect(unquote('He said, "Hello!"')).toBe('He said, "Hello!"');
  });

  test('should handle repeated quotes without surrounding quotes', () => {
    expect(unquote("It''s a test")).toBe("It''s a test");
  });

  test('should handle strings with repeated quotes', () => {
    expect(unquote('""Hello""')).toBe('"Hello"');
  });

  test('should handle strings with escaped quotes', () => {
    expect(unquote('"\\"Hello\\""')).toBe('"Hello"');
  });
});
