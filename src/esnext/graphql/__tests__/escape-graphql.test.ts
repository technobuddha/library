import { space } from '../../unicode/unicode.ts';

import { escapeGraphQL } from '../escape-graphql.ts';

describe('escapeGraphQL', () => {
  test('should escape standard sequences', () => {
    expect(escapeGraphQL('\b\f\n\r\t\\"/')).toBe('\\b\\f\\n\\r\\t\\\\\\"\\/');
  });

  test('should not escape BMP characters', () => {
    expect(escapeGraphQL(space)).toBe(space);
    expect(escapeGraphQL('ABCdef[~]')).toBe('ABCdef[~]');
    expect(escapeGraphQL('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
    expect(escapeGraphQL('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
  });

  test('should escape non printables as \\unnnn', () => {
    expect(escapeGraphQL('\u{1}')).toBe('\\u0001');
    expect(escapeGraphQL('\u{1F}')).toBe('\\u001f');
    expect(escapeGraphQL('\u{7F}')).toBe('\\u007f');
    expect(escapeGraphQL('\u{A0}')).toBe('\\u00a0');
  });

  test('should not encode astral characters', () => {
    expect(escapeGraphQL('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });
});
