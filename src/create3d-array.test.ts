import { create3dArray } from './create3d-array.ts';

describe('create3dArray', () => {
  test('should fill from value', () => {
    expect(create3dArray(2, 3, 4, 0)).toEqual([
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ]);
  });

  test('should fill from function', () => {
    expect(create3dArray(2, 3, 4, (x, y, z) => x + y + z)).toEqual([
      [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
      ],
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ],
    ]);
  });

  test('should create empty array when width is 0', () => {
    expect(create3dArray(0, 3, 4, 1)).toEqual([]);
  });

  test('should create empty subarrays when height is 0', () => {
    expect(create3dArray(2, 0, 4, 1)).toEqual([[], []]);
  });

  test('should create empty sub-subarrays when depth is 0', () => {
    expect(create3dArray(2, 3, 0, 1)).toEqual([
      [[], [], []],
      [[], [], []],
    ]);
  });

  test('should fill with undefined', () => {
    expect(create3dArray(1, 1, 2, undefined)).toEqual([[[undefined, undefined]]]);
  });

  test('should fill with boolean values', () => {
    expect(create3dArray(1, 2, 2, true)).toEqual([
      [
        [true, true],
        [true, true],
      ],
    ]);
  });

  test('should fill with objects', () => {
    const obj = { a: 1 };
    expect(create3dArray(1, 1, 2, obj)).toEqual([[[obj, obj]]]);
  });

  test('should fill with function returning objects', () => {
    expect(create3dArray(1, 2, 2, (x, y, z) => ({ x, y, z }))).toEqual([
      [
        [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 1 },
        ],
        [
          { x: 0, y: 1, z: 0 },
          { x: 0, y: 1, z: 1 },
        ],
      ],
    ]);
  });
});
