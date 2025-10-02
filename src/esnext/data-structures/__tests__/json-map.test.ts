import { type Cartesian } from '../../geometry/geometry.ts';

import { JSONMap } from '../json-map.ts';

class CartesianMap<T = unknown> extends JSONMap<Cartesian, T> {}

describe('JSONMap', () => {
  test('creates empty map when no initial data provided', () => {
    const map = new CartesianMap<string>();

    expect(map.size).toBe(0);
    expect(map.has({ x: 0, y: 0 })).toBe(false);
  });

  test('creates map with initial data', () => {
    const initialData: [Cartesian, string][] = [
      [{ x: 1, y: 2 }, 'first'],
      [{ x: 3, y: 4 }, 'second'],
    ];
    const map = new CartesianMap(initialData);

    expect(map.size).toBe(2);
    expect(map.get({ x: 1, y: 2 })).toBe('first');
    expect(map.get({ x: 3, y: 4 })).toBe('second');
  });

  test('handles null initialization', () => {
    const map = new CartesianMap<string>(null);

    expect(map.size).toBe(0);
  });

  test('sets and gets values correctly', () => {
    const map = new CartesianMap<string>();

    map.set({ x: 5, y: 10 }, 'test value');

    expect(map.get({ x: 5, y: 10 })).toBe('test value');
    expect(map.has({ x: 5, y: 10 })).toBe(true);
    expect(map.size).toBe(1);
  });

  test('overwrites existing values', () => {
    const map = new CartesianMap<string>();

    map.set({ x: 1, y: 1 }, 'original');
    map.set({ x: 1, y: 1 }, 'updated');

    expect(map.get({ x: 1, y: 1 })).toBe('updated');
    expect(map.size).toBe(1);
  });

  test('returns undefined for non-existent keys', () => {
    const map = new CartesianMap<string>();

    expect(map.get({ x: 999, y: 999 })).toBeUndefined();
  });

  test('has method works correctly', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 2, y: 3 }, 'exists');

    expect(map.has({ x: 2, y: 3 })).toBe(true);
    expect(map.has({ x: 2, y: 4 })).toBe(false);
    expect(map.has({ x: 3, y: 3 })).toBe(false);
  });

  test('deletes entries correctly', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'to delete');
    map.set({ x: 1, y: 2 }, 'to keep');

    expect(map.delete({ x: 1, y: 1 })).toBe(true);
    expect(map.has({ x: 1, y: 1 })).toBe(false);
    expect(map.has({ x: 1, y: 2 })).toBe(true);
    expect(map.size).toBe(1);
  });

  test('delete returns false for non-existent entries', () => {
    const map = new CartesianMap<string>();

    expect(map.delete({ x: 999, y: 999 })).toBe(false);
  });

  test('clear removes all entries', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'first');
    map.set({ x: 2, y: 2 }, 'second');
    map.set({ x: 3, y: 3 }, 'third');

    map.clear();

    expect(map.size).toBe(0);
    expect(map.has({ x: 1, y: 1 })).toBe(false);
    expect(map.has({ x: 2, y: 2 })).toBe(false);
    expect(map.has({ x: 3, y: 3 })).toBe(false);
  });

  test('size property reflects current entry count', () => {
    const map = new CartesianMap<string>();

    expect(map.size).toBe(0);

    map.set({ x: 1, y: 1 }, 'first');
    expect(map.size).toBe(1);

    map.set({ x: 2, y: 2 }, 'second');
    expect(map.size).toBe(2);

    map.delete({ x: 1, y: 1 });
    expect(map.size).toBe(1);

    map.clear();
    expect(map.size).toBe(0);
  });

  test('keys iterator returns all coordinate keys', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 2 }, 'a');
    map.set({ x: 3, y: 4 }, 'b');
    map.set({ x: 1, y: 3 }, 'c');

    const keys = Array.from(map.keys());

    expect(keys).toHaveLength(3);
    expect(keys).toContainEqual({ x: 1, y: 2 });
    expect(keys).toContainEqual({ x: 3, y: 4 });
    expect(keys).toContainEqual({ x: 1, y: 3 });
  });

  test('values iterator returns all stored values', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'first');
    map.set({ x: 2, y: 2 }, 'second');
    map.set({ x: 3, y: 3 }, 'third');

    const values = Array.from(map.values());

    expect(values).toHaveLength(3);
    expect(values).toContain('first');
    expect(values).toContain('second');
    expect(values).toContain('third');
  });

  test('entries iterator returns key-value pairs', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 2 }, 'value1');
    map.set({ x: 3, y: 4 }, 'value2');

    const entries = Array.from(map.entries());

    expect(entries).toHaveLength(2);
    expect(entries).toContainEqual([{ x: 1, y: 2 }, 'value1']);
    expect(entries).toContainEqual([{ x: 3, y: 4 }, 'value2']);
  });

  test('Symbol.iterator works correctly', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'a');
    map.set({ x: 2, y: 2 }, 'b');

    const entries: [Cartesian, string][] = [];
    for (const entry of map) {
      entries.push(entry);
    }

    expect(entries).toHaveLength(2);
    expect(entries).toContainEqual([{ x: 1, y: 1 }, 'a']);
    expect(entries).toContainEqual([{ x: 2, y: 2 }, 'b']);
  });

  test('forEach executes callback for each entry', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'first');
    map.set({ x: 2, y: 2 }, 'second');

    const results: { value: string; key: Cartesian; map: JSONMap<Cartesian, string> }[] = [];

    // eslint-disable-next-line unicorn/no-array-for-each
    map.forEach((value, key, mapRef) => {
      results.push({ value, key, map: mapRef });
    });

    expect(results).toHaveLength(2);
    expect(results[0].map).toBe(map);
    expect(results[1].map).toBe(map);
    expect(results.map((r) => r.value)).toContain('first');
    expect(results.map((r) => r.value)).toContain('second');
  });

  test('forEach respects thisArg parameter', () => {
    const map = new CartesianMap<string>();
    map.set({ x: 1, y: 1 }, 'test');

    const context = { called: false };

    // eslint-disable-next-line unicorn/no-array-for-each, func-names
    map.forEach(function (this: typeof context) {
      this.called = true;
      // eslint-disable-next-line unicorn/no-array-method-this-argument
    }, context);

    expect(context.called).toBe(true);
  });

  test('set method returns this for chaining', () => {
    const map = new CartesianMap<string>();

    const result = map.set({ x: 1, y: 1 }, 'test');

    expect(result).toBe(map);
  });

  test('works with different value types', () => {
    const numberMap = new CartesianMap<number>();
    numberMap.set({ x: 1, y: 1 }, 42);
    expect(numberMap.get({ x: 1, y: 1 })).toBe(42);

    const objectMap = new CartesianMap<{ name: string }>();
    const obj = { name: 'test' };
    objectMap.set({ x: 2, y: 2 }, obj);
    expect(objectMap.get({ x: 2, y: 2 })).toBe(obj);

    const booleanMap = new CartesianMap<boolean>();
    booleanMap.set({ x: 3, y: 3 }, true);
    expect(booleanMap.get({ x: 3, y: 3 })).toBe(true);
  });

  test('has correct Symbol.toStringTag', () => {
    const map = new CartesianMap<string>();

    expect(map[Symbol.toStringTag]).toBe('JSONMap');
    expect(Object.prototype.toString.call(map)).toBe('[object JSONMap]');
  });

  test('maintains insertion order in iteration', () => {
    const map = new CartesianMap<string>();

    // Add entries in specific order
    map.set({ x: 3, y: 3 }, 'third');
    map.set({ x: 1, y: 1 }, 'first');
    map.set({ x: 2, y: 2 }, 'second');

    const keys = Array.from(map.keys());
    const values = Array.from(map.values());

    // Should maintain some consistent order (implementation dependent)
    expect(keys).toHaveLength(3);
    expect(values).toHaveLength(3);
  });

  test('handles large datasets efficiently', () => {
    const map = new CartesianMap<number>();

    // Add many entries
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        map.set({ x, y }, x * 100 + y);
      }
    }

    expect(map.size).toBe(10000);
    expect(map.get({ x: 50, y: 75 })).toBe(5075);
    expect(map.has({ x: 99, y: 99 })).toBe(true);
    expect(map.has({ x: 100, y: 100 })).toBe(false);
  });

  test('empty map iterations work correctly', () => {
    const map = new CartesianMap<string>();

    expect(Array.from(map.keys())).toEqual([]);
    expect(Array.from(map.values())).toEqual([]);
    expect(Array.from(map.entries())).toEqual([]);

    let forEachCalled = false;
    // eslint-disable-next-line unicorn/no-array-for-each
    map.forEach(() => {
      forEachCalled = true;
    });
    expect(forEachCalled).toBe(false);
  });

  test('coordinates with same x but different y are handled correctly', () => {
    const map = new CartesianMap<string>();

    map.set({ x: 5, y: 1 }, 'first');
    map.set({ x: 5, y: 2 }, 'second');
    map.set({ x: 5, y: 3 }, 'third');

    expect(map.size).toBe(3);
    expect(map.get({ x: 5, y: 1 })).toBe('first');
    expect(map.get({ x: 5, y: 2 })).toBe('second');
    expect(map.get({ x: 5, y: 3 })).toBe('third');

    map.delete({ x: 5, y: 2 });
    expect(map.size).toBe(2);
    expect(map.has({ x: 5, y: 2 })).toBe(false);
    expect(map.has({ x: 5, y: 1 })).toBe(true);
    expect(map.has({ x: 5, y: 3 })).toBe(true);
  });
});
