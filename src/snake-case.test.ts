import { snakeCase } from './snake-case.ts';
import { hyphen, nbHyphen } from './unicode.ts';

describe('snakeCase', () => {
  test('should take human case', () => {
    expect(snakeCase('human case')).toBe('human_case');
  });

  test('should take snake_case input', () => {
    expect(snakeCase('snake_case')).toBe('snake_case');
  });

  test('should take kebab case', () => {
    expect(snakeCase('kebab-case')).toBe('kebab_case');
  });

  test('should take camelCase input', () => {
    expect(snakeCase('camelCase')).toBe('camel_case');
  });

  test('should take PascalCase input', () => {
    expect(snakeCase('PascalCase')).toBe('pascal_case');
  });

  test('should take MACRO_CASE input', () => {
    expect(snakeCase('MACRO_CASE')).toBe('macro_case');
  });

  test('should take dotCase input', () => {
    expect(snakeCase('dot.case')).toBe('dot_case');
  });

  test('should take lower case word', () => {
    expect(snakeCase('word')).toBe('word');
  });

  test('should take upper case word', () => {
    expect(snakeCase('WORD')).toBe('word');
  });

  test('should take capitalized word', () => {
    expect(snakeCase('Word')).toBe('word');
  });

  test('should remove diacritics', () => {
    expect(snakeCase('crème brûlée')).toBe('creme_brulee');
  });

  test('should break on hyphens', () => {
    expect(snakeCase('well-known')).toBe('well_known');
    expect(snakeCase(`well${hyphen}known`)).toBe('well_known');
    expect(snakeCase(`well${nbHyphen}known`)).toBe('well_known');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(snakeCase('dataURL')).toBe('data_url');
    expect(snakeCase('dataURLLoader')).toBe('data_url_loader');
    expect(snakeCase('HTMLParser')).toBe('html_parser');
    expect(snakeCase('JSONData')).toBe('json_data');
  });

  test('should handle words suffixed by numbers', () => {
    expect(snakeCase('version1')).toBe('version_1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(snakeCase('123abc')).toBe('123_abc');
  });
});
