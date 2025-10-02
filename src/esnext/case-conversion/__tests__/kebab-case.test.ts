import { kebabCase } from '../kebab-case.ts';

describe('kebabCase', () => {
  test('should convert sentences', () => {
    expect(kebabCase('now is the time for all good men to come to the aid of their country')).toBe(
      'now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country',
    );
    expect(kebabCase('now IS the time for ALL good men to come to the AID of their country')).toBe(
      'now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country',
    );
  });

  test('should take snake_case input', () => {
    expect(kebabCase('snake_case')).toBe('snake-case');
  });

  test('should take camelCase input', () => {
    expect(kebabCase('camelCase')).toBe('camel-case');
  });

  test('should take PascalCase input', () => {
    expect(kebabCase('PascalCase')).toBe('pascal-case');
  });

  test('should take UPPER_CASE input', () => {
    expect(kebabCase('UPPER_CASE')).toBe('upper-case');
  });

  test('should remove diacritics', () => {
    expect(kebabCase('crème brûlée')).toBe('creme-brulee');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(kebabCase('dataURL')).toBe('data-url');
    expect(kebabCase('dataURLLoader')).toBe('data-url-loader');
    expect(kebabCase('HTMLParser')).toBe('html-parser');
    expect(kebabCase('JSONData')).toBe('json-data');
  });
});
