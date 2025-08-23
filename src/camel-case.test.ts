import { camelCase } from './camel-case.ts';

describe('toCamelCase', () => {
  test('should sentences', () => {
    expect(camelCase('now is the time for all good men to come to the aid of their country')).toBe(
      'nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry',
    );
  });

  test('should change remaining case', () => {
    expect(camelCase('now IS the time for ALL good men to come to the AID of their country')).toBe(
      'nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry',
    );
  });

  test('stuff TODO', () => {
    expect(camelCase('thisIS the TIME forALLGood')).toBe('thisIsTheTimeForAllGood');
  });
});
