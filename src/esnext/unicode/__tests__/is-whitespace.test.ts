import { isWhitespace } from '../is-whitespace.ts';
import { empty, space } from '../unicode.ts';

describe('isWhitespace', () => {
  test('should handle empty strings', () => {
    expect(isWhitespace(empty)).toBeFalse();
  });

  test('should handle whitespace characters', () => {
    expect(isWhitespace(space)).toBeTrue();
    expect(isWhitespace('\t')).toBeTrue();
    expect(isWhitespace('\r')).toBeTrue();
    expect(isWhitespace('\n')).toBeTrue();
    expect(isWhitespace('\v')).toBeTrue();
    expect(isWhitespace('\f')).toBeTrue();
    expect(isWhitespace('\u{A0}')).toBeTrue();
    expect(isWhitespace('\u{1680}')).toBeTrue();
    expect(isWhitespace('\u{2000}')).toBeTrue();
    expect(isWhitespace('\u{2001}')).toBeTrue();
    expect(isWhitespace('\u{2002}')).toBeTrue();
    expect(isWhitespace('\u{2003}')).toBeTrue();
    expect(isWhitespace('\u{2004}')).toBeTrue();
    expect(isWhitespace('\u{2005}')).toBeTrue();
    expect(isWhitespace('\u{2006}')).toBeTrue();
    expect(isWhitespace('\u{2007}')).toBeTrue();
    expect(isWhitespace('\u{2008}')).toBeTrue();
    expect(isWhitespace('\u{2009}')).toBeTrue();
    expect(isWhitespace('\u{200A}')).toBeTrue();
    expect(isWhitespace('\u{2028}')).toBeTrue();
    expect(isWhitespace('\u{2029}')).toBeTrue();
    expect(isWhitespace('\u{202F}')).toBeTrue();
    expect(isWhitespace('\u{205F}')).toBeTrue();
    expect(isWhitespace('\u{3000}')).toBeTrue();
    expect(isWhitespace('\u{FEFF}')).toBeTrue();
  });

  test('should handle whitespace strings', () => {
    expect(isWhitespace(' \t\r\n\v\f ')).toBeTrue();
  });

  test('should reject other strings', () => {
    expect(isWhitespace('    a    ')).toBeFalse();
  });
});
