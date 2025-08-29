import { dotCase } from './dot-case.ts';
import { hyphen, nonBreakingHyphen } from './unicode.ts';

describe('dotCase', () => {
  test('should take human case', () => {
    expect(dotCase('human case')).toBe('human.case');
  });

  test('should take snake_case input', () => {
    expect(dotCase('snake_case')).toBe('snake.case');
  });

  test('should take kebab case', () => {
    expect(dotCase('kebab-case')).toBe('kebab.case');
  });

  test('should take camelCase input', () => {
    expect(dotCase('camelCase')).toBe('camel.case');
  });

  test('should take PascalCase input', () => {
    expect(dotCase('PascalCase')).toBe('pascal.case');
  });

  test('should take MACRO_CASE input', () => {
    expect(dotCase('MACRO_CASE')).toBe('macro.case');
  });

  test('should take dotCase input', () => {
    expect(dotCase('dot.case')).toBe('dot.case');
  });

  test('should take lower case word', () => {
    expect(dotCase('word')).toBe('word');
  });

  test('should take upper case word', () => {
    expect(dotCase('WORD')).toBe('word');
  });

  test('should take capitalized word', () => {
    expect(dotCase('Word')).toBe('word');
  });

  test('should remove diacritics', () => {
    expect(dotCase('crème brûlée')).toBe('creme.brulee');
  });

  test('should break on hyphens', () => {
    expect(dotCase('well-known')).toBe('well.known');
    expect(dotCase(`well${hyphen}known`)).toBe('well.known');
    expect(dotCase(`well${nonBreakingHyphen}known`)).toBe('well.known');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(dotCase('dataURL')).toBe('data.url');
    expect(dotCase('dataURLLoader')).toBe('data.url.loader');
    expect(dotCase('HTMLParser')).toBe('html.parser');
    expect(dotCase('JSONData')).toBe('json.data');
  });

  test('should handle words suffixed by numbers', () => {
    expect(dotCase('version1')).toBe('version.1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(dotCase('123abc')).toBe('123.abc');
  });
});
