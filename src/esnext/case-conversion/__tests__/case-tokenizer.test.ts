import { hyphen, nonBreakingHyphen } from '../../unicode/unicode.ts';

import { caseTokenizer } from '../case-tokenizer.ts';

describe('case-tokenizer', () => {
  test('splits a simple sentence into words', () => {
    expect(caseTokenizer('Hello world')).toEqual(['Hello', 'world']);
  });

  test('handles empty string', () => {
    expect(caseTokenizer('')).toEqual(['']);
  });

  test('handles string with hyphens', () => {
    expect(caseTokenizer(`well-known break${hyphen}ing`)).toEqual([
      'well',
      'known',
      'break',
      'ing',
    ]);
    expect(caseTokenizer(`well-known non${nonBreakingHyphen}breaking`)).toEqual([
      'well',
      'known',
      'non',
      'breaking',
    ]);
  });

  test('handles camel or pascalCase words', () => {
    expect(caseTokenizer('camelCase')).toEqual(['camel', 'Case']);
    expect(caseTokenizer('PascalCase')).toEqual(['Pascal', 'Case']);
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(caseTokenizer('dataURL')).toEqual(['data', 'URL']);
    expect(caseTokenizer('dataURLLoader')).toEqual(['data', 'URL', 'Loader']);
    expect(caseTokenizer('HTMLParser')).toEqual(['HTML', 'Parser']);
    expect(caseTokenizer('JSONData')).toEqual(['JSON', 'Data']);
  });

  test('handles string with numbers', () => {
    expect(caseTokenizer('abc123 456def')).toEqual(['abc123', '456', 'def']);
    expect(caseTokenizer('isIPV4Local')).toEqual(['is', 'IPV4', 'Local']);
  });

  test('handles unicode letters', () => {
    expect(caseTokenizer('café naïve résumé')).toEqual(['café', 'naïve', 'résumé']);
  });

  test('handles mixed content', () => {
    expect(caseTokenizer('foo-bar_baz 123!')).toEqual(['foo', 'bar', 'baz', '123']);
  });

  test('handles a single astral character', () => {
    expect(caseTokenizer('👻')).toEqual(['👻']);
  });
});
