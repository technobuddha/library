import { hyphen, nonBreakingHyphen } from '../../unicode/unicode.ts';

import { uncapitalize } from '../uncapitalize.ts';

describe('uncapitalize', () => {
  test('simple words should remain the same', () => {
    expect(uncapitalize('aardvark')).toBe('aardvark');
    expect(uncapitalize('zebra')).toBe('zebra');
  });

  test('capitalized words should be uncapitalized', () => {
    expect(uncapitalize('Giraffe')).toBe('giraffe');
    expect(uncapitalize('Monkey')).toBe('monkey');
  });

  test('all parts of hyphenated words should be uncapitalized', () => {
    expect(uncapitalize('Duck-Billed-Platypus')).toBe('duck-billed-platypus');
    expect(uncapitalize(`Prairie${hyphen}Dog`)).toBe(`prairie${hyphen}dog`);
    expect(uncapitalize(`Jack${nonBreakingHyphen}Rabbit`)).toBe(`jack${nonBreakingHyphen}rabbit`);
  });

  test('should uncapitalize only the first word', () => {
    expect(uncapitalize('Deer and Antelope')).toBe('deer and Antelope');
  });

  test('uncapitalized sentence stays the same', () => {
    expect(uncapitalize('cats and dogs')).toBe('cats and dogs');
  });

  test('should uncapitalize the first hyphenated word', () => {
    expect(uncapitalize('Ground-Hog day, Ground-Hog day.')).toBe('ground-hog day, Ground-Hog day.');
  });
});
