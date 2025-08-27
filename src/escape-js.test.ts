import { escapeJS } from './escape-js.ts';
import { space } from './unicode.ts';

describe('escapeJS', () => {
  test('should escape standard sequences', () => {
    expect(escapeJS('\b\f\n\r\t\v\\\'"')).toBe('\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
  });

  test('should escape nul as \\0, unless followed by an octal digit', () => {
    expect(escapeJS('\0')).toBe('\\0');
    expect(escapeJS('\0X')).toBe('\\0X');
    expect(escapeJS('\u00000')).toBe('\\x000');
  });

  test('should not escape most ascii', () => {
    expect(escapeJS(space)).toBe(space);
    expect(escapeJS('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should escape non printables as \\xnn', () => {
    expect(escapeJS('\u0001')).toBe('\\x01');
    expect(escapeJS('\u0080')).toBe('\\x80');
  });

  test('should mot escape latin-1 characters', () => {
    expect(escapeJS('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should unicode escape BMP characters', () => {
    // cspell:ignore ΑΒΓΔΕΖ
    expect(escapeJS('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
  });

  test('should encode astral characters', () => {
    expect(escapeJS('😀😁😂😺😸😹')).toBe(
      '\\u{1f600}\\u{1f601}\\u{1f602}\\u{1f63a}\\u{1f638}\\u{1f639}',
    );
  });
});
