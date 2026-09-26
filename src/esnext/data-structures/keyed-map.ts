interface ReadonlyKeyedMap<K, V> {
  readonly size: number;
  get(key: K): V | undefined;
  has(value: K): boolean;
  values(): MapIterator<V>;
  keys(): MapIterator<K>;
  entries(): MapIterator<[K, V]>;
  [Symbol.iterator](): MapIterator<[K, V]>;
}

interface KeyedMap<K, V> extends ReadonlyKeyedMap<K, V> {
  set(key: K, value: V): KeyedMap<K, V>;
  clear(): void;
  delete(key: K): boolean;
}

/**
 * Creates a keyed Map implementation that compares keys by a derived string instead of object identity.
 *
 * This is useful when map keys are objects or other complex values whose equality should be based on
 * a stable serialized form rather than their in-memory reference.
 * @typeParam K - The key type for the map.
 * @typeParam V - The value type stored for each key.
 * @param encodeKey - Converts a key into a unique string used for hashing and lookup.
 * @param decodeKey - Reconstructs a key from its serialized form when iterating.
 * @returns A tuple containing the mutable map class and the readonly map class.
 * @example
 * ```typescript
 * type Cartesian = { x: number; y: number };
 *
 * const [CartesianMap, ReadonlyCartesianMap] = keyedMap<Cartesian>(
 *   ({ x, y }) => `${x},${y}`,
 *   (key) => {
 *     const [x, y] = key.split(',').map(Number);
 *     return { x, y };
 *   },
 * );
 *
 * const map = new CartesianMap<string>([[{ x: 1, y: 2 }, 'first']]);
 * map.get({ x: 1, y: 2 }); // 'first'
 * ```
 * @group Data Structures
 * @category Map
 */
export function keyedMap<K>(
  encodeKey: (value: K) => string,
  decodeKey: (value: string) => K,
): [
  new <T>(...inits: Iterable<[K, T]>[]) => KeyedMap<K, T>,
  new <T>(...inits: Iterable<[K, T]>[]) => ReadonlyKeyedMap<K, T>,
] {
  class RO<T> implements ReadonlyKeyedMap<K, T> {
    protected readonly keyedMap: Map<string, T>;

    public readonly [Symbol.toStringTag] = 'KeyedMap';

    public constructor(...inits: Iterable<[K, T]>[]) {
      this.keyedMap = new Map<string, T>();

      for (const init of inits) {
        for (const [key, value] of init) {
          this.keyedMap.set(encodeKey(key), value);
        }
      }
    }

    public get(key: K): T | undefined {
      return this.keyedMap.get(encodeKey(key));
    }

    public has(key: K): boolean {
      return this.keyedMap.has(encodeKey(key));
    }

    public get size(): number {
      return this.keyedMap.size;
    }

    public *values(): Generator<T> {
      for (const value of this.keyedMap.values()) {
        yield value;
      }
    }

    public *keys(): Generator<K> {
      for (const key of this.keyedMap.keys()) {
        yield decodeKey(key);
      }
    }

    public *entries(): Generator<[K, T]> {
      for (const [key, value] of this.keyedMap) {
        yield [decodeKey(key), value];
      }
    }

    public [Symbol.iterator](): Generator<[K, T]> {
      return this.entries();
    }
  }

  class RW<T> extends RO<T> implements KeyedMap<K, T> {
    public set(key: K, value: T): this {
      this.keyedMap.set(encodeKey(key), value);
      return this;
    }

    public clear(): void {
      this.keyedMap.clear();
    }

    public delete(key: K): boolean {
      return this.keyedMap.delete(encodeKey(key));
    }
  }

  return [RW, RO];
}
