// import expect from '#util/expect';
import escapeHTML from './escape-html';
import { space } from './constants';

// cspell:ignore ΑΒΓΔΕΖ
describe('escapeHTML', () => {
  test('should escape basic characters', () => {
    expect(escapeHTML('"&\'<>')).toBe('&quot;&amp;&apos;&lt;&gt;');
  });

  test('should escape control characters', () => {
    expect(escapeHTML('\0')).toBe('&#0;');
    expect(escapeHTML('\x01')).toBe('&#1;');
    expect(escapeHTML('\x7f')).toBe('&#127;');
    expect(escapeHTML('\x9f')).toBe('&#159;');
  });

  test('should not escape most ascii', () => {
    expect(escapeHTML(space)).toBe(space);
    expect(escapeHTML('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should not escape Latin-1, BMP or astral', () => {
    expect(escapeHTML('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
    expect(escapeHTML('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
    expect(escapeHTML('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });

  test('should escape Latin-1, BMP or astral when escapeNonAscii is set', () => {
    expect(escapeHTML('¡¢£ýþÿ', { escapeNonAscii: true })).toBe(
      '&#161;&#162;&#163;&#253;&#254;&#255;',
    );
    expect(escapeHTML('ΑΒΓΔΕΖ', { escapeNonAscii: true })).toBe(
      '&#913;&#914;&#915;&#916;&#917;&#918;',
    );
    expect(escapeHTML('😀😁😂😺😸😹', { escapeNonAscii: true })).toBe(
      '&#128512;&#128513;&#128514;&#128570;&#128568;&#128569;',
    );
  });
});
