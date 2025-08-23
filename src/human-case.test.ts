import { humanCase } from './human-case.ts';

describe('humanCase', () => {
  test('should convert sentences', () => {
    expect(
      humanCase('Now, is the time for all good men to come to the aid of their country.'),
    ).toBe('now is the time for all good men to come to the aid of their country');
  });

  test('should change case', () => {
    expect(humanCase('Now IS the time for ALL good men to come to the AID of their country')).toBe(
      'now is the time for all good men to come to the aid of their country',
    );
  });

  test('should take snake_case input', () => {
    expect(humanCase('snake_case')).toBe('snake case');
  });

  test('should take camelCase input', () => {
    expect(humanCase('camelCase')).toBe('camel case');
    expect(humanCase('dataURL')).toBe('data url');
    expect(humanCase('dataURLLoader')).toBe('data url loader');
    expect(humanCase('create2DArray')).toBe('create 2 d array');
  });

  test('should take PascalCase input', () => {
    expect(humanCase('PascalCase')).toBe('pascal case');
    expect(humanCase('HTMLParser')).toBe('html parser');
    expect(humanCase('JSONData')).toBe('json data');
  });

  test('should take UPPER_CASE input', () => {
    expect(humanCase('UPPER_CASE')).toBe('upper case');
  });

  test('should remove diacritics', () => {
    expect(humanCase('crème brûlée')).toBe('creme brulee');
  });
});
