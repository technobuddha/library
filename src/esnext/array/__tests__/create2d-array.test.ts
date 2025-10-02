import { create2dArray } from '../create2d-array.ts';

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

  test('should create empty array when width is 0', () => {
    expect(create2dArray(0, 4, 1)).toEqual([]);
  });

  test('should create empty subarrays when height is 0', () => {
    expect(create2dArray(3, 0, 1)).toEqual([[], [], []]);
  });

  test('should fill with undefined', () => {
    expect(create2dArray(2, 2, undefined)).toEqual([
      [undefined, undefined],
      [undefined, undefined],
    ]);
  });

  test('should fill with boolean values', () => {
    expect(create2dArray(2, 2, true)).toEqual([
      [true, true],
      [true, true],
    ]);
  });

  test('should fill with objects', () => {
    const obj = { a: 1 };
    expect(create2dArray(2, 2, obj)).toEqual([
      [obj, obj],
      [obj, obj],
    ]);
  });

  test('should fill with function returning objects', () => {
    expect(create2dArray(2, 2, (x, y) => ({ x, y }))).toEqual([
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
    ]);
  });
});
