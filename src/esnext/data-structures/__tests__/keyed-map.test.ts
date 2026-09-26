import { keyedMap } from '../keyed-map.ts';

type Cartesian = { x: number; y: number };

describe('keyedMap', () => {
  test('stores values under derived keys', () => {
    const [CartesianMap] = keyedMap<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const map = new CartesianMap([
      [{ x: 1, y: 2 }, 'first'],
      [{ x: 3, y: 4 }, 'second'],
      [{ x: 1, y: 2 }, 'updated'],
    ]);

    expect(map.size).toBe(2);
    expect(map.get({ x: 1, y: 2 })).toBe('updated');
    expect(map.get({ x: 3, y: 4 })).toBe('second');
    expect(map.has({ x: 1, y: 2 })).toBeTrue();
    expect(map.has({ x: 5, y: 6 })).toBeFalse();
  });

  test('supports set, delete, clear, and iteration', () => {
    const [CartesianMap] = keyedMap<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const map = new CartesianMap();
    map.set({ x: 1, y: 2 }, 'one');
    map.set({ x: 3, y: 4 }, 'two');

    expect(map.size).toBe(2);
    expect(map.delete({ x: 1, y: 2 })).toBeTrue();
    expect(map.size).toBe(1);
    expect(map.get({ x: 1, y: 2 })).toBeUndefined();

    map.clear();
    expect(map.size).toBe(0);
    expect(Array.from(map)).toEqual([]);
  });

  test('supports explicit value type arguments on the returned constructors', () => {
    const [CartesianMap, ReadonlyCartesianMap] = keyedMap<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const map = new CartesianMap<number>([[{ x: 1, y: 2 }, 42]]);
    const readonlyMap = new ReadonlyCartesianMap<number>([[{ x: 3, y: 4 }, 84]]);

    expect(map.get({ x: 1, y: 2 })).toBe(42);
    expect(Array.from(readonlyMap.entries())).toEqual([[{ x: 3, y: 4 }, 84]]);
  });

  test('iterators decode keys back to the original type', () => {
    const [CartesianMap] = keyedMap<Cartesian>(
      ({ x, y }) => `${x}:${y}`,
      (key) => {
        const [x, y] = key.split(':').map(Number);
        return { x, y };
      },
    );

    const map = new CartesianMap([
      [{ x: 1, y: 2 }, 'a'],
      [{ x: 3, y: 4 }, 'b'],
    ]);

    expect(Array.from(map.keys())).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(Array.from(map.values())).toEqual(['a', 'b']);
    expect(Array.from(map.entries())).toEqual([
      [{ x: 1, y: 2 }, 'a'],
      [{ x: 3, y: 4 }, 'b'],
    ]);
  });
});
