import { isIterable } from '../iteration/is-iterable.ts';

export interface ReadonlyKeyedSet<T> {
  readonly size: number;
  has(value: T): boolean;
  some(predicate: (value: T) => boolean): boolean;
  every(predicate: (value: T) => boolean): boolean;
  map<U>(mapper: (value: T) => U): Generator<U>;
  flatMap<U>(mapper: (value: T) => Iterable<U | U[]>): Generator<U>;
  filter(predicate: (value: T) => boolean): Generator<T>;
  values(): SetIterator<T>;
  keys(): SetIterator<T>;
  entries(): SetIterator<[T, T]>;
  [Symbol.iterator](): SetIterator<T>;
}

export interface KeyedSet<T> extends ReadonlyKeyedSet<T> {
  add(value: T): KeyedSet<T>;
  clear(): void;
  delete(value: T): boolean;
}

/**
 * Creates a keyed Set implementation that compares values by a string key instead of object identity.
 *
 * This is useful for storing values such as objects, arrays, or other non-primitive entries that
 * should be treated as equal when their derived keys match.
 * @typeParam T - The value type stored in the set.
 * @param encodeKey - Converts a value into a unique string key used for equality and hashing.
 * @param decodeKey - Reconstructs a value from its serialized key when iterating over the set.
 * @returns A tuple containing the mutable set class and the readonly set class.
 * @example
 * ```typescript
 * type Cartesian = { x: number; y: number };
 *
 * const [CartesianSet, ReadonlyCartesianSet] = keyedSet<Cartesian>(
 *   ({ x, y }) => `${x},${y}`,
 *   (key) => {
 *     const [x, y] = key.split(',').map(Number);
 *     return { x, y };
 *   },
 * );
 *
 * const set = new CartesianSet([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
 * set.has({ x: 1, y: 2 }); // true
 * ```
 * @group Data Structures
 * @category Set
 */
export function keyedSet<T>(
  encodeKey: (value: T) => string,
  decodeKey: (value: string) => T,
): [
  new (...inits: Iterable<T>[]) => KeyedSet<T>,
  new (...inits: Iterable<T>[]) => ReadonlyKeyedSet<T>,
] {
  class RO implements ReadonlyKeyedSet<T> {
    protected readonly keyedSet: Set<string>;

    public readonly [Symbol.toStringTag] = 'SerializedSet';

    public constructor(...inits: Iterable<T>[]) {
      this.keyedSet = new Set<string>();

      for (const init of inits) {
        for (const value of init) {
          this.keyedSet.add(encodeKey(value));
        }
      }
    }

    public has(value: T): boolean {
      return this.keyedSet.has(encodeKey(value));
    }

    public some(predicate: (value: T) => boolean): boolean {
      for (const value of this.values()) {
        if (predicate(value)) {
          return true;
        }
      }
      return false;
    }

    public every(predicate: (value: T) => boolean): boolean {
      for (const value of this.values()) {
        if (!predicate(value)) {
          return false;
        }
      }
      return true;
    }

    public *map<U>(mapper: (value: T) => U): Generator<U> {
      for (const value of this.values()) {
        yield mapper(value);
      }
    }

    public *flatMap<U>(mapper: (value: T) => Iterable<U | U[]>): Generator<U> {
      for (const value of this.values()) {
        for (const item of mapper(value)) {
          if (Array.isArray(item)) {
            yield* item;
          } else {
            yield item;
          }
        }
      }
    }

    public *filter(predicate: (value: T) => boolean): Generator<T> {
      for (const value of this.values()) {
        if (predicate(value)) {
          yield value;
        }
      }
    }

    public get size(): number {
      return this.keyedSet.size;
    }

    public *values(): SetIterator<T> {
      for (const object of this.keyedSet) {
        yield decodeKey(object);
      }
    }

    public *keys(): SetIterator<T> {
      yield* this.values();
    }

    public *entries(): SetIterator<[T, T]> {
      for (const value of this.values()) {
        yield [value, value];
      }
    }

    public [Symbol.iterator](): SetIterator<T> {
      return this.values();
    }
  }

  class RW extends RO implements KeyedSet<T> {
    public add(value: T | Iterable<T>): this {
      if (isIterable(value)) {
        for (const item of value) {
          this.keyedSet.add(encodeKey(item));
        }
      } else {
        this.keyedSet.add(encodeKey(value));
      }
      return this;
    }

    public clear(): void {
      this.keyedSet.clear();
    }

    public delete(value: T): boolean {
      return this.keyedSet.delete(encodeKey(value));
    }
  }

  return [RW, RO];
}
