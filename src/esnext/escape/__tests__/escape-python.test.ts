import { space } from '../../unicode/unicode.ts';

import { escapePython } from '../escape-python.ts';

describe('escapePython', () => {
  test('should escape standard sequences', () => {
    expect(escapePython('\u0007\b\f\n\r\t\v\\')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapePython('\0')).toBe('\\0');
    expect(escapePython('\0X')).toBe('\\0X');
    expect(escapePython('\u00000')).toBe('\\0000');
  });

  test('should not escape most ascii', () => {
    expect(escapePython(space)).toBe(space);
    expect(escapePython('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\xnn', () => {
    // C0 control characters use \xnn
    expect(escapePython('\u0001')).toBe('\\x01');
    // C1 control characters also use \xnn
    expect(escapePython('\u0080')).toBe('\\x80');
  });

  test('should not escape latin-1 characters', () => {
    expect(escapePython('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should not escape latin-1 printable characters in 0xa1-0xff range', () => {
    // Test characters in the 0xa1-0xff range that are printable
    expect(escapePython('¡')).toBe('¡'); // U+00A1
    expect(escapePython('ÿ')).toBe('ÿ'); // U+00FF
    expect(escapePython('©®')).toBe('©®'); // U+00A9, U+00AE
  });

  test('should not escape printable BMP characters by default', () => {
    expect(escapePython('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
  });

  test('should not escape printable astral characters by default', () => {
    expect(escapePython('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });
});

describe('escapePython with ascii option', () => {
  test('should force escaping of all non-ASCII characters when ascii is true', () => {
    // Without ascii option, printable unicode characters are preserved
    expect(escapePython('café')).toBe('café');
    expect(escapePython('€100')).toBe('€100');
    expect(escapePython('ΑΒΓΔ')).toBe('ΑΒΓΔ');
    expect(escapePython('😀😁')).toBe('😀😁');

    // With ascii option, all non-ASCII characters are escaped
    expect(escapePython('café', { ascii: true })).toBe('caf\\u00e9');
    expect(escapePython('€100', { ascii: true })).toBe('\\u20ac100');
    expect(escapePython('ΑΒΓΔ', { ascii: true })).toBe('\\u0391\\u0392\\u0393\\u0394');
    expect(escapePython('😀😁', { ascii: true })).toBe('\\U0001f600\\U0001f601');
  });

  test('should not affect ASCII characters with ascii option', () => {
    // ASCII characters should behave the same with or without ascii option
    expect(escapePython('Hello World', { ascii: true })).toBe('Hello World');
    expect(escapePython('ABC123', { ascii: true })).toBe('ABC123');
    expect(escapePython('\\n\\t', { ascii: true })).toBe('\\\\n\\\\t');
  });
});
