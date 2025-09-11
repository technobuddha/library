import { humanCase } from './human-case.ts';
import { hyphen, nonBreakingHyphen } from './unicode.ts';

describe('humanCase', () => {
  test('should take human case', () => {
    expect(humanCase('human case')).toBe('human case');
  });

  test('should take snake_case input', () => {
    expect(humanCase('snake_case')).toBe('snake case');
  });

  test('should take kebab case', () => {
    expect(humanCase('kebab-case')).toBe('kebab case');
  });

  test('should take camelCase input', () => {
    expect(humanCase('camelCase')).toBe('camel case');
  });

  test('should take PascalCase input', () => {
    expect(humanCase('PascalCase')).toBe('pascal case');
  });

  test('should take MACRO_CASE input', () => {
    expect(humanCase('MACRO_CASE')).toBe('macro case');
  });

  test('should take dotCase input', () => {
    expect(humanCase('dot.case')).toBe('dot case');
  });

  test('should take lower case word', () => {
    expect(humanCase('word')).toBe('word');
  });

  test('should take upper case word', () => {
    expect(humanCase('WORD')).toBe('word');
  });

  test('should take capitalized word', () => {
    expect(humanCase('Word')).toBe('word');
  });

  test('should remove diacritics', () => {
    expect(humanCase('crème brûlée')).toBe('creme brulee');
  });

  test('should break on hyphens', () => {
    expect(humanCase('well-known')).toBe('well known');
    expect(humanCase(`well${hyphen}known`)).toBe('well known');
    expect(humanCase(`well${nonBreakingHyphen}known`)).toBe('well known');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(humanCase('dataURL')).toBe('data url');
    expect(humanCase('dataURLLoader')).toBe('data url loader');
    expect(humanCase('HTMLParser')).toBe('html parser');
    expect(humanCase('JSONData')).toBe('json data');
  });

  test('should handle words suffixed by numbers', () => {
    expect(humanCase('version1')).toBe('version1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(humanCase('123abc')).toBe('123 abc');
  });
});
