import { keyedSet } from '../keyed-set.ts';

type Cartesian = { x: number; y: number };

describe('keyedSet', () => {
  test('stores unique values by derived key', () => {
    const [CartesianSet] = keyedSet<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 1, y: 2 },
    ]);

    expect(set.size).toBe(2);
    expect(set.has({ x: 1, y: 2 })).toBeTrue();
    expect(set.has({ x: 3, y: 4 })).toBeTrue();
    expect(set.has({ x: 5, y: 6 })).toBeFalse();
  });

  test('supports add, delete, clear, and iteration', () => {
    const [CartesianSet] = keyedSet<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const set = new CartesianSet();
    set.add({ x: 1, y: 2 });
    set.add({ x: 1, y: 2 });
    set.add({ x: 3, y: 4 });

    expect(set.size).toBe(2);
    expect(set.delete({ x: 1, y: 2 })).toBeTrue();
    expect(set.size).toBe(1);
    expect(set.has({ x: 1, y: 2 })).toBeFalse();

    set.clear();
    expect(set.size).toBe(0);
    expect(Array.from(set)).toEqual([]);
  });

  test('iterators decode values back to the original type', () => {
    const [CartesianSet] = keyedSet<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);

    expect(Array.from(set.values())).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(Array.from(set.keys())).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(Array.from(set.entries())).toEqual([
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

  test('supports predicate helpers', () => {
    const [CartesianSet] = keyedSet<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const set = new CartesianSet([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);

    expect(set.some(({ x }) => x === 3)).toBeTrue();
    expect(set.every(({ x }) => x > 0)).toBeTrue();
    expect(Array.from(set.filter(({ x }) => x > 1))).toEqual([{ x: 3, y: 4 }]);
    expect(Array.from(set.map(({ x, y }) => `${x},${y}`))).toEqual(['1,2', '3,4']);
    expect(
      Array.from(
        set.flatMap(({ x, y }) => [
          { x, y },
          { x: x + 1, y: y + 1 },
        ]),
      ),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
    ]);
  });
});
