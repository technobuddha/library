import { space } from './constants.ts';
import { escapeC } from './escape-c.ts';

describe('escapeC', () => {
  test('should escape standard sequences', () => {
    expect(escapeC('\u0007\b\f\n\r\t\v\\\'"?')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"\\?');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapeC('\0')).toBe('\\0');
    expect(escapeC('\0X')).toBe('\\0X');
    expect(escapeC('\u00000')).toBe('\\0000');
  });

  test('should not escape most ascii', () => {
    expect(escapeC(space)).toBe(space);
    expect(escapeC('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\xnn unless followed by a hex digit', () => {
    expect(escapeC('\u0001')).toBe('\\x01');
    expect(escapeC('\u0001X')).toBe('\\x01X');
    expect(escapeC('\u00010')).toBe('\\u00010');
    expect(escapeC('\u0001a')).toBe('\\u0001a');
    expect(escapeC('\u0001A')).toBe('\\u0001A');
    expect(escapeC('\u001f')).toBe('\\x1f');
    expect(escapeC('\u001fX')).toBe('\\x1fX');
    expect(escapeC('\u001f0')).toBe('\\u001f0');
    expect(escapeC('\u001fa')).toBe('\\u001fa');
    expect(escapeC('\u001fA')).toBe('\\u001fA');
    expect(escapeC('\u007f')).toBe('\\x7f');
    expect(escapeC('\u007fX')).toBe('\\x7fX');
    expect(escapeC('\u007f0')).toBe('\\u007f0');
    expect(escapeC('\u007fa')).toBe('\\u007fa');
    expect(escapeC('\u007fA')).toBe('\\u007fA');
    expect(escapeC('\u00a0')).toBe('\\xa0');
    expect(escapeC('\u00a0X')).toBe('\\xa0X');
    expect(escapeC('\u00a00')).toBe('\\u00a00');
    expect(escapeC('\u00a0a')).toBe('\\u00a0a');
    expect(escapeC('\u00a0A')).toBe('\\u00a0A');
  });

  test('should mot escape latin-1 characters', () => {
    expect(escapeC('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should unicode escape BMP characters', () => {
    // cspell:ignore ΑΒΓΔΕΖ
    expect(escapeC('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
  });

  test('should encode astral characters', () => {
    expect(escapeC('😀😁😂😺😸😹')).toBe(
      '\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639',
    );
  });
});
