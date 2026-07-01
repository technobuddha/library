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
    expect(isPrintable('\u{0}')).toBeFalse(); // NUL
    expect(isPrintable('\u{1}')).toBeFalse(); // SOH
    expect(isPrintable('\u{7}')).toBeFalse(); // Bell
    expect(isPrintable('\b')).toBeFalse(); // Backspace (U+0008)
    expect(isPrintable('\t')).toBeFalse(); // Tab (U+0009)
    expect(isPrintable('\n')).toBeFalse(); // Newline (U+000A)
    expect(isPrintable('\v')).toBeFalse(); // Vertical tab (U+000B)
    expect(isPrintable('\f')).toBeFalse(); // Form feed (U+000C)
    expect(isPrintable('\r')).toBeFalse(); // Carriage return (U+000D)
    expect(isPrintable('\u{1F}')).toBeFalse(); // Unit separator
  });

  test('should return false for DEL', () => {
    expect(isPrintable('\u{7F}')).toBeFalse(); // DEL
  });

  test('should return false for C1 control codes', () => {
    expect(isPrintable('\u{80}')).toBeFalse(); // First C1 control
    expect(isPrintable('\u{81}')).toBeFalse();
    expect(isPrintable('\u{90}')).toBeFalse();
    expect(isPrintable('\u{9F}')).toBeFalse(); // Last C1 control
  });

  test('should return false for non-breaking space', () => {
    expect(isPrintable('\u{A0}')).toBeFalse(); // Non-breaking space
  });

  test('should return true for printable Latin-1 characters', () => {
    expect(isPrintable('¡')).toBeTrue(); // U+00A1
    expect(isPrintable('©')).toBeTrue(); // Copyright
    expect(isPrintable('é')).toBeTrue(); // e acute
    expect(isPrintable('ÿ')).toBeTrue(); // y diaeresis
  });

  test('should return false for soft hyphen', () => {
    expect(isPrintable('\u{AD}')).toBeFalse(); // Soft hyphen
  });

  test('should return false for format characters', () => {
    expect(isPrintable('\u{34F}')).toBeFalse(); // Combining grapheme joiner
    expect(isPrintable('\u{61C}')).toBeFalse(); // Arabic letter mark
  });

  test('should return false for whitespace characters', () => {
    expect(isPrintable('\u{1680}')).toBeFalse(); // Ogham space mark
    expect(isPrintable('\u{180E}')).toBeFalse(); // Mongolian vowel separator
    expect(isPrintable('\u{2000}')).toBeFalse(); // En quad
    expect(isPrintable('\u{2001}')).toBeFalse(); // Em quad
    expect(isPrintable('\u{2002}')).toBeFalse(); // En space
    expect(isPrintable('\u{2003}')).toBeFalse(); // Em space
    expect(isPrintable('\u{2004}')).toBeFalse(); // Three-per-em space
    expect(isPrintable('\u{2005}')).toBeFalse(); // Four-per-em space
    expect(isPrintable('\u{2006}')).toBeFalse(); // Six-per-em space
    expect(isPrintable('\u{2007}')).toBeFalse(); // Figure space
    expect(isPrintable('\u{2008}')).toBeFalse(); // Punctuation space
    expect(isPrintable('\u{2009}')).toBeFalse(); // Thin space
    expect(isPrintable('\u{200A}')).toBeFalse(); // Hair space
    expect(isPrintable('\u{202F}')).toBeFalse(); // Narrow no-break space
    expect(isPrintable('\u{205F}')).toBeFalse(); // Medium mathematical space
    expect(isPrintable('\u{3000}')).toBeFalse(); // Ideographic space
  });

  test('should return false for zero-width characters', () => {
    expect(isPrintable('\u{200B}')).toBeFalse(); // Zero width space
    expect(isPrintable('\u{200C}')).toBeFalse(); // Zero width non-joiner
    expect(isPrintable('\u{200D}')).toBeFalse(); // Zero width joiner
    expect(isPrintable('\u{FEFF}')).toBeFalse(); // Zero width no-break space
  });

  test('should return false for bidirectional formatting characters', () => {
    expect(isPrintable('\u{200E}')).toBeFalse(); // Left-to-right mark
    expect(isPrintable('\u{200F}')).toBeFalse(); // Right-to-left mark
    expect(isPrintable('\u{202A}')).toBeFalse(); // Left-to-right embedding
    expect(isPrintable('\u{202B}')).toBeFalse(); // Right-to-left embedding
    expect(isPrintable('\u{202C}')).toBeFalse(); // Pop directional formatting
    expect(isPrintable('\u{202D}')).toBeFalse(); // Left-to-right override
    expect(isPrintable('\u{202E}')).toBeFalse(); // Right-to-left override
    expect(isPrintable('\u{2066}')).toBeFalse(); // Left-to-right isolate
    expect(isPrintable('\u{2067}')).toBeFalse(); // Right-to-left isolate
    expect(isPrintable('\u{2068}')).toBeFalse(); // First strong isolate
    expect(isPrintable('\u{2069}')).toBeFalse(); // Pop directional isolate
  });

  test('should return false for line and paragraph separators', () => {
    expect(isPrintable('\u{2028}')).toBeFalse(); // Line separator
    expect(isPrintable('\u{2029}')).toBeFalse(); // Paragraph separator
  });

  test('should return false for word joiner', () => {
    expect(isPrintable('\u{2060}')).toBeFalse(); // Word joiner
  });

  test('should return true for printable BMP characters', () => {
    expect(isPrintable('Α')).toBeTrue(); // Greek Alpha
    expect(isPrintable('Ω')).toBeTrue(); // Greek Omega
    expect(isPrintable('€')).toBeTrue(); // Euro sign
    expect(isPrintable('中')).toBeTrue(); // Chinese character
    expect(isPrintable('日')).toBeTrue(); // Japanese kanji
  });

  test('should return false for private use area', () => {
    expect(isPrintable('\u{E000}')).toBeFalse(); // First private use
    expect(isPrintable('\u{E500}')).toBeFalse(); // Middle private use
    expect(isPrintable('\u{F8FF}')).toBeFalse(); // Last private use
  });

  test('should return false for non-characters', () => {
    expect(isPrintable('\u{FDD0}')).toBeFalse(); // First non-character
    expect(isPrintable('\u{FDE0}')).toBeFalse(); // Middle non-character
    expect(isPrintable('\u{FDEF}')).toBeFalse(); // Last non-character
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
