import { empty, space } from './constants.ts';
import { isWhitespace } from './is-whitespace.ts';

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
    expect(isWhitespace('\u00A0')).toBeTrue();
    expect(isWhitespace('\u1680')).toBeTrue();
    expect(isWhitespace('\u2000')).toBeTrue();
    expect(isWhitespace('\u2001')).toBeTrue();
    expect(isWhitespace('\u2002')).toBeTrue();
    expect(isWhitespace('\u2003')).toBeTrue();
    expect(isWhitespace('\u2004')).toBeTrue();
    expect(isWhitespace('\u2005')).toBeTrue();
    expect(isWhitespace('\u2006')).toBeTrue();
    expect(isWhitespace('\u2007')).toBeTrue();
    expect(isWhitespace('\u2008')).toBeTrue();
    expect(isWhitespace('\u2009')).toBeTrue();
    expect(isWhitespace('\u200a')).toBeTrue();
    expect(isWhitespace('\u2028')).toBeTrue();
    expect(isWhitespace('\u2029')).toBeTrue();
    expect(isWhitespace('\u202f')).toBeTrue();
    expect(isWhitespace('\u205f')).toBeTrue();
    expect(isWhitespace('\u3000')).toBeTrue();
    expect(isWhitespace('\ufeff')).toBeTrue();
  });

  test('should handle whitespace strings', () => {
    expect(isWhitespace(' \t\r\n\v\f ')).toBeTrue();
  });

  test('should reject other strings', () => {
    expect(isWhitespace('    a    ')).toBeFalse();
  });
});
