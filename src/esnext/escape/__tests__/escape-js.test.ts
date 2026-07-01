import { space } from '../../unicode/unicode.ts';

import { escapeJS } from '../escape-js.ts';

describe('escapeJS', () => {
  test('should escape standard sequences', () => {
    expect(escapeJS('\b\f\n\r\t\v\\')).toBe('\\b\\f\\n\\r\\t\\v\\\\');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapeJS('\0')).toBe('\\0');
    expect(escapeJS('\0X')).toBe('\\0X');
    expect(escapeJS('\u{0}0')).toBe('\\u00000');
  });

  test('should not escape most ascii', () => {
    expect(escapeJS(space)).toBe(space);
    expect(escapeJS('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\xnn', () => {
    expect(escapeJS('\u{1}')).toBe('\\u0001');
    expect(escapeJS('\u{80}')).toBe('\\u0080');
  });

  test('should not escape latin-1 characters', () => {
    expect(escapeJS('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should not escape latin-1 printable characters in 0xa1-0xff range', () => {
    // Test characters in the 0xa1-0xff range that are printable
    expect(escapeJS('¡')).toBe('¡'); // U+00A1
    expect(escapeJS('ÿ')).toBe('ÿ'); // U+00FF
    expect(escapeJS('©®')).toBe('©®'); // U+00A9, U+00AE
  });

  test('should not escape printable BMP characters by default', () => {
    expect(escapeJS('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
  });

  test('should not escape printable astral characters by default', () => {
    expect(escapeJS('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });
});

describe('escapeJS with ascii option', () => {
  test('should force escaping of all non-ASCII characters when ascii is true', () => {
    // Without ascii option, printable unicode characters are preserved
    expect(escapeJS('café')).toBe('café');
    expect(escapeJS('€100')).toBe('€100');
    expect(escapeJS('ΑΒΓΔ')).toBe('ΑΒΓΔ');
    expect(escapeJS('😀😁')).toBe('😀😁');

    // With ascii option, all non-ASCII characters are escaped
    expect(escapeJS('café', { ascii: true })).toBe('caf\\u00e9');
    expect(escapeJS('€100', { ascii: true })).toBe('\\u20ac100');
    expect(escapeJS('ΑΒΓΔ', { ascii: true })).toBe('\\u0391\\u0392\\u0393\\u0394');
    expect(escapeJS('😀😁', { ascii: true })).toBe('\\u{1f600}\\u{1f601}');
  });

  test('should not affect ASCII characters with ascii option', () => {
    // ASCII characters should behave the same with or without ascii option
    expect(escapeJS('Hello World', { ascii: true })).toBe('Hello World');
    expect(escapeJS('ABC123', { ascii: true })).toBe('ABC123');
    expect(escapeJS('\\n\\t', { ascii: true })).toBe('\\\\n\\\\t');
  });
});
