import { isPrintable } from '../is-printable.ts';

describe('isPrintable', () => {
  test('should return true for printable ASCII characters', () => {
    expect(isPrintable(' ')).toBeTrue(); // Space (U+0020)
    expect(isPrintable('A')).toBeTrue();
    expect(isPrintable('z')).toBeTrue();
    expect(isPrintable('0')).toBeTrue();
    expect(isPrintable('9')).toBeTrue();
    expect(isPrintable('!')).toBeTrue();
    expect(isPrintable('~')).toBeTrue(); // Last printable ASCII (U+007E)
  });

  test('should return false for C0 control codes', () => {
    expect(isPrintable('\u0000')).toBeFalse(); // NUL
    expect(isPrintable('\u0001')).toBeFalse(); // SOH
    expect(isPrintable('\u0007')).toBeFalse(); // Bell
    expect(isPrintable('\b')).toBeFalse(); // Backspace (U+0008)
    expect(isPrintable('\t')).toBeFalse(); // Tab (U+0009)
    expect(isPrintable('\n')).toBeFalse(); // Newline (U+000A)
    expect(isPrintable('\v')).toBeFalse(); // Vertical tab (U+000B)
    expect(isPrintable('\f')).toBeFalse(); // Form feed (U+000C)
    expect(isPrintable('\r')).toBeFalse(); // Carriage return (U+000D)
    expect(isPrintable('\u001f')).toBeFalse(); // Unit separator
  });

  test('should return false for DEL', () => {
    expect(isPrintable('\u007f')).toBeFalse(); // DEL
  });

  test('should return false for C1 control codes', () => {
    expect(isPrintable('\u0080')).toBeFalse(); // First C1 control
    expect(isPrintable('\u0081')).toBeFalse();
    expect(isPrintable('\u0090')).toBeFalse();
    expect(isPrintable('\u009f')).toBeFalse(); // Last C1 control
  });

  test('should return false for non-breaking space', () => {
    expect(isPrintable('\u00a0')).toBeFalse(); // Non-breaking space
  });

  test('should return true for printable Latin-1 characters', () => {
    expect(isPrintable('¡')).toBeTrue(); // U+00A1
    expect(isPrintable('©')).toBeTrue(); // Copyright
    expect(isPrintable('é')).toBeTrue(); // e acute
    expect(isPrintable('ÿ')).toBeTrue(); // y diaeresis
  });

  test('should return false for soft hyphen', () => {
    expect(isPrintable('\u00ad')).toBeFalse(); // Soft hyphen
  });

  test('should return false for format characters', () => {
    expect(isPrintable('\u034f')).toBeFalse(); // Combining grapheme joiner
    expect(isPrintable('\u061c')).toBeFalse(); // Arabic letter mark
  });

  test('should return false for whitespace characters', () => {
    expect(isPrintable('\u1680')).toBeFalse(); // Ogham space mark
    expect(isPrintable('\u180e')).toBeFalse(); // Mongolian vowel separator
    expect(isPrintable('\u2000')).toBeFalse(); // En quad
    expect(isPrintable('\u2001')).toBeFalse(); // Em quad
    expect(isPrintable('\u2002')).toBeFalse(); // En space
    expect(isPrintable('\u2003')).toBeFalse(); // Em space
    expect(isPrintable('\u2004')).toBeFalse(); // Three-per-em space
    expect(isPrintable('\u2005')).toBeFalse(); // Four-per-em space
    expect(isPrintable('\u2006')).toBeFalse(); // Six-per-em space
    expect(isPrintable('\u2007')).toBeFalse(); // Figure space
    expect(isPrintable('\u2008')).toBeFalse(); // Punctuation space
    expect(isPrintable('\u2009')).toBeFalse(); // Thin space
    expect(isPrintable('\u200a')).toBeFalse(); // Hair space
    expect(isPrintable('\u202f')).toBeFalse(); // Narrow no-break space
    expect(isPrintable('\u205f')).toBeFalse(); // Medium mathematical space
    expect(isPrintable('\u3000')).toBeFalse(); // Ideographic space
  });

  test('should return false for zero-width characters', () => {
    expect(isPrintable('\u200b')).toBeFalse(); // Zero width space
    expect(isPrintable('\u200c')).toBeFalse(); // Zero width non-joiner
    expect(isPrintable('\u200d')).toBeFalse(); // Zero width joiner
    expect(isPrintable('\ufeff')).toBeFalse(); // Zero width no-break space
  });

  test('should return false for bidirectional formatting characters', () => {
    expect(isPrintable('\u200e')).toBeFalse(); // Left-to-right mark
    expect(isPrintable('\u200f')).toBeFalse(); // Right-to-left mark
    expect(isPrintable('\u202a')).toBeFalse(); // Left-to-right embedding
    expect(isPrintable('\u202b')).toBeFalse(); // Right-to-left embedding
    expect(isPrintable('\u202c')).toBeFalse(); // Pop directional formatting
    expect(isPrintable('\u202d')).toBeFalse(); // Left-to-right override
    expect(isPrintable('\u202e')).toBeFalse(); // Right-to-left override
    expect(isPrintable('\u2066')).toBeFalse(); // Left-to-right isolate
    expect(isPrintable('\u2067')).toBeFalse(); // Right-to-left isolate
    expect(isPrintable('\u2068')).toBeFalse(); // First strong isolate
    expect(isPrintable('\u2069')).toBeFalse(); // Pop directional isolate
  });

  test('should return false for line and paragraph separators', () => {
    expect(isPrintable('\u2028')).toBeFalse(); // Line separator
    expect(isPrintable('\u2029')).toBeFalse(); // Paragraph separator
  });

  test('should return false for word joiner', () => {
    expect(isPrintable('\u2060')).toBeFalse(); // Word joiner
  });

  test('should return true for printable BMP characters', () => {
    expect(isPrintable('Α')).toBeTrue(); // Greek Alpha
    expect(isPrintable('Ω')).toBeTrue(); // Greek Omega
    expect(isPrintable('€')).toBeTrue(); // Euro sign
    expect(isPrintable('中')).toBeTrue(); // Chinese character
    expect(isPrintable('日')).toBeTrue(); // Japanese kanji
  });

  test('should return false for private use area', () => {
    expect(isPrintable('\ue000')).toBeFalse(); // First private use
    expect(isPrintable('\ue500')).toBeFalse(); // Middle private use
    expect(isPrintable('\uf8ff')).toBeFalse(); // Last private use
  });

  test('should return false for non-characters', () => {
    expect(isPrintable('\ufdd0')).toBeFalse(); // First non-character
    expect(isPrintable('\ufde0')).toBeFalse(); // Middle non-character
    expect(isPrintable('\ufdef')).toBeFalse(); // Last non-character
  });

  test('should work with code points as numbers', () => {
    expect(isPrintable(0x0020)).toBeTrue(); // Space
    expect(isPrintable(0x0041)).toBeTrue(); // 'A'
    expect(isPrintable(0x0000)).toBeFalse(); // NUL
    expect(isPrintable(0x0009)).toBeFalse(); // Tab
    expect(isPrintable(0x00a0)).toBeFalse(); // Non-breaking space
    expect(isPrintable(0x200b)).toBeFalse(); // Zero width space
  });

  test('should handle astral plane characters', () => {
    expect(isPrintable('😀')).toBeTrue(); // Emoji (U+1F600)
    expect(isPrintable('🎉')).toBeTrue(); // Party popper (U+1F389)
    expect(isPrintable('𝐀')).toBeTrue(); // Mathematical bold capital A (U+1D400)
  });
});
