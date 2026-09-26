import { KeyedMap } from '../keyed-map.ts';

type Cartesian = { x: number; y: number };

class CartesianMap<V = string> extends KeyedMap<Cartesian, V> {
  protected encodeKey(value: Cartesian): string {
    return `${value.x}:${value.y}`;
  }

  protected decodeKey(value: string): Cartesian {
    const [x, y] = value.split(':').map(Number);
    return { x, y };
  }
}

describe('KeyedMap', () => {
  test('stores values under derived keys', () => {
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

  test('supports explicit value type arguments on subclasses', () => {
    const map = new CartesianMap<number>([[{ x: 1, y: 2 }, 42]]);
    const readonlyMap = new CartesianMap<number>([[{ x: 3, y: 4 }, 84]]);

    expect(map.get({ x: 1, y: 2 })).toBe(42);
    expect(Array.from(readonlyMap.entries())).toEqual([[{ x: 3, y: 4 }, 84]]);
  });

  test('supports getOrInsert for missing and existing keys', () => {
    const map = new CartesianMap<number>([[{ x: 1, y: 2 }, 42]]);

    expect(map.getOrInsert({ x: 1, y: 2 }, 100)).toBe(42);
    expect(map.getOrInsert({ x: 3, y: 4 }, 100)).toBe(100);
    expect(map.get({ x: 3, y: 4 })).toBe(100);
    expect(map.size).toBe(2);
  });

  test('supports getOrInsertComputed and computes only when absent', () => {
    const map = new CartesianMap<number>([[{ x: 1, y: 2 }, 42]]);
    let calls = 0;

    expect(
      map.getOrInsertComputed({ x: 1, y: 2 }, () => {
        calls += 1;
        return 100;
      }),
    ).toBe(42);
    expect(calls).toBe(0);

    expect(
      map.getOrInsertComputed({ x: 3, y: 4 }, () => {
        calls += 1;
        return 100;
      }),
    ).toBe(100);
    expect(calls).toBe(1);
    expect(map.get({ x: 3, y: 4 })).toBe(100);
  });

  test('iterators decode keys back to the original type', () => {
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
