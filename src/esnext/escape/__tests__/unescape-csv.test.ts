import { unescapeCsv } from '../unescape-csv.ts';

describe('unescapeCsv', () => {
  test('should unescape quoted value', () => {
    expect(unescapeCsv('"Hello, world"')).toBe('Hello, world');
  });

  test('should unescape doubled quotes', () => {
    expect(unescapeCsv('"He said ""hello"""')).toBe('He said "hello"');
  });

  test('should unescape value with both comma and quotes', () => {
    expect(unescapeCsv('"""Hello, world"""')).toBe('"Hello, world"');
  });

  test('should not unescape simple value', () => {
    expect(unescapeCsv('Simple')).toBe('Simple');
  });

  test('should handle empty string', () => {
    expect(unescapeCsv('')).toBe('');
  });

  test('should handle numeric string', () => {
    expect(unescapeCsv('123')).toBe('123');
  });

  test('should handle string with only quotes', () => {
    expect(unescapeCsv('""""""')).toBe('""');
  });
});
