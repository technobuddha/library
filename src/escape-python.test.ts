import { escapePython } from './escape-python.ts';
import { space } from './unicode.ts';

describe('escapePython', () => {
  test('should escape standard sequences', () => {
    expect(escapePython('\u0007\b\f\n\r\t\v\\\'"')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
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
    expect(escapePython('\u0001')).toBe('\\x01');
    expect(escapePython('\u0080')).toBe('\\x80');
  });

  test('should mot escape latin-1 characters', () => {
    expect(escapePython('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should unicode escape BMP characters', () => {
    // cspell:ignore ΑΒΓΔΕΖ
    expect(escapePython('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
  });

  test('should encode astral characters', () => {
    expect(escapePython('😀😁😂😺😸😹')).toBe(
      '\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639',
    );
  });
});
