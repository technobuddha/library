import { CartesianSet } from './cartesian-set.ts';
import { type Cartesian } from './geometry.ts';

describe('CartesianSet', () => {
  test('constructor', () => {
    expect(new CartesianSet()).toBeInstanceOf(CartesianSet);
    expect(
      new CartesianSet([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]),
    ).toBeInstanceOf(CartesianSet);
  });

  test('size', () => {
    expect(new CartesianSet().size).toBe(0);
    expect(
      new CartesianSet([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]).size,
    ).toBe(2);
    expect(
      new CartesianSet([
        { x: 1, y: 2 },
        { x: 1, y: 2 },
      ]).size,
    ).toBe(1);
  });

  test('add', () => {
    const set = new CartesianSet();
    set.add({ x: 1, y: 2 });
    expect(set.size).toBe(1);
    set.add({ x: 3, y: 4 });
    expect(set.size).toBe(2);
    set.add([
      { x: 5, y: 6 },
      { x: 7, y: 8 },
    ]);
    expect(set.size).toBe(4);
    set.add({ x: 1, y: 2 }); // Duplicate
    expect(set.size).toBe(4);
  });

  test('clear', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(set.size).toBe(2);
    set.clear();
    expect(set.size).toBe(0);
  });

  test('delete', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(set.size).toBe(2);
    expect(set.delete({ x: 1, y: 2 })).toBeTrue();
    expect(set.size).toBe(1);
    expect(set.delete({ x: 5, y: 6 })).toBeFalse(); // Non-existent
    expect(set.size).toBe(1);
  });

  test('difference', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    const diff = set1.difference(set2);
    expect(diff).toBeInstanceOf(CartesianSet);
    expect(diff.size).toBe(1);
    expect(Array.from(diff)).toEqual([{ x: 1, y: 2 }]);
  });

  test('entries', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const entries = Array.from(set.entries());
    expect(entries).toEqual([
      [
        { x: 1, y: 2 },
        { x: 1, y: 2 },
      ],
      [
        { x: 3, y: 4 },
        { x: 3, y: 4 },
      ],
    ]);
  });

  test('forEach', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const results: Cartesian[] = [];
    // eslint-disable-next-line unicorn/no-array-for-each
    set.forEach((value) => results.push(value));
    expect(results).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });

  test('has', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(set.has({ x: 1, y: 2 })).toBeTrue();
    expect(set.has({ x: 3, y: 4 })).toBeTrue();
    expect(set.has({ x: 5, y: 6 })).toBeFalse(); // Non-existent
  });

  test('intersection', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    const intersection = set1.intersection(set2);
    expect(intersection).toBeInstanceOf(CartesianSet);
    expect(intersection.size).toBe(1);
    expect(Array.from(intersection)).toEqual([{ x: 3, y: 4 }]);
  });

  test('isDisjoingFrom', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 5, y: 6 },
      { x: 7, y: 8 },
    ]);
    expect(set1.isDisjointFrom(set2)).toBeTrue();
    const set3 = new CartesianSet([
      { x: 3, y: 4 },
      { x: 9, y: 10 },
    ]);
    expect(set1.isDisjointFrom(set3)).toBeFalse();
  });

  test('isSubsetOf', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    expect(set1.isSubsetOf(set2)).toBeTrue();
    expect(set2.isSubsetOf(set1)).toBeFalse();
  });

  test('isSupersetOf', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    expect(set2.isSupersetOf(set1)).toBeTrue();
    expect(set1.isSupersetOf(set2)).toBeFalse();
  });

  test('keys', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const keys = Array.from(set.keys());
    expect(keys).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });

  test('symmetricDifference', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    const symDiff = set1.symmetricDifference(set2);
    expect(symDiff).toBeInstanceOf(CartesianSet);
    expect(symDiff.size).toBe(2);
    expect(Array.from(symDiff)).toEqual([
      { x: 1, y: 2 },
      { x: 5, y: 6 },
    ]);
  });

  test('union', () => {
    const set1 = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const set2 = new CartesianSet([
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
    const union = set1.union(set2);
    expect(union).toBeInstanceOf(CartesianSet);
    expect(union.size).toBe(3);
    expect(Array.from(union)).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
  });

  test('values', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const values = Array.from(set.values());
    expect(values).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });

  test('[toStringTag]', () => {
    const set = new CartesianSet();
    expect(set[Symbol.toStringTag]).toBe('CartesianSet');
  });

  test('iterator', () => {
    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    const cartesian = Array.from(set);
    expect(cartesian).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });
});
