import { escapeCsv } from '../escape-csv.ts';

describe('escapeCsv', () => {
  test('should escape values with comma', () => {
    expect(escapeCsv('Hello, world')).toBe('"Hello, world"');
  });

  test('should escape values with quotes', () => {
    expect(escapeCsv('He said "hello"')).toBe('"He said ""hello"""');
  });

  test('should escape values with both comma and quotes', () => {
    expect(escapeCsv('"Hello, world"')).toBe('"""Hello, world"""');
  });

  test('should not escape simple values', () => {
    expect(escapeCsv('Simple')).toBe('Simple');
  });

  test('should handle empty string', () => {
    expect(escapeCsv('')).toBe('');
  });

  test('should handle numeric string', () => {
    expect(escapeCsv('123')).toBe('123');
  });

  test('should handle string with only quotes', () => {
    expect(escapeCsv('""')).toBe('""""""');
  });
});
