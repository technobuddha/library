import { startCase } from './start-case.ts';

describe('startCase', () => {
  test('should convert sentences', () => {
    expect(
      startCase('Now, is the time for all good men to come to the aid of their country.'),
    ).toBe('Now Is The Time For All Good Men To Come To The Aid Of Their Country');
  });

  test('should not change case', () => {
    expect(startCase('Now IS the time for ALL good men to come to the AID of their country')).toBe(
      'Now IS The Time For ALL Good Men To Come To The AID Of Their Country',
    );
  });

  test('should take snake_case input', () => {
    expect(startCase('snake_case')).toBe('Snake Case');
  });

  test('should take camelCase input', () => {
    expect(startCase('camelCase')).toBe('Camel Case');
    expect(startCase('dataURL')).toBe('Data URL');
    expect(startCase('dataURLLoader')).toBe('Data URL Loader');
    expect(startCase('create2DArray')).toBe('Create 2 D Array');
  });

  test('should take PascalCase input', () => {
    expect(startCase('PascalCase')).toBe('Pascal Case');
    expect(startCase('HTMLParser')).toBe('HTML Parser');
    expect(startCase('JSONData')).toBe('JSON Data');
  });

  test('should take UPPER_CASE input', () => {
    expect(startCase('UPPER_CASE')).toBe('UPPER CASE');
  });

  test('should remove diacritics', () => {
    expect(startCase('crème brûlée')).toBe('Creme Brulee');
  });
});
