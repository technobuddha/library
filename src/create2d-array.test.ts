import { create2dArray } from './create2d-array.ts';

describe('create2dArray', () => {
  test('should fill from value', () => {
    expect(create2dArray(3, 4, 0)).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  test('should fill from function', () => {
    expect(create2dArray(3, 4, (x, y) => x * 10 + y)).toEqual([
      [0, 1, 2, 3],
      [10, 11, 12, 13],
      [20, 21, 22, 23],
    ]);
  });
});
