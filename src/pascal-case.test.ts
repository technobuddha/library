import { pascalCase } from './pascal-case.ts';

describe('toPascalCase', () => {
  test('should sentences', () => {
    expect(pascalCase('now is the time for all good men to come to the aid of their country')).toBe(
      'NowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry',
    );
  });

  test('should change remaining case', () => {
    expect(pascalCase('now IS the time for ALL good men to come to the AID of their country')).toBe(
      'NowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry',
    );
  });
});
