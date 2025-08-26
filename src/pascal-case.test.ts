import { pascalCase } from './pascal-case.ts';
import { hyphen, nbHyphen } from './unicode.ts';

describe('pascalCase', () => {
  test('should take human case', () => {
    expect(pascalCase('human case')).toBe('HumanCase');
  });

  test('should take snake_case input', () => {
    expect(pascalCase('snake_case')).toBe('SnakeCase');
  });

  test('should take kebab case', () => {
    expect(pascalCase('kebab-case')).toBe('KebabCase');
  });

  test('should take camelCase input', () => {
    expect(pascalCase('camelCase')).toBe('CamelCase');
  });

  test('should take PascalCase input', () => {
    expect(pascalCase('PascalCase')).toBe('PascalCase');
  });

  test('should take MACRO_CASE input', () => {
    expect(pascalCase('MACRO_CASE')).toBe('MacroCase');
  });

  test('should take dotCase input', () => {
    expect(pascalCase('dot.case')).toBe('DotCase');
  });

  test('should take lower case word', () => {
    expect(pascalCase('word')).toBe('Word');
  });

  test('should take upper case word', () => {
    expect(pascalCase('WORD')).toBe('Word');
  });

  test('should take capitalized word', () => {
    expect(pascalCase('Word')).toBe('Word');
  });

  test('should remove diacritics', () => {
    expect(pascalCase('crème brûlée')).toBe('CremeBrulee');
  });

  test('should break on hyphens', () => {
    expect(pascalCase('well-known')).toBe('WellKnown');
    expect(pascalCase(`well${hyphen}known`)).toBe('WellKnown');
    expect(pascalCase(`well${nbHyphen}known`)).toBe('WellKnown');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(pascalCase('dataURL')).toBe('DataUrl');
    expect(pascalCase('dataURLLoader')).toBe('DataUrlLoader');
    expect(pascalCase('HTMLParser')).toBe('HtmlParser');
    expect(pascalCase('JSONData')).toBe('JsonData');
  });

  test('should handle words suffixed by numbers', () => {
    expect(pascalCase('version1')).toBe('Version1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(pascalCase('123abc')).toBe('123Abc');
  });
});
