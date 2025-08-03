// cspell:ignore unnnn ΑΒΓΔΕΖ

import { space } from './constants.ts';
import { escapeGraphQL } from './escape-graphql.ts';

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
    expect(escapeGraphQL('\u0001')).toBe('\\u0001');
    expect(escapeGraphQL('\u001f')).toBe('\\u001f');
    expect(escapeGraphQL('\u007f')).toBe('\\u007f');
    expect(escapeGraphQL('\u00a0')).toBe('\\u00a0');
  });

  test('should not encode astral characters', () => {
    expect(escapeGraphQL('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
  });
});
