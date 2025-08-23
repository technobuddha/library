import { dotCase } from './dot-case.ts';

describe('dotCase', () => {
  test('should sentences', () => {
    expect(dotCase('now is the time for all good men to come to the aid of their country')).toBe(
      'now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country',
    );
  });

  test('should not change remaining case', () => {
    expect(dotCase('now IS the time for ALL good men to come to the AID of their country')).toBe(
      'now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country',
    );
  });
});
