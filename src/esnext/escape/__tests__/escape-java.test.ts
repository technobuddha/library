import { space } from '../../unicode/unicode.ts';

import { escapeJava } from '../escape-java.ts';

describe('escapeJava', () => {
  test('should escape standard sequences', () => {
    expect(escapeJava('\b\f\n\r\t\\')).toBe('\\b\\f\\n\\r\\t\\\\');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapeJava('\0')).toBe('\\0');
    expect(escapeJava('\0X')).toBe('\\0X');
    expect(escapeJava('\u00000')).toBe('\\0000');
  });

  test('should not escape most ascii', () => {
    expect(escapeJava(space)).toBe(space);
    expect(escapeJava('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\unnnn', () => {
    expect(escapeJava('\u0001')).toBe('\\u0001');
    expect(escapeJava('\u001f')).toBe('\\u001f');
    expect(escapeJava('\u007f')).toBe('\\u007f');
    // Non-breaking space is considered non-printable whitespace, so it's escaped
    expect(escapeJava('\u00a0')).toBe('\\u00a0');
  });

  test('should not escape latin-1 characters', () => {
    expect(escapeJava('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should not escape latin-1 printable characters in 0xa1-0xff range', () => {
    // Test characters in the 0xa1-0xff range that are printable
    expect(escapeJava('¡')).toBe('¡'); // U+00A1
    expect(escapeJava('ÿ')).toBe('ÿ'); // U+00FF
    expect(escapeJava('©®')).toBe('©®'); // U+00A9, U+00AE
  });

  test('should not escape printable BMP characters by default', () => {
    expect(escapeJava('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
  });

  test('should not escape printable astral characters by default', () => {
    expect(escapeJava('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });
});

describe('escapeJava with ascii option', () => {
  test('should force escaping of all non-ASCII characters when ascii is true', () => {
    // Without ascii option, printable unicode characters are preserved
    expect(escapeJava('café')).toBe('café');
    expect(escapeJava('€100')).toBe('€100');
    expect(escapeJava('ΑΒΓΔ')).toBe('ΑΒΓΔ');
    expect(escapeJava('😀😁')).toBe('😀😁');

    // With ascii option, all non-ASCII characters are escaped
    expect(escapeJava('café', { ascii: true })).toBe('caf\\u00e9');
    expect(escapeJava('€100', { ascii: true })).toBe('\\u20ac100');
    expect(escapeJava('ΑΒΓΔ', { ascii: true })).toBe('\\u0391\\u0392\\u0393\\u0394');
    expect(escapeJava('😀😁', { ascii: true })).toBe('\\ud83d\\ude00\\ud83d\\ude01');
  });

  test('should not affect ASCII characters with ascii option', () => {
    // ASCII characters should behave the same with or without ascii option
    expect(escapeJava('Hello World', { ascii: true })).toBe('Hello World');
    expect(escapeJava('ABC123', { ascii: true })).toBe('ABC123');
    expect(escapeJava('\\n\\t', { ascii: true })).toBe('\\\\n\\\\t');
  });
});
