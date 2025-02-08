import { type JsonObject } from 'type-fest';

import { deserialize, serialize } from './json-serializer.ts';

/**
 * A Set-like collection for objects that can be serialized to JSON.
 *
 * `JSONSet` stores objects by serializing them to JSON strings, allowing for deep equality
 * comparison of objects rather than reference equality. This is useful for storing and comparing
 * objects with the same structure and values, regardless of their references.
 *
 * @typeParam T - The type of objects stored in the set. Must extend `JsonObject`.
 *
 * @example
 * ```ts
 * const set = new JSONSet<{ a: number }>();
 * set.add({ a: 1 });
 * set.has({ a: 1 }); // true
 * set.has({ a: 2 }); // false
 * ```
 *
 * @remarks
 * - All objects are serialized using a `serialize` function and deserialized with a `deserialize` function.
 * - The set supports standard set operations such as union, intersection, difference, and symmetricDifference.
 * - Iteration yields deserialized objects.
 *
 * @see Set
 *
 * @group JSON
 * @category Data Structures
 */
export class JSONSet<T extends JsonObject> implements Set<T> {
  protected set = new Set<string>();

  public constructor(values?: Iterable<T> | null) {
    if (values) {
      for (const value of values) {
        this.add(value);
      }
    }
  }

  public readonly [Symbol.toStringTag] = 'JSONSet';

  protected replicate<X = T>(values?: Iterable<X> | null): Set<X> {
    const Maker = this.constructor as new (values?: Iterable<X> | null) => Set<X>;
    return new Maker(values);
  }

  public get size(): number {
    return this.set.size;
  }

  public add(value: T): this {
    this.set.add(serialize(value));
    return this;
  }

  public clear(): void {
    this.set.clear();
  }

  public delete(value: T): boolean {
    return this.set.delete(serialize(value));
  }

  public difference<U>(other: ReadonlySetLike<U>): Set<T> {
    return this.replicate(
      Array.from(this.values()).filter((value) => !other.has(value as unknown as U)),
    );
  }

  public *entries(): SetIterator<[T, T]> {
    for (const value of this.values()) {
      yield [value, value];
    }
  }

  public forEach(callback: (value: T, key: T, set: Set<T>) => void, thisArg?: unknown): void {
    for (const value of this.values()) {
      callback.call(thisArg, value, value, this);
    }
  }

  public has(value: T): boolean {
    return this.set.has(serialize(value));
  }

  public intersection<U>(other: ReadonlySetLike<U>): Set<T & U> {
    return this.replicate<T & U>(
      Array.from(this.values() as Iterable<T & U>).filter((value) =>
        other.has(value as unknown as U),
      ),
    );
  }

  public isDisjointFrom(other: ReadonlySetLike<unknown>): boolean {
    for (const value of this.values()) {
      if (other.has(value)) {
        return false;
      }
    }
    return true;
  }

  public isSubsetOf(other: ReadonlySetLike<unknown>): boolean {
    for (const value of this.values()) {
      if (!other.has(value)) {
        return false;
      }
    }
    return true;
  }

  public isSupersetOf(other: ReadonlySetLike<unknown>): boolean {
    for (const value of other.keys() as unknown as Iterable<unknown>) {
      if (!this.has(value as T)) {
        return false;
      }
    }
    return true;
  }

  public *keys(): SetIterator<T> {
    yield* this.values();
  }

  public symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U> {
    const result = this.replicate<T | U>();

    for (const value of this.keys()) {
      if (!other.has(value as unknown as U)) {
        result.add(value);
      }
    }

    for (const value of other.keys() as SetIterator<U>) {
      if (!this.has(value as unknown as T)) {
        result.add(value as T | U);
      }
    }
    return result;
  }

  public union<U>(other: ReadonlySetLike<U>): Set<T | U> {
    return this.replicate<T | U>([...this.keys(), ...(other.keys() as SetIterator<U>)]);
  }

  public *values(): SetIterator<T> {
    for (const object of this.set) {
      yield deserialize(object) as T;
    }
  }

  public [Symbol.iterator](): SetIterator<T> {
    return this.values();
  }
}
