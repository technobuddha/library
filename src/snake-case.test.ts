import { snakeCase } from './snake-case.ts';

describe('snakeCase', () => {
  test('should sentences', () => {
    expect(snakeCase('now is the time for all good men to come to the aid of their country')).toBe(
      'now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country',
    );
  });

  test('should not change remaining case', () => {
    expect(snakeCase('now IS the time for ALL good men to come to the AID of their country')).toBe(
      'now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country',
    );
  });
});
