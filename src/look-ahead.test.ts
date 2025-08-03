import { lookAhead } from './look-ahead.ts';

describe('lookAhead', () => {
  test('yields pairs of consecutive elements', () => {
    const arr = [1, 2, 3];
    const result = Array.from(lookAhead(arr));
    expect(result).toStrictEqual([
      [1, 2],
      [2, 3],
    ]);
  });

  test('wrapAround option yields last and first as a pair', () => {
    const arr = [1, 2, 3];
    const result = Array.from(lookAhead(arr, { wrapAround: true }));
    expect(result).toStrictEqual([
      [1, 2],
      [2, 3],
      [3, 1],
    ]);
  });

  test('last option yields last and specified value as a pair', () => {
    const arr = [1, 2, 3];
    const result = Array.from(lookAhead(arr, { last: 0 }));
    expect(result).toStrictEqual([
      [1, 2],
      [2, 3],
      [3, 0],
    ]);
  });

  test('empty array yields nothing', () => {
    const arr: number[] = [];
    const result = Array.from(lookAhead(arr));
    expect(result).toStrictEqual([]);
  });

  test('single element array yields nothing by default', () => {
    const arr = [42];
    const result = Array.from(lookAhead(arr));
    expect(result).toStrictEqual([]);
  });

  test('single element array with wrapAround yields pair with itself', () => {
    const arr = [42];
    const result = Array.from(lookAhead(arr, { wrapAround: true }));
    expect(result).toStrictEqual([[42, 42]]);
  });

  test('single element array with last yields pair with last value', () => {
    const arr = [42];
    const result = Array.from(lookAhead(arr, { last: 99 }));
    expect(result).toStrictEqual([[42, 99]]);
  });
});
