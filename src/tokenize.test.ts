import { hyphen, nbHyphen } from './constants.ts';
import { tokenize } from './tokenize.ts';

describe('tokenize', () => {
  test('splits a simple sentence into words', () => {
    expect(tokenize('Hello world')).toEqual(['Hello', 'world']);
  });

  test('handles empty string', () => {
    expect(tokenize('')).toEqual([]);
  });

  test('handles string with only punctuation', () => {
    expect(tokenize('!@#$%^&*()')).toEqual([]);
  });

  test('handles string with hyphens', () => {
    expect(tokenize(`well-known break${hyphen}ing`)).toEqual(['well', 'known', 'break', 'ing']);
    expect(tokenize(`well-known non${nbHyphen}breaking`)).toEqual([
      'well',
      'known',
      'non',
      'breaking',
    ]);
  });

  test('handles camel or pascalCase words', () => {
    expect(tokenize('camelCase')).toEqual(['camel', 'Case']);
    expect(tokenize('PascalCase')).toEqual(['Pascal', 'Case']);
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(tokenize('dataURL')).toEqual(['data', 'URL']);
    expect(tokenize('dataURLLoader')).toEqual(['data', 'URL', 'Loader']);
    expect(tokenize('HTMLParser')).toEqual(['HTML', 'Parser']);
    expect(tokenize('JSONData')).toEqual(['JSON', 'Data']);
  });

  test('handles string with numbers', () => {
    expect(tokenize('abc123 456def')).toEqual(['abc', '123', '456', 'def']);
  });

  test('handles unicode letters', () => {
    expect(tokenize('café naïve résumé')).toEqual(['café', 'naïve', 'résumé']);
  });

  test('handles mixed content', () => {
    expect(tokenize('foo-bar_baz 123!')).toEqual(['foo', 'bar', 'baz', '123']);
  });
});
