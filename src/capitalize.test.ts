import { capitalize } from './capitalize.ts';
import { hyphen, nbHyphen } from './constants.ts';

describe('capitalize', () => {
  test('simple words should be capitalized', () => {
    expect(capitalize('aardvark')).toBe('Aardvark');
    expect(capitalize('zebra')).toBe('Zebra');
  });

  test('capitalized words should remain the same', () => {
    expect(capitalize('Monkey')).toBe('Monkey');
  });

  test('all parts of hyphenated words should be capitalized', () => {
    expect(capitalize('duck-billed-platypus')).toBe('Duck-Billed-Platypus');
    expect(capitalize(`prairie${hyphen}dog`)).toBe(`Prairie${hyphen}Dog`);
    expect(capitalize(`jack${nbHyphen}rabbit`)).toBe(`Jack${nbHyphen}Rabbit`);
  });

  test('should capitalize only the first word', () => {
    expect(capitalize('deer and antelope')).toBe('Deer and antelope');
  });
});
