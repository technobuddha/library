import { macroCase } from './macro-case.ts';
import { hyphen, nonBreakingHyphen } from './unicode.ts';

describe('macroCase', () => {
  test('should take human case', () => {
    expect(macroCase('human case')).toBe('HUMAN_CASE');
  });

  test('should take snake_case input', () => {
    expect(macroCase('snake_case')).toBe('SNAKE_CASE');
  });

  test('should take kebab case', () => {
    expect(macroCase('kebab-case')).toBe('KEBAB_CASE');
  });

  test('should take camelCase input', () => {
    expect(macroCase('camelCase')).toBe('CAMEL_CASE');
  });

  test('should take PascalCase input', () => {
    expect(macroCase('PascalCase')).toBe('PASCAL_CASE');
  });

  test('should take MACRO_CASE input', () => {
    expect(macroCase('MACRO_CASE')).toBe('MACRO_CASE');
  });

  test('should take dotCase input', () => {
    expect(macroCase('dot.case')).toBe('DOT_CASE');
  });

  test('should take lower case word', () => {
    expect(macroCase('word')).toBe('WORD');
  });

  test('should take upper case word', () => {
    expect(macroCase('WORD')).toBe('WORD');
  });

  test('should take capitalized word', () => {
    expect(macroCase('Word')).toBe('WORD');
  });

  test('should remove diacritics', () => {
    expect(macroCase('crème brûlée')).toBe('CREME_BRULEE');
  });

  test('should break on hyphens', () => {
    expect(macroCase('well-known')).toBe('WELL_KNOWN');
    expect(macroCase(`well${hyphen}known`)).toBe('WELL_KNOWN');
    expect(macroCase(`well${nonBreakingHyphen}known`)).toBe('WELL_KNOWN');
  });

  test('should handle words with multiple upper-case letters', () => {
    expect(macroCase('dataURL')).toBe('DATA_URL');
    expect(macroCase('dataURLLoader')).toBe('DATA_URL_LOADER');
    expect(macroCase('HTMLParser')).toBe('HTML_PARSER');
    expect(macroCase('JSONData')).toBe('JSON_DATA');
  });

  test('should handle words suffixed by numbers', () => {
    expect(macroCase('version1')).toBe('VERSION1');
  });

  test('should handle words prefixed by numbers', () => {
    expect(macroCase('123abc')).toBe('123_ABC');
  });
});
