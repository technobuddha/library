import { space } from './constants.ts';
import { escapePython } from './escape-python.ts';

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

  test('should escape non printables as \\xnn unless followed by a hex digit', () => {
    expect(escapePython('\u0001')).toBe('\\x01');
    expect(escapePython('\u0001X')).toBe('\\x01X');
    expect(escapePython('\u00010')).toBe('\\u00010');
    expect(escapePython('\u0001a')).toBe('\\u0001a');
    expect(escapePython('\u0001A')).toBe('\\u0001A');
    expect(escapePython('\u001f')).toBe('\\x1f');
    expect(escapePython('\u001fX')).toBe('\\x1fX');
    expect(escapePython('\u001f0')).toBe('\\u001f0');
    expect(escapePython('\u001fa')).toBe('\\u001fa');
    expect(escapePython('\u001fA')).toBe('\\u001fA');
    expect(escapePython('\u007f')).toBe('\\x7f');
    expect(escapePython('\u007fX')).toBe('\\x7fX');
    expect(escapePython('\u007f0')).toBe('\\u007f0');
    expect(escapePython('\u007fa')).toBe('\\u007fa');
    expect(escapePython('\u007fA')).toBe('\\u007fA');
    expect(escapePython('\u00a0')).toBe('\\xa0');
    expect(escapePython('\u00a0X')).toBe('\\xa0X');
    expect(escapePython('\u00a00')).toBe('\\u00a00');
    expect(escapePython('\u00a0a')).toBe('\\u00a0a');
    expect(escapePython('\u00a0A')).toBe('\\u00a0A');
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
