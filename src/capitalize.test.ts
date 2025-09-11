import { capitalize } from './capitalize.ts';
import { hyphen, nonBreakingHyphen } from './unicode.ts';

describe('capitalize', () => {
  test('simple words should be capitalized', () => {
    expect(capitalize('aardvark')).toBe('Aardvark');
    expect(capitalize('zebra')).toBe('Zebra');
  });

  test('capitalized words should remain the same', () => {
    expect(capitalize('Giraffe')).toBe('Giraffe');
    expect(capitalize('Monkey')).toBe('Monkey');
  });

  test('all parts of hyphenated words should be capitalized', () => {
    expect(capitalize('duck-billed-platypus')).toBe('Duck-Billed-Platypus');
    expect(capitalize(`prairie${hyphen}dog`)).toBe(`Prairie${hyphen}Dog`);
    expect(capitalize(`jack${nonBreakingHyphen}rabbit`)).toBe(`Jack${nonBreakingHyphen}Rabbit`);
  });

  test('should capitalize only the first word', () => {
    expect(capitalize('deer and antelope')).toBe('Deer and antelope');
  });

  test('capitalized sentence stays the same', () => {
    expect(capitalize('Cats and dogs')).toBe('Cats and dogs');
  });

  test('should capitalize the first hyphenated word', () => {
    expect(capitalize('ground-hog day, ground-hog day.')).toBe('Ground-Hog day, ground-hog day.');
  });
});
