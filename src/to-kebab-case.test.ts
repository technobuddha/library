import { toKebabCase } from './to-kebab-case.ts';

describe('toDashCase', () => {
  test('should sentences', () => {
    expect(
      toKebabCase('now is the time for all good men to come to the aid of their country'),
    ).toBe('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
  });

  test('should not change remaining case', () => {
    expect(
      toKebabCase('now IS the time for ALL good men to come to the AID of their country'),
    ).toBe('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
  });
});
