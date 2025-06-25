import { space } from './constants.ts';
import { escapeJS } from './escape-js.ts';

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

  test('should escape non printables as \\xnn unless followed by a hex digit', () => {
    expect(escapeJS('\u0001')).toBe('\\x01');
    expect(escapeJS('\u0001X')).toBe('\\x01X');
    expect(escapeJS('\u00010')).toBe('\\u00010');
    expect(escapeJS('\u0001a')).toBe('\\u0001a');
    expect(escapeJS('\u0001A')).toBe('\\u0001A');
    expect(escapeJS('\u001f')).toBe('\\x1f');
    expect(escapeJS('\u001fX')).toBe('\\x1fX');
    expect(escapeJS('\u001f0')).toBe('\\u001f0');
    expect(escapeJS('\u001fa')).toBe('\\u001fa');
    expect(escapeJS('\u001fA')).toBe('\\u001fA');
    expect(escapeJS('\u007f')).toBe('\\x7f');
    expect(escapeJS('\u007fX')).toBe('\\x7fX');
    expect(escapeJS('\u007f0')).toBe('\\u007f0');
    expect(escapeJS('\u007fa')).toBe('\\u007fa');
    expect(escapeJS('\u007fA')).toBe('\\u007fA');
    expect(escapeJS('\u00a0')).toBe('\\xa0');
    expect(escapeJS('\u00a0X')).toBe('\\xa0X');
    expect(escapeJS('\u00a00')).toBe('\\u00a00');
    expect(escapeJS('\u00a0a')).toBe('\\u00a0a');
    expect(escapeJS('\u00a0A')).toBe('\\u00a0A');
  });

  test('should mot escape latin-1 characters', () => {
    expect(escapeJS('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
  });

  test('should unicode escape BMP characters', () => {
    expect(escapeJS('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
  });

  test('should encode astral characters', () => {
    expect(escapeJS('😀😁😂😺😸😹')).toBe(
      '\\u{1f600}\\u{1f601}\\u{1f602}\\u{1f63a}\\u{1f638}\\u{1f639}',
    );
  });
});
