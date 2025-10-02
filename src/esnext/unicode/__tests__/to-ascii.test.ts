import { toASCII } from '../to-ascii.ts';

describe('toASCII', () => {
  test('should replace accented and fullwidth characters', () => {
    expect(toASCII('crème brûlée')).toBe('creme brulee');
    expect(toASCII('ＡＢＣＤ')).toBe('ABCD');
    expect(toASCII('⒜⒝⒞⒟')).toBe('(a)(b)(c)(d)');
  });

  test('should handle empty string', () => {
    expect(toASCII('')).toBe('');
  });

  test('should handle ASCII-only input', () => {
    expect(toASCII('Hello, World!')).toBe('Hello, World!');
  });

  test('should replace unknown characters with mapped ASCII equivalents', () => {
    // asciiMapping maps emoji to emoticons if available
    expect(toASCII('hello 😊')).toBe('hello :-)');
  });

  test('should handle numbers and symbols', () => {
    expect(toASCII('12345!@#$%')).toBe('12345!@#$%');
  });

  test('should handle mixed input', () => {
    // en-dash (–) is mapped to '-'
    expect(toASCII('façade – résumé')).toBe('facade - resume');
  });

  test('should handle string-like objects', () => {
    expect(toASCII(['t', 'e', 's', 't'].join(''))).toBe('test');
  });

  test('should handle surrogate pairs and astral symbols', () => {
    // U+1F600 GRINNING FACE (emoji) is mapped to ':-D'
    expect(toASCII('foo\u{1F600}bar')).toBe('foo:-Dbar');
  });
});
