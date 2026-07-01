import { space } from '../../unicode/unicode.ts';

import { escapeC } from '../escape-c.ts';

describe('escapeC', () => {
  test('should escape standard sequences', () => {
    expect(escapeC('\u{7}\b\f\n\r\t\v\\?')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\?');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapeC('\0')).toBe('\\0');
    expect(escapeC('\0X')).toBe('\\0X');
    expect(escapeC('\u{0}0')).toBe('\\0000');
  });

  test('should not escape most ascii', () => {
    expect(escapeC(space)).toBe(space);
    expect(escapeC('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\xnn unless followed by a hex digit', () => {
    expect(escapeC('\u{1}')).toBe('\\x01');
    expect(escapeC('\u{1}X')).toBe('\\x01X');
    expect(escapeC('\u{1}0')).toBe('\\u00010');
    expect(escapeC('\u{1}a')).toBe('\\u0001a');
    expect(escapeC('\u{1}A')).toBe('\\u0001A');
    expect(escapeC('\u{1F}')).toBe('\\x1f');
    expect(escapeC('\u{1F}X')).toBe('\\x1fX');
    expect(escapeC('\u{1F}0')).toBe('\\u001f0');
    expect(escapeC('\u{1F}a')).toBe('\\u001fa');
    expect(escapeC('\u{1F}A')).toBe('\\u001fA');
    expect(escapeC('\u{7F}')).toBe('\\x7f');
    expect(escapeC('\u{7F}X')).toBe('\\x7fX');
    expect(escapeC('\u{7F}0')).toBe('\\u007f0');
    expect(escapeC('\u{7F}a')).toBe('\\u007fa');
    expect(escapeC('\u{7F}A')).toBe('\\u007fA');
    expect(escapeC('\u{A0}')).toBe('\\xa0');
    expect(escapeC('\u{A0}X')).toBe('\\xa0X');
    expect(escapeC('\u{A0}0')).toBe('\\u00a00');
    expect(escapeC('\u{A0}a')).toBe('\\u00a0a');
    expect(escapeC('\u{A0}A')).toBe('\\u00a0A');
  });

  test('should mot escape latin-1 characters', () => {
    expect(escapeC('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should not escape printable BMP characters by default', () => {
    expect(escapeC('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
  });

  test('should not escape printable astral characters by default', () => {
    expect(escapeC('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });

  test('ascii option forces escaping of all non-ASCII characters', () => {
    // Without ascii option, printable unicode characters are preserved
    expect(escapeC('café')).toBe('café');
    expect(escapeC('€100')).toBe('€100');
    expect(escapeC('ΑΒΓΔ')).toBe('ΑΒΓΔ');
    expect(escapeC('😀😁')).toBe('😀😁');

    // With ascii option, all non-ASCII characters are escaped
    expect(escapeC('café', { ascii: true })).toBe('caf\\u00e9');
    expect(escapeC('€100', { ascii: true })).toBe('\\u20ac100');
    expect(escapeC('ΑΒΓΔ', { ascii: true })).toBe('\\u0391\\u0392\\u0393\\u0394');
    expect(escapeC('😀😁', { ascii: true })).toBe('\\U0001f600\\U0001f601');
  });

  test('ascii option does not affect ASCII characters', () => {
    // ASCII characters should behave the same with or without ascii option
    expect(escapeC('Hello World', { ascii: true })).toBe('Hello World');
    expect(escapeC('ABC123', { ascii: true })).toBe('ABC123');
    expect(escapeC('\\n\\t', { ascii: true })).toBe('\\\\n\\\\t');
  });
});
