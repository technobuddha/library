import { randomDraw } from './random-draw.ts';

describe('randomDraw', () => {
  test('should draw object from list', () => {
    expect(randomDraw([1, 2, 3], () => 0.5)).toStrictEqual({ draw: 2, list: [1, 3] });
  });

  test('use math.random by default', () => {
    expect(randomDraw([2])).toStrictEqual({ draw: 2, list: [] });
  });

  test('return undefined for 0 length array', () => {
    expect(randomDraw([] as unknown[])).toBeUndefined();
  });
});
