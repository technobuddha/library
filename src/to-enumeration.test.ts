import { toEnumeration } from './to-enumeration.js';

describe('toEnumeration', () => {
  test('determine the matching index', () => {
    expect(toEnumeration('b', 'a', 'b', 'c', 'd')).toBe(1);
  });

  test('return undefined for no match', () => {
    expect(toEnumeration('x', 'a', 'b', 'c', 'd')).toBeUndefined();
  });
});
