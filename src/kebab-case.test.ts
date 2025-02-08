import { hyphen, nbHyphen } from './constants.ts';
import { kebabCase } from './kebab-case.ts';

describe('kebabCase', () => {
  test('should take human case', () => {
    expect(kebabCase('human case')).toBe('human-case');
  });

  test('should take snake_case input', () => {
    expect(kebabCase('snake_case')).toBe('snake-case');
  });

  test('should take kebab case', () => {
    expect(kebabCase('kebab-case')).toBe('kebab-case');
  });

  test('should take camelCase input', () => {
    expect(kebabCase('camelCase')).toBe('camel-case');
  });

  test('should take PascalCase input', () => {
    expect(kebabCase('PascalCase')).toBe('pascal-case');
  });

  test('should take MACRO_CASE input', () => {
    expect(kebabCase('MACRO_CASE')).toBe('macro-case');
  });

  test('should take dotCase input', () => {
    expect(kebabCase('dot.case')).toBe('dot-case');
  });

  test('should take lower case word', () => {
    expect(kebabCase('word')).toBe('word');
  });

  test('should take upper case word', () => {
    expect(kebabCase('WORD')).toBe('word');
  });

  test('should take capitalized word', () => {
    expect(kebabCase('Word')).toBe('word');
  });

  test('should remove diacritics', () => {
    expect(kebabCase('crème brûlée')).toBe('creme-brulee');
  });

  test('should break on hyphens', () => {
    expect(kebabCase('well-known')).toBe('well-known');
    expect(kebabCase(`well${hyphen}known`)).toBe('well-known');
    expect(kebabCase(`well${nbHyphen}known`)).toBe('well-known');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(kebabCase('dataURL')).toBe('data-url');
    expect(kebabCase('dataURLLoader')).toBe('data-url-loader');
    expect(kebabCase('HTMLParser')).toBe('html-parser');
    expect(kebabCase('JSONData')).toBe('json-data');
  });

  test('should handle words suffixed by numbers', () => {
    expect(kebabCase('version1')).toBe('version-1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(kebabCase('123abc')).toBe('123-abc');
  });
});
