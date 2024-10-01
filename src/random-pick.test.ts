import randomPick from './random-pick.js';

describe('randomPick', () => {
  test('should pick object from list', () => {
    expect(randomPick([1, 2, 3], () => 0.5)).toBe(2);
  });

  test('use math.random by default', () => {
    expect(randomPick([2])).toBe(2);
  });

  test('return undefined for 0 length array', () => {
    expect(randomPick([] as unknown[])).toBeUndefined();
  });
});
